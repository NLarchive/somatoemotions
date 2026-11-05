import { writeFile, mkdir } from 'node:fs/promises';
import { buildCandidate } from '../src/workflows/ci-validation/main.js';
const result = await buildCandidate();
await mkdir('docs/reports', { recursive: true });
await writeFile('docs/reports/build.json', JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
