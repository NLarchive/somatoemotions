import { spawnSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
const pipeline = JSON.parse(await readFile('ci/quality-gates.json', 'utf8'));
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
await mkdir('docs/reports', { recursive: true });
const report = { ok: false, node: process.version, checks: [] };
const save = () => writeFile('docs/reports/pipeline.json', JSON.stringify(report, null, 2) + '\n');
await save();
for (const name of pipeline.checks) {
  const script = pkg.scripts[name];
  if (!script || !script.startsWith('node '))
    throw Error('Gate must be an implemented Node command: ' + name);
  const args = script.slice(5).split(' ');
  console.log(`\nRunning ${name}`);
  const result = spawnSync(process.execPath, args, {
    stdio: 'inherit',
    env: process.env,
    timeout: 1200000,
  });
  report.checks.push({
    name,
    passed: result.status === 0 && !result.error,
    exit_code: result.status,
  });
  await save();
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
const manifest = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
report.release_id = manifest.id;
report.content_id = manifest.content_id;
report.ok = true;
await save();
