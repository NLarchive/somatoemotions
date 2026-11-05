export const validImageKey = (key) =>
  typeof key === 'string' && /^(somatic|face|action)\/[a-z0-9][a-z0-9_-]*$/.test(key);
export function validateVisualIndex(index) {
  const errors = [];
  if (index?.schema_version !== '1.0.0' || !index?.images || Array.isArray(index.images))
    return { ok: false, errors: ['Invalid visual index'] };
  for (const [key, v] of Object.entries(index.images)) {
    if (!v || typeof v !== 'object' || Array.isArray(v)) {
      errors.push(`Invalid visual entry: ${key}`);
      continue;
    }
    if (!validImageKey(key)) errors.push(`Unsafe image key: ${key}`);
    if (v.webp !== `images/${key}.webp` || v.jpg !== `images/jpg/${key}.jpg`)
      errors.push(`Noncanonical pair: ${key}`);
    if (typeof v.alt !== 'string' || v.alt.length < 10 || v.alt === 'Reference')
      errors.push(`Missing descriptive alt: ${key}`);
    if (!(Number.isInteger(v.width) && v.width > 0 && Number.isInteger(v.height) && v.height > 0))
      errors.push(`Invalid dimensions: ${key}`);
    if (v.provenance !== 'AI-generated illustration') errors.push(`Missing provenance: ${key}`);
  }
  return { ok: !errors.length, errors };
}
export function run({ key }) {
  return { valid: validImageKey(key) };
}
