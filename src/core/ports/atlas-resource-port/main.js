export const RESOURCE_PATHS = {
  data: 'data.json',
  prompts: 'prompts.json',
  sources: 'sources.json',
  visuals: 'visual-index.json',
};
export class ResourceError extends Error {
  constructor(code, resource) {
    super(`${resource}: ${code}`);
    this.name = 'ResourceError';
    this.code = code;
    this.resource = resource;
  }
}
export function assertResource(name) {
  if (!Object.hasOwn(RESOURCE_PATHS, name))
    throw new ResourceError('INVALID_RESOURCE', String(name));
  return RESOURCE_PATHS[name];
}
export function run({ name }) {
  return { path: assertResource(name) };
}
