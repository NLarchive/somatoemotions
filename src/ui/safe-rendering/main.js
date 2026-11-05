export function element(tag, text = '', className = '', doc = globalThis.document) {
  const el = doc.createElement(tag);
  if (text !== undefined && text !== null) el.textContent = String(text);
  if (className) el.className = className;
  return el;
}
export function safeSourceURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
export function sourceLink(source, doc = globalThis.document) {
  const url = safeSourceURL(source.url);
  if (!url) return element('span', 'Invalid source link', '', doc);
  const link = element('a', source.title, '', doc);
  link.href = url;
  link.rel = 'noopener noreferrer';
  return link;
}
export async function copyText(text, clipboard = globalThis.navigator?.clipboard) {
  if (!clipboard?.writeText)
    return { ok: false, message: 'Clipboard is unavailable. Select and copy the text instead.' };
  try {
    await clipboard.writeText(text);
    return { ok: true, message: 'Prompt copied.' };
  } catch {
    return {
      ok: false,
      message: 'Clipboard permission was denied. Select and copy the text instead.',
    };
  }
}
export function run({ url }) {
  return { safe: safeSourceURL(url) !== null };
}
