import { writeFile, readFile } from 'node:fs/promises';
import { auditBrowsers } from '../src/workflows/browser-validation/main.js';
import { auditDocumentation } from '../src/workflows/release-runbook/main.js';
import { verifyStaging, verifyRollback } from '../src/workflows/staging-validation/main.js';
import { readinessReport } from '../src/workflows/release-handoff/main.js';
const mode = process.argv[2];
let result;
if (mode === 'browsers') result = await auditBrowsers();
else if (mode === 'documentation') result = await auditDocumentation();
else if (mode === 'staging') result = await verifyStaging();
else if (mode === 'rollback') result = await verifyRollback();
else if (mode === 'readiness') result = await readinessReport();
else if (mode === 'manual') {
  const m = JSON.parse(await readFile('docs/manual-review.json', 'utf8'));
  result = {
    ok:
      m.keyboard === 'passed' &&
      m.screen_reader === 'passed' &&
      Boolean(m.reviewer) &&
      Boolean(m.screen_reader_product),
    evidence: m,
  };
} else throw Error('Unknown final-check mode');
await writeFile(`docs/reports/${mode}.json`, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (result.ok === false || result.ready === false) process.exitCode = 1;
