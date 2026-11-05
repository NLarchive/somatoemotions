import { readFile, access } from 'node:fs/promises';
export function checkCommands({ commands, available }) {
  const missing = commands.filter((x) => !available.includes(x));
  return { ok: !missing.length, missing };
}
export async function auditDocumentation() {
  const pkg = JSON.parse(await readFile('package.json', 'utf8')),
    readme = await readFile('README.md', 'utf8');
  const commands = [...readme.matchAll(/npm run ([a-z0-9:-]+)/g)].map((x) => x[1]);
  const result = checkCommands({ commands, available: Object.keys(pkg.scripts) });
  for (const file of [
    'docs/RELEASE.md',
    'docs/MAINTENANCE.md',
    'docs/ROLLBACK.md',
    'docs/LICENSING.md',
    'docs/SOURCE_ARCHIVE.md',
    'PROJECT_SPEC.md',
    'LICENSE',
  ])
    try {
      await access(file);
    } catch {
      result.missing.push(file);
      result.ok = false;
    }
  return result;
}
export function run(input) {
  return checkCommands(input);
}
