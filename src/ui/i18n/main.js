const text = {
  es: {
    'a.skip-link': 'Saltar al contenido del atlas',
    '.search-box label': 'Buscar en el catálogo',
    '#global-search': 'Emoción, referencia o código AU…',
    '#category-filters': 'Categoría',
    '[data-filter="All"]': 'Todas',
    '[data-filter="Basic"]': 'Básicas',
    '[data-filter="Complex"]': 'Complejas',
    '[data-filter="Social"]': 'Sociales',
    '[data-filter="Baseline"]': 'Referencia',
    '#app-status': 'Cargando el atlas…',
    '#retry-load': 'Reintentar carga del atlas',
    '#active-name': 'Cargando el atlas',
    '.context-notice > p':
      'Este catálogo educativo reúne ilustraciones posadas y afirmaciones contextualizadas por sus fuentes. La apariencia corporal y los movimientos faciales no permiten determinar la emoción ni diagnosticar a una persona. Los porcentajes editoriales anteriores no son probabilidades empíricas y ya no se muestran.',
    '.context-notice summary': 'Fuentes, método de revisión y limitaciones',
    '#evidence-content': 'Cargando las fuentes.',
    '#tab-somatic': 'Somática',
    '#tab-facs': 'Unidades faciales',
    '#tab-actions': 'Referencias de acciones',
    '#panel-somatic h2': 'Referencias corporales',
    '#panel-somatic .panel-lead':
      'Elige una referencia para ver su ilustración. Las afirmaciones respaldadas por fuentes enlazan con resultados de investigación acotados; las demás etiquetas describen ilustraciones sin atribuirles una fisiología específica de una emoción.',
    '#list-cardiovascular': '',
    '#somatic-list .system-card:nth-child(1) h3': 'Cardiovascular',
    '#somatic-list .system-card:nth-child(2) h3': 'Respiratorio',
    '#somatic-list .system-card:nth-child(3) h3': 'Gastrointestinal',
    '#somatic-list .system-card:nth-child(4) h3': 'Musculoesquelético',
    '#somatic-list .system-card:nth-child(5) h3': 'Térmico / piel',
    '#somatic-list .system-card:nth-child(6) h3': 'Neurosensorial',
    '#somatic-visuals .visual-placeholder':
      'Selecciona una afirmación para ver su imagen de referencia o descripción.',
    '#panel-facs h2': 'Referencias de movimientos faciales',
    '#panel-facs .panel-lead':
      'Ejemplos posados de movimientos faciales y sus combinaciones. Estas imágenes generadas no son una codificación FACS certificada ni evaluaciones emocionales.',
    '#facs-visuals .visual-placeholder': 'Selecciona una unidad para ver su imagen o descripción.',
    '#panel-actions h2': 'Referencias de acciones',
    '#panel-actions h3': 'Referencias de acciones posadas',
    '#action-visuals .visual-placeholder':
      'Selecciona una acción para ver su imagen de referencia o descripción.',
    '.site-footer p:last-child':
      'Las publicaciones científicas conservan sus propios derechos. Los enlaces de revisión son citas, no avales.',
  },
  en: {
    'a.skip-link': 'Skip to atlas content',
    '.search-box label': 'Search the catalogue',
    '#global-search': 'Emotion, reference, or AU code…',
    '#category-filters': 'Category',
    '[data-filter="All"]': 'All',
    '[data-filter="Basic"]': 'Basic',
    '[data-filter="Complex"]': 'Complex',
    '[data-filter="Social"]': 'Social',
    '[data-filter="Baseline"]': 'Baseline',
    '#app-status': 'Loading the atlas…',
    '#retry-load': 'Retry loading the atlas',
    '#active-name': 'Loading the atlas',
    '.context-notice > p':
      'This educational catalogue combines posed illustrations and source-qualified statements. Body appearance and facial movement cannot determine a person’s emotion or diagnosis. Earlier editorial percentages are not empirical probabilities and are no longer shown.',
    '.context-notice summary': 'Sources, review method, and limitations',
    '#evidence-content': 'Sources are loading.',
    '#tab-somatic': 'Somatic',
    '#tab-facs': 'Facial units',
    '#tab-actions': 'Action references',
    '#panel-somatic h2': 'Bodily references',
    '#panel-somatic .panel-lead':
      'Choose a reference to see its illustration. Source-qualified statements link to bounded research findings; other labels describe illustrations without asserting emotion-specific physiology.',
    '#somatic-list .system-card:nth-child(1) h3': 'Cardiovascular',
    '#somatic-list .system-card:nth-child(2) h3': 'Respiratory',
    '#somatic-list .system-card:nth-child(3) h3': 'Gastrointestinal',
    '#somatic-list .system-card:nth-child(4) h3': 'Musculoskeletal',
    '#somatic-list .system-card:nth-child(5) h3': 'Thermal / skin',
    '#somatic-list .system-card:nth-child(6) h3': 'Neurosensory',
    '#somatic-visuals .visual-placeholder': 'Select a claim to see its reference image or prompt.',
    '#panel-facs h2': 'Facial movement references',
    '#panel-facs .panel-lead':
      'Posed examples of facial movements and combinations. These generated images are not certified FACS coding or emotion assessments.',
    '#facs-visuals .visual-placeholder': 'Select a unit to see its image or prompt.',
    '#panel-actions h2': 'Action references',
    '#panel-actions h3': 'Posed action references',
    '#action-visuals .visual-placeholder': 'Select an action to see its reference image or prompt.',
    '.site-footer p:last-child':
      'Scientific publications retain their own rights. Review links are citations, not endorsements.',
  },
};
export const emotionNames = {
  anger: 'Ira',
  fear: 'Miedo',
  sadness: 'Tristeza',
  happiness: 'Alegría',
  disgust: 'Asco',
  surprise: 'Sorpresa',
  contempt: 'Desprecio',
  shame: 'Vergüenza',
  pride: 'Orgullo',
  love: 'Amor / afiliación',
  anxiety: 'Ansiedad sostenida',
  panic: 'Pánico',
  awe: 'Asombro',
  'baseline-neutral': 'Referencia calibrada',
  contentment: 'satisfacción',
  depression: 'depresión',
  embarrassment: 'azoro',
  excitement: 'entusiasmo',
  grief: 'duelo',
  loneliness: 'soledad',
};
export function createI18n(doc = document) {
  let locale = 'es';
  try {
    if (doc.defaultView.localStorage.getItem('SomatoEmotions-language') === 'en') locale = 'en';
  } catch {
    // The language toggle also works when storage is blocked.
  }
  const apply = () => {
    doc.documentElement.lang = locale;
    for (const [selector, value] of Object.entries(text[locale])) {
      for (const el of doc.querySelectorAll(selector)) {
        if (el.id === 'list-cardiovascular') continue;
        if (el.id === 'category-filters') {
          el.previousElementSibling.textContent = value;
          continue;
        }
        if (
          ['app-status', 'active-name', 'evidence-content'].includes(el.id) &&
          el.dataset.i18nInitialized
        )
          continue;
        el.dataset.i18nInitialized = 'true';
        if (el instanceof doc.defaultView.HTMLInputElement) el.placeholder = value;
        else if (
          el instanceof doc.defaultView.HTMLButtonElement ||
          el instanceof doc.defaultView.HTMLAnchorElement
        )
          el.textContent = value;
        else el.textContent = value;
      }
    }
    doc
      .getElementById('emotion-list')
      ?.setAttribute('aria-label', locale === 'es' ? 'Emociones' : 'Emotions');
    doc
      .querySelector('.view-tabs')
      ?.setAttribute('aria-label', locale === 'es' ? 'Vistas de referencia' : 'Reference views');
    doc.querySelector('.site-footer a[href="LICENSE"]').textContent =
      locale === 'es' ? 'Licencia GNU AGPL versión 3' : 'GNU AGPL version 3 license';
    doc.querySelector('.site-footer a[href="NOTICE"]').textContent =
      locale === 'es' ? 'Aviso de autoría y licencia' : 'Author and license notice';
    const toggle = doc.getElementById('language-toggle');
    toggle.textContent = locale === 'es' ? 'English' : 'Español';
    toggle.lang = locale === 'es' ? 'en' : 'es';
    try {
      doc.defaultView.localStorage.setItem('SomatoEmotions-language', locale);
    } catch {
      // Keep the choice in memory for this visit.
    }
  };
  apply();
  doc.getElementById('language-toggle').addEventListener('click', () => {
    locale = locale === 'es' ? 'en' : 'es';
    apply();
    doc.dispatchEvent(new CustomEvent('SomatoEmotions-language-change', { detail: locale }));
  });
  return {
    locale: () => locale,
    translate: (value, id) => (locale === 'es' ? emotionNames[id] || value : value),
  };
}
