import { element, copyText } from '../safe-rendering/main.js';
import { resolveReference } from '../../application/services/visual-resolver/main.js';
import { translateCatalog } from '../i18n/catalog.js';
import { describePhoto } from './descriptions.js';
import { explainRecord, explainSystem } from './explanations.js';
export function describeRecord(record) {
  return {
    label: record.claim,
    badge: record.content_type === 'scientific_claim' ? 'Source-qualified' : 'Illustration',
  };
}
export function createGallery(model, doc = globalThis.document, i18n = { locale: () => 'en' }) {
  const visualHosts = new Map(
    ['somatic-visuals', 'facs-visuals', 'action-visuals'].map((id) => {
      const visuals = doc.getElementById(id);
      return [visuals, visuals.parentElement];
    }),
  );
  const notify = (message) => {
    doc.getElementById('copy-toast').textContent = message;
  };
  function show(record, visuals, origin) {
    const host = visualHosts.get(visuals);
    if (doc.defaultView.matchMedia('(max-width: 600px)').matches) {
      const card = origin.closest('li, article');
      if (card) card.append(visuals);
    } else {
      host.append(visuals);
    }
    const ref = resolveReference(record, model.visuals, model.prompts.prompts);
    visuals.replaceChildren();
    const figure = element('figure', '', 'visual-block', doc);
    const es = i18n.locale() === 'es';
    const description = describePhoto(record, i18n.locale());
    const status = element('p', '', 'visual-caption', doc);
    status.hidden = true;
    status.setAttribute('role', 'status');
    const fallback = element('div', '', 'prompt-fallback', doc);
    const displayFallback = (message) => {
      status.textContent = message;
      status.hidden = false;
      fallback.classList.add('show');
    };
    fallback.append(
      element(
        'p',
        es
          ? 'Referencia no disponible. Las instrucciones de generación no son evidencia científica.'
          : 'Reference unavailable. Generation briefs are instructions, not scientific evidence.',
        'prompt-label',
        doc,
      ),
    );
    const prompt = model.prompts.prompts?.[record.image_key] || record.image_prompt || '';
    if (prompt) {
      const brief = es
        ? `Crea una ilustración educativa a partir de esta descripción: ${description} Usa un estilo fotográfico, un fondo neutro y luz suave. No añadas texto a la imagen.`
        : prompt;
      const promptText = element('pre', brief, 'prompt-text', doc);
      fallback.append(promptText);
      const copy = element(
        'button',
        es ? 'Copiar descripción de generación' : 'Copy generation prompt',
        'btn-copy',
        doc,
      );
      copy.type = 'button';
      copy.addEventListener('click', async () => {
        const result = await copyText(brief);
        notify(
          es
            ? result.ok
              ? 'Descripción copiada.'
              : 'No se pudo copiar. Selecciona y copia el texto.'
            : result.message,
        );
      });
      fallback.append(copy);
      if (es) {
        const original = element('details', '', '', doc);
        const originalText = element('pre', prompt, 'prompt-text', doc);
        originalText.lang = 'en';
        original.append(
          element('summary', 'Ver instrucciones originales en inglés', '', doc),
          originalText,
        );
        fallback.append(original);
      }
    }
    if (ref.state === 'ready') {
      const image = element('img', undefined, '', doc);
      image.alt = es ? `Ilustración: ${description}` : `Illustration: ${description}`;
      image.width = ref.width;
      image.height = ref.height;
      image.decoding = 'async';
      image.addEventListener('error', () => {
        image.hidden = true;
        displayFallback(
          es
            ? 'No se pudo cargar la imagen. Prueba otra referencia o vuelve a cargar el atlas.'
            : 'The image could not load. Try another reference or reload the atlas.',
        );
      });
      image.src = ref.webp;
      figure.append(image);
    } else displayFallback(es ? 'La imagen de referencia no está disponible.' : ref.message);
    figure.append(element('figcaption', description, 'visual-caption', doc), status, fallback);
    visuals.append(figure);
    if (doc.defaultView.matchMedia('(max-width: 1100px)').matches) {
      visuals.tabIndex = -1;
      visuals.focus({ preventScroll: true });
      visuals.scrollIntoView({ block: 'start' });
    }
  }
  function button(record, visuals, container, facs = false) {
    const { label, badge } = describeRecord(record),
      b = element('button', '', 'claim-row', doc);
    b.type = 'button';
    b.id = record.id;
    b.dataset.record = record.id;
    b.setAttribute('aria-pressed', 'false');
    b.append(
      element('span', translateCatalog(label, i18n.locale()), 'record-label', doc),
      element(
        'span',
        i18n.locale() === 'es'
          ? record.content_type === 'scientific_claim'
            ? 'Con fuentes'
            : 'Ilustración'
          : badge,
        'rel-pill',
        doc,
      ),
    );
    b.addEventListener('click', () => {
      for (const x of container.querySelectorAll('button[data-record]')) {
        const active = x === b;
        x.classList.toggle('active', active);
        x.setAttribute('aria-pressed', String(active));
      }
      show(record, visuals, b);
    });
    if (facs) b.classList.add('facs-select');
    return b;
  }
  function explanation(record, context) {
    return element('p', explainRecord(record, context, i18n.locale()), 'facs-desc', doc);
  }
  function renderEmotion(emotion) {
    const somatic = doc.getElementById('somatic-list'),
      facs = doc.getElementById('facs-list'),
      actions = doc.getElementById('list-actions');
    for (const id of ['somatic-visuals', 'facs-visuals', 'action-visuals']) {
      const visuals = doc.getElementById(id);
      visualHosts.get(visuals).append(visuals);
      visuals.replaceChildren(
        element(
          'p',
          i18n.locale() === 'es'
            ? 'Selecciona una referencia para ver su ilustración y descripción.'
            : 'Select a reference to view its illustration and description.',
          'visual-placeholder',
          doc,
        ),
      );
    }
    facs.replaceChildren();
    actions.replaceChildren();
    const channels = {
      cardiovascular: 'cardiovascular',
      respiratory: 'respiratory',
      gastrointestinal: 'gastrointestinal',
      musculoskeletal: 'musculoskeletal',
      integumentary_thermal: 'integumentary',
      neurosensory: 'neurosensory',
    };
    for (const [system, id] of Object.entries(channels)) {
      const list = doc.getElementById(`list-${id}`);
      const records = emotion?.somatic_profile?.[system] || [];
      const card = list.parentElement;
      let intro = card.querySelector('.system-intro');
      if (!intro) {
        intro = element('p', '', 'facs-desc system-intro', doc);
        list.before(intro);
      }
      intro.textContent = explainSystem(system, i18n.locale());
      intro.hidden = !records.length;
      list.replaceChildren();
      for (const r of records) {
        const li = element('li', '', '', doc);
        li.append(
          button(r, doc.getElementById('somatic-visuals'), somatic),
          explanation(r, system),
        );
        list.append(li);
      }
    }
    for (const r of emotion?.facial_motor_units_fused || []) {
      const article = element('article', '', 'facs-card', doc);
      article.append(
        button(r, doc.getElementById('facs-visuals'), facs, true),
        explanation(r, 'face'),
      );
      facs.append(article);
    }
    for (const r of emotion?.behavioral_action_tendencies || []) {
      const li = element('li', '', '', doc);
      li.append(button(r, doc.getElementById('action-visuals'), actions), explanation(r, 'action'));
      actions.append(li);
    }
  }
  return { renderEmotion };
}
export function run({ record }) {
  return describeRecord(record);
}
