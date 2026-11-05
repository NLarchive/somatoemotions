import { createResourceLoader } from '../../infrastructure/adapters/fetch-resources/main.js';
import { loadAtlas } from '../../application/services/atlas-service/main.js';
import { createShell } from '../../ui/atlas-shell/main.js';
import { createGallery } from '../../ui/reference-gallery/main.js';
import { renderEvidence, evidenceNote } from '../../ui/evidence-panel/main.js';
export function transition(state, event) {
  const next = {
    idle: { load: 'loading' },
    loading: { success: 'ready', failure: 'error', load: 'loading' },
    ready: { load: 'loading' },
    error: { load: 'loading' },
  }[state]?.[event];
  if (!next) throw Error('Invalid runtime transition');
  return next;
}
export async function startApp(doc = globalThis.document) {
  const load = createResourceLoader({ baseURL: doc.baseURI });
  const status = doc.getElementById('app-status'),
    retry = doc.getElementById('retry-load');
  let state = 'idle',
    controller,
    shell;
  const lifecycle = new AbortController();
  async function initialize() {
    const recovering = state === 'error';
    controller?.abort();
    shell?.dispose();
    const requestController = new AbortController();
    controller = requestController;
    state = transition(state, 'load');
    doc.getElementById('content-viewport').classList.add('atlas-loading');
    doc.getElementById('global-search').disabled = true;
    for (const b of doc.querySelectorAll('#category-filters button,[role=tab]')) b.disabled = true;
    retry.hidden = true;
    status.hidden = false;
    status.textContent = 'Loading the atlas…';
    try {
      const model = await loadAtlas(load, { signal: requestController.signal });
      if (requestController.signal.aborted) return;
      state = transition(state, 'success');
      status.textContent = model.warnings.join(' ');
      status.hidden = false;
      renderEvidence(model.sources, doc);
      const gallery = createGallery(model, doc, evidenceNote);
      shell = createShell(
        model.data,
        (emotion) => {
          doc.getElementById('active-name').textContent =
            emotion?.display_name || 'No emotion selected';
          doc.getElementById('active-category').textContent = emotion?.category || '';
          doc.getElementById('active-summary').textContent =
            emotion?.notes || 'Change your search or category to see the catalogue.';
          doc.title = emotion
            ? `${emotion.display_name} · InteroMap`
            : 'InteroMap · Emotion reference atlas';
          gallery.renderEmotion(emotion);
        },
        doc,
      );
      doc.getElementById('content-viewport').classList.remove('atlas-loading');
      doc.getElementById('global-search').disabled = false;
      for (const b of doc.querySelectorAll('#category-filters button,[role=tab]'))
        b.disabled = false;
      if (recovering) doc.getElementById('global-search').focus();
    } catch (error) {
      if (error.code === 'ABORTED') return;
      state = transition(state, 'failure');
      status.textContent =
        'The atlas could not load its required resources. Check the local server or network, then retry.';
      doc.getElementById('active-name').textContent = 'Atlas unavailable';
      retry.hidden = false;
    }
  }
  retry.addEventListener('click', initialize, { signal: lifecycle.signal });
  await initialize();
  return {
    state: () => state,
    dispose: () => {
      lifecycle.abort();
      controller?.abort();
      shell?.dispose();
    },
  };
}
export function run({ state, event }) {
  return { state: transition(state, event) };
}
