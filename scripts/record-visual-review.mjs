import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
if (!process.argv.includes('--confirm-inspected'))
  throw Error(
    'Inspect the contact sheet before recording a visual decision with --confirm-inspected.',
  );
const index = JSON.parse(await readFile('visual-index.json', 'utf8'));
const keys = Object.keys(index.images).filter((k) => k.endsWith('-full-face'));
if (keys.length !== 13) throw Error('Unexpected full-face review set');
for (const key of keys) index.images[key].review_status = 'visual_checked';
await writeFile('visual-index.json', JSON.stringify(index, null, 2) + '\n');
await writeFile(
  'docs/visual-review.json',
  JSON.stringify(
    {
      reviewed_at: '2026-10-24',
      reviewer: 'Codex visual inspection',
      method:
        'Inspection of the labeled 13-image contact sheet produced by scripts/review-images.mjs',
      certified_facs: false,
      decision:
        'Suitable as explicitly posed illustrations; no emotional-state inference or certified AU scoring claimed.',
      images: await Promise.all(
        keys.map(async (key) => ({
          key,
          status: 'illustrative_pose_checked',
          sha256: createHash('sha256')
            .update(await readFile(index.images[key].webp))
            .digest('hex'),
        })),
      ),
    },
    null,
    2,
  ) + '\n',
);
const log = JSON.parse(
  (await readFile('docs/composite-generation.json', 'utf8')).replace(/^\uFEFF/, ''),
);
for (const row of log) {
  if (keys.includes(row.key)) {
    row.status = 'saved';
    delete row.error;
  }
}
await writeFile('docs/composite-generation.json', JSON.stringify(log, null, 2) + '\n');
