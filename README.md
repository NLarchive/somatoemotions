# InteroMap 4.0

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

## Data and evidence

The catalogue has 14 emotion labels, 114 somatic records, 38 action records and 55 facial cards. Twenty-one narrowly qualified statements link to sources; the other records are neutral illustration labels. Unsupported original mechanisms and percentages are archived in `docs/legacy-data.json`. See `sources.json`, `docs/evidence-review.json` and `docs/EVIDENCE_METHOD.md`. Source-based review is not independent clinical or FACS certification.

Stable `id` and `image_key` values preserve mappings when records are reordered. Atlas/prompt contract 4.0.0 intentionally replaces the earlier schema and its unsupported confidence fields. The historical `emotional-somatic-map.html` is retained in the repository as legacy material and is excluded from the public package.

## Canonical image layout

Runtime: `images/{action,face,somatic}/{name}.webp`.

Originals: `images/jpg/{action,face,somatic}/{name}.jpg`.

All 221 pairs include the 13 combined-face references. Fifteen supplementary originals remain outside the active record mapping. Generated pictures are illustrations, not measurements or certified coding. The portable converter is `node scripts/convert-images-local.mjs IMAGE_PATH ...`; it writes WebP beside the input and refuses overwrites. `scripts/import-generated.mjs` handles canonical generated-source import.

## Source, license and readiness

Copyright © 2026 Nicolás Iván Larenas Bustamante. This project is licensed under the GNU Affero General Public License v3.0; see [LICENSE](LICENSE) and [NOTICE](NOTICE). The repository provides the source code, and the release bundle includes a corresponding source archive. Scientific publications retain their own rights.

## Publish with GitHub Pages

The repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`. Push to `main` (or run it from Actions) to build `dist/` and publish it with GitHub Pages. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The workflow deploys the static release package, including its corresponding source archive, license and notice. The app uses relative asset URLs and supports both user/organization sites and project sites under `/<repository>/`.

Before publishing, confirm the repository's default branch is `main`, review all content and image rights, and ensure the repository is public or the GitHub plan supports Pages for its visibility. GitHub Pages provides the public HTTPS URL after the first successful deployment.

`node.tasks.json` tracks implementation status and remaining gates. `docs/RELEASE.md`, `docs/ROLLBACK.md`, `docs/ACCESSIBILITY_REVIEW.md` and `docs/reports/readiness.json` describe actual verification and any pending manual evidence. Unexecuted review is never reported as passed.

[Open the live GitHub Pages site](https://nlarchive.github.io/somatoemotions/)
