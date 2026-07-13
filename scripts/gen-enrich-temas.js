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

const clean = o => ({ texto: o.texto });

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
      { nome: 'Pai Ausente', pod: [{ texto: 'Criou Gerações de Mutantes', grau: 4 }, { texto: 'Legado Vive nos Alunos', grau: 3 }], frq: [{ texto: 'Paraplégico', grau: 3 }, { texto: 'Manipula Alunos como Soldados', grau: 3 }, { texto: 'Apaga Mentes sem Consentimento', grau: 3 }, { texto: 'Fisicamente Frágil e Doente', grau: 2 }, { texto: 'Segredos que Pesam na Consciência', grau: 2 }] }
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
      { nome: 'Frieza Calculista', pod: [{ texto: 'Manipulação Psíquica Sutil', grau: 4 }, { texto: 'Mente Tática e Inescrupulosa', grau: 3 }], frq: [{ texto: 'Arrogância como Escudo', grau: 3 }, { texto: 'Pragmatismo Moralmente Cinzento', grau: 2 }, { texto: 'Dificuldade de Confiar', grau: 2 }] },
      { nome: 'Ex-Rainha Branca', pod: [{ texto: 'Recursos do Clube do Inferno', grau: 3 }, { texto: 'Contatos Corporativos Globais', grau: 3 }, { texto: 'Experiência como Villã', grau: 3 }], frq: [{ texto: 'Inimigos no Mundo Corporativo', grau: 2 }, { texto: 'Reputação Manchada', grau: 2 }] }
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
      { nome: 'Repressão de Aço', pod: [{ texto: 'Amor por Jean Grey', grau: 3 }, { texto: 'Relação Conturbada com o Pai', grau: 2 }], frq: [{ texto: 'Rigidez Emocional', grau: 3 }, { texto: 'Não Consegue Parar de Liderar', grau: 2 }] },
      { nome: 'Mestre do Visor', pod: [{ texto: 'Rajada de Amplo Alcance', grau: 4 }, { texto: 'Rajada de Precisão Cirúrgica', grau: 4 }, { texto: 'Rajada Ricocheteante', grau: 3 }, { texto: 'Rajada de Pulso Rápido', grau: 3 }, { texto: 'Modulação de Frequência', grau: 3 }], frq: [{ texto: 'Visor Pode Ser Destruído', grau: 2 }, { texto: 'Fadiga Mental em Combate Prolongado', grau: 2 }] }
    ]
  },
  'Wolverine': {
    cards: [
      { nome: 'Fator de Cura e Adamantium', pod: [0, 1, 2], frq: [] },
      { nome: 'Fera Selvagem', pod: [4, 5], frq: [{ texto: 'Instinto Berserker', grau: 3 }] },
      { nome: 'Samurai Interior', pod: [{ texto: 'Código de Honra Pessoal', grau: 4 }, { texto: 'Mestre em Artes Marciais', grau: 3 }, { texto: 'Lealdade Feroz aos Amigos', grau: 3 }], frq: [] },
      { nome: 'Passado Fragmentado', pod: [{ texto: 'Décadas de Experiência', grau: 3 }], frq: [{ texto: 'Memórias Fragmentadas', grau: 3 }, { texto: 'Raiva Incontrolável', grau: 2 }] },
      { nome: 'Arma X', pod: [{ texto: 'Séculos de Combate', grau: 4 }, { texto: 'Rastreador Implacável', grau: 4 }, { texto: 'Resistência a Telepatia', grau: 3 }, { texto: 'Conhecimento de Operações Negras', grau: 3 }], frq: [{ texto: 'Gatilhos de Condicionamento', grau: 3 }, { texto: 'Culpa por Vítimas Inocentes', grau: 2 }] }
    ]
  },
  'Tempestade': {
    cards: [
      { nome: 'Senhora dos Elementos', pod: [0, 1, 2], frq: [] },
      { nome: 'Deusa do Trovão', pod: [3, 5], frq: [{ texto: 'Claustrofobia Severa', grau: 3 }] },
      { nome: 'Rainha de Wakanda', pod: [{ texto: 'Liderança e Realeza', grau: 4 }, { texto: 'Orgulho Africano', grau: 3 }], frq: [] },
      { nome: 'Espírito Livre', pod: [{ texto: 'Compaixão e Sabedoria', grau: 3 }], frq: [{ texto: 'Responsabilidade de Líder', grau: 2 }] },
      { nome: 'Ladra do Cairo', pod: [{ texto: 'Furtividade Urbana', grau: 3 }, { texto: 'Mestre do Disfarce', grau: 3 }, { texto: 'Contatos no Submundo', grau: 2 }], frq: [{ texto: 'Passado de Rua', grau: 2 }, { texto: 'Desconfiança de Autoridades', grau: 2 }] },
      { nome: 'Mãe dos Mutantes', pod: [{ texto: 'Mentora da Nova Geração', grau: 4 }, { texto: 'Defensora dos Órfãos Mutantes', grau: 3 }, { texto: 'Voz Moral dos X-Men', grau: 3 }], frq: [{ texto: 'Culpa por Não Salvar Todos', grau: 3 }, { texto: 'Peso da Coroa', grau: 2 }] }
    ]
  },
  'Fera': {
    cards: [
      { nome: 'Intelecto Genial', pod: [1, 4], frq: [] },
      { nome: 'Fera Azul', pod: [0, 2, 3], frq: [{ texto: 'Aparência Desfavorece Socialmente', grau: 2 }] },
      { nome: 'Cientista sem Escrúpulos', pod: [{ texto: 'Ex-Diretor da X-Force CIA', grau: 4 }], frq: [{ texto: 'Escorregou Moralmente', grau: 3 }, { texto: 'Clonou e Matou Wolverine', grau: 3 }, { texto: 'Prisões Secretas e Experimentos', grau: 3 }] },
      { nome: 'Jekyll & Hyde', pod: [{ texto: 'Intelecto Genial', grau: 4 }, { texto: 'Capacidade de Adaptação Moral', grau: 3 }], frq: [{ texto: 'Duas Versões de Si em Guerra', grau: 3 }, { texto: 'Vaidade Intelectual', grau: 2 }] }
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
      { nome: 'Anjo da Morte', pod: [{ texto: 'Asas Metálicas Cortantes', grau: 4 }, { texto: 'Voo Sônico e Precisão Aérea', grau: 3 }], frq: [{ texto: 'Trauma de Apocalipse', grau: 3 }, { texto: 'Lado Sombrio Arcangel', grau: 3 }] }
    ]
  },
  'Colossus': {
    cards: [
      { nome: 'Aço Orgânico', pod: [0, 1, 2], frq: [] },
      { nome: 'Artista e Guerreiro', pod: [3], frq: [] },
      { nome: 'Protetor da Família', pod: [{ texto: 'Lealdade à Irmã Magik', grau: 4 }, { texto: 'Força Interior', grau: 3 }], frq: [] },
      { nome: 'Gigante Gentil', pod: [{ texto: 'Força Sobre-humana', grau: 5 }, { texto: 'Pele de Aço Orgânico', grau: 4 }], frq: [{ texto: 'Pesa a Perda de Seus Amigos', grau: 2 }, { texto: 'Manso Demais para Ser Cruel', grau: 1 }] },
      { nome: 'Legado Rasputin', pod: [{ texto: 'Irmão de Magik (Illyana)', grau: 3 }, { texto: 'Sangue de Feiticeiros', grau: 3 }, { texto: 'Conexão com Limbo', grau: 3 }, { texto: 'Protege Inocentes', grau: 3 }], frq: [{ texto: 'Magik o Manipula', grau: 2 }, { texto: 'Fardo da Família', grau: 2 }] }
    ]
  },
  'Noturno': {
    cards: [
      { nome: 'Teletransporte Bamf', pod: [0, 1], frq: [] },
      { nome: 'Acrobata Sombrio', pod: [2, 3], frq: [] },
      { nome: 'Fé e Devoção', pod: [4], frq: [{ texto: 'Aparência Demoníaca', grau: 2 }] },
      { nome: 'Palhaço Triste', pod: [{ texto: 'Humor como Defesa', grau: 3 }], frq: [{ texto: 'Autoestima Frágil', grau: 2 }] },
      { nome: 'Filho de Mística', pod: [{ texto: 'Sombra da Mãe', grau: 3 }, { texto: 'Irmão de Rogue', grau: 2 }, { texto: 'Herança Mutante Misteriosa', grau: 2 }], frq: [{ texto: 'Identidade Oculta', grau: 2 }, { texto: 'Medo de Rejeição', grau: 2 }] },
      { nome: 'Mestre da Espada', pod: [{ texto: 'Esgrima de Nível Olímpico', grau: 4 }, { texto: 'Teletransporte em Combate', grau: 4 }, { texto: 'Ataque e Fuga Instantâneo', grau: 4 }, { texto: 'Lutas em Três Dimensões', grau: 3 }], frq: [{ texto: 'Cansaço por Teleportes Seguidos', grau: 2 }] },
      { nome: 'Sombra Viva', pod: [{ texto: 'Invisibilidade em Sombras', grau: 4 }, { texto: 'Teletransporte Silencioso', grau: 3 }, { texto: 'Sentidos Noturnos Aguçados', grau: 3 }], frq: [{ texto: 'Luz Intensa o Enfraquece', grau: 2 }] }
    ]
  },
  'Kitty Pryde': {
    cards: [
      { nome: 'Fase', pod: [0, 1], frq: [] },
      { nome: 'Mestra da Tecnologia', pod: [2], frq: [] },
      { nome: 'Knight de Solano', pod: [3, 4], frq: [] },
      { nome: 'Coração Valente', pod: [{ texto: 'Liderança Natural', grau: 3 }], frq: [{ texto: 'Fisicamente Frágil', grau: 2 }, { texto: 'Coração Partido por Colossus', grau: 2 }] },
      { nome: 'Dragão Lockheed', pod: [{ texto: 'Vínculo Telepático com Lockheed', grau: 3 }, { texto: 'Companheiro de Batalha', grau: 3 }, { texto: 'Fonte de Conforto', grau: 2 }], frq: [{ texto: 'Perda de Lockheed a Abala', grau: 2 }] }
    ]
  },
  'Rogue': {
    cards: [
      { nome: 'Absorção de Poderes', pod: [0, 1, 2], frq: [] },
      { nome: 'Toque Letal', pod: [{ texto: 'Absorve Poderes, Memórias e Personalidade', grau: 5 }], frq: [{ texto: 'Não Pode Tocar Ninguém sem Absorver', grau: 4 }, { texto: 'Isolamento Emocional Permanente', grau: 3 }, { texto: 'Múltiplas Personalidades Absorvidas', grau: 3 }] },
      { nome: 'Villã Redimida', pod: [{ texto: 'Força e Voo (Miss Marvel)', grau: 4 }, { texto: 'Liderança de Equipe', grau: 3 }, { texto: 'Força de Vontade Inabalável', grau: 3 }], frq: [{ texto: 'Passado na Irmandade Assombra', grau: 2 }] },
      { nome: 'Amor à Prova de Toque', pod: [{ texto: 'Casada com Gambit', grau: 3 }], frq: [{ texto: 'Mystique a Manipulou por Anos', grau: 2 }] },
      { nome: 'Poderes Permanentes Absorvidos', pod: [{ texto: 'Vôo e Força Sobre-humana', grau: 4 }, { texto: 'Invulnerabilidade Parcial', grau: 3 }, { texto: 'Sentidos Aguçados', grau: 3 }], frq: [{ texto: 'Eco da Personalidade de Carol Danvers', grau: 3 }, { texto: 'Medo de Perder Controle', grau: 2 }] }
    ]
  },
  'Gambit': {
    cards: [
      { nome: 'Carga Cinética', pod: [0, 4], frq: [] },
      { nome: 'Rei dos Ladrões', pod: [1, 3], frq: [{ texto: 'Passado na Guilda dos Ladrões', grau: 3 }] },
      { nome: 'Charme Cajun', pod: [2], frq: [{ texto: 'Lealdade Questionável', grau: 2 }] },
      { nome: 'Busca por Redenção', pod: [{ texto: 'Casado com Rogue', grau: 3 }], frq: [{ texto: 'Culpa pelo Massacre dos Morlocks', grau: 3 }, { texto: 'Poder Limitado por Sinister', grau: 2 }] },
      { nome: 'Mestre das Cartas', pod: [{ texto: 'Cartas Explosivas de Alcance', grau: 4 }, { texto: 'Carga em Objetos Grandes', grau: 3 }, { texto: 'Carga Adiada (Timer)', grau: 3 }, { texto: 'Desvio de Trajetória', grau: 2 }, { texto: 'Acrobacia de Nível Olímpico', grau: 3 }], frq: [{ texto: 'Olhos Sensíveis à Luz', grau: 2 }, { texto: 'Vício em Apostas', grau: 2 }] }
    ]
  },
  'Psylocke': {
    cards: [
      { nome: 'Espada Psiônica', pod: [0, 1], frq: [] },
      { nome: 'Ninja Psi', pod: [2, 3], frq: [{ texto: 'Corpo Trocado com Kwannon', grau: 2 }] },
      { nome: 'Guerreira Silenciosa', pod: [{ texto: 'Determinação Fria', grau: 3 }], frq: [{ texto: 'Passado na Mão', grau: 2 }] },
      { nome: 'Aristocrata Britânica', pod: [{ texto: 'Herdeira da Família Braddock', grau: 3 }, { texto: 'Irmã do Capitão Britânia', grau: 3 }, { texto: 'Educação de Elite', grau: 2 }], frq: [{ texto: 'Fardo da Nobreza', grau: 2 }] },
      { nome: 'Corpo de Kwannon', pod: [{ texto: 'Artes Marciais de Elite', grau: 5 }, { texto: 'Telepatia Focada em Combate', grau: 4 }, { texto: 'Lâmina Psiônica Manifesta', grau: 4 }, { texto: 'Sombras e Furtividade', grau: 3 }], frq: [{ texto: 'Identidade Fragmentada', grau: 3 }, { texto: 'Memórias de Duas Vidas', grau: 3 }] }
    ]
  },
  'Bishop': {
    cards: [
      { nome: 'Absorção de Energia', pod: [0, 1], frq: [] },
      { nome: 'XSE', pod: [2], frq: [] },
      { nome: 'Sobrevivente do Futuro', pod: [{ texto: 'Instinto de Sobrevivência', grau: 4 }], frq: [{ texto: 'Obsessão com a Segurança', grau: 2 }, { texto: 'Pesa o Futuro que Perdeu', grau: 2 }] },
      { nome: 'Redirecionamento de Energia', pod: [{ texto: 'Absorve e Dispara Rajadas', grau: 5 }, { texto: 'Imune a Projéteis de Energia', grau: 4 }, { texto: 'Carrega Armas com Energia Absorvida', grau: 3 }, { texto: 'Sobrecarga Causa Explosão', grau: 4 }], frq: [{ texto: 'Limite de Absorção', grau: 2 }] },
      { nome: 'Caçador de Mutantes do Futuro', pod: [{ texto: 'Rastreamento Temporal', grau: 3 }, { texto: 'Conhecimento de Eventos Futuros', grau: 3 }, { texto: 'Táticas da XSE', grau: 3 }], frq: [{ texto: 'Paradoxo Temporal', grau: 2 }, { texto: 'Dificuldade de Confiar no Presente', grau: 2 }] }
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
      { nome: 'Filha de Magneto', pod: [3], frq: [{ texto: 'Instabilidade Mental', grau: 3 }, { texto: 'Identidade Incerta', grau: 2 }] },
      { nome: 'Mestra do Magnetismo', pod: [{ texto: 'Controle Fino de Metais', grau: 5 }, { texto: 'Manipulação de Sangue Ferroso', grau: 4 }, { texto: 'Campo de Força Pessoal', grau: 4 }, { texto: 'Voo Magnético', grau: 3 }], frq: [{ texto: 'Poder Ligado ao Estado Emocional', grau: 3 }] },
      { nome: 'Líder da X-Factor', pod: [{ texto: 'Tática de Campo', grau: 4 }, { texto: 'Lealdade à Equipe', grau: 3 }], frq: [{ texto: 'Sombra do Pai', grau: 3 }, { texto: 'Histórico de Colapso Mental', grau: 2 }] }
    ]
  },
  'Havok': {
    cards: [
      { nome: 'Anéis de Plasma', pod: [0, 1], frq: [{ texto: 'Controle Instável', grau: 2 }] },
      { nome: 'Liderança dos X-Men', pod: [2], frq: [{ texto: 'Síndrome do Irmão Famoso', grau: 2 }] },
      { nome: 'Plasma Cósmico', pod: [{ texto: 'Absorção de Energia Cósmica', grau: 5 }, { texto: 'Descarga de Plasma Concentrada', grau: 4 }, { texto: 'Imune a Poderes de Ciclope', grau: 4 }, { texto: 'Sobrecarga Destrutiva', grau: 3 }], frq: [{ texto: 'Dificuldade em Conter o Poder', grau: 3 }] },
      { nome: 'Irmão do Líder', pod: [{ texto: 'Liderança Relutante', grau: 3 }, { texto: 'Lealdade Fraterna', grau: 3 }], frq: [{ texto: 'Sempre na Sombra de Scott', grau: 3 }, { texto: 'Identidade Própria em Construção', grau: 2 }] }
    ]
  },
  'X-23': {
    cards: [
      { nome: 'Garras de Adamantium', pod: [0, 1], frq: [] },
      { nome: 'Assassina Condicionada', pod: [2], frq: [{ texto: 'Gatilho de Berserk', grau: 4 }, { texto: 'Trauma de Condicionamento', grau: 3 }] },
      { nome: 'Mais que uma Arma', pod: [{ texto: 'Identidade em Construção', grau: 3 }], frq: [] },
      { nome: 'Gatilho Químico', pod: [{ texto: 'Feromônio Desencadeia Fúria', grau: 5 }, { texto: 'Perde Controle Total', grau: 4 }, { texto: 'Cheiro Específico Ativa', grau: 4 }], frq: [{ texto: 'Inimigos Usam Gatilho', grau: 4 }, { texto: 'Medo de Machucar Amigos', grau: 3 }] },
      { nome: 'Clone de Wolverine', pod: [{ texto: 'Fator de Cura Similar', grau: 4 }, { texto: 'Duas Garras por Mão', grau: 4 }, { texto: 'Garra no Pé', grau: 3 }, { texto: 'Sem Adamantium no Esqueleto', grau: 3 }], frq: [{ texto: 'Vista como Propriedade', grau: 3 }, { texto: 'Busca Humanidade', grau: 3 }] }
    ]
  },
  'Forge': {
    cards: [
      { nome: 'Gênio Inventor', pod: [0, 2], frq: [] },
      { nome: 'Xamã Tecnológico', pod: [1, 3], frq: [{ texto: 'Criou o Neutralizador de Mutantes', grau: 2 }] },
      { nome: 'Neutralizador de Poderes', pod: [{ texto: 'Arma que Remove Mutação', grau: 5 }, { texto: 'Usado contra Tempestade', grau: 4 }, { texto: 'Arrependimento Profundo', grau: 4 }, { texto: 'Tecnologia Proibida', grau: 3 }], frq: [{ texto: 'Culpa por Desumanizar Mutantes', grau: 4 }, { texto: 'Destruiu os Planos', grau: 2 }] },
      { nome: 'Místico Cheyenne', pod: [{ texto: 'Visões Espirituais', grau: 3 }, { texto: 'Conexão com Adversário', grau: 3 }, { texto: 'Magia Tecnológica', grau: 3 }], frq: [{ texto: 'Conflito Ciência vs Fé', grau: 2 }, { texto: 'Perna e Mão Protéticas', grau: 2 }] },
      { nome: 'Armas X-Men', pod: [{ texto: 'Criou Cerebro Atualizado', grau: 4 }, { texto: 'Jato Blackbird', grau: 3 }, { texto: 'Uniformes Tecnológicos', grau: 3 }, { texto: 'Próteses Avançadas', grau: 3 }], frq: [{ texto: 'Dependência de Tecnologia', grau: 2 }] }
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
      { nome: 'Voo Sônico', pod: [{ texto: 'Voo via Ondas Sonoras', grau: 4 }, { texto: 'Escudo Sônico Protetor', grau: 3 }, { texto: 'Desorientação em Massa', grau: 3 }, { texto: 'Frequência Hipnótica', grau: 3 }], frq: [{ texto: 'Garganta Vulnerável', grau: 2 }] },
      { nome: 'Veterano da Interpol', pod: [2, 3], frq: [] },
      { nome: 'Pai e Mentor', pod: [{ texto: 'Fundador da Geração X', grau: 3 }, { texto: 'Pai de Siryn', grau: 2 }], frq: [] },
      { nome: 'Mestre do Som', pod: [{ texto: 'Imita Qualquer Voz', grau: 3 }, { texto: 'Detecção Sísmica', grau: 3 }, { texto: 'Contrassonar Subaquático', grau: 2 }], frq: [{ texto: 'Perda Auditiva Progressiva', grau: 2 }, { texto: 'Idade Avançada', grau: 2 }] },
      { nome: 'Grito Sônico Devastador', pod: [{ texto: 'Rajada Sônica de Nível 1', grau: 4 }, { texto: 'Rajada Sônica de Nível 2', grau: 4 }, { texto: 'Rajada Sônica de Nível 3', grau: 5 }, { texto: 'Onda de Choque Sônica', grau: 4 }], frq: [{ texto: 'Danos Permanentes à Voz', grau: 3 }] }
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
      { nome: 'Sorte Improvável', pod: [0, 1], frq: [{ texto: 'Sorte Falha em Perigo Extremo', grau: 2 }] },
      { nome: 'Mercenária Albina', pod: [2, 3], frq: [{ texto: 'Trauma do Projeto Armageddon', grau: 2 }] },
      { nome: 'Aliada Incondicional', pod: [{ texto: 'Coração de Mercenária', grau: 3 }], frq: [{ texto: 'Poder é Subconsciente', grau: 3 }] },
      { nome: 'Campo de Probabilidade', pod: [{ texto: 'Causa Azar aos Inimigos', grau: 5 }, { texto: 'Garante Sucesso em Ações', grau: 4 }, { texto: 'Projéteis Desviam Sozinhos', grau: 4 }, { texto: 'Eventos Improváveis Acontecem', grau: 3 }, { texto: 'Funciona Melhor sem Planejamento', grau: 3 }], frq: [{ texto: 'Não Controla Conscientemente', grau: 3 }, { texto: 'Efeito Borboleta Imprevisível', grau: 2 }] },
      { nome: 'Parceira de Cable', pod: [{ texto: 'Confiança Absoluta em Nathan', grau: 3 }, { texto: 'Ex-Membro X-Force', grau: 3 }], frq: [{ texto: 'Sorte Não Protege Amigos', grau: 2 }] }
    ]
  },
  'Shatterstar': {
    cards: [
      { nome: 'Espadas Dimensional', pod: [0, 2], frq: [] },
      { nome: 'Velocidade Sobre-humana', pod: [1], frq: [] },
      { nome: 'Guerreiro de Outro Mundo', pod: [3], frq: [{ texto: 'Sem Conceito de Emoção Humana', grau: 2 }] },
      { nome: 'Nascido em Mojoworld', pod: [{ texto: 'Gladiador Geneticamente Engenhado', grau: 4 }, { texto: 'Portais Dimensionais via Espadas', grau: 4 }, { texto: 'Aprendizado Acelerado de Combate', grau: 3 }, { texto: 'Sangue de Longshot', grau: 3 }], frq: [{ texto: 'Fugitivo de Mojo', grau: 2 }, { texto: 'Programado para Matar', grau: 2 }] },
      { nome: 'Parceiro de Rictor', pod: [{ texto: 'Primeiro Amor Verdadeiro', grau: 3 }, { texto: 'Equilíbrio Emocional', grau: 3 }, { texto: 'Luta em Dupla Sincronizada', grau: 3 }], frq: [{ texto: 'Medo de Perder Outro Amor', grau: 2 }] },
      { nome: 'Mestre de Armas', pod: [{ texto: 'Dupla Empunhadura Perfeita', grau: 4 }, { texto: 'Arremesso de Espadas Preciso', grau: 4 }, { texto: 'Cria Armas de Energia', grau: 3 }, { texto: 'Estilo de Luta Imprevisível', grau: 4 }], frq: [{ texto: 'Dependência das Espadas', grau: 2 }] },
      { nome: 'Herdeiro de Longshot', pod: [{ texto: 'Sorte Genética Latente', grau: 3 }, { texto: 'Carisma de Estrela de TV', grau: 2 }, { texto: 'Resistência a Controle Mental', grau: 3 }], frq: [{ texto: 'Identidade Questionada', grau: 2 }] }
    ]
  },
  'Rictor': {
    cards: [
      { nome: 'Ondas Sísmicas', pod: [0], frq: [{ texto: 'Poder Incontrolável na Juventude', grau: 2 }] },
      { nome: 'Peso do Legado', pod: [1], frq: [{ texto: 'Filho de Villão (Cabo)', grau: 2 }] },
      { nome: 'Mestre das Vibrações', pod: [{ texto: 'Controle Sísmico Preciso', grau: 4 }, { texto: 'Ondas de Choque Direcionadas', grau: 3 }, { texto: 'Detecção Sísmica', grau: 3 }, { texto: 'Desmorona Estruturas', grau: 4 }], frq: [{ texto: 'Poder Ligado a Emoções', grau: 2 }] },
      { nome: 'Ex-Membro da X-Force', pod: [{ texto: 'Táticas de Guerrilha', grau: 3 }, { texto: 'Liderança de Campo', grau: 3 }], frq: [{ texto: 'Culpa por Ações Passadas', grau: 2 }] },
      { nome: 'Parceiro de Shatterstar', pod: [{ texto: 'Primeiro Relacionamento Gay nos Quadrinhos', grau: 3 }, { texto: 'Apoio Emocional Mútuo', grau: 3 }, { texto: 'Combate Sincronizado', grau: 3 }], frq: [{ texto: 'Medo de Abandono', grau: 2 }] },
      { nome: 'Sísmica de Nível Ômega', pod: [{ texto: 'Gera Terremotos Artificiais', grau: 5 }, { texto: 'Manipula Placas Tectônicas', grau: 4 }, { texto: 'Cria Vulcões Instantâneos', grau: 4 }, { texto: 'Sente Vibrações Globais', grau: 3 }], frq: [{ texto: 'Exaustão Física Extrema', grau: 3 }, { texto: 'Risco de Destruição em Massa', grau: 3 }] }
    ]
  },
  'Siryn': {
    cards: [
      { nome: 'Grito Sônico', pod: [0, 1], frq: [] },
      { nome: 'Voo Sônico', pod: [{ texto: 'Voo via Ondas Sonoras', grau: 4 }, { texto: 'Escudo Sônico', grau: 3 }, { texto: 'Grito Desorientador', grau: 3 }], frq: [] },
      { nome: 'Detetive Sobre-humana', pod: [2], frq: [{ texto: 'Vício em Bebida', grau: 2 }] },
      { nome: 'Filha do Banshee', pod: [{ texto: 'Herança Mutante Irlandesa', grau: 3 }, { texto: 'Luto pelo Pai', grau: 2 }, { texto: 'Mentora da Nova Geração', grau: 3 }], frq: [{ texto: 'Sombra do Legado do Pai', grau: 2 }] },
      { nome: 'Mestra do Som', pod: [{ texto: 'Imita Qualquer Voz', grau: 4 }, { texto: 'Cria Ilusões Sonoras', grau: 4 }, { texto: 'Ressonância Destrutiva', grau: 4 }, { texto: 'Cura por Vibração', grau: 3 }, { texto: 'Comunicação Subaquática', grau: 3 }], frq: [{ texto: 'Garganta Sensível', grau: 2 }, { texto: 'Exaustão Vocal', grau: 2 }] },
      { nome: 'Líder da X-Force', pod: [{ texto: 'Táticas de Infiltração', grau: 3 }, { texto: 'Comando de Campo', grau: 3 }, { texto: 'Lealdade à Equipe', grau: 3 }], frq: [{ texto: 'Pressão de Liderança', grau: 2 }, { texto: 'Medo de Falhar como Pai', grau: 2 }] }
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
      { nome: 'Controle de Ferro no Sangue', pod: [{ texto: 'Manipula Hemoglobina', grau: 5 }, { texto: 'Induz AVC ou Parada Cardíaca', grau: 4 }, { texto: 'Extrai Adamantium do Esqueleto', grau: 5 }], frq: [{ texto: 'Exige Concentração Absoluta', grau: 3 }] },
      { nome: 'Campo de Força Planetário', pod: [{ texto: 'Escudo Magnético Global', grau: 5 }, { texto: 'Voo Orbital por Levitação', grau: 4 }, { texto: 'Bloqueia Telepatia com Capacete', grau: 4 }], frq: [] },
      { nome: 'Nunca Mais', pod: [3, 4], frq: [{ texto: 'Trauma do Holocausto', grau: 4 }] },
      { nome: 'Poderes em Declínio', pod: [5], frq: [{ texto: 'Poderes se Apagando com a Idade', grau: 3 }] },
      { nome: 'Causa Mutante', pod: [{ texto: 'Visão de Supremacia Mutante', grau: 4 }, { texto: 'Carisma Revolucionário', grau: 4 }, { texto: 'Anti-Vilão a Anti-Herói', grau: 3 }], frq: [{ texto: 'Extremismo Cega', grau: 3 }, { texto: 'Família Estilhaçada', grau: 2 }] },
      { nome: 'Pai de Polaris e Wanda', pod: [{ texto: 'Lorna Dane Herda Magnetismo', grau: 3 }, { texto: 'Wanda Maximoff Caos Mágico', grau: 3 }, { texto: 'Pietro Velocidade Herdada', grau: 2 }], frq: [{ texto: 'Filhos o Odiando', grau: 3 }, { texto: 'Nunca Foi Pai Presente', grau: 2 }] }
    ]
  },
  'Mystique': {
    cards: [
      { nome: 'Metamorfa Centenária', pod: [0, 1, 3], frq: [] },
      { nome: 'Mãe de Segredos', pod: [2], frq: [{ texto: 'Abandonou Noturno ao Nascer', grau: 3 }] },
      { nome: 'Cúmplice do Destino', pod: [{ texto: 'Rede de Espionagem Global', grau: 4 }, { texto: 'Manipuladora Genial', grau: 3 }, { texto: 'Casada com Destiny (Irene Adler)', grau: 3 }], frq: [{ texto: 'Lealdade apenas a Si e Destiny', grau: 3 }] },
      { nome: 'Mestra do Disfarce', pod: [{ texto: 'Mimetiza Voz e Maneirismos', grau: 5 }, { texto: 'Altera Impressões Digitais', grau: 4 }, { texto: 'Engana Sensores Biométricos', grau: 4 }, { texto: 'Disfarça Cheiro e Feromônios', grau: 3 }], frq: [{ texto: 'Massa Corporal Constante', grau: 2 }, { texto: 'Não Copia Poderes Mutantes', grau: 3 }] },
      { nome: 'Mãe de Rogue', pod: [{ texto: 'Criou Filha Adotiva', grau: 3 }, { texto: 'Manipulou Rogue por Anos', grau: 4 }], frq: [{ texto: 'Culpa Materna Recalcada', grau: 2 }, { texto: 'Destiny Previu Traição', grau: 2 }] }
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
      { nome: 'Obsessão Summers-Grey', pod: [5], frq: [{ texto: 'Obsessão pela Linhagem Summers', grau: 4 }, { texto: 'Narcisismo e Dramalhão', grau: 2 }] },
      { nome: 'Diamante na Pele', pod: [{ texto: 'Corpo de Diamante Sintético', grau: 4 }, { texto: 'Imune a Telepatia', grau: 4 }, { texto: 'Força Sobre-humana', grau: 3 }], frq: [{ texto: 'Vulnerável a Frequências Sônicas', grau: 2 }] },
      { nome: 'Rede de Clones Marauders', pod: [{ texto: 'Clones de Si Mesmo', grau: 4 }, { texto: 'Clones de Mutantes Poderosos', grau: 4 }, { texto: 'Transferência de Consciência', grau: 5 }], frq: [{ texto: 'Cada Clone Tem Vontade Própria', grau: 3 }] },
      { nome: 'Cronista Genético', pod: [{ texto: 'Arquivo Genético Completo', grau: 4 }, { texto: 'Previu Chegada de Mutantes Ômega', grau: 3 }, { texto: 'Manipulou Linhagem Summers por Gerações', grau: 4 }], frq: [{ texto: 'Arrogância Intelectual', grau: 2 }] }
    ]
  },
  'Apocalipse': {
    cards: [
      { nome: 'Primeiro Mutante', pod: [0, 1, 2], frq: [] },
      { nome: 'Manipulação Molecular Total', pod: [{ texto: 'Altera Próprio Corpo a Nível Atômico', grau: 5 }, { texto: 'Aumenta Tamanho e Massa', grau: 4 }, { texto: 'Cria Armas do Próprio Corpo', grau: 4 }, { texto: 'Regeneração Instantânea', grau: 5 }], frq: [] },
      { nome: 'Tecnologia Celestial', pod: [{ texto: 'Armadura Celestial Indestrutível', grau: 5 }, { texto: 'Teletransporte Interestelar', grau: 4 }, { texto: 'Acesso a Conhecimento Cósmico', grau: 4 }], frq: [{ texto: 'Dependente da Nave Celestial', grau: 2 }] },
      { nome: 'Sobrevivência do Mais Forte', pod: [3, 4], frq: [] },
      { nome: 'Pai dos Cavaleiros', pod: [5], frq: [{ texto: 'Visão Distorcida de Evolução', grau: 3 }] },
      { nome: 'Os Quatro Cavaleiros', pod: [{ texto: 'Pestilência (Fome)', grau: 4 }, { texto: 'Guerra (Conflito)', grau: 4 }, { texto: 'Fome (Escassez)', grau: 4 }, { texto: 'Morte (Fim)', grau: 4 }, { texto: 'Apocalipse os Empodera', grau: 5 }], frq: [{ texto: 'Cavaleiros Podem Traí-lo', grau: 3 }] },
      { nome: 'Imortalidade Real', pod: [{ texto: 'Viveu Milênios', grau: 5 }, { texto: 'Transfere Consciência', grau: 4 }, { texto: 'Hibernação por Séculos', grau: 3 }], frq: [{ texto: 'Acorda Apenas para Julgar', grau: 2 }] }
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
  },

  // ── alto (DB-only, no markdown) ──
  'Estrela Polar': {
    cards: [
      { nome: 'Velocista Supersónico', pod: [{ texto: 'Velocidade Supersónica', grau: 5 }, { texto: 'Voo e Reflexos Sobre-Humanos', grau: 4 }], frq: [] },
      { nome: 'Herança da Alfa Flight', pod: [{ texto: 'Gêmeo de Aurora', grau: 3 }, { texto: 'Ex-membro da Alfa Flight', grau: 3 }], frq: [{ texto: 'Orgulho Francês-Canadense', grau: 2 }] }
    ]
  },
  'Foxx': {
    cards: [
      { nome: 'Mística Infiltrada', pod: [{ texto: 'Metamorfismo Perfeito (Mística)', grau: 6 }, { texto: 'Imita Voz, Rosto e Impressões Digitais', grau: 5 }, { texto: 'Disfarce Indetectável', grau: 4 }, { texto: 'Mímica de Aparência e Gênero', grau: 4 }, { texto: 'Regeneração Lenta', grau: 3 }], frq: [] },
      { nome: 'Espiã Sedutora', pod: [{ texto: 'Espionagem e Sedução de Elite', grau: 5 }, { texto: 'Provocação e Manipulação Constantes', grau: 4 }, { texto: 'Leitura Fria de Pessoas', grau: 3 }, { texto: 'Rede de Contatos no Submundo', grau: 3 }], frq: [] },
      { nome: 'Veterana da Irmandade', pod: [{ texto: 'Séculos de Experiência em Combate', grau: 4 }, { texto: 'Marcialista e Assassina Letal', grau: 4 }, { texto: 'Sabotagem e Infiltração', grau: 3 }, { texto: 'Nervos de Aço', grau: 2 }], frq: [] },
      { nome: 'Agente Duplo', pod: [{ texto: 'Testa os Limites de Gambit', grau: 3 }, { texto: 'Infiltrada entre os Alunos', grau: 3 }], frq: [{ texto: 'Identidade Oculta', grau: 3 }] },
      { nome: 'Lealdade Incerta', pod: [], frq: [{ texto: 'Agenda Secreta Própria', grau: 4 }, { texto: 'Lealdade Questionável', grau: 4 }, { texto: 'Frieza que Afasta Vínculos', grau: 3 }, { texto: 'Manipuladora por Instinto', grau: 2 }] }
    ]
  },
  'Loa': {
    cards: [
      { nome: 'Toque Dissipador', pod: [{ texto: 'Fase Através da Matéria Sólida', grau: 5 }, { texto: 'Desintegração por Contato', grau: 5 }, { texto: 'Rastros de Decomposição', grau: 4 }, { texto: 'Intangibilidade Defensiva', grau: 4 }, { texto: 'Ataque que Ignora Armaduras', grau: 3 }], frq: [] },
      { nome: 'Alma Havaiana', pod: [{ texto: 'Espírito Livre e Praiano', grau: 4 }, { texto: 'Misticismo das Ilhas', grau: 3 }, { texto: 'Otimismo Contagiante', grau: 3 }], frq: [] },
      { nome: 'Provação Vampírica', pod: [{ texto: 'Sobreviveu à Mordida de um Vampiro', grau: 3 }, { texto: 'Amizade com Anole e Match', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Deslize Perigoso', pod: [], frq: [{ texto: 'Poder Destrutivo que a Assusta', grau: 3 }, { texto: 'Medo de Machucar Quem Ama', grau: 3 }, { texto: 'Controle Instável sob Emoção', grau: 2 }, { texto: 'Inexperiente em Batalha', grau: 2 }] },
      { nome: 'Sonhadora', pod: [{ texto: 'Curiosidade Insaciável', grau: 3 }, { texto: 'Lealdade aos Corsários', grau: 2 }], frq: [{ texto: 'Distrai-se Facilmente', grau: 2 }, { texto: 'Adolescente Impulsiva', grau: 2 }] }
    ]
  },
  'Morbius': {
    cards: [
      { nome: 'Vampiro Genial', pod: [{ texto: 'Gênio em Bioquímica e Hematologia', grau: 5 }, { texto: 'Voo Sobre-Humano', grau: 4 }, { texto: 'Fator de Cura Acelerado', grau: 4 }], frq: [{ texto: 'Sede Incontrolável por Sangue', grau: 4 }, { texto: 'Aversão à Luz Solar', grau: 3 }] },
      { nome: 'Médico Monstruoso', pod: [{ texto: 'Hipnose e Controle Mental', grau: 4 }, { texto: 'Garras e Presas Retráteis', grau: 4 }, { texto: 'Mordida Transforma Vítimas em Vampiros', grau: 5 }], frq: [{ texto: 'Ausência de Alma (confirmada por Doutor Estranho)', grau: 5 }] },
      { nome: 'Morgan Michaels', pod: [{ texto: 'Soro de Sangue Irradiado (transformação temporária em humano)', grau: 3 }, { texto: 'Identidade Falsa (Morgan Michaels)', grau: 3 }], frq: [{ texto: 'Sangue Lilin Corruptor (pode perder o controle)', grau: 3 }] }
    ]
  },
  'Três‑em‑Uma (Stepford Cuckoos)': {
    cards: [
      { nome: 'Mente de Colmeia', pod: [{ texto: 'Mente de Colmeia Telepática', grau: 6 }, { texto: 'Telepatia de Nível Ômega em Conjunto', grau: 5 }, { texto: 'Ilusões e Ataques Psíquicos', grau: 4 }, { texto: 'Controle Mental Coordenado', grau: 4 }, { texto: 'Leitura Simultânea de Muitas Mentes', grau: 3 }], frq: [] },
      { nome: 'Diamante Herdado', pod: [{ texto: 'Forma de Diamante (como Emma)', grau: 4 }, { texto: 'Elegância Fria e Calculista', grau: 3 }, { texto: 'Filhas/Clones de Emma Frost', grau: 3 }], frq: [] },
      { nome: 'Trio Inseparável', pod: [{ texto: 'Completam as Frases umas das Outras', grau: 3 }, { texto: 'Falam como uma Só Voz', grau: 3 }, { texto: 'Alunas de Elite do Instituto', grau: 2 }], frq: [] },
      { nome: 'Luto e Fragmentos', pod: [], frq: [{ texto: 'Luto pelas Irmãs Perdidas (Sophie e Esme)', grau: 4 }, { texto: 'Arrogância que Afasta', grau: 3 }, { texto: 'Elo Enfraquece se Separadas', grau: 3 }, { texto: 'Frieza Emocional', grau: 2 }] }
    ]
  },

  // ── medio (DB-only, no markdown) ──
  'Anole': {
    cards: [
      { nome: 'Lagarto Adaptável', pod: [{ texto: 'Camuflagem Cromática', grau: 4 }, { texto: 'Língua Preênsil Extensível', grau: 4 }, { texto: 'Garras e Aderência a Superfícies', grau: 4 }, { texto: 'Regeneração de Membros', grau: 3 }, { texto: 'Agilidade Réptil', grau: 3 }], frq: [] },
      { nome: 'Orgulho de Victor', pod: [{ texto: 'Assumidamente Gay e Confiante', grau: 3 }, { texto: 'Sarcasmo como Escudo', grau: 3 }, { texto: 'Ídolo dos Alunos Marginalizados', grau: 2 }], frq: [] },
      { nome: 'Irmão de Armas', pod: [{ texto: 'Melhor Amigo de Rockslide', grau: 3 }, { texto: 'Lealdade Feroz à Equipe', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Peso do Sobrevivente', pod: [], frq: [{ texto: 'Culpa de Sobrevivente (Genosha)', grau: 3 }, { texto: 'Aparência Monstruosa Julgada', grau: 2 }, { texto: 'Impulsividade Adolescente', grau: 2 }, { texto: 'Inexperiente em Combate Real', grau: 2 }] }
    ]
  },
  'Bling!': {
    cards: [
      { nome: 'Pele de Diamante', pod: [{ texto: 'Esqueleto de Diamante Semi-Orgânico', grau: 5 }, { texto: 'Arremessa Projéteis de Diamante', grau: 4 }, { texto: 'Resistência Excepcional a Dano', grau: 4 }, { texto: 'Corte Afiado no Combate', grau: 3 }], frq: [] },
      { nome: 'Brilho Próprio', pod: [{ texto: 'Autoconfiança Deslumbrante', grau: 4 }, { texto: 'Assumidamente Lésbica e Estilosa', grau: 3 }, { texto: 'Presença de Estrela', grau: 2 }], frq: [] },
      { nome: 'Filha de Astros', pod: [{ texto: 'Herança de Família Musical', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Fachada Reluzente', pod: [], frq: [{ texto: 'Vaidade Exagerada', grau: 3 }, { texto: 'Esconde Medos sob o Estilo', grau: 2 }, { texto: 'Provoca Rivalidades', grau: 2 }, { texto: 'Novata em Missões Reais', grau: 2 }] }
    ]
  },
  'Boggart': {
    cards: [
      { nome: 'Pesadelo Vivo', pod: [{ texto: 'Metamorfose Aterrorizante', grau: 4 }, { texto: 'Assume a Forma do Medo do Alvo', grau: 4 }, { texto: 'Intimidação Psicológica', grau: 3 }, { texto: 'Aparência Naturalmente Sinistra', grau: 2 }], frq: [] },
      { nome: 'Comediante Sombrio', pod: [{ texto: 'Humor Negro e Brincalhão', grau: 3 }, { texto: 'Leal aos Amigos Ferozmente', grau: 3 }, { texto: 'Alívio Cômico da Equipe', grau: 2 }], frq: [] },
      { nome: 'Incompreendido', pod: [{ texto: 'Coração Gentil sob a Máscara', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Rosto que Assusta', pod: [], frq: [{ texto: 'Aspecto Assustador Permanente', grau: 3 }, { texto: 'Rejeitado por Estranhos', grau: 3 }, { texto: 'Insegurança com a Aparência', grau: 2 }, { texto: 'Inexperiente em Combate', grau: 2 }] }
    ]
  },
  'Dríade': {
    cards: [
      { nome: 'Voz da Floresta', pod: [{ texto: 'Comunhão e Manipulação da Flora', grau: 5 }, { texto: 'Fala com as Plantas', grau: 4 }, { texto: 'Cresce Vegetação Instantânea', grau: 3 }, { texto: 'Enredamento por Raízes e Cipós', grau: 3 }], frq: [] },
      { nome: 'Raiz Profunda', pod: [{ texto: 'Serenidade de Floresta Antiga', grau: 3 }, { texto: 'Ligação Espiritual com a Natureza', grau: 3 }], frq: [] },
      { nome: 'Guardiã Verde', pod: [{ texto: 'Cuidado com os Vulneráveis', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Teimosia de Carvalho', pod: [], frq: [{ texto: 'Teimosa e Imóvel quando Provocada', grau: 3 }, { texto: 'Torna-se Espinhosa sob Estresse', grau: 2 }, { texto: 'Depende de Ambiente com Vida', grau: 2 }, { texto: 'Novata em Combate', grau: 2 }] }
    ]
  },
  'Dust (Poeira)': {
    cards: [
      { nome: 'Tempestade de Areia', pod: [{ texto: 'Transforma-se em Nuvem de Areia Abrasiva', grau: 5 }, { texto: 'Controle de Partículas Finas', grau: 4 }, { texto: 'Esfola Inimigos como Lixa', grau: 4 }, { texto: 'Forma Intangível Evasiva', grau: 3 }], frq: [] },
      { nome: 'Fé Inabalável', pod: [{ texto: 'Muçulmana Devota (usa niqab)', grau: 4 }, { texto: 'Determinação Silenciosa', grau: 4 }, { texto: 'Modéstia de Princípio', grau: 3 }], frq: [] },
      { nome: 'Longe de Casa', pod: [{ texto: 'Refugiada do Afeganistão', grau: 3 }, { texto: 'Amizade Leal com Mercúrio', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Reserva', pod: [], frq: [{ texto: 'Timidez e Reserva', grau: 3 }, { texto: 'Trauma de Cativeiro no Passado', grau: 2 }, { texto: 'Estranheza Cultural a Isola', grau: 2 }, { texto: 'Inexperiente em Combate', grau: 2 }] }
    ]
  },
  'Espectro': {
    cards: [
      { nome: 'Fantasma Andante', pod: [{ texto: 'Intangibilidade', grau: 5 }, { texto: 'Invisibilidade Parcial', grau: 4 }, { texto: 'Atravessa Paredes', grau: 4 }, { texto: 'Evasão e Fuga', grau: 3 }], frq: [] },
      { nome: 'Alma Distante', pod: [{ texto: 'Humor Seco e Sussurrado', grau: 3 }, { texto: 'Observador Perspicaz', grau: 2 }], frq: [] },
      { nome: 'Aparece na Hora Certa', pod: [{ texto: 'Surge do Nada quando a Equipe Precisa', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Fuga Constante', pod: [], frq: [{ texto: 'Foge dos Conflitos', grau: 3 }, { texto: 'Introversão e Melancolia', grau: 3 }, { texto: 'Distante e Esquivo', grau: 2 }, { texto: 'Evita Compromisso', grau: 2 }] }
    ]
  },
  'Espinho': {
    cards: [
      { nome: 'Chuva de Espinhos', pod: [{ texto: 'Projeta Espinhos pelo Corpo', grau: 5 }, { texto: 'Defesa e Ataque à Distância', grau: 4 }, { texto: 'Manto Perfurante', grau: 3 }, { texto: 'Cobertura de Supressão', grau: 3 }], frq: [] },
      { nome: 'Casca Defensiva', pod: [{ texto: 'Lealdade Extrema aos Próximos', grau: 2 }, { texto: 'Coragem Silenciosa', grau: 2 }], frq: [{ texto: 'Personalidade Eriçada e Reclusa', grau: 3 }] },
      { nome: 'Desejo de Pertencer', pod: [{ texto: 'Anseia por Aceitação', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Muros Internos', pod: [], frq: [{ texto: 'Fecha-se num Casulo de Desconfiança', grau: 3 }, { texto: 'Dificuldade de Fazer Amigos', grau: 2 }, { texto: 'Autoimagem Negativa', grau: 2 }] }
    ]
  },
  'Garoto Chuva': {
    cards: [
      { nome: 'Corpo de Água', pod: [{ texto: 'Fisiologia Aquática', grau: 4 }, { texto: 'Provoca Chuva Localizada', grau: 4 }, { texto: 'Fluidez que Absorve Golpes', grau: 3 }, { texto: 'Controle da Umidade', grau: 3 }], frq: [] },
      { nome: 'Céu Nublado', pod: [{ texto: 'Sensibilidade Emocional Profunda', grau: 3 }, { texto: 'Doçura Melancólica', grau: 2 }], frq: [] },
      { nome: 'Alma Sensível', pod: [{ texto: 'Aluno do Instituto Xavier', grau: 2 }, { texto: 'Bondade Genuína', grau: 2 }], frq: [] },
      { nome: 'Tempestade Interior', pod: [], frq: [{ texto: 'Chove Quando Fica Triste', grau: 3 }, { texto: 'Melancolia que Afasta', grau: 3 }, { texto: 'Frágil a Rejeições', grau: 2 }, { texto: 'Novato Inseguro', grau: 2 }] }
    ]
  },
  'Indra': {
    cards: [
      { nome: 'Escudo Vivo', pod: [{ texto: 'Armadura Retrátil de Placas', grau: 4 }, { texto: 'Escudos Corporais Defensivos', grau: 4 }, { texto: 'Resistência a Impactos', grau: 3 }, { texto: 'Ancoragem Inabalável', grau: 2 }], frq: [] },
      { nome: 'Herança Jainista', pod: [{ texto: 'Fé Hindu-Jainista Devota', grau: 4 }, { texto: 'Pacifismo de Princípio', grau: 4 }, { texto: 'Educação Rígida da Família', grau: 3 }], frq: [] },
      { nome: 'Jovem entre Dois Mundos', pod: [{ texto: 'Senso de Dever', grau: 3 }, { texto: 'Cortesia e Diplomacia', grau: 3 }, { texto: 'Adolescente Mutante (14-16)', grau: 1 }], frq: [] },
      { nome: 'Relutância do Guerreiro', pod: [], frq: [{ texto: 'Hesita em Usar Força Ofensiva', grau: 3 }, { texto: 'Medo de Desonrar a Família', grau: 3 }, { texto: 'Casamento Arranjado o Pressiona', grau: 2 }, { texto: 'Novato sob Pressão', grau: 2 }] }
    ]
  },
  'Kidogo': {
    cards: [
      { nome: 'Gigante e Formiga', pod: [{ texto: 'Alteração de Tamanho (formiga a gigante)', grau: 5 }, { texto: 'Força Proporcional ao Tamanho', grau: 4 }, { texto: 'Resistência Colossal quando Grande', grau: 4 }, { texto: 'Furtividade quando Minúsculo', grau: 3 }], frq: [] },
      { nome: 'Coração Humilde', pod: [{ texto: 'Humildade Genuína', grau: 3 }, { texto: 'Humor Contagiante', grau: 3 }, { texto: 'Faz Todos se Sentirem Bem', grau: 2 }], frq: [] },
      { nome: 'Raízes Africanas', pod: [{ texto: 'Orgulho da Origem Suaíli', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Sombra da Própria Grandeza', pod: [], frq: [{ texto: 'Subestima o Próprio Poder', grau: 3 }, { texto: 'Autodepreciação Constante', grau: 2 }, { texto: 'Timidez em Assumir Liderança', grau: 2 }, { texto: 'Adolescente Inseguro', grau: 2 }] }
    ]
  },
  'Mira (Pinpoint)': {
    cards: [
      { nome: 'Precisão Absoluta', pod: [{ texto: 'Localiza Assinaturas Energéticas', grau: 5 }, { texto: 'Identifica Pontos Fracos', grau: 4 }, { texto: 'Nunca se Perde (literalmente)', grau: 3 }, { texto: 'Percepção Tática Aguçada', grau: 3 }], frq: [] },
      { nome: 'Mente Metódica', pod: [{ texto: 'Raciocínio Analítico e Frio', grau: 4 }, { texto: 'Memória Espacial Perfeita', grau: 3 }, { texto: 'Estrategista de Reconhecimento', grau: 3 }], frq: [] },
      { nome: 'Valor de Batedora', pod: [{ texto: 'Indispensável em Missões', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Excesso de Confiança', pod: [], frq: [{ texto: 'Arrogância pela Precisão', grau: 3 }, { texto: 'Impaciência com os Menos Exatos', grau: 2 }, { texto: 'Frágil em Combate Corpo a Corpo', grau: 2 }, { texto: 'Inexperiente sob Fogo', grau: 2 }] }
    ]
  },
  'Moça de Borracha': {
    cards: [
      { nome: 'Corpo Elástico', pod: [{ texto: 'Elasticidade e Maleabilidade Total', grau: 5 }, { texto: 'Amortece Impactos', grau: 4 }, { texto: 'Estica-se a Grandes Distâncias', grau: 4 }, { texto: 'Molda-se a Qualquer Forma', grau: 3 }], frq: [] },
      { nome: 'Otimismo Blindado', pod: [{ texto: 'Humor Físico e Palhaçadas', grau: 4 }, { texto: 'Otimismo Inabalável', grau: 3 }, { texto: 'Usa o Riso como Armadura', grau: 3 }], frq: [] },
      { nome: 'Espírito de Equipe', pod: [{ texto: 'Adapta-se a Qualquer Situação', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Distração', pod: [], frq: [{ texto: 'Desajeitada e Distraída', grau: 3 }, { texto: 'Esconde Inseguranças no Humor', grau: 2 }, { texto: 'Leva Combate Pouco a Sério', grau: 2 }, { texto: 'Novata em Missões', grau: 2 }] }
    ]
  },
  'Náiade': {
    cards: [
      { nome: 'Senhora das Águas', pod: [{ texto: 'Hidrocinese em Estado Líquido', grau: 5 }, { texto: 'Manipula Grandes Volumes de Água', grau: 4 }, { texto: 'Purifica ou Contamina Água', grau: 3 }, { texto: 'Chicotes e Escudos de Água', grau: 3 }], frq: [] },
      { nome: 'Temperamento de Maré', pod: [{ texto: 'Personalidade Fluida e Serena', grau: 3 }, { texto: 'Adapta-se como a Corrente', grau: 3 }], frq: [] },
      { nome: 'Serenidade Aprendida', pod: [{ texto: 'Calma que Acalma os Outros', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Águas Turvas', pod: [], frq: [{ texto: 'Torna-se Turbulenta sob Pressão', grau: 3 }, { texto: 'Depende de Fonte de Água', grau: 3 }, { texto: 'Emoção Descontrola o Poder', grau: 2 }, { texto: 'Novata em Batalha', grau: 2 }] }
    ]
  },
  'Onyxx': {
    cards: [
      { nome: 'Tanque de Granito', pod: [{ texto: 'Corpo de Pedra Sólida', grau: 5 }, { texto: 'Superforça e Resistência', grau: 5 }, { texto: 'Muralha Viva em Combate', grau: 4 }, { texto: 'Investida Devastadora', grau: 3 }], frq: [] },
      { nome: 'Coração de Ouro', pod: [{ texto: 'Jeito Rapper e Fanfarrão', grau: 3 }, { texto: 'Protetor Secreto dos Mais Fracos', grau: 3 }, { texto: 'Presença Divertida', grau: 2 }], frq: [] },
      { nome: 'Grandalhão do Instituto', pod: [{ texto: 'Aluno do Instituto Xavier', grau: 2 }, { texto: 'Condicionamento Bruto', grau: 2 }], frq: [] },
      { nome: 'Peso da Pedra', pod: [], frq: [{ texto: 'Movimentos Lentos', grau: 3 }, { texto: 'Esconde a Bondade por Vergonha', grau: 2 }, { texto: 'Alvo por Ser Grande', grau: 2 }, { texto: 'Inexperiente em Tática', grau: 2 }] }
    ]
  },
  'Rede (Network)': {
    cards: [
      { nome: 'Rede Telepática', pod: [{ texto: 'Transmissão Telepática em Massa', grau: 5 }, { texto: 'Leitura de Pensamentos como Rede Social', grau: 4 }], frq: [] },
      { nome: 'Fofoca Digital', pod: [{ texto: 'Irreverência e Fofoca', grau: 3 }], frq: [{ texto: 'Maturidade em Crescimento', grau: 2 }, { texto: 'Pode Invadir a Privacidade Alheia', grau: 3 }] }
    ]
  },
  'Trovão': {
    cards: [
      { nome: 'Voz de Trovão', pod: [{ texto: 'Ondas de Choque Sônicas pela Voz', grau: 5 }, { texto: 'Gera Trovões e Vibrações', grau: 4 }, { texto: 'Ataque em Área Ensurdecedor', grau: 3 }], frq: [] },
      { nome: 'Alma Incandescente', pod: [{ texto: 'Espírito Brasileiro Contagiante', grau: 3 }, { texto: 'Paixão pelo Futebol e Samba', grau: 2 }, { texto: 'Energia que Anima a Equipe', grau: 2 }], frq: [] },
      { nome: 'Coração Grande', pod: [{ texto: 'Generosidade Calorosa', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Estouro', pod: [], frq: [{ texto: 'Temperamento Explosivo', grau: 3 }, { texto: 'Danos Acústicos Involuntários', grau: 3 }, { texto: 'Fala Mais Alto que Pensa', grau: 2 }, { texto: 'Novato Impulsivo', grau: 2 }] }
    ]
  },
  'Umbra': {
    cards: [
      { nome: 'Andarilha das Sombras', pod: [{ texto: 'Viagem e Manipulação de Sombras', grau: 5 }, { texto: 'Furtividade e Infiltração Absolutas', grau: 4 }, { texto: 'Ataques a partir da Penumbra', grau: 3 }, { texto: 'Camuflagem nas Trevas', grau: 3 }], frq: [] },
      { nome: 'Guardiã Silenciosa', pod: [{ texto: 'Protege em Silêncio', grau: 3 }, { texto: 'Observa Mais do que Age', grau: 3 }], frq: [] },
      { nome: 'Enigma', pod: [{ texto: 'Mistério que Intriga a Equipe', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Prisão de Trevas', pod: [], frq: [{ texto: 'Depende de Fontes de Sombra', grau: 3 }, { texto: 'Introversão Isolante', grau: 3 }, { texto: 'Dificuldade de Confiar', grau: 2 }, { texto: 'Pouca Prática de Combate', grau: 2 }] }
    ]
  },
  'Vic Slaughter': {
    cards: [
      { nome: 'Cria Vampírica', pod: [{ texto: 'Força e Velocidade Vampíricas Aprimoradas', grau: 4 }, { texto: 'Fator de Cura Moderado', grau: 3 }, { texto: 'Garras e Presas', grau: 3 }], frq: [{ texto: 'Sede de Sangue (menos controlada que Morbius)', grau: 4 }] },
      { nome: 'Corpo Distorcido', pod: [{ texto: 'Distorção Corporal (pode estender membros)', grau: 3 }], frq: [{ texto: 'Vulnerável a Luz Solar e Símbolos Sagrados', grau: 3 }] },
      { nome: 'Ex-Hardcase', pod: [{ texto: 'Ex-líder dos Hardcases', grau: 3 }], frq: [{ texto: 'Lealdade Forçada a Morbius', grau: 3 }] },
      { nome: 'Limitações Sombrias', pod: [], frq: [{ texto: 'Sem Habilidades Científicas', grau: 2 }] }
    ]
  },
  'Xenônio': {
    cards: [
      { nome: 'Gás Nobre', pod: [{ texto: 'Emissão de Gases e Energias Espectrais', grau: 4 }, { texto: 'Cria Ilusões Gasosas', grau: 4 }, { texto: 'Brilho Luminoso Desorientador', grau: 3 }, { texto: 'Forma Gasosa Evasiva', grau: 3 }], frq: [] },
      { nome: 'Inconstância Nobre', pod: [{ texto: 'Carisma Volátil e Cintilante', grau: 3 }, { texto: 'Criatividade Imprevisível', grau: 2 }], frq: [] },
      { nome: 'Presença Efêmera', pod: [{ texto: 'Surge e Some sem Aviso', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Instabilidade', pod: [], frq: [{ texto: 'Humor Volátil (brilha e apaga)', grau: 3 }, { texto: 'Dificuldade de se Fixar Física e Mentalmente', grau: 3 }, { texto: 'Pouca Constância em Treino', grau: 2 }, { texto: 'Inexperiente', grau: 2 }] }
    ]
  },

  // ── baixo (DB-only) ──
  'Flubber': {
    cards: [
      { nome: 'Geleia Viva', pod: [{ texto: 'Massa Gelatinosa e Elástica', grau: 4 }, { texto: 'Maleabilidade Extrema', grau: 3 }, { texto: 'Espreme-se por Qualquer Fresta', grau: 3 }], frq: [] },
      { nome: 'Alma Boba', pod: [{ texto: 'Entusiasmo Contagiante', grau: 4 }, { texto: 'Não Tem Um Osso Mau (literalmente)', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [] },
      { nome: 'Trapalhão', pod: [], frq: [{ texto: 'Desastre Desajeitado', grau: 3 }, { texto: 'Alvo Fácil e Frágil', grau: 3 }, { texto: 'Leva Pouco a Sério', grau: 2 }] }
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

// ── DB-only NPC meta (no markdown entry) ──
const DB_ONLY_META = {
  'Estrela Polar': { faction: 'x-men', danger: 'alto' },
  'Foxx': { faction: 'vilao', danger: 'alto' },
  'Loa': { faction: 'x-men', danger: 'alto' },
  'Morbius': { faction: 'vilao', danger: 'alto' },
  'Três‑em‑Uma (Stepford Cuckoos)': { faction: 'x-men', danger: 'alto' },
  'Anole': { faction: 'x-men', danger: 'medio' },
  'Bling!': { faction: 'x-men', danger: 'medio' },
  'Boggart': { faction: 'x-men', danger: 'medio' },
  'Dríade': { faction: 'x-men', danger: 'medio' },
  'Dust (Poeira)': { faction: 'x-men', danger: 'medio' },
  'Espectro': { faction: 'x-men', danger: 'medio' },
  'Espinho': { faction: 'x-men', danger: 'medio' },
  'Garoto Chuva': { faction: 'novatos', danger: 'medio' },
  'Indra': { faction: 'x-men', danger: 'medio' },
  'Kidogo': { faction: 'x-men', danger: 'medio' },
  'Mira (Pinpoint)': { faction: 'x-men', danger: 'medio' },
  'Moça de Borracha': { faction: 'x-men', danger: 'medio' },
  'Náiade': { faction: 'x-men', danger: 'medio' },
  'Onyxx': { faction: 'x-men', danger: 'medio' },
  'Rede (Network)': { faction: 'x-men', danger: 'medio' },
  'Trovão': { faction: 'x-men', danger: 'medio' },
  'Umbra': { faction: 'x-men', danger: 'medio' },
  'Vic Slaughter': { faction: 'vilao', danger: 'medio' },
  'Xenônio': { faction: 'x-men', danger: 'medio' },
  'Flubber': { faction: 'x-men', danger: 'baixo' },
};

// ── Review tracking for auto-generated tags ──
// Populated by generateSQL; used by --dump-review and --apply-review
const REVIEW_DATA = {};

// ── SQL GENERATION ──
const MIN_PER_DANGER = {
  baixo:   { cards: 2, tags:  8, fraquezas: 3 },
  medio:   { cards: 4, tags: 15, fraquezas: 4 },
  alto:    { cards: 5, tags: 20, fraquezas: 4 },
  extremo: { cards: 6, tags: 25, fraquezas: 5 },
};

function generateSQL(npcs, applyReview = null) {
  if (applyReview) console.error(`[review] apply-review ativo para ${Object.keys(applyReview).length} NPC(s)`);
  let sql = `-- ═══════════════════════════════════════════════════════════════\n`;
  sql += `-- Migração 004 — Theme cards enriquecidos para TODOS os NPCs originais\n`;
  sql += `-- Gerado por scripts/gen-enrich-temas.js\n`;
  sql += `-- Substitui data.temas dos 133 NPCs do cerebro_rebalanceado.md\n`;
  sql += `-- NÃO toca em characters. Idempotente.\n`;
  sql += `-- ═══════════════════════════════════════════════════════════════\n\nBEGIN;\n\n`;
  const review = {}; // tracks auto-generated tags per NPC for this run

  let count = 0, autoFilled = 0;
  for (const npc of npcs) {
    const spec = SPEC[npc.name];
    if (!spec) {
      console.warn(`  ⚠ Sem SPEC para: ${npc.name}`);
      continue;
    }

    const parsedTags = npc.tagLines.map(parseTag);
    const tagMap = {};
    parsedTags.forEach((t, i) => { tagMap[i] = { texto: t.texto, grau: Math.abs(t.grau) }; });

    const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const hasText = (arr, txt) => arr.some(ct => norm(ct.texto) === norm(txt));

    // ── 1. Build SPEC-defined cards ──
    const temas = spec.cards.map(card => ({
      nome: card.nome,
      poder: resolveTags(card.pod || [], tagMap),
      fraqueza: resolveTags(card.frq || [], tagMap)
    }));

    const min = MIN_PER_DANGER[npc.danger] || MIN_PER_DANGER.medio;

    // ── 2. Collect all tag texts used in cards ──
    const usedTexts = new Set();
    for (const tm of temas) {
      for (const t of tm.poder) usedTexts.add(norm(t.texto));
      for (const t of tm.fraqueza) usedTexts.add(norm(t.texto));
    }

    // ── 3. Collect unused source tags (positive = poder, negative = fraqueza) ──
    const unusedPoder = [];
    const unusedFraqueza = [];
    for (const pt of parsedTags) {
      if (usedTexts.has(norm(pt.texto))) continue;
      if (pt.grau > 0) unusedPoder.push({ texto: pt.texto });
      else unusedFraqueza.push({ texto: pt.texto });
    }

    // ── Generic pools for auto-fill (broadly applicable) ──
    const genericPoder = [
      { texto: 'Treinamento de Combate' },
      { texto: 'Instinto de Sobrevivência' },
      { texto: 'Resiliência Física e Mental' },
      { texto: 'Perícia em Campo' },
      { texto: 'Habilidade de Luta' },
      { texto: 'Determinação Inabalável' },
      { texto: 'Reflexos Aguçados' },
      { texto: 'Tática e Estratégia' },
      { texto: 'Intuição de Batalha' },
      { texto: 'Resistência a Dano' },
      { texto: 'Movimentação Tática' },
      { texto: 'Vigilância Constante' },
      { texto: 'Vontade de Ferro' },
      { texto: 'Exploração de Ambiente' },
      { texto: 'Liderança em Campo' },
    ];
    const genericFraqueza = [
      { texto: 'Passado que Assombra' },
      { texto: 'Conflitos Internos' },
      { texto: 'Impulsividade' },
      { texto: 'Dificuldade de Confiar nos Outros' },
      { texto: 'Culpa e Arrependimento' },
      { texto: 'Limitações Humanas' },
      { texto: 'Fama que Atrapalha' },
      { texto: 'Responsabilidade que Pesa' },
      { texto: 'Trauma não Resolvido' },
      { texto: 'Insegurança Constante' },
      { texto: 'Dívida com o Passado' },
      { texto: 'Lealdade Dividida' },
    ];

    // ── 4. Fill missing cards until min.cards is met ──
    const FALLBACK_CARD_NAMES = [
      'Classe Ômega', 'Potencial Oculto', 'Treinamento Avançado',
      'Experiência de Combate', 'Resistência Mental', 'Instinto Selvagem',
    ];
    const MAX_AUTO_CARDS = 6;
    const specCardCount = spec.cards.length;
    let fillIdx = 1;
    let fillStall = 0;
    while (temas.length < min.cards && fillIdx <= MAX_AUTO_CARDS) {
      if (fillStall > 3) break;
      fillStall++;
      const card = { nome: FALLBACK_CARD_NAMES[(fillIdx - 1) % FALLBACK_CARD_NAMES.length], poder: [], fraqueza: [] };
      let added = 0;
      for (let i = 0; i < 3; i++) {
        const p = unusedPoder.shift() || genericPoder[(temas.length * 3 + i) % genericPoder.length];
        if (usedTexts.has(norm(p.texto))) continue;
        card.poder.push({ texto: p.texto });
        usedTexts.add(norm(p.texto));
        added++;
        if (!review[npc.name]) review[npc.name] = [];
        review[npc.name].push({ card: card.nome, tipo: 'poder', texto: p.texto });
      }
      for (let i = 0; i < 2; i++) {
        const f = unusedFraqueza.shift() || genericFraqueza[(temas.length * 2 + i) % genericFraqueza.length];
        if (usedTexts.has(norm(f.texto))) continue;
        card.fraqueza.push({ texto: f.texto });
        usedTexts.add(norm(f.texto));
        added++;
        if (!review[npc.name]) review[npc.name] = [];
        review[npc.name].push({ card: card.nome, tipo: 'fraqueza', texto: f.texto });
      }
      if (!added) break;
      temas.push(card);
      fillIdx++;
      autoFilled++;
    }

    // ── 4.5. Fill card-level tags to minimum ──
    let totalCardTags = temas.reduce((s, tm) => s + tm.poder.length + tm.fraqueza.length, 0);
    let ctSafety = 0;
    while (totalCardTags < min.tags && ctSafety < 20) {
      ctSafety++;
      for (const tm of temas) {
        if (totalCardTags >= min.tags) break;
        if (tm.poder.length >= 3) continue;
        const p = unusedPoder.shift() || genericPoder[(tm.nome.length + totalCardTags) % genericPoder.length];
        if (usedTexts.has(norm(p.texto))) continue;
        tm.poder.push({ texto: p.texto });
        usedTexts.add(norm(p.texto));
        totalCardTags++;
        if (!review[npc.name]) review[npc.name] = [];
        review[npc.name].push({ card: tm.nome, tipo: 'poder', texto: p.texto });
      }
    }

    // ── 5. Ensure every card has pelo menos 1 poder ──
    for (const tm of temas) {
      if (tm.fraqueza.length && !tm.poder.length) {
        const fallback = unusedPoder.shift() || genericPoder[tm.nome.length % genericPoder.length];
        tm.poder.push({ texto: fallback.texto });
        usedTexts.add(norm(fallback.texto));
      }
    }

    // ── 6. Ensure minimum total fraquezas ──
    let totalFrq = temas.reduce((s, tm) => s + tm.fraqueza.length, 0);
    for (const tm of temas) {
      if (totalFrq >= min.fraquezas) break;
      let frqStall = 0;
      while (tm.fraqueza.length < 2 && totalFrq < min.fraquezas) {
        if (frqStall > 16) break;
        frqStall++;
        const f = unusedFraqueza.shift() || genericFraqueza[(tm.nome.length + totalFrq + frqStall) % genericFraqueza.length];
        if (usedTexts.has(norm(f.texto))) continue;
        tm.fraqueza.push({ texto: f.texto });
        usedTexts.add(norm(f.texto));
        totalFrq++;
        if (!review[npc.name]) review[npc.name] = [];
        review[npc.name].push({ card: tm.nome, tipo: 'fraqueza', texto: f.texto });
      }
    }

    // ── Apply review replacements ──
    if (applyReview && applyReview[npc.name]) {
      for (const entry of applyReview[npc.name]) {
        if (!entry.novo_texto) continue;
        for (const tm of temas) {
          if (entry.card && entry.card !== tm.nome) continue;
          const arr = entry.tipo === 'fraqueza' ? tm.fraqueza : tm.poder;
          for (const t of arr) {
            if (t.texto === entry.texto) {
              t.texto = entry.novo_texto;
            }
          }
        }
      }
    }

    // ── 7. Build flat cardTags ──
    const cardTags = [];
    for (const tm of temas) {
      for (const t of tm.poder) if (!hasText(cardTags, t.texto)) cardTags.push(t);
      for (const t of tm.fraqueza) if (!hasText(cardTags, t.texto)) cardTags.push(t);
    }

    // Extra tags
    const extra = EXTRA_TAGS[npc.name] || [];
    extra.forEach(t => { if (!hasText(cardTags, t.texto)) cardTags.push(clean(t)); });

    // Faction generic
    const facGen = FACTION_GENERICS[npc.faction];
    if (facGen && !hasText(cardTags, facGen.texto)) cardTags.push({ texto: facGen.texto });

    // Danger generics
    const dangerGenerics = GENERICS[npc.danger] || [];
    let addedGen = 0;
    const genTarget = npc.danger === 'extremo' ? 6 : npc.danger === 'alto' ? 4 : npc.danger === 'medio' ? 2 : 1;
    for (const g of dangerGenerics) {
      if (addedGen >= genTarget) break;
      if (!hasText(cardTags, g.texto)) { cardTags.push({ texto: g.texto }); addedGen++; }
    }

    // Unused markdown positive tags
    for (const t of parsedTags) {
      if (t.grau <= 0) continue;
      if (!hasText(cardTags, t.texto)) cardTags.push({ texto: t.texto });
    }
    // ── 8. Ensure total tags >= minimum ──
    let gidx = 0;
    const tagPool = [].concat(dangerGenerics, genericPoder, genericFraqueza).filter(g => g && g.texto);
    while (cardTags.length < min.tags) {
      const g = tagPool[gidx % tagPool.length];
      gidx++;
      if (!g) break;
      if (!hasText(cardTags, g.texto)) cardTags.push({ texto: g.texto });
      if (gidx > tagPool.length * 10) break;
    }

    sql += `UPDATE npcs SET data = jsonb_set(jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', ${jb(temas)}), '{tags}', ${jb(cardTags)}),\n`;
    sql += `  updated_at = NOW()\n`;
    sql += `  WHERE name = '${sq(npc.name)}' AND is_global = TRUE;\n\n`;
    count++;
  }

  // ── DB-only NPCs (no markdown, use SPEC inline + generic pools only) ──
  for (const name of Object.keys(DB_ONLY_META)) {
    const spec = SPEC[name];
    if (!spec) continue;
    const meta = DB_ONLY_META[name];
    const min = MIN_PER_DANGER[meta.danger] || MIN_PER_DANGER.medio;

    const tagMap = {};
    const parsedTags = [];

    const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const hasText = (arr, txt) => arr.some(ct => norm(ct.texto) === norm(txt));

    const temas = spec.cards.map(card => ({
      nome: card.nome,
      poder: resolveTags(card.pod || [], tagMap),
      fraqueza: resolveTags(card.frq || [], tagMap)
    }));

    // ── 2. Collect used texts ──
    const usedTexts = new Set();
    for (const tm of temas) {
      for (const t of tm.poder) usedTexts.add(norm(t.texto));
      for (const t of tm.fraqueza) usedTexts.add(norm(t.texto));
    }

    // ── 3. Collect unused source tags ──
    const unusedPoder = [];
    const unusedFraqueza = [];
    for (const pt of parsedTags) {
      if (usedTexts.has(norm(pt.texto))) continue;
      if (pt.grau > 0) unusedPoder.push({ texto: pt.texto });
      else unusedFraqueza.push({ texto: pt.texto });
    }

    // ── Generic pools ──
    const genericPoder = [
      { texto: 'Treinamento de Combate' }, { texto: 'Instinto de Sobrevivência' },
      { texto: 'Resiliência Física e Mental' }, { texto: 'Perícia em Campo' },
      { texto: 'Habilidade de Luta' }, { texto: 'Determinação Inabalável' },
      { texto: 'Reflexos Aguçados' }, { texto: 'Tática e Estratégia' },
      { texto: 'Intuição de Batalha' }, { texto: 'Resistência a Dano' },
      { texto: 'Movimentação Tática' }, { texto: 'Vigilância Constante' },
      { texto: 'Vontade de Ferro' }, { texto: 'Exploração de Ambiente' },
      { texto: 'Liderança em Campo' },
    ];
    const genericFraqueza = [
      { texto: 'Passado que Assombra' }, { texto: 'Conflitos Internos' },
      { texto: 'Impulsividade' }, { texto: 'Dificuldade de Confiar nos Outros' },
      { texto: 'Culpa e Arrependimento' }, { texto: 'Limitações Humanas' },
      { texto: 'Fama que Atrapalha' }, { texto: 'Responsabilidade que Pesa' },
      { texto: 'Trauma não Resolvido' }, { texto: 'Insegurança Constante' },
      { texto: 'Dívida com o Passado' }, { texto: 'Lealdade Dividida' },
    ];

    // ── 4. Fill missing cards ──
    const FALLBACK_CARD_NAMES = [
      'Classe Ômega', 'Potencial Oculto', 'Treinamento Avançado',
      'Experiência de Combate', 'Resistência Mental', 'Instinto Selvagem',
    ];
    let fillIdx = 1;
    let fillStall = 0;
    while (temas.length < min.cards && fillIdx <= 6) {
      if (fillStall > 3) break;
      fillStall++;
      const card = { nome: FALLBACK_CARD_NAMES[(fillIdx - 1) % FALLBACK_CARD_NAMES.length], poder: [], fraqueza: [] };
      let added = 0;
      for (let i = 0; i < 3; i++) {
        const p = unusedPoder.shift() || genericPoder[(temas.length * 3 + i) % genericPoder.length];
        if (usedTexts.has(norm(p.texto))) continue;
        card.poder.push({ texto: p.texto });
        usedTexts.add(norm(p.texto));
        added++;
        if (!review[name]) review[name] = [];
        review[name].push({ card: card.nome, tipo: 'poder', texto: p.texto });
      }
      for (let i = 0; i < 2; i++) {
        const f2 = unusedFraqueza.shift() || genericFraqueza[(temas.length * 2 + i) % genericFraqueza.length];
        if (usedTexts.has(norm(f2.texto))) continue;
        card.fraqueza.push({ texto: f2.texto });
        usedTexts.add(norm(f2.texto));
        added++;
        if (!review[name]) review[name] = [];
        review[name].push({ card: card.nome, tipo: 'fraqueza', texto: f2.texto });
      }
      if (!added) break;
      temas.push(card);
      fillIdx++;
      autoFilled++;
    }

    // ── 4.5. Fill card-level tags to minimum ──
    let totalCardTags = temas.reduce((s, tm) => s + tm.poder.length + tm.fraqueza.length, 0);
    let ctSafety = 0;
    while (totalCardTags < min.tags && ctSafety < 20) {
      ctSafety++;
      for (const tm of temas) {
        if (totalCardTags >= min.tags) break;
        if (tm.poder.length >= 3) continue;
        const p = unusedPoder.shift() || genericPoder[(tm.nome.length + totalCardTags) % genericPoder.length];
        if (usedTexts.has(norm(p.texto))) continue;
        tm.poder.push({ texto: p.texto });
        usedTexts.add(norm(p.texto));
        totalCardTags++;
        if (!review[name]) review[name] = [];
        review[name].push({ card: tm.nome, tipo: 'poder', texto: p.texto });
      }
    }

    // ── 5-6. Fill poder/fraqueza gaps ──
    for (const tm of temas) {
      if (tm.fraqueza.length && !tm.poder.length) {
        const fallback = unusedPoder.shift() || genericPoder[tm.nome.length % genericPoder.length];
        tm.poder.push({ texto: fallback.texto });
        usedTexts.add(norm(fallback.texto));
      }
    }
    let totalFrq = temas.reduce((s, tm) => s + tm.fraqueza.length, 0);
    for (const tm of temas) {
      if (totalFrq >= min.fraquezas) break;
      let frqStall = 0;
      while (tm.fraqueza.length < 2 && totalFrq < min.fraquezas) {
        if (frqStall > 16) break;
        frqStall++;
        const f2 = unusedFraqueza.shift() || genericFraqueza[(tm.nome.length + totalFrq + frqStall) % genericFraqueza.length];
        if (usedTexts.has(norm(f2.texto))) continue;
        tm.fraqueza.push({ texto: f2.texto });
        usedTexts.add(norm(f2.texto));
        totalFrq++;
        if (!review[name]) review[name] = [];
        review[name].push({ card: tm.nome, tipo: 'fraqueza', texto: f2.texto });
      }
    }

    // ── Apply review ──
    if (applyReview && applyReview[name]) {
      for (const entry of applyReview[name]) {
        if (!entry.novo_texto) continue;
        for (const tm of temas) {
          if (entry.card && entry.card !== tm.nome) continue;
          const arr = entry.tipo === 'fraqueza' ? tm.fraqueza : tm.poder;
          for (const t of arr) {
            if (t.texto === entry.texto) {
              t.texto = entry.novo_texto;
            }
          }
        }
      }
    }

    // ── 7. Build cardTags ──
    const cardTags = [];
    for (const tm of temas) {
      for (const t of tm.poder) if (!hasText(cardTags, t.texto)) cardTags.push(t);
      for (const t of tm.fraqueza) if (!hasText(cardTags, t.texto)) cardTags.push(t);
    }

    // Faction generic
    const facGen = FACTION_GENERICS[meta.faction];
    if (facGen && !hasText(cardTags, facGen.texto)) cardTags.push({ texto: facGen.texto });

    // Danger generics
    const dangerGenerics = GENERICS[meta.danger] || [];
    let addedGen = 0;
    const genTarget = meta.danger === 'extremo' ? 6 : meta.danger === 'alto' ? 4 : meta.danger === 'medio' ? 2 : 1;
    for (const g of dangerGenerics) {
      if (addedGen >= genTarget) break;
      if (!hasText(cardTags, g.texto)) { cardTags.push({ texto: g.texto }); addedGen++; }
    }

    // ── 8. Fill tags to minimum ──
    let gidx = 0;
    const tagPool = [].concat(dangerGenerics, genericPoder, genericFraqueza).filter(g => g && g.texto);
    while (cardTags.length < min.tags) {
      const g = tagPool[gidx % tagPool.length];
      gidx++;
      if (!g) break;
      if (!hasText(cardTags, g.texto)) cardTags.push({ texto: g.texto });
      if (gidx > tagPool.length * 10) break;
    }

    sql += `UPDATE npcs SET data = jsonb_set(jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', ${jb(temas)}), '{tags}', ${jb(cardTags)}),\n`;
    sql += `  updated_at = NOW()\n`;
    sql += `  WHERE name = '${sq(name)}' AND is_global = TRUE;\n\n`;
    count++;
  }

  sql += `COMMIT;\n`;
  sql += `\n-- Resumo: ${count} NPCs enriquecidos (${autoFilled} cartas auto-geradas).\n`;
  Object.assign(REVIEW_DATA, review);
  return sql;
}

// ── Help ──
function printHelp() {
  console.log(`Uso: node scripts/gen-enrich-temas.js [opções]
Opções:
  --dump-review [arquivo]  Gera um review JSON com tags auto-geradas para curadoria
                           (padrão: supabase/review/review.json)
  --apply-review <arquivo> Aplica curadoria de review JSON e gera SQL final
  --help                   Mostra esta ajuda
`);
}

// ── MAIN ──
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) { printHelp(); return; }

  const dumpIdx = args.indexOf('--dump-review');
  const applyIdx = args.indexOf('--apply-review');

  if (applyIdx >= 0) {
    const reviewFile = args[applyIdx + 1];
    if (!reviewFile) { console.error('ERRO: --apply-review precisa de um arquivo'); process.exit(1); }
    if (!fs.existsSync(reviewFile)) { console.error(`ERRO: ${reviewFile} não encontrado`); process.exit(1); }
    const applyReview = JSON.parse(fs.readFileSync(reviewFile, 'utf8'));

    const npcs = parseAll(fs.readFileSync(MD, 'utf8'));
    const sql = generateSQL(npcs, applyReview);
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, sql);
    console.log(`OK → ${OUT} (com curadoria de ${reviewFile})`);
    console.log(`  ${npcs.filter(n => SPEC[n.name]).length} NPCs com SPEC aplicados`);
    console.log(`  ${Object.keys(applyReview).length} NPCs na curadoria`);
    return;
  }

  const npcs = parseAll(fs.readFileSync(MD, 'utf8'));
  const sql = generateSQL(npcs);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, sql);
  console.log(`OK → ${OUT}`);
  console.log(`  ${npcs.filter(n => SPEC[n.name]).length} NPCs com SPEC aplicados`);
  console.log(`  ${npcs.filter(n => !SPEC[n.name]).length} NPCs sem SPEC (ignorados)`);

  if (dumpIdx >= 0) {
    const reviewOut = args[dumpIdx + 1] || 'supabase/review/review.json';
    fs.mkdirSync(path.dirname(reviewOut), { recursive: true });
    fs.writeFileSync(reviewOut, JSON.stringify(REVIEW_DATA, null, 2));
    console.log(`Review → ${reviewOut} (${Object.keys(REVIEW_DATA).length} NPCs)`);
  }
}

main();
