import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm, unlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { validateAtlas, records } from '../src/core/domain/atlas-model/main.js';
import { validateResources } from '../src/application/services/atlas-service/main.js';
import { createResourceLoader } from '../src/infrastructure/adapters/fetch-resources/main.js';
import {
  parseJsonStrict,
  validateContract,
} from '../src/infrastructure/tools/content-audit/main.js';
import { importGenerated } from '../src/infrastructure/tools/image-pipeline/main.js';
import { auditPlan } from '../src/infrastructure/tools/task-graph-audit/main.js';
const json = async (f) => parseJsonStrict(await readFile(f, 'utf8'));

test('public resources satisfy their schemas, source policies and actual runtime mappings', async () => {
  const data = await json('data.json'),
    sources = await json('sources.json'),
    visuals = await json('visual-index.json'),
    prompts = await json('prompts.json');
  for (const [value, file] of [
    [data, 'src/core/domain/atlas-model/dataset.schema.json'],
    [prompts, 'src/core/domain/atlas-model/prompts.schema.json'],
    [sources, 'src/core/domain/evidence-policy/evidence.schema.json'],
    [visuals, 'src/core/domain/visual-model/visual-index.schema.json'],
  ]) {
    const result = validateContract(value, await json(file));
    assert.ok(result.ok, JSON.stringify(result.errors));
  }
  const valid = validateResources({ data, sources, visuals });
  assert.ok(valid.ok, JSON.stringify(valid.errors));
  assert.equal(data.emotions.length, 14);
  assert.equal(records(data).length, 207);
  assert.equal(
    records(data).filter((x) => x.record.content_type === 'scientific_claim').length,
    21,
  );
  for (const { record } of records(data)) {
    await readFile(visuals.images[record.image_key].webp);
    await readFile(visuals.images[record.image_key].jpg);
  }
  const reordered = structuredClone(data);
  reordered.emotions.reverse();
  reordered.emotions[0].facial_motor_units_fused.reverse();
  assert.equal(validateAtlas(reordered).ok, true);
});
test('duplicate JSON keys and malformed/trailing documents are rejected', () => {
  for (const text of [
    '{"a":1,"a":2}',
    '{"a":1,"\\u0061":2}',
    '{"x":{"z":1,"z":2}}',
    '[true,]',
    '{}{}',
  ])
    assert.throws(() => parseJsonStrict(text));
  for (const value of [null, 1, -2.3, 'hello', true, {}, [null, {}, '\\"']])
    assert.deepEqual(parseJsonStrict(JSON.stringify(value)), value);
});
test('resource adapter retries transient errors only and honors cancellation/timeout', async () => {
  let calls = 0;
  const load = createResourceLoader({
    retries: 1,
    fetchImpl: async () => {
      calls++;
      if (calls === 1) throw Error('offline');
      return { ok: true, json: async () => ({ done: true }) };
    },
  });
  assert.deepEqual(await load('data'), { done: true });
  assert.equal(calls, 2);
  const bad = createResourceLoader({
    fetchImpl: async () => ({ ok: false, status: 404 }),
    retries: 2,
  });
  await assert.rejects(
    () => bad('data'),
    (e) => e.code === 'HTTP_ERROR',
  );
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(
    () => load('data', { signal: controller.signal }),
    (e) => e.code === 'ABORTED',
  );
  const slow = createResourceLoader({
    timeoutMs: 5,
    retries: 0,
    fetchImpl: (_u, { signal }) =>
      new Promise((_r, reject) => signal.addEventListener('abort', () => reject(Error('abort')))),
  });
  await assert.rejects(
    () => slow('data'),
    (e) => e.code === 'TIMEOUT',
  );
});
test('image import produces a canonical pair, refuses replacement and can recover a matching staged JPEG', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'SomatoEmotions-images-'));
  try {
    const source = path.join(root, 'source.png');
    await sharp({ create: { width: 12, height: 16, channels: 4, background: '#128877' } })
      .png()
      .toFile(source);
    const result = await importGenerated({ root, source, key: 'face/example-full-face' });
    assert.equal(result.width, 12);
    assert.equal(result.height, 16);
    await assert.rejects(
      () => importGenerated({ root, source, key: 'face/example-full-face' }),
      /already exists/,
    );
    await unlink(path.join(root, result.webp));
    assert.deepEqual(
      await importGenerated({ root, source, key: 'face/example-full-face' }),
      result,
    );
    await assert.rejects(() => importGenerated({ root, source, key: 'face/../escape' }), /Unsafe/);
    assert.equal(
      (await sharp(await readFile(path.join(root, result.jpg))).metadata()).format,
      'jpeg',
    );
  } finally {
    assert.equal(path.dirname(root), path.resolve(os.tmpdir()));
    assert.ok(path.basename(root).startsWith('SomatoEmotions-images-'));
    await rm(root, { recursive: true, force: true, maxRetries: 3 });
  }
});
test('task plan references remain coherent and cycles fail', async () => {
  const plan = await json('node.tasks.json');
  assert.deepEqual(auditPlan(plan), { ok: true, errors: [] });
  plan.tasks[0].dependencies = [{ predecessor_task_id: 28, type: 'FS', lag_days: 0 }];
  assert.equal(auditPlan(plan).ok, false);
});
