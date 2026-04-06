const wikiPages = {
  index: '...',
  movimentos: '...',
  temas: '...',
  tags: '...',
  progressao: '...',
  combate: '...',
  galera: '...',
  npcs: '...'
};

function loadWikiPage(slug) {
  return wikiPages[slug] || wikiPages.index;
}
