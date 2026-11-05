import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import {
  parseJsonStrict,
  validateContract,
} from '../../infrastructure/tools/content-audit/main.js';
import { validateResources } from '../../application/services/atlas-service/main.js';
import { records } from '../../core/domain/atlas-model/main.js';
export async function auditContent({ writeReport = true } = {}) {
  const json = async (f) => parseJsonStrict(await readFile(f, 'utf8'));
  const data = await json('data.json'),
    prompts = await json('prompts.json'),
    sources = await json('sources.json'),
    visuals = await json('visual-index.json');
  for (const [value, schemaFile] of [
    [data, 'src/core/domain/atlas-model/dataset.schema.json'],
    [prompts, 'src/core/domain/atlas-model/prompts.schema.json'],
    [sources, 'src/core/domain/evidence-policy/evidence.schema.json'],
    [visuals, 'src/core/domain/visual-model/visual-index.schema.json'],
  ]) {
    const result = validateContract(value, await json(schemaFile));
    if (!result.ok) throw Error(JSON.stringify(result.errors));
  }
  const valid = validateResources({ data, sources, visuals });
  if (!valid.ok) throw Error(JSON.stringify(valid.errors));
  const all = records(data),
    used = new Set(all.map((x) => x.record.image_key));
  const visualReview = await json('docs/visual-review.json');
  let bytes = 0;
  for (const [key, v] of Object.entries(visuals.images)) {
    if (!Object.hasOwn(prompts.prompts, key)) throw Error(`Image has no creation brief: ${key}`);
    const [w, j] = await Promise.all([readFile(v.webp), readFile(v.jpg)]);
    if (key.endsWith('-full-face')) {
      const decision = visualReview.images.find((x) => x.key === key);
      if (
        !decision ||
        decision.sha256 !== createHash('sha256').update(w).digest('hex') ||
        v.review_status !== 'visual_checked'
      )
        throw Error(`Full-face visual review is missing or stale: ${key}`);
    }
    await sharp(w).raw().toBuffer();
    await sharp(j).raw().toBuffer();
    const meta = await sharp(w).metadata(),
      jpeg = await sharp(j).metadata();
    if (
      meta.format !== 'webp' ||
      jpeg.format !== 'jpeg' ||
      meta.width !== v.width ||
      meta.height !== v.height
    )
      throw Error(`Invalid pair/metadata: ${key}`);
    bytes += w.length;
  }
  const ledger = await json('docs/evidence-review.json');
  const ids = new Set(ledger.records.map((x) => x.id));
  if (ids.size !== all.length || all.some(({ record }) => !ids.has(record.id)))
    throw Error('Source audit does not cover every record');
  for (const { record } of all) {
    const entry = ledger.records.find((x) => x.id === record.id);
    if (
      entry.published !== record.claim ||
      entry.decision !== record.evidence.decision ||
      JSON.stringify(entry.source_ids) !== JSON.stringify(record.evidence.source_ids)
    )
      throw Error(`Source decision is stale: ${record.id}`);
  }
  const result = {
    ok: true,
    emotions: data.emotions.length,
    records: all.length,
    qualified_statements: all.filter((x) => x.record.content_type === 'scientific_claim').length,
    illustrative_records: all.filter((x) => x.record.content_type === 'illustration').length,
    canonical_pairs: Object.keys(visuals.images).length,
    reachable_images: used.size,
    supplementary_images: Object.keys(visuals.images).filter((k) => !used.has(k)),
    webp_bytes: bytes,
    human_certification: false,
    review_method: 'source-based editorial audit',
  };
  if (writeReport) {
    await mkdir('docs/reports', { recursive: true });
    await writeFile('docs/reports/content-validation.json', JSON.stringify(result, null, 2) + '\n');
  }
  return result;
}
export function run({ qualified = 0, illustrations = 0 }) {
  if (qualified < 0 || illustrations < 0) throw Error('Invalid counts');
  return { records: qualified + illustrations };
}
