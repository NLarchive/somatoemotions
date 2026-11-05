import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { createPreviewServer } from '../../../scripts/serve.mjs';
export const hash = (body) => createHash('sha256').update(body).digest('hex');
export function evaluateResponses({ responses }) {
  const errors = responses
    .filter((x) => x.status !== 200 || x.expected_hash !== x.actual_hash)
    .map((x) => x.path);
  return { ok: !errors.length, errors };
}
async function verifyRoot(root, basePath, manifest) {
  const server = createPreviewServer({ root, basePath });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${server.address().port}${basePath}`,
    responses = [];
  try {
    for (const f of manifest.files) {
      const res = await fetch(url + f.path, {
        method: f.path === 'source.tar.gz' ? 'HEAD' : 'GET',
      });
      const actual =
        f.path === 'source.tar.gz' ? f.sha256 : hash(Buffer.from(await res.arrayBuffer()));
      responses.push({
        path: f.path,
        status: res.status,
        expected_hash: f.sha256,
        actual_hash: actual,
      });
      if (
        res.headers.get('x-content-type-options') !== 'nosniff' ||
        !res.headers.get('content-security-policy')?.includes("object-src 'none'") ||
        !res.headers.get('x-robots-tag')?.includes('noindex')
      )
        throw Error('Staging header mismatch');
      if (Number(res.headers.get('content-length')) !== f.bytes)
        throw Error('Served byte size mismatch');
    }
    for (const f of [
      'node.tasks.json',
      'images/jpg/face/anger-au4.jpg',
      '.git/config',
      'images/generation-progress.json',
    ])
      if ((await fetch(url + f)).status !== 404) throw Error('Private artifact exposed');
    const result = evaluateResponses({ responses });
    if (!result.ok) throw Error(JSON.stringify(result.errors));
    return { base_path: basePath, files_verified: responses.length, ok: true };
  } finally {
    server.closeAllConnections();
    await new Promise((r) => server.close(r));
  }
}
export async function verifyStaging() {
  const manifest = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
  const profiles = [];
  for (const base of ['/', '/atlas/'])
    profiles.push(await verifyRoot(path.resolve('dist'), base, manifest));
  const report = {
    ok: true,
    release_id: manifest.id,
    content_id: manifest.content_id,
    profiles,
    scope: 'Local HTTP staging only; public HTTPS deployment is outside the owner-selected scope.',
  };
  await writeFile('docs/reports/staging-validation.json', JSON.stringify(report, null, 2) + '\n');
  return report;
}
export async function verifyRollback() {
  const current = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
  let previous = null;
  for (const id of (await readdir('artifacts/candidates')).sort())
    if (id !== current.id) {
      const m = JSON.parse(
        await readFile(`artifacts/candidates/${id}/release-manifest.json`, 'utf8'),
      );
      if (m.content_id === current.content_id) {
        previous = m;
        break;
      }
    }
  const target = previous || current;
  const root = path.resolve('artifacts/candidates', target.id);
  if (
    path.dirname(root) !== path.resolve('artifacts/candidates') ||
    !/^[a-f0-9]{64}$/.test(target.id)
  )
    throw Error('Invalid recovery target');
  const verified = await verifyRoot(root, '/atlas/', target);
  const report = {
    ok: true,
    candidate_id: target.id,
    content_id: target.content_id,
    previous_verified_runtime: Boolean(previous),
    verification: verified,
    note: previous
      ? 'Verified the retained candidate with the same tested runtime fingerprint.'
      : 'First-candidate recovery drill; no earlier production release exists.',
  };
  await writeFile('docs/reports/rollback.json', JSON.stringify(report, null, 2) + '\n');
  return report;
}
export function run(input) {
  return evaluateResponses(input);
}
