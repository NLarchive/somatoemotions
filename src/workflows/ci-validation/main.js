import { buildSourceArchive } from '../../infrastructure/tools/source-archive/main.js';
import { buildPackage } from '../../infrastructure/tools/release-package/main.js';
import { auditBundle } from '../../infrastructure/tools/security-audit/main.js';
import { auditPerformance } from '../../infrastructure/tools/performance-audit/main.js';
import { auditContent } from '../content-review/main.js';
export async function buildCandidate() {
  const content = await auditContent();
  const source = await buildSourceArchive();
  const release = await buildPackage();
  const security = await auditBundle(),
    performance = await auditPerformance();
  if (!security.ok || !performance.ok) throw Error(JSON.stringify({ security, performance }));
  return {
    release_id: release.id,
    content_id: release.content_id,
    files: release.files.length,
    content,
    source_sha256: source.archive_sha256,
    security,
    performance,
  };
}
export function run({ gates }) {
  if (!Array.isArray(gates) || !gates.length) throw Error('No quality gates');
  return {
    ok: gates.every((g) => g.passed === true),
    failed: gates.filter((g) => g.passed !== true).map((g) => g.name),
  };
}
