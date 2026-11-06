import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { digest, packTar, unpackTar } from '../src/infrastructure/tools/source-archive/main.js';
import { isRuntimePath } from '../src/infrastructure/tools/release-package/main.js';

function allowed(name) {
  return (
    isRuntimePath(name) ||
    /^src\/(?:core|application|infrastructure\/adapters|ui|workflows\/atlas-runtime)\/[a-z0-9_/-]+\.js$/.test(
      name,
    )
  );
}

function readPackage(archive, expectedHash) {
  if (!/^[a-f0-9]{64}$/.test(expectedHash) || digest(archive) !== expectedHash)
    throw Error('Pages package SHA-256 mismatch');
  const files = unpackTar(archive);
  if (!files.some(({ name }) => name === 'index.html') || files.some(({ name }) => !allowed(name)))
    throw Error('Pages package contains missing or unexpected runtime files');
  return files;
}

async function packagePages() {
  const manifest = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
  const files = [];
  for (const entry of manifest.files) {
    if (entry.path === 'source.tar.gz') continue;
    if (!allowed(entry.path)) throw Error(`Unexpected runtime path: ${entry.path}`);
    const data = await readFile(path.join('dist', entry.path));
    if (data.length !== entry.bytes || digest(data) !== entry.sha256)
      throw Error(`Built file differs from manifest: ${entry.path}`);
    files.push({ name: entry.path, data });
  }
  const archive = packTar(files);
  const sha256 = digest(archive);
  const restored = readPackage(archive, sha256);
  if (
    restored.length !== files.length ||
    restored.some(
      (file, index) => file.name !== files[index].name || !file.data.equals(files[index].data),
    )
  )
    throw Error('Pages package restore differs from the verified build');
  await mkdir('artifacts', { recursive: true });
  await writeFile('artifacts/pages-runtime.tar.gz', archive);
  const report = {
    release_id: manifest.id,
    content_id: manifest.content_id,
    files: files.length,
    bytes: archive.length,
    sha256,
  };
  await writeFile('artifacts/pages-runtime.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
}

const [mode, input, sha256, output] = process.argv.slice(2);
if (mode === undefined) {
  await packagePages();
} else if (mode === 'unpack' && input && sha256 && output) {
  const files = readPackage(await readFile(input), sha256);
  const root = path.resolve(output);
  await mkdir(root);
  for (const { name, data } of files) {
    const file = path.join(root, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, data, { flag: 'wx' });
  }
} else {
  throw Error('Usage: node scripts/package-pages.mjs [unpack ARCHIVE SHA256 OUTPUT]');
}
