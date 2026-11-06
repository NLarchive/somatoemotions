import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, access, rm } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import sharp from 'sharp';
import { packTar, unpackTar, digest } from '../src/infrastructure/tools/source-archive/main.js';
import { convertLocal } from '../src/infrastructure/tools/image-pipeline/main.js';
import { inspectPublicText } from '../src/infrastructure/tools/security-audit/main.js';

test('source archive is deterministic, round trips bytes and rejects unsafe/tampered entries', () => {
  const files = [
    { name: 'src/main.js', data: Buffer.from('export const x=1;') },
    { name: 'images/jpg/face/test.jpg', data: Buffer.from([0, 1, 2, 255]) },
  ];
  assert.deepEqual(packTar(files), packTar(files));
  const restored = unpackTar(packTar(files));
  assert.deepEqual(restored, files);
  assert.throws(() => packTar([{ name: '../escape', data: Buffer.from('bad') }]), /Unsafe/);
  const corrupt = Buffer.from(packTar(files));
  corrupt[20] ^= 255;
  assert.throws(() => unpackTar(corrupt));
});
test('portable converter rejects collisions and invalid batches without replacing sources', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'SomatoEmotions-convert-'));
  try {
    const source = path.join(root, 'sample.png'),
      missing = path.join(root, 'missing.png');
    await writeFile(
      source,
      await sharp({ create: { width: 10, height: 10, channels: 3, background: '#aaccdd' } })
        .png()
        .toBuffer(),
    );
    const original = await readFile(source);
    await assert.rejects(() => convertLocal([source, source]), /Duplicate/);
    await assert.rejects(() => convertLocal([source, missing]));
    await assert.rejects(() => access(path.join(root, 'sample.webp')));
    const results = await convertLocal([source]);
    assert.equal(results.length, 1);
    await assert.rejects(() => convertLocal([source]), /already exists/);
    assert.deepEqual(await readFile(source), original);
  } finally {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.ok(path.basename(root).startsWith('SomatoEmotions-convert-'));
    await rm(root, { recursive: true, force: true });
  }
});
test('the 208 original image pairs remain byte-for-byte unchanged', async () => {
  const baseline = JSON.parse(await readFile('docs/BASELINE.json', 'utf8'));
  const files = baseline.files.filter((f) => /\.(jpg|webp)$/.test(f.path));
  assert.equal(files.length, 416);
  for (const f of files) assert.equal(digest(await readFile(f.path)), f.sha256, f.path);
});
test('security scanner rejects active content but not inert educational text', () => {
  assert.equal(inspectPublicText('node.textContent = sourceText;').ok, true);
  assert.equal(inspectPublicText('node.innerHTML = sourceText;').ok, false);
  assert.equal(inspectPublicText('<img onerror="alert(1)">').ok, false);
});
