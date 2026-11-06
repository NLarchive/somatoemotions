export const normalize = (text) =>
  String(text ?? '')
    .normalize('NFKC')
    .toLocaleLowerCase('en')
    .replace(/\s+/g, ' ')
    .trim();
export function searchEmotions(
  data,
  { query = '', category = 'All', selectedId = null, extraText = () => '' } = {},
) {
  const q = normalize(query);
  const results = (data?.emotions || []).filter((e) => {
    if (category !== 'All' && !e.category.split(' / ').includes(category)) return false;
    const somatic = Object.values(e.somatic_profile).flat();
    const text = [
      e.display_name,
      e.category,
      e.notes,
      extraText(e),
      ...somatic.map((x) => x.claim),
      ...e.behavioral_action_tendencies.map((x) => x.claim),
      ...e.facial_motor_units_fused.flatMap((x) => [x.claim, x.code, x.name, ...(x.muscles || [])]),
    ].join(' ');
    return !q || normalize(text).includes(q);
  });
  return {
    results,
    selectedId: results.some((e) => e.id === selectedId) ? selectedId : results[0]?.id || null,
  };
}
export function run({ data, query, category, selectedId }) {
  const out = searchEmotions(data, { query, category, selectedId });
  return { ids: out.results.map((e) => e.id), selectedId: out.selectedId };
}
