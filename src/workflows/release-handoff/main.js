import { readFile, writeFile } from 'node:fs/promises';
export function evaluateReadiness({ gates }) {
  if (!Array.isArray(gates) || !gates.length) throw Error('No readiness evidence');
  const pending = gates.filter((x) => x.passed !== true).map((x) => x.name);
  return { ready: !pending.length, pending };
}
export async function readinessReport() {
  const json = async (f) => JSON.parse(await readFile(f, 'utf8'));
  const build = await json('docs/reports/build.json'),
    browser = await json('docs/reports/browser-validation.json'),
    staging = await json('docs/reports/staging-validation.json'),
    rollback = await json('docs/reports/rollback.json');
  let manual;
  try {
    manual = await json('docs/manual-review.json');
  } catch {
    manual = { keyboard: 'pending', screen_reader: 'pending' };
  }
  const gates = [
    { name: 'content', passed: build.content.ok },
    { name: 'security', passed: build.security.ok },
    { name: 'performance', passed: build.performance.ok },
    { name: 'browsers', passed: browser.ok && browser.content_id === build.content_id },
    { name: 'staging', passed: staging.ok && staging.content_id === build.content_id },
    { name: 'recovery', passed: rollback.ok && rollback.content_id === build.content_id },
    { name: 'manual keyboard review', passed: manual.keyboard === 'passed' },
    {
      name: 'representative screen-reader review',
      passed:
        manual.screen_reader === 'passed' &&
        Boolean(manual.screen_reader_product) &&
        Boolean(manual.reviewer),
    },
  ];
  const report = {
    ...evaluateReadiness({ gates }),
    gates,
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
