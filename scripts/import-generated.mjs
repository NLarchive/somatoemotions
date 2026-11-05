import { importGenerated } from '../src/infrastructure/tools/image-pipeline/main.js';
const args = process.argv.slice(2),
  get = (k) => args[args.indexOf(k) + 1];
if (!args.includes('--key') || !args.includes('--source'))
  throw Error('Usage: --key face/name --source absolute-generated-image.png');
console.log(JSON.stringify(await importGenerated({ key: get('--key'), source: get('--source') })));
