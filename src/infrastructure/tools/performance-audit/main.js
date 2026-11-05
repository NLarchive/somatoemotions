import { readFile } from 'node:fs/promises';
export const budgets = {
  initial_uncompressed_bytes: 900000,
  max_webp_bytes: 450000,
  total_webp_bytes: 24 * 1024 * 1024,
  cls: 0.1,
  lcp_local_ms: 2500,
};
export function evaluateBudgets({ initial_bytes, max_image_bytes, total_image_bytes }) {
  const errors = [];
  if (initial_bytes > budgets.initial_uncompressed_bytes)
    errors.push('Initial transfer budget exceeded');
  if (max_image_bytes > budgets.max_webp_bytes) errors.push('Selected image budget exceeded');
  if (total_image_bytes > budgets.total_webp_bytes) errors.push('Image catalogue budget exceeded');
  return { ok: !errors.length, errors };
}
export async function auditPerformance() {
  const m = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
  const images = m.files.filter((x) => x.path.endsWith('.webp'));
  const measurements = {
    initial_bytes: m.files
      .filter((x) => /\.(html|js|json|css|svg)$/.test(x.path))
      .reduce((n, x) => n + x.bytes, 0),
    max_image_bytes: Math.max(...images.map((x) => x.bytes)),
    total_image_bytes: images.reduce((n, x) => n + x.bytes, 0),
  };
  return {
    ...evaluateBudgets(measurements),
    measurements,
    budgets,
    profile:
      'Uncompressed static bundle. Local browser timing is measured separately; this is not field Core Web Vitals.',
  };
}
export function run(input) {
  return evaluateBudgets(input);
}
