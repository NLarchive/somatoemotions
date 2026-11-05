import { element, copyText } from '../safe-rendering/main.js';
import { resolveReference } from '../../application/services/visual-resolver/main.js';
export function describeRecord(record) {
  return {
    label: record.claim,
    badge: record.content_type === 'scientific_claim' ? 'Source-qualified' : 'Illustration',
  };
}
export function createGallery(model, doc = globalThis.document, evidenceNote) {
  if (typeof evidenceNote !== 'function') throw Error('Evidence renderer must be injected');
  const notify = (message) => {
    doc.getElementById('copy-toast').textContent = message;
  };
  function show(record, visuals, origin) {
    const ref = resolveReference(record, model.visuals, model.prompts.prompts);
    visuals.replaceChildren();
    const figure = element('figure', '', 'visual-block', doc);
    const status = element('p', 'Loading reference…', 'visual-caption', doc);
    status.setAttribute('role', 'status');
    const fallback = element('div', '', 'prompt-fallback', doc);
    const displayFallback = (message) => {
      status.textContent = message;
      fallback.classList.add('show');
    };
    fallback.append(
      element(
        'p',
        'Reference unavailable. Generation briefs are instructions, not scientific evidence.',
        'prompt-label',
        doc,
      ),
    );
    const prompt = model.prompts.prompts?.[record.image_key] || record.image_prompt || '';
    if (prompt) {
      fallback.append(element('pre', prompt, 'prompt-text', doc));
      const copy = element('button', 'Copy generation prompt', 'btn-copy', doc);
      copy.type = 'button';
      copy.addEventListener('click', async () => notify((await copyText(prompt)).message));
      fallback.append(copy);
    }
    if (ref.state === 'ready') {
      const image = element('img', undefined, '', doc);
      image.alt = ref.alt;
      image.width = ref.width;
      image.height = ref.height;
      image.decoding = 'async';
      image.addEventListener('load', () => {
        status.textContent = 'Reference loaded.';
      });
      image.addEventListener('error', () => {
        image.hidden = true;
        displayFallback('The image could not load. Try another reference or reload the atlas.');
      });
      image.src = ref.webp;
      figure.append(image);
    } else displayFallback(ref.message);
    const back = element('button', 'Back to selected reference', 'btn-back', doc);
    back.type = 'button';
    back.addEventListener('click', () => {
      origin.focus();
      origin.scrollIntoView({ block: 'center' });
    });
    figure.append(
      element(
        'figcaption',
        `AI-generated posed illustration · ${record.claim}. Not a diagnostic photograph.`,
        'visual-caption',
        doc,
      ),
      status,
      fallback,
      back,
    );
    visuals.append(figure, evidenceNote(record, model.sources, doc));
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
    b.append(element('span', label, 'record-label', doc), element('span', badge, 'rel-pill', doc));
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
  function renderEmotion(emotion) {
    const somatic = doc.getElementById('somatic-list'),
      facs = doc.getElementById('facs-list'),
      actions = doc.getElementById('list-actions');
    for (const id of ['somatic-visuals', 'facs-visuals', 'action-visuals'])
      doc
        .getElementById(id)
        .replaceChildren(
          element(
            'p',
            'Select a reference to view its illustration and evidence context.',
            'visual-placeholder',
            doc,
          ),
        );
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
      list.replaceChildren();
      for (const r of emotion?.somatic_profile?.[system] || []) {
        const li = element('li', '', '', doc);
        li.append(
          button(r, doc.getElementById('somatic-visuals'), somatic),
          evidenceNote(r, model.sources, doc),
        );
        if (r.shared_with?.length)
          li.append(
            element(
              'p',
              `Related catalogue labels: ${r.shared_with.join(', ')}. These are context labels, not diagnostic links.`,
              'shared',
              doc,
            ),
          );
        list.append(li);
      }
    }
    for (const r of emotion?.facial_motor_units_fused || []) {
      const article = element('article', '', 'facs-card', doc);
      article.append(
        button(r, doc.getElementById('facs-visuals'), facs, true),
        element('p', r.action_description, 'facs-desc', doc),
        evidenceNote(r, model.sources, doc),
      );
      facs.append(article);
    }
    for (const r of emotion?.behavioral_action_tendencies || []) {
      const li = element('li', '', '', doc);
      li.append(
        button(r, doc.getElementById('action-visuals'), actions),
        evidenceNote(r, model.sources, doc),
      );
      actions.append(li);
    }
  }
  return { renderEmotion };
}
export function run({ record }) {
  return describeRecord(record);
}
