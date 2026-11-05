import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
if (!process.argv.includes('--apply-legacy-migration'))
  throw Error('One-time migration only; normal content edits require a new source audit.');
const current = JSON.parse(await readFile('data.json', 'utf8'));
if (current.schema_version === '4.0.0')
  throw Error('Already migrated; refusing to overwrite the reviewed dataset.');
await mkdir('docs', { recursive: true });
let legacy;
try {
  legacy = JSON.parse(await readFile('docs/legacy-data.json', 'utf8'));
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
  legacy = JSON.parse(await readFile('data.json', 'utf8'));
  await writeFile('docs/legacy-data.json', JSON.stringify(legacy, null, 2) + '\n');
}
const data = structuredClone(legacy);
const sources = [
  {
    id: 'bodily-maps-2014',
    title: 'Bodily maps of emotions',
    authors: 'Nummenmaa, Glerean, Hari & Hietanen',
    year: 2014,
    url: 'https://doi.org/10.1073/pnas.1321664111',
    type: 'primary study',
    scope: 'Participants marked emotion-associated sensations on body silhouettes.',
    limitations:
      'Self-report maps are not direct physiological measurements or diagnostic probabilities.',
  },
  {
    id: 'ans-meta-2018',
    title: 'Emotion fingerprints or emotion populations?',
    authors: 'Siegel et al.',
    year: 2018,
    url: 'https://doi.org/10.1037/bul0000128',
    type: 'meta-analysis',
    scope: 'Meta-analysis of autonomic measures across emotion categories.',
    limitations:
      'Variation and overlap limit inference of a unique emotion from an isolated bodily sign.',
  },
  {
    id: 'faces-review-2019',
    title: 'Emotional Expressions Reconsidered',
    authors: 'Barrett, Adolphs, Marsella, Martinez & Pollak',
    year: 2019,
    url: 'https://doi.org/10.1177/1529100619832930',
    type: 'research review',
    scope: 'Evaluates facial movements and emotion inference.',
    limitations:
      'Facial appearance alone is insufficient to establish an emotional state across contexts.',
  },
  {
    id: 'ans-experiment-1983',
    title: 'Autonomic nervous system activity distinguishes among emotions',
    authors: 'Ekman, Levenson & Friesen',
    year: 1983,
    url: 'https://doi.org/10.1126/science.6612338',
    type: 'primary study',
    scope: 'Autonomic measures during posed facial actions and relived experiences.',
    limitations: 'Task-specific group findings do not supply probabilities for the atlas claims.',
  },
  {
    id: 'fear-sadness-2007',
    title:
      'Cardiovascular, electrodermal, and respiratory response patterns to fear- and sadness-inducing films',
    authors: 'Kreibig, Wilhelm, Roth & Gross',
    year: 2007,
    url: 'https://doi.org/10.1111/j.1469-8986.2007.00550.x',
    type: 'primary study',
    scope: 'Measured cardiovascular, skin-conductance and respiratory responses to films.',
    limitations:
      'Experimental induction and selected measures do not imply a universal everyday response.',
  },
  {
    id: 'pride-shame-2008',
    title: 'The spontaneous expression of pride and shame',
    authors: 'Tracy & Matsumoto',
    year: 2008,
    url: 'https://doi.org/10.1073/pnas.0802686105',
    type: 'primary study',
    scope: 'Observed postures after victory or defeat among sighted and blind athletes.',
    limitations:
      'Sporting context and cultural modulation, particularly of shame, limit generalization.',
  },
  {
    id: 'awe-piloerection-2021',
    title: 'Piloerection is not a reliable physiological correlate of awe',
    authors: 'McPhetres & Shtulman',
    year: 2021,
    url: 'https://doi.org/10.1016/j.ijpsycho.2020.11.011',
    type: 'primary study',
    scope: 'Two preregistered samples tested objective goosebumps after awe stimuli.',
    limitations: 'Results concern the tested laboratory stimuli, not all possible awe experiences.',
  },
  {
    id: 'nimh-panic',
    title: 'Panic Disorder: What You Need to Know',
    authors: 'National Institute of Mental Health',
    year: null,
    url: 'https://www.nimh.nih.gov/health/publications/panic-disorder-when-fear-overwhelms',
    type: 'official clinical information',
    scope: 'Descriptions of panic symptoms and evaluation.',
    limitations:
      'Symptoms overlap other conditions; this catalogue is not a diagnostic instrument.',
  },
  {
    id: 'facs-authority',
    title: 'Facial Action Coding System',
    authors: 'Paul Ekman Group',
    year: 2002,
    url: 'https://www.paulekman.com/facial-action-coding-system/',
    type: 'method authority',
    scope: 'FACS describes visible facial actions; scoring requires trained observation.',
    limitations:
      'The full licensed manual was not reproduced or independently certified against these generated images.',
  },
  {
    id: 'openface-au',
    title: 'OpenFace Action Units',
    authors: 'Tadas Baltrusaitis / OpenFace',
    year: 2019,
    url: 'https://github.com/TadasBaltrusaitis/OpenFace/wiki/Action-Units',
    type: 'research software documentation',
    scope: 'Lists the action-unit subset recognized by the research tool.',
    limitations: 'Tool outputs and generated reference images are not proof of an emotional state.',
  },
].map((s) => ({ ...s, accessed: '2026-10-24', review_method: 'source-based editorial audit' }));
const labels = {
  anger: [
    'Neck and temple reference',
    'Temple close-up',
    'Face and upper-chest redness',
    'Forceful-breathing pose',
    'Expanded upper chest',
    'Hand on upper abdomen',
    'Clenched jaw',
    'Closed fist and forearm tension',
    'Forward shoulders',
    'Face and forearm skin',
    'Palmar skin close-up',
    'Focused gaze',
    'Steady facial expression',
  ],
  fear: [
    'Face and neck reference',
    'Hand and forearm skin',
    'Upper-chest breathing pose',
    'Open mouth and tense throat',
    'Hand over upper abdomen',
    'Mouth and throat reference',
    'Braced legs',
    'Raised shoulders',
    'Hands and fine movement',
    'Sweat on skin',
    'Forearm skin close-up',
    'Wide eyes',
    'Head and gaze reference',
  ],
  sadness: [
    'Resting torso',
    'Seated posture',
    'Crying/breathing pose',
    'Sighing pose',
    'Upper-abdominal reference',
    'Hand on abdomen',
    'Flexed spine',
    'Relaxed limbs',
    'Throat reference',
    'Wrapped shoulders',
    'Tears',
    'Downward gaze',
  ],
  happiness: [
    'Relaxed face and neck',
    'Mild facial redness',
    'Laughter pose',
    'Resting abdomen',
    'Open upright posture',
    'Whole-body reference',
    'Face and hand skin',
    'Relaxed facial expression',
  ],
  disgust: [
    'Face and neck',
    'Turned head and breathing pose',
    'Upper-abdominal reference',
    'Mouth and throat',
    'Retracted chin and throat',
    'Receding torso',
    'Hand and face skin',
    'Averted gaze',
  ],
  surprise: [
    'Upper-body reference',
    'Open-mouth inhalation pose',
    'Upper-abdominal reference',
    'Startle pose',
    'Paused movement',
    'Forearm skin',
    'Oriented gaze',
  ],
  anxiety: [
    'Face and neck reference',
    'Hand over chest',
    'Upper-chest breathing pose',
    'Hand on upper abdomen',
    'Neck and shoulder tension',
    'Palms and facial skin',
    'Restless gaze',
  ],
  panic: [
    'Pounding or racing heart can occur during a panic attack.',
    'Difficulty breathing can occur during a panic attack.',
    'Stomach discomfort or nausea can occur during a panic attack.',
    'Trembling or weakness can occur during a panic attack.',
    'Sweating or chills can occur during a panic attack.',
    'Dizziness or tingling may occur during a panic attack.',
  ],
  shame: [
    'Face and neck redness',
    'Small-breathing pose',
    'Hand on abdomen',
    'Lowered head',
    'Inward shoulders',
    'Upper-body skin reference',
    'Downward gaze',
  ],
  pride: [
    'Upright torso',
    'Raised chest',
    'Resting abdominal posture',
    'Extended chest and shoulders',
    'Raised chin',
    'Hands on hips',
    'Chest skin reference',
    'Upright full-body reference',
  ],
  contempt: [
    'Composed face',
    'Brief exhalation pose',
    'Resting abdomen',
    'Turned-away torso',
    'Relaxed skin reference',
    'Raised-head gaze',
  ],
  awe: [
    'Still upper body',
    'Open-mouth breathing pose',
    'Relaxed abdomen',
    'Standing still',
    'Forearm skin reference',
    'Upward gaze',
  ],
  love: [
    'Chest reference',
    'Relaxed breathing pose',
    'Resting abdomen',
    'Open shoulders',
    'Relaxed limbs',
    'Face and chest skin',
    'Gentle gaze',
  ],
  'baseline-neutral': [
    'Resting upper body',
    'Quiet breathing pose',
    'Resting abdomen',
    'Relaxed jaw and shoulders',
    'Skin at rest',
    'Resting gaze',
  ],
};
const actionLabels = {
  anger: ['Forward body lean', 'Close interpersonal stance', 'Speaking pose', 'Braced hands'],
  fear: ['Retreat or stillness', 'Backward body lean', 'Raised defensive palms'],
  sadness: ['Inward posture', 'Seated stillness', 'Arms around the body'],
  happiness: ['Open-arm gesture', 'Light walking step', 'Approach gesture'],
  disgust: ['Turned-away head', 'Outward hand sweep', 'Throat-clearing pose'],
  surprise: ['Head oriented to an event', 'Paused movement'],
  anxiety: ['Scanning gaze', 'Hand self-contact', 'Pacing pose'],
  panic: [
    'Movement toward an exit',
    'Hands near collar or chest',
    'Lowered position near the floor',
  ],
  shame: ['Lowered head and averted gaze', 'Covered face', 'Contracted posture'],
  pride: ['Expansive upright stance', 'Deliberate walking pose', 'Direct gaze'],
  contempt: ['Rotated-away torso', 'Dismissive hand gesture'],
  awe: ['Still orientation', 'Relaxed open hands'],
  love: ['Consensual reaching gesture', 'Mutual gaze'],
  'baseline-neutral': ['Unforced movement', 'Comfortable stance'],
};
const qualified = {
  'anger/cardiovascular/0': [
    'Laboratory anger induction can change cardiovascular activity.',
    'ans-experiment-1983',
  ],
  'anger/integumentary_thermal/0': [
    'Anger was associated with bodily sensations in self-report maps.',
    'bodily-maps-2014',
  ],
  'fear/cardiovascular/0': [
    'Fear-inducing films can alter cardiovascular measures.',
    'fear-sadness-2007',
  ],
  'fear/respiratory/0': [
    'Respiratory responses were measured during fear-inducing films.',
    'fear-sadness-2007',
  ],
  'fear/musculoskeletal/0': [
    'Participants reported bodily sensations associated with fear.',
    'bodily-maps-2014',
  ],
  'sadness/cardiovascular/0': [
    'Cardiovascular responses were measured during sadness-inducing films.',
    'fear-sadness-2007',
  ],
  'sadness/respiratory/0': [
    'Breathing patterns were studied during sadness-inducing films.',
    'fear-sadness-2007',
  ],
  'sadness/musculoskeletal/1': [
    'Participants reported bodily sensations associated with sadness.',
    'bodily-maps-2014',
  ],
  'happiness/musculoskeletal/1': [
    'Self-reports of happiness included sensations across much of the body.',
    'bodily-maps-2014',
  ],
  'shame/musculoskeletal/0': [
    'Lowered head posture occurred in studied shame displays.',
    'pride-shame-2008',
  ],
  'shame/musculoskeletal/1': [
    'Slumped shoulders and a narrowed chest occurred after defeat in the studied athletes.',
    'pride-shame-2008',
  ],
  'pride/musculoskeletal/0': [
    'Expanded posture was part of the studied pride display.',
    'pride-shame-2008',
  ],
  'pride/musculoskeletal/2': [
    'Extended arms occurred in studied pride displays.',
    'pride-shame-2008',
  ],
  'awe/integumentary_thermal/0': [
    'Objective goosebumps were not a reliable indicator of awe in the tested laboratory settings.',
    'awe-piloerection-2021',
  ],
  'love/cardiovascular/0': [
    'Participants mapped bodily sensations while considering love.',
    'bodily-maps-2014',
  ],
};
const report = [];
const review = (r, old, text, key, source) => {
  r.id = `${key.split('/')[0]}-${createHash('sha256')
    .update(key + '|' + old)
    .digest('hex')
    .slice(0, 14)}`;
  r.claim = text;
  r.image_key = key;
  r.content_type = source ? 'scientific_claim' : 'illustration';
  delete r.reliability;
  delete r.tier;
  delete r.note;
  r.evidence = {
    decision: source ? 'qualified' : 'replaced_with_visual_label',
    support: source ? 'direct' : 'illustration_only',
    source_ids: source ? [source] : [],
    review_method: 'source-based editorial audit',
    reviewed_at: '2026-10-24',
    limitations: source
      ? 'Context and population limits apply; see the linked source.'
      : 'This is a visual label, not an evidence-based indicator of an emotion.',
  };
  report.push({
    id: r.id,
    original: old,
    published: text,
    decision: r.evidence.decision,
    source_ids: r.evidence.source_ids,
    reason: source
      ? 'Replaced specificity, unsupported mechanism or numerical thresholds with the bounded source-supported statement.'
      : 'Original emotion-specific assertion was not substantiated by the accessed sources; retained only a neutral illustration label.',
  });
};
for (const e of data.emotions) {
  let n = 0;
  for (const [system, rs] of Object.entries(e.somatic_profile))
    for (const [i, r] of rs.entries()) {
      const q = qualified[`${e.id}/${system}/${i}`];
      const text = e.id === 'panic' ? labels[e.id][n] : q?.[0] || labels[e.id][n];
      if (!text) throw Error(`Missing label ${e.id}/${system}/${i}`);
      review(
        r,
        r.claim,
        text,
        `somatic/${e.id}-${system}-${i}`,
        e.id === 'panic' ? 'nimh-panic' : q?.[1],
      );
      n++;
    }
  if (n !== labels[e.id].length) throw Error(`Label count mismatch ${e.id}`);
  for (const [i, r] of e.behavioral_action_tendencies.entries())
    review(r, r.claim, actionLabels[e.id][i], `action/${e.id}-act-${i}`);
  for (const [i, r] of e.facial_motor_units_fused.entries()) {
    const full = i === 0 && e.id !== 'baseline-neutral';
    const code =
      r.code.replace(/AU/gi, '').replace(/\+/g, '-') + (e.id === 'contempt' ? '-unilateral' : '');
    const old = r.action_description;
    review(
      r,
      old,
      full ? `Full-face pose: ${e.display_name}` : `${r.code}: ${r.name}`,
      full ? `face/${e.id}-full-face` : `face/${e.id}-au${code}`,
    );
    r.action_description =
      'A posed illustration of the displayed movement; it does not determine emotion.';
    r.muscles = [];
    r.prototype_role = full ? 'Combined posed reference' : 'Movement reference';
    r.method_source_ids = ['facs-authority', 'faces-review-2019'];
  }
  delete e.topographic_consensus_index;
  delete e.diagnostic_specificity;
  delete e.category_reliability;
  e.notes = `Illustrations catalogued under ${e.display_name.toLowerCase()}. Appearance and bodily sensations do not establish a person's emotion or diagnosis.`;
  if (e.id === 'panic')
    e.notes +=
      ' Chest pain, breathing difficulty or other new/concerning symptoms need medical assessment rather than being assumed to be panic.';
}
data.schema_version = '4.0.0';
data.metadata = {
  external_shared_labels: [
    'contentment',
    'depression',
    'embarrassment',
    'excitement',
    'grief',
    'loneliness',
  ],
  evidence_policy:
    'Only explicitly qualified statements have direct source support. Other entries are illustration labels; legacy causal and confidence claims are retained only in the nonpublic audit archive.',
  confidence_policy: 'Unsubstantiated numerical scores and tier rankings are not published.',
  migration:
    '4.0.0 introduces stable record IDs, explicit image keys, source decisions and removes legacy confidence metrics.',
};
const sourceCatalog = {
  schema_version: '1.0.0',
  review_method: 'source-based editorial audit',
  human_certification: false,
  sources,
};
await writeFile('data.json', JSON.stringify(data, null, 2) + '\n');
await writeFile('sources.json', JSON.stringify(sourceCatalog, null, 2) + '\n');
await writeFile(
  'docs/evidence-review.json',
  JSON.stringify(
    {
      reviewed_at: '2026-10-24',
      reviewer: 'Codex source-based editorial audit',
      human_certification: false,
      records: report,
      metrics_decision:
        'All unsubstantiated percentages, tiers and diagnostic-specificity rankings removed from public data; original values retained in docs/legacy-data.json.',
    },
    null,
    2,
  ) + '\n',
);
const prompts = JSON.parse(await readFile('prompts.json', 'utf8'));
prompts.schema_version = '4.0.0';
for (const e of data.emotions)
  if (e.id !== 'baseline-neutral')
    prompts.prompts[`face/${e.id}-full-face`] = e.facial_motor_units_fused[0].image_prompt;
await writeFile('prompts.json', JSON.stringify(prompts, null, 2) + '\n');
console.log(
  `Reviewed ${report.length} records: ${report.filter((x) => x.source_ids.length).length} qualified statements; remaining records are neutral illustrations.`,
);
