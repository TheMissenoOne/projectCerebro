#!/usr/bin/env node
/**
 * Gera migration 004 — theme cards enriquecidos para TODOS os NPCs.
 * Lê cerebro_rebalanceado.md, aplica SPEC narrativa por NPC, gera SQL.
 * NÃO toca em characters. Idempotente (UPDATE por name + is_global).
 *
 * Regras (por carta, não por Nível de Perigo do personagem — ver REGRAS_CRIACAO_PERSONAGEM.md §4):
 *   Nascente: 1 tag de poder
 *   Médio:    3 tags de poder
 *   Ômega:    10+ tags de poder (todas as perguntas_poder do tema em temas.json respondidas)
 * Toda carta com poder precisa de >= 1 fraqueza. Sem teto/piso total por personagem —
 * número de cartas e nível de cada uma são definidos pela lore real do personagem.
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

// ── SPEC: cards narrativos para CADA NPC ──
// Cada card: { nome, pod: refs (texto|índice), frq: refs }
// Refs podem ser: número (índice no array tagLines parseado) ou objeto {texto, grau}
// ===== X-MEN =====
const SPEC = {

  // ── extremo ──
  'Professor X': {
    cards: [
      { nome: 'Telepatia Ômega', pod: [0, 1, 4], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Sonho de Coexistência', pod: [2, 3, 5], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Manipulador Visionário', pod: [{ texto: 'Mestre em Xadrez Psíquico', grau: 4 }, { texto: 'Sacrifica a Ética pelo Bem Maior', grau: 4 }, { texto: 'Rede de Contatos Global', grau: 3 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Pai Ausente', pod: [{ texto: 'Criou Gerações de Mutantes', grau: 4 }, { texto: 'Legado Vive nos Alunos', grau: 3 }, { texto: 'Perdoa Falhas dos Alunos Repetidamente', grau: 3 }], frq: [{ texto: 'Paraplégico', grau: 3 }, { texto: 'Manipula Alunos como Soldados', grau: 3 }, { texto: 'Apaga Mentes sem Consentimento', grau: 3 }, { texto: 'Fisicamente Frágil e Doente', grau: 2 }, { texto: 'Segredos que Pesam na Consciência', grau: 2 }] },
      { nome: 'Cérebro Vivo', pod: [{ texto: 'Telepatia de Alcance Global', grau: 5 }, { texto: 'Acesso Simultâneo a Bilhões de Mentes', grau: 5 }, { texto: 'Rastreamento Mutante Planetário', grau: 4 }, { texto: 'Bloqueio Mental Absoluto', grau: 5 }, { texto: 'Projeção Astral Corpórea', grau: 4 }, { texto: 'Reescrita de Personalidade', grau: 5 }, { texto: 'Comunicação Instantânea com X-Men', grau: 4 }, { texto: 'Arquivo Mental da História Mutante', grau: 4 }, { texto: 'Download de Conhecimento/Habilidades', grau: 5 }, { texto: 'Edição de Memória em Massa', grau: 5 }, { texto: 'Sugestão Póstuma em Escala Global', grau: 5 }], frq: [{ texto: 'Corpo Físico Vulnerável', grau: 3 }, { texto: 'Overload Psíquico Risco de Morte', grau: 3 }] },
      { nome: 'Fundador dos X-Men', pod: [{ texto: 'Arquiteto do Sonho Mutante', grau: 5 }, { texto: 'Recrutador da Primeira Geração de X-Men', grau: 5 }, { texto: 'Criador do Instituto Xavier para Jovens Superdotados', grau: 5 }, { texto: 'Mentor de Gerações de Líderes Mutantes', grau: 5 }, { texto: 'Diplomata da Coexistência Mutante-Humana', grau: 4 }, { texto: 'Criador da Sala de Perigo para Treinamento Tático', grau: 4 }, { texto: 'Fundou Múltiplas Gerações de Equipes Mutantes', grau: 4 }, { texto: 'Visionário do Sonho de Krakoa', grau: 4 }, { texto: 'Financia o Instituto com Fortuna Pessoal', grau: 3 }, { texto: 'Reconhecido como Líder Espiritual da Mutação', grau: 4 }], frq: [{ texto: 'Idealismo Perigoso', grau: 3 }, { texto: 'Culpa por Falhas Passadas', grau: 3 }] },
    ]
  },
  'Professor X (Base - Cadeira de Rodas)': {
    cards: [
      { nome: 'Telepatia Mais Poderosa da Terra', pod: [{ texto: 'Alcance Global Sem Cerebro', grau: 5 }, { texto: 'Congela Mentes Inteiras Instantaneamente', grau: 5 }, { texto: 'Edita Memórias/Personalidades', grau: 5 }, { texto: 'Projeção Astral Física/Ofensiva', grau: 4 }, { texto: 'Comunicação Telepática Instantânea X-Men', grau: 4 }, { texto: 'Escudos Psíquicos Intransponíveis', grau: 5 }, { texto: 'Rastreia Mutantes em Qualquer Lugar', grau: 4 }, { texto: 'Leitura Mental Instantânea em Qualquer Distância', grau: 5 }, { texto: 'Implanta Memórias Falsas Indetectáveis', grau: 5 }, { texto: 'Apaga Rastros da Própria Presença Mental', grau: 4 }], frq: [{ texto: 'Paraplégico / Corpo Frágil', grau: 4 }, { texto: 'Dependente de Cadeira/Equipamento', grau: 3 }] },
      { nome: 'Gênio Estratégico / Xadrez Psíquico', pod: [{ texto: 'Prevê Movimentos Inimigos (Mentes)', grau: 5 }, { texto: 'Planos de Contingência 42+ (Kuurth)', grau: 5 }, { texto: 'Manipula Eventos Globais Sutilmente', grau: 4 }], frq: [{ texto: 'Manipula Aliados (Segredos/Mentiras)', grau: 4 }] },
      { nome: 'Cerebro / Cerebra Amplificador', pod: [{ texto: 'Alcance Interestelar/Interdimensional', grau: 5 }, { texto: 'Bloqueio Mental Planetário Total', grau: 5 }, { texto: 'Localiza Qualquer Mente no Universo', grau: 5 }, { texto: 'Rastreamento de DNA Mutante em Escala Global', grau: 5 }, { texto: 'Amplificação de Poder Psíquico Múltiplas Vezes', grau: 5 }, { texto: 'Integração com Satélites e Redes de Vigilância', grau: 4 }, { texto: 'Simulação de Cenários de Batalha em Tempo Real', grau: 4 }, { texto: 'Acesso a Bancos de Dados Mutantes Catalogados', grau: 4 }, { texto: 'Interface Neural Direta com o Operador', grau: 4 }, { texto: 'Detecção de Mutações Emergentes ao Nascimento', grau: 5 }], frq: [{ texto: 'Overload = Morte / Danos Cerebrais', grau: 4 }, { texto: 'Requer Concentração Total', grau: 3 }] }
    ]
  },
  'Professor X (Onslaught)': {
    cards: [
      { nome: 'Onslaught: Fusão Xavier + Magneto + Franklin + Nate Grey', pod: [{ texto: 'Telepatia + Telecinese + Magnetismo Nível Cósmico', grau: 5 }, { texto: 'Criou Realidade de Bolso (Heroes Reborn)', grau: 5 }, { texto: 'Controle Mental Planetário SEM Cerebro', grau: 5 }, { texto: 'Absorve Poderes/Psiques de Vítimas', grau: 5 }, { texto: 'Projeção Astral Ofensiva = Dano Físico', grau: 5 }, { texto: 'Sentinelas Reprogramadas Globalmente', grau: 4 }, { texto: 'Imune a Telepatia Externa', grau: 5 }, { texto: 'Cria Corpos Físicos de Energia Psiônica Pura', grau: 5 }, { texto: 'Manipula Matéria em Nível Molecular via Telecinese', grau: 5 }, { texto: 'Resistência Física Sobre-Humana', grau: 4 }], frq: [{ texto: 'Manifestação da Raiva/Trauma Recalcado', grau: 5 }, { texto: 'Personalidade Xavier Submergida', grau: 5 }, { texto: 'Destruição Inevitável da Psique', grau: 5 }] },
      { nome: 'Poder Magnético Absoluto', pod: [{ texto: 'Manipula Espectro Eletromagnético Total', grau: 5 }, { texto: 'Move Asteroides / Polos Magnéticos', grau: 5 }, { texto: 'Escudo Magnético Planetário', grau: 5 }, { texto: 'Inverte Polaridade Magnética da Terra', grau: 5 }, { texto: 'Cria Armaduras Magnéticas Reativas', grau: 4 }, { texto: 'Detecta Metal em Escala Planetária', grau: 4 }, { texto: 'Voo Sustentado por Campos Magnéticos', grau: 4 }, { texto: 'Desvia Projéteis e Ataques Metálicos', grau: 4 }, { texto: 'Manipula Campos Eletromagnéticos de Tecnologia Inimiga', grau: 5 }, { texto: 'Extrai Ferro do Sangue (Ofensiva Letal)', grau: 5 }], frq: [{ texto: 'Consumo Psíquico Constante', grau: 4 }] },
      { nome: 'Realidade de Bolso / Onipotência Local', pod: [{ texto: 'Cria Universos de Bolso (Era Onslaught)', grau: 5 }, { texto: 'Reescreve Física Local', grau: 5 }, { texto: 'Ressuscita Mortos como Servos', grau: 5 }, { texto: 'Manipula Tempo Dentro do Bolso Dimensional', grau: 5 }, { texto: 'Aprisiona Inimigos em Realidades Alternativas', grau: 5 }, { texto: 'Cria Réplicas de Locais e Cidades Inteiras', grau: 4 }, { texto: 'Controla Leis da Física a Vontade', grau: 5 }, { texto: 'Fabrica Exércitos de Sentinelas Customizadas', grau: 4 }, { texto: 'Distorce Percepção de Tempo dos Prisioneiros', grau: 4 }, { texto: 'Fecha e Abre Portais para o Bolso Dimensional', grau: 5 }], frq: [{ texto: 'Instável - Requer Poder Constante', grau: 4 }] }
    ]
  },
  'Jean Grey': {
    cards: [
      { nome: 'Anfitriã da Fênix', pod: [0, 2, 5], frq: [{ texto: 'Fênix Pode Consumir sua Consciência', grau: 4 }] },
      { nome: 'Telepatia e Telecinese Ômega', pod: [1, 3], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Coração dos X-Men', pod: [{ texto: 'Empatia Profunda', grau: 4 }, { texto: 'Elo Psíquico com Ciclope', grau: 4 }, { texto: 'Mentora de Jovens Mutantes', grau: 3 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Força Cósmica', pod: [{ texto: 'Poder Latente Além da Compreensão', grau: 4 }], frq: [{ texto: 'Medo do Próprio Poder', grau: 3 }, { texto: 'Morte e Renascimento Constantes', grau: 3 }] },
      { nome: 'Fênix Renascida', pod: [{ texto: 'Telepatia Ômega Absoluta', grau: 5 }, { texto: 'Telecinese Molecular', grau: 5 }, { texto: 'Pirocinese Cósmica', grau: 5 }, { texto: 'Manipulação de Matéria em Nível Atômico', grau: 5 }, { texto: 'Viagem Interestelar pelo Pensamento', grau: 4 }, { texto: 'Ressurreição Auto-Induzida', grau: 5 }, { texto: 'Conexão com a Força Fênix', grau: 5 }, { texto: 'Criação de Vida do Nada', grau: 5 }, { texto: 'Percepção Cósmica (Sente Vida em Escala Galáctica)', grau: 5 }, { texto: 'Amplificação Extrema de Todos os Próprios Poderes', grau: 5 }], frq: [{ texto: 'Fênix Pode Consumir a Alma', grau: 4 }, { texto: 'Instabilidade Emocional Cósmica', grau: 3 }] },
      { nome: 'Avatar da Fênix', pod: [{ texto: 'Chamas da Ressurreição', grau: 5 }, { texto: 'Purificação de Mentes Corrompidas', grau: 4 }, { texto: 'Cura Planetária', grau: 4 }, { texto: 'Juízo Cósmico', grau: 5 }, { texto: 'Transmutação de Energia Infinita', grau: 5 }, { texto: 'Renascimento Cíclico (Ovo Cósmico)', grau: 5 }, { texto: 'Transferência de Vitalidade a Terceiros', grau: 4 }, { texto: 'Manifestação Física da Força Vital Universal', grau: 5 }, { texto: 'Comunhão com Todas Formas de Vida', grau: 4 }, { texto: 'Erradicação de Doenças em Escala Populacional', grau: 4 }], frq: [{ texto: 'Perda de Humanidade', grau: 4 }, { texto: 'Atrai Entidades Cósmicas Hostis', grau: 3 }] },
    ]
  },
  'Jean Grey (Base)': {
    cards: [
      { nome: 'Telepatia e Telecinese Ômega', pod: [{ texto: 'Leitura Mental Alcance Global', grau: 5 }, { texto: 'Controle Mental Preciso', grau: 4 }, { texto: 'Telecinese Fina (Nível Molecular)', grau: 5 }, { texto: 'Escudos Telecinéticos Intransponíveis', grau: 5 }, { texto: 'Voo Supersônico', grau: 4 }, { texto: 'Rajadas Telecinéticas Devastadoras', grau: 5 }, { texto: 'Ilusões Telepáticas Perfeitas', grau: 4 }, { texto: 'Projeção Astral Ofensiva e Exploratória', grau: 4 }, { texto: 'Bloqueio de Poderes Mutantes Alheios', grau: 4 }, { texto: 'Comando Mental Simultâneo de Múltiplos Alvos', grau: 5 }], frq: [{ texto: 'Dores de Cabeça Crônicas', grau: 2 }] },
      { nome: 'Empatia e Cura Psíquica', pod: [{ texto: 'Cura Trauma Mental/PTSD', grau: 4 }, { texto: 'Sente Emoções de Continentes', grau: 4 }, { texto: 'Projeção Empática (Calma/Fúria)', grau: 3 }, { texto: 'Diagnóstico Médico via Telepatia', grau: 4 }], frq: [{ texto: 'Absorve Dor Alheia', grau: 3 }] },
      { nome: 'Elo Psíquico com Ciclope', pod: [{ texto: 'Comunicação Instantânea Sem Fala', grau: 4 }, { texto: 'Sente Localização/Estado Físico', grau: 4 }, { texto: 'Compartilha Sentidos/Memórias', grau: 3 }], frq: [{ texto: 'Dor Dele = Dor Dela', grau: 3 }] },
      { nome: 'Mentora dos Novos Mutantes', pod: [{ texto: 'Treina Controle de Poderes', grau: 4 }, { texto: 'Liderança Tática de Campo', grau: 4 }, { texto: 'Psicologia Mutante Avançada', grau: 3 }], frq: [{ texto: 'Culpa por Alunos Perdidos', grau: 3 }] }
    ]
  },
  'Jean Grey (Dark Phoenix)': {
    cards: [
      { nome: 'Fênix Negra', pod: [{ texto: 'Consome Estrelas/Sistemas Solares', grau: 5 }, { texto: 'Destrói Civilizações Inteiras (D\'bari)', grau: 5 }, { texto: 'Telepatia Oniversal (Todas Mentes)', grau: 5 }, { texto: 'Telecinese Destroi Planetas', grau: 5 }, { texto: 'Manipulação Matéria/Energia Absoluta', grau: 5 }, { texto: 'Imortalidade Verdadeira (Ressuscita Infinitas)', grau: 5 }, { texto: 'Devora Energia Vital de Planetas Inteiros', grau: 5 }, { texto: 'Cria Buracos Negros / Colapsa Estrelas à Vontade', grau: 5 }, { texto: 'Resiste Ataques Combinados de Titãs Cósmicos (Vigia, Galactus)', grau: 5 }, { texto: 'Reescreve Memórias de Civilizações Inteiras', grau: 5 }], frq: [{ texto: 'Insanidade Progressiva', grau: 5 }, { texto: 'Fome Cósmica Incontrolável', grau: 5 }, { texto: 'Perda Total de Humanidade/Moral', grau: 5 }] },
      { nome: 'Chamas da Fênix Negra', pod: [{ texto: 'Queima no Vácuo/Espaço', grau: 5 }, { texto: 'Apaga Memória/Existência', grau: 5 }, { texto: 'Queima Telepatia Alheia', grau: 5 }, { texto: 'Não Pode Ser Apagada Convencionalmente', grau: 5 }, { texto: 'Fogo Psíquico Perfura Qualquer Escudo Mental', grau: 5 }, { texto: 'Marca a Vítima Permanentemente (Cicatriz Fênix)', grau: 5 }, { texto: 'Consome Almas Além do Corpo Físico', grau: 5 }, { texto: 'Propaga-se Através do Vácuo Sem Combustível', grau: 5 }, { texto: 'Imune a Extinção Convencional (Água, Frio Absoluto, Anti-Matéria)', grau: 5 }, { texto: 'Ignição Instantânea em Escala Planetária', grau: 5 }], frq: [{ texto: 'Atrai Vigia/Galactus/Entidades Cósmicas', grau: 5 }] }
    ]
  },
  'Jean Grey (White Phoenix of the Crown)': {
    cards: [
      { nome: 'Fênix Branca da Coroa', pod: [{ texto: 'Mestra do Multiverso (Todas Linhas Temporais)', grau: 5 }, { texto: 'Restaura Realidades Apagadas', grau: 5 }, { texto: 'Julgamento Cósmico Final', grau: 5 }, { texto: 'Onisciência Verdadeira (Passado/Presente/Futuro)', grau: 5 }, { texto: 'Cria/Apaga Linhas Temporais', grau: 5 }, { texto: 'Transcende Morte/Morte Permanente Impossível', grau: 5 }, { texto: 'Comunhão Direta com a Força Fênix Primordial', grau: 5 }, { texto: 'Cura/Restaura Universos Inteiros Corrompidos', grau: 5 }, { texto: 'Onipresença Dentro do Espectro Fênix', grau: 5 }, { texto: 'Impõe Equilíbrio Cósmico Vida-Morte-Renascimento', grau: 5 }], frq: [{ texto: 'Raramente Interfere Diretamente', grau: 4 }, { texto: 'Deve Manter Equilíbrio Cósmico', grau: 4 }] }
    ]
  },
'Emma Frost': {
    cards: [
      { nome: 'Rainha do Clube do Inferno', pod: [3, 4], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Telepatia Ofensiva', pod: [0, 2], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Diamante', pod: [1], frq: [{ texto: 'Sem Telepatia em Forma de Diamante', grau: 3 }] },
      { nome: 'Professora dos Perdidos', pod: [{ texto: 'Lealdade Feroz aos Alunos', grau: 4 }, { texto: 'Mentora Brutal e Exigente', grau: 3 }], frq: [{ texto: 'Luto pelos Hellions Assassinados', grau: 3 }, { texto: 'Passado Villão Assombra', grau: 2 }] },
      { nome: 'Frieza Calculista', pod: [{ texto: 'Manipulação Psíquica Sutil', grau: 4 }, { texto: 'Mente Tática e Inescrupulosa', grau: 3 }], frq: [{ texto: 'Arrogância como Escudo', grau: 3 }, { texto: 'Pragmatismo Moralmente Cinzento', grau: 2 }, { texto: 'Dificuldade de Confiar', grau: 2 }] },
      { nome: 'Telepatia Ômega', pod: [{ texto: 'Leitura Mental Global', grau: 5 }, { texto: 'Controle Mental de Multidões', grau: 5 }, { texto: 'Escudos Psíquicos Intransponíveis', grau: 5 }, { texto: 'Cirurgia Mental Precisa', grau: 4 }, { texto: 'Transferência de Consciência', grau: 5 }, { texto: 'Bloqueio de Poderes Mutantes', grau: 4 }, { texto: 'Ilusões Perfeitas', grau: 4 }, { texto: 'Projeção Astral de Combate', grau: 4 }, { texto: 'Detecção de Mentiras Absoluta', grau: 4 }, { texto: 'Resistência a Telepatia Alheia (Bloqueia Xavier/Jean)', grau: 5 }], frq: [{ texto: 'Forma Diamante Bloqueia Telepatia', grau: 3 }] },
    ]
  },
  'Emma Frost (Base - Rainha Branca)': {
    cards: [
      { nome: 'Telepatia de Classe Mundial', pod: [{ texto: 'Leitura Mental Alcance Continental', grau: 5 }, { texto: 'Controle Mental Preciso (Indivíduos/Grupos)', grau: 5 }, { texto: 'Escudos Psíquicos Intransponíveis (Bloqueia Xavier/Jean)', grau: 5 }, { texto: 'Cirurgia Mental / Edição Memória', grau: 5 }, { texto: 'Ilusões Telepáticas Perfeitas (Todos Sentidos)', grau: 5 }, { texto: 'Projeção Astral Combatente', grau: 4 }, { texto: 'Bloqueio de Poderes Mutantes Alheios', grau: 4 }, { texto: 'Transferência de Consciência para Outro Corpo', grau: 5 }, { texto: 'Detecção de Mentiras / Leitura de Intenções Absoluta', grau: 4 }, { texto: 'Comando Mental Simultâneo de Múltiplos Alvos', grau: 5 }], frq: [{ texto: 'Exaustão Mental com Uso Extremo', grau: 3 }] },
      { nome: 'Forma Diamante Orgânico', pod: [{ texto: 'Invulnerabilidade Física Quase Total', grau: 5 }, { texto: 'Força Sobre-Humana (Classe 10-25)', grau: 4 }, { texto: 'Não Necessita Oxigênio/Comida/Água', grau: 4 }, { texto: 'Imune a Veneno/Temperatura Extrema', grau: 4 }, { texto: 'Reflete Ataques Psíquicos/Telecinéticos', grau: 4 }, { texto: 'Resistente a Armas Convencionais/Balas', grau: 5 }, { texto: 'Transformação Instantânea Sob Ameaça (Reflexo)', grau: 5 }, { texto: 'Pele Corta Como Lâmina em Combate Corpo a Corpo', grau: 4 }, { texto: 'Sobrevive a Quedas de Grande Altura Sem Dano', grau: 4 }, { texto: 'Amplifica Força de Impacto em Golpes Físicos', grau: 4 }], frq: [{ texto: 'NÃO PODE USAR TELEPATIA EM FORMA DIAMANTE', grau: 5 }, { texto: 'Vulnerável a Frequência Sônica Específica', grau: 3 }, { texto: 'Pode Ser Quebrada (Hulk/Thor/Coisas)', grau: 3 }] },
      { nome: 'Rainha Branca do Clube do Inferno', pod: [{ texto: 'Recursos Bilionários / Corporações Globais', grau: 4 }, { texto: 'Rede de Espiões/Assassinos (Hellions)', grau: 4 }, { texto: 'Influência Política/Mídia Mundial', grau: 4 }, { texto: 'Tecnologia Proibida / Armas Avançadas', grau: 3 }], frq: [{ texto: 'Inimigos Poderosos (Sebastian Shaw, Magneto)', grau: 3 }, { texto: 'Reputação de Traidora/Vilã', grau: 3 }] },
      { nome: 'Professora / Mentora dos X-Men', pod: [{ texto: 'Lealdade Feroz aos Alunos (Novos Mutantes/Geração X)', grau: 5 }, { texto: 'Treina Controle Psíquico / Ética', grau: 4 }, { texto: 'Tática de Campo Brutal e Eficiente', grau: 4 }, { texto: 'Psicologia Reversa / Manipulação Pedagógica', grau: 4 }], frq: [{ texto: 'Luto pelos Hellions Mortos (Culpa)', grau: 4 }, { texto: 'Métodos Brutais Assustam Aliados', grau: 3 }] }
    ]
  },
  'Emma Frost (Phoenix Five / Anfitriã Fênix)': {
    cards: [
      { nome: 'Força Fênix: 1/5 do Poder Cósmico', pod: [{ texto: 'Telepatia Cósmica (Galáxia Inteira)', grau: 5 }, { texto: 'Telecinese Planetária (Move Continentes)', grau: 5 }, { texto: 'Pirocinese Cósmica (Queima no Espaço)', grau: 5 }, { texto: 'Ressurreição / Cura Total', grau: 5 }, { texto: 'Teletransporte Interestelar Instantâneo', grau: 5 }, { texto: 'Imortalidade Enquanto Fênix Habitar', grau: 5 }, { texto: 'Forma Diamante + Telepatia Simultânea (Fênix Ignora Limite)', grau: 5 }, { texto: 'Amplificação Cósmica de Poderes de Toda a Equipe (Phoenix Five)', grau: 5 }, { texto: 'Barreira Psíquica Estelar Contra Invasões Mentais', grau: 5 }, { texto: 'Devastação em Massa Quando Fênix Descontrolada', grau: 5 }], frq: [{ texto: 'Fênix Corrompe Personalidade Progressivamente', grau: 5 }, { texto: 'Perda de Humanidade / Moralidade', grau: 4 }, { texto: 'Conflito Interno: Emma vs Fênix', grau: 4 }] },
      { nome: 'Forma Diamante Cósmica', pod: [{ texto: 'Invulnerabilidade Absoluta (Até Thor/Martelo)', grau: 5 }, { texto: 'Força Ilimitada (Classe 100+)', grau: 5 }, { texto: 'Telepatia Funciona Nesta Forma (Fênix)', grau: 5 }], frq: [{ texto: 'Fênix Corrompe Personalidade', grau: 5 }] }
    ]
  },
  'Rachel Summers': {
    cards: [
      { nome: 'Fênix do Amanhã', pod: [2, 3], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Telepatia e Telecinese do Futuro', pod: [0, 1], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Hound Arrependida', pod: [{ texto: 'Rastreadora Mutante Implacável', grau: 4 }, { texto: 'Determinação Inabalável', grau: 3 }], frq: [{ texto: 'Trauma de Escrava do Futuro', grau: 3 }] },
      { nome: 'Asurak', pod: [{ texto: 'Laço Familiar com Cable', grau: 3 }], frq: [{ texto: 'Poder Instável sob Estresse', grau: 2 }, { texto: 'Isolamento por Ser do Futuro', grau: 2 }] },
      { nome: 'Avatar da Fênix (Futuro)', pod: [{ texto: 'Telepatia Ômega (Linha Temporal Alternativa)', grau: 5 }, { texto: 'Telecinese Molecular', grau: 5 }, { texto: 'Chamas Cósmicas da Fênix', grau: 5 }, { texto: 'Viagem Temporal Psíquica', grau: 5 }, { texto: 'Ressurreição Auto-Induzida', grau: 5 }, { texto: 'Precognição Cósmica (Vê Linhas Temporais)', grau: 5 }, { texto: 'Amplifica Poderes de Toda Equipe ao Redor', grau: 5 }, { texto: 'Barreira Psíquica Cósmica Contra Invasões Mentais', grau: 5 }, { texto: 'Manipula Fluxo Temporal em Escala Planetária', grau: 5 }, { texto: 'Devastação em Massa Quando Descontrolada', grau: 5 }], frq: [{ texto: 'Fênix Consome Hospedeiro', grau: 4 }, { texto: 'Instabilidade Temporal', grau: 3 }] },
      { nome: 'Telepatia de Nível Ômega', pod: [{ texto: 'Leitura Mental Global / Interestelar', grau: 5 }, { texto: 'Projeção Astral Combatente', grau: 5 }, { texto: 'Bloqueio Mental Absoluto (Resistiu Xavier/Emma)', grau: 5 }, { texto: 'Comando Mental em Massa', grau: 4 }, { texto: 'Link Psíquico Permanente com Cable/Mãe', grau: 4 }, { texto: 'Telecinese Sincronizada com Telepatia (Ataques Combinados)', grau: 5 }, { texto: 'Cirurgia Mental de Precisão (Remove Bloqueios/Traumas)', grau: 5 }, { texto: 'Escudos Psíquicos Intransponíveis', grau: 5 }, { texto: 'Rastreamento Psíquico de Qualquer Mutante no Planeta', grau: 4 }, { texto: 'Ilusões Telepáticas Perfeitas em Múltiplos Sentidos', grau: 4 }], frq: [{ texto: 'Sobrecarga Psíquica Causa Hemorragia', grau: 3 }] },
    ]
  },
  'Rachel Summers (Base - Sem Fênix)': {
    cards: [
      { nome: 'Telepatia Ômega Herdada (Jean + Scott)', pod: [{ texto: 'Leitura Mental Alcance Global', grau: 5 }, { texto: 'Escudos Psíquicos Intransponíveis', grau: 5 }, { texto: 'Projeção Astral', grau: 4 }, { texto: 'Ilusões Telepáticas', grau: 4 }, { texto: 'Comando Mental Limitado', grau: 3 }, { texto: 'Link Psíquico com Família (Cable, Jean, Scott)', grau: 4 }, { texto: 'Cirurgia Mental de Precisão (Remove Traumas)', grau: 4 }, { texto: 'Bloqueio de Telepatia Alheia (Resiste Invasões)', grau: 4 }, { texto: 'Rastreamento Mental de Mutantes Conhecidos', grau: 3 }, { texto: 'Comunicação Telepática em Grupo (Equipe Inteira)', grau: 4 }], frq: [{ texto: 'Dores de Cabeça Crônicas', grau: 2 }] },
      { nome: 'Telecinese Ômega', pod: [{ texto: 'Levita Construções Pesadas', grau: 5 }, { texto: 'Escudos Telecinéticos Intransponíveis', grau: 5 }, { texto: 'Rajadas Telecinéticas Devastadoras', grau: 5 }, { texto: 'Voo Supersônico', grau: 4 }, { texto: 'Precisão Molecular (Cirurgia/Desarme)', grau: 4 }, { texto: 'Campos de Força Telecinéticos Reativos', grau: 5 }, { texto: 'Manipulação de Matéria a Curta Distância (Nível Molecular)', grau: 5 }, { texto: 'Desarma Armas/Tecnologia à Distância', grau: 4 }, { texto: 'Voo em Formação com Escudo Protetor para Aliados', grau: 4 }, { texto: 'Controle Fino o Suficiente para Cirurgia sem Bisturi', grau: 4 }], frq: [{ texto: 'Exaustão Física/Mental', grau: 3 }] },
      { nome: 'Precognição / Visões do Futuro', pod: [{ texto: 'Visões Espontâneas de Eventos Futuros', grau: 4 }, { texto: 'Sente Perigo Iminente (Sentido Aranha Psíquico)', grau: 4 }, { texto: 'Vislumbres de Linhas Temporais Alternativas', grau: 3 }], frq: [{ texto: 'Visões Fragmentadas / Difíceis Interpretar', grau: 3 }, { texto: 'Não Pode Mudar Facilmente o Visto', grau: 3 }] },
      { nome: 'Hound / Rastreadora', pod: [{ texto: 'Marcas Hound Permitem Rastrear Qualquer Mutante', grau: 5 }, { texto: 'Sentidos Aguçados (Olfato/Audição/Visão)', grau: 4 }, { texto: 'Imune a Maioria Controle Mental', grau: 4 }], frq: [{ texto: 'PTSD Severo / Trauma Ahab', grau: 4 }] },
      { nome: 'Membro dos Excalibur / X-Men', pod: [{ texto: 'Liderança Tática', grau: 4 }, { texto: 'Combate Corpo-a-Corpo Treinado', grau: 3 }, { texto: 'Experiência Multiversal (Cross-Time Caper)', grau: 4 }], frq: [{ texto: 'Sombra da Mãe (Jean Grey)', grau: 3 }] }
    ]
  },
  'Rachel Summers (Fênix Force - Avatar Completo)': {
    cards: [
      { nome: 'Avatar da Fênix (Linha Temporal Futura)', pod: [{ texto: 'Telepatia Cósmica (Galáxia)', grau: 5 }, { texto: 'Telecinese Molecular/Atômica', grau: 5 }, { texto: 'Chamas Fênix Queimam no Vácuo/Tempo', grau: 5 }, { texto: 'Viagem Temporal / Realidades Psíquica', grau: 5 }, { texto: 'Ressurreição Infinita', grau: 5 }, { texto: 'Precognição Cósmica (Todas Linhas Temporais)', grau: 5 }, { texto: 'Manipulação Realidade Local', grau: 5 }, { texto: 'Amplificação Cósmica de Todo o Time ao Redor', grau: 5 }, { texto: 'Barreira Psíquica Impenetrável em Escala Estelar', grau: 5 }, { texto: 'Devastação de Sistemas Estelares Quando Descontrolada', grau: 5 }], frq: [{ texto: 'Fênix Consome Identidade Rachel', grau: 5 }, { texto: 'Instabilidade Temporal Constante', grau: 4 }] }
    ]
  },
  'Cable': {
    cards: [
      { nome: 'Messias do Futuro', pod: [2, 3], frq: [{ texto: 'Obsessão em Salvar o Amanhã', grau: 2 }] },
      { nome: 'Vírus Techno-Orgânico', pod: [0, 1], frq: [{ texto: 'Vírus Techno-Orgânico o Consome', grau: 4 }] },
      { nome: 'Soldado de Dois Mundos', pod: [{ texto: 'Liderança da X-Force', grau: 4 }, { texto: 'Pai Adotivo de Hope Summers', grau: 4 }, { texto: 'Estrategista Pós-Apocalíptico', grau: 3 }], frq: [{ texto: 'Poder Psíquico Dividido com o Vírus', grau: 2 }] },
      { nome: 'Telepatia e Telecinese Suprimidas', pod: [{ texto: 'Telepatia de Nível Ômega (Suprimida)', grau: 5 }, { texto: 'Telecinese Massiva (Suprimida)', grau: 5 }, { texto: 'Precognição Tática', grau: 4 }, { texto: 'Link Psíquico com Hope', grau: 4 }, { texto: 'Escudos Mentais Impenetráveis', grau: 4 }], frq: [{ texto: 'Vírus Consome Poder Psíquico', grau: 4 }, { texto: 'Dores Crônicas Constantes', grau: 3 }] },
      { nome: 'Arsenal do Futuro', pod: [{ texto: 'Armas de Energia Avançada', grau: 4 }, { texto: 'Teletransporte Temporal', grau: 4 }, { texto: 'Escudos de Força Pessoais', grau: 3 }, { texto: 'Interface Neural com Tecnologia', grau: 4 }, { texto: 'Braço Cibernético Multifuncional', grau: 3 }], frq: [{ texto: 'Dependência de Tecnologia', grau: 2 }] },
      { nome: 'Pai de Hope', pod: [{ texto: 'Protetor da Messias Mutante', grau: 5 }, { texto: 'Treinamento de Sobrevivência Extremo', grau: 4 }, { texto: 'Conexão Genética Única', grau: 4 }, { texto: 'Sacrifício Pelo Futuro', grau: 5 }], frq: [{ texto: 'Obsessão Protetora', grau: 3 }, { texto: 'Medo de Falhar com Ela', grau: 3 }] },
    ]
  },
  'Cable (Suprimido)': {
    cards: [
      { nome: 'Vírus Techno-Orgânico (80%+ Corpo)', pod: [{ texto: 'Metade do Corpo Cibernético', grau: 4 }, { texto: 'Força Sobre-Humana (Braço Cibernético)', grau: 4 }, { texto: 'Interface Tecnológica Universal', grau: 4 }, { texto: 'Regeneração Tecnorgânica', grau: 3 }], frq: [{ texto: 'Vírus Consome 99% Poder Psíquico', grau: 5 }, { texto: 'Dores Constantes / Vida Encurtada', grau: 4 }] },
      { nome: 'Telepatia/Telecinese Mínima', pod: [{ texto: 'Leitura Mental Curto Alcance', grau: 2 }, { texto: 'Escudos Mentais Básicos', grau: 2 }, { texto: 'Levita Objetos Pequenos', grau: 2 }, { texto: 'Link Psíquico com Hope', grau: 3 }], frq: [{ texto: 'Qualquer Uso Maior Acelera Vírus', grau: 4 }] },
      { nome: 'Arsenal Temporal Avançado', pod: [{ texto: 'Rifle de Plasma do Futuro', grau: 4 }, { texto: 'Dispositivo Teletransporte Temporal', grau: 4 }, { texto: 'Escudos de Força Portáteis', grau: 3 }, { texto: 'Braço Cibernético: Ferramentas/Armas', grau: 3 }, { texto: 'Visor Tático: Raio-X, Termal, Rastreamento', grau: 3 }], frq: [{ texto: 'Tecnologia Pode Falhar / Ser Hackeada', grau: 3 }] },
      { nome: 'Estrategista Mestre / Soldado do Futuro', pod: [{ texto: 'Conhece História Futura (Eventos Chave)', grau: 5 }, { texto: 'Táticas de Guerra Assimétrica', grau: 5 }, { texto: 'Liderança X-Force / Pergaminhos', grau: 4 }, { texto: 'Especialista Contra-Apocalipse', grau: 5 }, { texto: 'Décadas de Experiência em Guerrilha do Futuro', grau: 5 }, { texto: 'Mestre em Todo Armamento Existente', grau: 5 }, { texto: 'Planejamento de Operações Multi-Fase', grau: 4 }, { texto: 'Instrutor de Combate para Recrutas da X-Force', grau: 4 }, { texto: 'Sobrevivencialismo Extremo em Terreno Hostil', grau: 4 }, { texto: 'Leitura Tática Instantânea de Campo de Batalha', grau: 5 }], frq: [{ texto: 'Linha Temporal Muda - Conhecimento Obsoleto', grau: 3 }, { texto: 'Paradoxos Temporais', grau: 3 }] },
      { nome: 'Pai Protetor de Hope', pod: [{ texto: 'Treinamento Sobrevivência Extremo', grau: 4 }, { texto: 'Conexão Genética/Psíquica Única', grau: 4 }, { texto: 'Sacrifício Total Pela Filha', grau: 5 }], frq: [{ texto: 'Obsessão Protetora Cega', grau: 4 }] }
    ]
  },
  'Cable (Liberado - Sem Vírus)': {
    cards: [
      { nome: 'Telecinese Ômega Plena', pod: [{ texto: 'Levita Ilhas/Montanhas/Cidades', grau: 5 }, { texto: 'Desmonta Sentinelas Nível Atômico', grau: 5 }, { texto: 'Escudo Planetário', grau: 5 }, { texto: 'Manipulação Molecular Precisa', grau: 5 }, { texto: 'Voo Orbital/Espacial', grau: 4 }, { texto: 'Reconstrução Corporal Completa', grau: 5 }, { texto: 'Campos de Força Reativos Multicamada', grau: 5 }, { texto: 'Rajadas Telecinéticas Devastadoras', grau: 5 }, { texto: 'Controle Simultâneo de Múltiplos Alvos em Combate', grau: 4 }, { texto: 'Desintegração de Matéria a Nível Subatômico', grau: 5 }], frq: [{ texto: 'Overload Pode Matar (Sem Vírus Como Freio)', grau: 4 }] },
      { nome: 'Telepatia Ômega Plena', pod: [{ texto: 'Comando Mental Global', grau: 5 }, { texto: 'Precognição Perfeita (Táticas)', grau: 5 }, { texto: 'Ligação Todos Mutantes (Rede Psíquica)', grau: 5 }, { texto: 'Reescrita Personalidade Massa', grau: 5 }, { texto: 'Projeção Astral Ofensiva/Defensiva', grau: 5 }, { texto: 'Leitura Mental em Escala Planetária', grau: 5 }, { texto: 'Escudos Mentais Impenetráveis (Bloqueia Invasões Cósmicas)', grau: 5 }, { texto: 'Cirurgia Mental de Precisão Absoluta', grau: 5 }, { texto: 'Ilusões Telepáticas Perfeitas em Múltiplos Sentidos', grau: 5 }, { texto: 'Bloqueio de Poderes Mutantes em Massa', grau: 5 }], frq: [{ texto: 'Mente Aberta a Todos Pensamentos', grau: 4 }] },
      { nome: 'Precognição Estratégica Absoluta', pod: [{ texto: 'Vê Todos Futuros Possíveis Simultaneamente', grau: 5 }, { texto: 'Escolhe Caminho Vitorioso Garantido', grau: 5 }, { texto: 'Antecipa Traições/Emboscadas', grau: 5 }], frq: [{ texto: 'Paradoxo: Ver Futuro Muda Futuro', grau: 3 }] },
      { nome: 'Messias Mutante / Clone de Jean + Scott', pod: [{ texto: 'Genética Ômega Pura (Jean Grey + Cyclops)', grau: 5 }, { texto: 'Potencial Igual/Supere Mãe/Pai', grau: 5 }, { texto: 'Imune a Manipulação Genética (Sinistro/Apocalipse)', grau: 4 }], frq: [{ texto: 'Alvo Constante de Poderosos (Apocalipse/Sinistro)', grau: 4 }] }
    ]
  },

  // ── alto ──
  'Ciclope': {
    cards: [
      { nome: 'Rajada Óptica Concussiva', pod: [{ texto: 'Força Concussiva Pura (Sem Calor)', grau: 4 }, { texto: 'Alimentado por Energia Solar', grau: 4 }, { texto: 'Nível Edifício+ (Pulveriza Sentinelas, Nivela Montanhas)', grau: 4 }], frq: [{ texto: 'Sem Controle Sem Visor (Trauma Craniano)', grau: 5 }, { texto: 'Recarga Lenta Sem Sol', grau: 2 }] },
      { nome: 'Maestria do Feixe Óptico', pod: [{ texto: 'Ricochete Calculado em Múltiplas Superfícies (8+ Quicadas)', grau: 4 }, { texto: 'Precisão Cirúrgica (Feixe Fino como Agulha a Longa Distância)', grau: 4 }, { texto: 'Modulação de Feixe para Efeitos Táticos (Cone, Propulsão, Perfuração de Adamantium)', grau: 4 }], frq: [{ texto: 'Exige Foco Mental Absoluto', grau: 2 }, { texto: 'Visor Pode Ser Destruído / Overload', grau: 3 }] },
      { nome: 'Comandante de Campo', pod: [{ texto: 'Gênio Tático (42+ Planos de Contingência, ex: Kuurth-Juggernaut)', grau: 5 }, { texto: 'Liderança Nata como Primeiro X-Man', grau: 5 }, { texto: 'Leitura Instantânea de Campo de Batalha', grau: 5 }, { texto: 'Sincroniza Ataques Combinados de Toda a Equipe', grau: 5 }, { texto: 'Adapta Estratégia em Tempo Real Contra Ameaças Cósmicas', grau: 5 }, { texto: 'Forja e Treina Novas Gerações de X-Men', grau: 5 }, { texto: 'Mantém Comando sob Pressão Extrema e Perdas em Combate', grau: 5 }, { texto: 'Domínio de Estratégia Contra Equipes Superpoderosas (Vingadores, Liga)', grau: 5 }, { texto: 'Conhecimento Enciclopédico das Capacidades de Aliados e Inimigos', grau: 5 }, { texto: 'Autoridade Tática Reconhecida por Veteranos e Rivais', grau: 5 }], frq: [{ texto: 'Peso da Responsabilidade Constante', grau: 4 }, { texto: 'Rigidez Emocional / Dificuldade Delegar', grau: 3 }] },
    ]
  },
'Wolverine': {
    cards: [
      { nome: 'Fator de Cura e Adamantium', pod: [0, 1, 2], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Fera Selvagem', pod: [4, 5], frq: [{ texto: 'Instinto Berserker', grau: 3 }] },
      { nome: 'Samurai Interior', pod: [{ texto: 'Código de Honra Pessoal', grau: 4 }, { texto: 'Mestre em Artes Marciais', grau: 3 }, { texto: 'Lealdade Feroz aos Amigos', grau: 3 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Passado Fragmentado', pod: [{ texto: 'Décadas de Experiência', grau: 3 }], frq: [{ texto: 'Memórias Fragmentadas', grau: 3 }, { texto: 'Raiva Incontrolável', grau: 2 }] },
      { nome: 'Arma X', pod: [{ texto: 'Séculos de Combate', grau: 4 }, { texto: 'Rastreador Implacável', grau: 4 }, { texto: 'Resistência a Telepatia', grau: 3 }, { texto: 'Conhecimento de Operações Negras', grau: 3 }], frq: [{ texto: 'Gatilhos de Condicionamento', grau: 3 }, { texto: 'Culpa por Vítimas Inocentes', grau: 2 }] },
      { nome: 'Imortal de Adamantium', pod: [{ texto: 'Regeneração Instantânea de Ferimentos Letais', grau: 5 }, { texto: 'Sobrevive a Decapitação e Regenera o Corpo Inteiro', grau: 5 }, { texto: 'Imune a Praticamente Todo Veneno e Doença', grau: 5 }, { texto: 'Esqueleto de Adamantium Inquebrável', grau: 5 }, { texto: 'Garras Retráteis de Adamantium Cortam Quase Qualquer Material', grau: 5 }, { texto: 'Regeneração Sustentada Mesmo sob Ataque Contínuo', grau: 5 }, { texto: 'Cicatrização Ignora Fogo, Ácido e Radiação', grau: 5 }, { texto: 'Longevidade Extrema (Envelhecimento Drasticamente Retardado)', grau: 5 }, { texto: 'Sobrevive a Explosões e Quedas Fatais para Humanos Comuns', grau: 5 }, { texto: 'Fator de Cura Neutraliza a Maioria de Drogas e Sedativos', grau: 5 }], frq: [{ texto: 'Regeneração Consome Reservas de Energia (Fome Extrema)', grau: 3 }, { texto: 'Adamantium Vulnerável a Manipulação Magnética Extrema', grau: 3 }] },
    ]
  },
  'Tempestade': {
    cards: [
      { nome: 'Senhora dos Elementos', pod: [0, 1, 2], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Deusa do Trovão', pod: [3, 5], frq: [{ texto: 'Claustrofobia Severa', grau: 3 }] },
      { nome: 'Rainha de Wakanda', pod: [{ texto: 'Liderança e Realeza', grau: 4 }, { texto: 'Orgulho Africano', grau: 3 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Espírito Livre', pod: [{ texto: 'Compaixão e Sabedoria', grau: 3 }], frq: [{ texto: 'Responsabilidade de Líder', grau: 2 }] },
      { nome: 'Ladra do Cairo', pod: [{ texto: 'Furtividade Urbana', grau: 3 }, { texto: 'Mestre do Disfarce', grau: 3 }, { texto: 'Contatos no Submundo', grau: 2 }], frq: [{ texto: 'Passado de Rua', grau: 2 }, { texto: 'Desconfiança de Autoridades', grau: 2 }] },
      { nome: 'Domínio Climático Planetário', pod: [{ texto: 'Geração de Furacões de Categoria Máxima sob Comando', grau: 5 }, { texto: 'Relâmpagos de Precisão Cirúrgica em Escala de Batalha', grau: 5 }, { texto: 'Criação Instantânea de Múltiplos Tornados', grau: 5 }, { texto: 'Manipulação de Pressão Atmosférica em Área Continental', grau: 5 }, { texto: 'Voo Sustentado por Controle Direto das Correntes de Vento', grau: 5 }, { texto: 'Percepção Climática — Sente Mudanças Atmosféricas a Quilômetros', grau: 5 }, { texto: 'Controle de Temperatura Regional (Nevascas, Secas Induzidas)', grau: 5 }, { texto: 'Neblina Instantânea Capaz de Ocultar Exércitos Inteiros', grau: 5 }, { texto: 'Dispersão Forçada de Sistemas Climáticos Hostis', grau: 5 }, { texto: 'Descargas Elétricas Capazes de Derrubar Aeronaves Blindadas', grau: 5 }, { texto: 'Alteração de Padrões Climáticos em Escala Global Quando Desencadeada por Completo', grau: 5 }], frq: [{ texto: 'Exaustão ao Sustentar Tempestades por Tempo Prolongado', grau: 3 }, { texto: 'Claustrofobia Severa Compromete o Controle Total do Poder', grau: 3 }] },
    ]
  },
  'Fera': {
    cards: [
      { nome: 'Intelecto Genial', pod: [1, 4], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Fera Azul', pod: [0, 2, 3], frq: [{ texto: 'Aparência Desfavorece Socialmente', grau: 2 }] },
      { nome: 'Cientista sem Escrúpulos', pod: [{ texto: 'Ex-Diretor da X-Force CIA', grau: 4 }], frq: [{ texto: 'Escorregou Moralmente', grau: 3 }, { texto: 'Clonou e Matou Wolverine', grau: 3 }, { texto: 'Prisões Secretas e Experimentos', grau: 3 }] },
      { nome: 'Jekyll & Hyde', pod: [{ texto: 'Intelecto Genial', grau: 4 }, { texto: 'Capacidade de Adaptação Moral', grau: 3 }], frq: [{ texto: 'Duas Versões de Si em Guerra', grau: 3 }, { texto: 'Vaidade Intelectual', grau: 2 }] },
      { nome: 'Fisiologia Mutante de Ápice', pod: [{ texto: 'Força Sobre-Humana Capaz de Erguer Múltiplas Toneladas', grau: 5 }, { texto: 'Agilidade e Reflexos Felinos Além do Limite Humano', grau: 5 }, { texto: 'Sentidos de Predador (Olfato, Audição, Visão Noturna)', grau: 5 }, { texto: 'Garras Retráteis e Presas Afiadas em Combate Corpo a Corpo', grau: 5 }, { texto: 'Durabilidade Aprimorada Contra Impactos e Quedas', grau: 5 }, { texto: 'Regeneração Acelerada de Ferimentos', grau: 5 }, { texto: 'Salto Vertical e Escalada Sobre-Humanos', grau: 5 }, { texto: 'Equilíbrio e Controle Corporal Acrobático Extremo', grau: 5 }, { texto: 'Fisiologia Adaptada a Múltiplas Mutações Sucessivas', grau: 5 }, { texto: 'Resistência a Fadiga em Combates Prolongados', grau: 5 }], frq: [{ texto: 'Aparência Monstruosa', grau: 3 }, { texto: 'Luta Contra Instintos Animais', grau: 2 }] },
      { nome: 'Gênio Polímata de Nível Mundial', pod: [{ texto: 'Domínio Simultâneo de Bioquímica, Genética, Física e Medicina', grau: 5 }, { texto: 'Criador de Curas Revolucionárias (Cura Parcial da Peste Legado)', grau: 5 }, { texto: 'Engenharia Reversa de Tecnologia Alienígena e Mutante', grau: 5 }, { texto: 'Pesquisa de Ponta em Viagem no Tempo e Multiversos', grau: 5 }, { texto: 'Cirurgião de Precisão em Situações de Emergência', grau: 5 }, { texto: 'Desenvolve Soros e Antídotos Sob Pressão Extrema', grau: 5 }, { texto: 'Descobertas Científicas Reconhecidas Mundialmente', grau: 5 }, { texto: 'Cataloga e Analisa Novas Mutações em Tempo Recorde', grau: 5 }, { texto: 'Constrói e Modifica Equipamentos Científicos Avançados (Cerebro, Blackbird)', grau: 5 }, { texto: 'Raciocínio Analítico Acelerado sob Combate', grau: 5 }], frq: [{ texto: 'Confia Demais na Própria Genialidade', grau: 2 }, { texto: 'Ambição Científica Ultrapassa a Ética', grau: 3 }] },
    ]
  },
  'Ícone': {
    cards: [
      { nome: 'Criocinese Ômega', pod: [0, 1, 2], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Poder Gelado', pod: [3, 4], frq: [{ texto: 'Humor Defensivo', grau: 2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Exploração de Ambiente', grau: 3 }, { texto: 'Trabalho em Equipe', grau: 2 }, { texto: 'Treinamento Intensivo', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Príncipe de Serval', pod: [{ texto: 'Herança de Política Africana', grau: 3 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Domínio Total da Forma de Gelo', pod: [{ texto: 'Transformação Completa em Gelo Vivo (Reconstituição Total do Corpo)', grau: 5 }, { texto: 'Controle Total de Temperatura em Área Ampla', grau: 5 }, { texto: 'Criação Instantânea de Estruturas de Gelo Complexas (Pontes, Fortalezas)', grau: 5 }, { texto: 'Armadura de Gelo Reativa Sob Ameaça', grau: 5 }, { texto: 'Locomoção por Rampa de Gelo Auto-Gerada em Alta Velocidade', grau: 5 }, { texto: 'Regeneração Instantânea do Corpo de Gelo ao Ser Estilhaçado', grau: 5 }, { texto: 'Projéteis e Lâminas de Gelo Sob Demanda', grau: 5 }, { texto: 'Congelamento de Massas de Água em Escala de Rio ou Lago', grau: 5 }, { texto: 'Resistência Total a Dano Físico e Frio Extremo em Forma de Gelo', grau: 5 }, { texto: 'Manipulação de Umidade do Ar para Gerar Gelo do Nada', grau: 5 }, { texto: 'Potencial Latente Comparável aos Mutantes Ômega Mais Poderosos', grau: 5 }], frq: [{ texto: 'Perde Sensibilidade Tátil em Forma de Gelo', grau: 3 }, { texto: 'Potencial Raramente Usado por Insegurança', grau: 3 }] }
    ]
  },
  'Anjo': {
    cards: [
      { nome: 'Asas de Anjo', pod: [0, 3], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Bilionário Filantropo', pod: [2, 4], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Sangue de Cura', pod: [1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Anjo da Morte', pod: [{ texto: 'Asas Metálicas Cortantes', grau: 4 }, { texto: 'Voo Sônico e Precisão Aérea', grau: 3 }], frq: [{ texto: 'Trauma de Apocalipse', grau: 3 }, { texto: 'Lado Sombrio Arcangel', grau: 3 }] }
    ]
  },
  'Colossus': {
    cards: [
      { nome: 'Aço Orgânico', pod: [0, 1, 2], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Artista e Guerreiro', pod: [3], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Protetor da Família', pod: [{ texto: 'Lealdade à Irmã Magik', grau: 4 }, { texto: 'Força Interior', grau: 3 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Gigante Gentil', pod: [{ texto: 'Força Sobre-humana', grau: 5 }, { texto: 'Pele de Aço Orgânico', grau: 4 }], frq: [{ texto: 'Pesa a Perda de Seus Amigos', grau: 2 }, { texto: 'Manso Demais para Ser Cruel', grau: 1 }] },
      { nome: 'Legado Rasputin', pod: [{ texto: 'Irmão de Magik (Illyana)', grau: 3 }, { texto: 'Sangue de Feiticeiros', grau: 3 }, { texto: 'Conexão com Limbo', grau: 3 }, { texto: 'Protege Inocentes', grau: 3 }], frq: [{ texto: 'Magik o Manipula', grau: 2 }, { texto: 'Fardo da Família', grau: 2 }] },
      { nome: 'Forma Definitiva de Aço Orgânico', pod: [{ texto: 'Pele de Aço Orgânico Virtualmente Indestrutível', grau: 5 }, { texto: 'Força Sobre-Humana Capaz de Erguer Dezenas de Toneladas', grau: 5 }, { texto: 'Invulnerabilidade a Balas, Explosões e Impactos Diretos', grau: 5 }, { texto: 'Resistência Total a Temperaturas Extremas em Forma Metálica', grau: 5 }, { texto: 'Golpes Capazes de Rachar Concreto Reforçado e Metal', grau: 5 }, { texto: 'Sobrevive a Quedas de Grandes Alturas Sem Dano', grau: 5 }, { texto: 'Transformação Reflexa Instantânea Sob Ameaça', grau: 5 }, { texto: 'Resistência a Corrosão, Veneno e Doenças em Forma Metálica', grau: 5 }, { texto: 'Amplificação de Impacto em Golpes de Combate Corpo a Corpo', grau: 5 }, { texto: 'Suporta Pressões Extremas (Vácuo do Espaço, Profundezas Oceânicas)', grau: 5 }], frq: [{ texto: 'Fadiga ao Manter a Transformação por Longos Períodos', grau: 3 }, { texto: 'Perde Sensibilidade Tátil Fina em Forma Metálica', grau: 2 }] },
    ]
  },
  'Noturno': {
    cards: [
      { nome: 'Teletransporte Bamf', pod: [{ texto: 'Teletransporta-se em saltos curtos com fumaça e enxofre', grau: 4 }, { texto: 'Transporta aliados ao custo de maior risco e desorientação', grau: 3 }, { texto: 'Evita ataques reposicionando-se instantaneamente', grau: 3 }], frq: [{ texto: 'Distâncias e locais desconhecidos tornam o salto perigoso', grau: 3 }] },
      { nome: 'Acrobata Sombrio', pod: [{ texto: 'Acrobacia aérea e equilíbrio sobre-humanos', grau: 4 }, { texto: 'Escala superfícies e luta em três dimensões', grau: 3 }, { texto: 'Camuflagem natural em sombras', grau: 3 }], frq: [{ texto: 'Aparência demoníaca provoca medo e preconceito', grau: 2 }] },
      { nome: 'Fé e Compaixão', pod: [{ texto: 'Serve como conselheiro espiritual e mediador', grau: 3 }], frq: [{ texto: 'Fé não elimina o trauma de violência e perseguição', grau: 2 }] },
    ]
  },
  'Kitty Pryde': {
    cards: [
      { nome: 'Fase Mutante', pod: [{ texto: 'Atravessa matéria sólida sem ser atingida', grau: 4 }, { texto: 'Leva pessoas e objetos em fase consigo', grau: 3 }, { texto: 'Interrompe eletrônicos ao atravessá-los', grau: 3 }], frq: [{ texto: 'Erros de concentração podem deixá-la presa dentro de matéria', grau: 4 }] },
      { nome: 'Mestra da Tecnologia', pod: [{ texto: 'Invade sistemas e entende tecnologia avançada', grau: 4 }, { texto: 'Pilota e repara equipamento dos X-Men', grau: 3 }, { texto: 'Usa planejamento técnico em campo', grau: 3 }], frq: [{ texto: 'Tecnologia não resolve ameaças místicas ou puramente sociais', grau: 2 }] },
      { nome: 'Liderança dos X-Men', pod: [{ texto: 'Coordena equipes sob pressão', grau: 3 }, { texto: 'Prioriza resgate de civis e colegas', grau: 3 }, { texto: 'Mantém coragem diante de ameaças maiores', grau: 3 }], frq: [{ texto: 'Impulsividade ao proteger quem ama', grau: 2 }] },
    ]
  },
'Rogue': {
    cards: [
      { nome: 'Absorção de Poderes', pod: [0, 1, 2], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Toque Letal', pod: [{ texto: 'Absorve Poderes, Memórias e Personalidade ao Simples Contato', grau: 5 }, { texto: 'Absorção Ocorre em Segundos, Sem Necessidade de Consentimento', grau: 5 }, { texto: 'Retém Poderes Absorvidos Permanentemente com Contato Prolongado', grau: 5 }, { texto: 'Absorve Força Vital, Deixando a Vítima em Coma', grau: 5 }, { texto: 'Absorve Múltiplos Alvos em Sequência Rápida', grau: 5 }, { texto: 'Acessa Conhecimento e Habilidades Técnicas da Vítima', grau: 5 }, { texto: 'Absorve Poderes Mutantes, Sobre-Humanos e Até Cósmicos', grau: 5 }, { texto: 'Vozes e Memórias das Vítimas Ecoam Permanentemente na Mente', grau: 5 }, { texto: 'Controle Parcial Aprendido para Limitar Duração do Contato', grau: 5 }, { texto: 'Absorve Através de Roupas Finas ou Contato Acidental Breve', grau: 5 }], frq: [{ texto: 'Não Pode Tocar Ninguém sem Absorver', grau: 4 }, { texto: 'Isolamento Emocional Permanente', grau: 3 }, { texto: 'Múltiplas Personalidades Absorvidas', grau: 3 }] },
      { nome: 'Villã Redimida', pod: [{ texto: 'Força e Voo (Miss Marvel)', grau: 4 }, { texto: 'Liderança de Equipe', grau: 3 }, { texto: 'Força de Vontade Inabalável', grau: 3 }], frq: [{ texto: 'Passado na Irmandade Assombra', grau: 2 }] },
      { nome: 'Amor à Prova de Toque', pod: [{ texto: 'Casada com Gambit', grau: 3 }], frq: [{ texto: 'Mystique a Manipulou por Anos', grau: 2 }] },
      { nome: 'Poderes Permanentes Absorvidos', pod: [{ texto: 'Vôo e Força Sobre-Humana', grau: 4 }, { texto: 'Invulnerabilidade Parcial', grau: 3 }, { texto: 'Sentidos Aguçados', grau: 3 }], frq: [{ texto: 'Eco da Personalidade de Carol Danvers', grau: 3 }, { texto: 'Medo de Perder Controle', grau: 2 }] },
    ]
  },
  'Gambit': {
    cards: [
      { nome: 'Carga Cinética', pod: [0, 4], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Rei dos Ladrões', pod: [1, 3], frq: [{ texto: 'Passado na Guilda dos Ladrões', grau: 3 }] },
      { nome: 'Charme Cajun', pod: [2], frq: [{ texto: 'Lealdade Questionável', grau: 2 }] },
      { nome: 'Busca por Redenção', pod: [{ texto: 'Casado com Rogue', grau: 3 }], frq: [{ texto: 'Culpa pelo Massacre dos Morlocks', grau: 3 }, { texto: 'Poder Limitado por Sinister', grau: 2 }] },
      { nome: 'Mestre das Cartas', pod: [{ texto: 'Carrega Qualquer Objeto com Energia Cinética Explosiva ao Toque', grau: 5 }, { texto: 'Cartas de Baralho como Projéteis Explosivos de Precisão', grau: 5 }, { texto: 'Controla a Intensidade da Carga (do Estalo à Detonação)', grau: 5 }, { texto: 'Carrega Objetos Grandes (Pilares, Veículos, Paredes Inteiras)', grau: 5 }, { texto: 'Carga Adiada com Detonação Cronometrada', grau: 5 }, { texto: 'Desvio de Trajetória em Pleno Voo (Cartas Curvam no Ar)', grau: 5 }, { texto: 'Arremesso Simultâneo de Múltiplas Cartas Carregadas', grau: 5 }, { texto: 'Cajado Bo Extensível como Arma de Combate Próximo', grau: 5 }, { texto: 'Acrobacia de Nível Olímpico em Combate e Fuga', grau: 5 }, { texto: 'Precisão de Arremesso Letal a Longa Distância', grau: 5 }], frq: [{ texto: 'Olhos Sensíveis à Luz', grau: 2 }, { texto: 'Vício em Apostas', grau: 2 }] },
    ]
  },
  'Psylocke': {
    cards: [
      { nome: 'Espada Psiônica', pod: [0, 1], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Ninja Psi', pod: [2, 3], frq: [{ texto: 'Corpo Trocado com Kwannon', grau: 2 }] },
      { nome: 'Guerreira Silenciosa', pod: [{ texto: 'Determinação Fria', grau: 3 }], frq: [{ texto: 'Passado na Mão', grau: 2 }] },
      { nome: 'Aristocrata Britânica', pod: [{ texto: 'Herdeira da Família Braddock', grau: 3 }, { texto: 'Irmã do Capitão Britânia', grau: 3 }, { texto: 'Educação de Elite', grau: 2 }], frq: [{ texto: 'Fardo da Nobreza', grau: 2 }] },
      { nome: 'Corpo de Kwannon', pod: [{ texto: 'Artes Marciais de Elite Multi-Estilo', grau: 5 }, { texto: 'Telepatia Focada em Combate Cirúrgico', grau: 5 }, { texto: 'Lâmina Psiônica Manifesta da Própria Mente', grau: 5 }, { texto: 'Corta Vínculos Psíquicos e Mágicos com a Lâmina', grau: 5 }, { texto: 'Sombras e Furtividade de Nível Ninja', grau: 4 }, { texto: 'Precognição de Combate por Frações de Segundo', grau: 4 }, { texto: 'Katana Física como Extensão da Lâmina Mental', grau: 4 }, { texto: 'Projeta a Lâmina Psiônica à Distância', grau: 4 }, { texto: 'Reflexos Aprimorados por Treinamento da Mão', grau: 4 }, { texto: 'Bloqueia Ataques Psíquicos com a Própria Lâmina', grau: 4 }], frq: [{ texto: 'Identidade Fragmentada', grau: 3 }, { texto: 'Memórias de Duas Vidas', grau: 3 }] },
    ]
  },
  'Bishop': {
    cards: [
      { nome: 'Absorção de Energia', pod: [0, 1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'XSE', pod: [2], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Sobrevivente do Futuro', pod: [{ texto: 'Instinto de Sobrevivência', grau: 4 }], frq: [{ texto: 'Obsessão com a Segurança', grau: 2 }, { texto: 'Pesa o Futuro que Perdeu', grau: 2 }] },
      { nome: 'Redirecionamento de Energia', pod: [{ texto: 'Absorve Qualquer Forma de Energia (Cinética, Térmica, Elétrica, Cósmica)', grau: 5 }, { texto: 'Redireciona Energia Absorvida em Rajadas Devastadoras', grau: 5 }, { texto: 'Imune a Danos de Projéteis e Armas de Energia', grau: 5 }, { texto: 'Carrega Armas Convencionais com Energia Absorvida', grau: 5 }, { texto: 'Sobrecarga Deliberada Gera Explosão de Área', grau: 5 }, { texto: 'Absorve Ataques de Múltiplas Fontes Simultaneamente', grau: 5 }, { texto: 'Redistribui Energia Absorvida para Fortalecer o Próprio Corpo', grau: 5 }, { texto: 'Absorve Radiação e Energia Cósmica de Nível Extremo', grau: 5 }, { texto: 'Canaliza Energia Absorvida Através do Próprio Corpo Sem Dano', grau: 5 }, { texto: 'Detecta Fontes de Energia à Distância Antes do Impacto', grau: 5 }], frq: [{ texto: 'Limite de Absorção', grau: 2 }, { texto: 'Pode Sobrecarregar-se Além do Próprio Controle', grau: 3 }] },
      { nome: 'Caçador de Mutantes do Futuro', pod: [{ texto: 'Rastreamento Temporal', grau: 3 }, { texto: 'Conhecimento de Eventos Futuros', grau: 3 }, { texto: 'Táticas da XSE', grau: 3 }], frq: [{ texto: 'Paradoxo Temporal', grau: 2 }, { texto: 'Dificuldade de Confiar no Presente', grau: 2 }] },
    ]
  },
  'Jubileu': {
    cards: [
      { nome: 'Plasmóides', pod: [{ texto: 'Cria explosões coloridas de energia pirotécnica', grau: 3 }, { texto: 'Usa luz e som para cegar ou desorientar alvos', grau: 3 }, { texto: 'Controla a intensidade para ataque ou distração', grau: 3 }], frq: [{ texto: 'Poder perde utilidade furtiva quando chama atenção demais', grau: 2 }] },
      { nome: 'Sobrevivente e X-Man', pod: [{ texto: 'Mantém moral e trabalho em equipe em crises', grau: 3 }, { texto: 'Treinamento prático de campo com os X-Men', grau: 3 }, { texto: 'Improvisa sob pressão', grau: 3 }], frq: [{ texto: 'Traumas de perdas e períodos como vampira ainda a afetam', grau: 2 }] },
      { nome: 'Vínculo com Wolverine', pod: [{ texto: 'Relação de confiança construída com Logan', grau: 3 }], frq: [{ texto: 'Tende a esconder insegurança atrás de humor', grau: 2 }] }
    ]
  },
  'Polaris': {
    cards: [
      { nome: 'Magnetismo', pod: [0, 1], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Filha de Magneto', pod: [3], frq: [{ texto: 'Instabilidade Mental', grau: 3 }, { texto: 'Identidade Incerta', grau: 2 }] },
      { nome: 'Mestra do Magnetismo', pod: [{ texto: 'Controle Fino de Metais', grau: 5 }, { texto: 'Manipulação de Sangue Ferroso', grau: 4 }, { texto: 'Campo de Força Pessoal', grau: 4 }, { texto: 'Voo Magnético', grau: 3 }], frq: [{ texto: 'Poder Ligado ao Estado Emocional', grau: 3 }] },
      { nome: 'Líder da X-Factor', pod: [{ texto: 'Tática de Campo', grau: 4 }, { texto: 'Lealdade à Equipe', grau: 3 }], frq: [{ texto: 'Sombra do Pai', grau: 3 }, { texto: 'Histórico de Colapso Mental', grau: 2 }] },
      { nome: 'Magnetismo Planetário', pod: [{ texto: 'Manipula o Campo Magnético da Terra em Escala Planetária', grau: 5 }, { texto: 'Controla Minérios e Metais em Escala Continental', grau: 5 }, { texto: 'Gera Aurora Boreal Artificial ao Redor de Si', grau: 5 }, { texto: 'Escudo Magnético Atmosférico Contra Ataques de Energia', grau: 5 }, { texto: 'Voo Orbital Sustentado por Manipulação Magnética', grau: 5 }, { texto: 'Manipulação de Sangue Ferroso em Alvos Vivos', grau: 5 }, { texto: 'Desvia Mísseis e Projéteis Metálicos a Longa Distância', grau: 5 }, { texto: 'Inverte a Polaridade Magnética de Objetos em Área', grau: 5 }, { texto: 'Detecta Depósitos de Metal em Escala Geológica', grau: 5 }, { texto: 'Suspende Estruturas Metálicas Massivas no Ar', grau: 5 }], frq: [{ texto: 'Exaustão Mental Severa', grau: 3 }, { texto: 'Instabilidade Emocional Amplifica o Poder de Forma Descontrolada', grau: 3 }] },
    ]
  },
  'Havok': {
    cards: [
      { nome: 'Anéis de Plasma', pod: [0, 1], frq: [{ texto: 'Controle Instável', grau: 2 }] },
      { nome: 'Liderança dos X-Men', pod: [2], frq: [{ texto: 'Síndrome do Irmão Famoso', grau: 2 }] },
      { nome: 'Plasma Cósmico', pod: [{ texto: 'Absorção de Energia Cósmica', grau: 5 }, { texto: 'Descarga de Plasma Concentrada', grau: 4 }, { texto: 'Imune a Poderes de Ciclope', grau: 4 }, { texto: 'Sobrecarga Destrutiva', grau: 3 }], frq: [{ texto: 'Dificuldade em Conter o Poder', grau: 3 }] },
      { nome: 'Irmão do Líder', pod: [{ texto: 'Liderança Relutante', grau: 3 }, { texto: 'Lealdade Fraterna', grau: 3 }], frq: [{ texto: 'Sempre na Sombra de Scott', grau: 3 }, { texto: 'Identidade Própria em Construção', grau: 2 }] },
      { nome: 'Mestre do Plasma', pod: [{ texto: 'Geração de Plasma Solar em Escala Devastadora', grau: 5 }, { texto: 'Projeção de Rajadas Orbitais de Longo Alcance', grau: 5 }, { texto: 'Absorção de Radiação Estelar Como Fonte de Poder', grau: 5 }, { texto: 'Criação de Estrelas Artificiais em Miniatura', grau: 5 }, { texto: 'Imunidade Total a Calor e Radiação Extremos', grau: 5 }, { texto: 'Voo Sustentado por Propulsão de Plasma', grau: 5 }, { texto: 'Controle de Área com Anéis Concêntricos de Energia Cósmica', grau: 5 }, { texto: 'Rajadas Capazes de Perfurar Blindagem de Nível Militar', grau: 5 }, { texto: 'Modulação de Intensidade Entre Aviso e Aniquilação Total', grau: 5 }, { texto: 'Imune à Rajada Óptica de Ciclope (Física de Plasma Inversa)', grau: 5 }], frq: [{ texto: 'Risco de Supernova Interna', grau: 3 }, { texto: 'Controle Instável Sob Estresse Emocional', grau: 3 }] },
    ]
  },
  'X-23': {
    cards: [
      { nome: 'Garras de Adamantium', pod: [0, 1], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Assassina Condicionada', pod: [2], frq: [{ texto: 'Gatilho de Berserk', grau: 4 }, { texto: 'Trauma de Condicionamento', grau: 3 }] },
      { nome: 'Mais que uma Arma', pod: [{ texto: 'Identidade em Construção', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Gatilho Químico', pod: [{ texto: 'Feromônio Desencadeia Fúria', grau: 5 }, { texto: 'Perde Controle Total', grau: 4 }, { texto: 'Cheiro Específico Ativa', grau: 4 }], frq: [{ texto: 'Inimigos Usam Gatilho', grau: 4 }, { texto: 'Medo de Machucar Amigos', grau: 3 }] },
      { nome: 'Clone de Wolverine', pod: [{ texto: 'Fator de Cura Similar', grau: 4 }, { texto: 'Duas Garras por Mão', grau: 4 }, { texto: 'Garra no Pé', grau: 3 }, { texto: 'Sem Adamantium no Esqueleto', grau: 3 }], frq: [{ texto: 'Vista como Propriedade', grau: 3 }, { texto: 'Busca Humanidade', grau: 3 }] },
      { nome: 'Fator de Cura e Garras Cirúrgicas', pod: [{ texto: 'Regeneração Instantânea de Órgãos e Ossos Fraturados', grau: 5 }, { texto: 'Garras Retráteis Duplas em Cada Mão, Mais Uma no Pé', grau: 5 }, { texto: 'Cicatrização Neutraliza Quase Todo Veneno e Sedativo', grau: 5 }, { texto: 'Sobrevive a Ferimentos Letais para Qualquer Humano', grau: 5 }, { texto: 'Corte Cirúrgico Preciso — Nenhum Movimento Desperdiçado', grau: 5 }, { texto: 'Controle Consciente Sobre o Instinto Assassino, ao Contrário de Logan', grau: 5 }, { texto: 'Envelhecimento Retardado pelo Fator de Cura', grau: 4 }, { texto: 'Regeneração Sustenta Combate Prolongado sem Fadigar', grau: 4 }, { texto: 'Cicatrização Rápida Mesmo de Membros Decepados', grau: 5 }, { texto: 'Sentidos Apurados Rastreiam Alvos por Cheiro e Som', grau: 4 }], frq: [{ texto: 'Fator de Cura Não Bloqueia a Dor — Sente Tudo', grau: 3 }, { texto: 'Garras de Adamantium São Metal Detectável', grau: 2 }] },
    ]
  },
  'Forge': {
    cards: [
      { nome: 'Gênio Inventor Mutante', pod: [{ texto: 'Intui como criar dispositivos para um problema específico', grau: 4 }, { texto: 'Projeta armamento, próteses e sensores avançados', grau: 4 }, { texto: 'Adapta sucata e tecnologia alienígena em campo', grau: 3 }], frq: [{ texto: 'Invenções exigem tempo, materiais e podem ter consequências imprevistas', grau: 3 }] },
      { nome: 'Xamã Cheyenne', pod: [{ texto: 'Usa conhecimento espiritual Cheyenne em rituais e proteção', grau: 3 }, { texto: 'Reconhece ameaças místicas além da tecnologia', grau: 3 }, { texto: 'Combina ciência e tradição quando necessário', grau: 3 }], frq: [{ texto: 'Conflito entre responsabilidade científica e crenças pessoais', grau: 2 }] },
      { nome: 'Peso do Neutralizador', pod: [{ texto: 'Conhece os riscos éticos de tecnologia anti-mutante', grau: 3 }], frq: [{ texto: 'Culpa por criar uma arma usada contra mutantes', grau: 4 }] },
    ]
  },
  'Dazzler': {
    cards: [
      { nome: 'Transdução de Som em Luz', pod: [{ texto: 'Converte som ambiente em energia luminosa', grau: 4 }, { texto: 'Projeta clarões, lasers e padrões de luz sólidos', grau: 4 }, { texto: 'Modula cor e intensidade para desorientar ou cegar', grau: 3 }], frq: [{ texto: 'Sem som disponível, sua reserva de energia é limitada', grau: 3 }] },
      { nome: 'Performance que Move Multidões', pod: [{ texto: 'Cantora experiente que usa palco e carisma para mobilizar pessoas', grau: 3 }, { texto: 'Lê a energia de uma plateia e mantém presença sob pressão', grau: 3 }, { texto: 'Transforma uma apresentação em distração ou sinalização tática', grau: 3 }], frq: [{ texto: 'A vida pública expõe amigos e familiares a atenção indesejada', grau: 2 }] },
      { nome: 'Heroína de Campo', pod: [{ texto: 'Improvisa com fontes sonoras, iluminação e o terreno urbano', grau: 3 }, { texto: 'Experiência ao lado dos X-Men em evacuações e crises', grau: 3 }, { texto: 'Controla a intensidade para evitar ferir civis e aliados', grau: 3 }], frq: [{ texto: 'Conter dano colateral reduz suas opções em combate', grau: 2 }] }
    ]
  },
  'Banshee': {
    cards: [
      { nome: 'Grito Sônico', pod: [{ texto: 'Emite grito sônico capaz de derrubar e desorientar', grau: 4 }, { texto: 'Modula frequência para concussão, ruptura ou confusão', grau: 3 }, { texto: 'Usa ondas sonoras para defesa de área', grau: 3 }], frq: [{ texto: 'Garganta lesionada ou esforço prolongado limita o poder', grau: 3 }] },
      { nome: 'Voo Sônico', pod: [{ texto: 'Voa surfando as próprias ondas sonoras', grau: 4 }, { texto: 'Cria barreiras vibratórias de proteção', grau: 3 }, { texto: 'Percebe vibrações e ecos no ambiente', grau: 3 }], frq: [{ texto: 'Ambientes fechados aumentam o risco para aliados', grau: 2 }] },
      { nome: 'Interpol e Geração X', pod: [{ texto: 'Investigação internacional e liderança de jovens mutantes', grau: 3 }, { texto: 'Experiência de comando em crises', grau: 3 }, { texto: 'Atua como mentor e pai de Siryn', grau: 3 }], frq: [{ texto: 'Luto e responsabilidade familiar pesam em suas decisões', grau: 2 }] },
    ]
  },
  'Cecilia Reyes': {
    cards: [
      { nome: 'Campo de Força', pod: [0], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Médica Relutante', pod: [{ texto: 'Doutora de Elite', grau: 4 }, { texto: 'Queria Vida Normal, Não Heroína', grau: 3 }], frq: [{ texto: 'Relutância em Ser X-Men', grau: 2 }] }
    ]
  },
  'Lockheed': {
    cards: [
      { nome: 'Dragão Pequeno', pod: [0, 1], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Companheiro Fiel', pod: [2], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] }
    ]
  },
  'Sage': {
    cards: [
      { nome: 'Computador Humano', pod: [0, 1], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Agente Infiltrada', pod: [2], frq: [{ texto: 'Desconectada Emocionalmente', grau: 2 }] },
      { nome: 'Superprocessadora Estratégica', pod: [{ texto: 'Calcula Probabilidades de Batalha em Tempo Real', grau: 4 }, { texto: 'Invade Qualquer Sistema Computacional Sem Ferramentas', grau: 4 }, { texto: 'Recall Perfeito de Cada Missão e Rosto Já Visto', grau: 4 }], frq: [{ texto: 'Sobrecarga de Processamento sob Estresse Emocional', grau: 3 }] }
    ]
  },
  'Omerta': {
    cards: [
      { nome: 'Campo de Força Pessoal', pod: [0], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Lei do Silêncio', pod: [1], frq: [{ texto: 'Passado Mafioso', grau: 2 }] }
    ]
  },
  'Wraith (Hector Rendoza)': {
    cards: [
      { nome: 'Teleporte', pod: [0], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Fantasma', pod: [1], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] }
    ]
  },
  'Stacy X': {
    cards: [
      { nome: 'Feromônios', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Trabalhadora do Sexo', pod: [1], frq: [{ texto: 'Subestimada Pelos Heróis', grau: 2 }] }
    ]
  },
  'Lifeguard': {
    cards: [
      { nome: 'Adaptação Reativa', pod: [0], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Protetora Instintiva', pod: [1], frq: [{ texto: 'Conflitos Internos', grau: -2 }] }
    ]
  },
  'Slipstream': {
    cards: [
      { nome: 'Portal Dimensional', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Irmão de Lifeguard', pod: [1], frq: [{ texto: 'Inseguro', grau: 2 }] }
    ]
  },
  'Red Lotus': {
    cards: [
      { nome: 'Lâminas Psíquicas', pod: [0], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Ninja Chinês', pod: [1], frq: [{ texto: 'Passado Criminoso', grau: 2 }] }
    ]
  },

  // ===== GERAÇÃO X =====
'Domino': {
    cards: [
      { nome: 'Sorte Improvável', pod: [0, 1], frq: [{ texto: 'Sorte Falha em Perigo Extremo', grau: 2 }] },
      { nome: 'Mercenária Albina', pod: [2, 3], frq: [{ texto: 'Trauma do Projeto Armageddon', grau: 2 }] },
      { nome: 'Aliada Incondicional', pod: [{ texto: 'Coração de Mercenária', grau: 3 }], frq: [{ texto: 'Poder é Subconsciente', grau: 3 }] },
      { nome: 'Campo de Probabilidade', pod: [{ texto: 'Distorce a Probabilidade ao Seu Redor em Favor Próprio', grau: 5 }, { texto: 'Projéteis e Golpes Inimigos Desviam Sozinhos por "Coincidência"', grau: 5 }, { texto: 'Funciona Melhor Sob Instinto — Falha Quando Ela Tenta Planejar', grau: 4 }], frq: [{ texto: 'Não Controla Conscientemente', grau: 3 }, { texto: 'Efeito Borboleta Imprevisível', grau: 2 }] },
      { nome: 'Parceira de Cable', pod: [{ texto: 'Confiança Absoluta em Nathan', grau: 3 }, { texto: 'Ex-Membro X-Force', grau: 3 }], frq: [{ texto: 'Sorte Não Protege Amigos', grau: 2 }] },
    ]
  },
  'Shatterstar': {
    cards: [
      { nome: 'Espadas Dimensional', pod: [0, 2], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Velocidade Sobre-humana', pod: [1], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Guerreiro de Outro Mundo', pod: [3], frq: [{ texto: 'Sem Conceito de Emoção Humana', grau: 2 }] },
      { nome: 'Nascido em Mojoworld', pod: [{ texto: 'Gladiador Geneticamente Engenhado', grau: 4 }, { texto: 'Portais Dimensionais via Espadas', grau: 4 }, { texto: 'Aprendizado Acelerado de Combate', grau: 3 }, { texto: 'Sangue de Longshot', grau: 3 }], frq: [{ texto: 'Fugitivo de Mojo', grau: 2 }, { texto: 'Programado para Matar', grau: 2 }] },
      { nome: 'Parceiro de Rictor', pod: [{ texto: 'Primeiro Amor Verdadeiro', grau: 3 }, { texto: 'Equilíbrio Emocional', grau: 3 }, { texto: 'Luta em Dupla Sincronizada', grau: 3 }], frq: [{ texto: 'Medo de Perder Outro Amor', grau: 2 }] },
      { nome: 'Duelista Supremo das Lâminas Gêmeas', pod: [{ texto: 'Combos com Duas Lâminas Simultâneas Sem Erro', grau: 5 }, { texto: 'Corta Quase Qualquer Material Conhecido', grau: 5 }, { texto: 'Reflexos Calibrados Geneticamente para Combate de Arena', grau: 5 }, { texto: 'Lê e Antecipa Padrões de Ataque em Tempo Real', grau: 5 }, { texto: 'Abre Portais Dimensionais no Fio das Espadas em Pleno Duelo', grau: 5 }, { texto: 'Combate Simultâneo Contra Múltiplos Oponentes Sem Perder Ritmo', grau: 4 }, { texto: 'Precisão Cirúrgica Mesmo em Velocidade Máxima', grau: 4 }, { texto: 'Décadas de Combos Catalogados na Memória de Gladiador', grau: 4 }, { texto: 'Rivaliza Espadachins Lendários em Duelo Direto', grau: 5 }, { texto: 'Adapta Estilo de Luta a Qualquer Adversário em Segundos', grau: 4 }], frq: [{ texto: 'Sem Espadas, Perde Grande Parte do Repertório Ofensivo', grau: 3 }, { texto: 'Overconfiança em Duelo Direto', grau: 2 }] },
    ]
  },
  'Rictor': {
    cards: [
      { nome: 'Controle Sísmico', pod: [{ texto: 'Gera ondas sísmicas e vibrações pelo solo', grau: 4 }, { texto: 'Localiza movimentos e cavidades pela leitura de tremores', grau: 3 }, { texto: 'Direciona abalos para abrir passagem ou derrubar cobertura', grau: 3 }], frq: [{ texto: 'Usar o poder em estruturas frágeis pode colocar civis em risco', grau: 3 }] },
      { nome: 'Sobrevivente da X-Force', pod: [{ texto: 'Experiência em infiltração e missões de guerrilha', grau: 3 }, { texto: 'Age bem em equipes pequenas e sob pressão', grau: 3 }, { texto: 'Mantém disciplina de campo mesmo em terreno hostil', grau: 3 }], frq: [{ texto: 'Traumas de operações passadas afetam seu julgamento', grau: 2 }] },
      { nome: 'Laço com Shatterstar', pod: [{ texto: 'Confiança e coordenação construídas em combate ao lado de Shatterstar', grau: 3 }, { texto: 'Motivação para proteger a família que escolheu', grau: 3 }, { texto: 'Capacidade de se abrir emocionalmente após anos de isolamento', grau: 3 }], frq: [{ texto: 'Ameaças a Shatterstar podem desestabilizá-lo', grau: 3 }] },
    ]
  },
  'Siryn': {
    cards: [
      { nome: 'Grito Sônico', pod: [{ texto: 'Emite gritos concussivos que derrubam e desorientam alvos', grau: 4 }, { texto: 'Modula frequência para romper objetos ou atordoar sem matar', grau: 3 }, { texto: 'Usa eco e vibração para perceber o espaço ao redor', grau: 3 }], frq: [{ texto: 'Esforço prolongado lesa sua garganta e diminui o controle', grau: 3 }] },
      { nome: 'Voo por Ondas Sonoras', pod: [{ texto: 'Voa usando suas próprias ondas sonoras como propulsão', grau: 4 }, { texto: 'Ergue barreiras vibratórias de curta duração', grau: 3 }, { texto: 'Reposiciona aliados com rajadas controladas', grau: 3 }], frq: [{ texto: 'Em ambientes fechados, suas ondas podem atingir aliados', grau: 3 }] },
      { nome: 'Detetive e Líder de Equipe', pod: [{ texto: 'Treinamento investigativo e experiência policial', grau: 3 }, { texto: 'Lidera em crises sem abandonar civis', grau: 3 }, { texto: 'Reconhece os limites e o legado do pai sem imitá-lo cegamente', grau: 3 }], frq: [{ texto: 'Luto e histórico de alcoolismo exigem vigilância constante', grau: 3 }] },
    ]
  },
  'Madrox': {
    cards: [
      { nome: 'Duplicação Cinética', pod: [{ texto: 'Absorve impacto para criar duplicatas de si mesmo', grau: 4 }, { texto: 'Envia duplicatas para tarefas simultâneas e perigosas', grau: 4 }, { texto: 'Reintegra memórias e habilidades aprendidas por uma duplicata', grau: 4 }], frq: [{ texto: 'Duplicatas podem desenvolver vontades e vidas próprias', grau: 3 }] },
      { nome: 'Investigador da X-Factor', pod: [{ texto: 'Conduz investigações de desaparecimentos e casos mutantes', grau: 3 }, { texto: 'Distribui duplicatas para vigilância, entrevistas e busca de pistas', grau: 3 }, { texto: 'Monta conclusões cruzando experiências de várias cópias', grau: 3 }], frq: [{ texto: 'O volume de memórias reintegradas pode sobrecarregar sua identidade', grau: 3 }] },
      { nome: 'Família Multiplicada', pod: [{ texto: 'Conhece a responsabilidade de trazer duplicatas de volta em segurança', grau: 3 }, { texto: 'Coopera com a X-Factor como multiplicador de equipe', grau: 3 }, { texto: 'Adapta planos quando uma cópia descobre informação nova', grau: 3 }], frq: [{ texto: 'Perdas de duplicatas carregam peso emocional real', grau: 2 }] }
    ]
  },
  'Strong Guy': {
    cards: [
      { nome: 'Absorção Cinética', pod: [{ texto: 'Converte impacto recebido em massa e força sobre-humanas', grau: 4 }, { texto: 'Protege aliados absorvendo golpes que os derrubariam', grau: 3 }, { texto: 'Descarrega força acumulada em golpes e arremessos', grau: 3 }], frq: [{ texto: 'Energia acumulada demais causa dano cardíaco e degrada seu corpo', grau: 4 }] },
      { nome: 'Músculo da X-Factor', pod: [{ texto: 'Experiência como linha de frente e escudo da equipe', grau: 3 }, { texto: 'Usa humor para manter a equipe coesa sob pressão', grau: 3 }, { texto: 'Sabe quando recuar para não transformar força em imprudência', grau: 3 }], frq: [{ texto: 'Usa humor para esconder depressão e insegurança', grau: 3 }] },
      { nome: 'Músico de Turnê', pod: [{ texto: 'Tecladista profissional e performer acostumado a multidões', grau: 3 }, { texto: 'Mantém contatos e logística de estrada para a equipe', grau: 3 }, { texto: 'Transforma presença pública em distração quando necessário', grau: 3 }], frq: [{ texto: 'A fama torna sua vida civil difícil de conciliar com missões', grau: 2 }] }
    ]
  },
  'Scanner': {
    cards: [
      { nome: 'Varredura Psíquica', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Olhos que Tudo Veem', pod: [1], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },

  // ===== NOVATOS (Novos Mutantes + Geração X) =====
  'Cannonball': {
    cards: [
      { nome: 'Campo de Explosão', pod: [{ texto: 'Lança-se em alta velocidade como um projétil humano', grau: 4 }, { texto: 'Fica praticamente invulnerável enquanto está em explosão', grau: 4 }, { texto: 'Usa impacto e impulso para romper defesas ou resgatar aliados', grau: 3 }], frq: [{ texto: 'O campo exige movimento contínuo e perde eficácia quando para', grau: 3 }] },
      { nome: 'Líder dos Novos Mutantes', pod: [{ texto: 'Coordena jovens mutantes sob pressão', grau: 3 }, { texto: 'Toma decisões de resgate rapidamente', grau: 3 }, { texto: 'Mantém a equipe unida em crise', grau: 3 }], frq: [{ texto: 'Sente o peso de ser o irmão mais velho e líder', grau: 2 }] },
    ]
  },
  'Sunspot': {
    cards: [
      { nome: 'Absorção Solar', pod: [{ texto: 'Absorve luz solar para força e resistência sobre-humanas', grau: 4 }, { texto: 'Projeta energia solar em rajadas', grau: 3 }, { texto: 'Voa usando energia absorvida', grau: 3 }], frq: [{ texto: 'Reservas diminuem sem luz e sob gasto prolongado', grau: 3 }] },
      { nome: 'Roberto da Costa', pod: [{ texto: 'Recursos empresariais e contatos internacionais', grau: 3 }, { texto: 'Experiência como líder dos Novos Mutantes e Vingadores', grau: 3 }, { texto: 'Carisma competitivo em negociações', grau: 3 }], frq: [{ texto: 'Orgulho e impulsividade podem comprometer seu julgamento', grau: 2 }] },
    ]
  },
  'Mirage': {
    cards: [
      { nome: 'Tecer Medos e Desejos', pod: [{ texto: 'Projeta o maior medo ou desejo de um alvo como ilusão convincente', grau: 4 }, { texto: 'Usa visões para interromper ataques ou abrir diálogo', grau: 3 }, { texto: 'Percebe a carga emocional que guia uma ilusão', grau: 3 }], frq: [{ texto: 'Forçar-se a tocar traumas alheios pode reabrir os seus', grau: 3 }] },
      { nome: 'Vínculo com Animais', pod: [{ texto: 'Comunica-se empaticamente com animais próximos', grau: 3 }, { texto: 'Encontra rastros e perigos com auxílio de animais', grau: 3 }, { texto: 'Acalma criaturas assustadas ou hostis', grau: 3 }], frq: [{ texto: 'Não controla animais; eles mantêm vontade própria', grau: 2 }] },
      { nome: 'Caminho de Valquíria', pod: [{ texto: 'Reconhece presságios de morte e conduz espíritos quando seu vínculo está ativo', grau: 3 }, { texto: 'Combatente treinada com arco, flecha e tática de campo', grau: 3 }, { texto: 'Mentora firme dos Novos Mutantes', grau: 3 }], frq: [{ texto: 'Suas experiências com morte e perda pesam sobre suas decisões', grau: 3 }] }
    ]
  },
  'Wolfsbane': {
    cards: [
      { nome: 'Metamorfose Lupina', pod: [{ texto: 'Alterna entre formas humana, lupina e híbrida', grau: 4 }, { texto: 'Ganha sentidos, velocidade e resistência de lobo', grau: 4 }, { texto: 'Rastreia pessoas por cheiro e se move em terreno selvagem', grau: 3 }], frq: [{ texto: 'A forma plena reduz seu autocontrole quando está sob estresse', grau: 3 }] },
      { nome: 'Instinto de Matilha', pod: [{ texto: 'Protege aliados com lealdade feroz e leitura instintiva de perigo', grau: 3 }, { texto: 'Trabalha bem em resgates e reconhecimento de campo', grau: 3 }, { texto: 'Reconhece estados emocionais por cheiro e comportamento', grau: 3 }], frq: [{ texto: 'Tende a se culpar quando acredita ter falhado com sua matilha', grau: 2 }] },
      { nome: 'Fé e Sobrevivência', pod: [{ texto: 'Disciplina religiosa que sustenta sua compaixão', grau: 3 }, { texto: 'Resistência construída por anos entre os Novos Mutantes e X-Factor', grau: 3 }, { texto: 'Consegue escolher misericórdia mesmo após violência e perda', grau: 3 }], frq: [{ texto: 'Vergonha e conflito religioso sobre sua natureza podem ser explorados', grau: 3 }] }
    ]
  },
  'Karma': {
    cards: [
      { nome: 'Possessão Mental', pod: [0, 1], frq: [{ texto: 'Possuída pelo Rei das Sombras', grau: 2 }] },
      { nome: 'Sobrevivente Vietnamita', pod: [2], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Família Acima de Tudo', pod: [3], frq: [{ texto: 'Amputada (Perna)', grau: 1 }] },
      { nome: 'Consciência Itinerante', pod: [{ texto: 'Possui Qualquer Ser Vivo por Contato Visual', grau: 5 }, { texto: 'Controla o Corpo Possuído com Precisão Motora Total', grau: 5 }, { texto: 'Salta de Hospedeiro em Hospedeiro em Cadeia', grau: 4 }, { texto: 'Retém Sentidos e Memórias do Hospedeiro Enquanto Possui', grau: 4 }, { texto: 'Projeção Astral Deixa o Corpo Vazio Vulnerável', grau: 4 }, { texto: 'Divide a Consciência entre Vários Corpos Possuídos', grau: 4 }, { texto: 'Imune a Contra-Possessão', grau: 4 }, { texto: 'Sente Mentes Próximas para Escolher Alvos', grau: 3 }, { texto: 'Possui Não-Humanos e Criaturas Alienígenas', grau: 4 }, { texto: 'Usa Corpos Possuídos como Escudos Humanos Involuntários', grau: 4 }], frq: [{ texto: 'Corpo Original Fica Catatônico e Indefeso', grau: 4 }, { texto: 'Perde o Controle se o Hospedeiro Resiste com Vontade Forte', grau: 3 }] }
    ]
  },
  'Magma': {
    cards: [
      { nome: 'Magma Vivo', pod: [{ texto: 'Transforma o corpo em rocha incandescente', grau: 4 }, { texto: 'Controla lava e calor em escala local', grau: 4 }, { texto: 'Abre fissuras e molda terreno vulcânico', grau: 3 }], frq: [{ texto: 'Poder destrutivo torna combate perto de civis perigoso', grau: 3 }] },
      { nome: 'Nobre de Nova Roma', pod: [{ texto: 'Conhece política e etiqueta de Nova Roma', grau: 3 }, { texto: 'Defende seu povo com firmeza', grau: 3 }, { texto: 'Aprende a navegar o mundo moderno com os X-Men', grau: 3 }], frq: [{ texto: 'Ingenuidade cultural pode ser explorada fora de Nova Roma', grau: 2 }] },
    ]
  },
  'Cypher': {
    cards: [
      { nome: 'Linguagem Universal', pod: [{ texto: 'Compreende qualquer idioma falado, escrito ou codificado', grau: 4 }, { texto: 'Lê linguagem corporal e padrões de comunicação', grau: 3 }, { texto: 'Traduz interfaces, códigos e culturas desconhecidas', grau: 3 }], frq: [{ texto: 'Não possui força ou durabilidade sobre-humana para confronto direto', grau: 3 }] },
      { nome: 'Chave de Krakoa', pod: [{ texto: 'Comunica-se com sistemas vivos e linguagens não humanas', grau: 4 }, { texto: 'Decifra tecnologia alienígena e dados complexos', grau: 3 }, { texto: 'Encontra soluções por interpretação de padrões', grau: 3 }], frq: [{ texto: 'Entender uma linguagem não garante controlar quem a usa', grau: 2 }] },
    ]
  },
  'Boomer': {
    cards: [
      { nome: 'Bombas de Plasma', pod: [{ texto: 'Cria esferas de energia plasmática que explodem ao impacto', grau: 4 }, { texto: 'Regula força e ricochete para abrir passagem ou afastar inimigos', grau: 3 }, { texto: 'Usa o próprio impulso explosivo para acrobacias e fuga', grau: 3 }], frq: [{ texto: 'Explosões em área exigem cuidado constante com civis e aliados', grau: 3 }] },
      { nome: 'Tabitha Smith', pod: [{ texto: 'Sobrevivente independente que improvisa sob pressão', grau: 3 }, { texto: 'Experiência com X-Force e equipes mutantes jovens', grau: 3 }, { texto: 'Humor irreverente que desarma tensão social', grau: 3 }], frq: [{ texto: 'Impulsividade e desconfiança de autoridade podem dividir a equipe', grau: 3 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Atitude Rebelde', pod: [2], frq: [{ texto: 'Chamariz de Problemas', grau: 2 }, { texto: 'Impulsiva', grau: 2 }] }
    ]
  },
  'Chamber': {
    cards: [
      { nome: 'Fornalha Psíquica', pod: [0], frq: [{ texto: 'Rosto e Peito Destruídos pelo Poder', grau: 2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Estrangeiro', pod: [1], frq: [{ texto: 'Depressão e Isolamento', grau: 2 }] }
    ]
  },
  'Husk': {
    cards: [
      { nome: 'Descamação', pod: [0], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Guthrie Determinada', pod: [1], frq: [{ texto: 'Sombra dos Irmãos Mais Famosos', grau: 2 }] }
    ]
  },
  'M (Monet St. Croix)': {
    cards: [
      { nome: 'Penteto Perfeito', pod: [0, 1, 2, 3], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Herdeira Bilionária', pod: [4], frq: [{ texto: 'Arrogância Refinada', grau: 3 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Exploração de Ambiente', grau: 3 }, { texto: 'Trabalho em Equipe', grau: 2 }, { texto: 'Treinamento Intensivo', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Trauma de Penance', pod: [], frq: [{ texto: 'Anos como Penance Muda sem Voz', grau: 2 }, { texto: 'Pensamentos Suicidas Diários', grau: 2 }] },
      { nome: 'Pacote Mutante Perfeito em Pleno Poder', pod: [{ texto: 'Voo Supersônico Sustentado', grau: 5 }, { texto: 'Força Sobre-Humana Rivaliza os Colossos da Equipe', grau: 5 }, { texto: 'Invulnerabilidade a Impactos, Fogo e Balas', grau: 5 }, { texto: 'Telepatia de Alcance Considerável', grau: 4 }, { texto: 'Inteligência Sobre-Humana — Domina Ciências em Minutos', grau: 5 }, { texto: 'Velocidade e Reflexos Muito Acima do Pico Humano', grau: 4 }, { texto: 'Resistência que Ignora Fadiga em Combate Prolongado', grau: 4 }, { texto: 'Audição e Visão Aguçadas Além do Espectro Humano', grau: 4 }, { texto: 'Domina Múltiplos Idiomas e Disciplinas Quase Instantaneamente', grau: 4 }, { texto: 'Combina Força, Voo e Telepatia em Combate Simultâneo', grau: 5 }], frq: [{ texto: 'Arrogância Sabota Trabalho em Equipe', grau: 3 }, { texto: 'Overload Sensorial em Ambientes Caóticos', grau: 2 }] }
    ]
  },
  'Armor': {
    cards: [
      { nome: 'Armadura Psíquica', pod: [{ texto: 'Projeta uma armadura psíquica gigante que absorve impactos', grau: 4 }, { texto: 'Amplia força e alcance físico através da forma astral', grau: 4 }, { texto: 'Usa a armadura para proteger aliados e bloquear passagens', grau: 3 }], frq: [{ texto: 'Danos à armadura reverberam em Hisako e exigem concentração', grau: 3 }] },
      { nome: 'Legado de Hisako Ichiki', pod: [{ texto: 'Disciplina e coragem para agir mesmo com medo', grau: 3 }, { texto: 'Experiência de equipe com os Jovens X-Men', grau: 3 }, { texto: 'Lidera pela proteção, não pela força bruta', grau: 3 }], frq: [{ texto: 'O receio de falhar com sua família e equipe pode fazê-la hesitar', grau: 2 }] }
    ]
  },
  'Surge': {
    cards: [
      { nome: 'Surto Bioelétrico', pod: [{ texto: 'Absorve eletricidade e a descarrega em rajadas incapacitantes', grau: 4 }, { texto: 'Canaliza energia pelos braceletes para evitar sobrecarga', grau: 4 }, { texto: 'Usa impulsos elétricos para velocidade e reflexos breves', grau: 3 }], frq: [{ texto: 'Sem os reguladores, o acúmulo de energia causa dor e descargas involuntárias', grau: 3 }] },
      { nome: 'Liderança dos Novos X-Men', pod: [{ texto: 'Toma decisões rápidas para proteger alunos mais jovens', grau: 3 }, { texto: 'Coordena poderes diversos em campo', grau: 3 }, { texto: 'Persistência construída após sobreviver sozinha em Tóquio', grau: 3 }], frq: [{ texto: 'Responsabilidade precoce e trauma familiar tornam-na dura demais consigo mesma', grau: 2 }] }
    ]
  },
  'Elixir': {
    cards: [
      { nome: 'Biocinese', pod: [0, 1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Combate Corporal', grau: 3 }, { texto: 'Estratégia', grau: 2 }, { texto: 'Vontade de Ferro', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Exploração de Ambiente', grau: 3 }, { texto: 'Trabalho em Equipe', grau: 2 }, { texto: 'Treinamento Intensivo', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Cura ou Morte', pod: [2], frq: [{ texto: 'Poder de Matar com Toque', grau: 3 }] },
      { nome: 'Toque que Cura ou Mata', pod: [{ texto: 'Cura Ferimentos Fatais com um Toque', grau: 5 }, { texto: 'Regenera Membros e Órgãos Perdidos', grau: 5 }, { texto: 'Reescreve a Biologia de Terceiros ao Toque', grau: 5 }, { texto: 'Concede ou Remove Habilidades Físicas Temporariamente', grau: 5 }, { texto: 'Desintegra Tecidos Vivos por Dentro Instantaneamente', grau: 5 }, { texto: 'Neutraliza Venenos, Doenças e Mutações Hostis', grau: 5 }, { texto: 'Acelera ou Reverte o Envelhecimento Celular', grau: 4 }, { texto: 'Sente a Estrutura Biológica de Qualquer Ser Vivo ao Redor', grau: 4 }, { texto: 'Reanima Tecido Morto por Curto Período', grau: 4 }, { texto: 'Potencial Latente Comparável aos Maiores Mutantes Ômega', grau: 5 }], frq: [{ texto: 'Cada Uso Letal Deixa Marca de Culpa Permanente', grau: 3 }, { texto: 'Pele Fica Dourada ou Negra ao Ativar — Zero Discrição', grau: 2 }] }
    ]
  },
  'Hellion': {
    cards: [
      { nome: 'Telecinesia', pod: [0, 1], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Combate Corporal', grau: 3 }, { texto: 'Estratégia', grau: 2 }, { texto: 'Vontade de Ferro', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Exploração de Ambiente', grau: 3 }, { texto: 'Trabalho em Equipe', grau: 2 }, { texto: 'Treinamento Intensivo', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Atitude de Líder', pod: [2], frq: [{ texto: 'Arrogância e Impulso', grau: 2 }] },
      { nome: 'Telecinese Ômega Desbloqueada', pod: [{ texto: 'Ergue e Arremessa Veículos e Estruturas Inteiras', grau: 5 }, { texto: 'Escudos Telecinéticos Reativos Contra Múltiplos Ataques', grau: 5 }, { texto: 'Voo Sustentado por Propulsão Telecinética', grau: 4 }, { texto: 'Rajadas de Força Concentrada em Curto Alcance', grau: 5 }, { texto: 'Controle Simultâneo de Dezenas de Objetos em Combate', grau: 5 }, { texto: 'Constrói Próteses e Ferramentas Telecinéticas Complexas', grau: 4 }, { texto: 'Corta e Perfura com Lâminas de Força Pura', grau: 5 }, { texto: 'Amplifica Potência Quando Motivado pela Raiva', grau: 4 }, { texto: 'Manipulação de Precisão Fina Apesar da Falta das Mãos', grau: 4 }, { texto: 'Potencial Bruto Comparável a Telecinéticos Ômega Estabelecidos', grau: 5 }], frq: [{ texto: 'Raramente Desbloqueia o Potencial Total por Arrogância', grau: 3 }, { texto: 'Perde Controle Fino Quando Dominado pela Raiva', grau: 3 }] }
    ]
  },
  'Rockslide': {
    cards: [
      { nome: 'Corpo Mineral Modular', pod: [{ texto: 'Corpo rochoso suporta golpes e pode se recompor com pedra disponível', grau: 4 }, { texto: 'Desmonta membros para escapar, atacar de ângulos incomuns ou atravessar obstáculos', grau: 4 }, { texto: 'Força e massa tornam-no uma linha de frente eficaz', grau: 3 }], frq: [{ texto: 'Dano, teleporte ou reconstrução podem alterar sua continuidade física e memória', grau: 3 }] },
      { nome: 'Melhor Amigo de Anole', pod: [{ texto: 'Lealdade imediata e coragem para defender os amigos', grau: 3 }, { texto: 'Humor extravagante baixa a tensão da equipe', grau: 3 }, { texto: 'Aprende a pertencer apesar de parecer um monstro', grau: 3 }], frq: [{ texto: 'Usa piadas para esconder medo de rejeição e luto pelas próprias mudanças', grau: 2 }] }
    ]
  },
  'Prodigy': {
    cards: [
      { nome: 'Aquisição de Habilidades', pod: [{ texto: 'Assimila temporariamente conhecimento e técnica de pessoas próximas', grau: 4 }, { texto: 'Replica treinamento de luta, línguas e especialidades com rapidez', grau: 4 }, { texto: 'Combina competências de colegas para resolver problemas de campo', grau: 3 }], frq: [{ texto: 'A versão original do poder perdia as habilidades assimiladas após dormir', grau: 3 }] },
      { nome: 'David Alleyne', pod: [{ texto: 'Estuda padrões, pessoas e missões com disciplina metódica', grau: 3 }, { texto: 'Experiência de liderança entre os Jovens X-Men', grau: 3 }, { texto: 'Transforma insegurança intelectual em preparação', grau: 3 }], frq: [{ texto: 'A pressão de provar que merece estar entre super-humanos pode isolá-lo', grau: 2 }] }
    ]
  },
  'Wallflower': {
    cards: [
      { nome: 'Feromônios Emocionais', pod: [{ texto: 'Emite feromônios que induzem emoções específicas em quem os respira', grau: 3 }, { texto: 'Pode acalmar, atrair ou agravar medo e hostilidade em um grupo', grau: 3 }, { texto: 'Percebe reações sociais e usa discrição para evitar conflito', grau: 3 }], frq: [{ texto: 'O alcance e o efeito dependem de proximidade, ventilação e não substituem livre-arbítrio', grau: 2 }] },
      { nome: 'Laurie Collins', pod: [{ texto: 'Empatia genuína com outros alunos marginalizados', grau: 3 }], frq: [{ texto: 'Baixa autoestima e o medo de ser notada dificultam que ela peça ajuda', grau: 3 }] }
    ]
  },
  'Timeslip': {
    cards: [
      { nome: 'Deslocamento Temporal', pod: [{ texto: 'Salta no tempo em curtas janelas e retorna com informação útil', grau: 4 }, { texto: 'Enxerga consequências próximas antes de agir', grau: 3 }, { texto: 'Evita um perigo imediato reposicionando-se no fluxo temporal', grau: 3 }], frq: [{ texto: 'O poder é instável: destino, duração e lembranças dos saltos não são totalmente controláveis', grau: 3 }] },
      { nome: 'Cronometrista', pod: [{ texto: 'Observa padrões e cronologias que outros ignoram', grau: 3 }, { texto: 'Age com cautela diante de paradoxos e consequências', grau: 3 }, { texto: 'Mantém foco em proteger a equipe, não em explorar futuros', grau: 3 }], frq: [{ texto: 'Conhecer futuros possíveis pode paralisá-la ou fazê-la carregar culpas antecipadas', grau: 2 }] }
    ]
  },
  'Impulse': {
    cards: [
      { nome: 'Explosão Cinética', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Sem Freio', pod: [1], frq: [{ texto: 'Impulsivo Demais', grau: 2 }] }
    ]
  },

  // ===== MORLOCK =====
  'Callisto': {
    cards: [
      { nome: 'Líder dos Morlocks', pod: [0, 1], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Combate Corporal', grau: 3 }, { texto: 'Estratégia', grau: 2 }, { texto: 'Vontade de Ferro', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Exploração de Ambiente', grau: 3 }, { texto: 'Trabalho em Equipe', grau: 2 }, { texto: 'Treinamento Intensivo', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Caçadora dos Túneis', pod: [2], frq: [{ texto: 'Desconfia de Superfície', grau: 2 }] },
      { nome: 'Radar de Mutantes', pod: [{ texto: 'Sente a Presença e a Natureza de Poderes Mutantes Próximos', grau: 4 }, { texto: 'Rastreia Qualquer Um pelas Galerias no Escuro Total', grau: 4 }, { texto: 'Avalia a Força de um Oponente Antes do Combate Começar', grau: 3 }], frq: [{ texto: 'Campo de Visão Reduzido pelo Tapa-Olho', grau: 2 }] }
    ]
  },
  'Caliban': {
    cards: [
      { nome: 'Rastreador de Mutantes', pod: [{ texto: 'Sente e localiza assinaturas mutantes a grande distância', grau: 4 }, { texto: 'Distingue a presença e a força geral de mutantes próximos', grau: 3 }, { texto: 'Usa sentidos ampliados para seguir alvos em terreno difícil', grau: 3 }], frq: [{ texto: 'Rastrear mutantes não lhe permite controlar a ameaça que encontrou', grau: 2 }] },
      { nome: 'Sobrevivente Morlock', pod: [{ texto: 'Conhece túneis, refúgios e rotas de fuga subterrâneas', grau: 3 }, { texto: 'Força e resistência físicas acima do humano', grau: 3 }, { texto: 'Lealdade profunda a quem lhe oferece pertencimento', grau: 3 }], frq: [{ texto: 'Anos de abuso e manipulação o tornam vulnerável a figuras dominadoras', grau: 3 }] }
    ]
  },
  'Marrow': {
    cards: [
      { nome: 'Ossos como Arsenal', pod: [{ texto: 'Projeta, molda e arranca o próprio osso para criar lâminas e projéteis', grau: 4 }, { texto: 'Cura-se rapidamente após produzir armas ósseas', grau: 4 }, { texto: 'Estrutura óssea reforçada sustenta combate corpo a corpo brutal', grau: 3 }], frq: [{ texto: 'Usar o próprio esqueleto dói e sua aparência pode aterrorizar civis', grau: 3 }] },
      { nome: 'Coração dos Morlocks', pod: [{ texto: 'Sobreviveu aos massacres e à política violenta dos túneis', grau: 3 }, { texto: 'Aprende a proteger aliados sem abandonar sua ferocidade', grau: 3 }, { texto: 'Experiência com X-Men lhe dá alternativas à violência', grau: 3 }], frq: [{ texto: 'Trauma e raiva fazem-na reagir antes de avaliar uma situação', grau: 3 }] }
    ]
  },
  'Masque': {
    cards: [
      { nome: 'Escultura de Carne', pod: [{ texto: 'Remodela pele, carne e traços físicos de outras pessoas por contato', grau: 4 }, { texto: 'Pode desfigurar, restaurar ou alterar identidades de modo preciso', grau: 4 }, { texto: 'Usa a transformação para intimidação e controle social', grau: 3 }], frq: [{ texto: 'Precisa tocar o alvo e sua crueldade estética guia escolhas previsíveis', grau: 3 }] },
      { nome: 'Artista Morlock', pod: [{ texto: 'Compreende a sobrevivência clandestina dos túneis', grau: 3 }, { texto: 'Cria disfarces e mudanças corporais úteis a aliados', grau: 3 }, { texto: 'Persuasão teatral e presença perturbadora desestabilizam rivais', grau: 3 }], frq: [{ texto: 'Obsessão por beleza e controle o torna incapaz de aceitar recusas', grau: 3 }] }
    ]
  },
  'Leech': {
    cards: [
      { nome: 'Campo de Neutralização', pod: [0], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Criança dos Túneis', pod: [1], frq: [{ texto: 'Vulnerável sem o Campo', grau: 2 }] }
    ]
  },

  // ===== IRMANDADE =====
  'Magneto': {
    cards: [
      { nome: 'Mestre do Magnetismo', pod: [0, 1, 2], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Controle de Ferro no Sangue', pod: [{ texto: 'Manipula Hemoglobina', grau: 5 }, { texto: 'Induz AVC ou Parada Cardíaca', grau: 4 }, { texto: 'Extrai Adamantium do Esqueleto', grau: 5 }], frq: [{ texto: 'Exige Concentração Absoluta', grau: 3 }] },
      { nome: 'Campo de Força Planetário', pod: [{ texto: 'Escudo Magnético Global', grau: 5 }, { texto: 'Voo Orbital por Levitação', grau: 4 }, { texto: 'Bloqueia Telepatia com Capacete', grau: 4 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Nunca Mais', pod: [3, 4], frq: [{ texto: 'Trauma do Holocausto', grau: 4 }] },
      { nome: 'Poderes em Declínio', pod: [5], frq: [{ texto: 'Poderes se Apagando com a Idade', grau: 3 }] },
      { nome: 'Causa Mutante', pod: [{ texto: 'Visão de Supremacia Mutante', grau: 4 }, { texto: 'Carisma Revolucionário', grau: 4 }, { texto: 'Anti-Vilão a Anti-Herói', grau: 3 }], frq: [{ texto: 'Extremismo Cega', grau: 3 }, { texto: 'Família Estilhaçada', grau: 2 }] },
      { nome: 'Senhor do Espectro Eletromagnético', pod: [{ texto: 'Manipula o Campo Magnético Inteiro do Planeta', grau: 5 }, { texto: 'Arranca Estruturas de Metal de Cidades Inteiras do Chão', grau: 5 }, { texto: 'Cria Tempestades Magnéticas em Escala Continental', grau: 5 }, { texto: 'Voo Orbital Sustentado por Levitação Magnética', grau: 5 }, { texto: 'Extrai o Ferro do Sangue de um Inimigo à Distância', grau: 5 }, { texto: 'Desativa ou Reprograma Qualquer Tecnologia Eletromagnética', grau: 5 }, { texto: 'Gera Pulso Eletromagnético Capaz de Cegar Satélites', grau: 5 }, { texto: 'Desvia e Reflete Qualquer Projétil Metálico Instintivamente', grau: 5 }, { texto: 'Manipula o Espectro de Luz e Rádio Além do Metal Puro', grau: 5 }, { texto: 'Constrói Fortalezas e Armaduras de Metal Reformado em Segundos', grau: 5 }], frq: [{ texto: 'Impotente Contra Materiais Não-Metálicos (Plástico, Cerâmica, Madeira)', grau: 3 }, { texto: 'Feitos em Escala Planetária Exigem Concentração Absoluta', grau: 3 }] },
    ]
  },
  'Mystique': {
    cards: [
      { nome: 'Metamorfa Centenária', pod: [0, 1, 3], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Mãe de Segredos', pod: [2], frq: [{ texto: 'Abandonou Noturno ao Nascer', grau: 3 }] },
      { nome: 'Cúmplice do Destino', pod: [{ texto: 'Rede de Espionagem Global', grau: 4 }, { texto: 'Manipuladora Genial', grau: 3 }, { texto: 'Casada com Destiny (Irene Adler)', grau: 3 }], frq: [{ texto: 'Lealdade apenas a Si e Destiny', grau: 3 }] },
      { nome: 'Mestra do Disfarce', pod: [{ texto: 'Mimetiza Voz e Maneirismos com Perfeição', grau: 5 }, { texto: 'Altera Impressões Digitais', grau: 4 }, { texto: 'Engana Sensores Biométricos', grau: 4 }, { texto: 'Disfarça Cheiro e Feromônios', grau: 3 }, { texto: 'Replica a Estrutura Facial e Corporal de Qualquer Pessoa Já Vista', grau: 5 }, { texto: 'Infiltrou os Mais Altos Escalões de Governos por Décadas', grau: 5 }, { texto: 'Muda de Forma em Frações de Segundo em Pleno Combate', grau: 4 }, { texto: 'Copia Assinatura Genética o Suficiente para Enganar Exames Superficiais', grau: 4 }, { texto: 'Mantém um Disfarce Perfeito por Anos sem Ser Detectada', grau: 5 }, { texto: 'Transforma Roupas e Acessórios Junto com o Próprio Corpo', grau: 3 }], frq: [{ texto: 'Massa Corporal Constante', grau: 2 }, { texto: 'Não Copia Poderes Mutantes', grau: 3 }] },
      { nome: 'Mãe de Rogue', pod: [{ texto: 'Criou Filha Adotiva', grau: 3 }, { texto: 'Manipulou Rogue por Anos', grau: 4 }], frq: [{ texto: 'Culpa Materna Recalcada', grau: 2 }, { texto: 'Destiny Previu Traição', grau: 2 }] },
    ]
  },
  'Blob': {
    cards: [
      { nome: 'Massa Irremovível', pod: [{ texto: 'Ancora o próprio corpo ao solo e resiste a força, impacto e empurrões', grau: 4 }, { texto: 'Pele e gordura absorvem golpes e prendem adversários que o atacam', grau: 4 }, { texto: 'Usa peso e volume para bloquear corredores e derrubar estruturas', grau: 3 }], frq: [{ texto: 'Quando está ancorado, mobilidade e perseguição são muito limitadas', grau: 3 }] },
      { nome: 'Fred Dukes', pod: [{ texto: 'Experiência como brutamontes da Irmandade em combate de equipe', grau: 3 }, { texto: 'Resistência psicológica para suportar humilhação e rejeição', grau: 3 }, { texto: 'Conhece o valor tático de segurar a linha de frente', grau: 3 }], frq: [{ texto: 'Ressentimento e necessidade de reconhecimento facilitam manipulação', grau: 3 }] }
    ]
  },
  'Toad': {
    cards: [
      { nome: 'Fisiologia de Sapo', pod: [{ texto: 'Salta grandes distâncias com pernas sobre-humanas', grau: 4 }, { texto: 'Língua preênsil prende, puxa objetos e desarma oponentes', grau: 3 }, { texto: 'Escala paredes e usa agilidade irregular para fugir', grau: 3 }], frq: [{ texto: 'A aparência, baixa autoestima e necessidade de aprovação prejudicam sua concentração', grau: 3 }] },
      { nome: 'Mortimer Toynbee', pod: [{ texto: 'Sobreviveu como espião, lacaio e membro recorrente da Irmandade', grau: 3 }, { texto: 'Improvisa truques sujos e rotas de fuga quando superado', grau: 3 }, { texto: 'Lealdade pode virar coragem real quando alguém lhe dá respeito', grau: 3 }], frq: [{ texto: 'Tende a se submeter a líderes abusivos para sentir pertencimento', grau: 3 }] }
    ]
  },
  'Pyro': {
    cards: [
      { nome: 'Pirocinese', pod: [0, 1, 2], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Incendiário', pod: [3], frq: [{ texto: 'Fogo Sem Controle', grau: 2 }] }
    ]
  },
  'Avalanche': {
    cards: [
      { nome: 'Ondas Sísmicas', pod: [{ texto: 'Gera vibrações que racham chão, paredes e fundações', grau: 4 }, { texto: 'Concentra tremores para desequilibrar grupos ou abrir rotas', grau: 4 }, { texto: 'Derruba estruturas sem precisar tocar diretamente nelas', grau: 3 }], frq: [{ texto: 'O poder é péssimo para precisão e cria risco alto de dano colateral', grau: 3 }] },
      { nome: 'Dominikos Petrakis', pod: [{ texto: 'Ex-agente da Irmandade acostumado a sabotagem e demolição', grau: 3 }, { texto: 'Conhece combate urbano e como transformar terreno em vantagem', grau: 3 }, { texto: 'Pragmatismo o ajuda a recuar quando uma causa está perdida', grau: 3 }], frq: [{ texto: 'Cinismo e ambição reduzem sua confiança em aliados e causas duradouras', grau: 2 }] }
    ]
  },
  'Unus': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Campo de Força', pod: [0], frq: [{ texto: 'Campo Tem Limite de Absorção', grau: 2 }] }
    ]
  },
  'Lorelei': {
    cards: [
      { nome: 'Canto Hipnótico', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Sereia', pod: [1], frq: [{ texto: 'Vítima da Própria Aparência', grau: 2 }] }
    ]
  },
  'Adepto (Magneto)': {
    cards: [
      { nome: 'Acolyte', pod: [0], frq: [{ texto: 'Lealdade Cega a Magneto', grau: 2 }] },
      { nome: 'Fiel a Magneto', pod: [1], frq: [{ texto: 'Morto sem Causa', grau: 2 }] }
    ]
  },

  // ===== VILÕES =====
  'Sabretooth': {
    cards: [
      { nome: 'Fera Selvagem', pod: [0, 1, 2], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Espelho Sombrio', pod: [3], frq: [{ texto: 'Obsessão por Wolverine', grau: 3 }, { texto: 'Instinto Assassino', grau: 3 }, { texto: 'Prazer em Tortura Psicológica', grau: 2 }] },
      { nome: 'Predador Supremo', pod: [{ texto: 'Sentidos Aguçados (Olfato/Audição)', grau: 5 }, { texto: 'Rastreamento Perfeito', grau: 4 }, { texto: 'Visão Noturna', grau: 4 }, { texto: 'Força Bruta Devastadora', grau: 5 }, { texto: 'Garras e Presas Retráteis', grau: 4 }, { texto: 'Fator de Cura Acelerado', grau: 4 }], frq: [{ texto: 'Fúria Incontrolável', grau: 3 }] },
      { nome: 'Assassino de Aluguel', pod: [{ texto: 'Séculos de Experiência em Combate', grau: 4 }, { texto: 'Conhece Fraquezas de Mutantes', grau: 4 }, { texto: 'Imune a Dor', grau: 3 }, { texto: 'Táticas de Emboscada', grau: 4 }], frq: [{ texto: 'Sem Código Moral', grau: 2 }, { texto: 'Ódio por Wolverine', grau: 3 }] },
      { nome: 'Arma X', pod: [{ texto: 'Condicionamento Mental', grau: 4 }, { texto: 'Memórias Implantadas', grau: 3 }, { texto: 'Gatilhos de Berserk', grau: 4 }, { texto: 'Resistência a Telepatia', grau: 3 }], frq: [{ texto: 'Programação Mental', grau: 3 }, { texto: 'Livre Arbítrio Limitado', grau: 3 }] },
      { nome: 'Fator de Cura Bestial Absoluto', pod: [{ texto: 'Regenera Ferimentos Letais em Segundos', grau: 5 }, { texto: 'Sobrevive a Perfurações no Coração e Ferimentos que Matariam Qualquer Um', grau: 5 }, { texto: 'Imune à Maioria dos Venenos, Toxinas e Doenças', grau: 5 }, { texto: 'Envelhecimento Drasticamente Retardado — Ativo há Mais de um Século', grau: 5 }, { texto: 'Sentidos de Predador Apex Rastreiam Presas a Quilômetros', grau: 5 }, { texto: 'Garras e Presas Retráteis Regeneram Mesmo se Arrancadas', grau: 5 }, { texto: 'Cicatrização Ignora Fogo, Ácido e Radiação', grau: 5 }, { texto: 'Regeneração Sustenta Combate Contra Múltiplos Oponentes sem Fadiga', grau: 5 }, { texto: 'Cura Mesmo sob Ataque Contínuo de Adamantium', grau: 4 }, { texto: 'Instinto Predatório Aguça Reflexos Além do Limite Humano', grau: 5 }], frq: [{ texto: 'Fúria Sobrepõe Estratégia — Ataca Sem Pensar', grau: 3 }, { texto: 'Fator de Cura Não Apaga a Dor, Só a Ignora', grau: 2 }] }
    ]
  },
  'Lady Deathstrike': {
    cards: [
      { nome: 'Garras de Adamantium', pod: [0, 1], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Ninja Ciborgue', pod: [2], frq: [{ texto: 'Obsessão por Wolverine', grau: 2 }] },
      { nome: 'Guerreira Samurai', pod: [{ texto: 'Ninjitsu e Combate Corpo-a-Corpo de Elite', grau: 4 }, { texto: 'Código de Honra Samurai', grau: 3 }, { texto: 'Vontade de Ferro Forjada em Décadas de Luta', grau: 4 }], frq: [{ texto: 'Rigidez do Código Vira Ponto Cego Tático', grau: 2 }] },
      { nome: 'Ciborgue de Adamantium Imortal', pod: [{ texto: 'Garras Retráteis nos Dez Dedos Cortam Quase Tudo', grau: 5 }, { texto: 'Esqueleto e Órgãos Parcialmente Revestidos de Adamantium', grau: 5 }, { texto: 'Fator de Cura Cibernético Rejeita Ferimentos Letais', grau: 5 }, { texto: 'Regenera Membros Perdidos em Combate', grau: 4 }, { texto: 'Força e Resistência Sobre-Humanas pelo Revestimento Metálico', grau: 4 }, { texto: 'Reflexos de Ninja Amplificados por Implantes', grau: 4 }, { texto: 'Sobrevive a Ferimentos que Matariam Qualquer Humano', grau: 5 }, { texto: 'Corpo Reconstruído Repetidamente Após Quase-Morte', grau: 4 }, { texto: 'Garras Perfuram Blindagem e Metal Comum', grau: 4 }, { texto: 'Precisão Cirúrgica em Ataques Vitais', grau: 4 }], frq: [{ texto: 'Fator de Cura Inferior ao de Wolverine — Sente Toda a Dor', grau: 3 }, { texto: 'Obsessão por Vingança Contra Wolverine Nubla o Julgamento', grau: 3 }] }
    ]
  },
  'Mister Sinister': {
    cards: [
      { nome: 'Geneticista Vitoriano', pod: [0, 2], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Clonagem Sem Limites', pod: [1, 3, 4], frq: [{ texto: 'Cópias Degeneram Geneticamente', grau: 2 }] },
      { nome: 'Obsessão Summers-Grey', pod: [5], frq: [{ texto: 'Obsessão pela Linhagem Summers', grau: 4 }, { texto: 'Narcisismo e Dramalhão', grau: 2 }] },
      { nome: 'Diamante na Pele', pod: [{ texto: 'Corpo de Diamante Sintético', grau: 4 }, { texto: 'Imune a Telepatia', grau: 4 }, { texto: 'Força Sobre-humana', grau: 3 }], frq: [{ texto: 'Vulnerável a Frequências Sônicas', grau: 2 }] },
      { nome: 'Rede de Clones Marauders', pod: [{ texto: 'Clones de Si Mesmo', grau: 4 }, { texto: 'Clones de Mutantes Poderosos', grau: 4 }, { texto: 'Transferência de Consciência', grau: 5 }, { texto: 'Backup Corporal Sempre Pronto (Nunca Morre Permanentemente)', grau: 5 }, { texto: 'Manipulação Genética Instantânea de Terceiros', grau: 5 }, { texto: 'Cria Exército de Marauders sob Controle Total', grau: 4 }, { texto: 'Acesso a DNA de Praticamente Todo Mutante Catalogado', grau: 5 }, { texto: 'Reconstrói Corpo a Partir de Amostra Genética Mínima', grau: 5 }, { texto: 'Implanta Gatilhos Genéticos Latentes em Vítimas', grau: 4 }, { texto: 'Sobrevive à Destruição Total do Corpo Físico', grau: 5 }], frq: [{ texto: 'Cada Clone Tem Vontade Própria', grau: 3 }] },
      { nome: 'Cronista Genético', pod: [{ texto: 'Arquivo Genético Completo', grau: 4 }, { texto: 'Previu Chegada de Mutantes Ômega', grau: 3 }, { texto: 'Manipulou Linhagem Summers por Gerações', grau: 4 }], frq: [{ texto: 'Arrogância Intelectual', grau: 2 }] },
    ]
  },
  'Apocalipse': {
    cards: [
      { nome: 'Primeiro Mutante', pod: [0, 1, 2], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Manipulação Molecular Total', pod: [{ texto: 'Altera Próprio Corpo a Nível Atômico', grau: 5 }, { texto: 'Aumenta Tamanho e Massa', grau: 4 }, { texto: 'Cria Armas do Próprio Corpo', grau: 4 }, { texto: 'Regeneração Instantânea', grau: 5 }, { texto: 'Camuflagem/Disfarce Total (Muda Aparência à Vontade)', grau: 4 }, { texto: 'Fortalece Estruturas Ósseas e Musculares Sob Impacto', grau: 4 }, { texto: 'Adapta Fisiologia a Qualquer Ambiente Hostil', grau: 5 }, { texto: 'Absorve Energia de Ataques Para Regenerar', grau: 5 }, { texto: 'Estica/Deforma Membros para Alcance e Ataque', grau: 4 }, { texto: 'Cria Órgãos Redundantes (Sobrevive a Ferimentos Letais)', grau: 5 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Tecnologia Celestial', pod: [{ texto: 'Armadura Celestial Indestrutível', grau: 5 }, { texto: 'Teletransporte Interestelar', grau: 4 }, { texto: 'Acesso a Conhecimento Cósmico', grau: 4 }], frq: [{ texto: 'Dependente da Nave Celestial', grau: 2 }] },
      { nome: 'Sobrevivência do Mais Forte', pod: [3, 4], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Pai dos Cavaleiros', pod: [5], frq: [{ texto: 'Visão Distorcida de Evolução', grau: 3 }] },
      { nome: 'Os Quatro Cavaleiros', pod: [{ texto: 'Pestilência (Fome)', grau: 4 }, { texto: 'Guerra (Conflito)', grau: 4 }, { texto: 'Fome (Escassez)', grau: 4 }, { texto: 'Morte (Fim)', grau: 4 }, { texto: 'Apocalipse os Empodera', grau: 5 }, { texto: 'Escolhe Cavaleiros Baseado em Trauma/Potencial Oculto', grau: 4 }, { texto: 'Cavaleiros Recebem Armamento e Poderes Amplificados', grau: 5 }, { texto: 'Substitui Cavaleiro Caído Instantaneamente', grau: 4 }, { texto: 'Coordena os Quatro em Táticas de Conquista Global', grau: 5 }, { texto: 'Vínculo Psíquico de Controle Sobre os Cavaleiros', grau: 5 }], frq: [{ texto: 'Cavaleiros Podem Traí-lo', grau: 3 }] },
    ]
  },
  'Apocalipse (Base - Mutante Antigo)': {
    cards: [
      { nome: 'Mutante Original / En Sabah Nur', pod: [{ texto: 'Imortalidade Biológica (Viveu 5000+ Anos)', grau: 5 }, { texto: 'Força Sobre-Humana Base (Classe 50+)', grau: 4 }, { texto: 'Invulnerabilidade a Doenças/Envelhecimento', grau: 5 }, { texto: 'Inteligência Acumulada Milênios', grau: 5 }, { texto: 'Manipulação Molecular Limitada (Próprio Corpo)', grau: 4 }], frq: [{ texto: 'Hibernação Periódica Necessária', grau: 3 }, { texto: 'Arrogância de "Deus"', grau: 3 }] },
      { nome: 'Filosofia: Sobrevivência do Mais Forte', pod: [{ texto: 'Testa Mutantes/Humanos em Combate', grau: 4 }, { texto: 'Cria Cavaleiros (Empodera Servos)', grau: 4 }, { texto: 'Destrói Fraco para Fortalecer Forte', grau: 4 }], frq: [{ texto: 'Subestima "Fracos" (X-Men Vencem)', grau: 3 }] }
    ]
  },
  'Apocalipse (Com Tecnologia Celestial Completa)': {
    cards: [
      { nome: 'Armadura Celestial / Exoesqueleto Divino', pod: [{ texto: 'Invulnerabilidade Quase Absoluta', grau: 5 }, { texto: 'Força Classe 100+ (Move Montanhas/Placas Tectônicas)', grau: 5 }, { texto: 'Teletransporte Interestelar Instantâneo', grau: 5 }, { texto: 'Projeção Energia Cósmica (Olhos/Mãos)', grau: 5 }, { texto: 'Campo de Força Planetário', grau: 5 }, { texto: 'Voo Velocidade da Luz', grau: 5 }, { texto: 'Interface Direta com Nave Celestial', grau: 5 }, { texto: 'Auto-Reparo Instantâneo da Armadura', grau: 5 }, { texto: 'Módulos de Combate Reconfiguráveis (Lâminas/Canhões)', grau: 5 }, { texto: 'Escudo Anti-Energia Cósmica (Resiste Golpes de Entidades Cósmicas)', grau: 5 }], frq: [{ texto: 'Dependente da Armadura/Nave', grau: 3 }, { texto: 'Tecnologia Pode Ser Hackeada (Cable/X-Men)', grau: 3 }] },
      { nome: 'Manipulação Molecular/Atômica Total', pod: [{ texto: 'Transmuta Matéria em Escala Maciça', grau: 5 }, { texto: 'Cria Vida/Seres Artificiais', grau: 5 }, { texto: 'Reescreve DNA Global (Vírus Meta)', grau: 5 }, { texto: 'Adaptação Instantânea a Qualquer Ameaça', grau: 5 }, { texto: 'Absorve Poderes/Energia de Inimigos', grau: 5 }], frq: [{ texto: 'Concentração Total Necessária', grau: 3 }] },
      { nome: 'Acesso Conhecimento Celestial (Biblioteca Cósmica)', pod: [{ texto: 'Tecnologia Milhões Anos Avançada', grau: 5 }, { texto: 'Engenharia Genética Divina', grau: 5 }, { texto: 'História/Mapa do Universo Conhecido', grau: 5 }, { texto: 'Conhece Fraquezas de Quase Todos Seres', grau: 5 }], frq: [{ texto: 'Arrogância: Acha Que Sabe Tudo', grau: 3 }] },
      { nome: 'Os Quatro Cavaleiros Apocalípticos', pod: [{ texto: 'Pestilência: Doenças/Pragas Globais', grau: 4 }, { texto: 'Guerra: Conflito/Violência Amplificada', grau: 4 }, { texto: 'Fome: Escassez/Colapso Recursos', grau: 4 }, { texto: 'Morte: Fim/Entropia Personificada', grau: 5 }, { texto: 'Apocalipse os Empodera com Tech Celestial', grau: 5 }], frq: [{ texto: 'Cavaleiros Podem Traí-lo (Arcanjo/Gambit/Hulk)', grau: 4 }] },
      { nome: 'Terraformação / Conquista Planetária', pod: [{ texto: 'Reescreve Biosfera Planetária', grau: 5 }, { texto: 'Exércitos Tecnorgânicos Infinitos', grau: 4 }, { texto: 'Domina Civilizações Inteiras em Dias', grau: 5 }, { texto: 'Subjugou Deuses/Eternos/Deviantes', grau: 5 }], frq: [{ texto: 'Atrai Resistência Cósmica (Celestiais/Vigia)', grau: 4 }] }
    ]
  },
  'Sentinela Mk I': {
    cards: [
      { nome: 'Caçador de Mutantes', pod: [0, 1], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Máquina sem Piedada', pod: [2], frq: [{ texto: 'Limitado por Programação', grau: 2 }] }
    ]
  },
  'Sentinela Mark I': {
    cards: [
      { nome: 'Caçador de Mutantes', pod: [0, 1], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Máquina sem Piedada', pod: [2], frq: [{ texto: 'Limitado por Programação', grau: 2 }] }
    ]
  },
  'Purificador': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Humano Fanático', pod: [0], frq: [{ texto: 'Ódio Cego a Mutantes', grau: 2 }] }
    ]
  },
  'Agente HYDRA': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Agente HYDRA', pod: [0], frq: [{ texto: 'Descartável', grau: 1 }] }
    ]
  },
  'Mercenário Weapon X': {
    cards: [
      { nome: 'Arma Humana', pod: [0], frq: [{ texto: 'Lavagem Cerebral', grau: 2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Mercenário', pod: [1], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] }
    ]
  },
  'Wild Child': {
    cards: [
      { nome: 'Feral', pod: [0], frq: [{ texto: 'Instinto Animal Domina', grau: 2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Weapon X', pod: [1], frq: [{ texto: 'Impulsividade', grau: -2 }] }
    ]
  },
  'Aurora': {
    cards: [
      { nome: 'Velocidade Sobre-humana', pod: [0, 1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Dupla Personalidade', pod: [2], frq: [{ texto: 'Transtorno Dissociativo', grau: 2 }] }
    ]
  },
  'Persuasion': {
    cards: [
      { nome: 'Persuasão', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Voz de Controle', pod: [1], frq: [{ texto: 'Impulsividade', grau: -2 }] }
    ]
  },
  'Frenzy': {
    cards: [
      { nome: 'Força Sobre-humana', pod: [0], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Pele Indestrutível', pod: [1], frq: [{ texto: 'Raiva Incontrolável', grau: 2 }] },
      { nome: 'Veterana dos Acólitos e da Aliança do Mal', pod: [{ texto: 'Treinamento de Combate de Elite sob Magneto', grau: 3 }, { texto: 'Instinto de Brutamontes na Linha de Frente', grau: 3 }, { texto: 'Disciplina Militar Forjada em Múltiplas Facções', grau: 2 }], frq: [{ texto: 'Lealdades Mutáveis Geram Desconfiança dos Aliados', grau: 2 }] },
      { nome: 'Cavaleira da Fome de Apocalipse', pod: [{ texto: 'Já Serviu como Cavaleiro Fome, Poderes Temporariamente Amplificados por Apocalipse', grau: 2 }], frq: [{ texto: 'Amplificação Não é Permanente — Some Quando o Vínculo Acaba', grau: 2 }] }
    ]
  },
  'Magma (Alliance of Evil)': {
    cards: [
      { nome: 'Lava', pod: [0], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Alliance of Evil', pod: [1], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] }
    ]
  },
  'Tower': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Crescimento', pod: [0], frq: [{ texto: 'Instabilidade', grau: 2 }] }
    ]
  },
  'Stinger': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Ferrão', pod: [0], frq: [{ texto: 'Arrogância', grau: -2 }] }
    ]
  },
  'Cargill': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Acolyte', pod: [0], frq: [{ texto: 'Arrogância', grau: -2 }] }
    ]
  },
  'Agent Zero': {
    cards: [
      { nome: 'Fator de Cura', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Assassino da Weapon X', pod: [1], frq: [{ texto: 'Lavagem Cerebral', grau: 2 }] },
      { nome: 'Absorção Cinética Avançada', pod: [{ texto: 'Absorve Energia Cinética de Impactos, Tiros e Explosões', grau: 4 }, { texto: 'Libera a Energia Absorvida em Rajadas Explosivas Concentradas', grau: 4 }, { texto: 'Precisão de Atirador Nível CIA em Qualquer Distância', grau: 4 }], frq: [{ texto: 'Sem o Traje de Supressão, Absorção Foge de Controle', grau: 3 }] },
      { nome: 'Operativo Black-Ops da Weapon X', pod: [{ texto: 'Treinamento de Elite em Operações Secretas e Infiltração', grau: 3 }, { texto: 'Rede de Contatos entre Mercenários e Agências de Inteligência', grau: 3 }, { texto: 'Frieza Profissional sem Motivação Ideológica', grau: 2 }], frq: [{ texto: 'Sem Lealdade Além do Contrato — Troca de Lado por Preço Certo', grau: 2 }] }
    ]
  },
  'Silver Fox': {
    cards: [
      { nome: 'Fator de Cura', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Sedutora Letal', pod: [1], frq: [{ texto: 'Memórias Roubadas', grau: 2 }] }
    ]
  },
  'Kestrel': {
    cards: [
      { nome: 'Voo', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Agente Governamental', pod: [1], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Bolt': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Eletricidade', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] }
    ]
  },
  'Fixer': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Gênio Técnico', pod: [0], frq: [{ texto: 'Covarde', grau: 1 }] }
    ]
  },
  'Graydon Creed (FOH)': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Amigos da Humanidade', pod: [0], frq: [{ texto: 'Ódio a Mutantes', grau: 2 }] }
    ]
  },
  'Graydon Creed': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Político Anti-Mutante', pod: [0], frq: [{ texto: 'Filho de Mística e Sabretooth', grau: 2 }] }
    ]
  },
  'Cameron Hodge': {
    cards: [
      { nome: 'Amigos da Humanidade', pod: [0], frq: [{ texto: 'Obsessão por Ciclope', grau: 2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Pescoço Robótico', pod: [1], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] }
    ]
  },
  'Donald Pierce': {
    cards: [
      { nome: 'Ciborgue Reaver', pod: [0], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Líder dos Reavers', pod: [1], frq: [{ texto: 'Ódio a Mutantes', grau: 2 }] }
    ]
  },
  'Lady Mastermind': {
    cards: [
      { nome: 'Ilusões', pod: [0], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Mestre do Engano', pod: [1], frq: [{ texto: 'Arrogância', grau: 2 }] }
    ]
  },
  'Vanisher': {
    cards: [
      { nome: 'Teleporte', pod: [0], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Ladrão', pod: [1], frq: [{ texto: 'Covarde', grau: 2 }] }
    ]
  },
  'Sauron': {
    cards: [
      { nome: 'Pterossauro', pod: [0, 1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Doutor Sáurio', pod: [2], frq: [{ texto: 'Hipocrisia Ambiental', grau: 2 }] },
      { nome: 'Instinto Predatório Alado', pod: [{ texto: 'Agilidade de Predador Aéreo em Voo', grau: 3 }, { texto: 'Garras e Bico Cortantes em Mergulho', grau: 3 }, { texto: 'Visão de Caçador Localiza Presas a Distância', grau: 2 }], frq: [{ texto: 'Mente Primitiva Domina em Combate Prolongado', grau: 2 }] },
      { nome: 'Drenagem de Energia Vital Absoluta', pod: [{ texto: 'Drena Força Vital ao Toque, Enfraquecendo a Vítima', grau: 5 }, { texto: 'Converte a Energia Roubada em Força e Massa Muscular', grau: 5 }, { texto: 'Sustenta e Prolonga a Transformação em Pterossauro Drenando Continuamente', grau: 5 }, { texto: 'Vítimas Ficam Comatosas ou Envelhecidas pela Drenagem Prolongada', grau: 5 }, { texto: 'Drena Também Energia Psíquica e Mutante de Alvos Poderosos', grau: 4 }, { texto: 'Drenagem Letal se Sustentada Além do Limite da Vítima', grau: 5 }, { texto: 'Voo Sustentado por Energia Roubada Alcança Grandes Altitudes', grau: 4 }, { texto: 'Sentidos Detectam Energia Vital de Presas à Distância', grau: 4 }, { texto: 'Cada Drenagem Bem-Sucedida Acelera Reflexos e Cura Ferimentos', grau: 4 }, { texto: 'Fome pela Energia Vital Suprime a Consciência de Karl Lykos', grau: 5 }], frq: [{ texto: 'Sem Drenar Constantemente, Reverte a Karl Lykos Fraco e Humano', grau: 4 }, { texto: 'Conflito Interno do Médico Hesita em Momentos Críticos', grau: 3 }] }
    ]
  },
  'Vertigo': {
    cards: [
      { nome: 'Desorientação', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Maroto', pod: [1], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Scalphunter': {
    cards: [
      { nome: 'Atirador de Elite', pod: [0], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Maroto Líder', pod: [1], frq: [{ texto: 'Crueldade', grau: 2 }] },
      { nome: 'Poder Mutante: Armeiro Instintivo', pod: [{ texto: 'Cria e Modifica Armas Instintivamente com a Mente', grau: 4 }, { texto: 'Nunca Fica Sem Munição ou Arma em Combate', grau: 3 }, { texto: 'Adapta Arsenal a Qualquer Situação de Tiro', grau: 3 }], frq: [{ texto: 'Poder Inútil Sem Metal ou Material Bruto Disponível', grau: 3 }] },
      { nome: 'Assassino dos Morlocks', pod: [{ texto: 'Reputação de Frieza Implacável desde o Massacre dos Morlocks', grau: 2 }], frq: [{ texto: 'Cicatrizes Faciais o Tornam Facilmente Identificável', grau: 2 }] }
    ]
  },
  'Arclight': {
    cards: [
      { nome: 'Ondas de Choque', pod: [0], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Maroto', pod: [1], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] }
    ]
  },
  'Blockbuster': {
    cards: [
      { nome: 'Força e Resistência Colossais', pod: [{ texto: 'Força Bruta Destrói Paredes e Veículos com Socos', grau: 4 }, { texto: 'Resistência a Impactos Que Quebrariam Ossos Normais', grau: 4 }, { texto: 'Golpes de Área Derrubam Múltiplos Oponentes de Uma Vez', grau: 3 }], frq: [{ texto: 'Estratégia Zero — Ataca Sempre de Frente e em Linha Reta', grau: 4 }] },
      { nome: 'Capanga Leal', pod: [{ texto: 'Lealdade Cega aos Marotos de Mister Sinister', grau: 2 }], frq: [{ texto: 'Facilmente Manipulado por Ordens Simples e Diretas', grau: 2 }] },
      { nome: 'Superforça', pod: [0], frq: [{ texto: 'Inteligência Limitada', grau: 2 }] }
    ]
  },
  'Prism': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Cristal Vivo', pod: [0], frq: [{ texto: 'Insegurança Constante', grau: -2 }] }
    ]
  },
  'Riptide': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Turbilhão', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Harpoon': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Arpões Energéticos', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Scrambler': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Scramble de Poderes', pod: [0], frq: [{ texto: 'Conflitos Internos', grau: -2 }] }
    ]
  },
  'Larry Trask': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Criador de Sentinelas', pod: [0], frq: [{ texto: 'Ódio Hereditário', grau: 2 }] }
    ]
  },
  'Steven Lang': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Cientista Anti-Mutante', pod: [0], frq: [{ texto: 'Fanático', grau: 2 }] }
    ]
  },
  'Reverend William Stryker': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Conhecimento Tático', grau: 3 }, { texto: 'Treinamento Básico', grau: 2 }, { texto: 'Determinação', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Pregador do Ódio', pod: [0], frq: [{ texto: 'Fanático Religioso', grau: 3 }] }
    ]
  },

  // ===== HUMANOS =====
  'Moira MacTaggert': {
    cards: [
      { nome: 'Geneticista de Elite', pod: [0], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Aliada dos X-Men', pod: [1], frq: [{ texto: 'Humana', grau: 1 }] }
    ]
  },
  'Agente S.H.I.E.L.D.': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Agente S.H.I.E.L.D.', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Val Cooper': {
    cards: [
      { nome: 'Ligação Governamental', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Aliada Relutante', pod: [1], frq: [{ texto: 'Burocracia', grau: 1 }] }
    ]
  },
  'Henry Gyrich': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Burocrata Anti-Mutante', pod: [0], frq: [{ texto: 'Preconceito', grau: 2 }] }
    ]
  },
  'Bolivar Trask': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Criador das Sentinelas', pod: [0], frq: [{ texto: 'Pesadelo Realizado', grau: 2 }] }
    ]
  },

  // ===== NEUTRO =====
  'Diamond Lil': {
    cards: [
      { nome: 'Pele de Diamante', pod: [0], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Mercenária', pod: [1], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] }
    ]
  },
  'Madison Jeffries': {
    cards: [
      { nome: 'Moldar Metal', pod: [0], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Gênio Mecânico', pod: [1], frq: [{ texto: 'Insegurança Constante', grau: -2 }] }
    ]
  },

  // ===== CLUBE DO INFERNO =====
  'Tarot': {
    cards: [
      { nome: 'Cartas Místicas', pod: [0], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Vidente do Caos', pod: [1], frq: [{ texto: 'Cartas São Imprevisíveis', grau: 2 }] }
    ]
  },
  'Catseye': {
    cards: [
      { nome: 'Gato', pod: [0], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Hellion Leal', pod: [1], frq: [{ texto: 'Mentalidade de Gato', grau: 1 }] }
    ]
  },
  'Empath': {
    cards: [
      { nome: 'Manipulação Emocional', pod: [0], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Bruto do Clube', pod: [1], frq: [{ texto: 'Sádico', grau: 2 }] }
    ]
  },
  'Jetstream': {
    cards: [
      { nome: 'Propulsão a Jato', pod: [0], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Hellion', pod: [1], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] }
    ]
  },
  'Beef': {
    cards: [
      { nome: 'Força Bruta', pod: [0], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Hellion', pod: [1], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] }
    ]
  },
  'Roulette': {
    cards: [
      { nome: 'Roleta da Sorte', pod: [0], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Jogadora', pod: [1], frq: [{ texto: 'Viciada em Risco', grau: 2 }] }
    ]
  },
  'Timeshadow': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Sombra do Tempo', pod: [0], frq: [{ texto: 'Conflitos Internos', grau: -2 }] }
    ]
  },
  'Bevatron': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Instinto de Sobrevivência', grau: 3 }, { texto: 'Especialização', grau: 2 }, { texto: 'Habilidade Única', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Sorte nos Momentos Críticos', grau: 3 }, { texto: 'Determinação', grau: 2 }, { texto: 'Instinto de Sobrevivência', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Partículas', pod: [0], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] }
    ]
  },
  'Shinobi Shaw': {
    cards: [
      { nome: 'Tecnopatia', pod: [0], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Herdeiro do Clube', pod: [1], frq: [{ texto: 'À Sombra do Pai', grau: 2 }] }
    ]
  },
  'Trevor Fitzroy': {
    cards: [
      { nome: 'Portal Temporal', pod: [0], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Assassino do Tempo', pod: [1], frq: [{ texto: 'Ambicioso e Cruel', grau: 2 }] },
      { nome: 'Portais Alimentados por Vida Roubada', pod: [{ texto: 'Drena Energia Vital e Envelhece Vítimas ao Toque', grau: 4 }, { texto: 'Abre Portais Dimensionais Instantâneos com a Energia Roubada', grau: 4 }, { texto: 'Viaja no Tempo Através dos Próprios Portais', grau: 3 }], frq: [{ texto: 'Precisa Drenar (Matar) Constantemente para Manter o Poder Ativo', grau: 4 }] },
      { nome: 'Líder Renegado dos Hellions', pod: [{ texto: 'Ambição Impiedosa ao Assumir o Comando dos Hellions', grau: 2 }], frq: [{ texto: 'Sadismo Cega o Julgamento em Combate', grau: 3 }] }
    ]
  },

  // ── alto (DB-only, no markdown) ──
  'Estrela Polar': {
    cards: [
      { nome: 'Velocista Supersónico', pod: [{ texto: 'Velocidade Supersónica', grau: 5 }, { texto: 'Voo e Reflexos Sobre-Humanos', grau: 4 }, { texto: 'Corre sobre Água e Superfícies Verticais sem Perder o Passo', grau: 3 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Herança da Alfa Flight', pod: [{ texto: 'Gêmeo de Aurora', grau: 3 }, { texto: 'Ex-membro da Alfa Flight', grau: 3 }], frq: [{ texto: 'Orgulho Francês-Canadense', grau: 2 }] },
      { nome: 'Ícone Pioneiro', pod: [{ texto: 'Símbolo Pioneiro da Comunidade LGBTQ+ Entre Heróis', grau: 2 }], frq: [{ texto: 'Impaciência com Preconceito Vira Confronto Direto', grau: 2 }] }
    ]
  },
  'Foxx': {
    cards: [
      { nome: 'Mística Infiltrada', pod: [{ texto: 'Metamorfismo Perfeito (Mística)', grau: 6 }, { texto: 'Imita Voz, Rosto e Impressões Digitais', grau: 5 }, { texto: 'Disfarce Indetectável', grau: 4 }, { texto: 'Mímica de Aparência e Gênero', grau: 4 }, { texto: 'Regeneração Lenta', grau: 3 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Espiã Sedutora', pod: [{ texto: 'Espionagem e Sedução de Elite', grau: 5 }, { texto: 'Provocação e Manipulação Constantes', grau: 4 }, { texto: 'Leitura Fria de Pessoas', grau: 3 }, { texto: 'Rede de Contatos no Submundo', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Veterana da Irmandade', pod: [{ texto: 'Séculos de Experiência em Combate', grau: 4 }, { texto: 'Marcialista e Assassina Letal', grau: 4 }, { texto: 'Sabotagem e Infiltração', grau: 3 }, { texto: 'Nervos de Aço', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Agente Duplo', pod: [{ texto: 'Testa os Limites de Gambit', grau: 3 }, { texto: 'Infiltrada entre os Alunos', grau: 3 }], frq: [{ texto: 'Identidade Oculta', grau: 3 }] },
      { nome: 'Lealdade Incerta', pod: [], frq: [{ texto: 'Agenda Secreta Própria', grau: 4 }, { texto: 'Lealdade Questionável', grau: 4 }, { texto: 'Frieza que Afasta Vínculos', grau: 3 }, { texto: 'Manipuladora por Instinto', grau: 2 }] }
    ]
  },
  'Loa': {
    cards: [
      { nome: 'Toque Dissipador', pod: [{ texto: 'Fase Através da Matéria Sólida', grau: 5 }, { texto: 'Desintegração por Contato', grau: 5 }, { texto: 'Rastros de Decomposição', grau: 4 }, { texto: 'Intangibilidade Defensiva', grau: 4 }, { texto: 'Ataque que Ignora Armaduras', grau: 3 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Alma Havaiana', pod: [{ texto: 'Espírito Livre e Praiano', grau: 4 }, { texto: 'Misticismo das Ilhas', grau: 3 }, { texto: 'Otimismo Contagiante', grau: 3 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Provação Vampírica', pod: [{ texto: 'Sobreviveu à Mordida de um Vampiro', grau: 3 }, { texto: 'Amizade com Anole e Match', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Deslize Perigoso', pod: [], frq: [{ texto: 'Poder Destrutivo que a Assusta', grau: 3 }, { texto: 'Medo de Machucar Quem Ama', grau: 3 }, { texto: 'Controle Instável sob Emoção', grau: 2 }, { texto: 'Inexperiente em Batalha', grau: 2 }] },
      { nome: 'Sonhadora', pod: [{ texto: 'Curiosidade Insaciável', grau: 3 }, { texto: 'Lealdade aos Corsários', grau: 2 }], frq: [{ texto: 'Distrai-se Facilmente', grau: 2 }, { texto: 'Adolescente Impulsiva', grau: 2 }] }
    ]
  },
  'Morbius': {
    cards: [
      { nome: 'Vampiro Genial', pod: [{ texto: 'Gênio em Bioquímica e Hematologia', grau: 5 }, { texto: 'Voo Sobre-Humano', grau: 4 }, { texto: 'Fator de Cura Acelerado', grau: 4 }], frq: [{ texto: 'Sede Incontrolável por Sangue', grau: 4 }, { texto: 'Aversão à Luz Solar', grau: 3 }] },
      { nome: 'Médico Monstruoso', pod: [{ texto: 'Hipnose e Controle Mental', grau: 4 }, { texto: 'Garras e Presas Retráteis', grau: 4 }, { texto: 'Mordida Transforma Vítimas em Vampiros', grau: 5 }], frq: [{ texto: 'Ausência de Alma (confirmada por Doutor Estranho)', grau: 5 }] },
      { nome: 'Predador Sobre-Humano', pod: [{ texto: 'Força e Velocidade Muito Superiores a um Humano', grau: 3 }, { texto: 'Ecolocalização Sonora Detecta Presas no Escuro Absoluto', grau: 3 }, { texto: 'Reflexos Predatórios Aguçados em Combate', grau: 3 }], frq: [{ texto: 'Fome Intensifica-se e Ameaça o Controle em Combate Prolongado', grau: 3 }] },
      { nome: 'Morgan Michaels', pod: [{ texto: 'Soro de Sangue Irradiado (transformação temporária em humano)', grau: 3 }, { texto: 'Identidade Falsa (Morgan Michaels)', grau: 3 }], frq: [{ texto: 'Sangue Lilin Corruptor (pode perder o controle)', grau: 3 }] }
    ]
  },
  'Três‑em‑Uma (Stepford Cuckoos)': {
    cards: [
      { nome: 'Mente de Colmeia', pod: [{ texto: 'Mente de Colmeia Telepática', grau: 6 }, { texto: 'Telepatia de Nível Ômega em Conjunto', grau: 5 }, { texto: 'Ilusões e Ataques Psíquicos', grau: 4 }, { texto: 'Controle Mental Coordenado', grau: 4 }, { texto: 'Leitura Simultânea de Muitas Mentes', grau: 3 }, { texto: 'Ilusões Telepáticas Indistinguíveis da Realidade', grau: 5 }, { texto: 'Escudo Psíquico Triplicado Quase Impenetrável', grau: 5 }, { texto: 'Compartilha Sentidos e Memórias Instantaneamente entre as Três', grau: 4 }, { texto: 'Rajadas Psíquicas Ofensivas Devastadoras', grau: 5 }, { texto: 'Coordenação Tática Perfeita via Vínculo Mental', grau: 4 }, { texto: 'Fusão Temporária das Três Mentes em Uma Só', grau: 5 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Diamante Herdado', pod: [{ texto: 'Forma de Diamante (como Emma)', grau: 4 }, { texto: 'Elegância Fria e Calculista', grau: 3 }, { texto: 'Filhas/Clones de Emma Frost', grau: 3 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Trio Inseparável', pod: [{ texto: 'Completam as Frases umas das Outras', grau: 3 }, { texto: 'Falam como uma Só Voz', grau: 3 }, { texto: 'Alunas de Elite do Instituto', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Força Interior', pod: [{ texto: 'Táticas Avançadas', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Perícia em Campo', grau: 2 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Luto e Fragmentos', pod: [], frq: [{ texto: 'Luto pelas Irmãs Perdidas (Sophie e Esme)', grau: 4 }, { texto: 'Arrogância que Afasta', grau: 3 }, { texto: 'Elo Enfraquece se Separadas', grau: 3 }, { texto: 'Frieza Emocional', grau: 2 }] }
    ]
  },

  // ── medio (DB-only, no markdown) ──
  'Anole': {
    cards: [
      { nome: 'Lagarto Adaptável', pod: [{ texto: 'Camuflagem Cromática', grau: 4 }, { texto: 'Língua Preênsil Extensível', grau: 4 }, { texto: 'Garras e Aderência a Superfícies', grau: 4 }, { texto: 'Regeneração de Membros', grau: 3 }, { texto: 'Agilidade Réptil', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Orgulho de Victor', pod: [{ texto: 'Assumidamente Gay e Confiante', grau: 3 }, { texto: 'Sarcasmo como Escudo', grau: 3 }, { texto: 'Ídolo dos Alunos Marginalizados', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Irmão de Armas', pod: [{ texto: 'Melhor Amigo de Rockslide', grau: 3 }, { texto: 'Lealdade Feroz à Equipe', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Peso do Sobrevivente', pod: [], frq: [{ texto: 'Culpa de Sobrevivente (Genosha)', grau: 3 }, { texto: 'Aparência Monstruosa Julgada', grau: 2 }, { texto: 'Impulsividade Adolescente', grau: 2 }, { texto: 'Inexperiente em Combate Real', grau: 2 }] }
    ]
  },
  'Bling!': {
    cards: [
      { nome: 'Pele de Diamante', pod: [{ texto: 'Esqueleto de Diamante Semi-Orgânico', grau: 5 }, { texto: 'Arremessa Projéteis de Diamante', grau: 4 }, { texto: 'Resistência Excepcional a Dano', grau: 4 }, { texto: 'Corte Afiado no Combate', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Brilho Próprio', pod: [{ texto: 'Autoconfiança Deslumbrante', grau: 4 }, { texto: 'Assumidamente Lésbica e Estilosa', grau: 3 }, { texto: 'Presença de Estrela', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Filha de Astros', pod: [{ texto: 'Herança de Família Musical', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Fachada Reluzente', pod: [], frq: [{ texto: 'Vaidade Exagerada', grau: 3 }, { texto: 'Esconde Medos sob o Estilo', grau: 2 }, { texto: 'Provoca Rivalidades', grau: 2 }, { texto: 'Novata em Missões Reais', grau: 2 }] }
    ]
  },
  'Boggart': {
    cards: [
      { nome: 'Pesadelo Vivo', pod: [{ texto: 'Metamorfose Aterrorizante', grau: 4 }, { texto: 'Assume a Forma do Medo do Alvo', grau: 4 }, { texto: 'Intimidação Psicológica', grau: 3 }, { texto: 'Aparência Naturalmente Sinistra', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Comediante Sombrio', pod: [{ texto: 'Humor Negro e Brincalhão', grau: 3 }, { texto: 'Leal aos Amigos Ferozmente', grau: 3 }, { texto: 'Alívio Cômico da Equipe', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Incompreendido', pod: [{ texto: 'Coração Gentil sob a Máscara', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Rosto que Assusta', pod: [], frq: [{ texto: 'Aspecto Assustador Permanente', grau: 3 }, { texto: 'Rejeitado por Estranhos', grau: 3 }, { texto: 'Insegurança com a Aparência', grau: 2 }, { texto: 'Inexperiente em Combate', grau: 2 }] }
    ]
  },
  'Dríade': {
    cards: [
      { nome: 'Voz da Floresta', pod: [{ texto: 'Comunhão e Manipulação da Flora', grau: 5 }, { texto: 'Fala com as Plantas', grau: 4 }, { texto: 'Cresce Vegetação Instantânea', grau: 3 }, { texto: 'Enredamento por Raízes e Cipós', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Raiz Profunda', pod: [{ texto: 'Serenidade de Floresta Antiga', grau: 3 }, { texto: 'Ligação Espiritual com a Natureza', grau: 3 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Guardiã Verde', pod: [{ texto: 'Cuidado com os Vulneráveis', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Teimosia de Carvalho', pod: [], frq: [{ texto: 'Teimosa e Imóvel quando Provocada', grau: 3 }, { texto: 'Torna-se Espinhosa sob Estresse', grau: 2 }, { texto: 'Depende de Ambiente com Vida', grau: 2 }, { texto: 'Novata em Combate', grau: 2 }] }
    ]
  },
  'Dust (Poeira)': {
    cards: [
      { nome: 'Tempestade de Areia', pod: [{ texto: 'Transforma-se em Nuvem de Areia Abrasiva', grau: 5 }, { texto: 'Controle de Partículas Finas', grau: 4 }, { texto: 'Esfola Inimigos como Lixa', grau: 4 }, { texto: 'Forma Intangível Evasiva', grau: 3 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Fé Inabalável', pod: [{ texto: 'Muçulmana Devota (usa niqab)', grau: 4 }, { texto: 'Determinação Silenciosa', grau: 4 }, { texto: 'Modéstia de Princípio', grau: 3 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Longe de Casa', pod: [{ texto: 'Refugiada do Afeganistão', grau: 3 }, { texto: 'Amizade Leal com Mercúrio', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Reserva', pod: [], frq: [{ texto: 'Timidez e Reserva', grau: 3 }, { texto: 'Trauma de Cativeiro no Passado', grau: 2 }, { texto: 'Estranheza Cultural a Isola', grau: 2 }, { texto: 'Inexperiente em Combate', grau: 2 }] }
    ]
  },
  'Espectro': {
    cards: [
      { nome: 'Fantasma Andante', pod: [{ texto: 'Intangibilidade', grau: 5 }, { texto: 'Invisibilidade Parcial', grau: 4 }, { texto: 'Atravessa Paredes', grau: 4 }, { texto: 'Evasão e Fuga', grau: 3 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Alma Distante', pod: [{ texto: 'Humor Seco e Sussurrado', grau: 3 }, { texto: 'Observador Perspicaz', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Aparece na Hora Certa', pod: [{ texto: 'Surge do Nada quando a Equipe Precisa', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Fuga Constante', pod: [], frq: [{ texto: 'Foge dos Conflitos', grau: 3 }, { texto: 'Introversão e Melancolia', grau: 3 }, { texto: 'Distante e Esquivo', grau: 2 }, { texto: 'Evita Compromisso', grau: 2 }] }
    ]
  },
  'Espinho': {
    cards: [
      { nome: 'Chuva de Espinhos', pod: [{ texto: 'Projeta Espinhos pelo Corpo', grau: 5 }, { texto: 'Defesa e Ataque à Distância', grau: 4 }, { texto: 'Manto Perfurante', grau: 3 }, { texto: 'Cobertura de Supressão', grau: 3 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Casca Defensiva', pod: [{ texto: 'Lealdade Extrema aos Próximos', grau: 2 }, { texto: 'Coragem Silenciosa', grau: 2 }], frq: [{ texto: 'Personalidade Eriçada e Reclusa', grau: 3 }] },
      { nome: 'Desejo de Pertencer', pod: [{ texto: 'Anseia por Aceitação', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Muros Internos', pod: [], frq: [{ texto: 'Fecha-se num Casulo de Desconfiança', grau: 3 }, { texto: 'Dificuldade de Fazer Amigos', grau: 2 }, { texto: 'Autoimagem Negativa', grau: 2 }] }
    ]
  },
  'Garoto Chuva': {
    cards: [
      { nome: 'Corpo de Água', pod: [{ texto: 'Fisiologia Aquática', grau: 4 }, { texto: 'Provoca Chuva Localizada', grau: 4 }, { texto: 'Fluidez que Absorve Golpes', grau: 3 }, { texto: 'Controle da Umidade', grau: 3 }], frq: [{ texto: 'Conflitos Internos', grau: -2 }] },
      { nome: 'Céu Nublado', pod: [{ texto: 'Sensibilidade Emocional Profunda', grau: 3 }, { texto: 'Doçura Melancólica', grau: 2 }], frq: [{ texto: 'Impulsividade', grau: -2 }] },
      { nome: 'Alma Sensível', pod: [{ texto: 'Aluno do Instituto Xavier', grau: 2 }, { texto: 'Bondade Genuína', grau: 2 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Tempestade Interior', pod: [], frq: [{ texto: 'Chove Quando Fica Triste', grau: 3 }, { texto: 'Melancolia que Afasta', grau: 3 }, { texto: 'Frágil a Rejeições', grau: 2 }, { texto: 'Novato Inseguro', grau: 2 }] }
    ]
  },
  'Indra': {
    cards: [
      { nome: 'Escudo Vivo', pod: [{ texto: 'Armadura Retrátil de Placas', grau: 4 }, { texto: 'Escudos Corporais Defensivos', grau: 4 }, { texto: 'Resistência a Impactos', grau: 3 }, { texto: 'Ancoragem Inabalável', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Herança Jainista', pod: [{ texto: 'Fé Hindu-Jainista Devota', grau: 4 }, { texto: 'Pacifismo de Princípio', grau: 4 }, { texto: 'Educação Rígida da Família', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Jovem entre Dois Mundos', pod: [{ texto: 'Senso de Dever', grau: 3 }, { texto: 'Cortesia e Diplomacia', grau: 3 }, { texto: 'Adolescente Mutante (14-16)', grau: 1 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Relutância do Guerreiro', pod: [], frq: [{ texto: 'Hesita em Usar Força Ofensiva', grau: 3 }, { texto: 'Medo de Desonrar a Família', grau: 3 }, { texto: 'Casamento Arranjado o Pressiona', grau: 2 }, { texto: 'Novato sob Pressão', grau: 2 }] }
    ]
  },
  'Kidogo': {
    cards: [
      { nome: 'Gigante e Formiga', pod: [{ texto: 'Alteração de Tamanho (formiga a gigante)', grau: 5 }, { texto: 'Força Proporcional ao Tamanho', grau: 4 }, { texto: 'Resistência Colossal quando Grande', grau: 4 }, { texto: 'Furtividade quando Minúsculo', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Coração Humilde', pod: [{ texto: 'Humildade Genuína', grau: 3 }, { texto: 'Humor Contagiante', grau: 3 }, { texto: 'Faz Todos se Sentirem Bem', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Raízes Africanas', pod: [{ texto: 'Orgulho da Origem Suaíli', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Sombra da Própria Grandeza', pod: [], frq: [{ texto: 'Subestima o Próprio Poder', grau: 3 }, { texto: 'Autodepreciação Constante', grau: 2 }, { texto: 'Timidez em Assumir Liderança', grau: 2 }, { texto: 'Adolescente Inseguro', grau: 2 }] }
    ]
  },
  'Mira (Pinpoint)': {
    cards: [
      { nome: 'Precisão Absoluta', pod: [{ texto: 'Localiza Assinaturas Energéticas', grau: 5 }, { texto: 'Identifica Pontos Fracos', grau: 4 }, { texto: 'Nunca se Perde (literalmente)', grau: 3 }, { texto: 'Percepção Tática Aguçada', grau: 3 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Mente Metódica', pod: [{ texto: 'Raciocínio Analítico e Frio', grau: 4 }, { texto: 'Memória Espacial Perfeita', grau: 3 }, { texto: 'Estrategista de Reconhecimento', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Valor de Batedora', pod: [{ texto: 'Indispensável em Missões', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Excesso de Confiança', pod: [], frq: [{ texto: 'Arrogância pela Precisão', grau: 3 }, { texto: 'Impaciência com os Menos Exatos', grau: 2 }, { texto: 'Frágil em Combate Corpo a Corpo', grau: 2 }, { texto: 'Inexperiente sob Fogo', grau: 2 }] }
    ]
  },
  'Moça de Borracha': {
    cards: [
      { nome: 'Corpo Elástico', pod: [{ texto: 'Elasticidade e Maleabilidade Total', grau: 5 }, { texto: 'Amortece Impactos', grau: 4 }, { texto: 'Estica-se a Grandes Distâncias', grau: 4 }, { texto: 'Molda-se a Qualquer Forma', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Otimismo Blindado', pod: [{ texto: 'Humor Físico e Palhaçadas', grau: 4 }, { texto: 'Otimismo Inabalável', grau: 3 }, { texto: 'Usa o Riso como Armadura', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Espírito de Equipe', pod: [{ texto: 'Adapta-se a Qualquer Situação', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Distração', pod: [], frq: [{ texto: 'Desajeitada e Distraída', grau: 3 }, { texto: 'Esconde Inseguranças no Humor', grau: 2 }, { texto: 'Leva Combate Pouco a Sério', grau: 2 }, { texto: 'Novata em Missões', grau: 2 }] }
    ]
  },
  'Náiade': {
    cards: [
      { nome: 'Senhora das Águas', pod: [{ texto: 'Hidrocinese em Estado Líquido', grau: 5 }, { texto: 'Manipula Grandes Volumes de Água', grau: 4 }, { texto: 'Purifica ou Contamina Água', grau: 3 }, { texto: 'Chicotes e Escudos de Água', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Temperamento de Maré', pod: [{ texto: 'Personalidade Fluida e Serena', grau: 3 }, { texto: 'Adapta-se como a Corrente', grau: 3 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Serenidade Aprendida', pod: [{ texto: 'Calma que Acalma os Outros', grau: 3 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Águas Turvas', pod: [], frq: [{ texto: 'Torna-se Turbulenta sob Pressão', grau: 3 }, { texto: 'Depende de Fonte de Água', grau: 3 }, { texto: 'Emoção Descontrola o Poder', grau: 2 }, { texto: 'Novata em Batalha', grau: 2 }] }
    ]
  },
  'Onyxx': {
    cards: [
      { nome: 'Tanque de Granito', pod: [{ texto: 'Corpo de Pedra Sólida', grau: 5 }, { texto: 'Superforça e Resistência', grau: 5 }, { texto: 'Muralha Viva em Combate', grau: 4 }, { texto: 'Investida Devastadora', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Coração de Ouro', pod: [{ texto: 'Jeito Rapper e Fanfarrão', grau: 3 }, { texto: 'Protetor Secreto dos Mais Fracos', grau: 3 }, { texto: 'Presença Divertida', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Grandalhão do Instituto', pod: [{ texto: 'Aluno do Instituto Xavier', grau: 2 }, { texto: 'Condicionamento Bruto', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Peso da Pedra', pod: [], frq: [{ texto: 'Movimentos Lentos', grau: 3 }, { texto: 'Esconde a Bondade por Vergonha', grau: 2 }, { texto: 'Alvo por Ser Grande', grau: 2 }, { texto: 'Inexperiente em Tática', grau: 2 }] }
    ]
  },
  'Rede (Network)': {
    cards: [
      { nome: 'Rede Telepática', pod: [{ texto: 'Transmissão Telepática em Massa', grau: 5 }, { texto: 'Leitura de Pensamentos como Rede Social', grau: 4 }], frq: [{ texto: 'Fragilidade Emocional', grau: -2 }] },
      { nome: 'Instinto de Sobrevivência', pod: [{ texto: 'Reflexos Rápidos', grau: 3 }, { texto: 'Lealdade', grau: 2 }, { texto: 'Habilidade Especial', grau: 2 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Tática de Combate', pod: [{ texto: 'Trabalho em Equipe', grau: 3 }, { texto: 'Instinto de Sobrevivência', grau: 2 }, { texto: 'Conhecimento Tático', grau: 2 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Fofoca Digital', pod: [{ texto: 'Irreverência e Fofoca', grau: 3 }], frq: [{ texto: 'Maturidade em Crescimento', grau: 2 }, { texto: 'Pode Invadir a Privacidade Alheia', grau: 3 }] }
    ]
  },
  'Trovão': {
    cards: [
      { nome: 'Voz de Trovão', pod: [{ texto: 'Ondas de Choque Sônicas pela Voz', grau: 5 }, { texto: 'Gera Trovões e Vibrações', grau: 4 }, { texto: 'Ataque em Área Ensurdecedor', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Alma Incandescente', pod: [{ texto: 'Espírito Brasileiro Contagiante', grau: 3 }, { texto: 'Paixão pelo Futebol e Samba', grau: 2 }, { texto: 'Energia que Anima a Equipe', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Coração Grande', pod: [{ texto: 'Generosidade Calorosa', grau: 3 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Estouro', pod: [], frq: [{ texto: 'Temperamento Explosivo', grau: 3 }, { texto: 'Danos Acústicos Involuntários', grau: 3 }, { texto: 'Fala Mais Alto que Pensa', grau: 2 }, { texto: 'Novato Impulsivo', grau: 2 }] }
    ]
  },
  'Umbra': {
    cards: [
      { nome: 'Andarilha das Sombras', pod: [{ texto: 'Viagem e Manipulação de Sombras', grau: 5 }, { texto: 'Furtividade e Infiltração Absolutas', grau: 4 }, { texto: 'Ataques a partir da Penumbra', grau: 3 }, { texto: 'Camuflagem nas Trevas', grau: 3 }], frq: [{ texto: 'Culpa e Arrependimento', grau: -2 }] },
      { nome: 'Guardiã Silenciosa', pod: [{ texto: 'Protege em Silêncio', grau: 3 }, { texto: 'Observa Mais do que Age', grau: 3 }], frq: [{ texto: 'Responsabilidade que Pesa', grau: -2 }] },
      { nome: 'Enigma', pod: [{ texto: 'Mistério que Intriga a Equipe', grau: 2 }, { texto: 'Aluna do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
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
      { nome: 'Gás Nobre', pod: [{ texto: 'Emissão de Gases e Energias Espectrais', grau: 4 }, { texto: 'Cria Ilusões Gasosas', grau: 4 }, { texto: 'Brilho Luminoso Desorientador', grau: 3 }, { texto: 'Forma Gasosa Evasiva', grau: 3 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Inconstância Nobre', pod: [{ texto: 'Carisma Volátil e Cintilante', grau: 3 }, { texto: 'Criatividade Imprevisível', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Presença Efêmera', pod: [{ texto: 'Surge e Some sem Aviso', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Arrogância', grau: -2 }] },
      { nome: 'Instabilidade', pod: [], frq: [{ texto: 'Humor Volátil (brilha e apaga)', grau: 3 }, { texto: 'Dificuldade de se Fixar Física e Mentalmente', grau: 3 }, { texto: 'Pouca Constância em Treino', grau: 2 }, { texto: 'Inexperiente', grau: 2 }] }
    ]
  },

  // ── baixo (DB-only) ──
  'Flubber': {
    cards: [
      { nome: 'Geleia Viva', pod: [{ texto: 'Massa Gelatinosa e Elástica', grau: 4 }, { texto: 'Maleabilidade Extrema', grau: 3 }, { texto: 'Espreme-se por Qualquer Fresta', grau: 3 }], frq: [{ texto: 'Trauma Não Resolvido', grau: -2 }] },
      { nome: 'Alma Boba', pod: [{ texto: 'Entusiasmo Contagiante', grau: 4 }, { texto: 'Não Tem Um Osso Mau (literalmente)', grau: 2 }, { texto: 'Aluno do Instituto Xavier', grau: 2 }], frq: [{ texto: 'Insegurança Constante', grau: -2 }] },
      { nome: 'Trapalhão', pod: [], frq: [{ texto: 'Desastre Desajeitado', grau: 3 }, { texto: 'Alvo Fácil e Frágil', grau: 3 }, { texto: 'Leva Pouco a Sério', grau: 2 }] }
    ]
  },

  // ── Missing Major Characters from Respect Threads ──
  'Nate Grey (X-Man)': {
    cards: [
      { nome: 'Shaman / X-Man (Potencial Ômega Pleno)', pod: [{ texto: 'Telepatia Planetária/Cósmica (Sem Vírus T-O)', grau: 5 }, { texto: 'Telecinese Molecular/Atômica (Cria/Destrói Matéria)', grau: 5 }, { texto: 'Manipulação Realidade Local (Altera Física/Probabilidade)', grau: 5 }, { texto: 'Precognição Estratégica (Vê Futuro Imediato)', grau: 5 }, { texto: 'Projeção Astral Cósmica (Corpo de Energia Psiônica)', grau: 5 }, { texto: 'Viagem Dimensional / Teletransporte Interestelar', grau: 5 }, { texto: 'Absorve/Projeta Energia Ilimitada (Solar/Psíquica)', grau: 5 }, { texto: 'Cria Vida/Matéria do Nada (Manipulação Molecular Total)', grau: 5 }, { texto: 'Bloqueia/Anula Poderes Psíquicos Alheios (Mesmo Ômega)', grau: 5 }, { texto: 'Cura Física e Mental Instantânea (Própria e Alheia)', grau: 5 }], frq: [{ texto: 'Queima Vida Própria / Vida Encurtada', grau: 5 }, { texto: 'Instabilidade Mental (Muitos Poderes)', grau: 4 }] },
      { nome: 'Filho Genético de Jean + Scott (Era de Apocalipse)', pod: [{ texto: 'Genética Ômega Pura (Sem Vírus T-O)', grau: 5 }, { texto: 'Potencial Igual/Supere Mãe (Jean Grey)', grau: 5 }, { texto: 'Imune a Manipulação Genética (Sinistro/Apocalipse)', grau: 4 }], frq: [{ texto: 'Alvo Constante: Apocalipse/Sinistro/Onslaught', grau: 4 }] },
      { nome: 'Shaman / Curador Psíquico', pod: [{ texto: 'Cura Trauma Mental/PTSD em Massa', grau: 4 }, { texto: 'Restaura Mentes Quebradas (Legion, etc.)', grau: 5 }, { texto: 'Comunicação com Espíritos/Plano Astral', grau: 4 }, { texto: 'Cura Física via Telecinese Molecular', grau: 4 }], frq: [{ texto: 'Assume Dor/Culpa dos Curados', grau: 4 }] },
      { nome: 'Precognição / Visão do Tempo', pod: [{ texto: 'Vê Todas Linhas Temporais Simultaneamente', grau: 5 }, { texto: 'Prevê Ações Inimigas Antes de Acontecerem', grau: 5 }, { texto: 'Alerta Psíquico Global (Ameaças Cósmicas)', grau: 4 }], frq: [{ texto: 'Fardo de Ver Futuros Ruins', grau: 4 }] }
    ]
  },
  'Nate Grey (X-Man - Suprimido / Início)': {
    cards: [
      { nome: 'Telepatia/Telecinese Poderosa Mas Instável', pod: [{ texto: 'Leitura Mental Alcance Continental', grau: 4 }, { texto: 'Telecinese Levita Edifícios', grau: 4 }, { texto: 'Escudos Psíquicos Fortes', grau: 4 }, { texto: 'Projeção Astral', grau: 3 }], frq: [{ texto: 'Picos de Poder Causam Hemorragia/Desmaio', grau: 4 }, { texto: 'Dificuldade Controlar Escala', grau: 4 }] },
      { nome: 'Precognição Fragmentada', pod: [{ texto: 'Visões Futuro Próximo (Segundos/Minutos)', grau: 3 }, { texto: 'Sente Perigo Iminente', grau: 4 }], frq: [{ texto: 'Visões Dolorosas / Desorientam', grau: 3 }] },
      { nome: 'Genética Ômega (Jean + Scott AoA)', pod: [{ texto: 'Potencial Ilimitado (Sem Vírus T-O)', grau: 5 }, { texto: 'Imune a Vírus Techno-Orgânico', grau: 4 }], frq: [{ texto: 'Poder Cresce Exponencialmente / Perigo p/ Si Mesmo', grau: 4 }] },
      { nome: 'Soldado / Sobrevivente Era de Apocalipse', pod: [{ texto: 'Táticas Guerrilha / Emboscada', grau: 4 }, { texto: 'Resistência Mental a Tortura/Lavagem Cerebral', grau: 4 }, { texto: 'Conhecimento Tecnologia Apocalipse', grau: 3 }], frq: [{ texto: 'PTSD Severo / Trauma Infância', grau: 4 }] }
    ]
  },
  'Onslaught': {
    cards: [
      { nome: 'Onslaught: Fusão Xavier + Magneto + Franklin Richards + Nate Grey', pod: [{ texto: 'Telepatia + Telecinese + Magnetismo Nível Cósmico', grau: 5 }, { texto: 'Criou Realidade de Bolso (Era Heroes Reborn)', grau: 5 }, { texto: 'Controle Mental Planetário SEM Cerebro', grau: 5 }, { texto: 'Absorve Psiques/Poderes de Vítimas (Franklin, Nate)', grau: 5 }, { texto: 'Projeção Astral Ofensiva = Dano Físico Real', grau: 5 }, { texto: 'Reprogramou Sentinelas Globalmente em Segundos', grau: 5 }, { texto: 'Imune a Telepatia Externa (Mente Híbrida)', grau: 5 }, { texto: 'Criou Corpos Físicos de Energia Psiônica', grau: 5 }, { texto: 'Absorveu a Força Vital de Franklin Richards e Nate Grey', grau: 5 }, { texto: 'Poder Suficiente para Desafiar Vingadores e X-Men Combinados', grau: 5 }], frq: [{ texto: 'Manifestação da Raiva/Trauma Recalcado de Xavier', grau: 5 }, { texto: 'Personalidade Xavier Submergida/Suprimida', grau: 5 }, { texto: 'Destruição Inevitável da Psique Original', grau: 5 }] },
      { nome: 'Magnetismo Absoluto (Herda Magneto)', pod: [{ texto: 'Manipula Espectro Eletromagnético Total', grau: 5 }, { texto: 'Move Asteroides / Inverte Polos Magnéticos', grau: 5 }, { texto: 'Escudo Magnético Planetário', grau: 5 }, { texto: 'Extrai Adamantium de Wolverine', grau: 5 }, { texto: 'Cria Constructos Magnéticos Ofensivos', grau: 5 }, { texto: 'Detecta e Rastreia Qualquer Metal na Terra', grau: 4 }, { texto: 'Voo Magnético Supersônico', grau: 4 }, { texto: 'Anula Armas e Tecnologia Metálica Inimiga', grau: 5 }, { texto: 'Manipula Correntes Elétricas via Eletromagnetismo', grau: 4 }, { texto: 'Inverte Polos Magnéticos do Planeta', grau: 5 }], frq: [{ texto: 'Exaustão Física e Mental', grau: -2 }] },
      { nome: 'Telepatia Cósmica (Herda Xavier + Franklin + Nate)', pod: [{ texto: 'Acesso Bilhões Mentes Simultaneamente', grau: 5 }, { texto: 'Reescreve Realidade via Psique Coletiva', grau: 5 }, { texto: 'Cria Realidade de Bolso (Heroes Reborn)', grau: 5 }, { texto: 'Bloqueia Telepatas Nível Ômega (Xavier/Jean/Emma)', grau: 5 }, { texto: 'Controla Emoções Coletivas da Humanidade', grau: 5 }, { texto: 'Apaga e Reescreve Memórias em Massa', grau: 5 }, { texto: 'Detecta Qualquer Mutante ou Metaumano no Planeta', grau: 5 }, { texto: 'Projeta Ilusões Psíquicas Indistinguíveis da Realidade', grau: 5 }, { texto: 'Fragmenta e Aprisiona Mentes no Plano Astral', grau: 5 }, { texto: 'Resiste a Ataques Combinados de Múltiplos Telepatas Ômega', grau: 5 }], frq: [{ texto: 'Passado Que Assombra', grau: -2 }] },
      { nome: 'Realidade de Bolso / Onipotência Local', pod: [{ texto: 'Cria Universos de Bolso Completos', grau: 5 }, { texto: 'Reescreve Leis Físicas Locais', grau: 5 }, { texto: 'Ressuscita Mortos como Servos Psíquicos', grau: 5 }, { texto: 'Manipula Tempo/Espaço no Bolso', grau: 5 }, { texto: 'Substitui a Realidade Prime pela Sua Própria', grau: 5 }, { texto: 'Aprisiona Heróis Inteiros em Falsas Memórias', grau: 5 }, { texto: 'Controla o Fluxo Causal Dentro do Bolso', grau: 5 }, { texto: 'Fabrica Exércitos e Cidades Inteiras à Vontade', grau: 5 }, { texto: 'Impõe Suas Regras como Leis Físicas Absolutas', grau: 5 }, { texto: 'Mantém a Ilusão Estável por Meses (Heroes Reborn)', grau: 5 }], frq: [{ texto: 'Instável - Requer Poder Constante Absorvido', grau: 4 }] }
    ]
  },
  'Legion (David Haller)': {
    cards: [
      { nome: 'Mutante Ômega: Múltiplas Personalidades = Múltiplos Poderes', pod: [{ texto: 'Cada Personalidade = Poder Ômega Diferente', grau: 5 }, { texto: 'Telepatia, Telecinese, Pirocinese, Realidade, Tempo', grau: 5 }, { texto: 'Centenas de Personalidades / Poderes', grau: 5 }, { texto: 'Personalidade Dominante Controla Acesso', grau: 4 }, { texto: 'Personalidades Podem se Manifestar Fisicamente', grau: 5 }, { texto: 'Fusão de Personalidades Cria Poderes Híbridos Únicos', grau: 5 }, { texto: 'Cada Crise Emocional Gera Nova Personalidade', grau: 4 }, { texto: 'Acesso Consciente a Décadas de Memórias Alheias', grau: 4 }, { texto: 'Capaz de Apagar ou Absorver Personalidades Rivais', grau: 5 }, { texto: 'Legion Prime: Fusão de Todas as Personalidades em Uma', grau: 5 }], frq: [{ texto: 'Instabilidade Mental Extrema', grau: 5 }, { texto: 'Personalidades Lutam por Controle', grau: 5 }, { texto: 'Perda de Memória/Identidade', grau: 4 }] },
      { nome: 'Personalidades Notáveis (Exemplos)', pod: [{ texto: 'Jemail Karami (Telepatia)', grau: 4 }, { texto: 'Jack Wayne (Telecinese)', grau: 4 }, { texto: 'Cyndi (Pirocinese)', grau: 4 }, { texto: 'Sally (Teleporte)', grau: 4 }, { texto: 'Karma (Absorção Psíquica)', grau: 4 }, { texto: 'Delphie (Precognição)', grau: 4 }, { texto: 'Chamber (Energia)', grau: 4 }, { texto: 'Styx (Morte/Entropia)', grau: 5 }, { texto: 'Moira (Realidade)', grau: 5 }, { texto: 'Rebel (Manipulação de Tecnologia)', grau: 4 }], frq: [{ texto: 'Mudança Involuntária Sob Estresse', grau: 4 }] },
      { nome: 'Mutante Ômega: Manipulação Realidade (Moira/X-Man)', pod: [{ texto: 'Reescreve Realidade Local (Moira Persona)', grau: 5 }, { texto: 'Cria/Apaga Linhas Temporais', grau: 5 }, { texto: 'Onipotência Local Quando Personalidade Certa', grau: 5 }, { texto: 'Fundiu a Terra com Sua Própria Mente (Age of X)', grau: 5 }, { texto: 'Cria Realidades de Bolso Habitadas por Bilhões', grau: 5 }, { texto: 'Apaga a Existência do Pai da Linha do Tempo', grau: 5 }, { texto: 'Reescreve a História Pessoal de Aliados Inteiros', grau: 5 }, { texto: 'Rivaliza Entidades Cósmicas em Escala Planetária', grau: 5 }, { texto: 'Manipula Probabilidade e Causalidade', grau: 5 }, { texto: 'Controla Múltiplas Linhas Temporais Simultaneamente', grau: 5 }], frq: [{ texto: 'Não Controla Qual Personalidade Surge', grau: 5 }] }
    ]
  },
  'Quentin Quire (Kid Omega)': {
    cards: [
      { nome: 'Telepatia Ômega de Próxima Geração', pod: [{ texto: 'Processa Pensamentos Velocidade da Luz', grau: 5 }, { texto: 'Leitura Mental Global Simultânea', grau: 5 }, { texto: 'Constrói Mentes/Realidades Mentais', grau: 5 }, { texto: 'Hackeia Tecnologia/Cérebros Via Telepatia', grau: 5 }, { texto: 'Sobrecarga Psíquica = Dano Físico Cerebral', grau: 5 }, { texto: 'Controle Mental em Massa Instantâneo (Multidões)', grau: 5 }, { texto: 'Cria Ilusões Telepáticas Indistinguíveis da Realidade', grau: 5 }, { texto: 'Bloqueia/Resiste Invasão de Outros Telepatas Ômega', grau: 5 }, { texto: 'Acessa e Copia Memórias/Conhecimento Instantaneamente', grau: 5 }, { texto: 'Projeção Astral de Combate em Escala de Cidade', grau: 5 }], frq: [{ texto: 'Arrogância Extrema / Narcisismo', grau: 4 }, { texto: 'Queima Próprio Cérebro se Exagerar', grau: 4 }] },
      { nome: 'Fênix Force (Hospedeiro Temporário)', pod: [{ texto: 'Telepatia Cósmica', grau: 5 }, { texto: 'Telecinese Molecular', grau: 5 }, { texto: 'Chamas Fênix', grau: 5 }, { texto: 'Ressurreição', grau: 5 }], frq: [{ texto: 'Fênix Consome / Rejeita Hospedeiro Instável', grau: 5 }] },
      { nome: 'Intelecto Nível Gênio / Omega-Level Intellect', pod: [{ texto: 'Processa Informação Velocidade Super-Humana', grau: 5 }, { texto: 'Poliglota Instantâneo / Baixa Conhecimento', grau: 4 }, { texto: 'Estrategista Tático Imbatível (Mente)', grau: 5 }], frq: [{ texto: 'Despreza Autoridade / Regras', grau: 4 }] },
      { nome: 'Líder Omega Gang / Revolucionário Mutante', pod: [{ texto: 'Carisma Manipulador / Recruta Seguidores', grau: 4 }, { texto: 'Terrorismo Psíquico / Anarquia', grau: 4 }], frq: [{ texto: 'Inimigo de Autoridades (X-Men, SHIELD, Governos)', grau: 4 }] }
    ]
  },
  'Hope Summers (Messias Mutante)': {
    cards: [
      { nome: 'Mimética de Poderes Mutantes (Perfeita)', pod: [{ texto: 'Copia QUALQUER Poder Mutante Perto (Sem Limite)', grau: 5 }, { texto: 'Mantém Poderes Copiados Indefinidamente', grau: 5 }, { texto: 'Sincroniza Múltiplos Poderes Simultaneamente', grau: 5 }, { texto: 'Melhora Poderes Copiados (Versão Ômega)', grau: 5 }, { texto: 'Copia Poderes Não-Mutantes (Tecnologia, Magia)', grau: 4 }, { texto: 'Manifesta Fator de Cura e Garras de Wolverine', grau: 4 }, { texto: 'Absorve Habilidades ao Tocar como Rogue', grau: 4 }, { texto: 'Replica Rajadas Óticas de Ciclope com Controle Total', grau: 4 }, { texto: 'Copia Telepatia/Telecinese de Mutantes Ômega Próximos', grau: 5 }, { texto: 'Adapta o Poder Copiado à Situação de Combate Instantaneamente', grau: 4 }, { texto: 'Combina Poderes de Vários Mutantes ao Mesmo Tempo', grau: 5 }], frq: [{ texto: 'Precisa Estar Perto do Original', grau: 3 }, { texto: 'Identidade Própria Frágil (Quem Sou Eu?)', grau: 4 }] },
      { nome: 'Messias Mutante / Conexão Fênix', pod: [{ texto: 'Atrai Força Fênix Naturalmente', grau: 5 }, { texto: 'Pode Controlar/Comandar Fênix', grau: 5 }, { texto: 'Ressuscita Mutantes Mortos (Com Fênix)', grau: 5 }, { texto: 'Cura Extinção Mutante (Luzes da Esperança)', grau: 5 }], frq: [{ texto: 'Alvo Constante: Fênix, Sinistro, Apocalipse, Bastion', grau: 5 }] },
      { nome: 'Líder / Messias da Raça Mutante', pod: [{ texto: 'Inspira Lealdade Fanática (Luzes)', grau: 4 }, { texto: 'Estrategista Nata / Treinada por Cable', grau: 5 }, { texto: 'Simbolo de Esperança Unifica Facções', grau: 4 }], frq: [{ texto: 'Peso de Ser Última Esperança', grau: 4 }] },
      { nome: 'Treinamento Cable (Soldado do Futuro)', pod: [{ texto: 'Armas Avançadas / Combate Corpo-a-Corpo', grau: 4 }, { texto: 'Sobrevivência Extrema / Táticas Guerrilha', grau: 4 }, { texto: 'Precognição Tática (Treinamento Psíquico)', grau: 4 }], frq: [{ texto: 'Trauma de Infância em Guerra', grau: 3 }] }
    ]
  },
  'Shadow King (Amahl Farouk)': {
    cards: [
      { nome: 'Entidade Psíquica Parasita Multiversal', pod: [{ texto: 'Telepatia Nível Cósmico (Rivaliza Xavier)', grau: 5 }, { texto: 'Possui Corpos / Mentes Simultaneamente', grau: 5 }, { texto: 'Vive no Plano Astral (Imortalidade Efetiva)', grau: 5 }, { texto: 'Alimenta-se de Emoções Negativas (Medo/Ódio)', grau: 5 }, { texto: 'Cria Ilusões Perfeitas / Mundos Mentais', grau: 5 }, { texto: 'Corrompe Telepatas (Mesmo Ômega)', grau: 5 }, { texto: 'Sobrevive à Morte do Corpo Hospedeiro', grau: 5 }, { texto: 'Manipula Multiversos Através do Astral', grau: 5 }, { texto: 'Rivaliza Diretamente o Poder Telepático de Xavier', grau: 5 }, { texto: 'Assimila Consciências de Vítimas Permanentemente', grau: 5 }], frq: [{ texto: 'Obsessão por Xavier / Vingança', grau: 4 }, { texto: 'Precisa de Hospedeiro Físico p/ Poder Total', grau: 4 }] },
      { nome: 'Mestre do Plano Astral', pod: [{ texto: 'Controla Plano Astral Inteiro', grau: 5 }, { texto: 'Aprisiona Almas/Mentes no Astral', grau: 5 }, { texto: 'Manipula Sonhos Globais', grau: 5 }, { texto: 'Cria Pesadelos Coletivos', grau: 5 }, { texto: 'Constrói Reinos Inteiros Dentro do Astral', grau: 5 }, { texto: 'Corrompe Viajantes Astrais à Vontade', grau: 5 }, { texto: 'Bloqueia Retorno de Mentes ao Corpo Físico', grau: 5 }, { texto: 'Sente Qualquer Presença Psíquica no Astral', grau: 4 }, { texto: 'Drena Energia Vital Através do Astral', grau: 5 }, { texto: 'Manifesta Formas Físicas Terríveis no Astral', grau: 4 }], frq: [{ texto: 'Vulnerável no Plano Físico (Sem Corpo)', grau: 3 }] },
      { nome: 'Manipulador Genético / Psicológico', pod: [{ texto: 'Corrompe Heróis (Tempestade, Karma, Psylocke)', grau: 5 }, { texto: 'Implanta Personalidades Falsas', grau: 5 }, { texto: 'Gatilhos Pós-Hipnóticos Ocultos', grau: 5 }, { texto: 'Manipula Percepção de Realidade das Vítimas', grau: 5 }, { texto: 'Cria Personas Alternativas Permanentes nos Hospedeiros', grau: 5 }, { texto: 'Controla Emoções e Impulsos das Vítimas', grau: 5 }, { texto: 'Espalha Corrupção Psíquica em Cadeia', grau: 5 }, { texto: 'Domina Mentes Coletivas de Comunidades Inteiras', grau: 5 }, { texto: 'Resiste a Exorcismo Psíquico Convencional', grau: 4 }, { texto: 'Reconstrói Identidade da Vítima do Zero', grau: 5 }], frq: [{ texto: 'Arrogância / Subestima Humanos', grau: 3 }] }
    ]
  },
  'Mastermind (Jason Wyngarde)': {
    cards: [
      { nome: 'Ilusionista Mestre Nível Ômega', pod: [{ texto: 'Ilusões Perfeitas Enganam Todos Sentidos', grau: 5 }, { texto: 'Afeta Mentes Globalmente (Alcance Planetário)', grau: 5 }, { texto: 'Cria Realidades Alternativas Indistinguíveis', grau: 5 }, { texto: 'Ilusões Causam Dano Físico Real (Psicossomático)', grau: 5 }, { texto: 'Engana Telepatas Ômega (Xavier, Jean, Emma)', grau: 5 }, { texto: 'Manipula Memórias de Longo Prazo (Persona Fingida em Jean)', grau: 5 }, { texto: 'Sustenta Ilusões por Meses Sem Detecção', grau: 5 }, { texto: 'Cria Ilusões Compartilhadas Entre Múltiplos Alvos', grau: 5 }, { texto: 'Reescreve a Percepção de Identidade da Vítima', grau: 5 }, { texto: 'Ilusões Resistem a Contra-Sondagem Telepática', grau: 5 }], frq: [{ texto: 'Arrogância / Gosta de "Brinquedos"', grau: 3 }, { texto: 'Ilusão Quebrada = Choque Mental', grau: 3 }] },
      { nome: 'Membro Clube do Inferno (Rainha Branca)', pod: [{ texto: 'Recursos / Influência Global', grau: 4 }, { texto: 'Acesso Tecnologia Proibida', grau: 4 }, { texto: 'Influência Política e Financeira Através do Clube', grau: 4 }], frq: [{ texto: 'Lealdade Apenas a Si Mesmo', grau: 3 }] }
    ]
  },
  'Mesmero': {
    cards: [
      { nome: 'Hipnose Psíquica Absoluta', pod: [{ texto: 'Controla Mentes com Olhar/Voz', grau: 5 }, { texto: 'Comandos Pós-Hipnóticos Permanentes', grau: 5 }, { texto: 'Afeta Multidões Simultaneamente', grau: 4 }, { texto: 'Engana Telepatas (Ilusão de Controle)', grau: 4 }, { texto: 'Controla Múltiplos Alvos Sem Perder Foco', grau: 5 }, { texto: 'Apaga Memórias das Vítimas Após o Controle', grau: 5 }, { texto: 'Reprogramação Total de Personalidade em Casos Extremos', grau: 5 }, { texto: 'Resistente a Scanners Psíquicos Convencionais', grau: 4 }, { texto: 'Controla Mutantes de Vontade Moderada', grau: 4 }, { texto: 'Mantém Controle à Distância Após Contato Visual Inicial', grau: 4 }], frq: [{ texto: 'Vontade Forte Resiste / Quebra Controle', grau: 3 }] },
      { nome: 'Manipulador Sombrio', pod: [{ texto: 'Opera nas Sombras / Agente Secreto', grau: 4 }, { texto: 'Rede de Agentes Hipnotizados Globais', grau: 4 }, { texto: 'Chantageia Autoridades com Segredos Extraídos por Hipnose', grau: 4 }], frq: [{ texto: 'Obsessão por Poder/Controle', grau: 3 }] }
    ]
  },
  'Miss Sinister (Claudine Renko)': {
    cards: [
      { nome: 'Clone Feminino de Sinister / Herdeira Genética', pod: [{ texto: 'Genética Sinister Completa (Memórias/Habilidades)', grau: 5 }, { texto: 'Corpo Diamante Sintético (Como Sinister)', grau: 4 }, { texto: 'Clonagem Instantânea / Corpos Reserva', grau: 5 }, { texto: 'Engenharia Genética Divina', grau: 5 }, { texto: 'Imune a Telepatia (Diamante)', grau: 4 }, { texto: 'Manipula DNA Mutante para Criar Híbridos de Poder', grau: 5 }, { texto: 'Regeneração Celular Acelerada', grau: 5 }, { texto: 'Força e Resistência Sobre-Humanas (Forma Diamante)', grau: 4 }, { texto: 'Acesso Total às Pesquisas e Laboratórios de Sinister', grau: 4 }, { texto: 'Prevê Mutações Genéticas Antes de Ocorrerem', grau: 5 }], frq: [{ texto: 'Identidade Fragmentada (Memórias Sinister)', grau: 4 }, { texto: 'Arrogância Intelectual Herdada', grau: 3 }] },
      { nome: 'Marauders / Clones Leais', pod: [{ texto: 'Comando Clones Mutantes Poderosos', grau: 4 }, { texto: 'Rede Espionagem Global', grau: 4 }, { texto: 'Manipula Lealdade dos Clones Através de Programação Genética', grau: 4 }], frq: [{ texto: 'Clones Podem Desenvolver Vontade Própria', grau: 3 }] }
    ]
  },
  'Cosmo (Cão Espacial)': {
    cards: [
      { nome: 'Telepatia/Telecinese Canina Ômega', pod: [{ texto: 'Telepatia Alcance Interestelar', grau: 5 }, { texto: 'Telecinese Precisa (Apesar de Patas)', grau: 4 }, { texto: 'Escudos Psíquicos Protegem Knowhere', grau: 5 }, { texto: 'Comunicação Interestelar Instantânea', grau: 5 }, { texto: 'Detecta Ameaças Psíquicas em Toda a Galáxia', grau: 5 }, { texto: 'Imune a Controle Mental e Manipulação Telepática', grau: 5 }, { texto: 'Sente Emoções e Intenções de Qualquer Ser Vivo Próximo', grau: 4 }, { texto: 'Cria Constructos Telecinéticos de Contenção', grau: 4 }, { texto: 'Coordena as Defesas de Knowhere Simultaneamente pela Mente', grau: 4 }, { texto: 'Faro Psíquico: Rastreia Presenças a Anos-Luz de Distância', grau: 4 }], frq: [{ texto: 'Forma Canina Limita Manipulação Física', grau: 3 }] },
      { nome: 'Chefe de Segurança Knowhere', pod: [{ texto: 'Protege Estação Espacial Multiversal', grau: 4 }, { texto: 'Ligação com Guardiões da Galáxia', grau: 3 }], frq: [{ texto: 'Saudade de Laika / Terra', grau: 3 }] }
    ]
  },
  'Druig (Eterno)': {
    cards: [
      { nome: 'Eterno: Manipulação Mental Cósmica', pod: [{ texto: 'Controle Mental em Escala Planetária', grau: 5 }, { texto: 'Imortalidade / Regeneração Quase Absoluta', grau: 5 }, { texto: 'Voo Supersônico / Espacial', grau: 4 }, { texto: 'Manipulação Matéria/Energia Cósmica', grau: 4 }, { texto: 'Imune a Doenças/Venenos/Envelhecimento', grau: 5 }, { texto: 'Escraviza Civilizações Inteiras com Controle Mental Duradouro', grau: 5 }, { texto: 'Controla Múltiplos Alvos Simultaneamente à Distância', grau: 5 }, { texto: 'Implanta Lealdade e Memórias Falsas Permanentes', grau: 5 }, { texto: 'Imune a Controle Mental de Outros Eternos e Telepatas', grau: 5 }, { texto: 'Comanda Exércitos de Seguidores Hipnotizados por Séculos', grau: 5 }, { texto: 'Apaga e Reescreve Memórias das Vítimas', grau: 4 }], frq: [{ texto: 'Lealdade Apenas a Si Próprio / Maquinaria', grau: 3 }, { texto: 'Pode Ser Morto por Armas Cósmicas', grau: 3 }] },
      { nome: 'Mestre da Manipulação / Político Cósmico', pod: [{ texto: 'Manipula Governos/Ícones Históricos', grau: 5 }, { texto: 'Rede Espionagem Milenar', grau: 4 }], frq: [{ texto: 'Arrogância de Deus Vivo', grau: 3 }] }
    ]
  },
  'Moondragon (Heather Douglas)': {
    cards: [
      { nome: 'Telepatia Mais Poderosa da Terra (Treino Titã)', pod: [{ texto: 'Telepatia Nível Cósmico (Rivaliza Xavier)', grau: 5 }, { texto: 'Telecinese Precisa Nível Molecular', grau: 5 }, { texto: 'Projeção Astral Ofensiva/Defensiva', grau: 5 }, { texto: 'Controle Mental Global', grau: 5 }, { texto: 'Imune a Telepatia/Controle Mental', grau: 5 }, { texto: 'Pode Apagar ou Reescrever Personalidades Inteiras', grau: 5 }, { texto: 'Amplifica os Poderes Psíquicos de Aliados', grau: 5 }, { texto: 'Vasculha Mentes de Civilizações Alienígenas Inteiras', grau: 4 }, { texto: 'Combate Psíquico Capaz de Incapacitar Cosmicamente Poderosos', grau: 5 }, { texto: 'Sonda o Plano Astral em Busca de Ameaças', grau: 4 }, { texto: 'Cura Traumas Mentais Profundos com Precisão Cirúrgica', grau: 4 }], frq: [{ texto: 'Arrogância Intelectual Extrema', grau: 4 }, { texto: 'Dragão Interior (Controle Constante)', grau: 4 }] },
      { nome: 'Mestra Artista Marcial / Monja Titã', pod: [{ texto: 'Combate Corpo-a-Corpo Nível Mestre', grau: 4 }, { texto: 'Disciplina Mental Absoluta', grau: 5 }], frq: [{ texto: 'Isolamento Social / Dificuldade Confiar', grau: 3 }] }
    ]
  },
  'Sersi (Eterna)': {
    cards: [
      { nome: 'Eterna: Manipulação Matéria Ômega', pod: [{ texto: 'Transmutação Molecular/Atômica Absoluta', grau: 5 }, { texto: 'Transforma Qualquer Coisa em Qualquer Coisa', grau: 5 }, { texto: 'Cria Vida / Seres Vivos do Nada', grau: 5 }, { texto: 'Imortalidade / Regeneração Absoluta', grau: 5 }, { texto: 'Voo / Projeção Energia Cósmica', grau: 4 }, { texto: 'Ilusões Perfeitas (Manipula Luz/Matéria)', grau: 5 }, { texto: 'Transmuta Pessoas em Estátuas de Ouro ou Pedra', grau: 5 }, { texto: 'Reorganiza a Matéria de uma Cidade Inteira', grau: 5 }, { texto: 'Desintegra Matéria à Vontade', grau: 5 }, { texto: 'Absorve e Redistribui Energia Cósmica em Escala Massiva', grau: 5 }], frq: [{ texto: 'Empatia Excessiva / Afeição por Humanos', grau: 3 }, { texto: 'Dúvida Moral / Relutância em Matar', grau: 3 }] },
      { nome: 'Mestra da Manipulação / Social', pod: [{ texto: 'Influência Social / Festa / Carisma Divino', grau: 4 }, { texto: 'História Milenar / Conhecimento Antigo', grau: 4 }], frq: [{ texto: 'Amor por Humanos Acima de Eternos', grau: 3 }] }
    ]
  },
  'Thena (Eterna)': {
    cards: [
      { nome: 'Treinamento Avançado', pod: [{ texto: 'Determinação Inabalável', grau: 3 }, { texto: 'Reflexos Sobre-Humanos', grau: 2 }, { texto: 'Resistência Mental Superior', grau: 2 }], frq: [{ texto: 'Dificuldade de Confiar', grau: -2 }] },
      { nome: 'Eterna: Guerreira Primordial / Primeira Primeira', pod: [{ texto: 'Manipulação Matéria Cósmica (Igual Sersi)', grau: 5 }, { texto: 'Armas Cósmicas Manifesta da Mente', grau: 5 }, { texto: 'Voo / Velocidade Luz / Teleporte', grau: 5 }, { texto: 'Imortalidade / Invulnerabilidade Quase Total', grau: 5 }, { texto: 'Conhecimento Estratégico Milenar', grau: 5 }, { texto: 'Forja Armas de Energia Cósmica em Segundos (Espadas, Lanças, Escudos)', grau: 5 }, { texto: 'Domina Incontáveis Estilos de Combate Acumulados em Milênios', grau: 5 }, { texto: 'Rajadas de Energia Cósmica Devastadoras', grau: 5 }, { texto: 'Resistência Extrema a Dano Físico e Energia', grau: 5 }, { texto: 'Sente e Rastreia Fontes de Energia Cósmica a Grandes Distâncias', grau: 4 }], frq: [{ texto: 'Síndrome Mahd Wy\'ry (Loucurra Genética)', grau: 5 }, { texto: 'Devoção ao Dever Acima de Tudo', grau: 3 }] }
    ]
  }
};

// ── Additional tags per NPC to hit target counts ──
// Each entry: [tag objects] — added to the flat tags array
const EXTRA_TAGS = {
  // X-MEN extremo
  // grau negativo = fraqueza (não deve ser mesclado em data.tags, que é só poder)
  'Professor X': [
    { texto: 'Líder dos X-Men', grau: 5 },
    { texto: 'Intelecto Genial', grau: 4 },
    { texto: 'Fundador do Instituto Xavier', grau: 4 },
    { texto: 'Mestre em Xadrez Psíquico', grau: 3 },
    { texto: 'Diplomacia Mutante-Humano', grau: 3 },
    { texto: 'Idealismo Inabalável', grau: 4 },
    { texto: 'Rede de Contatos Global', grau: 3 },
    { texto: 'Coração Vulnerável a Traições', grau: -2 },
    { texto: 'Segredos que Pesam', grau: -2 }
  ],
  'Jean Grey': [
    { texto: 'Empatia Profunda', grau: 4 },
    { texto: 'Mentora de Jovens Mutantes', grau: 3 },
    { texto: 'Elo Psíquico com Scott', grau: 4 },
    { texto: 'Poder Latente Além da Compreensão', grau: 4 },
    { texto: 'Fênix Pode Consumir sua Consciência', grau: 4 },
    { texto: 'Medo do Próprio Poder', grau: -3 },
    { texto: 'Trauma de Morte e Renascimento', grau: -3 }
  ],
  'Emma Frost': [
    { texto: 'Professora Exigente e Eficaz', grau: 4 },
    { texto: 'Lealdade aos Alunos', grau: 3 },
    { texto: 'Ex-Rainha do Clube do Inferno', grau: 4 },
    { texto: 'Arrogância como Escudo', grau: -3 },
    { texto: 'Passado Villão Assombra', grau: -2 },
    { texto: 'Dificuldade de Confiar', grau: -2 }
  ],
  'Rachel Summers': [
    { texto: 'Rastreadora do Futuro', grau: 4 },
    { texto: 'Determinação Inabalável', grau: 3 },
    { texto: 'Trauma de Escrava', grau: -3 },
    { texto: 'Laço Familiar com Cable', grau: 3 },
    { texto: 'Poder Instável sob Estresse', grau: -2 },
    { texto: 'Isolamento por Ser do Futuro', grau: -2 }
  ],
  'Cable': [
    { texto: 'Liderança da X-Force', grau: 4 },
    { texto: 'Estrategista Pós-Apocalíptico', grau: 4 },
    { texto: 'Armamento Pesado', grau: 3 },
    { texto: 'Vírus Techno-Orgânico', grau: 4 },
    { texto: 'Obsessão com o Futuro', grau: -2 }
  ],

  // X-MEN alto
  'Ciclope': [
    { texto: 'Comandante de Campo', grau: 4 },
    { texto: 'Disciplina de Aço', grau: 4 },
    { texto: 'Estrategista Nato', grau: 3 },
    { texto: 'Amor por Jean Grey', grau: 3 },
    { texto: 'Peso da Responsabilidade', grau: -2 },
    { texto: 'Rigidez Emocional', grau: -2 }
  ],
  'Wolverine': [
    { texto: 'Samurai Interior', grau: 4 },
    { texto: 'Código de Honra Pessoal', grau: 4 },
    { texto: 'Mestre em Artes Marciais', grau: 3 },
    { texto: 'Lealdade Feroz aos Amigos', grau: 3 },
    { texto: 'Décadas de Experiência', grau: 3 },
    { texto: 'Raiva Incontrolável', grau: -2 }
  ],
  'Tempestade': [
    { texto: 'Liderança e Realeza', grau: 4 },
    { texto: 'Orgulho Africano', grau: 3 },
    { texto: 'Compaixão e Sabedoria', grau: 3 },
    { texto: 'Claustrofobia Severa', grau: -3 },
    { texto: 'Responsabilidade de Líder', grau: 2 }
  ],
  'Fera': [
    { texto: 'Médico dos X-Men', grau: 3 },
    { texto: 'Consciência da Equipe', grau: 3 },
    { texto: 'Moralidade Flexível', grau: 3 },
    { texto: 'Aparência Desfavorece Socialmente', grau: -2 },
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
    { texto: 'Trauma de Apocalipse', grau: -3 },
    { texto: 'Lado Sombrio Arcangel', grau: -3 }
  ],
  'Colossus': [
    { texto: 'Artista e Pintor', grau: 3 },
    { texto: 'Protetor da Família Rasputin', grau: 4 },
    { texto: 'Lealdade à Irmã Magik', grau: 4 },
    { texto: 'Força Interior', grau: 3 },
    { texto: 'Perda de Amigos Pesa', grau: -2 }
  ],
  'Noturno': [
    { texto: 'Acrobata Consumado', grau: 4 },
    { texto: 'Fé Católica Profunda', grau: 4 },
    { texto: 'Humor como Defesa', grau: 3 },
    { texto: 'Autoestima Frágil', grau: -2 }
  ],
  'Kitty Pryde': [
    { texto: 'Mestra em Hacking', grau: 4 },
    { texto: 'Knight de Solano', grau: 4 },
    { texto: 'Liderança Natural', grau: 3 },
    { texto: 'Fisicamente Frágil', grau: -2 },
    { texto: 'Coração Partido por Colossus', grau: -2 }
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
    { texto: 'Desconfiança dos Outros', grau: -2 }
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
    { texto: 'Obsessão com Ameaças', grau: -2 }
  ],
  'Jubileu': [
    { texto: 'Potencial Ômega Latente', grau: 5 },
    { texto: 'Protegida de Wolverine', grau: 3 },
    { texto: 'Vampira pós M-Day', grau: 3 },
    { texto: 'Potencial Ômega Bloqueado', grau: -2 }
  ],
  'Polaris': [
    { texto: 'Campo de Força Magnético', grau: 4 },
    { texto: 'Voo Magnético', grau: 3 },
    { texto: 'Instabilidade Mental', grau: -3 },
    { texto: 'Identidade Incerta', grau: -2 }
  ],
  'Havok': [
    { texto: 'Imunidade a Ciclope', grau: 3 },
    { texto: 'Liderança', grau: 3 },
    { texto: 'Síndrome do Irmão Famoso', grau: -2 }
  ],
  'X-23': [
    { texto: 'Fator de Cura Acelerado', grau: 5 },
    { texto: 'Garras de Adamantium', grau: 5 },
    { texto: 'Identidade em Construção', grau: -3 },
    { texto: 'Gatilho de Berserk', grau: -4 }
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
    { texto: 'Precisa de Fonte Sonora', grau: -2 }
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
    { texto: 'Arrogância Refinada', grau: -3 },
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
    { texto: 'Arrogância', grau: -2 }
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
    { texto: 'Impulsivo', grau: -2 },
    { texto: 'Membro dos X-Men', grau: 2 }
  ],
  'Wolfsbane': [
    { texto: 'Sentidos Lupinos', grau: 4 },
    { texto: 'Ligação com Mirage', grau: 3 },
    { texto: 'Fé Escocesa', grau: 2 },
    { texto: 'Controle Reduzido em Forma Animal', grau: -2 }
  ],
  'Karma': [
    { texto: 'Controle Múltiplo', grau: 3 },
    { texto: 'Refugiada Vietnamita', grau: 3 },
    { texto: 'Responsabilidade pelos Irmãos', grau: 3 },
    { texto: 'Amputada', grau: -1 }
  ],
  'Magma': [
    { texto: 'Forma de Rocha', grau: 4 },
    { texto: 'Nobre de Nova Roma', grau: 3 },
    { texto: 'Ingênua ao Mundo Moderno', grau: -2 }
  ],
  'Boomer': [
    { texto: 'Atitude Rebelde', grau: 2 },
    { texto: 'Chamariz de Problemas', grau: -2 }
  ],
  'Rockslide': [
    { texto: 'Força Bruta', grau: 4 },
    { texto: 'Humor', grau: 3 },
    { texto: 'Aluno do Instituto', grau: 2 }
  ],
  'Surge': [
    { texto: 'Liderança dos Novos X-Men', grau: 3 },
    { texto: 'Eletricidade', grau: 4 },
    { texto: 'Precisa de Luvas', grau: -2 }
  ],
  'Armor': [
    { texto: 'Armadura Psíquica', grau: 4 },
    { texto: 'Determinação', grau: 3 },
    { texto: 'Insegurança', grau: -2 }
  ],
  'Chamber': [
    { texto: 'Explosão Psíquica', grau: 4 },
    { texto: 'Silêncio', grau: 3 },
    { texto: 'Rosto Desfigurado', grau: -2 }
  ],
  'Husk': [
    { texto: 'Descamação', grau: 3 },
    { texto: 'Família Guthrie', grau: 2 }
  ],
  'Prodigy': [
    { texto: 'Memória Absoluta', grau: 4 },
    { texto: 'Gênio', grau: 3 },
    { texto: 'Perde ao Dormir', grau: -2 }
  ],
  'Wallflower': [
    { texto: 'Feromônios', grau: 3 },
    { texto: 'Invisível', grau: 2 },
    { texto: 'Baixa Autoestima', grau: -2 }
  ],
  'Timeslip': [
    { texto: 'Salto Temporal', grau: 3 },
    { texto: 'Controle Imperfeito', grau: -2 }
  ],
  'Impulse': [
    { texto: 'Explosão Cinética', grau: 3 },
    { texto: 'Impulsivo', grau: -2 }
  ],
  'Mirage': [
    { texto: 'Arco e Flecha', grau: 3 },
    { texto: 'Ex-Valquíria', grau: 4 },
    { texto: 'Perda de Poderes pós M-Day', grau: -2 }
  ],
  'Cypher': [
    { texto: 'Leitura Corporal', grau: 4 },
    { texto: 'Amigo de Warlock', grau: 3 },
    { texto: 'Morreu em Batalha', grau: -2 }
  ],

  // MORLOCK
  'Callisto': [
    { texto: 'Líder dos Túneis', grau: 3 },
    { texto: 'Caçadora', grau: 2 },
    { texto: 'Desconfia da Superfície', grau: -2 }
  ],
  'Marrow': [
    { texto: 'Ossos como Armas', grau: 4 },
    { texto: 'Raiva', grau: -2 },
    { texto: 'Instabilidade', grau: -2 }
  ],

  // IRMANDADE
  'Magneto': [
    { texto: 'Campo de Força Magnético', grau: 5 },
    { texto: 'Voo Magnético', grau: 4 },
    { texto: 'Visão de Supremacia Mutante', grau: 4 },
    { texto: 'Carisma Revolucionário', grau: 4 },
    { texto: 'Trauma do Holocausto', grau: -3 }
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
    { texto: 'Fogo Sem Controle', grau: -2 }
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
    { texto: 'Obsessão por Wolverine', grau: -2 }
  ],
  'Mister Sinister': [
    { texto: 'Manipulador Genético', grau: 5 },
    { texto: 'Clonagem', grau: 4 },
    { texto: 'Marotos', grau: 3 },
    { texto: 'Obsessão Summers', grau: -3 }
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
    { texto: 'Hipocrisia', grau: -2 }
  ],
  'Frenzy': [
    { texto: 'Força', grau: 4 },
    { texto: 'Pele Indestrutível', grau: 4 },
    { texto: 'Raiva', grau: -2 }
  ],
  'Agent Zero': [
    { texto: 'Fator de Cura', grau: 4 },
    { texto: 'Atirador', grau: 3 },
    { texto: 'Lavagem Cerebral', grau: -2 }
  ],
  'Trevor Fitzroy': [
    { texto: 'Portal Temporal', grau: 4 },
    { texto: 'Ambicioso', grau: 2 }
  ],

  // HUMANOS
  'Moira MacTaggert': [
    { texto: 'Geneticista', grau: 3 },
    { texto: 'Aliada dos X-Men', grau: 3 },
    { texto: 'Humana', grau: -1 }
  ],

  // CLUBE DO INFERNO
  'Shinobi Shaw': [
    { texto: 'Tecnopatia', grau: 3 },
    { texto: 'Herdeiro', grau: 2 },
    { texto: 'Sombra do Pai', grau: -2 }
  ]
};

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

  // ── Missing Major Characters from Respect Threads ──
  'Nate Grey (X-Man)': { faction: 'vilao', danger: 'extremo' },
  'Nate Grey (X-Man - Suprimido / Início)': { faction: 'x-men', danger: 'extremo' },
  'Onslaught': { faction: 'vilao', danger: 'extremo' },
  'Legion (David Haller)': { faction: 'vilao', danger: 'extremo' },
  'Quentin Quire (Kid Omega)': { faction: 'x-men', danger: 'extremo' },
  'Hope Summers (Messias Mutante)': { faction: 'x-men', danger: 'extremo' },
  'Shadow King (Amahl Farouk)': { faction: 'vilao', danger: 'extremo' },
  'Mastermind (Jason Wyngarde)': { faction: 'vilao', danger: 'extremo' },
  'Miss Sinister (Claudine Renko)': { faction: 'vilao', danger: 'extremo' },
  'Cosmo (Cão Espacial)': { faction: 'heroi', danger: 'extremo' },
  'Druig (Eterno)': { faction: 'vilao', danger: 'extremo' },
  'Moondragon (Heather Douglas)': { faction: 'heroi', danger: 'extremo' },
  'Sersi (Eterna)': { faction: 'heroi', danger: 'extremo' },
  'Thena (Eterna)': { faction: 'heroi', danger: 'extremo' },

  // ── Power-state variants (SPEC já existia, nunca tinha faction/danger — nunca eram inseridos) ──
  'Professor X (Base - Cadeira de Rodas)': { faction: 'x-men', danger: 'alto' },
  'Professor X (Onslaught)': { faction: 'vilao', danger: 'extremo' },
  'Jean Grey (Base)': { faction: 'x-men', danger: 'alto' },
  'Jean Grey (Dark Phoenix)': { faction: 'vilao', danger: 'extremo' },
  'Jean Grey (White Phoenix of the Crown)': { faction: 'x-men', danger: 'extremo' },
  'Emma Frost (Base - Rainha Branca)': { faction: 'x-men', danger: 'alto' },
  'Emma Frost (Phoenix Five / Anfitriã Fênix)': { faction: 'vilao', danger: 'extremo' },
  'Rachel Summers (Base - Sem Fênix)': { faction: 'x-men', danger: 'alto' },
  'Rachel Summers (Fênix Force - Avatar Completo)': { faction: 'x-men', danger: 'extremo' },
  'Cable (Suprimido)': { faction: 'x-men', danger: 'medio' },
  'Cable (Liberado - Sem Vírus)': { faction: 'x-men', danger: 'extremo' },
  'Apocalipse (Base - Mutante Antigo)': { faction: 'vilao', danger: 'alto' },
  'Apocalipse (Com Tecnologia Celestial Completa)': { faction: 'vilao', danger: 'extremo' },
};

// ── Review tracking for auto-generated tags ──
// Populated by generateSQL; used by --dump-review and --apply-review
const REVIEW_DATA = {};

// ── SQL GENERATION ──
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

    // ── 2. Collect all tag texts used in cards ──
    const usedTexts = new Set();
    const cardFrqTexts = new Set();
    for (const tm of temas) {
      for (const t of tm.poder) usedTexts.add(norm(t.texto));
      for (const t of tm.fraqueza) { usedTexts.add(norm(t.texto)); cardFrqTexts.add(norm(t.texto)); }
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

    // ── 5. Ensure every card has pelo menos 1 poder ──
    for (const tm of temas) {
      if (tm.fraqueza.length && !tm.poder.length) {
        const fallback = unusedPoder.shift() || genericPoder[tm.nome.length % genericPoder.length];
        tm.poder.push({ texto: fallback.texto });
        usedTexts.add(norm(fallback.texto));
      }
    }

    // ── 6. Every card with poder must have >= 1 fraqueza (hard rule, no total target) ──
    for (const tm of temas) {
      if (!tm.poder.length || tm.fraqueza.length) continue;
      const f = unusedFraqueza.shift() || genericFraqueza[tm.nome.length % genericFraqueza.length];
      if (usedTexts.has(norm(f.texto))) continue;
      tm.fraqueza.push({ texto: f.texto });
      usedTexts.add(norm(f.texto));
      if (!review[npc.name]) review[npc.name] = [];
      review[npc.name].push({ card: tm.nome, tipo: 'fraqueza', texto: f.texto });
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
    }

    // Recompute cardFrqTexts contra o `temas` final — passos 4-6 podem ter
    // adicionado cartas/fraquezas novas depois do snapshot do passo 2
    cardFrqTexts.clear();
    for (const tm of temas) for (const t of tm.fraqueza) cardFrqTexts.add(norm(t.texto));

    // Extra tags (poder only — grau negativo em EXTRA_TAGS marca fraqueza, e qualquer
    // texto que já apareça como fraqueza numa carta é fraqueza, não importa o que
    // EXTRA_TAGS diz — a carta é a fonte da verdade)
    const extra = EXTRA_TAGS[npc.name] || [];
    extra.forEach(t => {
      if (t.grau < 0) return;
      if (cardFrqTexts.has(norm(t.texto))) return;
      if (!hasText(cardTags, t.texto)) cardTags.push(clean(t));
    });

    // Unused markdown positive tags
    for (const t of parsedTags) {
      if (t.grau <= 0) continue;
      if (cardFrqTexts.has(norm(t.texto))) continue;
      if (!hasText(cardTags, t.texto)) cardTags.push({ texto: t.texto });
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

    // ── 5. Ensure every card has pelo menos 1 poder ──
    for (const tm of temas) {
      if (tm.fraqueza.length && !tm.poder.length) {
        const fallback = unusedPoder.shift() || genericPoder[tm.nome.length % genericPoder.length];
        tm.poder.push({ texto: fallback.texto });
        usedTexts.add(norm(fallback.texto));
      }
    }

    // ── 6. Every card with poder must have >= 1 fraqueza (hard rule, no total target) ──
    for (const tm of temas) {
      if (!tm.poder.length || tm.fraqueza.length) continue;
      const f2 = unusedFraqueza.shift() || genericFraqueza[tm.nome.length % genericFraqueza.length];
      if (usedTexts.has(norm(f2.texto))) continue;
      tm.fraqueza.push({ texto: f2.texto });
      usedTexts.add(norm(f2.texto));
      if (!review[name]) review[name] = [];
      review[name].push({ card: tm.nome, tipo: 'fraqueza', texto: f2.texto });
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
    }

    // Compute default stats & descricao based on danger
    function defaultStats(danger) {
      const s = d => ({ destreza: d, força: d, corpo: d, inteligência: d-1, vontade: d, mente: d, influência: d-1, aura: d, espírito: d });
      if (danger === 'extremo') return s(8);
      if (danger === 'alto')    return s(7);
      if (danger === 'medio')   return s(6);
      return s(4);
    }
    function defaultInitiative(danger) {
      if (danger === 'extremo') return 25 + Math.floor(Math.random() * 6);
      if (danger === 'alto')    return 20 + Math.floor(Math.random() * 4);
      if (danger === 'medio')   return 15 + Math.floor(Math.random() * 5);
      return 10 + Math.floor(Math.random() * 4);
    }
    function defaultDesc(name, faction, danger) {
      if (danger === 'extremo') return `${name} é uma figura de poder imensurável, capaz de alterar o curso da história mutante. Sua presença no campo de batalha redefine o conceito de ameaça.`;
      if (danger === 'alto')    return `${name} é um combatente formidável e estrategista nato. Respeitado e temido, sua experiência em combate é lendária entre aliados e inimigos.`;
      if (danger === 'medio')   return `${name} é um mutante habilidoso com treinamento de combate. Ainda em crescimento, seu potencial é reconhecido por mentores e colegas.`;
      return `${name} é um mutante de poder modesto, buscando seu lugar no mundo. Sua determinação compensa suas limitações.`;
    }

    const dataJSON = {
      iniciativa: defaultInitiative(meta.danger),
      stats: defaultStats(meta.danger),
      temas,
      tags: cardTags,
      descricao: defaultDesc(name, meta.faction, meta.danger)
    };
    sql += `INSERT INTO npcs (id, name, codename, faction, danger, data, is_global, created_at)\n`;
    sql += `  SELECT gen_random_uuid(), '${sq(name)}', '${sq(name)}', '${sq(meta.faction)}', '${sq(meta.danger)}', ${jb(dataJSON)}, TRUE, NOW()\n`;
    sql += `  WHERE NOT EXISTS (SELECT 1 FROM npcs WHERE name = '${sq(name)}' AND is_global = TRUE);\n\n`;
    count++;
  }

  sql += `COMMIT;\n`;
  sql += `\n-- Resumo: ${count} NPCs processados (${autoFilled} cartas auto-geradas).\n`;
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
