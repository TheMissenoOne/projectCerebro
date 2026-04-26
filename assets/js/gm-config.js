// GM whitelist - users with these emails will be treated as Game Masters
// Set VITE_GM_WHITELIST in .env file (not committed)
const GM_WHITELIST = (window.__env && window.__env.VITE_GM_WHITELIST) 
  ? window.__env.VITE_GM_WHITELIST.split(',').filter(Boolean)
  : [];