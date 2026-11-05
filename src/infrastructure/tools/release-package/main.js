import { readFile, writeFile, mkdir, readdir, rm, copyFile, realpath } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const hash = (b) => createHash('sha256').update(b).digest('hex');
export function isRuntimePath(name) {
  return (
    [
      'index.html',
      'app.js',
      'styles.css',
      'data.json',
      'prompts.json',
      'sources.json',
      'visual-index.json',
      'favicon.svg',
      'LICENSE',
      'NOTICE',
      'robots.txt',
    ].includes(name) || /^images\/(face|action|somatic)\/[a-z0-9_-]+\.webp$/.test(name)
  );
}
async function modules(entry, seen = new Set()) {
  if (seen.has(entry)) return seen;
  seen.add(entry);
  const text = await readFile(entry, 'utf8');
  for (const m of text.matchAll(/\b(?:import|export)\s+(?:[^'";]*?\s+from\s*)?['"]([^'"]+)['"]/g)) {
    if (!m[1].startsWith('.')) throw Error(`Nonlocal browser module: ${entry}`);
    const file = path.posix.normalize(path.posix.join(path.posix.dirname(entry), m[1]));
    if (file.startsWith('../') || !file.endsWith('.js')) throw Error('Unsafe module path');
    await modules(file, seen);
  }
  return seen;
}
export async function buildPackage({ sourceArchive = 'artifacts/source.tar.gz' } = {}) {
  const root = await realpath('.'),
    dist = path.resolve(root, 'dist');
  if (path.dirname(dist) !== root || path.basename(dist) !== 'dist')
    throw Error('Unsafe build destination');
  try {
    const existing = await realpath(dist);
    if (existing !== dist) throw Error('Refusing linked dist destination');
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });
  const files = [
    'index.html',
    'app.js',
    'styles.css',
    'data.json',
    'prompts.json',
    'sources.json',
    'visual-index.json',
    'favicon.svg',
    'LICENSE',
    'NOTICE',
    'robots.txt',
  ];
  for (const kind of ['face', 'action', 'somatic'])
    for (const name of await readdir(`images/${kind}`))
      if (name.endsWith('.webp')) files.push(`images/${kind}/${name}`);
  files.push(...(await modules('app.js')));
  const manifest = [];
  for (const file of [...new Set(files)].sort()) {
    const body = await readFile(file),
      dest = path.join(dist, file);
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, body);
    manifest.push({ path: file, bytes: body.length, sha256: hash(body) });
  }
  const source = await readFile(sourceArchive);
  await writeFile(path.join(dist, 'source.tar.gz'), source);
  manifest.push({ path: 'source.tar.gz', bytes: source.length, sha256: hash(source) });
  const id = hash(Buffer.from(JSON.stringify(manifest)));
  const content_id = hash(
    Buffer.from(JSON.stringify(manifest.filter((x) => x.path !== 'source.tar.gz'))),
  );
  const result = { id, content_id, files: manifest };
  await writeFile(path.join(dist, 'release-manifest.json'), JSON.stringify(result, null, 2) + '\n');
  const snapshot = path.join(root, 'artifacts', 'candidates', id);
  await mkdir(snapshot, { recursive: true });
  for (const file of [...manifest.map((x) => x.path), 'release-manifest.json']) {
    const dest = path.join(snapshot, file);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(path.join(dist, file), dest);
  }
  return result;
}
export function run({ path: name }) {
  return { public: isRuntimePath(name) };
}
