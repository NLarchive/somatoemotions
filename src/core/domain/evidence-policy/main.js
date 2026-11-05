export function validateSources(catalog) {
  const errors = [];
  if (catalog?.schema_version !== '1.0.0' || !Array.isArray(catalog.sources))
    return { ok: false, errors: ['Invalid source catalogue'] };
  const ids = new Set();
  for (const s of catalog.sources) {
    if (!s || typeof s !== 'object' || Array.isArray(s)) {
      errors.push('Invalid source record');
      continue;
    }
    if (!s.id || ids.has(s.id)) errors.push(`Duplicate/missing source: ${s.id}`);
    ids.add(s.id);
    try {
      if (new URL(s.url).protocol !== 'https:') throw Error();
    } catch {
      errors.push(`Unsafe source URL: ${s.id}`);
    }
    if (
      !s.title ||
      !s.authors ||
      !s.scope ||
      !s.limitations ||
      !/^\d{4}-\d{2}-\d{2}$/.test(s.accessed)
    )
      errors.push(`Incomplete source metadata: ${s.id}`);
  }
  return { ok: !errors.length, errors };
}
export function evaluateEvidence(record, sourceIds) {
  if (!record || typeof record !== 'object' || Array.isArray(record))
    return { ok: false, errors: ['Invalid evidence record'] };
  const errors = [],
    evidence = record?.evidence;
  if (!evidence || evidence.review_method !== 'source-based editorial audit' || !evidence.decision)
    errors.push('Missing review decision');
  const refs = evidence?.source_ids || [];
  if (!Array.isArray(refs) || refs.some((id) => !sourceIds.includes(id)))
    errors.push('Unknown source reference');
  if (
    record?.content_type === 'scientific_claim' &&
    (!refs.length || evidence?.support !== 'direct' || evidence?.decision !== 'qualified')
  )
    errors.push('Scientific claim lacks direct qualified support');
  if (record?.content_type === 'illustration' && evidence?.support !== 'illustration_only')
    errors.push('Illustration must not imply empirical validation');
  if ('reliability' in (record || {}) || 'tier' in (record || {}))
    errors.push('Unsupported confidence metric');
  return { ok: !errors.length, errors };
}
export function run({ record, source_ids = [] }) {
  return evaluateEvidence(record, source_ids);
}
