import { readFile, writeFile, readdir } from 'node:fs/promises';
import prettier from 'prettier';
const config = JSON.parse(await readFile('.prettierrc.json', 'utf8'));
async function walk(root) {
  const out = [];
  for (const f of await readdir(root, { withFileTypes: true })) {
    const path = root + '/' + f.name;
    if (f.isDirectory()) out.push(...(await walk(path)));
    else if (/\.(?:mjs|js)$/.test(path)) out.push(path);
  }
  return out;
}
const files = [
  'app.js',
  'index.html',
  'styles.css',
  ...(await walk('src')),
  ...(await walk('scripts')),
  ...(await walk('tests')),
];
let changed = 0;
for (const file of files) {
  const text = await readFile(file, 'utf8'),
    options = { ...config, filepath: file };
  if (!(await prettier.check(text, options))) {
    changed++;
    if (process.argv.includes('--write'))
      await writeFile(file, await prettier.format(text, options));
    else console.error('Formatting differs: ' + file);
  }
}
console.log(
  `${changed} files ${process.argv.includes('--write') ? 'formatted' : 'need formatting'}`,
);
if (changed && !process.argv.includes('--write')) process.exitCode = 1;
