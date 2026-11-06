# Project Specification: emotions
Generated: 2026-11-05 19:21
<!-- To update this file, run: python D:\tools\context\extract_project_spec\app.py --root D:\web\emotions\ -->

## Folder structure

ci
deploy
images
images/action
images/face
images/somatic
scripts
src
src/application
src/application/services
src/application/services/atlas-service
src/application/services/atlas-service/tests
src/application/services/navigation-service
src/application/services/navigation-service/tests
src/application/services/visual-resolver
src/application/services/visual-resolver/tests
src/core
src/core/domain
src/core/domain/atlas-model
src/core/domain/atlas-model/tests
src/core/domain/evidence-policy
src/core/domain/evidence-policy/tests
src/core/domain/visual-model
src/core/domain/visual-model/tests
src/core/ports
src/core/ports/atlas-resource-port
src/core/ports/atlas-resource-port/tests
src/infrastructure
src/infrastructure/adapters
src/infrastructure/adapters/fetch-resources
src/infrastructure/adapters/fetch-resources/tests
src/infrastructure/tools
src/infrastructure/tools/content-audit
src/infrastructure/tools/content-audit/tests
src/infrastructure/tools/hosting-profile
src/infrastructure/tools/hosting-profile/tests
src/infrastructure/tools/image-pipeline
src/infrastructure/tools/image-pipeline/tests
src/infrastructure/tools/performance-audit
src/infrastructure/tools/performance-audit/tests
src/infrastructure/tools/release-package
src/infrastructure/tools/release-package/tests
src/infrastructure/tools/security-audit
src/infrastructure/tools/security-audit/tests
src/infrastructure/tools/source-archive
src/infrastructure/tools/source-archive/tests
src/infrastructure/tools/task-graph-audit
src/infrastructure/tools/task-graph-audit/tests
src/ui
src/ui/atlas-shell
src/ui/atlas-shell/tests
src/ui/evidence-panel
src/ui/evidence-panel/tests
src/ui/reference-gallery
src/ui/reference-gallery/tests
src/ui/safe-rendering
src/ui/safe-rendering/tests
src/workflows
src/workflows/atlas-runtime
src/workflows/atlas-runtime/tests
src/workflows/browser-validation
src/workflows/browser-validation/tests
src/workflows/ci-validation
src/workflows/ci-validation/tests
src/workflows/content-review
src/workflows/content-review/tests
src/workflows/release-handoff
src/workflows/release-handoff/tests
src/workflows/release-runbook
src/workflows/release-runbook/tests
src/workflows/staging-validation
src/workflows/staging-validation/tests
tests
tests/e2e
.gitignore
.npmrc
.nvmrc
.prettierrc.json
app.js
ci/quality-gates.json
data.json
deploy/profile.json
emotional-somatic-map.html
favicon.svg
images/action/anger-act-0.webp
images/action/anger-act-1.webp
images/action/anger-act-2.webp
images/action/anger-act-3.webp
images/action/anxiety-act-0.webp
images/action/anxiety-act-1.webp
images/action/anxiety-act-2.webp
images/action/awe-act-0.webp
images/action/awe-act-1.webp
images/action/baseline-neutral-act-0.webp
images/action/baseline-neutral-act-1.webp
images/action/contempt-act-0.webp
images/action/contempt-act-1.webp
images/action/disgust-act-0.webp
images/action/disgust-act-1.webp
images/action/disgust-act-2.webp
images/action/fear-act-0.webp
images/action/fear-act-1.webp
images/action/fear-act-2.webp
images/action/happiness-act-0.webp
images/action/happiness-act-1.webp
images/action/happiness-act-2.webp
images/action/love-act-0.webp
images/action/love-act-1.webp
images/action/love-act-2.webp
images/action/panic-act-0.webp
images/action/panic-act-1.webp
images/action/panic-act-2.webp
images/action/pride-act-0.webp
images/action/pride-act-1.webp
images/action/pride-act-2.webp
images/action/sadness-act-0.webp
images/action/sadness-act-1.webp
images/action/sadness-act-2.webp
images/action/shame-act-0.webp
images/action/shame-act-1.webp
images/action/shame-act-2.webp
images/action/surprise-act-0.webp
images/action/surprise-act-1.webp
images/face/anger-au23.webp
images/face/anger-au24.webp
images/face/anger-au4.webp
images/face/anger-au5.webp
images/face/anger-au7.webp
images/face/anger-full-face.webp
images/face/anxiety-au1-4.webp
images/face/anxiety-au24.webp
images/face/anxiety-full-face.webp
images/face/awe-au1-2.webp
images/face/awe-au26.webp
images/face/awe-au5.webp
images/face/awe-full-face.webp
images/face/baseline-neutral-au0.webp
images/face/contempt-au10-unilateral.webp
images/face/contempt-au14-unilateral.webp
images/face/contempt-full-face.webp
images/face/disgust-au10.webp
images/face/disgust-au15.webp
images/face/disgust-au16.webp
images/face/disgust-au9.webp
images/face/disgust-full-face.webp
images/face/fear-au1.webp
images/face/fear-au2.webp
images/face/fear-au20.webp
images/face/fear-au4.webp
images/face/fear-au5.webp
images/face/fear-full-face.webp
images/face/happiness-au12.webp
images/face/happiness-au25.webp
images/face/happiness-au6.webp
images/face/happiness-full-face.webp
images/face/love-au12.webp
images/face/love-au6.webp
images/face/love-full-face.webp
images/face/panic-au1-2-5.webp
images/face/panic-au26.webp
images/face/panic-full-face.webp
images/face/pride-au12.webp
images/face/pride-au53.webp
images/face/pride-full-face.webp
images/face/sadness-au1.webp
images/face/sadness-au15.webp
images/face/sadness-au17.webp
images/face/sadness-au4.webp
images/face/sadness-full-face.webp
images/face/shame-au15.webp
images/face/shame-au54.webp
images/face/shame-au64.webp
images/face/shame-full-face.webp
images/face/surprise-au1-2.webp
images/face/surprise-au26.webp
images/face/surprise-au5.webp
images/face/surprise-full-face.webp
images/generation-progress.json
images/generation-resume.jsonl
images/image-completion.jsonl
images/somatic/anger-cardiovascular-0.webp
images/somatic/anger-cardiovascular-1.webp
images/somatic/anger-cardiovascular-2.webp
images/somatic/anger-gastrointestinal-0.webp
images/somatic/anger-integumentary_thermal-0.webp
images/somatic/anger-integumentary_thermal-1.webp
images/somatic/anger-musculoskeletal-0.webp
images/somatic/anger-musculoskeletal-1.webp
images/somatic/anger-musculoskeletal-2.webp
images/somatic/anger-neurosensory-0.webp
images/somatic/anger-neurosensory-1.webp
images/somatic/anger-respiratory-0.webp
images/somatic/anger-respiratory-1.webp
images/somatic/anxiety-cardiovascular-0.webp
images/somatic/anxiety-cardiovascular-1.webp
images/somatic/anxiety-gastrointestinal-0.webp
images/somatic/anxiety-integumentary_thermal-0.webp
images/somatic/anxiety-integumentary_thermal-1.webp
images/somatic/anxiety-musculoskeletal-0.webp
images/somatic/anxiety-musculoskeletal-1.webp
images/somatic/anxiety-musculoskeletal-2.webp
images/somatic/anxiety-neurosensory-0.webp
images/somatic/anxiety-neurosensory-1.webp
images/somatic/anxiety-respiratory-0.webp
images/somatic/anxiety-respiratory-1.webp
images/somatic/awe-cardiovascular-0.webp
images/somatic/awe-gastrointestinal-0.webp
images/somatic/awe-integumentary_thermal-0.webp
images/somatic/awe-musculoskeletal-0.webp
images/somatic/awe-neurosensory-0.webp
images/somatic/awe-respiratory-0.webp
images/somatic/baseline-neutral-cardiovascular-0.webp
images/somatic/baseline-neutral-gastrointestinal-0.webp
images/somatic/baseline-neutral-integumentary_thermal-0.webp
images/somatic/baseline-neutral-musculoskeletal-0.webp
images/somatic/baseline-neutral-neurosensory-0.webp
images/somatic/baseline-neutral-respiratory-0.webp
images/somatic/contempt-cardiovascular-0.webp
images/somatic/contempt-gastrointestinal-0.webp
images/somatic/contempt-integumentary_thermal-0.webp
images/somatic/contempt-musculoskeletal-0.webp
images/somatic/contempt-neurosensory-0.webp
images/somatic/contempt-respiratory-0.webp
images/somatic/disgust-cardiovascular-0.webp
images/somatic/disgust-gastrointestinal-0.webp
images/somatic/disgust-gastrointestinal-1.webp
images/somatic/disgust-integumentary_thermal-0.webp
images/somatic/disgust-integumentary_thermal-1.webp
images/somatic/disgust-musculoskeletal-0.webp
images/somatic/disgust-musculoskeletal-1.webp
images/somatic/disgust-neurosensory-0.webp
images/somatic/disgust-respiratory-0.webp
images/somatic/fear-cardiovascular-0.webp
images/somatic/fear-cardiovascular-1.webp
images/somatic/fear-cardiovascular-2.webp
images/somatic/fear-gastrointestinal-0.webp
images/somatic/fear-gastrointestinal-1.webp
images/somatic/fear-integumentary_thermal-0.webp
images/somatic/fear-integumentary_thermal-1.webp
images/somatic/fear-musculoskeletal-0.webp
images/somatic/fear-musculoskeletal-1.webp
images/somatic/fear-musculoskeletal-2.webp
images/somatic/fear-neurosensory-0.webp
images/somatic/fear-neurosensory-1.webp
images/somatic/fear-respiratory-0.webp
images/somatic/fear-respiratory-1.webp
images/somatic/happiness-cardiovascular-0.webp
images/somatic/happiness-cardiovascular-1.webp
images/somatic/happiness-gastrointestinal-0.webp
images/somatic/happiness-integumentary_thermal-0.webp
images/somatic/happiness-integumentary_thermal-1.webp
images/somatic/happiness-musculoskeletal-0.webp
images/somatic/happiness-musculoskeletal-1.webp
images/somatic/happiness-neurosensory-0.webp
images/somatic/happiness-neurosensory-1.webp
images/somatic/happiness-respiratory-0.webp
images/somatic/happiness-respiratory-1.webp
images/somatic/love-cardiovascular-0.webp
images/somatic/love-gastrointestinal-0.webp
images/somatic/love-integumentary_thermal-0.webp
images/somatic/love-musculoskeletal-0.webp
images/somatic/love-musculoskeletal-1.webp
images/somatic/love-neurosensory-0.webp
images/somatic/love-respiratory-0.webp
images/somatic/panic-cardiovascular-0.webp
images/somatic/panic-gastrointestinal-0.webp
images/somatic/panic-integumentary_thermal-0.webp
images/somatic/panic-musculoskeletal-0.webp
images/somatic/panic-musculoskeletal-1.webp
images/somatic/panic-musculoskeletal-2.webp
images/somatic/panic-neurosensory-0.webp
images/somatic/panic-neurosensory-1.webp
images/somatic/panic-respiratory-0.webp
images/somatic/pride-cardiovascular-0.webp
images/somatic/pride-gastrointestinal-0.webp
images/somatic/pride-integumentary_thermal-0.webp
images/somatic/pride-musculoskeletal-0.webp
images/somatic/pride-musculoskeletal-1.webp
images/somatic/pride-musculoskeletal-2.webp
images/somatic/pride-neurosensory-0.webp
images/somatic/pride-respiratory-0.webp
images/somatic/sadness-cardiovascular-0.webp
images/somatic/sadness-cardiovascular-1.webp
images/somatic/sadness-gastrointestinal-0.webp
images/somatic/sadness-gastrointestinal-1.webp
images/somatic/sadness-integumentary_thermal-0.webp
images/somatic/sadness-integumentary_thermal-1.webp
images/somatic/sadness-musculoskeletal-0.webp
images/somatic/sadness-musculoskeletal-1.webp
images/somatic/sadness-musculoskeletal-2.webp
images/somatic/sadness-neurosensory-0.webp
images/somatic/sadness-neurosensory-1.webp
images/somatic/sadness-respiratory-0.webp
images/somatic/sadness-respiratory-1.webp
images/somatic/shame-cardiovascular-0.webp
images/somatic/shame-gastrointestinal-0.webp
images/somatic/shame-integumentary_thermal-0.webp
images/somatic/shame-musculoskeletal-0.webp
images/somatic/shame-musculoskeletal-1.webp
images/somatic/shame-neurosensory-0.webp
images/somatic/shame-respiratory-0.webp
images/somatic/surprise-cardiovascular-0.webp
images/somatic/surprise-gastrointestinal-0.webp
images/somatic/surprise-integumentary_thermal-0.webp
images/somatic/surprise-musculoskeletal-0.webp
images/somatic/surprise-musculoskeletal-1.webp
images/somatic/surprise-neurosensory-0.webp
images/somatic/surprise-respiratory-0.webp
index.html
LICENSE
node.tasks.json
package.json
playwright.config.mjs
prompts.json
README.md
robots.txt
scripts/audit.mjs
scripts/baseline.mjs
scripts/build.mjs
scripts/catalogue.mjs
scripts/check-json.mjs
scripts/convert-images-local.mjs
scripts/finish-checks.mjs
scripts/format.mjs
scripts/import-generated.mjs
scripts/migrate-atlas.mjs
scripts/playwright.mjs
scripts/project-spec.mjs
scripts/record-visual-review.mjs
scripts/review-images.mjs
scripts/serve.mjs
scripts/sync-manifests.mjs
scripts/test-unit.mjs
scripts/update-progress.mjs
scripts/verify-archive.mjs
scripts/verify.mjs
sources.json
src/application/services/atlas-service/main.js
src/application/services/atlas-service/manifest.json
src/application/services/atlas-service/schema.json
src/application/services/atlas-service/tests/unit.json
src/application/services/navigation-service/main.js
src/application/services/navigation-service/manifest.json
src/application/services/navigation-service/schema.json
src/application/services/navigation-service/tests/unit.json
src/application/services/visual-resolver/main.js
src/application/services/visual-resolver/manifest.json
src/application/services/visual-resolver/schema.json
src/application/services/visual-resolver/tests/unit.json
src/core/domain/atlas-model/dataset.schema.json
src/core/domain/atlas-model/main.js
src/core/domain/atlas-model/manifest.json
src/core/domain/atlas-model/prompts.schema.json
src/core/domain/atlas-model/schema.json
src/core/domain/atlas-model/tests/unit.json
src/core/domain/evidence-policy/evidence.schema.json
src/core/domain/evidence-policy/main.js
src/core/domain/evidence-policy/manifest.json
src/core/domain/evidence-policy/schema.json
src/core/domain/evidence-policy/tests/unit.json
src/core/domain/visual-model/main.js
src/core/domain/visual-model/manifest.json
src/core/domain/visual-model/schema.json
src/core/domain/visual-model/tests/unit.json
src/core/domain/visual-model/visual-index.schema.json
src/core/ports/atlas-resource-port/main.js
src/core/ports/atlas-resource-port/manifest.json
src/core/ports/atlas-resource-port/schema.json
src/core/ports/atlas-resource-port/tests/unit.json
src/infrastructure/adapters/fetch-resources/main.js
src/infrastructure/adapters/fetch-resources/manifest.json
src/infrastructure/adapters/fetch-resources/schema.json
src/infrastructure/adapters/fetch-resources/tests/unit.json
src/infrastructure/tools/content-audit/main.js
src/infrastructure/tools/content-audit/manifest.json
src/infrastructure/tools/content-audit/schema.json
src/infrastructure/tools/content-audit/tests/unit.json
src/infrastructure/tools/hosting-profile/main.js
src/infrastructure/tools/hosting-profile/manifest.json
src/infrastructure/tools/hosting-profile/schema.json
src/infrastructure/tools/hosting-profile/tests/unit.json
src/infrastructure/tools/image-pipeline/main.js
src/infrastructure/tools/image-pipeline/manifest.json
src/infrastructure/tools/image-pipeline/schema.json
src/infrastructure/tools/image-pipeline/tests/unit.json
src/infrastructure/tools/performance-audit/main.js
src/infrastructure/tools/performance-audit/manifest.json
src/infrastructure/tools/performance-audit/schema.json
src/infrastructure/tools/performance-audit/tests/unit.json
src/infrastructure/tools/release-package/main.js
src/infrastructure/tools/release-package/manifest.json
src/infrastructure/tools/release-package/schema.json
src/infrastructure/tools/release-package/tests/unit.json
src/infrastructure/tools/security-audit/main.js
src/infrastructure/tools/security-audit/manifest.json
src/infrastructure/tools/security-audit/schema.json
src/infrastructure/tools/security-audit/tests/unit.json
src/infrastructure/tools/source-archive/main.js
src/infrastructure/tools/source-archive/manifest.json
src/infrastructure/tools/source-archive/schema.json
src/infrastructure/tools/source-archive/tests/unit.json
src/infrastructure/tools/task-graph-audit/main.js
src/infrastructure/tools/task-graph-audit/manifest.json
src/infrastructure/tools/task-graph-audit/schema.json
src/infrastructure/tools/task-graph-audit/tasks.schema.json
src/infrastructure/tools/task-graph-audit/tests/unit.json
src/registry.json
src/ui/atlas-shell/main.js
src/ui/atlas-shell/manifest.json
src/ui/atlas-shell/schema.json
src/ui/atlas-shell/tests/unit.json
src/ui/evidence-panel/main.js
src/ui/evidence-panel/manifest.json
src/ui/evidence-panel/schema.json
src/ui/evidence-panel/tests/unit.json
src/ui/reference-gallery/main.js
src/ui/reference-gallery/manifest.json
src/ui/reference-gallery/schema.json
src/ui/reference-gallery/tests/unit.json
src/ui/safe-rendering/main.js
src/ui/safe-rendering/manifest.json
src/ui/safe-rendering/schema.json
src/ui/safe-rendering/tests/unit.json
src/workflows/atlas-runtime/main.js
src/workflows/atlas-runtime/manifest.json
src/workflows/atlas-runtime/schema.json
src/workflows/atlas-runtime/state.js
src/workflows/atlas-runtime/tests/e2e.json
src/workflows/atlas-runtime/tests/unit.json
src/workflows/atlas-runtime/workflow.json
src/workflows/browser-validation/main.js
src/workflows/browser-validation/manifest.json
src/workflows/browser-validation/schema.json
src/workflows/browser-validation/state.js
src/workflows/browser-validation/tests/e2e.json
src/workflows/browser-validation/tests/unit.json
src/workflows/browser-validation/workflow.json
src/workflows/ci-validation/main.js
src/workflows/ci-validation/manifest.json
src/workflows/ci-validation/schema.json
src/workflows/ci-validation/state.js
src/workflows/ci-validation/tests/e2e.json
src/workflows/ci-validation/tests/unit.json
src/workflows/ci-validation/workflow.json
src/workflows/content-review/main.js
src/workflows/content-review/manifest.json
src/workflows/content-review/schema.json
src/workflows/content-review/state.js
src/workflows/content-review/tests/e2e.json
src/workflows/content-review/tests/unit.json
src/workflows/content-review/workflow.json
src/workflows/release-handoff/main.js
src/workflows/release-handoff/manifest.json
src/workflows/release-handoff/schema.json
src/workflows/release-handoff/state.js
src/workflows/release-handoff/tests/e2e.json
src/workflows/release-handoff/tests/unit.json
src/workflows/release-handoff/workflow.json
src/workflows/release-runbook/main.js
src/workflows/release-runbook/manifest.json
src/workflows/release-runbook/schema.json
src/workflows/release-runbook/state.js
src/workflows/release-runbook/tests/e2e.json
src/workflows/release-runbook/tests/unit.json
src/workflows/release-runbook/workflow.json
src/workflows/staging-validation/main.js
src/workflows/staging-validation/manifest.json
src/workflows/staging-validation/schema.json
src/workflows/staging-validation/state.js
src/workflows/staging-validation/tests/e2e.json
src/workflows/staging-validation/tests/unit.json
src/workflows/staging-validation/workflow.json
styles.css
tests/contracts.test.mjs
tests/e2e/atlas.spec.mjs
tests/preview.test.mjs
tests/release.test.mjs
visual-index.json

---

## File Structures

structure from .gitignore:  (no extractable definitions)

structure from .npmrc:  (no extractable definitions)

structure from .nvmrc:  (no extractable definitions)

structure from .prettierrc.json:
    [json-key] singleQuote: true
    [json-key] printWidth: 100
    [json-key] trailingComma: "all"

structure from LICENSE:  (no extractable definitions)

structure from README.md:
    [file-summary] SomatoEmotions 4.0
    [trust-moderate] [heading-1] # SomatoEmotions 4.0
    [trust-moderate] [heading-2] ## Run locally
    [trust-moderate] [heading-2] ## Validate and build
    [trust-moderate] [heading-2] ## Data and evidence
    [trust-moderate] [heading-2] ## Canonical image layout
    [trust-moderate] [heading-2] ## Source, license and readiness

structure from app.js:  (no extractable definitions)

structure from data.json:
    [json-key] schema_version: "4.0.0"
    [json-key] metadata: {external_shared_labels, evidence_policy, confidence_policy, migration}
    [json-key] emotions: [14 items]

structure from emotional-somatic-map.html:
    [file-summary] Emotional Somatic Manifestations Map
    [title] <title>Emotional Somatic Manifestations Map</title>
    [heading-1] <h1>🧠 Emotional Somatic Manifestations Map</h1>
    [heading-2] <h2>📊 How to Use This Map</h2>
    [heading-2] <h2>😠 Anger</h2>
    [heading-2] <h2>😨 Fear</h2>
    [heading-2] <h2>😢 Sadness</h2>
    [heading-2] <h2>😊 Happiness</h2>
    [heading-2] <h2>🤢 Disgust</h2>
    [heading-2] <h2>😲 Surprise</h2>
    [heading-2] <h2>😰 Anxiety</h2>
    [heading-2] <h2>❤️ Love</h2>
    [heading-2] <h2>😔 Shame</h2>
    [heading-2] <h2>😔 Guilt</h2>
    [heading-2] <h2>🤩 Pride</h2>
    [heading-2] <h2>😒 Contempt</h2>
    [heading-2] <h2>😔 Depression</h2>
    [heading-2] <h2>🤗 Embarrassment</h2>
    [heading-2] <h2>😌 Contentment</h2>
    [heading-2] <h2>😤 Frustration</h2>
    [heading-2] <h2>🎉 Excitement</h2>
    [heading-2] <h2>😔 Loneliness</h2>
    [heading-2] <h2>😨 Awe</h2>
    [heading-2] <h2>😔 Grief</h2>
    [heading-2] <h2>📚 Important Considerations & Research Notes</h2>
    [heading-3] <h3>🌍 Universality Research</h3>
    [heading-3] <h3>⚠️ Individual Variation</h3>
    [heading-3] <h3>🔄 Overlapping Patterns</h3>
    [heading-3] <h3>🧠 Neural Basis</h3>
    [heading-3] <h3>📊 Valence Dimension</h3>
    [heading-3] <h3>🔬 Physiological Correlates</h3>
    [heading-3] <h3>👥 Cultural Variations</h3>
    [heading-3] <h3>📈 Aging Effects</h3>
    [heading-2] <h2>📖 References & Sources</h2>

structure from favicon.svg:  (no extractable definitions)

structure from index.html:
    [file-summary] An educational atlas of posed body and facial illustrations with source-qualified context and clear limits on emotion inference.
    [title] <title>SomatoEmotions · Emotion reference atlas</title>
    [meta] meta[description]  «An educational atlas of posed body and facial illustrations with source-qualified context and clear limits on emotion in»
    [meta] meta[robots]  «noindex, nofollow»
    [section] <aside id="sidebar">
    [heading-2] <h2>SomatoEmotions</h2>
    [section] <nav id="emotion-list">
    [section] <main id="content-viewport">
    [section] <header id="emotion-header">
    [heading-1] <h1>Loading the atlas</h1>
    [section] <aside id="context-notice">
    [section] <section id="panel-somatic">
    [heading-2] <h2>Bodily references</h2>
    [section] <article id="system-card">
    [heading-3] <h3>Cardiovascular</h3>
    [section] <article id="system-card">
    [heading-3] <h3>Respiratory</h3>
    [section] <article id="system-card">
    [heading-3] <h3>Gastrointestinal</h3>
    [section] <article id="system-card">
    [heading-3] <h3>Musculoskeletal</h3>
    [section] <article id="system-card">
    [heading-3] <h3>Thermal / skin</h3>
    [section] <article id="system-card">
    [heading-3] <h3>Neurosensory</h3>
    [section] <section id="panel-facs">
    [heading-2] <h2>Facial movement references</h2>
    [section] <section id="panel-actions">
    [heading-2] <h2>Action references</h2>
    [section] <article id="action-card">
    [heading-3] <h3>Posed action references</h3>
    [section] <footer id="site-footer">

structure from node.tasks.json:
    [file-summary] SomatoEmotions production-readiness task graph adapted from supplied project_task_template v3.3. Planned atomic units keep the atlas a static browser application; gateway APIs, persistence and AI-agent run
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] template_type: "project_task_template"
    [json-key] version: "3.3"
    [json-key] description: "SomatoEmotions production-readiness task graph adapted from suppl..."
    [json-key] enums: {status, project_status, priority, complexity, dependency_type, +14 more}
    [json-key] project: {name, description, start_date, end_date, status, +13 more}
    [json-key] project_structure: {root, architecture, architecture_guide, dependency_rules, atomic_unit_standard, +1 more}
    [json-key] unit_registry: [27 items]
    [json-key] categories: [7 items]
    [json-key] workers: [7 items]
    [json-key] tasks: [28 items]
    [json-key] required_fields: [15 items]
    [json-key] optional_fields: [38 items]
    [json-key] navigation: {rootModule, modules}

structure from package.json:
    [file-summary] SomatoEmotions-atlas
    [json-key] name: "SomatoEmotions-atlas"
    [json-key] version: "4.0.0"
    [json-key] private: true
    [json-key] type: "module"
    [json-key] license: "AGPL-3.0-only"
    [json-key] engines: {node}
    [json-key] scripts: {serve, check:json, check:unit, test:preview, test, +27 more}
    [json-key] devDependencies: {@axe-core/playwright, @playwright/test, ajv, prettier, sharp}

structure from playwright.config.mjs:  (no extractable definitions)

structure from prompts.json:
    [json-key] schema_version: "4.0.0"
    [json-key] notes: "Every claim that can appear in the UI has a fallback prompt...."
    [json-key] prompts: {somatic/shame-musculoskeletal-1, somatic/pride-musculoskeletal-2, somatic/anger-cardiovascular-0, somatic/anger-cardiovascular-1, somatic/anger-cardiovascular-2, +216 more}

structure from robots.txt:  (no extractable definitions)

structure from sources.json:
    [json-key] schema_version: "1.0.0"
    [json-key] review_method: "source-based editorial audit"
    [json-key] human_certification: false
    [json-key] sources: [10 items]

structure from styles.css:
    [file-summary] Split layouts with visuals
    [note] [warning] Tree-sitter CSS backend is unavailable; CSS extraction is running in regex fallback mode.
    [css-variable] --paper
    [css-variable] --paper-2
    [css-variable] --ink
    [css-variable] --ink-soft
    [css-variable] --ink-mute
    [css-variable] --line
    [css-variable] --card
    [css-variable] --sidebar
    [css-variable] --sidebar-ink
    [css-variable] --sidebar-mute
    [css-variable] --accent
    [css-variable] --accent-2
    [css-variable] --good
    [css-variable] --mid
    [css-variable] --low
    [css-variable] --font-sans
    [css-variable] --font-serif
    [css-variable] --font-mono
    [css-variable] --radius
    [selector] .app-shell
    [selector] .sidebar
    [selector] .brand
    [selector] .brand h2
    [selector] .version-tag
    [selector] .search-box input
    [selector] .search-box input::placeholder
    [selector] .filter-label
    [selector] .filter-chips
    [selector] .chip
    [selector] .chip.active
    [selector] .emotion-nav
    [selector] .nav-item
    [selector] .nav-item:hover
    [selector] .nav-item.active
    [selector] .nav-badge
    [selector] .content-viewport
    [selector] .emotion-header
    [selector] .title-row
    [selector] .title-row h1
    [selector] #active-summary
    [selector] .badge
    [selector] .metrics-cluster
    [selector] .metric-card
    [selector] .metric-title
    [selector] .metric-value
    [selector] .metric-sub
    [selector] .metric-scale
    [selector] .metric-scale .bar
    [selector] .view-tabs
    [selector] .tab
    [selector] .tab.active
    [selector] .tab-panel
    [selector] .tab-panel.active
    [selector] .panel-lead
    [section] /* Split layouts with visuals */
    [selector] .facs-split-grid
    [selector] .facs-list
    [selector] .action-visuals
    [selector] .visual-placeholder
    [section] /* System cards */
    [selector] .system-card
    [selector] .card-head
    [selector] .action-card h3
    [selector] .manifest-list
    [selector] .claim-row
    [selector] .claim-row:hover
    [selector] .claim-row.active
    [selector] .claim-row span:first-child
    [selector] .rel-pill
    [selector] .rel-T1
    [selector] .rel-T2
    [selector] .rel-T4
    [selector] .note
    [section] /* Visual blocks */
    [selector] .visual-block
    [selector] .visual-block img
    [selector] .visual-caption
    [selector] .prompt-fallback
    [selector] .prompt-fallback.show
    [selector] .prompt-label
    [selector] .prompt-text
    [selector] .btn-copy
    [section] /* FACS */
    [selector] .facs-grid
    [selector] .facs-card
    [selector] .facs-card:hover
    [selector] .facs-card.active
    [selector] .facs-badge-row
    [selector] .facs-code
    [selector] .role-tag
    [selector] .facs-muscles
    [selector] .facs-desc
    [section] /* Actions */
    [selector] .action-card
    [selector] .large-list li
    [selector] .large-list li:hover
    [selector] .large-list li.active
    [selector] .toast
    [selector] .toast.show
    [selector] .sr-only
    [selector] .skip-link
    [selector] .skip-link:focus
    [selector] .skip-link:not(:focus)
    [selector] .btn-back
    [selector] .sidebar :focus-visible
    [selector] .facs-select
    [selector] .record-label
    [selector] .context-notice
    [selector] summary
    [selector] .evidence-note
    [selector] .bibliography
    [selector] .bibliography li
    [selector] a
    [selector] .site-footer
    [selector] .toast:empty
    [selector] #result-count
    [selector] #app-status
    [selector] .atlas-loading .tab-panel

structure from visual-index.json:
    [json-key] schema_version: "1.0.0"
    [json-key] images: {action/anger-act-0, action/anger-act-1, action/anger-act-2, action/anger-act-3, action/anxiety-act-0, +216 more}

structure from ci/quality-gates.json:
    [json-key] provider: "local"
    [json-key] node: "24.22.1"
    [json-key] installation: "npm ci"
    [json-key] entry: "npm run verify"
    [json-key] checks: [17 items]
    [json-key] artifacts: [3 items]
    [json-key] publication: "No public deployment is configured. Owner requested local te..."

structure from deploy/profile.json:
    [json-key] mode: "local-staging"
    [json-key] host: "127.0.0.1"
    [json-key] port: 4173
    [json-key] base_path: "/"
    [json-key] alternate_base_path: "/atlas/"
    [json-key] public_domain: null
    [json-key] indexing: false
    [json-key] tls: "Not applicable to loopback HTTP testing; HTTPS and public-ho..."
    [json-key] owner_decision: "Use local server for testing, 2026-10-24"

structure from images/generation-progress.json:
    [json-key] status: "complete"
    [json-key] format: "canonical categorized JPG and WebP"
    [json-key] jpg_originals: 221
    [json-key] missing_webp_or_jpg: [0 items]
    [json-key] assets: [221 items]

structure from images/generation-resume.jsonl:  (no extractable definitions)

structure from images/image-completion.jsonl:  (no extractable definitions)

structure from images/action/anger-act-0.webp:  (no extractable definitions)

structure from images/action/anger-act-1.webp:  (no extractable definitions)

structure from images/action/anger-act-2.webp:  (no extractable definitions)

structure from images/action/anger-act-3.webp:  (no extractable definitions)

structure from images/action/anxiety-act-0.webp:  (no extractable definitions)

structure from images/action/anxiety-act-1.webp:  (no extractable definitions)

structure from images/action/anxiety-act-2.webp:  (no extractable definitions)

structure from images/action/awe-act-0.webp:  (no extractable definitions)

structure from images/action/awe-act-1.webp:  (no extractable definitions)

structure from images/action/baseline-neutral-act-0.webp:  (no extractable definitions)

structure from images/action/baseline-neutral-act-1.webp:  (no extractable definitions)

structure from images/action/contempt-act-0.webp:  (no extractable definitions)

structure from images/action/contempt-act-1.webp:  (no extractable definitions)

structure from images/action/disgust-act-0.webp:  (no extractable definitions)

structure from images/action/disgust-act-1.webp:  (no extractable definitions)

structure from images/action/disgust-act-2.webp:  (no extractable definitions)

structure from images/action/fear-act-0.webp:  (no extractable definitions)

structure from images/action/fear-act-1.webp:  (no extractable definitions)

structure from images/action/fear-act-2.webp:  (no extractable definitions)

structure from images/action/happiness-act-0.webp:  (no extractable definitions)

structure from images/action/happiness-act-1.webp:  (no extractable definitions)

structure from images/action/happiness-act-2.webp:  (no extractable definitions)

structure from images/action/love-act-0.webp:  (no extractable definitions)

structure from images/action/love-act-1.webp:  (no extractable definitions)

structure from images/action/love-act-2.webp:  (no extractable definitions)

structure from images/action/panic-act-0.webp:  (no extractable definitions)

structure from images/action/panic-act-1.webp:  (no extractable definitions)

structure from images/action/panic-act-2.webp:  (no extractable definitions)

structure from images/action/pride-act-0.webp:  (no extractable definitions)

structure from images/action/pride-act-1.webp:  (no extractable definitions)

structure from images/action/pride-act-2.webp:  (no extractable definitions)

structure from images/action/sadness-act-0.webp:  (no extractable definitions)

structure from images/action/sadness-act-1.webp:  (no extractable definitions)

structure from images/action/sadness-act-2.webp:  (no extractable definitions)

structure from images/action/shame-act-0.webp:  (no extractable definitions)

structure from images/action/shame-act-1.webp:  (no extractable definitions)

structure from images/action/shame-act-2.webp:  (no extractable definitions)

structure from images/action/surprise-act-0.webp:  (no extractable definitions)

structure from images/action/surprise-act-1.webp:  (no extractable definitions)

structure from images/face/anger-au23.webp:  (no extractable definitions)

structure from images/face/anger-au24.webp:  (no extractable definitions)

structure from images/face/anger-au4.webp:  (no extractable definitions)

structure from images/face/anger-au5.webp:  (no extractable definitions)

structure from images/face/anger-au7.webp:  (no extractable definitions)

structure from images/face/anger-full-face.webp:  (no extractable definitions)

structure from images/face/anxiety-au1-4.webp:  (no extractable definitions)

structure from images/face/anxiety-au24.webp:  (no extractable definitions)

structure from images/face/anxiety-full-face.webp:  (no extractable definitions)

structure from images/face/awe-au1-2.webp:  (no extractable definitions)

structure from images/face/awe-au26.webp:  (no extractable definitions)

structure from images/face/awe-au5.webp:  (no extractable definitions)

structure from images/face/awe-full-face.webp:  (no extractable definitions)

structure from images/face/baseline-neutral-au0.webp:  (no extractable definitions)

structure from images/face/contempt-au10-unilateral.webp:  (no extractable definitions)

structure from images/face/contempt-au14-unilateral.webp:  (no extractable definitions)

structure from images/face/contempt-full-face.webp:  (no extractable definitions)

structure from images/face/disgust-au10.webp:  (no extractable definitions)

structure from images/face/disgust-au15.webp:  (no extractable definitions)

structure from images/face/disgust-au16.webp:  (no extractable definitions)

structure from images/face/disgust-au9.webp:  (no extractable definitions)

structure from images/face/disgust-full-face.webp:  (no extractable definitions)

structure from images/face/fear-au1.webp:  (no extractable definitions)

structure from images/face/fear-au2.webp:  (no extractable definitions)

structure from images/face/fear-au20.webp:  (no extractable definitions)

structure from images/face/fear-au4.webp:  (no extractable definitions)

structure from images/face/fear-au5.webp:  (no extractable definitions)

structure from images/face/fear-full-face.webp:  (no extractable definitions)

structure from images/face/happiness-au12.webp:  (no extractable definitions)

structure from images/face/happiness-au25.webp:  (no extractable definitions)

structure from images/face/happiness-au6.webp:  (no extractable definitions)

structure from images/face/happiness-full-face.webp:  (no extractable definitions)

structure from images/face/love-au12.webp:  (no extractable definitions)

structure from images/face/love-au6.webp:  (no extractable definitions)

structure from images/face/love-full-face.webp:  (no extractable definitions)

structure from images/face/panic-au1-2-5.webp:  (no extractable definitions)

structure from images/face/panic-au26.webp:  (no extractable definitions)

structure from images/face/panic-full-face.webp:  (no extractable definitions)

structure from images/face/pride-au12.webp:  (no extractable definitions)

structure from images/face/pride-au53.webp:  (no extractable definitions)

structure from images/face/pride-full-face.webp:  (no extractable definitions)

structure from images/face/sadness-au1.webp:  (no extractable definitions)

structure from images/face/sadness-au15.webp:  (no extractable definitions)

structure from images/face/sadness-au17.webp:  (no extractable definitions)

structure from images/face/sadness-au4.webp:  (no extractable definitions)

structure from images/face/sadness-full-face.webp:  (no extractable definitions)

structure from images/face/shame-au15.webp:  (no extractable definitions)

structure from images/face/shame-au54.webp:  (no extractable definitions)

structure from images/face/shame-au64.webp:  (no extractable definitions)

structure from images/face/shame-full-face.webp:  (no extractable definitions)

structure from images/face/surprise-au1-2.webp:  (no extractable definitions)

structure from images/face/surprise-au26.webp:  (no extractable definitions)

structure from images/face/surprise-au5.webp:  (no extractable definitions)

structure from images/face/surprise-full-face.webp:  (no extractable definitions)

structure from images/somatic/anger-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/anger-cardiovascular-1.webp:  (no extractable definitions)

structure from images/somatic/anger-cardiovascular-2.webp:  (no extractable definitions)

structure from images/somatic/anger-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/anger-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/anger-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/anger-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/anger-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/anger-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/anger-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/anger-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/anger-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/anger-respiratory-1.webp:  (no extractable definitions)

structure from images/somatic/anxiety-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-cardiovascular-1.webp:  (no extractable definitions)

structure from images/somatic/anxiety-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/anxiety-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/anxiety-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/anxiety-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/anxiety-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/anxiety-respiratory-1.webp:  (no extractable definitions)

structure from images/somatic/awe-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/awe-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/awe-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/awe-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/awe-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/awe-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/baseline-neutral-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/contempt-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-gastrointestinal-1.webp:  (no extractable definitions)

structure from images/somatic/disgust-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/disgust-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/disgust-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/disgust-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/fear-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/fear-cardiovascular-1.webp:  (no extractable definitions)

structure from images/somatic/fear-cardiovascular-2.webp:  (no extractable definitions)

structure from images/somatic/fear-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/fear-gastrointestinal-1.webp:  (no extractable definitions)

structure from images/somatic/fear-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/fear-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/fear-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/fear-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/fear-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/fear-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/fear-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/fear-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/fear-respiratory-1.webp:  (no extractable definitions)

structure from images/somatic/happiness-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-cardiovascular-1.webp:  (no extractable definitions)

structure from images/somatic/happiness-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/happiness-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/happiness-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/happiness-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/happiness-respiratory-1.webp:  (no extractable definitions)

structure from images/somatic/love-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/love-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/love-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/love-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/love-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/love-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/love-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/panic-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/panic-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/panic-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/panic-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/panic-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/panic-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/panic-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/panic-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/panic-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/pride-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/pride-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/pride-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/pride-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/pride-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/pride-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/pride-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/pride-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-cardiovascular-1.webp:  (no extractable definitions)

structure from images/somatic/sadness-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-gastrointestinal-1.webp:  (no extractable definitions)

structure from images/somatic/sadness-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-integumentary_thermal-1.webp:  (no extractable definitions)

structure from images/somatic/sadness-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/sadness-musculoskeletal-2.webp:  (no extractable definitions)

structure from images/somatic/sadness-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-neurosensory-1.webp:  (no extractable definitions)

structure from images/somatic/sadness-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/sadness-respiratory-1.webp:  (no extractable definitions)

structure from images/somatic/shame-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/shame-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/shame-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/shame-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/shame-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/shame-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/shame-respiratory-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-cardiovascular-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-gastrointestinal-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-integumentary_thermal-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-musculoskeletal-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-musculoskeletal-1.webp:  (no extractable definitions)

structure from images/somatic/surprise-neurosensory-0.webp:  (no extractable definitions)

structure from images/somatic/surprise-respiratory-0.webp:  (no extractable definitions)

structure from scripts/audit.mjs:  (no extractable definitions)

structure from scripts/baseline.mjs:  (no extractable definitions)

structure from scripts/build.mjs:  (no extractable definitions)

structure from scripts/catalogue.mjs:  (no extractable definitions)

structure from scripts/check-json.mjs:  (no extractable definitions)

structure from scripts/convert-images-local.mjs:  (no extractable definitions)

structure from scripts/finish-checks.mjs:  (no extractable definitions)

structure from scripts/format.mjs:
    [file-summary] No top-level file docstring detected
    async function walk(root)  «docstring: none»

structure from scripts/import-generated.mjs:
    [file-summary] No top-level file docstring detected
    get = (k) =>  «docstring: none»

structure from scripts/migrate-atlas.mjs:
    [file-summary] No top-level file docstring detected
    review = (r, old, text, key, source) =>  «docstring: none»

structure from scripts/playwright.mjs:  (no extractable definitions)

structure from scripts/project-spec.mjs:  (no extractable definitions)

structure from scripts/record-visual-review.mjs:  (no extractable definitions)

structure from scripts/review-images.mjs:  (no extractable definitions)

structure from scripts/serve.mjs:
    [file-summary] No top-level file docstring detected
    function allowed(name)  «docstring: none»
    function createPreviewServer({ root = process.cwd(), basePath = '/' } = {})  «docstring: none»
    option = (name, fallback) =>  «docstring: none»

structure from scripts/sync-manifests.mjs:  (no extractable definitions)

structure from scripts/test-unit.mjs:  (no extractable definitions)

structure from scripts/update-progress.mjs:
    [file-summary] No top-level file docstring detected
    json = async (file) =>  «docstring: none»

structure from scripts/verify-archive.mjs:  (no extractable definitions)

structure from scripts/verify.mjs:
    [file-summary] No top-level file docstring detected
    save = () =>  «docstring: none»

structure from src/registry.json:
    [json-key] version: "1.0.0"
    [json-key] units: [27 items]

structure from src/application/services/atlas-service/main.js:
    [file-summary] No top-level file docstring detected
    function validateResources({ data, sources, visuals })  «docstring: none»
    async function loadAtlas(load, { signal } = {})  «docstring: none»
    function run({ data, sources, visuals })  «docstring: none»

structure from src/application/services/atlas-service/manifest.json:
    [json-key] id: "app.atlas_service"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "application/services"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [4 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/application/services/atlas-service/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/application/services/atlas-service/tests/unit.json:
    [json-array] [1 items]

structure from src/application/services/navigation-service/main.js:
    [file-summary] No top-level file docstring detected
    normalize = (text) =>  «docstring: none»
    function searchEmotions(data, { query = '', category = 'All', selectedId = null } = {})  «docstring: none»
    function run({ data, query, category, selectedId })  «docstring: none»

structure from src/application/services/navigation-service/manifest.json:
    [json-key] id: "app.navigation_service"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "application/services"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [2 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/application/services/navigation-service/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/application/services/navigation-service/tests/unit.json:
    [json-array] [3 items]

structure from src/application/services/visual-resolver/main.js:
    [file-summary] No top-level file docstring detected
    function resolveReference(record, index, prompts = {})  «docstring: none»
    function run({ record, index, prompts })  «docstring: none»

structure from src/application/services/visual-resolver/manifest.json:
    [json-key] id: "app.visual_resolver"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "application/services"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [3 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/application/services/visual-resolver/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/application/services/visual-resolver/tests/unit.json:
    [json-array] [3 items]

structure from src/core/domain/atlas-model/dataset.schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {schema_version, metadata, emotions}
    [json-key] required: [3 items]
    [json-key] additionalProperties: false

structure from src/core/domain/atlas-model/main.js:
    [file-summary] No top-level file docstring detected
    const SYSTEMS  «docstring: none»
    function records(data)  «docstring: none»
    function validateAtlas(data)  «docstring: none»
    function run({ data })  «docstring: none»

structure from src/core/domain/atlas-model/manifest.json:
    [json-key] id: "core.atlas_model"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "core/domain"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/core/domain/atlas-model/prompts.schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {schema_version, notes, prompts}
    [json-key] required: [3 items]
    [json-key] additionalProperties: false

structure from src/core/domain/atlas-model/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/core/domain/atlas-model/tests/unit.json:
    [json-array] [2 items]

structure from src/core/domain/evidence-policy/evidence.schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {schema_version, review_method, human_certification, sources}
    [json-key] required: [4 items]
    [json-key] additionalProperties: false

structure from src/core/domain/evidence-policy/main.js:
    [file-summary] No top-level file docstring detected
    function validateSources(catalog)  «docstring: none»
    function evaluateEvidence(record, sourceIds)  «docstring: none»
    function run({ record, source_ids = [] })  «docstring: none»

structure from src/core/domain/evidence-policy/manifest.json:
    [json-key] id: "core.evidence_policy"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "core/domain"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/core/domain/evidence-policy/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/core/domain/evidence-policy/tests/unit.json:
    [json-array] [3 items]

structure from src/core/domain/visual-model/main.js:
    [file-summary] No top-level file docstring detected
    validImageKey = (key) =>  «docstring: none»
    function validateVisualIndex(index)  «docstring: none»
    function run({ key })  «docstring: none»

structure from src/core/domain/visual-model/manifest.json:
    [json-key] id: "core.visual_model"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "core/domain"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/core/domain/visual-model/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/core/domain/visual-model/visual-index.schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {schema_version, images}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/core/domain/visual-model/tests/unit.json:
    [json-array] [3 items]

structure from src/core/ports/atlas-resource-port/main.js:
    [file-summary] No top-level file docstring detected
    const RESOURCE_PATHS  «docstring: none»
    class ResourceError extends Error  «docstring: none»:
        constructor(code, resource)  «docstring: none»

    function assertResource(name)  «docstring: none»
    function run({ name })  «docstring: none»

structure from src/core/ports/atlas-resource-port/manifest.json:
    [json-key] id: "ports.atlas_resource_port"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "core/ports"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [3 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/core/ports/atlas-resource-port/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/core/ports/atlas-resource-port/tests/unit.json:
    [json-array] [2 items]

structure from src/infrastructure/adapters/fetch-resources/main.js:
    [file-summary] No top-level file docstring detected
    function createResourceLoader({ fetchImpl = globalThis.fetch, baseURL = globalThis.location?.href || 'http://localhost/', timeoutMs = 6000, retries = 1, } = {})  «docstring: none»
    async function run({ name, status = 200, body = {}, invalidJson = false })  «docstring: none»

structure from src/infrastructure/adapters/fetch-resources/manifest.json:
    [json-key] id: "adapters.fetch_resources"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/adapters"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [1 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/adapters/fetch-resources/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/adapters/fetch-resources/tests/unit.json:
    [json-array] [4 items]

structure from src/infrastructure/tools/content-audit/main.js:
    [file-summary] No top-level file docstring detected
    function parseJsonStrict(text)  «docstring: none»
    function validateContract(data, schema)  «docstring: none»
    function run({ text })  «docstring: none»

structure from src/infrastructure/tools/content-audit/manifest.json:
    [json-key] id: "tools.content_audit"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/content-audit/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/content-audit/tests/unit.json:
    [json-array] [4 items]

structure from src/infrastructure/tools/hosting-profile/main.js:
    [file-summary] No top-level file docstring detected
    function validateProfile(profile)  «docstring: none»
    function run({ profile })  «docstring: none»

structure from src/infrastructure/tools/hosting-profile/manifest.json:
    [json-key] id: "tools.hosting_profile"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/hosting-profile/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/hosting-profile/tests/unit.json:
    [json-array] [2 items]

structure from src/infrastructure/tools/image-pipeline/main.js:
    [file-summary] No top-level file docstring detected
    function canonicalPaths(key)  «docstring: none»
    async function importGenerated({ key, source, root = process.cwd() })  «docstring: none»
    async function convertLocal(inputs)  «docstring: none»
    function run({ key })  «docstring: none»

structure from src/infrastructure/tools/image-pipeline/manifest.json:
    [json-key] id: "tools.image_pipeline"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/image-pipeline/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/image-pipeline/tests/unit.json:
    [json-array] [3 items]

structure from src/infrastructure/tools/performance-audit/main.js:
    [file-summary] No top-level file docstring detected
    function evaluateBudgets({ initial_bytes, max_image_bytes, total_image_bytes })  «docstring: none»
    async function auditPerformance()  «docstring: none»
    function run(input)  «docstring: none»

structure from src/infrastructure/tools/performance-audit/manifest.json:
    [json-key] id: "tools.performance_audit"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/performance-audit/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/performance-audit/tests/unit.json:
    [json-array] [2 items]

structure from src/infrastructure/tools/release-package/main.js:
    [file-summary] No top-level file docstring detected
    hash = (b) =>  «docstring: none»
    function isRuntimePath(name)  «docstring: none»
    async function modules(entry, seen = new Set())  «docstring: none»
    async function buildPackage({ sourceArchive = 'artifacts/source.tar.gz' } = {})  «docstring: none»
    function run({ path: name })  «docstring: none»

structure from src/infrastructure/tools/release-package/manifest.json:
    [json-key] id: "tools.release_package"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/release-package/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/release-package/tests/unit.json:
    [json-array] [3 items]

structure from src/infrastructure/tools/security-audit/main.js:
    [file-summary] No top-level file docstring detected
    function inspectPublicText(text)  «docstring: none»
    async function auditBundle()  «docstring: none»
    function run({ text })  «docstring: none»

structure from src/infrastructure/tools/security-audit/manifest.json:
    [json-key] id: "tools.security_audit"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/security-audit/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/security-audit/tests/unit.json:
    [json-array] [4 items]

structure from src/infrastructure/tools/source-archive/main.js:
    [file-summary] No top-level file docstring detected
    digest = (buffer) =>  «docstring: none»
    function packTar(files)  «docstring: none»
    function unpackTar(buffer)  «docstring: none»
    async function walk(dir)  «docstring: none»
    async function buildSourceArchive()  «docstring: none»
    function run({ text })  «docstring: none»

structure from src/infrastructure/tools/source-archive/manifest.json:
    [json-key] id: "tools.source_archive"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [5 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/source-archive/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/source-archive/tests/unit.json:
    [json-array] [1 items]

structure from src/infrastructure/tools/task-graph-audit/main.js:
    [file-summary] No top-level file docstring detected
    function auditPlan(plan)  «docstring: none»
    function run({ plan })  «docstring: none»

structure from src/infrastructure/tools/task-graph-audit/manifest.json:
    [json-key] id: "tools.task_graph_audit"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "infrastructure/tools"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/infrastructure/tools/task-graph-audit/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/infrastructure/tools/task-graph-audit/tasks.schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] required: [8 items]
    [json-key] properties: {project, tasks, enums, project_structure, unit_registry, +3 more}

structure from src/infrastructure/tools/task-graph-audit/tests/unit.json:
    [json-array] [1 items]

structure from src/ui/atlas-shell/main.js:
    [file-summary] No top-level file docstring detected
    const TAB_IDS  «docstring: none»
    function panelId(tab)  «docstring: none»
    function createShell(data, onSelect, doc = globalThis.document)  «docstring: none»
    function run({ tab })  «docstring: none»

structure from src/ui/atlas-shell/manifest.json:
    [json-key] id: "ui.atlas_shell"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "ui"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [3 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/ui/atlas-shell/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/ui/atlas-shell/tests/unit.json:
    [json-array] [2 items]

structure from src/ui/evidence-panel/main.js:
    [file-summary] No top-level file docstring detected
    function references(record, catalog)  «docstring: none»
    function evidenceNote(record, catalog, doc = globalThis.document)  «docstring: none»
    function renderEvidence(catalog, doc = globalThis.document)  «docstring: none»
    function run({ record, catalog })  «docstring: none»

structure from src/ui/evidence-panel/manifest.json:
    [json-key] id: "ui.evidence_panel"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "ui"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [2 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [4 items]
    [json-key] lifecycle: "stable"

structure from src/ui/evidence-panel/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/ui/evidence-panel/tests/unit.json:
    [json-array] [2 items]

structure from src/ui/reference-gallery/main.js:
    [file-summary] No top-level file docstring detected
    function describeRecord(record)  «docstring: none»
    function createGallery(model, doc = globalThis.document, evidenceNote)  «docstring: none»
    function run({ record })  «docstring: none»

structure from src/ui/reference-gallery/manifest.json:
    [json-key] id: "ui.reference_gallery"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "ui"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [3 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/ui/reference-gallery/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/ui/reference-gallery/tests/unit.json:
    [json-array] [2 items]

structure from src/ui/safe-rendering/main.js:
    [file-summary] No top-level file docstring detected
    function element(tag, text = '', className = '', doc = globalThis.document)  «docstring: none»
    function safeSourceURL(value)  «docstring: none»
    function sourceLink(source, doc = globalThis.document)  «docstring: none»
    async function copyText(text, clipboard = globalThis.navigator?.clipboard)  «docstring: none»
    function run({ url })  «docstring: none»

structure from src/ui/safe-rendering/manifest.json:
    [json-key] id: "ui.safe_rendering"
    [json-key] type: "unit"
    [json-key] version: "1.0.0"
    [json-key] layer: "ui"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [0 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [5 items]
    [json-key] lifecycle: "stable"

structure from src/ui/safe-rendering/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/ui/safe-rendering/tests/unit.json:
    [json-array] [3 items]

structure from src/workflows/atlas-runtime/main.js:
    [file-summary] No top-level file docstring detected
    function transition(state, event)  «docstring: none»
    async function startApp(doc = globalThis.document)  «docstring: none»
    function run({ state, event })  «docstring: none»

structure from src/workflows/atlas-runtime/manifest.json:
    [json-key] id: "workflows.atlas_runtime"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [8 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/workflows/atlas-runtime/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/atlas-runtime/state.js:  (no extractable definitions)

structure from src/workflows/atlas-runtime/workflow.json:
    [json-key] entry: "startApp"
    [json-key] steps: [6 items]

structure from src/workflows/atlas-runtime/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/atlas-runtime/tests/unit.json:
    [json-array] [3 items]

structure from src/workflows/browser-validation/main.js:
    [file-summary] No top-level file docstring detected
    function evaluateBrowserSummary({ passed, failed, skipped, browsers })  «docstring: none»
    async function auditBrowsers()  «docstring: none»
    function run(input)  «docstring: none»

structure from src/workflows/browser-validation/manifest.json:
    [json-key] id: "workflows.browser_validation"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [2 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "active_development"

structure from src/workflows/browser-validation/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/browser-validation/state.js:  (no extractable definitions)

structure from src/workflows/browser-validation/workflow.json:
    [json-key] entry: "auditBrowsers"
    [json-key] steps: [2 items]
    [json-key] runner: "npm run test:e2e"

structure from src/workflows/browser-validation/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/browser-validation/tests/unit.json:
    [json-array] [2 items]

structure from src/workflows/ci-validation/main.js:
    [file-summary] No top-level file docstring detected
    async function buildCandidate()  «docstring: none»
    function run({ gates })  «docstring: none»

structure from src/workflows/ci-validation/manifest.json:
    [json-key] id: "workflows.ci_validation"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [10 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/workflows/ci-validation/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/ci-validation/state.js:  (no extractable definitions)

structure from src/workflows/ci-validation/workflow.json:
    [json-key] entry: "buildCandidate"
    [json-key] steps: [5 items]

structure from src/workflows/ci-validation/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/ci-validation/tests/unit.json:
    [json-array] [2 items]

structure from src/workflows/content-review/main.js:
    [file-summary] No top-level file docstring detected
    async function auditContent({ writeReport = true } = {})  «docstring: none»
    function run({ qualified = 0, illustrations = 0 })  «docstring: none»

structure from src/workflows/content-review/manifest.json:
    [json-key] id: "workflows.content_review"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [8 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [2 items]
    [json-key] lifecycle: "stable"

structure from src/workflows/content-review/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/content-review/state.js:  (no extractable definitions)

structure from src/workflows/content-review/workflow.json:
    [json-key] steps: [6 items]

structure from src/workflows/content-review/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/content-review/tests/unit.json:
    [json-array] [2 items]

structure from src/workflows/release-handoff/main.js:
    [file-summary] No top-level file docstring detected
    function evaluateReadiness({ gates })  «docstring: none»
    async function readinessReport()  «docstring: none»
    function run(input)  «docstring: none»

structure from src/workflows/release-handoff/manifest.json:
    [json-key] id: "workflows.release_handoff"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [4 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "active_development"

structure from src/workflows/release-handoff/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/release-handoff/state.js:  (no extractable definitions)

structure from src/workflows/release-handoff/workflow.json:
    [json-key] entry: "readinessReport"
    [json-key] steps: [4 items]

structure from src/workflows/release-handoff/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/release-handoff/tests/unit.json:
    [json-array] [2 items]

structure from src/workflows/release-runbook/main.js:
    [file-summary] No top-level file docstring detected
    function checkCommands({ commands, available })  «docstring: none»
    async function auditDocumentation()  «docstring: none»
    function run(input)  «docstring: none»

structure from src/workflows/release-runbook/manifest.json:
    [json-key] id: "workflows.release_runbook"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [5 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [3 items]
    [json-key] lifecycle: "stable"

structure from src/workflows/release-runbook/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/release-runbook/state.js:  (no extractable definitions)

structure from src/workflows/release-runbook/workflow.json:
    [json-key] entry: "auditDocumentation"
    [json-key] steps: [5 items]

structure from src/workflows/release-runbook/tests/e2e.json:
    [json-array] [1 items]

structure from src/workflows/release-runbook/tests/unit.json:
    [json-array] [2 items]

structure from src/workflows/staging-validation/main.js:
    [file-summary] No top-level file docstring detected
    hash = (body) =>  «docstring: none»
    function evaluateResponses({ responses })  «docstring: none»
    async function verifyRoot(root, basePath, manifest)  «docstring: none»
    async function verifyStaging()  «docstring: none»
    async function verifyRollback()  «docstring: none»
    function run(input)  «docstring: none»

structure from src/workflows/staging-validation/manifest.json:
    [json-key] id: "workflows.staging_validation"
    [json-key] type: "organ"
    [json-key] version: "1.0.0"
    [json-key] layer: "workflows"
    [json-key] entry: "main.js"
    [json-key] export: "run"
    [json-key] dependencies: [5 items]
    [json-key] license: "AGPL-3.0-only"
    [json-key] api_exports: [5 items]
    [json-key] lifecycle: "stable"

structure from src/workflows/staging-validation/schema.json:
    [json-key] $schema: "https://json-schema.org/draft/2020-12/schema"
    [json-key] type: "object"
    [json-key] properties: {input, output}
    [json-key] required: [2 items]
    [json-key] additionalProperties: false

structure from src/workflows/staging-validation/state.js:  (no extractable definitions)

structure from src/workflows/staging-validation/workflow.json:
    [json-key] entry: "verifyStaging"
    [json-key] steps: [4 items]

structure from src/workflows/staging-validation/tests/e2e.json:
    [json-array] [2 items]

structure from src/workflows/staging-validation/tests/unit.json:
    [json-array] [2 items]

structure from tests/contracts.test.mjs:
    [file-summary] No top-level file docstring detected
    json = async (f) =>  «docstring: none»
    [test] public resources satisfy their schemas, source policies and actual runtime mappings
    [test] duplicate JSON keys and malformed/trailing documents are rejected
    [test] resource adapter retries transient errors only and honors cancellation/timeout
    [test] image import produces a canonical pair, refuses replacement and can recover a matching staged JPEG
    [test] task plan references remain coherent and cycles fail

structure from tests/preview.test.mjs:  (no extractable definitions)

structure from tests/release.test.mjs:
    [file-summary] No top-level file docstring detected
    [test] source archive is deterministic, round trips bytes and rejects unsafe/tampered entries
    [test] portable converter rejects collisions and invalid batches without replacing sources
    [test] the 208 original image pairs remain byte-for-byte unchanged
    [test] security scanner rejects active content but not inert educational text

structure from tests/e2e/atlas.spec.mjs:
    [file-summary] No top-level file docstring detected
    ready = async (page) =>  «docstring: none»
    [test] all emotions, records and combined images are reachable without console or network errors
    [test] search, category, keyboard tabs, empty results and hostile text remain usable
    [test] required resource failures offer retry; optional prompt failure remains local
    [test] image errors and denied clipboard provide accessible fallback feedback
    [test] automated accessibility, responsive layout, and local performance profile
    [test] staging headers, MIME types and private artifact boundaries

---

## Relations structure

relations from app.js:
    [import] ./src/workflows/atlas-runtime/main.js

relations from index.html:
    [asset] favicon.svg
    [asset] styles.css
    [asset] app.js

relations from playwright.config.mjs:
    [import] @playwright/test
    [import] node:fs

relations from scripts/audit.mjs:
    [import] node:fs/promises
    [import] ../src/infrastructure/tools/task-graph-audit/main.js
    [import] ../src/workflows/content-review/main.js
    [import] ../src/infrastructure/tools/security-audit/main.js
    [import] ../src/infrastructure/tools/performance-audit/main.js
    [import] ../src/infrastructure/tools/hosting-profile/main.js
    [import] ../src/infrastructure/tools/content-audit/main.js

relations from scripts/baseline.mjs:
    [import] node:fs/promises
    [import] node:crypto

relations from scripts/build.mjs:
    [import] node:fs/promises
    [import] ../src/workflows/ci-validation/main.js

relations from scripts/catalogue.mjs:
    [import] node:fs/promises
    [import] sharp
    [import] node:crypto

relations from scripts/check-json.mjs:
    [import] node:fs/promises

relations from scripts/convert-images-local.mjs:
    [import] node:path
    [import] ../src/infrastructure/tools/image-pipeline/main.js

relations from scripts/finish-checks.mjs:
    [import] node:fs/promises
    [import] ../src/workflows/browser-validation/main.js
    [import] ../src/workflows/release-runbook/main.js
    [import] ../src/workflows/staging-validation/main.js
    [import] ../src/workflows/release-handoff/main.js

relations from scripts/format.mjs:
    [import] node:fs/promises
    [import] prettier

relations from scripts/import-generated.mjs:
    [import] ../src/infrastructure/tools/image-pipeline/main.js

relations from scripts/migrate-atlas.mjs:
    [import] node:fs/promises
    [import] node:crypto

relations from scripts/playwright.mjs:
    [import] node:path

relations from scripts/project-spec.mjs:
    [import] node:fs/promises

relations from scripts/record-visual-review.mjs:
    [import] node:fs/promises
    [import] node:crypto

relations from scripts/review-images.mjs:
    [import] sharp
    [import] node:fs/promises

relations from scripts/serve.mjs:
    [import] node:http
    [import] node:fs/promises
    [import] node:path
    [import] node:url

relations from scripts/sync-manifests.mjs:
    [import] node:fs/promises
    [import] node:url
    [import] node:path

relations from scripts/test-unit.mjs:
    [import] node:assert/strict
    [import] node:fs/promises
    [import] node:url
    [import] node:path
    [import] ajv/dist/2020.js

relations from scripts/update-progress.mjs:
    [import] node:fs/promises

relations from scripts/verify-archive.mjs:
    [import] node:fs/promises
    [import] node:path
    [import] ../src/infrastructure/tools/source-archive/main.js

relations from scripts/verify.mjs:
    [import] node:child_process
    [import] node:fs/promises

relations from src/application/services/atlas-service/main.js:
    [import] ../../../core/domain/atlas-model/main.js
    [import] ../../../core/domain/evidence-policy/main.js
    [import] ../../../core/domain/visual-model/main.js

relations from src/application/services/visual-resolver/main.js:
    [import] ../../../core/domain/visual-model/main.js

relations from src/infrastructure/adapters/fetch-resources/main.js:
    [import] ../../../core/ports/atlas-resource-port/main.js

relations from src/infrastructure/tools/content-audit/main.js:
    [import] ajv/dist/2020.js

relations from src/infrastructure/tools/image-pipeline/main.js:
    [import] sharp
    [import] node:path
    [import] node:fs/promises

relations from src/infrastructure/tools/performance-audit/main.js:
    [import] node:fs/promises

relations from src/infrastructure/tools/release-package/main.js:
    [import] node:fs/promises
    [import] node:crypto
    [import] node:path

relations from src/infrastructure/tools/security-audit/main.js:
    [import] node:fs/promises

relations from src/infrastructure/tools/source-archive/main.js:
    [import] node:crypto
    [import] node:zlib
    [import] node:fs/promises
    [import] node:path

relations from src/ui/atlas-shell/main.js:
    [import] ../safe-rendering/main.js
    [import] ../../application/services/navigation-service/main.js

relations from src/ui/evidence-panel/main.js:
    [import] ../safe-rendering/main.js

relations from src/ui/reference-gallery/main.js:
    [import] ../safe-rendering/main.js
    [import] ../../application/services/visual-resolver/main.js

relations from src/workflows/atlas-runtime/main.js:
    [import] ../../infrastructure/adapters/fetch-resources/main.js
    [import] ../../application/services/atlas-service/main.js
    [import] ../../ui/atlas-shell/main.js
    [import] ../../ui/reference-gallery/main.js
    [import] ../../ui/evidence-panel/main.js

relations from src/workflows/atlas-runtime/state.js:
    [export-from] ./main.js

relations from src/workflows/browser-validation/main.js:
    [import] node:fs/promises

relations from src/workflows/ci-validation/main.js:
    [import] ../../infrastructure/tools/source-archive/main.js
    [import] ../../infrastructure/tools/release-package/main.js
    [import] ../../infrastructure/tools/security-audit/main.js
    [import] ../../infrastructure/tools/performance-audit/main.js
    [import] ../content-review/main.js

relations from src/workflows/content-review/main.js:
    [import] node:fs/promises
    [import] sharp
    [import] node:crypto
    [import] ../../application/services/atlas-service/main.js
    [import] ../../core/domain/atlas-model/main.js

relations from src/workflows/release-handoff/main.js:
    [import] node:fs/promises

relations from src/workflows/release-runbook/main.js:
    [import] node:fs/promises

relations from src/workflows/staging-validation/main.js:
    [import] node:fs/promises
    [import] node:crypto
    [import] node:path
    [import] ../../../scripts/serve.mjs

relations from tests/contracts.test.mjs:
    [import] node:test
    [import] node:assert/strict
    [import] node:fs/promises
    [import] node:os
    [import] node:path
    [import] sharp
    [import] ../src/core/domain/atlas-model/main.js
    [import] ../src/application/services/atlas-service/main.js
    [import] ../src/infrastructure/adapters/fetch-resources/main.js
    [import] ../src/infrastructure/tools/image-pipeline/main.js
    [import] ../src/infrastructure/tools/task-graph-audit/main.js

relations from tests/preview.test.mjs:
    [import] node:test
    [import] node:assert/strict
    [import] ../scripts/serve.mjs

relations from tests/release.test.mjs:
    [import] node:test
    [import] node:assert/strict
    [import] node:fs/promises
    [import] node:path
    [import] node:os
    [import] sharp
    [import] ../src/infrastructure/tools/source-archive/main.js
    [import] ../src/infrastructure/tools/image-pipeline/main.js
    [import] ../src/infrastructure/tools/security-audit/main.js

relations from tests/e2e/atlas.spec.mjs:
    [import] @playwright/test
    [import] @axe-core/playwright
    [import] node:fs/promises

---

## Flow structure

flow from scripts/serve.mjs:
    output
    [output] createPreviewServer

flow from scripts/verify.mjs:
    state
    [state] save

flow from src/application/services/atlas-service/main.js:
    input -> transform
    [input] loadAtlas
    [transform] validateResources

flow from src/application/services/navigation-service/main.js:
    transform
    [transform] normalize

flow from src/core/domain/atlas-model/main.js:
    transform
    [transform] validateAtlas

flow from src/core/domain/evidence-policy/main.js:
    transform
    [transform] validateSources

flow from src/core/domain/visual-model/main.js:
    transform
    [transform] validateVisualIndex

flow from src/infrastructure/adapters/fetch-resources/main.js:
    input
    [input] createResourceLoader

flow from src/infrastructure/tools/content-audit/main.js:
    transform
    [transform] parseJsonStrict, validateContract

flow from src/infrastructure/tools/hosting-profile/main.js:
    transform
    [transform] validateProfile

flow from src/infrastructure/tools/image-pipeline/main.js:
    transform
    [transform] importGenerated

flow from src/infrastructure/tools/release-package/main.js:
    transform
    [transform] buildPackage

flow from src/infrastructure/tools/source-archive/main.js:
    transform
    [transform] buildSourceArchive

flow from src/ui/evidence-panel/main.js:
    output
    [output] renderEvidence

flow from src/workflows/browser-validation/main.js:
    transform
    [transform] evaluateBrowserSummary

flow from src/workflows/ci-validation/main.js:
    transform
    [transform] buildCandidate

flow from src/workflows/release-handoff/main.js:
    input
    [input] evaluateReadiness, readinessReport

flow from tests/e2e/atlas.spec.mjs:
    input
    [input] ready

---

## API endpoints

cli entry points:
    [cli] scripts/audit.mjs — process.argv CLI
    [cli] scripts/baseline.mjs — process.argv CLI
    [cli] scripts/convert-images-local.mjs — process.argv CLI
    [cli] scripts/finish-checks.mjs — process.argv CLI
    [cli] scripts/format.mjs — process.argv CLI
    [cli] scripts/import-generated.mjs — process.argv CLI
    [cli] scripts/migrate-atlas.mjs — process.argv CLI
    [cli] scripts/record-visual-review.mjs — process.argv CLI
    [cli] scripts/serve.mjs — process.argv CLI
    [cli] scripts/test-unit.mjs — process.argv CLI
    [cli] scripts/update-progress.mjs — process.argv CLI

api surface:
    [no-http-routes] no HTTP route handlers detected

core surface candidates for API exposure:
    [candidate] src/infrastructure/tools/image-pipeline/main.js: canonicalPaths, importGenerated, convertLocal, run
    [candidate] src/infrastructure/tools/source-archive/main.js: digest, packTar, unpackTar, walk, buildSourceArchive (+1 more)
    [candidate] src/application/services/atlas-service/main.js: validateResources, loadAtlas, run
    [candidate] src/infrastructure/tools/release-package/main.js: hash, isRuntimePath, modules, buildPackage, run
    [candidate] src/ui/safe-rendering/main.js: element, safeSourceURL, sourceLink, copyText, run
    [candidate] scripts/serve.mjs: allowed, createPreviewServer, option

automation suggestions:
    [suggest-http] expose core functions via HTTP server; start with src/infrastructure/tools/image-pipeline/main.js
    [suggest-contract] add an OpenAPI/JSON schema to document the API surface

---
*404 files indexed · generated by extract_project_spec.py*