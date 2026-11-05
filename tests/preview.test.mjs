import test from 'node:test';
import assert from 'node:assert/strict';
import { createPreviewServer } from '../scripts/serve.mjs';

for (const basePath of ['/', '/atlas/'])
  test(`static server and private-artifact boundaries at ${basePath}`, async () => {
    const server = createPreviewServer({ basePath });
    await new Promise((r) => server.listen(0, '127.0.0.1', r));
    const url = `http://127.0.0.1:${server.address().port}${basePath}`;
    try {
      for (const file of [
        '',
        'app.js',
        'styles.css',
        'data.json',
        'prompts.json',
        'images/face/anger-au4.webp',
      ]) {
        const res = await fetch(url + file);
        assert.equal(res.status, 200, file);
        assert.match(res.headers.get('content-security-policy'), /object-src 'none'/);
        assert.ok((await res.arrayBuffer()).byteLength);
      }
      for (const file of [
        'node.tasks.json',
        '.git/config',
        'package.json',
        'images/generation-progress.json',
        'images/jpg/face/anger-au4.jpg',
        'src/registry.json',
        '%2e%2e%2fdata.json',
        'images%5cface%5canger-au4.webp',
      ]) {
        assert.equal((await fetch(url + file)).status, 404, file);
      }
      assert.equal((await fetch(url, { method: 'POST' })).status, 405);
    } finally {
      server.closeAllConnections();
      await new Promise((r) => server.close(r));
    }
  });
