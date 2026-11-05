import path from 'node:path';
import { convertLocal } from '../src/infrastructure/tools/image-pipeline/main.js';
for (const output of await convertLocal(process.argv.slice(2).map((x) => path.resolve(x))))
  console.log(output);
