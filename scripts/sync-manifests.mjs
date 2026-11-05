import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const registry = JSON.parse(await readFile('src/registry.json', 'utf8'));
for (const unit of registry.units) {
  if (unit.status === 'planned') continue;
  const file = unit.path + '/manifest.json';
  const manifest = JSON.parse(await readFile(file, 'utf8'));
  manifest.dependencies = unit.depends_on;
  manifest.api_exports = Object.keys(
    await import(pathToFileURL(path.resolve(unit.path, 'main.js'))),
  ).sort();
  await writeFile(file, JSON.stringify(manifest, null, 2) + '\n');
}
