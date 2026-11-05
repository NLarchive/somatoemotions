import { readFile, writeFile } from 'node:fs/promises';
export function evaluateBrowserSummary({ passed, failed, skipped, browsers }) {
  const errors = [];
  if (passed < 18 || failed || skipped) errors.push('Required browser scenarios did not all pass');
  for (const name of ['chromium', 'firefox', 'webkit'])
    if (!browsers.includes(name)) errors.push(`Missing browser ${name}`);
  return { ok: !errors.length, errors };
}
export async function auditBrowsers() {
  const report = JSON.parse(await readFile('docs/reports/browser-results.json', 'utf8'));
  const names = report.config.projects.map((p) => p.name);
  const stats = report.stats;
  const result = {
    ...evaluateBrowserSummary({
      passed: stats.expected,
      failed: stats.unexpected + stats.flaky,
      skipped: stats.skipped,
      browsers: names,
    }),
    passed: stats.expected,
    failed: stats.unexpected + stats.flaky,
    skipped: stats.skipped,
    browsers: names,
    content_id: report.config.metadata?.content_id || null,
    manual_screen_reader: 'not executed by automated checks',
  };
  await writeFile('docs/reports/browser-validation.json', JSON.stringify(result, null, 2) + '\n');
  return result;
}
export function run(input) {
  return evaluateBrowserSummary(input);
}
