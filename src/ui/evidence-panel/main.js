import { element, sourceLink } from '../safe-rendering/main.js';
import { localizedSource } from '../i18n/sources.js';
export function references(record, catalog) {
  return [
    ...new Set([...(record.evidence?.source_ids || []), ...(record.method_source_ids || [])]),
  ].map((id) => {
    const source = catalog.sources.find((s) => s.id === id);
    if (!source) throw Error('Unknown source reference');
    return source;
  });
}
export function evidenceNote(
  record,
  catalog,
  doc = globalThis.document,
  i18n = { locale: () => 'en' },
) {
  const wrap = element('div', '', 'evidence-note', doc);
  wrap.append(
    element(
      'p',
      record.content_type === 'scientific_claim'
        ? i18n.locale() === 'es'
          ? 'Afirmación contextualizada por sus fuentes.'
          : 'Source-qualified statement.'
        : i18n.locale() === 'es'
          ? 'Solo ilustración. Esta pose no permite inferir emociones ni diagnósticos.'
          : 'Illustration only. No emotion or diagnosis can be inferred from this pose.',
      '',
      doc,
    ),
  );
  const refs = references(record, catalog);
  if (refs.length) {
    const list = element('ul', '', 'source-links', doc);
    for (const source of refs) {
      const li = element('li', '', '', doc);
      li.append(sourceLink(localizedSource(source, i18n.locale()), doc));
      list.append(li);
    }
    wrap.append(list);
  }
  return wrap;
}
export function renderEvidence(catalog, doc = globalThis.document, i18n = { locale: () => 'en' }) {
  const target = doc.getElementById('evidence-content');
  target.replaceChildren();
  target.append(
    element(
      'p',
      i18n.locale() === 'es'
        ? 'Revisión editorial basada en fuentes: 24 de octubre de 2026. No se afirma contar con certificación humana independiente ni certificación FACS. Las afirmaciones no respaldadas y cifras de confianza se conservan en el archivo de auditoría.'
        : 'Source-based editorial review: 24 October 2026. No independent human or FACS certification is claimed. Unsupported assertions and confidence numbers are retained in the source audit archive.',
      '',
      doc,
    ),
  );
  const list = element('ol', '', 'bibliography', doc);
  for (const s of catalog.sources) {
    const source = localizedSource(s, i18n.locale());
    const li = element('li', '', '', doc);
    li.id = `source-${s.id}`;
    li.append(
      sourceLink(source, doc),
      element(
        'p',
        `${source.authors}${source.year ? ` (${source.year})` : ''} · ${source.type}`,
        '',
        doc,
      ),
      element('p', source.scope, '', doc),
      element('p', source.limitations, 'note', doc),
    );
    list.append(li);
  }
  target.append(list);
}
export function run({ record, catalog }) {
  return { source_ids: references(record, catalog).map((x) => x.id) };
}
