import { readFile, writeFile } from 'node:fs/promises';
export function evaluateReadiness({ gates }) {
  if (!Array.isArray(gates) || !gates.length) throw Error('No readiness evidence');
  const pending = gates.filter((x) => x.passed !== true).map((x) => x.name);
  return { ready: !pending.length, pending };
}
export function manualReviewGates(review, contentId) {
  const current = Boolean(
    contentId &&
    review.content_id === contentId &&
    review.reviewer?.trim() &&
    review.date &&
    review.browser?.trim() &&
    review.notes?.trim(),
  );
  return [
    { name: 'manual keyboard review', passed: current && review.keyboard === 'passed' },
    {
      name: 'representative screen-reader review',
      passed:
        current &&
        review.screen_reader === 'passed' &&
        Boolean(review.screen_reader_product?.trim()),
    },
  ];
}
export async function readinessReport() {
  const json = async (f) => JSON.parse(await readFile(f, 'utf8'));
  const evidence = async (f) => {
    try {
      return await json(f);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      return {};
    }
  };
  const build = await json('docs/reports/build.json'),
    manifest = await json('dist/release-manifest.json'),
    pipeline = await evidence('docs/reports/pipeline.json'),
    browser = await evidence('docs/reports/browser-validation.json'),
    staging = await evidence('docs/reports/staging-validation.json'),
    rollback = await evidence('docs/reports/rollback.json'),
    manual = await evidence('docs/manual-review.json'),
    requiredChecks = (await json('ci/quality-gates.json')).checks,
    plan = await json('node.tasks.json');
  const prerequisites = new Set(plan.project.graph_end.required_task_ids);
  const openTasks = plan.tasks.filter(
    (task) => prerequisites.has(task.task_id) && !['Done', 'Cancelled'].includes(task.status),
  );
  const gates = [
    {
      name: 'project task prerequisites',
      passed: prerequisites.size > 0 && openTasks.length === 0,
    },
    {
      name: 'current build',
      passed: build.release_id === manifest.id && build.content_id === manifest.content_id,
    },
    {
      name: 'full verification pipeline',
      passed: Boolean(
        pipeline.ok &&
        pipeline.release_id === manifest.id &&
        requiredChecks.every((name) =>
          pipeline.checks?.some((check) => check.name === name && check.passed === true),
        ),
      ),
    },
    { name: 'content', passed: build.content.ok },
    { name: 'security', passed: build.security.ok },
    { name: 'performance', passed: build.performance.ok },
    { name: 'browsers', passed: browser.ok && browser.content_id === build.content_id },
    { name: 'staging', passed: staging.ok && staging.content_id === build.content_id },
    { name: 'recovery', passed: rollback.ok && rollback.content_id === build.content_id },
    ...manualReviewGates(manual, manifest.content_id),
    {
      name: 'owner release sign-off',
      passed: Boolean(
        manual.content_id === manifest.content_id &&
        manual.owner_signoff?.accepted === true &&
        manual.owner_signoff.name?.trim() &&
        manual.owner_signoff.date,
      ),
    },
  ];
  const report = {
    ...evaluateReadiness({ gates }),
    gates,
    open_tasks: openTasks.map((task) => ({ id: task.task_id, title: task.task_name })),
    release_id: build.release_id,
    content_id: build.content_id,
    scope:
      'Owner-selected local staging; no public deployment or independent clinical certification claimed.',
  };
  await writeFile('docs/reports/readiness.json', JSON.stringify(report, null, 2) + '\n');
  return report;
}
export function run(input) {
  return evaluateReadiness(input);
}
