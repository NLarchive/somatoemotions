import { validImageKey } from '../../../core/domain/visual-model/main.js';
export function resolveReference(record, index, prompts = {}) {
  if (!validImageKey(record?.image_key))
    return { state: 'missing', message: 'This record has an invalid reference key.' };
  const image = index?.images?.[record.image_key];
  if (!image)
    return {
      state: 'missing',
      message: 'This reference image is not available.',
      prompt: prompts[record.image_key] || '',
    };
  return { state: 'ready', ...image, key: record.image_key };
}
export function run({ record, index, prompts }) {
  return resolveReference(record, index, prompts);
}
