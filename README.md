# SomatoEmotions 4.0

A static educational atlas of body, facial and action illustrations. Body appearance does not determine a person's emotion or diagnosis.

## Run locally

Use Node 24.22.1 (`.nvmrc`). Run `npm ci`, then `npm run browsers:install` for the browser test runtimes. Start `npm run serve` and open [the local atlas](http://127.0.0.1:4173/). Direct `file://` opening is unsupported because the app uses modules and JSON fetches.

## Validate and build

- `npm run verify` runs the local automated quality pipeline.
- `npm run check:browsers` verifies the complete three-browser report, rather than accepting a filtered test run.
- `npm run verify:archive` restores and checks every corresponding-source file.
- `npm run verify:staging` checks the exact package at root and `/atlas/` paths.
- `npm run verify:rollback` checks a retained candidate's recovery.
- `npm run verify:manual-review` and `npm run verify:release` enforce the final recorded review gates.
- `npm run spec` refreshes the repository inventory.

`npm run build` creates `dist/`, a file/hash manifest and a retained candidate. Preview that package with `node scripts/serve.mjs --root dist --port 4173`.

The local release build needs the canonical JPEG originals and internal review inputs under `docs/`. Restore them from a verified corresponding-source archive when starting from a checkout. These inputs and the completed manual review stay outside Git. Use `ci/manual-review.example.json` to record review and acceptance against the `content_id` in `dist/release-manifest.json`.

## Data and evidence

The catalogue has 14 emotion labels, 114 somatic records, 38 action records and 54 facial cards. The review panel lists the sources for the catalogue, which includes 21 qualified statements. Unsupported original mechanisms and percentages are archived in `docs/legacy-data.json`. See `sources.json`, `docs/evidence-review.json` and `docs/EVIDENCE_METHOD.md`. Source-based review is not independent clinical or FACS certification.

Stable `id` and `image_key` values preserve mappings when records are reordered. Atlas/prompt contract 4.0.0 intentionally replaces the earlier schema and its unsupported confidence fields. The historical `emotional-somatic-map.html` is retained in the repository as legacy material and is excluded from the public package.

## Canonical image layout

Runtime: `images/{action,face,somatic}/{name}.webp`.

Originals: `images/jpg/{action,face,somatic}/{name}.jpg`.

All 221 pairs include the 13 combined-face references. Fifteen supplementary originals remain outside the active record mapping. Generated pictures are illustrations, not measurements or certified coding. The portable converter is `node scripts/convert-images-local.mjs IMAGE_PATH ...`; it writes WebP beside the input and refuses overwrites. `scripts/import-generated.mjs` handles canonical generated-source import.

## Source, license and readiness

Copyright © 2026 Nicolás Iván Larenas Bustamante. This project is licensed under the GNU Affero General Public License v3.0; see [LICENSE](LICENSE) and [NOTICE](NOTICE). The repository provides the source code, and the release bundle includes a corresponding source archive. Scientific publications retain their own rights.

## Publish with GitHub Pages

The repository includes a manually triggered GitHub Actions workflow at `.github/workflows/pages.yml`. After local release sign-off, attach `artifacts/pages-runtime.tar.gz` to a GitHub release and run the workflow with the release tag and SHA-256 from `artifacts/pages-runtime.json`. The workflow verifies the package before publishing its runtime files. JPEG originals and internal review files stay in the separate local source archive. Keep the corresponding source available separately from Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

Before publishing, confirm the repository's default branch is `main`, review all content and image rights, and ensure the repository is public or the GitHub plan supports Pages for its visibility. GitHub Pages provides the public HTTPS URL after the first successful deployment.

`node.tasks.json` tracks implementation status and remaining gates. `docs/RELEASE.md`, `docs/ROLLBACK.md`, `docs/ACCESSIBILITY_REVIEW.md` and `docs/reports/readiness.json` describe actual verification and any pending manual evidence. Unexecuted review is never reported as passed.

[Open the live GitHub Pages site](https://nlarchive.github.io/somatoemotions/)
