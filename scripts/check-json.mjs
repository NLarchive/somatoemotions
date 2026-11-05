import { readFile } from 'node:fs/promises';
for (const file of ['node.tasks.json', 'data.json', 'prompts.json', 'src/registry.json']) {
  JSON.parse(await readFile(file, 'utf8'));
  console.log(`Valid JSON: ${file}`);
}
