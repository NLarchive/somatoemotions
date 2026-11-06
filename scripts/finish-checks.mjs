import { writeFile, readFile } from 'node:fs/promises';
import { auditBrowsers } from '../src/workflows/browser-validation/main.js';
import { auditDocumentation } from '../src/workflows/release-runbook/main.js';
import { verifyStaging, verifyRollback } from '../src/workflows/staging-validation/main.js';
import { manualReviewGates, readinessReport } from '../src/workflows/release-handoff/main.js';
const mode = process.argv[2];
let result;
if (mode === 'browsers') result = await auditBrowsers();
else if (mode === 'documentation') result = await auditDocumentation();
else if (mode === 'staging') result = await verifyStaging();
else if (mode === 'rollback') result = await verifyRollback();
else if (mode === 'readiness') result = await readinessReport();
else if (mode === 'manual') {
  const m = JSON.parse(await readFile('docs/manual-review.json', 'utf8'));
  const manifest = JSON.parse(await readFile('dist/release-manifest.json', 'utf8'));
  const gates = manualReviewGates(m, manifest.content_id);
  result = {
    ok: gates.every((gate) => gate.passed),
    gates,
    evidence: m,
  };
} else throw Error('Unknown final-check mode');
await writeFile(`docs/reports/${mode}.json`, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (result.ok === false || result.ready === false) process.exitCode = 1;
