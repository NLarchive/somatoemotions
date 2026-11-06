import { createResourceLoader } from '../../infrastructure/adapters/fetch-resources/main.js';
import { loadAtlas } from '../../application/services/atlas-service/main.js';
import { createShell } from '../../ui/atlas-shell/main.js';
import { createGallery } from '../../ui/reference-gallery/main.js';
import { renderEvidence, evidenceNote } from '../../ui/evidence-panel/main.js';
import { createI18n } from '../../ui/i18n/main.js';
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
  const i18n = createI18n(doc);
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
    status.textContent = i18n.locale() === 'es' ? 'Cargando el atlas…' : 'Loading the atlas…';
    try {
      const model = await loadAtlas(load, { signal: requestController.signal });
      if (requestController.signal.aborted) return;
      state = transition(state, 'success');
      const updateWarnings = () => {
        status.textContent =
          i18n.locale() === 'es' && model.warnings.length
            ? 'Las instrucciones de generación no están disponibles. Las imágenes de referencia siguen disponibles.'
            : model.warnings.join(' ');
        status.hidden = !status.textContent;
      };
      updateWarnings();
      renderEvidence(model.sources, doc, i18n);
      doc.addEventListener(
        'SomatoEmotions-language-change',
        () => {
          renderEvidence(model.sources, doc, i18n);
          updateWarnings();
        },
        { signal: requestController.signal },
      );
      const gallery = createGallery(model, doc, (...args) => evidenceNote(...args, i18n), i18n);
      shell = createShell(
        model.data,
        (emotion) => {
          doc.getElementById('active-name').textContent = i18n.translate(
            emotion?.display_name ||
              (i18n.locale() === 'es' ? 'Ninguna emoción seleccionada' : 'No emotion selected'),
            emotion?.id,
          );
          const categories = {
            Basic: 'Básica',
            Complex: 'Compleja',
            Social: 'Social',
            Baseline: 'Referencia',
            'Complex / Social': 'Compleja / social',
          };
          doc.getElementById('active-category').textContent =
            i18n.locale() === 'es'
              ? categories[emotion?.category] || emotion?.category || ''
              : emotion?.category || '';
          doc.getElementById('active-summary').textContent =
            i18n.locale() === 'es' && emotion
              ? `Ilustraciones clasificadas bajo ${i18n.translate(emotion.display_name, emotion.id)}. La apariencia y las sensaciones corporales no determinan la emoción ni el diagnóstico de una persona.${emotion.id === 'panic' ? ' El dolor de pecho, la dificultad para respirar u otros síntomas nuevos o preocupantes requieren evaluación médica.' : ''}`
              : emotion?.notes ||
                (i18n.locale() === 'es'
                  ? 'Cambia la búsqueda o la categoría para ver el catálogo.'
                  : 'Change your search or category to see the catalogue.');
          doc.title = emotion
            ? `${i18n.translate(emotion.display_name, emotion.id)} · SomatoEmotions`
            : i18n.locale() === 'es'
              ? 'SomatoEmotions · Atlas de referencia emocional'
              : 'SomatoEmotions · Emotion reference atlas';
          gallery.renderEmotion(emotion);
        },
        doc,
        i18n,
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
        i18n.locale() === 'es'
          ? 'No se pudieron cargar los recursos necesarios. Comprueba el servidor o la conexión e inténtalo de nuevo.'
          : 'The atlas could not load its required resources. Check the local server or network, then retry.';
      doc.getElementById('active-name').textContent =
        i18n.locale() === 'es' ? 'Atlas no disponible' : 'Atlas unavailable';
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
