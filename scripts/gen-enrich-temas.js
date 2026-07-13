#!/usr/bin/env node
/**
 * Gera migration 004 — theme cards enriquecidos para TODOS os NPCs.
 * Lê cerebro_rebalanceado.md, aplica SPEC narrativa por NPC, gera SQL.
 * NÃO toca em characters. Idempotente (UPDATE por name + is_global).
 *
 * Regras (por perigo):
 *   baixo:  2-3 cards,  ~8-10 tags,  3 fraqueza, 1 genérico
 *   medio:  4 cards,    ~15 tags,     4 fraqueza, 2 genéricos
 *   alto:   4-5 cards,  ~20 tags,     4-5 fraqueza, 4 genéricos
 *   extremo:5+ cards,   25+ tags,     5+ fraqueza, 6 genéricos
 *
 * Cada tag tem grau 1-6. Cards são pilares narrativos (combate + social + mental).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const MD = path.join(ROOT, 'cerebro_rebalanceado.md');
const OUT = path.join(ROOT, 'supabase', 'migrations', '004_enriched_temas.sql');

const sq = s => String(s == null ? '' : s).replace(/'/g, "''");
const jb = obj => "'" + JSON.stringify(obj).replace(/'/g, "''") + "'::jsonb";

// ── PARSING ──
function parseAll(md) {
  return md.split(/^#{1,3} NPC:\s*/m).slice(1).map(b => {
    const lines = b.split('\n');
    const name = lines[0].trim();
    let faction = '', danger = '', inTags = false;
    const tagLines = [];
    for (let i = 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (l.startsWith('**Fração:**')) faction = l.replace('**Fração:**', '').trim();
      else if (l.startsWith('**Perigo:**')) danger = l.replace('**Perigo:**', '').trim();
      else if (l.startsWith('## Tags')) { inTags = true; continue; }
      if (inTags) {
        if (l.startsWith('## ')) break;
        if (l.startsWith('- ')) tagLines.push(l.slice(2).trim());
      }
    }
    return { name, faction: faction.toLowerCase(), danger: danger.toLowerCase(), tagLines };
  });
}

function parseTag(line) {
  let s = line.trim();
  const m = s.match(/(-?\d+)\s*$/);
  let grau = 0;
  if (m) { grau = parseInt(m[1], 10); s = s.slice(0, m.index).trim(); }
  const emd = s.indexOf('—');
  if (emd >= 0) s = s.slice(0, emd).trim();
  return { texto: s, grau };
}

const clean = o => { const r = { texto: o.texto }; if (o.grau) r.grau = o.grau; return r; };

function resolveTags(refs, tagMap) {
  return (refs || []).map(i => clean(typeof i === 'string' ? { texto: i, grau: 0 } : tagMap[i] || { texto: i.texto || String(i), grau: i.grau || 0 }));
}

// ── GENERICS BY DANGER ──
const GENERICS = {
  baixo: [
    { texto: 'Mutante de Nível Baixo', grau: 2 },
    { texto: 'Pouca Experiência em Combate', grau: 1 }
  ],
  medio: [
    { texto: 'Mutante Experiente', grau: 2 },
    { texto: 'Treinamento de Combate', grau: 2 }
  ],
  alto: [
    { texto: 'Mutante de Elite', grau: 3 },
    { texto: 'Veterano de Combate', grau: 3 },
    { texto: 'Reflexos Aguçados', grau: 2 },
    { texto: 'Resistência Mental Treinada', grau: 2 }
  ],
  extremo: [
    { texto: 'Mutante de Niveau Ômega ou Equivalente', grau: 5 },
    { texto: 'Décadas de Experiência de Combate', grau: 4 },
    { texto: 'Mestre Tático', grau: 4 },
    { texto: 'Vontade Indomável', grau: 4 },
    { texto: 'Rede de Contatos e Aliados', grau: 3 },
    { texto: 'Ameaça Nível Global', grau: 4 }
  ]
};

// ── FACTION GENERICS ──
const FACTION_GENERICS = {
  'x-men': { texto: 'Membro dos X-Men', grau: 3 },
  'geracaox': { texto: 'Membro da X-Force / X-Corp', grau: 2 },
  'novatos': { texto: 'Membro dos Novos Mutantes', grau: 2 },
  'morlock': { texto: 'Membro dos Morlocks', grau: 2 },
  'irmandade': { texto: 'Membro da Irmandade de Mutantes', grau: 2 },
  'vilao': { texto: 'Conhecido no Submundo Mutante', grau: 2 },
  'humano': { texto: 'Humano com Acesso a Alto Escalão', grau: 2 },
  'clube-do-inferno': { texto: 'Membro do Clube do Inferno', grau: 3 },
  'neutro': { texto: 'Opera nos Dois Lados', grau: 2 }
};

// ── SPEC: cards narrativos para CADA NPC ──
// Cada card: { nome, pod: refs (texto|índice), frq: refs }
// Refs podem ser: número (índice no array tagLines parseado) ou objeto {texto, grau}
// ===== X-MEN =====
const SPEC = {

  // ── extremo ──
  'Professor X': {
    cards: [
      { nome: 'Telepatia Ômega', pod: [0, 1, 4], frq: [] },
      { nome: 'Sonho de Coexistência', pod: [2, 3, 5], frq: [] },
      { nome: 'Manipulador Visionário', pod: [{ texto: 'Mestre em Xadrez Psíquico', grau: 4 }, { texto: 'Sacrifica a Ética pelo Bem Maior', grau: 4 }, { texto: 'Rede de Contatos Global', grau: 3 }], frq: [] },
      { nome: 'Pai Ausente', pod: [], frq: [{ texto: 'Paraplégico', grau: 3 }, { texto: 'Manipula Alunos como Soldados', grau: 3 }, { texto: 'Apaga Mentes sem Consentimento', grau: 3 }, { texto: 'Fisicamente Frágil e Doente', grau: 2 }, { texto: 'Segredos que Pesam na Consciência', grau: 2 }] }
    ]
  },
  'Jean Grey': {
    cards: [
      { nome: 'Anfitriã da Fênix', pod: [0, 2, 5], frq: [{ texto: 'Fênix Pode Consumir sua Consciência', grau: 4 }] },
      { nome: 'Telepatia e Telecinese Ômega', pod: [1, 3], frq: [] },
      { nome: 'Coração dos X-Men', pod: [{ texto: 'Empatia Profunda', grau: 4 }, { texto: 'Elo Psíquico com Ciclope', grau: 4 }, { texto: 'Mentora de Jovens Mutantes', grau: 3 }], frq: [] },
      { nome: 'Força Cósmica', pod: [{ texto: 'Poder Latente Além da Compreensão', grau: 4 }], frq: [{ texto: 'Medo do Próprio Poder', grau: 3 }, { texto: 'Morte e Renascimento Constantes', grau: 3 }] }
    ]
  },
  'Emma Frost': {
    cards: [
      { nome: 'Rainha do Clube do Inferno', pod: [3, 4], frq: [] },
      { nome: 'Telepatia Ofensiva', pod: [0, 2], frq: [] },
      { nome: 'Diamante', pod: [1], frq: [{ texto: 'Sem Telepatia em Forma de Diamante', grau: 3 }] },
      { nome: 'Professora dos Perdidos', pod: [{ texto: 'Lealdade Feroz aos Alunos', grau: 4 }, { texto: 'Mentora Brutal e Exigente', grau: 3 }], frq: [{ texto: 'Luto pelos Hellions Assassinados', grau: 3 }, { texto: 'Passado Villão Assombra', grau: 2 }] },
      { nome: 'Frieza Calculista', pod: [], frq: [{ texto: 'Arrogância como Escudo', grau: 3 }, { texto: 'Pragmatismo Moralmente Cinzento', grau: 2 }, { texto: 'Dificuldade de Confiar', grau: 2 }] }
    ]
  },
  'Rachel Summers': {
    cards: [
      { nome: 'Fênix do Amanhã', pod: [2, 3], frq: [] },
      { nome: 'Telepatia e Telecinese do Futuro', pod: [0, 1], frq: [] },
      { nome: 'Hound Arrependida', pod: [{ texto: 'Rastreadora Mutante Implacável', grau: 4 }, { texto: 'Determinação Inabalável', grau: 3 }], frq: [{ texto: 'Trauma de Escrava do Futuro', grau: 3 }] },
      { nome: 'Asurak', pod: [{ texto: 'Laço Familiar com Cable', grau: 3 }], frq: [{ texto: 'Poder Instável sob Estresse', grau: 2 }, { texto: 'Isolamento por Ser do Futuro', grau: 2 }] }
    ]
  },
  'Cable': {
    cards: [
      { nome: 'Messias do Futuro', pod: [2, 3], frq: [{ texto: 'Obsessão em Salvar o Amanhã', grau: 2 }] },
      { nome: 'Vírus Techno-Orgânico', pod: [0, 1], frq: [{ texto: 'Vírus Techno-Orgânico o Consome', grau: 4 }] },
      { nome: 'Soldado de Dois Mundos', pod: [{ texto: 'Liderança da X-Force', grau: 4 }, { texto: 'Pai Adotivo de Hope Summers', grau: 4 }, { texto: 'Estrategista Pós-Apocalíptico', grau: 3 }], frq: [{ texto: 'Poder Psíquico Dividido com o Vírus', grau: 2 }] }
    ]
  },

  // ── alto ──
  'Ciclope': {
    cards: [
      { nome: 'Rajada Óptica', pod: [0, 2], frq: [{ texto: 'Sem Controle sem o Visor', grau: 4 }] },
      { nome: 'Comandante de Campo', pod: [1, 4], frq: [] },
      { nome: 'Revolucionário Relutante', pod: [{ texto: 'Matou Xavier para Salvar os Mutantes', grau: 4 }, { texto: 'Líder dos X-Men', grau: 4 }, { texto: 'Estrategista Nato', grau: 3 }], frq: [{ texto: 'Peso de Matar o Mentor', grau: 3 }] },
      { nome: 'Repressão de Aço', pod: [{ texto: 'Amor por Jean Grey', grau: 3 }, { texto: 'Relação Conturbada com o Pai', grau: 2 }], frq: [{ texto: 'Rigidez Emocional', grau: 3 }, { texto: 'Não Consegue Parar de Liderar', grau: 2 }] }
    ]
  },
  'Wolverine': {
    cards: [
      { nome: 'Fator de Cura e Adamantium', pod: [0, 1, 2], frq: [] },
      { nome: 'Fera Selvagem', pod: [4, 5], frq: [{ texto: 'Instinto Berserker', grau: 3 }] },
      { nome: 'Samurai Interior', pod: [{ texto: 'Código de Honra Pessoal', grau: 4 }, { texto: 'Mestre em Artes Marciais', grau: 3 }, { texto: 'Lealdade Feroz aos Amigos', grau: 3 }], frq: [] },
      { nome: 'Passado Fragmentado', pod: [{ texto: 'Décadas de Experiência', grau: 3 }], frq: [{ texto: 'Memórias Fragmentadas', grau: 3 }, { texto: 'Raiva Incontrolável', grau: 2 }] }
    ]
  },
  'Tempestade': {
    cards: [
      { nome: 'Senhora dos Elementos', pod: [0, 1, 2], frq: [] },
      { nome: 'Deusa do Trovão', pod: [3, 5], frq: [{ texto: 'Claustrofobia Severa', grau: 3 }] },
      { nome: 'Rainha de Wakanda', pod: [{ texto: 'Liderança e Realeza', grau: 4 }, { texto: 'Orgulho Africano', grau: 3 }], frq: [] },
      { nome: 'Espírito Livre', pod: [{ texto: 'Compaixão e Sabedoria', grau: 3 }], frq: [{ texto: 'Responsabilidade de Líder', grau: 2 }] }
    ]
  },
  'Fera': {
    cards: [
      { nome: 'Intelecto Genial', pod: [1, 4], frq: [] },
      { nome: 'Fera Azul', pod: [0, 2, 3], frq: [{ texto: 'Aparência Desfavorece Socialmente', grau: 2 }] },
      { nome: 'Cientista sem Escrúpulos', pod: [{ texto: 'Ex-Diretor da X-Force CIA', grau: 4 }], frq: [{ texto: 'Escorregou Moralmente', grau: 3 }, { texto: 'Clonou e Matou Wolverine', grau: 3 }, { texto: 'Prisões Secretas e Experimentos', grau: 3 }] },
      { nome: 'Jekyll & Hyde', pod: [], frq: [{ texto: 'Duas Versões de Si em Guerra', grau: 3 }, { texto: 'Vaidade Intelectual', grau: 2 }] }
    ]
  },
  'Ícone': {
    cards: [
      { nome: 'Criocinese Ômega', pod: [0, 1, 2], frq: [] },
      { nome: 'Poder Gelado', pod: [3, 4], frq: [{ texto: 'Humor Defensivo', grau: 2 }] },
      { nome: 'Príncipe de Serval', pod: [{ texto: 'Herança de Política Africana', grau: 3 }], frq: [] }
    ]
  },
  'Anjo': {
    cards: [
      { nome: 'Asas de Anjo', pod: [0, 3], frq: [] },
      { nome: 'Bilionário Filantropo', pod: [2, 4], frq: [] },
      { nome: 'Sangue de Cura', pod: [1], frq: [] },
      { nome: 'Anjo da Morte', pod: [], frq: [{ texto: 'Trauma de Apocalipse', grau: 3 }, { texto: 'Lado Sombrio Arcangel', grau: 3 }] }
    ]
  },
  'Colossus': {
    cards: [
      { nome: 'Aço Orgânico', pod: [0, 1, 2], frq: [] },
      { nome: 'Artista e Guerreiro', pod: [3], frq: [] },
      { nome: 'Protetor da Família', pod: [{ texto: 'Lealdade à Irmã Magik', grau: 4 }, { texto: 'Força Interior', grau: 3 }], frq: [] },
      { nome: 'Gigante Gentil', pod: [], frq: [{ texto: 'Pesa a Perda de Seus Amigos', grau: 2 }, { texto: 'Manso Demais para Ser Cruel', grau: 1 }] }
    ]
  },
  'Noturno': {
    cards: [
      { nome: 'Teletransporte Bamf', pod: [0, 1], frq: [] },
      { nome: 'Acrobata Sombrio', pod: [2, 3], frq: [] },
      { nome: 'Fé e Devoção', pod: [4], frq: [{ texto: 'Aparência Demoníaca', grau: 2 }] },
      { nome: 'Palhaço Triste', pod: [{ texto: 'Humor como Defesa', grau: 3 }], frq: [{ texto: 'Autoestima Frágil', grau: 2 }] }
    ]
  },
  'Kitty Pryde': {
    cards: [
      { nome: 'Fase', pod: [0, 1], frq: [] },
      { nome: 'Mestra da Tecnologia', pod: [2], frq: [] },
      { nome: 'Knight de Solano', pod: [3, 4], frq: [] },
      { nome: 'Coração Valente', pod: [{ texto: 'Liderança Natural', grau: 3 }], frq: [{ texto: 'Fisicamente Frágil', grau: 2 }, { texto: 'Coração Partido por Colossus', grau: 2 }] }
    ]
  },
  'Rogue': {
    cards: [
      { nome: 'Absorção de Poderes', pod: [0, 1, 2], frq: [] },
      { nome: 'Toque Letal', pod: [], frq: [{ texto: 'Não Pode Tocar Ninguém sem Absorver', grau: 4 }, { texto: 'Isolamento Emocional Permanente', grau: 3 }, { texto: 'Múltiplas Personalidades Absorvidas', grau: 3 }] },
      { nome: 'Villã Redimida', pod: [{ texto: 'Força e Voo (Miss Marvel)', grau: 4 }, { texto: 'Liderança de Equipe', grau: 3 }, { texto: 'Força de Vontade Inabalável', grau: 3 }], frq: [{ texto: 'Passado na Irmandade Assombra', grau: 2 }] },
      { nome: 'Amor à Prova de Toque', pod: [{ texto: 'Casada com Gambit', grau: 3 }], frq: [{ texto: 'Mystique a Manipulou por Anos', grau: 2 }] }
    ]
  },
  'Gambit': {
    cards: [
      { nome: 'Carga Cinética', pod: [0, 4], frq: [] },
      { nome: 'Rei dos Ladrões', pod: [1, 3], frq: [{ texto: 'Passado na Guilda dos Ladrões', grau: 3 }] },
      { nome: 'Charme Cajun', pod: [2], frq: [{ texto: 'Lealdade Questionável', grau: 2 }] },
      { nome: 'Busca por Redenção', pod: [{ texto: 'Casado com Rogue', grau: 3 }], frq: [{ texto: 'Culpa pelo Massacre dos Morlocks', grau: 3 }, { texto: 'Poder Limitado por Sinister', grau: 2 }] }
    ]
  },
  'Psylocke': {
    cards: [
      { nome: 'Espada Psiônica', pod: [0, 1], frq: [] },
      { nome: 'Ninja Psi', pod: [2, 3], frq: [{ texto: 'Corpo Trocado com Kwannon', grau: 2 }] },
      { nome: 'Guerreira Silenciosa', pod: [{ texto: 'Determinação Fria', grau: 3 }], frq: [{ texto: 'Passado na Mão', grau: 2 }] }
    ]
  },
  'Bishop': {
    cards: [
      { nome: 'Absorção de Energia', pod: [0, 1], frq: [] },
      { nome: 'XSE', pod: [2], frq: [] },
      { nome: 'Sobrevivente do Futuro', pod: [{ texto: 'Instinto de Sobrevivência', grau: 4 }], frq: [{ texto: 'Obsessão com a Segurança', grau: 2 }, { texto: 'Pesa o Futuro que Perdeu', grau: 2 }] }
    ]
  },
  'Jubileu': {
    cards: [
      { nome: 'Plasmóides', pod: [0, 1], frq: [] },
      { nome: 'Filha de Wolverine', pod: [2], frq: [] },
      { nome: 'Geração Perdida', pod: [3], frq: [{ texto: 'Potencial Ômega Bloqueado', grau: 2 }] }
    ]
  },
  'Polaris': {
    cards: [
      { nome: 'Magnetismo', pod: [0, 1], frq: [] },
      { nome: 'Filha de Magneto', pod: [3], frq: [{ texto: 'Instabilidade Mental', grau: 3 }, { texto: 'Identidade Incerta', grau: 2 }] }
    ]
  },
  'Havok': {
    cards: [
      { nome: 'Anéis de Plasma', pod: [0, 1], frq: [{ texto: 'Controle Instável', grau: 2 }] },
      { nome: 'Liderança dos X-Men', pod: [2], frq: [{ texto: 'Síndrome do Irmão Famoso', grau: 2 }] }
    ]
  },
  'X-23': {
    cards: [
      { nome: 'Garras de Adamantium', pod: [0, 1], frq: [] },
      { nome: 'Assassina Condicionada', pod: [2], frq: [{ texto: 'Gatilho de Berserk', grau: 4 }, { texto: 'Trauma de Condicionamento', grau: 3 }] },
      { nome: 'Mais que uma Arma', pod: [{ texto: 'Identidade em Construção', grau: 3 }], frq: [] }
    ]
  },
  'Forge': {
    cards: [
      { nome: 'Gênio Inventor', pod: [0, 2], frq: [] },
      { nome: 'Xamã Tecnológico', pod: [1, 3], frq: [{ texto: 'Criou o Neutralizador de Mutantes', grau: 2 }] }
    ]
  },
  'Dazzler': {
    cards: [
      { nome: 'Luz e Som', pod: [0, 1, 2], frq: [{ texto: 'Precisa de Fonte Sonora', grau: 2 }] },
      { nome: 'Estrela do Pop', pod: [3], frq: [] }
    ]
  },
  'Banshee': {
    cards: [
      { nome: 'Grito Sônico', pod: [0, 1], frq: [] },
      { nome: 'Veterano da Interpol', pod: [2, 3], frq: [] },
      { nome: 'Pai e Mentor', pod: [{ texto: 'Fundador da Geração X', grau: 3 }, { texto: 'Pai de Siryn', grau: 2 }], frq: [] }
    ]
  },
  'Cecilia Reyes': {
    cards: [
      { nome: 'Campo de Força', pod: [0], frq: [] },
      { nome: 'Médica Relutante', pod: [{ texto: 'Doutora de Elite', grau: 4 }, { texto: 'Queria Vida Normal, Não Heroína', grau: 3 }], frq: [{ texto: 'Relutância em Ser X-Men', grau: 2 }] }
    ]
  },
  'Lockheed': {
    cards: [
      { nome: 'Dragão Pequeno', pod: [0, 1], frq: [] },
      { nome: 'Companheiro Fiel', pod: [2], frq: [] }
    ]
  },
  'Sage': {
    cards: [
      { nome: 'Computador Humano', pod: [0, 1], frq: [] },
      { nome: 'Agente Infiltrada', pod: [2], frq: [{ texto: 'Desconectada Emocionalmente', grau: 2 }] }
    ]
  },
  'Omerta': {
    cards: [
      { nome: 'Campo de Força Pessoal', pod: [0], frq: [] },
      { nome: 'Lei do Silêncio', pod: [1], frq: [{ texto: 'Passado Mafioso', grau: 2 }] }
    ]
  },
  'Wraith (Hector Rendoza)': {
    cards: [
      { nome: 'Teleporte', pod: [0], frq: [] },
      { nome: 'Fantasma', pod: [1], frq: [] }
    ]
  },
  'Stacy X': {
    cards: [
      { nome: 'Feromônios', pod: [0], frq: [] },
      { nome: 'Trabalhadora do Sexo', pod: [1], frq: [{ texto: 'Subestimada Pelos Heróis', grau: 2 }] }
    ]
  },
  'Lifeguard': {
    cards: [
      { nome: 'Adaptação Reativa', pod: [0], frq: [] },
      { nome: 'Protetora Instintiva', pod: [1], frq: [] }
    ]
  },
  'Slipstream': {
    cards: [
      { nome: 'Portal Dimensional', pod: [0], frq: [] },
      { nome: 'Irmão de Lifeguard', pod: [1], frq: [{ texto: 'Inseguro', grau: 2 }] }
    ]
  },
  'Red Lotus': {
    cards: [
      { nome: 'Lâminas Psíquicas', pod: [0], frq: [] },
      { nome: 'Ninja Chinês', pod: [1], frq: [{ texto: 'Passado Criminoso', grau: 2 }] }
    ]
  },

  // ===== GERAÇÃO X =====
  'Domino': {
    cards: [
      { nome: 'Sorte Improvável', pod: [0, 3], frq: [{ texto: 'Sorte Falha em Perigo Extremo', grau: 1 }] },
      { nome: 'Mercenária Albina', pod: [1, 2], frq: [{ texto: 'Trauma do Projeto Armageddon', grau: 2 }] },
      { nome: 'Aliada Incondicional', pod: [{ texto: 'Coração de Mercenária', grau: 3 }], frq: [{ texto: 'Poder é Subconsciente', grau: 2 }] }
    ]
  },
  'Shatterstar': {
    cards: [
      { nome: 'Espadas Dimensional', pod: [0, 2], frq: [] },
      { nome: 'Velocidade Sobre-humana', pod: [1], frq: [] },
      { nome: 'Guerreiro de Outro Mundo', pod: [3], frq: [{ texto: 'Sem Conceito de Emoção Humana', grau: 2 }] }
    ]
  },
  'Rictor': {
    cards: [
      { nome: 'Ondas Sísmicas', pod: [0], frq: [{ texto: 'Poder Incontrolável na Juventude', grau: 2 }] },
      { nome: 'Peso do Legado', pod: [1], frq: [{ texto: 'Filho de Villão (Cabo)', grau: 2 }] }
    ]
  },
  'Siryn': {
    cards: [
      { nome: 'Grito Sônico', pod: [0, 1], frq: [] },
      { nome: 'Detetive Sobre-humana', pod: [2], frq: [{ texto: 'Vício em Bebida', grau: 2 }] }
    ]
  },
  'Madrox': {
    cards: [
      { nome: 'Múltiplas Cópias', pod: [0], frq: [] },
      { nome: 'Detetive Particular', pod: [1], frq: [{ texto: 'Personalidades se Dividem', grau: 2 }] }
    ]
  },
  'Strong Guy': {
    cards: [
      { nome: 'Absorção Cinética', pod: [0], frq: [{ texto: 'Corpo Degrada com Energia Absorvida', grau: 3 }] },
      { nome: 'Alívio Cômico Tanque', pod: [1], frq: [] }
    ]
  },
  'Scanner': {
    cards: [
      { nome: 'Varredura Psíquica', pod: [0], frq: [] },
      { nome: 'Olhos que Tudo Veem', pod: [1], frq: [] }
    ]
  },

  // ===== NOVATOS (Novos Mutantes + Geração X) =====
  'Cannonball': {
    cards: [
      { nome: 'Foguete Humano', pod: [0, 1], frq: [{ texto: 'Imóvel Fora do Voo', grau: 2 }] },
      { nome: 'Líder dos Novos Mutantes', pod: [2], frq: [] },
      { nome: 'Filho da Mina de Carvão', pod: [3], frq: [{ texto: 'Peso de Ser o Irmão Mais Velho', grau: 2 }] }
    ]
  },
  'Sunspot': {
    cards: [
      { nome: 'Solar Lord', pod: [0, 1, 2], frq: [] },
      { nome: 'Bilionário Brasileiro', pod: [3], frq: [{ texto: 'Impulsivo e Arrogante', grau: 2 }] }
    ]
  },
  'Mirage': {
    cards: [
      { nome: 'Tecer Medos', pod: [0, 1], frq: [{ texto: 'Perdeu Poderes pós M-Day', grau: 2 }] },
      { nome: 'Valquíria Cheyenne', pod: [3, 4], frq: [] },
      { nome: 'Laço com Animais', pod: [2], frq: [] }
    ]
  },
  'Wolfsbane': {
    cards: [
      { nome: 'Loba Feroz', pod: [0, 1, 2], frq: [{ texto: 'Controle Reduzido em Forma Plena', grau: 2 }] },
      { nome: 'Fé em Conflito', pod: [3], frq: [{ texto: 'Vergonha Religiosa do Próprio Ser', grau: 3 }] }
    ]
  },
  'Karma': {
    cards: [
      { nome: 'Possessão Mental', pod: [0, 1], frq: [{ texto: 'Possuída pelo Rei das Sombras', grau: 2 }] },
      { nome: 'Sobrevivente Vietnamita', pod: [2], frq: [] },
      { nome: 'Família Acima de Tudo', pod: [3], frq: [{ texto: 'Amputada (Perna)', grau: 1 }] }
    ]
  },
  'Magma': {
    cards: [
      { nome: 'Lava e Magma', pod: [0, 1, 2], frq: [] },
      { nome: 'Nobre de Nova Roma', pod: [3], frq: [{ texto: 'Ingênua ao Mundo Moderno', grau: 2 }] }
    ]
  },
  'Cypher': {
    cards: [
      { nome: 'Poliglota Universal', pod: [0], frq: [{ texto: 'Sem Poderes de Combate', grau: 4 }] },
      { nome: 'Chave de Krakoa', pod: [1, 2], frq: [] }
    ]
  },
  'Boomer': {
    cards: [
      { nome: 'Bombas de Plasma', pod: [0, 1], frq: [] },
      { nome: 'Atitude Rebelde', pod: [2], frq: [{ texto: 'Chamariz de Problemas', grau: 2 }, { texto: 'Impulsiva', grau: 2 }] }
    ]
  },
  'Chamber': {
    cards: [
      { nome: 'Fornalha Psíquica', pod: [0], frq: [{ texto: 'Rosto e Peito Destruídos pelo Poder', grau: 2 }] },
      { nome: 'Estrangeiro', pod: [1], frq: [{ texto: 'Depressão e Isolamento', grau: 2 }] }
    ]
  },
  'Husk': {
    cards: [
      { nome: 'Descamação', pod: [0], frq: [] },
      { nome: 'Guthrie Determinada', pod: [1], frq: [{ texto: 'Sombra dos Irmãos Mais Famosos', grau: 2 }] }
    ]
  },
  'M (Monet St. Croix)': {
    cards: [
      { nome: 'Penteto Perfeito', pod: [0, 1, 2, 3], frq: [] },
      { nome: 'Herdeira Bilionária', pod: [4], frq: [{ texto: 'Arrogância Refinada', grau: 3 }] },
      { nome: 'Trauma de Penance', pod: [], frq: [{ texto: 'Anos como Penance Muda sem Voz', grau: 2 }, { texto: 'Pensamentos Suicidas Diários', grau: 2 }] }
    ]
  },
  'Armor': {
    cards: [
      { nome: 'Armadura Psíquica', pod: [0], frq: [] },
      { nome: 'Kami-Sama', pod: [1], frq: [{ texto: 'Insegurança sobre o Poder', grau: 2 }] }
    ]
  },
  'Surge': {
    cards: [
      { nome: 'Eletricidade', pod: [0, 1], frq: [{ texto: 'Precisa de Luvas Amortecedoras', grau: 2 }] },
      { nome: 'Líder dos Novos X-Men', pod: [2], frq: [] }
    ]
  },
  'Elixir': {
    cards: [
      { nome: 'Biocinese', pod: [0, 1], frq: [] },
      { nome: 'Cura ou Morte', pod: [2], frq: [{ texto: 'Poder de Matar com Toque', grau: 3 }] }
    ]
  },
  'Hellion': {
    cards: [
      { nome: 'Telecinesia', pod: [0, 1], frq: [] },
      { nome: 'Atitude de Líder', pod: [2], frq: [{ texto: 'Arrogância e Impulso', grau: 2 }] }
    ]
  },
  'Rockslide': {
    cards: [
      { nome: 'Corpo de Rocha', pod: [0, 1], frq: [] },
      { nome: 'Comediante da Equipe', pod: [2], frq: [] }
    ]
  },
  'Prodigy': {
    cards: [
      { nome: 'Memória Absoluta', pod: [0], frq: [{ texto: 'Perde Acesso ao Saber ao Dormir', grau: 2 }] },
      { nome: 'Gênio', pod: [1], frq: [] }
    ]
  },
  'Wallflower': {
    cards: [
      { nome: 'Feromônios', pod: [0], frq: [] },
      { nome: 'Invisível Social', pod: [1], frq: [{ texto: 'Baixa Autoestima', grau: 2 }] }
    ]
  },
  'Timeslip': {
    cards: [
      { nome: 'Salto Temporal', pod: [0], frq: [{ texto: 'Controle Imperfeito', grau: 2 }] },
      { nome: 'Cronometrista', pod: [1], frq: [] }
    ]
  },
  'Impulse': {
    cards: [
      { nome: 'Explosão Cinética', pod: [0], frq: [] },
      { nome: 'Sem Freio', pod: [1], frq: [{ texto: 'Impulsivo Demais', grau: 2 }] }
    ]
  },

  // ===== MORLOCK =====
  'Callisto': {
    cards: [
      { nome: 'Líder dos Morlocks', pod: [0, 1], frq: [] },
      { nome: 'Caçadora dos Túneis', pod: [2], frq: [{ texto: 'Desconfia de Superfície', grau: 2 }] }
    ]
  },
  'Caliban': {
    cards: [
      { nome: 'Rastreador Mutante', pod: [0], frq: [{ texto: 'Subserviente', grau: 2 }] },
      { nome: 'Morlock Leal', pod: [1], frq: [] }
    ]
  },
  'Marrow': {
    cards: [
      { nome: 'Ossos Lancinantes', pod: [0, 1], frq: [] },
      { nome: 'Raiva Subterrânea', pod: [2], frq: [{ texto: 'Instabilidade Emocional', grau: 2 }] }
    ]
  },
  'Masque': {
    cards: [
      { nome: 'Moldar Carne', pod: [0], frq: [{ texto: 'Obsessão com Beleza Distorcida', grau: 2 }] },
      { nome: 'Artista Macabro', pod: [1], frq: [] }
    ]
  },
  'Leech': {
    cards: [
      { nome: 'Campo de Neutralização', pod: [0], frq: [] },
      { nome: 'Criança dos Túneis', pod: [1], frq: [{ texto: 'Vulnerável sem o Campo', grau: 2 }] }
    ]
  },

  // ===== IRMANDADE =====
  'Magneto': {
    cards: [
      { nome: 'Mestre do Magnetismo', pod: [0, 1, 2], frq: [] },
      { nome: 'Nunca Mais', pod: [3, 4], frq: [{ texto: 'Trauma do Holocausto', grau: 4 }] },
      { nome: 'Poderes em Declínio', pod: [5], frq: [{ texto: 'Poderes se Apagando com a Idade', grau: 3 }] },
      { nome: 'Causa Mutante', pod: [{ texto: 'Visão de Supremacia Mutante', grau: 4 }, { texto: 'Carisma Revolucionário', grau: 4 }, { texto: 'Anti-Vilão a Anti-Herói', grau: 3 }], frq: [{ texto: 'Extremismo Cega', grau: 3 }, { texto: 'Família Estilhaçada', grau: 2 }] }
    ]
  },
  'Mystique': {
    cards: [
      { nome: 'Metamorfa Centenária', pod: [0, 1, 3], frq: [] },
      { nome: 'Mãe de Segredos', pod: [2], frq: [{ texto: 'Abandonou Noturno ao Nascer', grau: 3 }] },
      { nome: 'Cúmplice do Destino', pod: [{ texto: 'Rede de Espionagem Global', grau: 4 }, { texto: 'Manipuladora Genial', grau: 3 }, { texto: 'Casada com Destiny (Irene Adler)', grau: 3 }], frq: [{ texto: 'Lealdade apenas a Si e Destiny', grau: 3 }] }
    ]
  },
  'Blob': {
    cards: [
      { nome: 'Imóvel', pod: [0], frq: [] },
      { nome: 'Tanque da Irmandade', pod: [1], frq: [] }
    ]
  },
  'Toad': {
    cards: [
      { nome: 'Sapo Mutante', pod: [0, 1], frq: [] },
      { nome: 'Lacaio Leal', pod: [2], frq: [{ texto: 'Subserviente', grau: 1 }] }
    ]
  },
  'Pyro': {
    cards: [
      { nome: 'Pirocinese', pod: [0, 1, 2], frq: [] },
      { nome: 'Incendiário', pod: [3], frq: [{ texto: 'Fogo Sem Controle', grau: 2 }] }
    ]
  },
  'Avalanche': {
    cards: [
      { nome: 'Ondas Sísmicas', pod: [0, 2], frq: [] },
      { nome: 'Demolidor', pod: [1], frq: [] }
    ]
  },
  'Unus': {
    cards: [
      { nome: 'Campo de Força', pod: [0], frq: [{ texto: 'Campo Tem Limite de Absorção', grau: 2 }] }
    ]
  },
  'Lorelei': {
    cards: [
      { nome: 'Canto Hipnótico', pod: [0], frq: [] },
      { nome: 'Sereia', pod: [1], frq: [{ texto: 'Vítima da Própria Aparência', grau: 2 }] }
    ]
  },
  'Adepto (Magneto)': {
    cards: [
      { nome: 'Acolyte', pod: [0], frq: [] },
      { nome: 'Fiel a Magneto', pod: [1], frq: [] }
    ]
  },

  // ===== VILÕES =====
  'Sabretooth': {
    cards: [
      { nome: 'Fera Selvagem', pod: [0, 1, 2], frq: [] },
      { nome: 'Espelho Sombrio', pod: [3], frq: [{ texto: 'Obsessão por Wolverine', grau: 3 }, { texto: 'Instinto Assassino', grau: 3 }, { texto: 'Prazer em Tortura Psicológica', grau: 2 }] }
    ]
  },
  'Lady Deathstrike': {
    cards: [
      { nome: 'Garras de Adamantium', pod: [0, 1], frq: [] },
      { nome: 'Ninja Ciborgue', pod: [2], frq: [{ texto: 'Obsessão por Wolverine', grau: 2 }] }
    ]
  },
  'Mister Sinister': {
    cards: [
      { nome: 'Geneticista Vitoriano', pod: [0, 2], frq: [] },
      { nome: 'Clonagem Sem Limites', pod: [1, 3, 4], frq: [{ texto: 'Cópias Degeneram Geneticamente', grau: 2 }] },
      { nome: 'Obsessão Summers-Grey', pod: [5], frq: [{ texto: 'Obsessão pela Linhagem Summers', grau: 4 }, { texto: 'Narcisismo e Dramalhão', grau: 2 }] }
    ]
  },
  'Apocalipse': {
    cards: [
      { nome: 'Primeiro Mutante', pod: [0, 1, 2], frq: [] },
      { nome: 'Sobrevivência do Mais Forte', pod: [3, 4], frq: [] },
      { nome: 'Pai dos Cavaleiros', pod: [5], frq: [{ texto: 'Visão Distorcida de Evolução', grau: 3 }] },
      { nome: 'Armadura Cósmica', pod: [], frq: [{ texto: 'Depende da Armadura Celestial', grau: 2 }] }
    ]
  },
  'Sentinela Mk I': {
    cards: [
      { nome: 'Caçador de Mutantes', pod: [0, 1], frq: [] },
      { nome: 'Máquina sem Piedada', pod: [2], frq: [{ texto: 'Limitado por Programação', grau: 2 }] }
    ]
  },
  'Sentinela Mark I': {
    cards: [
      { nome: 'Caçador de Mutantes', pod: [0, 1], frq: [] },
      { nome: 'Máquina sem Piedada', pod: [2], frq: [{ texto: 'Limitado por Programação', grau: 2 }] }
    ]
  },
  'Purificador': {
    cards: [
      { nome: 'Humano Fanático', pod: [0], frq: [{ texto: 'Ódio Cego a Mutantes', grau: 2 }] }
    ]
  },
  'Agente HYDRA': {
    cards: [
      { nome: 'Agente HYDRA', pod: [0], frq: [{ texto: 'Descartável', grau: 1 }] }
    ]
  },
  'Mercenário Weapon X': {
    cards: [
      { nome: 'Arma Humana', pod: [0], frq: [{ texto: 'Lavagem Cerebral', grau: 2 }] },
      { nome: 'Mercenário', pod: [1], frq: [] }
    ]
  },
  'Wild Child': {
    cards: [
      { nome: 'Feral', pod: [0], frq: [{ texto: 'Instinto Animal Domina', grau: 2 }] },
      { nome: 'Weapon X', pod: [1], frq: [] }
    ]
  },
  'Aurora': {
    cards: [
      { nome: 'Velocidade Sobre-humana', pod: [0, 1], frq: [] },
      { nome: 'Dupla Personalidade', pod: [2], frq: [{ texto: 'Transtorno Dissociativo', grau: 2 }] }
    ]
  },
  'Persuasion': {
    cards: [
      { nome: 'Persuasão', pod: [0], frq: [] },
      { nome: 'Voz de Controle', pod: [1], frq: [] }
    ]
  },
  'Frenzy': {
    cards: [
      { nome: 'Força Sobre-humana', pod: [0], frq: [] },
      { nome: 'Pele Indestrutível', pod: [1], frq: [{ texto: 'Raiva Incontrolável', grau: 2 }] }
    ]
  },
  'Magma (Alliance of Evil)': {
    cards: [
      { nome: 'Lava', pod: [0], frq: [] },
      { nome: 'Alliance of Evil', pod: [1], frq: [] }
    ]
  },
  'Tower': {
    cards: [
      { nome: 'Crescimento', pod: [0], frq: [{ texto: 'Instabilidade', grau: 2 }] }
    ]
  },
  'Stinger': {
    cards: [
      { nome: 'Ferrão', pod: [0], frq: [] }
    ]
  },
  'Cargill': {
    cards: [
      { nome: 'Acolyte', pod: [0], frq: [] }
    ]
  },
  'Agent Zero': {
    cards: [
      { nome: 'Fator de Cura', pod: [0], frq: [] },
      { nome: 'Assassino da Weapon X', pod: [1], frq: [{ texto: 'Lavagem Cerebral', grau: 2 }] }
    ]
  },
  'Silver Fox': {
    cards: [
      { nome: 'Fator de Cura', pod: [0], frq: [] },
      { nome: 'Sedutora Letal', pod: [1], frq: [{ texto: 'Memórias Roubadas', grau: 2 }] }
    ]
  },
  'Kestrel': {
    cards: [
      { nome: 'Voo', pod: [0], frq: [] },
      { nome: 'Agente Governamental', pod: [1], frq: [] }
    ]
  },
  'Bolt': {
    cards: [
      { nome: 'Eletricidade', pod: [0], frq: [] }
    ]
  },
  'Fixer': {
    cards: [
      { nome: 'Gênio Técnico', pod: [0], frq: [{ texto: 'Covarde', grau: 1 }] }
    ]
  },
  'Graydon Creed (FOH)': {
    cards: [
      { nome: 'Amigos da Humanidade', pod: [0], frq: [{ texto: 'Ódio a Mutantes', grau: 2 }] }
    ]
  },
  'Graydon Creed': {
    cards: [
      { nome: 'Político Anti-Mutante', pod: [0], frq: [{ texto: 'Filho de Mística e Sabretooth', grau: 2 }] }
    ]
  },
  'Cameron Hodge': {
    cards: [
      { nome: 'Amigos da Humanidade', pod: [0], frq: [{ texto: 'Obsessão por Ciclope', grau: 2 }] },
      { nome: 'Pescoço Robótico', pod: [1], frq: [] }
    ]
  },
  'Donald Pierce': {
    cards: [
      { nome: 'Ciborgue Reaver', pod: [0], frq: [] },
      { nome: 'Líder dos Reavers', pod: [1], frq: [{ texto: 'Ódio a Mutantes', grau: 2 }] }
    ]
  },
  'Lady Mastermind': {
    cards: [
      { nome: 'Ilusões', pod: [0], frq: [] },
      { nome: 'Mestre do Engano', pod: [1], frq: [{ texto: 'Arrogância', grau: 2 }] }
    ]
  },
  'Mesmero': {
    cards: [
      { nome: 'Hipnose', pod: [0], frq: [] },
      { nome: 'Artista Hipnótico', pod: [1], frq: [{ texto: 'Viciado em Si Mesmo', grau: 2 }] }
    ]
  },
  'Vanisher': {
    cards: [
      { nome: 'Teleporte', pod: [0], frq: [] },
      { nome: 'Ladrão', pod: [1], frq: [{ texto: 'Covarde', grau: 2 }] }
    ]
  },
  'Sauron': {
    cards: [
      { nome: 'Pterossauro', pod: [0, 1], frq: [] },
      { nome: 'Doutor Sáurio', pod: [2], frq: [{ texto: 'Hipocrisia Ambiental', grau: 2 }] }
    ]
  },
  'Vertigo': {
    cards: [
      { nome: 'Desorientação', pod: [0], frq: [] },
      { nome: 'Maroto', pod: [1], frq: [] }
    ]
  },
  'Scalphunter': {
    cards: [
      { nome: 'Atirador de Elite', pod: [0], frq: [] },
      { nome: 'Maroto Líder', pod: [1], frq: [{ texto: 'Crueldade', grau: 2 }] }
    ]
  },
  'Arclight': {
    cards: [
      { nome: 'Ondas de Choque', pod: [0], frq: [] },
      { nome: 'Maroto', pod: [1], frq: [] }
    ]
  },
  'Blockbuster': {
    cards: [
      { nome: 'Superforça', pod: [0], frq: [{ texto: 'Inteligência Limitada', grau: 2 }] }
    ]
  },
  'Prism': {
    cards: [
      { nome: 'Cristal Vivo', pod: [0], frq: [] }
    ]
  },
  'Riptide': {
    cards: [
      { nome: 'Turbilhão', pod: [0], frq: [] }
    ]
  },
  'Harpoon': {
    cards: [
      { nome: 'Arpões Energéticos', pod: [0], frq: [] }
    ]
  },
  'Scrambler': {
    cards: [
      { nome: 'Scramble de Poderes', pod: [0], frq: [] }
    ]
  },
  'Larry Trask': {
    cards: [
      { nome: 'Criador de Sentinelas', pod: [0], frq: [{ texto: 'Ódio Hereditário', grau: 2 }] }
    ]
  },
  'Steven Lang': {
    cards: [
      { nome: 'Cientista Anti-Mutante', pod: [0], frq: [{ texto: 'Fanático', grau: 2 }] }
    ]
  },
  'Reverend William Stryker': {
    cards: [
      { nome: 'Pregador do Ódio', pod: [0], frq: [{ texto: 'Fanático Religioso', grau: 3 }] }
    ]
  },

  // ===== HUMANOS =====
  'Moira MacTaggert': {
    cards: [
      { nome: 'Geneticista de Elite', pod: [0], frq: [] },
      { nome: 'Aliada dos X-Men', pod: [1], frq: [{ texto: 'Humana', grau: 1 }] }
    ]
  },
  'Agente S.H.I.E.L.D.': {
    cards: [
      { nome: 'Agente S.H.I.E.L.D.', pod: [0], frq: [] }
    ]
  },
  'Val Cooper': {
    cards: [
      { nome: 'Ligação Governamental', pod: [0], frq: [] },
      { nome: 'Aliada Relutante', pod: [1], frq: [{ texto: 'Burocracia', grau: 1 }] }
    ]
  },
  'Henry Gyrich': {
    cards: [
      { nome: 'Burocrata Anti-Mutante', pod: [0], frq: [{ texto: 'Preconceito', grau: 2 }] }
    ]
  },
  'Bolivar Trask': {
    cards: [
      { nome: 'Criador das Sentinelas', pod: [0], frq: [{ texto: 'Pesadelo Realizado', grau: 2 }] }
    ]
  },

  // ===== NEUTRO =====
  'Diamond Lil': {
    cards: [
      { nome: 'Pele de Diamante', pod: [0], frq: [] },
      { nome: 'Mercenária', pod: [1], frq: [] }
    ]
  },
  'Madison Jeffries': {
    cards: [
      { nome: 'Moldar Metal', pod: [0], frq: [] },
      { nome: 'Gênio Mecânico', pod: [1], frq: [] }
    ]
  },

  // ===== CLUBE DO INFERNO =====
  'Tarot': {
    cards: [
      { nome: 'Cartas Místicas', pod: [0], frq: [] },
      { nome: 'Vidente do Caos', pod: [1], frq: [{ texto: 'Cartas São Imprevisíveis', grau: 2 }] }
    ]
  },
  'Catseye': {
    cards: [
      { nome: 'Gato', pod: [0], frq: [] },
      { nome: 'Hellion Leal', pod: [1], frq: [{ texto: 'Mentalidade de Gato', grau: 1 }] }
    ]
  },
  'Empath': {
    cards: [
      { nome: 'Manipulação Emocional', pod: [0], frq: [] },
      { nome: 'Bruto do Clube', pod: [1], frq: [{ texto: 'Sádico', grau: 2 }] }
    ]
  },
  'Jetstream': {
    cards: [
      { nome: 'Propulsão a Jato', pod: [0], frq: [] },
      { nome: 'Hellion', pod: [1], frq: [] }
    ]
  },
  'Beef': {
    cards: [
      { nome: 'Força Bruta', pod: [0], frq: [] },
      { nome: 'Hellion', pod: [1], frq: [] }
    ]
  },
  'Roulette': {
    cards: [
      { nome: 'Roleta da Sorte', pod: [0], frq: [] },
      { nome: 'Jogadora', pod: [1], frq: [{ texto: 'Viciada em Risco', grau: 2 }] }
    ]
  },
  'Timeshadow': {
    cards: [
      { nome: 'Sombra do Tempo', pod: [0], frq: [] }
    ]
  },
  'Bevatron': {
    cards: [
      { nome: 'Partículas', pod: [0], frq: [] }
    ]
  },
  'Shinobi Shaw': {
    cards: [
      { nome: 'Tecnopatia', pod: [0], frq: [] },
      { nome: 'Herdeiro do Clube', pod: [1], frq: [{ texto: 'À Sombra do Pai', grau: 2 }] }
    ]
  },
  'Trevor Fitzroy': {
    cards: [
      { nome: 'Portal Temporal', pod: [0], frq: [] },
      { nome: 'Assassino do Tempo', pod: [1], frq: [{ texto: 'Ambicioso e Cruel', grau: 2 }] }
    ]
  }
};

// ── Additional tags per NPC to hit target counts ──
// Each entry: [tag objects] — added to the flat tags array
const EXTRA_TAGS = {
  // X-MEN extremo
  'Professor X': [
    { texto: 'Líder dos X-Men', grau: 5 },
    { texto: 'Intelecto Genial', grau: 4 },
    { texto: 'Fundador do Instituto Xavier', grau: 4 },
    { texto: 'Mestre em Xadrez Psíquico', grau: 3 },
    { texto: 'Diplomacia Mutante-Humano', grau: 3 },
    { texto: 'Idealismo Inabalável', grau: 4 },
    { texto: 'Rede de Contatos Global', grau: 3 },
    { texto: 'Coração Vulnerável a Traições', grau: 2 },
    { texto: 'Segredos que Pesam', grau: 2 }
  ],
  'Jean Grey': [
    { texto: 'Empatia Profunda', grau: 4 },
    { texto: 'Mentora de Jovens Mutantes', grau: 3 },
    { texto: 'Elo Psíquico com Scott', grau: 4 },
    { texto: 'Poder Latente Além da Compreensão', grau: 4 },
    { texto: 'Fênix Pode Consumir sua Consciência', grau: 4 },
    { texto: 'Medo do Próprio Poder', grau: 3 },
    { texto: 'Trauma de Morte e Renascimento', grau: 3 }
  ],
  'Emma Frost': [
    { texto: 'Professora Exigente e Eficaz', grau: 4 },
    { texto: 'Lealdade aos Alunos', grau: 3 },
    { texto: 'Ex-Rainha do Clube do Inferno', grau: 4 },
    { texto: 'Arrogância como Escudo', grau: 3 },
    { texto: 'Passado Villão Assombra', grau: 2 },
    { texto: 'Dificuldade de Confiar', grau: 2 }
  ],
  'Rachel Summers': [
    { texto: 'Rastreadora do Futuro', grau: 4 },
    { texto: 'Determinação Inabalável', grau: 3 },
    { texto: 'Trauma de Escrava', grau: 3 },
    { texto: 'Laço Familiar com Cable', grau: 3 },
    { texto: 'Poder Instável sob Estresse', grau: 2 },
    { texto: 'Isolamento por Ser do Futuro', grau: 2 }
  ],
  'Cable': [
    { texto: 'Liderança da X-Force', grau: 4 },
    { texto: 'Estrategista Pós-Apocalíptico', grau: 4 },
    { texto: 'Armamento Pesado', grau: 3 },
    { texto: 'Vírus Techno-Orgânico', grau: 4 },
    { texto: 'Obsessão com o Futuro', grau: 2 }
  ],

  // X-MEN alto
  'Ciclope': [
    { texto: 'Comandante de Campo', grau: 4 },
    { texto: 'Disciplina de Aço', grau: 4 },
    { texto: 'Estrategista Nato', grau: 3 },
    { texto: 'Amor por Jean Grey', grau: 3 },
    { texto: 'Peso da Responsabilidade', grau: 2 },
    { texto: 'Rigidez Emocional', grau: 2 }
  ],
  'Wolverine': [
    { texto: 'Samurai Interior', grau: 4 },
    { texto: 'Código de Honra Pessoal', grau: 4 },
    { texto: 'Mestre em Artes Marciais', grau: 3 },
    { texto: 'Lealdade Feroz aos Amigos', grau: 3 },
    { texto: 'Décadas de Experiência', grau: 3 },
    { texto: 'Raiva Incontrolável', grau: 2 }
  ],
  'Tempestade': [
    { texto: 'Liderança e Realeza', grau: 4 },
    { texto: 'Orgulho Africano', grau: 3 },
    { texto: 'Compaixão e Sabedoria', grau: 3 },
    { texto: 'Claustrofobia Severa', grau: 3 },
    { texto: 'Responsabilidade de Líder', grau: 2 }
  ],
  'Fera': [
    { texto: 'Médico dos X-Men', grau: 3 },
    { texto: 'Consciência da Equipe', grau: 3 },
    { texto: 'Moralidade Flexível', grau: 3 },
    { texto: 'Aparência Desfavorece Socialmente', grau: 2 },
    { texto: 'Faz o que Precisa', grau: 2 }
  ],
  'Ícone': [
    { texto: 'Potencial Ômega Raramente Usado', grau: 3 },
    { texto: 'Herança de Serval', grau: 3 },
    { texto: 'Humor Defensivo', grau: 2 }
  ],
  'Anjo': [
    { texto: 'Bilionário Worthington', grau: 4 },
    { texto: 'Sangue Curativo', grau: 4 },
    { texto: 'Trauma de Apocalipse', grau: 3 },
    { texto: 'Lado Sombrio Arcangel', grau: 3 }
  ],
  'Colossus': [
    { texto: 'Artista e Pintor', grau: 3 },
    { texto: 'Protetor da Família Rasputin', grau: 4 },
    { texto: 'Lealdade à Irmã Magik', grau: 4 },
    { texto: 'Força Interior', grau: 3 },
    { texto: 'Perda de Amigos Pesa', grau: 2 }
  ],
  'Noturno': [
    { texto: 'Acrobata Consumado', grau: 4 },
    { texto: 'Fé Católica Profunda', grau: 4 },
    { texto: 'Humor como Defesa', grau: 3 },
    { texto: 'Autoestima Frágil', grau: 2 }
  ],
  'Kitty Pryde': [
    { texto: 'Mestra em Hacking', grau: 4 },
    { texto: 'Knight de Solano', grau: 4 },
    { texto: 'Liderança Natural', grau: 3 },
    { texto: 'Fisicamente Frágil', grau: 2 },
    { texto: 'Coração Partido por Colossus', grau: 2 }
  ],
  'Rogue': [
    { texto: 'Liderança de Equipe', grau: 3 },
    { texto: 'Força de Voo (Miss Marvel)', grau: 4 },
    { texto: 'Força de Vontade', grau: 3 },
    { texto: 'Múltiplas Personalidades Absorvidas', grau: 3 }
  ],
  'Gambit': [
    { texto: 'Mestre Ladrão', grau: 4 },
    { texto: 'Charme Mutante', grau: 4 },
    { texto: 'Cajado Bo', grau: 3 },
    { texto: 'Passado Obscuro na Guilda', grau: 3 },
    { texto: 'Desconfiança dos Outros', grau: 2 }
  ],
  'Psylocke': [
    { texto: 'Ninjitsu e Artes Marciais', grau: 4 },
    { texto: 'Telecinesia Precisa', grau: 3 },
    { texto: 'Determinação Fria', grau: 3 },
    { texto: 'Passado na Mão', grau: 2 }
  ],
  'Bishop': [
    { texto: 'Instinto de Sobrevivência', grau: 4 },
    { texto: 'Marcado com M no Rosto', grau: 3 },
    { texto: 'Obsessão com Ameaças', grau: 2 }
  ],
  'Jubileu': [
    { texto: 'Potencial Ômega Latente', grau: 5 },
    { texto: 'Protegida de Wolverine', grau: 3 },
    { texto: 'Vampira pós M-Day', grau: 3 },
    { texto: 'Potencial Ômega Bloqueado', grau: 2 }
  ],
  'Polaris': [
    { texto: 'Campo de Força Magnético', grau: 4 },
    { texto: 'Voo Magnético', grau: 3 },
    { texto: 'Instabilidade Mental', grau: 3 },
    { texto: 'Identidade Incerta', grau: 2 }
  ],
  'Havok': [
    { texto: 'Imunidade a Ciclope', grau: 3 },
    { texto: 'Liderança', grau: 3 },
    { texto: 'Síndrome do Irmão Famoso', grau: 2 }
  ],
  'X-23': [
    { texto: 'Fator de Cura Acelerado', grau: 5 },
    { texto: 'Garras de Adamantium', grau: 5 },
    { texto: 'Identidade em Construção', grau: 3 },
    { texto: 'Gatilho de Berserk', grau: 4 }
  ],
  'Forge': [
    { texto: 'Inventor Oficial dos X-Men', grau: 4 },
    { texto: 'Xamã Cheyenne', grau: 3 },
    { texto: 'Neutralizador de Mutantes', grau: 2 }
  ],
  'Dazzler': [
    { texto: 'Laser de Luz Concentrado', grau: 3 },
    { texto: 'Cantora e Performer', grau: 4 },
    { texto: 'Força Sonora como Disco', grau: 3 },
    { texto: 'Precisa de Fonte Sonora', grau: 2 }
  ],
  'Banshee': [
    { texto: 'Frequência Hipnótica', grau: 3 },
    { texto: 'Ex-Agente da Interpol', grau: 3 },
    { texto: 'Fundador da Geração X', grau: 3 },
    { texto: 'Pai de Siryn', grau: 2 }
  ],

  // NOVATOS alto/medio - bring to ~15 tags
  'M (Monet St. Croix)': [
    { texto: 'Força Sobre-humana', grau: 4 },
    { texto: 'Telepatia', grau: 3 },
    { texto: 'Arrogância Refinada', grau: 3 },
    { texto: 'Herdeira Bilionária', grau: 4 },
    { texto: 'Voo', grau: 3 }
  ],
  'Elixir': [
    { texto: 'Biocinese de Cura', grau: 5 },
    { texto: 'Controle Molecular', grau: 4 },
    { texto: 'Pode Matar com Toque', grau: 3 },
    { texto: 'Médico dos Novos X-Men', grau: 2 }
  ],
  'Hellion': [
    { texto: 'Telecinesia Poderosa', grau: 5 },
    { texto: 'Mãos Protéticas', grau: 3 },
    { texto: 'Líder dos Hellions', grau: 3 },
    { texto: 'Arrogância', grau: 2 }
  ],
  'Cannonball': [
    { texto: 'Invulnerabilidade em Voo', grau: 4 },
    { texto: 'Liderança Natural', grau: 3 },
    { texto: 'Família Guthrie', grau: 2 },
    { texto: 'Membro dos X-Men', grau: 2 }
  ],
  'Sunspot': [
    { texto: 'Força Sobre-humana', grau: 4 },
    { texto: 'Bilionário DaCosta', grau: 4 },
    { texto: 'Impulsivo', grau: 2 },
    { texto: 'Membro dos X-Men', grau: 2 }
  ],
  'Wolfsbane': [
    { texto: 'Sentidos Lupinos', grau: 4 },
    { texto: 'Ligação com Mirage', grau: 3 },
    { texto: 'Fé Escocesa', grau: 2 },
    { texto: 'Controle Reduzido em Forma Animal', grau: 2 }
  ],
  'Karma': [
    { texto: 'Controle Múltiplo', grau: 3 },
    { texto: 'Refugiada Vietnamita', grau: 3 },
    { texto: 'Responsabilidade pelos Irmãos', grau: 3 },
    { texto: 'Amputada', grau: 1 }
  ],
  'Magma': [
    { texto: 'Forma de Rocha', grau: 4 },
    { texto: 'Nobre de Nova Roma', grau: 3 },
    { texto: 'Ingênua ao Mundo Moderno', grau: 2 }
  ],
  'Boomer': [
    { texto: 'Atitude Rebelde', grau: 2 },
    { texto: 'Chamariz de Problemas', grau: 2 }
  ],
  'Rockslide': [
    { texto: 'Força Bruta', grau: 4 },
    { texto: 'Humor', grau: 3 },
    { texto: 'Aluno do Instituto', grau: 2 }
  ],
  'Surge': [
    { texto: 'Liderança dos Novos X-Men', grau: 3 },
    { texto: 'Eletricidade', grau: 4 },
    { texto: 'Precisa de Luvas', grau: 2 }
  ],
  'Armor': [
    { texto: 'Armadura Psíquica', grau: 4 },
    { texto: 'Determinação', grau: 3 },
    { texto: 'Insegurança', grau: 2 }
  ],
  'Chamber': [
    { texto: 'Explosão Psíquica', grau: 4 },
    { texto: 'Silêncio', grau: 3 },
    { texto: 'Rosto Desfigurado', grau: 2 }
  ],
  'Husk': [
    { texto: 'Descamação', grau: 3 },
    { texto: 'Família Guthrie', grau: 2 }
  ],
  'Prodigy': [
    { texto: 'Memória Absoluta', grau: 4 },
    { texto: 'Gênio', grau: 3 },
    { texto: 'Perde ao Dormir', grau: 2 }
  ],
  'Wallflower': [
    { texto: 'Feromônios', grau: 3 },
    { texto: 'Invisível', grau: 2 },
    { texto: 'Baixa Autoestima', grau: 2 }
  ],
  'Timeslip': [
    { texto: 'Salto Temporal', grau: 3 },
    { texto: 'Controle Imperfeito', grau: 2 }
  ],
  'Impulse': [
    { texto: 'Explosão Cinética', grau: 3 },
    { texto: 'Impulsivo', grau: 2 }
  ],
  'Mirage': [
    { texto: 'Arco e Flecha', grau: 3 },
    { texto: 'Ex-Valquíria', grau: 4 },
    { texto: 'Perda de Poderes pós M-Day', grau: 2 }
  ],
  'Cypher': [
    { texto: 'Leitura Corporal', grau: 4 },
    { texto: 'Amigo de Warlock', grau: 3 },
    { texto: 'Morreu em Batalha', grau: 2 }
  ],

  // MORLOCK
  'Callisto': [
    { texto: 'Líder dos Túneis', grau: 3 },
    { texto: 'Caçadora', grau: 2 },
    { texto: 'Desconfia da Superfície', grau: 2 }
  ],
  'Marrow': [
    { texto: 'Ossos como Armas', grau: 4 },
    { texto: 'Raiva', grau: 2 },
    { texto: 'Instabilidade', grau: 2 }
  ],

  // IRMANDADE
  'Magneto': [
    { texto: 'Campo de Força Magnético', grau: 5 },
    { texto: 'Voo Magnético', grau: 4 },
    { texto: 'Visão de Supremacia Mutante', grau: 4 },
    { texto: 'Carisma Revolucionário', grau: 4 },
    { texto: 'Trauma do Holocausto', grau: 3 }
  ],
  'Mystique': [
    { texto: 'Rede de Espionagem', grau: 4 },
    { texto: 'Manipuladora Genial', grau: 3 },
    { texto: 'Mãe de Noturno', grau: 2 },
    { texto: 'Lealdade a Si Mesma', grau: 3 }
  ],
  'Pyro': [
    { texto: 'Manipula Fogo', grau: 4 },
    { texto: 'Incendiário', grau: 3 },
    { texto: 'Fogo Sem Controle', grau: 2 }
  ],
  'Avalanche': [
    { texto: 'Ondas Sísmicas', grau: 4 },
    { texto: 'Demolidor', grau: 3 }
  ],

  // VILÕES principal
  'Sabretooth': [
    { texto: 'Caçador Sádico', grau: 3 },
    { texto: 'Instinto Assassino', grau: 3 },
    { texto: 'Rivalidade com Wolverine', grau: 2 }
  ],
  'Lady Deathstrike': [
    { texto: 'Ninja Ciborgue', grau: 3 },
    { texto: 'Obsessão por Wolverine', grau: 2 }
  ],
  'Mister Sinister': [
    { texto: 'Manipulador Genético', grau: 5 },
    { texto: 'Clonagem', grau: 4 },
    { texto: 'Marotos', grau: 3 },
    { texto: 'Obsessão Summers', grau: 3 }
  ],
  'Apocalipse': [
    { texto: 'Primeiro Mutante', grau: 6 },
    { texto: 'Sobrevivência do Mais Forte', grau: 5 },
    { texto: 'Juiz Universal', grau: 4 },
    { texto: 'Quatro Cavaleiros', grau: 3 }
  ],
  'Sauron': [
    { texto: 'Pterossauro', grau: 4 },
    { texto: 'Doutor', grau: 3 },
    { texto: 'Hipocrisia', grau: 2 }
  ],
  'Frenzy': [
    { texto: 'Força', grau: 4 },
    { texto: 'Pele Indestrutível', grau: 4 },
    { texto: 'Raiva', grau: 2 }
  ],
  'Agent Zero': [
    { texto: 'Fator de Cura', grau: 4 },
    { texto: 'Atirador', grau: 3 },
    { texto: 'Lavagem Cerebral', grau: 2 }
  ],
  'Trevor Fitzroy': [
    { texto: 'Portal Temporal', grau: 4 },
    { texto: 'Ambicioso', grau: 2 }
  ],

  // HUMANOS
  'Moira MacTaggert': [
    { texto: 'Geneticista', grau: 3 },
    { texto: 'Aliada dos X-Men', grau: 3 },
    { texto: 'Humana', grau: 1 }
  ],

  // CLUBE DO INFERNO
  'Shinobi Shaw': [
    { texto: 'Tecnopatia', grau: 3 },
    { texto: 'Herdeiro', grau: 2 },
    { texto: 'Sombra do Pai', grau: 2 }
  ]
};

// ── HELPERS ──
function countCards(danger) {
  if (danger === 'extremo') return 5;
  if (danger === 'alto') return 4;
  if (danger === 'medio') return 4;
  return 3; // baixo
}

function totalTagsTarget(danger) {
  if (danger === 'extremo') return 25;
  if (danger === 'alto') return 20;
  if (danger === 'medio') return 15;
  return 10;
}

// ── SQL GENERATION ──
function generateSQL(npcs) {
  let sql = `-- ═══════════════════════════════════════════════════════════════\n`;
  sql += `-- Migração 004 — Theme cards enriquecidos para TODOS os NPCs originais\n`;
  sql += `-- Gerado por scripts/gen-enrich-temas.js\n`;
  sql += `-- Substitui data.temas dos 133 NPCs do cerebro_rebalanceado.md\n`;
  sql += `-- NÃO toca em characters. Idempotente.\n`;
  sql += `-- ═══════════════════════════════════════════════════════════════\n\nBEGIN;\n\n`;

  let count = 0;
  for (const npc of npcs) {
    const spec = SPEC[npc.name];
    if (!spec) {
      console.warn(`  ⚠ Sem SPEC para: ${npc.name}`);
      continue;
    }

    const parsedTags = npc.tagLines.map(parseTag);
    const allExistingTags = parsedTags.map(clean);
    const tagMap = {}; // index → object
    parsedTags.forEach((t, i) => { tagMap[i] = { texto: t.texto, grau: Math.abs(t.grau) }; });

    // Helper: normalized text comparison
    const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const hasText = (arr, txt) => arr.some(ct => norm(ct.texto) === norm(txt));

    // Build enriched tags: from cards + extra + generics
    const cardTags = [];
    for (const card of spec.cards) {
      const podTags = resolveTags(card.pod || [], tagMap);
      const frqTags = resolveTags(card.frq || [], tagMap);
      podTags.forEach(t => {
        if (!hasText(cardTags, t.texto)) cardTags.push(t);
      });
      frqTags.forEach(t => {
        if (!hasText(cardTags, t.texto)) cardTags.push(t);
      });
    }

    // Add extra tags
    const extra = EXTRA_TAGS[npc.name] || [];
    extra.forEach(t => {
      if (!hasText(cardTags, t.texto)) cardTags.push(clean(t));
    });

    // Add faction generic
    const facGen = FACTION_GENERICS[npc.faction];
    if (facGen && !hasText(cardTags, facGen.texto)) {
      cardTags.push({ ...facGen });
    }

    // Add danger generics (up to the count for this danger)
    const dangerGenerics = GENERICS[npc.danger] || [];
    let addedGen = 0;
    const genTarget = npc.danger === 'extremo' ? 6 : npc.danger === 'alto' ? 4 : npc.danger === 'medio' ? 2 : 1;
    for (const g of dangerGenerics) {
      if (addedGen >= genTarget) break;
      if (!hasText(cardTags, g.texto)) {
        cardTags.push({ ...g });
        addedGen++;
      }
    }

    // Ensure existing positive-grau tags are included
    for (const t of allExistingTags) {
      if (t.grau <= 0) continue; // negative-grau = weakness already in card frq
      if (!hasText(cardTags, t.texto)) {
        cardTags.push({ ...t });
      }
    }

    // Build the temas structure from SPEC
    const temas = spec.cards.map(card => ({
      nome: card.nome,
      poder: resolveTags(card.pod || [], tagMap),
      fraqueza: resolveTags(card.frq || [], tagMap)
    }));

    sql += `UPDATE npcs SET data = jsonb_set(jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', ${jb(temas)}), '{tags}', ${jb(cardTags)}),\n`;
    sql += `  updated_at = NOW()\n`;
    sql += `  WHERE name = '${sq(npc.name)}' AND is_global = TRUE;\n\n`;
    count++;
  }

  sql += `COMMIT;\n`;
  sql += `\n-- Resumo: ${count} NPCs enriquecidos.\n`;
  return sql;
}

// ── MAIN ──
const npcs = parseAll(fs.readFileSync(MD, 'utf8'));
const sql = generateSQL(npcs);
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, sql);
console.log(`OK → ${OUT}`);
console.log(`  ${npcs.filter(n => SPEC[n.name]).length} NPCs com SPEC aplicados`);
console.log(`  ${npcs.filter(n => !SPEC[n.name]).length} NPCs sem SPEC (ignorados)`);
