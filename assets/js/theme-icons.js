// Theme Type Icons - X-Men TTRPG
// SVG paths extracted from theme_icons_v3.svg, optimized for 20x20 badge display

const THEME_ICONS = {
  // HUMANO - Humanidade (blue theme)
  evento: '<svg viewBox="0 0 24 24"><polygon points="10,2 14,10 22,12 16,18 18,22 10,20 2,22 4,18 0,12 8,10" fill="currentColor"/></svg>',
  relacao: '<svg viewBox="0 0 24 24"><circle cx="7" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="14" r="3" fill="currentColor"/></svg>',
  missao: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/><line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="2"/><line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="2"/></svg>',
  personalidade: '<svg viewBox="0 0 24 24"><path d="M6 8 Q12 2 18 8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 16 Q12 22 18 16" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6" cy="8" r="2" fill="currentColor"/><circle cx="18" cy="8" r="2" fill="currentColor"/></svg>',
  posses: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="11" x2="12" y2="20" stroke="currentColor" stroke-width="2"/><line x1="16" y1="15" x2="16" y2="20" stroke="currentColor" stroke-width="2"/><line x1="8" y1="15" x2="8" y2="20" stroke="currentColor" stroke-width="2"/></svg>',
  rotina: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" stroke-width="2"/><line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" stroke-width="2"/><line x1="4" y1="12" x2="8" y2="12" stroke="currentColor" stroke-width="2"/><line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>',
  conflito: '<svg viewBox="0 0 24 24"><line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="20" y1="4" x2="4" y2="20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',
  treinamento: '<svg viewBox="0 0 24 24"><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><rect x="2" y="6" width="4" height="12" rx="1" fill="currentColor"/><rect x="18" y="6" width="4" height="12" rx="1" fill="currentColor"/></svg>',
  territorio: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2"/><line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2"/></svg>',

  // MUTAÇÃO - Mutacao (red theme)
  adaptacao: '<svg viewBox="0 0 24 24"><path d="M6 4 Q14 8 6 12 Q14 16 6 20" fill="none" stroke="currentColor" stroke-width="2"/><path d="M18 4 Q10 8 18 12 Q10 16 18 20" fill="none" stroke="currentColor" stroke-width="2"/><line x1="8" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="2"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2"/><line x1="8" y1="16" x2="16" y2="16" stroke="currentColor" stroke-width="2"/></svg>',
  bastiao: '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2" fill="currentColor"/><rect x="4" y="4" width="4" height="6" fill="currentColor"/><rect x="10" y="2" width="4" height="8" fill="currentColor"/><rect x="16" y="4" width="4" height="6" fill="currentColor"/><rect x="8" y="14" width="8" height="6" fill="#080808"/></svg>',
  conjuracao: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="4 2"/><circle cx="12" cy="12" r="5" fill="currentColor"/><circle cx="12" cy="12" r="2" fill="#080808"/></svg>',
  destino: '<svg viewBox="0 0 24 24"><line x1="12" y1="22" x2="12" y2="10" stroke="currentColor" stroke-width="2"/><line x1="12" y1="10" x2="4" y2="4" stroke="currentColor" stroke-width="2"/><line x1="12" y1="10" x2="20" y2="4" stroke="currentColor" stroke-width="2"/><circle cx="4" cy="4" r="3" fill="currentColor"/><circle cx="12" cy="2" r="3" fill="currentColor"/><circle cx="20" cy="4" r="3" fill="currentColor"/></svg>',
  adivinhacao: '<svg viewBox="0 0 24 24"><path d="M4 12 Q12 4 20 12 Q12 20 4 12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="#080808"/></svg>',
  enclave: '<svg viewBox="0 0 24 24"><polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="8" r="3" fill="currentColor"/><circle cx="7" cy="14" r="3" fill="currentColor"/><circle cx="17" cy="14" r="3" fill="currentColor"/></svg>',
  expressao: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="4" fill="currentColor"/><path d="M10 6 Q16 6 18 12 Q16 18 10 18" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  familiar: '<svg viewBox="0 0 24 24"><ellipse cx="10" cy="14" rx="6" ry="4" fill="currentColor"/><circle cx="16" cy="10" r="4" fill="currentColor"/><polygon points="19,9 22,11 19,12" fill="currentColor"/><path d="M6 10 Q2 6 4 2" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  mobilidade: '<svg viewBox="0 0 24 24"><polygon points="22,12 10,4 10,20" fill="currentColor"/><line x1="4" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4" y1="16" x2="10" y2="12" stroke="currentColor" stroke-width="2"/></svg>',
  reliquia: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="12,6 16,10 16,18 12,22 8,18 8,10" fill="currentColor"/><line x1="12" y1="6" x2="12" y2="22" stroke="#080808" stroke-width="1"/><line x1="8" y1="12" x2="16" y2="12" stroke="#080808" stroke-width="1"/></svg>',
  subversao: '<svg viewBox="0 0 24 24"><path d="M4 6 Q12 2 20 6 Q20 14 12 22 Q4 18 4 6" fill="currentColor"/><circle cx="8" cy="9" r="2.5" fill="#080808"/><circle cx="16" cy="9" r="2.5" fill="#080808"/><path d="M8 15 Q12 18 16 15" fill="none" stroke="#080808" stroke-width="1.5"/></svg>',
};

// Get icon for theme type
function getThemeIcon(tipo) {
  return THEME_ICONS[tipo] || '';
}

// Get CSS class for category color
function getIconColorClass(categoria) {
  return categoria === 'mutacao' ? 'icon-mutacao' : categoria === 'humanidade' ? 'icon-humanidade' : '';
}

// Export for use in other files
if (typeof window !== 'undefined') {
  window.THEME_ICONS = THEME_ICONS;
  window.getThemeIcon = getThemeIcon;
  window.getIconColorClass = getIconColorClass;
}