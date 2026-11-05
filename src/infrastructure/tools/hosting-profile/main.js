export function validateProfile(profile) {
  const errors = [];
  if (profile?.mode !== 'local-staging')
    errors.push('Only owner-authorized local staging is configured');
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(profile?.base_path || '')) errors.push('Unsafe base path');
  if (profile?.indexing !== false) errors.push('Staging must not be indexed');
  if (profile?.public_domain !== null) errors.push('No production domain is configured');
  return { ok: !errors.length, errors };
}
export function run({ profile }) {
  return validateProfile(profile);
}
