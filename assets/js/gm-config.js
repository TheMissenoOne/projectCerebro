// GM whitelist - users with these emails will be treated as Game Masters
// Injected at build time via GitHub Actions from environment variables
const GM_WHITELIST = '{{VITE_GM_WHITELIST}}'
  ? '{{VITE_GM_WHITELIST}}'.split(',').filter(Boolean)
  : [];