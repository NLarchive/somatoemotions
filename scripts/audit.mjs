import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { auditPlan } from '../src/infrastructure/tools/task-graph-audit/main.js';
import { auditContent } from '../src/workflows/content-review/main.js';
import { auditBundle } from '../src/infrastructure/tools/security-audit/main.js';
import { auditPerformance } from '../src/infrastructure/tools/performance-audit/main.js';
import { validateProfile } from '../src/infrastructure/tools/hosting-profile/main.js';
import { validateContract } from '../src/infrastructure/tools/content-audit/main.js';
const mode = process.argv[2];
let result;
if (['content', 'references', 'images', 'evidence'].includes(mode)) result = await auditContent();
else if (mode === 'plan' || mode === 'registry') {
  const plan = JSON.parse(await readFile('node.tasks.json', 'utf8'));
  result = auditPlan(plan);
  const contract = JSON.parse(
    await readFile('src/infrastructure/tools/task-graph-audit/tasks.schema.json', 'utf8'),
  );
  const schemaResult = validateContract(plan, contract);
  result.errors.push(...schemaResult.errors);
  result.ok = result.ok && schemaResult.ok;
  const registry = JSON.parse(await readFile('src/registry.json', 'utf8'));
  for (const u of registry.units)
    if (u.status !== 'planned')
      for (const f of u.files) {
        try {
          await access(u.path + '/' + f);
        } catch {
          result.errors.push('Missing implemented slot: ' + u.path + '/' + f);
          result.ok = false;
        }
      }
  for (const u of registry.units)
    if (u.status !== 'planned') {
      const manifest = JSON.parse(await readFile(u.path + '/manifest.json', 'utf8'));
      if (
        manifest.id !== u.name ||
        JSON.stringify(manifest.dependencies) !== JSON.stringify(u.depends_on)
      ) {
        result.errors.push('Manifest/registry mismatch: ' + u.name);
        result.ok = false;
      }
      const code = await readFile(u.path + '/main.js', 'utf8');
      for (const m of code.matchAll(
        /(?:import|export)\s+(?:[^'";]*?\s+from\s*)?['"]([^'"]+)['"]/g,
      )) {
        if (!m[1].startsWith('.')) continue;
        const { posix } = await import('node:path');
        const destination = posix.normalize(posix.join(u.path, m[1]));
        const dependency = registry.units.find((x) => destination.startsWith(x.path + '/'));
        if (
          dependency &&
          dependency.name !== u.name &&
          !u.depends_on.some((x) => x.unit === dependency.name)
        ) {
          result.errors.push(`Undeclared import ${u.name} -> ${dependency.name}`);
          result.ok = false;
        }
      }
    }
} else if (mode === 'security') result = await auditBundle();
else if (mode === 'performance') result = await auditPerformance();
else if (mode === 'hosting')
  result = validateProfile(JSON.parse(await readFile('deploy/profile.json', 'utf8')));
else throw Error('Unknown audit mode');
await mkdir('docs/reports', { recursive: true });
await writeFile(`docs/reports/${mode}.json`, JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
