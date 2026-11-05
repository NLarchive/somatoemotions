import { element, sourceLink } from '../safe-rendering/main.js';
export function references(record, catalog) {
  return [
    ...new Set([...(record.evidence?.source_ids || []), ...(record.method_source_ids || [])]),
  ].map((id) => {
    const source = catalog.sources.find((s) => s.id === id);
    if (!source) throw Error('Unknown source reference');
    return source;
  });
}
export function evidenceNote(record, catalog, doc = globalThis.document) {
  const wrap = element('div', '', 'evidence-note', doc);
  wrap.append(
    element(
      'p',
      record.content_type === 'scientific_claim'
        ? 'Source-qualified statement.'
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
      li.append(sourceLink(source, doc));
      list.append(li);
    }
    wrap.append(list);
  }
  return wrap;
}
export function renderEvidence(catalog, doc = globalThis.document) {
  const target = doc.getElementById('evidence-content');
  target.replaceChildren();
  target.append(
    element(
      'p',
      'Source-based editorial review: 24 October 2026. No independent human or FACS certification is claimed. Unsupported assertions and confidence numbers are retained in the source audit archive.',
      '',
      doc,
    ),
  );
  const list = element('ol', '', 'bibliography', doc);
  for (const s of catalog.sources) {
    const li = element('li', '', '', doc);
    li.id = `source-${s.id}`;
    li.append(
      sourceLink(s, doc),
      element('p', `${s.authors}${s.year ? ` (${s.year})` : ''} · ${s.type}`, '', doc),
      element('p', s.scope, '', doc),
      element('p', s.limitations, 'note', doc),
    );
    list.append(li);
  }
  target.append(list);
}
export function run({ record, catalog }) {
  return { source_ids: references(record, catalog).map((x) => x.id) };
}
