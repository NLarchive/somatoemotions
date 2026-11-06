import { readFile } from 'node:fs/promises';
export function inspectPublicText(text) {
  const errors = [];
  if (/\binnerHTML\s*=|\beval\s*\(|\bnew Function\s*\(/.test(text))
    errors.push('Unsafe dynamic HTML or code');
  if (/\son(?:error|load|click)\s*=\s*["']/i.test(text)) errors.push('Inline event handler');
  if (/(?:[A-Za-z]:[\\/](?:Users|web|IMAGES)|\/Users\/)/.test(text))
    errors.push('Developer filesystem path');
  if (/(?:sk-proj-[A-Za-z0-9_-]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/.test(text))
    errors.push('Possible secret');
  return { ok: !errors.length, errors };
}
export async function auditBundle() {
  const manifest = JSON.parse(await readFile('dist/release-manifest.json', 'utf8')),
    errors = [];
  for (const entry of manifest.files) {
    if (
      /(?:^|\/)(?:jpg|node_modules|tests|\.git)(?:\/|$)|node\.tasks|generation-|completion\.jsonl|PROJECT_SPEC/.test(
        entry.path,
      )
    )
      errors.push(`Private artifact: ${entry.path}`);
    if (/\.(html|css|js|json)$/.test(entry.path))
      errors.push(
        ...inspectPublicText(await readFile('dist/' + entry.path, 'utf8')).errors.map(
          (x) => entry.path + ': ' + x,
        ),
      );
  }
  const html = await readFile('dist/index.html', 'utf8');
  if (!html.includes('href="LICENSE"') || !html.includes('href="NOTICE"'))
    errors.push('Missing license or author notice');
  if (!manifest.files.some((f) => f.path === 'source.tar.gz'))
    errors.push('Missing corresponding source archive');
  return {
    ok: !errors.length,
    errors,
    review_scope:
      'Static output and safe rendering checks; dependency audit and live headers are separate gates.',
  };
}
export function run({ text }) {
  return inspectPublicText(text);
}
