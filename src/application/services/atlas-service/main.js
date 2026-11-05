import { validateAtlas, records } from '../../../core/domain/atlas-model/main.js';
import { validateSources, evaluateEvidence } from '../../../core/domain/evidence-policy/main.js';
import { validateVisualIndex } from '../../../core/domain/visual-model/main.js';
export function validateResources({ data, sources, visuals }) {
  const errors = [
    ...validateAtlas(data).errors,
    ...validateSources(sources).errors,
    ...validateVisualIndex(visuals).errors,
  ];
  if (!errors.length)
    for (const { record } of records(data)) {
      errors.push(
        ...evaluateEvidence(
          record,
          sources.sources.map((s) => s.id),
        ).errors.map((e) => `${record.id}: ${e}`),
      );
      if (!Object.hasOwn(visuals.images, record.image_key))
        errors.push(`Missing visual entry: ${record.image_key}`);
      for (const id of record.method_source_ids || [])
        if (!sources.sources.some((s) => s.id === id)) errors.push(`Unknown method source: ${id}`);
    }
  return { ok: !errors.length, errors };
}
export async function loadAtlas(load, { signal } = {}) {
  const warnings = [];
  const [data, sources, visuals, prompts] = await Promise.all([
    load('data', { signal }),
    load('sources', { signal }),
    load('visuals', { signal }),
    load('prompts', { signal })
      .then((value) => {
        if (
          value?.schema_version !== '4.0.0' ||
          !value.prompts ||
          typeof value.prompts !== 'object' ||
          Array.isArray(value.prompts)
        )
          throw Error('Invalid optional prompt catalogue');
        return value;
      })
      .catch((e) => {
        if (signal?.aborted) throw e;
        warnings.push('Generation prompts are unavailable. Reference images remain usable.');
        return { prompts: {} };
      }),
  ]);
  const valid = validateResources({ data, sources, visuals });
  if (!valid.ok) {
    const error = new Error('The atlas resources did not pass their data checks.');
    error.code = 'INVALID_DATA';
    error.details = valid.errors;
    throw error;
  }
  return { state: 'ready', data, sources, visuals, prompts, warnings };
}
export function run({ data, sources, visuals }) {
  return validateResources({ data, sources, visuals });
}
