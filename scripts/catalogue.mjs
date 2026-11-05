import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
const prompts = JSON.parse(await readFile('prompts.json', 'utf8'));
const index = { schema_version: '1.0.0', images: {} };
const assets = [];
let review = { images: [] };
try {
  review = JSON.parse(await readFile('docs/visual-review.json', 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
for (const [key, brief] of Object.entries(prompts.prompts).sort(([a], [b]) => a.localeCompare(b))) {
  const jpg = `images/jpg/${key}.jpg`,
    webp = `images/${key}.webp`;
  const [jb, wb] = await Promise.all([readFile(jpg), readFile(webp)]);
  await sharp(jb).raw().toBuffer();
  await sharp(wb).raw().toBuffer();
  const m = await sharp(wb).metadata(),
    j = await sharp(jb).metadata();
  if (
    m.format !== 'webp' ||
    j.format !== 'jpeg' ||
    Math.abs(m.width / m.height - j.width / j.height) > 0.01
  )
    throw Error(`Invalid format or aspect ratio: ${key}`);
  const name = key.split('/')[1].replace(/[-_]/g, ' ');
  const alt = key.endsWith('full-face')
    ? `Posed adult full-face illustration catalogued as ${name.replace(' full face', '')}; not an emotion assessment.`
    : `AI-generated anatomical or posture reference: ${name}. Illustration, not a physiological measurement.`;
  index.images[key] = {
    jpg,
    webp,
    width: m.width,
    height: m.height,
    alt,
    provenance: 'AI-generated illustration',
    review_status: review.images.some(
      (r) => r.key === key && r.sha256 === createHash('sha256').update(wb).digest('hex'),
    )
      ? 'visual_checked'
      : 'technical',
  };
  assets.push({
    key,
    jpg,
    webp,
    status: 'complete',
    jpg_sha256: createHash('sha256').update(jb).digest('hex'),
    webp_sha256: createHash('sha256').update(wb).digest('hex'),
  });
}
await writeFile('visual-index.json', JSON.stringify(index, null, 2) + '\n');
await writeFile(
  'images/generation-progress.json',
  JSON.stringify(
    {
      status: 'complete',
      format: 'canonical categorized JPG and WebP',
      jpg_originals: assets.length,
      missing_webp_or_jpg: [],
      assets,
    },
    null,
    2,
  ) + '\n',
);
console.log(`Decoded and indexed ${assets.length} canonical image pairs`);
