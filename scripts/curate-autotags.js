const fs = require('fs');

const review = JSON.parse(fs.readFileSync('supabase/review/auto_tags.json', 'utf8'));

// ── Faction mapping from gen-enrich-temas.js ──
const NPC_FACTION = {
  'Professor X': 'x-men', 'Ciclope': 'x-men', 'Wolverine': 'x-men',
  'Tempestade': 'x-men', 'Jean Grey': 'x-men', 'Gambit': 'x-men',
  'Vampira': 'x-men', 'Noturno': 'x-men', 'Fera': 'x-men',
  'Anjo': 'x-men', 'Homem de Gelo': 'x-men', 'Emma Frost': 'x-men',
  'Lince Negra': 'x-men', 'Colossus': 'x-men', 'Solaris (Exodus)': 'brotherhood',
  'Mística': 'brotherhood', 'Magneto': 'brotherhood', 'Sabretooth': 'brotherhood',
  'Juggernaut': 'brotherhood', 'Dentes de Sabre': 'brotherhood',
  'Daken': 'brotherhood', 'Senhor Sinistro': 'brotherhood',
  'Apocalipse': 'brotherhood', 'Destrutor': 'brotherhood',
  'Carniceiro': 'brotherhood', 'Bishop': 'x-men', 'Forge': 'x-men',
  'Deadpool': 'neutral', 'Duende Verde': 'neutral',
  'Electro': 'brotherhood', 'Homem-Areia': 'brotherhood',
  'Homem-Formiga': 'neutral', 'Lagarto': 'brotherhood',
  'Loki': 'neutral', 'Máquina de Combate': 'neutral',
  'Motoqueiro Fantasma': 'neutral', 'Pantera Negra': 'neutral',
  'Paul': 'neutral', 'Thanos': 'neutral',
  'Venom': 'brotherhood', 'Vespa': 'neutral',
  'Visão': 'neutral', 'Wasp': 'neutral',
  'Feiticeira Escarlate': 'neutral',
  'Capitão América': 'neutral', 'Homem de Ferro': 'neutral',
  'Thor': 'neutral', 'Hulk': 'brotherhood',
  'Gavião Arqueiro': 'neutral', 'Viúva Negra': 'neutral',
  'Estrela Polar': 'x-men', 'Manto': 'neutral', 'Adaga': 'neutral',
  'Cable': 'x-men', 'Cavaleiro Negro': 'neutral',
  'Cifra': 'x-men', 'Destrutor (Wrecker)': 'brotherhood',
  'Homem-Múltiplo': 'x-men', 'Lady Deathstrike': 'brotherhood',
  'Míssil (Fogo do Inferno)': 'brotherhood', 'Morfo': 'x-men',
  'Polaris': 'x-men', 'Sentinela': 'neutral',
  'Sker': 'x-men', 'Spawn': 'neutral',
  'Treinador (Matsu\'o)': 'neutral', 'Trevor Fitzroy': 'brotherhood',
  'Vulcano (Kobra)': 'brotherhood', 'X-23': 'x-men',
  'Soldado Invernal': 'neutral', 'Fera Escura': 'brotherhood',
  'Doutor Destino': 'neutral', 'Dentes de Sabre (Kimura)': 'brotherhood',
  'Quicksilver': 'x-men', 'Mercurio': 'brotherhood',
  'Mister Sinistro': 'brotherhood', 'Elixir': 'x-men',
  'Hellion': 'x-men', 'Surge': 'x-men', 'Dust': 'x-men',
  'Rockslide': 'x-men', 'Anjo (Mutante)': 'x-men',
  'Armadura (Mutante)': 'x-men', 'Glob Herman': 'x-men',
  'Match': 'x-men', 'Prodigy': 'x-men', 'Gentil': 'x-men',
  'Loa': 'x-men', 'Oya': 'x-men', 'Primal': 'x-men',
  'Transonic': 'x-men', 'Velocidade': 'x-men',
  'Hellion': 'x-men', 'Blindfold': 'x-men', 'Indra': 'x-men',
  'Nekra': 'brotherhood', 'Havok': 'x-men',
  'Banshee': 'x-men', 'Siryn': 'x-men',
  'Multiple Man': 'x-men', 'Shatterstar': 'x-men',
  'Strong Guy': 'x-men', 'Wolfsbane': 'x-men',
  'Rictor': 'x-men', 'Feral': 'x-men',
  'Boom-Boom': 'x-men', 'Sunspot': 'x-men',
  'Magma': 'x-men', 'Cannonball': 'x-men',
  'Psylocke': 'x-men', 'Archangel': 'x-men',
  'Jubileu': 'x-men', 'Frenzy': 'brotherhood',
  'Moonstar': 'x-men',
};

const FACTION_GROUP = { 'x-men': 'x-men', brotherhood: 'brotherhood', neutral: 'neutral' };
function getGroup(npc) { return FACTION_GROUP[NPC_FACTION[npc]] || 'neutral'; }

// ── Thematic pools per faction group ──
const PODER = {
  'x-men': [
    'Disciplina Xavier', 'Trabalho em Equipe', 'Força de Vontade',
    'Treinamento em Danger Room', 'Estratégia Tática', 'Determinação Heróica',
    'Protocolo de Missão', 'Foco e Precisão', 'Instinto de Proteção',
    'Experiência em Combate', 'Resiliência X-Men', 'Liderança em Campo',
    'União e Confiança', 'Dedicação ao Sonho', 'Superação Constante',
  ],
  brotherhood: [
    'Força Brutal', 'Instinto Predatório', 'Poder Mutante Bruto',
    'Determinação Sombria', 'Vingança como Combustível', 'Astúcia Vilanesca',
    'Fúria Incontrolável', 'Sobrevivência Acima de Tudo', 'Ódio como Força',
    'Manipulação Genética', 'Experiência em Atentados', 'Dominação Total',
    'Instinto de Caça', 'Poder Corrompido', 'Força Brutal',
  ],
  neutral: [
    'Inteligência Superior', 'Recursos Ilimitados', 'Paciência Estratégica',
    'Experiência Milenar', 'Conhecimento Oculto', 'Adaptabilidade',
    'Tecnologia Avançada', 'Carisma Manipulador', 'Planos Complexos',
    'Determinação Implacável', 'Força Interior', 'Preparação Constante',
    'Vontade Indomável', 'Instinto de Sobrevivência', 'Poder Bruto',
  ],
};

const FRAQUEZA = {
  'x-men': [
    'Culpa do Herói', 'Dúvida Constante', 'Moral que Prende',
    'Responsabilidade que Pesa', 'Medo de Falhar', 'Luto pelos Queridos',
    'Segredos que Isolam', 'Conflito Dever vs Desejo', 'Confiar Demais',
    'Passado Militante', 'Humanidade Questionada', 'Idealismo Perigoso',
    'Proteger os Fracos', 'Expectativas Esmagadoras', 'Coração Exposto',
  ],
  brotherhood: [
    'Ódio que Cega', 'Fúria Destrutiva', 'Passado Violento',
    'Desconfiança Absoluta', 'Orgulho Excessivo', 'Individualismo Radical',
    'Sede de Poder', 'Impulso Autodestrutivo', 'Ressentimento Profundo',
    'Instabilidade Emocional', 'Vingança Consome', 'Lealdade Frágil',
    'Trauma de Caçada', 'Incapacidade de Liderar', 'Paranoia Constante',
  ],
  neutral: [
    'Isolamento Voluntário', 'Soberba Intelectual', 'Falta de Empatia',
    'Métodos Questionáveis', 'Objetivos Incompreensíveis', 'Solidão Eterna',
    'Paranoia de Conspiração', 'Orgulho Arrogante', 'Dependência Tecnológica',
    'Passado Sombrio', 'Dívida Moral', 'Consciência Pesada',
    'Corpo Frágil', 'Mente Instável', 'Preconceito Internalizado',
  ],
};

// ── NPC-level overrides (main characters get custom thematic lists) ──
const NPC_PODER = {
  'Professor X': ['Mestre Telepata', 'Fundador dos X-Men', 'Estrategista Global', 'Vontade Indomável', 'Cérebro Poderoso', 'Diplomacia Mutante', 'Sonho de Xavier', 'Líder Moral', 'Rede Psíquica', 'Conexão com Jovens'],
  'Ciclope': ['Líder Nato', 'Disciplina de Aço', 'Comandante Tático', 'Rajada Óptica Precisa', 'Estratégia em Campo', 'Controle Absoluto', 'Responsabilidade de Liderar', 'Foco Implacável', 'Treinamento Xavier', 'Determinação'],
  'Wolverine': ['Fator de Cura', 'Garras de Adamantium', 'Séculos de Experiência', 'Instinto Selvagem', 'Sobrevivente Nato', 'Fúria Berserker', 'Rastreador Implacável', 'Farofino', 'Treinamento Samurai', 'Resistência Sobre-Humana'],
  'Magneto': ['Mestre do Magnetismo', 'Rei de Genosha', 'Veterano Sobrevivente', 'Poder Ômega', 'Gênio Científico', 'Determinação Inabalável', 'Pai dos Mutantes', 'Estrategista', 'Domínio Global', 'Liderança Magnética'],
  'Tempestade': ['Deusa do Trovão', 'Mestre dos Elementos', 'Clarividência Atmosférica', 'Líder dos X-Men', 'Força Interior', 'Conexão com Natureza', 'Determinação Serena', 'Visão do Clima', 'Fúria Natural', 'Rainha do Trovão'],
  'Jean Grey': ['Fênix Renascida', 'Telepatia Ômega', 'Telecinese Molecular', 'Conexão Cósmica', 'Força de Vontade', 'Cura Psíquica', 'Empatia Profunda', 'Potencial Ilimitado', 'Sabedoria Ancestral', 'Poder Cósmico'],
  'Gambit': ['Mestre das Cartas', 'Acrobata Mutante', 'Ladrão Profissional', 'Carga Cinética', 'Carisma Irresistível', 'Improvisação Tática', 'Senso de Honra', 'Sobrevivente', 'Mão Leve', 'Astúcia das Ruas'],
};

const NPC_FRAQUEZA = {
  'Professor X': ['Cadeira de Rodas', 'Moral Inabalável', 'Sonho Ingenuo', 'Confia Demais', 'Responsabilidade de Mentor', 'Isolamento Mental', 'Passado Militar', 'Coração de Pai'],
  'Ciclope': ['Sem Visor sem Controle', 'Peso da Responsabilidade', 'Rígido Demais', 'Dúvida de Líder', 'Culpa sobre Phoenix', 'Irmão Perdido', 'Paixão por Jean', 'Moral Inflexível'],
  'Wolverine': ['Passado que Assombra', 'Fúria Berserker', 'Isolamento', 'Dificuldade de Confiar', 'Instinto Selvagem', 'Culpa por Mortes', 'Coração Solitário', 'Vício em Combate'],
  'Magneto': ['Trauma do Holocausto', 'Ódio pelos Humanos', 'Métodos Extremos', 'Culpa por Filhos', 'Orgulho Excessivo', 'Solidão de Rei', 'Passado Violento', 'Inflexível'],
  'Tempestade': ['Claustrofobia', 'Culpa de Rainha', 'Moral Elevada', 'Confiar Demais', 'Passado como Ladra', 'Pesar pelo Trovão', 'Dúvida como Líder', 'Responsabilidade'],
  'Jean Grey': ['Fênix Corrompida', 'Poder Incontrolável', 'Culpa por Destruição', 'Paixão Confusa', 'Medo de Si Mesma', 'Sacrifício Constante', 'Dúvida Interior', 'Conexão Cósmica Perigosa'],
  'Gambit': ['Passado de Ladrão', 'Dívida com Assassinos', 'Confiança Frágil', 'Culpa por Nova Orleans', 'Lealdade Dividida', 'Fama de Canalha', 'Medo de Compromisso', 'Segredos'],
};

// ── Build curated review ──
const curated = {};

for (const [npcName, entries] of Object.entries(review)) {
  const group = getGroup(npcName);
  const poderPool = NPC_PODER[npcName] || PODER[group];
  const fraquezaPool = NPC_FRAQUEZA[npcName] || FRAQUEZA[group];
  let poderIdx = 0;
  let fraquezaIdx = 0;

  const GENERIC = new Set([
    'Treinamento de Combate', 'Instinto de Sobrevivência', 'Resiliência Física e Mental',
    'Perícia em Campo', 'Habilidade de Luta', 'Determinação Inabalável',
    'Reflexos Aguçados', 'Tática e Estratégia', 'Intuição de Batalha',
    'Resistência a Dano', 'Movimentação Tática', 'Vigilância Constante',
    'Vontade de Ferro', 'Exploração de Ambiente', 'Liderança em Campo',
    'Passado que Assombra', 'Conflitos Internos', 'Impulsividade',
    'Dificuldade de Confiar nos Outros', 'Culpa e Arrependimento',
    'Limitações Humanas', 'Fama que Atrapalha', 'Responsabilidade que Pesa',
    'Trauma não Resolvido', 'Insegurança Constante', 'Dívida com o Passado',
    'Lealdade Dividida',
  ]);

  for (const entry of entries) {
    if (!GENERIC.has(entry.texto)) continue;
    const pool = entry.tipo === 'poder' ? poderPool : fraquezaPool;
    const idx = entry.tipo === 'poder' ? poderIdx++ : fraquezaIdx++;
    curated[npcName] = curated[npcName] || [];
    curated[npcName].push({ ...entry, novo_texto: pool[idx % pool.length] });
  }

  if (curated[npcName] && curated[npcName].length === 0) delete curated[npcName];
}

// ── Live main NPCs: add verve ──
const LIVE_NPCS = ['Deadpool', 'Spiral', 'Mojoworld', 'Longshot'];
for (const npc of LIVE_NPCS) {
  if (!curated[npc]) continue;
  for (const entry of curated[npc]) {
    if (entry.tipo === 'poder') entry.novo_texto += '!';
  }
}

fs.writeFileSync('supabase/review/curated.json', JSON.stringify(curated, null, 2));
console.log(`Curated: ${Object.keys(curated).length} NPCs`);
console.log(`Total replacements: ${Object.values(curated).reduce((s, e) => s + e.length, 0)}`);
