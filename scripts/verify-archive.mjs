import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import path from 'node:path';
import { unpackTar, digest } from '../src/infrastructure/tools/source-archive/main.js';
const archive = await readFile('artifacts/source.tar.gz'),
  manifest = JSON.parse(await readFile('artifacts/source-manifest.json', 'utf8'));
if (digest(archive) !== manifest.archive_sha256) throw Error('Archive hash mismatch');
await mkdir('.cache/restore', { recursive: true });
const parent = path.resolve('.cache/restore'),
  target = await mkdtemp(path.join(parent, 'source-'));
try {
  const files = unpackTar(archive);
  if (files.length !== manifest.files.length) throw Error('Archive count mismatch');
  for (const f of files) {
    const file = path.resolve(target, f.name);
    if (!file.startsWith(target + path.sep)) throw Error('Unsafe restore path');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, f.data);
    const expected = manifest.files.find((x) => x.path === f.name);
    if (!expected || digest(await readFile(file)) !== expected.sha256)
      throw Error('Restored source mismatch');
  }
  console.log(`${files.length} source files restored and verified`);
  await writeFile(
    'docs/reports/source-restore.json',
    JSON.stringify(
      { ok: true, files: files.length, archive_sha256: manifest.archive_sha256 },
      null,
      2,
    ) + '\n',
  );
} finally {
  if (path.dirname(target) !== parent || !path.basename(target).startsWith('source-'))
    throw Error('Unsafe restore cleanup');
  await rm(target, { recursive: true, force: true });
}
