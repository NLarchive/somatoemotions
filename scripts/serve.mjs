import { createServer as httpServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const headers = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-cache',
  'X-Robots-Tag': 'noindex, nofollow',
};
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};
function allowed(name) {
  if (
    [
      'index.html',
      'app.js',
      'styles.css',
      'data.json',
      'prompts.json',
      'sources.json',
      'visual-index.json',
      'favicon.svg',
      'robots.txt',
      'sitemap.xml',
      'LICENSE',
      'source.tar.gz',
      'release-manifest.json',
    ].includes(name)
  )
    return true;
  if (/^images\/(?:face|action|somatic)\/[a-z0-9_-]+\.webp$/.test(name)) return true;
  return (
    /^src\/(?:core|application|infrastructure\/adapters|ui|workflows\/atlas-runtime)\/[a-z0-9_/-]+\.(?:js|json)$/.test(
      name,
    ) && !/(?:^|\/)tests(?:\/|$)|manifest\.json|schema\.json/.test(name)
  );
}
export function createPreviewServer({ root = process.cwd(), basePath = '/' } = {}) {
  root = path.resolve(root);
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(basePath))
    throw new Error('basePath must be / or /segment/');
  return httpServer(async (req, res) => {
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { Allow: 'GET, HEAD' });
      res.end();
      return;
    }
    try {
      const raw = req.url.split('?')[0];
      const pathname = decodeURIComponent(raw);
      if (
        pathname.includes('\\') ||
        pathname.includes('\0') ||
        pathname.split('/').some((x) => x === '..' || x === '.') ||
        !pathname.startsWith(basePath)
      ) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const name = pathname.slice(basePath.length) || 'index.html';
      if (!allowed(name)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      let file = path.resolve(root, name);
      if (name === 'source.tar.gz') {
        try {
          await stat(file);
        } catch {
          file = path.resolve(root, 'artifacts/source.tar.gz');
        }
      }
      const canonical = await realpath(file);
      const canonicalRoot = await realpath(root);
      if (!canonical.startsWith(canonicalRoot + path.sep)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const info = await stat(file);
      if (!info.isFile()) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      if (req.method === 'HEAD') {
        res.writeHead(200, {
          'Content-Type':
            name === 'LICENSE'
              ? 'text/plain; charset=utf-8'
              : mime[path.extname(name)] || 'application/octet-stream',
          'Content-Length': info.size,
        });
        res.end();
        return;
      }
      const body = await readFile(file);
      res.writeHead(200, {
        'Content-Type':
          name === 'LICENSE'
            ? 'text/plain; charset=utf-8'
            : mime[path.extname(name)] || 'application/octet-stream',
        'Content-Length': body.length,
      });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const option = (name, fallback) =>
    args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
  const host = option('--host', '127.0.0.1');
  const port = Number(option('--port', 4173));
  const basePath = option('--base', '/');
  const server = createPreviewServer({ root: option('--root', process.cwd()), basePath });
  server.on('error', (err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
  server.listen(port, host, () =>
    console.log(`InteroMap preview: http://${host}:${server.address().port}${basePath}`),
  );
}
