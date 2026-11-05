import { createHash } from 'node:crypto';
import { gzipSync, gunzipSync } from 'node:zlib';
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
export const digest = (buffer) => createHash('sha256').update(buffer).digest('hex');
export function packTar(files) {
  const chunks = [];
  for (const { name, data } of files) {
    if (
      !/^[a-zA-Z0-9_.\/-]+$/.test(name) ||
      name.startsWith('/') ||
      name.split('/').includes('..') ||
      name.length > 100
    )
      throw Error('Unsafe or unsupported archive path');
    const h = Buffer.alloc(512),
      put = (v, start, len) => h.write(v, start, len, 'ascii');
    put(name, 0, 100);
    put('0000644\0', 100, 8);
    put('0000000\0', 108, 8);
    put('0000000\0', 116, 8);
    put(data.length.toString(8).padStart(11, '0') + '\0', 124, 12);
    put('00000000000\0', 136, 12);
    h.fill(32, 148, 156);
    put('0', 156, 1);
    put('ustar\0', 257, 6);
    put('00', 263, 2);
    const sum = h.reduce((a, b) => a + b, 0);
    put(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8);
    chunks.push(h, data, Buffer.alloc((512 - (data.length % 512)) % 512));
  }
  chunks.push(Buffer.alloc(1024));
  return gzipSync(Buffer.concat(chunks), { level: 6 });
}
export function unpackTar(buffer) {
  const tar = gunzipSync(buffer, { maxOutputLength: 512 * 1024 * 1024 }),
    files = [],
    names = new Set();
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const h = tar.subarray(offset, offset + 512);
    if (h.every((x) => x === 0)) break;
    const name = h.subarray(0, 100).toString().split('\0')[0],
      size = parseInt(h.subarray(124, 136).toString().replace(/\0/g, '').trim(), 8);
    if (
      !name ||
      name.startsWith('/') ||
      name.includes('\\') ||
      name.split('/').includes('..') ||
      !Number.isSafeInteger(size) ||
      size < 0 ||
      h[156] !== 48
    )
      throw Error('Unsafe archive entry');
    if (names.has(name)) throw Error('Duplicate archive entry');
    names.add(name);
    const check = Buffer.from(h);
    check.fill(32, 148, 156);
    const expected = parseInt(h.subarray(148, 156).toString().replace(/\0/g, '').trim(), 8);
    if (check.reduce((a, b) => a + b, 0) !== expected) throw Error('Invalid tar checksum');
    offset += 512;
    if (offset + size > tar.length) throw Error('Truncated archive');
    files.push({ name, data: tar.subarray(offset, offset + size) });
    offset += Math.ceil(size / 512) * 512;
  }
  return files;
}
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = dir + '/' + entry.name;
    if (entry.isSymbolicLink()) throw Error('Source archive refuses symlinks');
    if (entry.isDirectory()) out.push(...(await walk(name)));
    else if (entry.isFile()) out.push(name);
  }
  return out;
}
export async function buildSourceArchive() {
  const roots = [
    'src',
    'scripts',
    'tests',
    'deploy',
    'ci',
    'images/jpg',
    'images/face',
    'images/action',
    'images/somatic',
  ];
  const names = [
    'LICENSE',
    'NOTICE',
    '.nvmrc',
    '.npmrc',
    '.prettierrc.json',
    '.gitignore',
    'node.tasks.json',
    'package.json',
    'package-lock.json',
    'index.html',
    'app.js',
    'styles.css',
    'data.json',
    'prompts.json',
    'sources.json',
    'visual-index.json',
    'README.md',
    'favicon.svg',
    'robots.txt',
    'playwright.config.mjs',
  ];
  for (const dir of roots) names.push(...(await walk(dir)));
  for (const file of await readdir('docs'))
    if (
      file.endsWith('.md') ||
      ['BASELINE.json', 'legacy-data.json', 'evidence-review.json', 'visual-review.json'].includes(
        file,
      )
    )
      names.push('docs/' + file);
  const files = [];
  for (const name of [...new Set(names)].sort()) {
    if (name.endsWith('.partial')) throw Error('Unfinished source output');
    files.push({ name, data: await readFile(name) });
  }
  const archive = packTar(files),
    restored = unpackTar(archive);
  if (
    restored.length !== files.length ||
    restored.some((f, i) => f.name !== files[i].name || digest(f.data) !== digest(files[i].data))
  )
    throw Error('Source archive restore verification failed');
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/source.tar.gz', archive);
  const report = {
    files: files.map((f) => ({ path: f.name, sha256: digest(f.data), bytes: f.data.length })),
    archive_sha256: digest(archive),
    archive_bytes: archive.length,
    restore_verified: true,
  };
  await writeFile('artifacts/source-manifest.json', JSON.stringify(report, null, 2) + '\n');
  return report;
}
export function run({ text }) {
  return { sha256: digest(Buffer.from(text)) };
}
