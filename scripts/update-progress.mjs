import { readFile, writeFile } from 'node:fs/promises';
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const plan = await json('node.tasks.json'),
  registry = await json('src/registry.json');
const validated = process.argv.includes('--validated');
if (validated) {
  const pipeline = await json('docs/reports/pipeline.json');
  if (!pipeline.ok || pipeline.checks.some((x) => !x.passed))
    throw Error('Cannot close implementation tasks before the complete automated pipeline passes');
}
const agent = {
  name: 'Codex (implementation and source-based audit)',
  email: '',
  role: 'Other',
  worker_id: 'codex-implementation',
};
if (!plan.workers.some((w) => w.worker_id === agent.worker_id))
  plan.workers.push({
    ...agent,
    skills: ['Implementation', 'Source-based review', 'Automated verification'],
    hourly_rate: 0,
    weekly_capacity_hours: 0,
    timezone: 'America/Santiago',
  });
plan.project.status = 'In Progress';
const note =
  'Owner clarified on 2026-10-24: supplied LICENSE, local-server testing and source-based scientific validation by Codex. Independent human/FACS certification is not claimed; manual screen-reader evidence remains a separate explicit gate.';
if (!plan.project.description.includes(note)) plan.project.description += ' ' + note;
const t3 = plan.tasks.find((t) => t.task_id === 3);
t3.description = t3.description.replace(
  'and obtain independent subject review',
  'and document the owner-requested source-based audit by Codex; do not claim independent human certification',
);
t3.acceptance_criteria = t3.acceptance_criteria.map((x) =>
  x.replace(
    'Independent evidence reviewer records decisions',
    'The source-based audit records decisions',
  ),
);
t3.reviewer = { name: 'Codex source-based audit (no human certification)', email: '' };
const t19 = plan.tasks.find((t) => t.task_id === 19);
t19.reviewer = { name: 'Codex source and visual audit (no human certification)', email: '' };
t19.description = t19.description.replace(
  'independently inspect',
  'inspect in a separate visual audit',
);
t19.acceptance_criteria = t19.acceptance_criteria.map((x) =>
  x.replace(
    'evidence reviewer approves scientific wording and visual reviewer approves reference suitability',
    'source-based audit records scientific wording decisions and the visual audit records reference suitability',
  ),
);
for (const task of plan.tasks) {
  if (task.task_id === 1) continue;
  task.assigned_workers = [agent];
  if (validated && ![20, 28].includes(task.task_id)) {
    task.status = 'Done';
    task.progress_percentage = 100;
    task.blocker_reason = '';
  } else {
    task.status = 'In Progress';
    task.progress_percentage = 90;
  }
}
if (validated) {
  let manual;
  try {
    manual = await json('docs/manual-review.json');
  } catch {
    manual = {};
  }
  const manualPassed =
    manual.keyboard === 'passed' &&
    manual.screen_reader === 'passed' &&
    Boolean(manual.reviewer) &&
    Boolean(manual.screen_reader_product);
  const t20 = plan.tasks.find((t) => t.task_id === 20),
    last = plan.tasks.find((t) => t.task_id === 28);
  if (!manualPassed) {
    t20.status = 'In Review';
    t20.progress_percentage = 90;
    t20.blocker_reason =
      'All automated browser, keyboard, responsive and axe checks pass. Real screen-reader output review is not yet recorded.';
    last.status = 'Blocked';
    last.progress_percentage = 75;
    last.blocker_reason =
      'Awaiting the actual manual accessibility evidence required by task 20; no public deployment or clinical certification is implied.';
  } else {
    t20.status = 'Done';
    t20.progress_percentage = 100;
    t20.blocker_reason = '';
    last.status = 'In Review';
    last.progress_percentage = 95;
    last.blocker_reason =
      'Run the final readiness gate against the rebuilt source candidate before recording closure.';
  }
}
for (const u of registry.units) {
  const task = plan.tasks.find((t) => t.target_unit === u.name);
  u.status = task.status === 'Done' ? 'stable' : 'active_development';
  const manifest = await json(u.path + '/manifest.json');
  manifest.lifecycle = u.status;
  await writeFile(u.path + '/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
}
plan.unit_registry = registry.units;
for (const milestone of plan.project.milestones) {
  const linked = plan.tasks.filter((t) => milestone.linked_task_names.includes(t.task_name));
  milestone.status = linked.every((t) => t.status === 'Done') ? 'Achieved' : 'In Progress';
}
for (const sprint of plan.project.sprints) {
  const linked = plan.tasks.filter((t) => t.sprint_name === sprint.name);
  sprint.status =
    linked.length && linked.every((t) => t.status === 'Done') ? 'Completed' : 'Active';
}
for (const risk of plan.project.risks) {
  if (validated && risk.name !== 'Manual accessibility evidence pending') risk.status = 'Mitigated';
}
if (!plan.project.risks.some((r) => r.name === 'Manual accessibility evidence pending'))
  plan.project.risks.push({
    name: 'Manual accessibility evidence pending',
    description: 'Automated keyboard/axe/browser checks cannot verify real screen-reader output.',
    probability: 'Medium',
    impact: 'High',
    score: 'High',
    mitigation_plan:
      'Perform the checklist in docs/ACCESSIBILITY_REVIEW.md and record the real product, browser, reviewer and results in docs/manual-review.json; rerun readiness.',
    owner: 'Manual accessibility reviewer (unassigned)',
    status: 'Open',
  });
plan.project.description = plan.project.description.replaceAll(
  'D:/IMAGES',
  'the previous external image-tool installation',
);
for (const task of plan.tasks) {
  task.description = task.description
    .replaceAll(
      'D:/IMAGES/manipulation/scripts/convert-images-local.mjs',
      'the previous external converter',
    )
    .replaceAll('D:/IMAGES', 'the previous external image-tool installation')
    .replaceAll('D:/tools', 'the previous external tooling installation');
  task.acceptance_criteria = task.acceptance_criteria.map((x) =>
    x
      .replaceAll('D:/IMAGES', 'the previous external image-tool installation')
      .replaceAll('D:/tools', 'the previous external tooling installation'),
  );
}
await writeFile('node.tasks.json', JSON.stringify(plan, null, 2) + '\n');
await writeFile('src/registry.json', JSON.stringify(registry, null, 2) + '\n');
console.log(
  JSON.stringify(
    {
      done: plan.tasks.filter((t) => t.status === 'Done').length,
      remaining: plan.tasks
        .filter((t) => t.status !== 'Done')
        .map((t) => ({ id: t.task_id, status: t.status, reason: t.blocker_reason })),
    },
    null,
    2,
  ),
);
