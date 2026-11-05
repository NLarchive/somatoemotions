import { assertResource, ResourceError } from '../../../core/ports/atlas-resource-port/main.js';
export function createResourceLoader({
  fetchImpl = globalThis.fetch,
  baseURL = globalThis.location?.href || 'http://localhost/',
  timeoutMs = 6000,
  retries = 1,
} = {}) {
  if (
    !Number.isInteger(retries) ||
    retries < 0 ||
    retries > 2 ||
    !Number.isFinite(timeoutMs) ||
    timeoutMs <= 0
  )
    throw Error('Invalid loader limits');
  return async (name, { signal } = {}) => {
    const resource = assertResource(name);
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      let timedOut = false;
      const abort = () => controller.abort();
      if (signal?.aborted) throw new ResourceError('ABORTED', name);
      signal?.addEventListener('abort', abort, { once: true });
      const timer = setTimeout(() => {
        timedOut = true;
        controller.abort();
      }, timeoutMs);
      try {
        const response = await fetchImpl(new URL(resource, baseURL), {
          signal: controller.signal,
          cache: 'no-cache',
        });
        if (!response.ok) {
          const err = new ResourceError('HTTP_ERROR', name);
          err.status = response.status;
          throw err;
        }
        try {
          return await response.json();
        } catch {
          throw new ResourceError('INVALID_JSON', name);
        }
      } catch (error) {
        const normalized = signal?.aborted
          ? new ResourceError('ABORTED', name)
          : timedOut
            ? new ResourceError('TIMEOUT', name)
            : error instanceof ResourceError
              ? error
              : new ResourceError('NETWORK_ERROR', name);
        const retryable =
          ['TIMEOUT', 'NETWORK_ERROR'].includes(normalized.code) ||
          (normalized.code === 'HTTP_ERROR' && normalized.status >= 500);
        if (!retryable || attempt === retries) throw normalized;
      } finally {
        clearTimeout(timer);
        signal?.removeEventListener('abort', abort);
      }
    }
  };
}
export async function run({ name, status = 200, body = {}, invalidJson = false }) {
  const load = createResourceLoader({
    fetchImpl: async () => ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => {
        if (invalidJson) throw Error();
        return body;
      },
    }),
    retries: 0,
  });
  try {
    return { ok: true, value: await load(name) };
  } catch (e) {
    return { ok: false, code: e.code };
  }
}
