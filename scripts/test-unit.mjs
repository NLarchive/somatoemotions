import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
const registry = JSON.parse(await readFile('src/registry.json', 'utf8'));
const requested = process.argv.slice(2);
await mkdir('docs/reports', { recursive: true });
await writeFile('docs/reports/unit-results.json', JSON.stringify({ ok: false, state: 'running' }));
const units = requested.length
  ? registry.units.filter((u) => requested.includes(u.name))
  : registry.units.filter((u) => u.status !== 'planned');
if (!units.length || requested.some((n) => !units.some((u) => u.name === n)))
  throw new Error('No implemented unit matches the requested check');
let cases = 0;
for (const unit of units) {
  const fixtures = JSON.parse(await readFile(path.join(unit.path, 'tests/unit.json'), 'utf8'));
  if (!Array.isArray(fixtures) || !fixtures.length)
    throw new Error(`${unit.name}: no contract cases`);
  const { run } = await import(pathToFileURL(path.resolve(unit.path, 'main.js')));
  const contract = JSON.parse(await readFile(path.join(unit.path, 'schema.json'), 'utf8'));
  const ajv = new Ajv2020({ allErrors: true });
  const checkInput = ajv.compile(contract.properties.input),
    checkOutput = ajv.compile(contract.properties.output);
  if (typeof run !== 'function') throw new Error(`${unit.name}: missing run export`);
  for (const c of fixtures) {
    assert.ok(
      checkInput(c.input),
      `${unit.name}: fixture violates input contract: ${ajv.errorsText(checkInput.errors)}`,
    );
    if (c.expected_error)
      await assert.rejects(async () => run(c.input), new RegExp(c.expected_error), c.name);
    else {
      const actual = await run(c.input);
      assert.ok(checkOutput(actual), `${unit.name}: output contract violation`);
      assert.deepEqual(actual, c.expected_output, c.name);
    }
    cases++;
  }
  console.log(`${unit.name}: ${fixtures.length} contract cases passed`);
}
console.log(`${cases} cases passed`);
await writeFile(
  'docs/reports/unit-results.json',
  JSON.stringify({ ok: true, units: units.length, cases, node: process.version }, null, 2) + '\n',
);
