import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
if (!process.argv.includes('--initialize-baseline'))
  throw Error('One-time initialization only: use --initialize-baseline on an unmodified project.');
try {
  await readFile('docs/BASELINE.json');
  throw Error('An immutable baseline already exists.');
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}
const plan = JSON.parse(await readFile('node.tasks.json', 'utf8'));
await mkdir('src', { recursive: true });
await mkdir('docs', { recursive: true });
await writeFile(
  'src/registry.json',
  JSON.stringify({ version: '1.0.0', units: plan.unit_registry }, null, 2) + '\n',
);
const data = JSON.parse(await readFile('data.json', 'utf8'));
const prompts = JSON.parse(await readFile('prompts.json', 'utf8'));
const paths = ['app.js', 'index.html', 'styles.css', 'data.json', 'prompts.json', '.gitignore'];
for (const kind of ['action', 'face', 'somatic']) {
  for (const name of await readdir(`images/${kind}`))
    if (name.endsWith('.webp')) paths.push(`images/${kind}/${name}`);
  for (const name of await readdir(`images/jpg/${kind}`))
    if (name.endsWith('.jpg')) paths.push(`images/jpg/${kind}/${name}`);
}
const files = [];
for (const path of paths.sort()) {
  const buffer = await readFile(path);
  files.push({
    path,
    bytes: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
  });
}
const missingFaces = [];
for (const e of data.emotions)
  for (const unit of e.facial_motor_units_fused) {
    const key = `face/${e.id}-au${unit.code.replace(/AU/gi, '').replace(/\+/g, '-')}${e.id === 'contempt' ? '-unilateral' : ''}`;
    if (!Object.hasOwn(prompts.prompts, key))
      missingFaces.push({ emotion: e.id, code: unit.code, derived_path: `images/${key}.webp` });
  }
const baseline = {
  recorded_at: new Date().toISOString(),
  node: process.version,
  emotions: data.emotions.length,
  somatic_claims: data.emotions.reduce(
    (n, e) => n + Object.values(e.somatic_profile).flat().length,
    0,
  ),
  action_claims: data.emotions.reduce((n, e) => n + e.behavioral_action_tendencies.length, 0),
  facs_cards: data.emotions.reduce((n, e) => n + e.facial_motor_units_fused.length, 0),
  prompt_assets: Object.keys(prompts.prompts).length,
  data_schema: data.schema_version,
  prompt_schema: prompts.schema_version,
  absent_composite_paths: missingFaces,
  scientific_review: 'not performed',
  browser_review: 'not performed',
  source_archive_git_policy: 'jpg/ and *.jpg currently ignored',
  files,
};
await writeFile('docs/BASELINE.json', JSON.stringify(baseline, null, 2) + '\n');
plan.project.status = 'In Progress';
plan.tasks[0].status = 'In Progress';
plan.tasks[0].progress_percentage = 70;
await writeFile('node.tasks.json', JSON.stringify(plan, null, 2) + '\n');
console.log(
  `Baseline captured: ${files.length} files; ${missingFaces.length} absent full-face references`,
);
