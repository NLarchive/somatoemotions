export const SYSTEMS = [
  'cardiovascular',
  'respiratory',
  'gastrointestinal',
  'musculoskeletal',
  'integumentary_thermal',
  'neurosensory',
];
export function records(data) {
  return (data?.emotions || []).flatMap((e) => [
    ...SYSTEMS.flatMap((system) =>
      (e.somatic_profile?.[system] || []).map((record) => ({
        emotion: e.id,
        kind: 'somatic',
        system,
        record,
      })),
    ),
    ...(e.facial_motor_units_fused || []).map((record) => ({
      emotion: e.id,
      kind: 'face',
      record,
    })),
    ...(e.behavioral_action_tendencies || []).map((record) => ({
      emotion: e.id,
      kind: 'action',
      record,
    })),
  ]);
}
export function validateAtlas(data) {
  const errors = [];
  if (data?.schema_version !== '4.0.0') errors.push('Unsupported atlas schema_version');
  if (!Array.isArray(data?.emotions) || !data.emotions.length)
    return { ok: false, errors: [...errors, 'emotions must be a nonempty array'] };
  const emotionIds = new Set(),
    recordIds = new Set();
  if (!Array.isArray(data.metadata?.external_shared_labels))
    errors.push('Invalid external shared-label taxonomy');
  const external = new Set(
    Array.isArray(data.metadata?.external_shared_labels)
      ? data.metadata.external_shared_labels
      : [],
  );
  const known = new Set(data.emotions.map((e) => e?.id));
  for (const e of data.emotions) {
    if (!e || typeof e !== 'object' || Array.isArray(e)) {
      errors.push('Invalid emotion record');
      continue;
    }
    if (!/^[a-z][a-z0-9-]*$/.test(e.id) || emotionIds.has(e.id))
      errors.push(`Invalid/duplicate emotion ID: ${e.id}`);
    emotionIds.add(e.id);
    if (typeof e.display_name !== 'string' || !e.display_name.trim())
      errors.push(`Missing display_name: ${e.id}`);
    if (!['Basic', 'Complex', 'Complex / Social', 'Baseline'].includes(e.category))
      errors.push(`Invalid category: ${e.id}`);
    for (const s of SYSTEMS)
      if (!Array.isArray(e.somatic_profile?.[s])) errors.push(`Missing system: ${e.id}/${s}`);
    if (
      !Array.isArray(e.facial_motor_units_fused) ||
      !Array.isArray(e.behavioral_action_tendencies)
    )
      errors.push(`Invalid record groups: ${e.id}`);
    for (const k of [
      'topographic_consensus_index',
      'category_reliability',
      'diagnostic_specificity',
    ])
      if (k in e) errors.push(`Unsubstantiated legacy metric: ${e.id}/${k}`);
  }
  if (errors.length) return { ok: false, errors };
  for (const { emotion, record: r } of records(data)) {
    if (!r || typeof r !== 'object' || Array.isArray(r)) {
      errors.push(`Invalid record in ${emotion}`);
      continue;
    }
    if (!/^[a-z0-9][a-z0-9_-]*$/.test(r.id) || recordIds.has(r.id))
      errors.push(`Invalid/duplicate record ID: ${r.id}`);
    recordIds.add(r.id);
    if (typeof r.claim !== 'string' || !r.claim.trim())
      errors.push(`Missing display text: ${r.id}`);
    if (!/^(somatic|face|action)\/[a-z0-9][a-z0-9_-]*$/.test(r.image_key))
      errors.push(`Invalid image_key: ${r.id}`);
    if (!['illustration', 'scientific_claim'].includes(r.content_type))
      errors.push(`Invalid content_type: ${r.id}`);
    for (const k of ['reliability', 'tier'])
      if (k in r) errors.push(`Legacy confidence field: ${r.id}/${k}`);
    for (const id of r.shared_with || [])
      if (!known.has(id) && !external.has(id))
        errors.push(`Unknown shared label: ${emotion}/${id}`);
  }
  return { ok: errors.length === 0, errors };
}
export function run({ data }) {
  return validateAtlas(data);
}
