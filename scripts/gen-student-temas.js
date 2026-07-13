#!/usr/bin/env node
/**
 * Migração 003 — enriquece os TEMAS dos alunos dos Esquadrões de Treino (Gen X).
 *
 * Framework de cards por nível de perigo (regra de bolso):
 *   baixo   : 2-3 cards, ~8-10 tags,  3-4 fraquezas (1 genérica)
 *   médio   : ~4 cards,  ~15 tags,    4 fraquezas   (2 genéricas)
 *   alto    : 4-5 cards, ~20 tags,    4-5 fraquezas (4 genéricas)
 *   extremo : 5+ cards,  25+ tags,    5+ fraquezas  (6 genéricas)
 *
 * Cada card é um PILAR: poder de mutação, origem/herança, relações/coração,
 * mente/identidade e o ARCO ATUAL do personagem. As tags misturam
 * combate, social e mental. Alunos têm 14-16 anos.
 *
 * Saída: supabase/migrations/003_student_temas.sql  (UPDATE por nome, is_global)
 * NÃO toca na tabela characters.
 */
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, '..', 'supabase', 'migrations', '003_student_temas.sql');

// helpers ------------------------------------------------------------
const sq = s => String(s == null ? '' : s).replace(/'/g, "''");
function tag(str) { // "Texto 4"  ->  {texto:"Texto", grau:4}
  const m = str.match(/(-?\d+)\s*$/);
  if (!m) return { texto: str.trim() };
  const grau = Math.abs(parseInt(m[1], 10));
  const texto = str.slice(0, m.index).trim();
  return grau ? { texto, grau } : { texto };
}
function card(nome, poder, fraqueza) {
  return { nome, poder: (poder || []).map(tag), fraqueza: (fraqueza || []).map(tag) };
}

// DATA — alunos e orientadores dos esquadrões de treino -------------
// P = tags de poder/competência (combate/social/mental) · F = fraquezas
const D = {};

// ── ESQUADRÃO ALFA (Karma & Estrela Polar) ──────────────────────────
D['Anole'] = ['medio', [
  card('Lagarto Adaptável', ['Camuflagem Cromática 4','Língua Preênsil Extensível 4','Garras e Aderência a Superfícies 4','Regeneração de Membros 3','Agilidade Réptil 3']),
  card('Orgulho de Victor', ['Assumidamente Gay e Confiante 3','Sarcasmo como Escudo 3','Ídolo dos Alunos Marginalizados 2']),
  card('Irmão de Armas', ['Melhor Amigo de Rockslide 3','Lealdade Feroz à Equipe 3','Aluno do Instituto Xavier 2']),
  card('Peso do Sobrevivente', [], ['Culpa de Sobrevivente (Genosha) -3','Aparência Monstruosa Julgada -2','Impulsividade Adolescente -2','Inexperiente em Combate Real -2']),
]];
D['Indra'] = ['medio', [
  card('Escudo Vivo', ['Armadura Retrátil de Placas 4','Escudos Corporais Defensivos 4','Resistência a Impactos 3','Ancoragem Inabalável 2']),
  card('Herança Jainista', ['Fé Hindu-Jainista Devota 4','Pacifismo de Princípio 4','Educação Rígida da Família 3']),
  card('Jovem entre Dois Mundos', ['Senso de Dever 3','Cortesia e Diplomacia 3','Adolescente Mutante (14-16) 1']),
  card('Relutância do Guerreiro', [], ['Hesita em Usar Força Ofensiva -3','Medo de Desonrar a Família -3','Casamento Arranjado o Pressiona -2','Novato sob Pressão -2']),
]];
D['Kidogo'] = ['medio', [
  card('Gigante e Formiga', ['Alteração de Tamanho (formiga a gigante) 5','Força Proporcional ao Tamanho 4','Resistência Colossal quando Grande 4','Furtividade quando Minúsculo 3']),
  card('Coração Humilde', ['Humildade Genuína 3','Humor Contagiante 3','Faz Todos se Sentirem Bem 2']),
  card('Raízes Africanas', ['Orgulho da Origem Suaíli 3','Aluno do Instituto Xavier 2']),
  card('Sombra da Própria Grandeza', [], ['Subestima o Próprio Poder -3','Autodepreciação Constante -2','Timidez em Assumir Liderança -2','Adolescente Inseguro -2']),
]];
D['Loa'] = ['alto', [
  card('Toque Dissipador', ['Fase Através da Matéria Sólida 5','Desintegração por Contato 5','Rastros de Decomposição 4','Intangibilidade Defensiva 4','Ataque que Ignora Armaduras 3']),
  card('Alma Havaiana', ['Espírito Livre e Praiano 4','Misticismo das Ilhas 3','Otimismo Contagiante 3']),
  card('Provação Vampírica', ['Sobreviveu à Mordida de um Vampiro 3','Amizade com Anole e Match 3','Aluna do Instituto Xavier 2']),
  card('Deslize Perigoso', [], ['Poder Destrutivo que a Assusta -3','Medo de Machucar Quem Ama -3','Controle Instável sob Emoção -2','Inexperiente em Batalha 2']),
  card('Sonhadora', ['Curiosidade Insaciável 3','Lealdade aos Corsários 2'], ['Distrai-se Facilmente -2','Adolescente Impulsiva -2']),
]];
D['Rede (Network)'] = ['medio', [
  card('Rede Telepática', ['Transmissão de Pensamentos em Massa 5','Leitura Telepática de Superfície 4','Contato Mental à Distância 3']),
  card('Geração Conectada', ['Trata Telepatia como Rede Social 4','Antenada em Fofocas e Notícias 3','Popular entre os Alunos 2']),
  card('Voz do Grupo', ['Coordena a Equipe em Combate 3','Empatia Crescente 2','Aluna do Instituto Xavier 2']),
  card('Imaturidade', [], ['Invade a Privacidade Alheia -3','Fala Demais na Hora Errada -3','Ainda Amadurecendo -2','Sem Preparo de Combate -2']),
]];
D['Moça de Borracha'] = ['medio', [
  card('Corpo Elástico', ['Elasticidade e Maleabilidade Total 5','Amortece Impactos 4','Estica-se a Grandes Distâncias 4','Molda-se a Qualquer Forma 3']),
  card('Otimismo Blindado', ['Humor Físico e Palhaçadas 4','Otimismo Inabalável 3','Usa o Riso como Armadura 3']),
  card('Espírito de Equipe', ['Adapta-se a Qualquer Situação 3','Aluna do Instituto Xavier 2']),
  card('Distração', [], ['Desajeitada e Distraída -3','Esconde Inseguranças no Humor -2','Leva Combate Pouco a Sério -2','Novata em Missões -2']),
]];

// ── ADVOCATES (Vampira / Rogue) ─────────────────────────────────────
D['Boggart'] = ['medio', [
  card('Pesadelo Vivo', ['Metamorfose Aterrorizante 4','Assume a Forma do Medo do Alvo 4','Intimidação Psicológica 3','Aparência Naturalmente Sinistra 2']),
  card('Comediante Sombrio', ['Humor Negro e Brincalhão 3','Leal aos Amigos Ferozmente 3','Alívio Cômico da Equipe 2']),
  card('Incompreendido', ['Coração Gentil sob a Máscara 3','Aluno do Instituto Xavier 2']),
  card('Rosto que Assusta', [], ['Aspecto Assustador Permanente -3','Rejeitado por Estranhos -3','Insegurança com a Aparência -2','Inexperiente em Combate -2']),
]];
D['Náiade'] = ['medio', [
  card('Senhora das Águas', ['Hidrocinese em Estado Líquido 5','Manipula Grandes Volumes de Água 4','Purifica ou Contamina Água 3','Chicotes e Escudos de Água 3']),
  card('Temperamento de Maré', ['Personalidade Fluida e Serena 3','Adapta-se como a Corrente 3']),
  card('Serenidade Aprendida', ['Calma que Acalma os Outros 3','Aluna do Instituto Xavier 2']),
  card('Águas Turvas', [], ['Torna-se Turbulenta sob Pressão -3','Depende de Fonte de Água -3','Emoção Descontrola o Poder -2','Novata em Batalha -2']),
]];
D['Mira (Pinpoint)'] = ['medio', [
  card('Precisão Absoluta', ['Localiza Assinaturas Energéticas 5','Identifica Pontos Fracos 4','Nunca se Perde (literalmente) 3','Percepção Tática Aguçada 3']),
  card('Mente Metódica', ['Raciocínio Analítico e Frio 4','Memória Espacial Perfeita 3','Estrategista de Reconhecimento 3']),
  card('Valor de Batedora', ['Indispensável em Missões 2','Aluna do Instituto Xavier 2']),
  card('Excesso de Confiança', [], ['Arrogância pela Precisão -3','Impaciência com os Menos Exatos -2','Frágil em Combate Corpo a Corpo -2','Inexperiente sob Fogo -2']),
]];
D['Trovão'] = ['medio', [
  card('Voz de Trovão', ['Ondas de Choque Sônicas pela Voz 5','Gera Trovões e Vibrações 4','Ataque em Área Ensurdecedor 3']),
  card('Alma Incandescente', ['Espírito Brasileiro Contagiante 3','Paixão pelo Futebol e Samba 2','Energia que Anima a Equipe 2']),
  card('Coração Grande', ['Generosidade Calorosa 3','Aluno do Instituto Xavier 2']),
  card('Estouro', [], ['Temperamento Explosivo -3','Danos Acústicos Involuntários -3','Fala Mais Alto que Pensa -2','Novato Impulsivo -2']),
]];
D['Umbra'] = ['medio', [
  card('Andarilha das Sombras', ['Viagem e Manipulação de Sombras 5','Furtividade e Infiltração Absolutas 4','Ataques a partir da Penumbra 3','Camuflagem nas Trevas 3']),
  card('Guardiã Silenciosa', ['Protege em Silêncio 3','Observa Mais do que Age 3']),
  card('Enigma', ['Mistério que Intriga a Equipe 2','Aluna do Instituto Xavier 2']),
  card('Prisão de Trevas', [], ['Depende de Fontes de Sombra -3','Introversão Isolante -3','Dificuldade de Confiar -2','Pouca Prática de Combate -2']),
]];
D['Xenônio'] = ['medio', [
  card('Gás Nobre', ['Emissão de Gases e Energias Espectrais 4','Cria Ilusões Gasosas 4','Brilho Luminoso Desorientador 3','Forma Gasosa Evasiva 3']),
  card('Inconstância Nobre', ['Carisma Volátil e Cintilante 3','Criatividade Imprevisível 2']),
  card('Presença Efêmera', ['Surge e Some sem Aviso 2','Aluno do Instituto Xavier 2']),
  card('Instabilidade', [], ['Humor Volátil (brilha e apaga) -3','Dificuldade de se Fixar Física e Mentalmente -3','Pouca Constância em Treino -2','Inexperiente -2']),
]];

// ── CHEVALIERS (Gambit) ─────────────────────────────────────────────
D['Bling!'] = ['medio', [
  card('Pele de Diamante', ['Esqueleto de Diamante Semi-Orgânico 5','Arremessa Projéteis de Diamante 4','Resistência Excepcional a Dano 4','Corte Afiado no Combate 3']),
  card('Brilho Próprio', ['Autoconfiança Deslumbrante 4','Assumidamente Lésbica e Estilosa 3','Presença de Estrela 2']),
  card('Filha de Astros', ['Herança de Família Musical 2','Aluna do Instituto Xavier 2']),
  card('Fachada Reluzente', [], ['Vaidade Exagerada -3','Esconde Medos sob o Estilo -2','Provoca Rivalidades -2','Novata em Missões Reais -2']),
]];
D['Flubber'] = ['baixo', [
  card('Geleia Viva', ['Massa Gelatinosa e Elástica 4','Maleabilidade Extrema 3','Espreme-se por Qualquer Fresta 3']),
  card('Alma Boba', ['Entusiasmo Contagiante 4','Não Tem Um Osso Mau (literalmente) 2','Aluno do Instituto Xavier 2']),
  card('Trapalhão', [], ['Desastre Desajeitado -3','Alvo Fácil e Frágil -3','Leva Pouco a Sério -2']),
]];
D['Foxx'] = ['alto', [
  card('Mística Infiltrada', ['Metamorfismo Perfeito (Mística) 6','Imita Voz, Rosto e Impressões Digitais 5','Disfarce Indetectável 4','Mímica de Aparência e Gênero 4','Regeneração Lenta 3']),
  card('Espiã Sedutora', ['Espionagem e Sedução de Elite 5','Provocação e Manipulação Constantes 4','Leitura Fria de Pessoas 3','Rede de Contatos no Submundo 3']),
  card('Veterana da Irmandade', ['Séculos de Experiência em Combate 4','Marcialista e Assassina Letal 4','Sabotagem e Infiltração 3','Nervos de Aço 2']),
  card('Agente Duplo', ['Testa os Limites de Gambit 3','Infiltrada entre os Alunos 3'], ['Identidade Oculta -3']),
  card('Lealdade Incerta', [], ['Agenda Secreta Própria -4','Lealdade Questionável -4','Frieza que Afasta Vínculos -3','Manipuladora por Instinto -2']),
]];
D['Onyxx'] = ['medio', [
  card('Tanque de Granito', ['Corpo de Pedra Sólida 5','Superforça e Resistência 5','Muralha Viva em Combate 4','Investida Devastadora 3']),
  card('Coração de Ouro', ['Jeito Rapper e Fanfarrão 3','Protetor Secreto dos Mais Fracos 3','Presença Divertida 2']),
  card('Grandalhão do Instituto', ['Aluno do Instituto Xavier 2','Condicionamento Bruto 2']),
  card('Peso da Pedra', [], ['Movimentos Lentos -3','Esconde a Bondade por Vergonha -2','Alvo por Ser Grande -2','Inexperiente em Tática -2']),
]];
D['Garoto Chuva'] = ['medio', [
  card('Corpo de Água', ['Fisiologia Aquática 4','Provoca Chuva Localizada 4','Fluidez que Absorve Golpes 3','Controle da Umidade 3']),
  card('Céu Nublado', ['Sensibilidade Emocional Profunda 3','Doçura Melancólica 2']),
  card('Alma Sensível', ['Aluno do Instituto Xavier 2','Bondade Genuína 2']),
  card('Tempestade Interior', [], ['Chove Quando Fica Triste -3','Melancolia que Afasta -3','Frágil a Rejeições -2','Novato Inseguro -2']),
]];

// ── CORSÁRIOS (Ciclope) ─────────────────────────────────────────────
D['Dríade'] = ['medio', [
  card('Voz da Floresta', ['Comunhão e Manipulação da Flora 5','Fala com as Plantas 4','Cresce Vegetação Instantânea 3','Enredamento por Raízes e Cipós 3']),
  card('Raiz Profunda', ['Serenidade de Floresta Antiga 3','Ligação Espiritual com a Natureza 3']),
  card('Guardiã Verde', ['Cuidado com os Vulneráveis 2','Aluna do Instituto Xavier 2']),
  card('Teimosia de Carvalho', [], ['Teimosa e Imóvel quando Provocada -3','Torna-se Espinhosa sob Estresse -2','Depende de Ambiente com Vida -2','Novata em Combate -2']),
]];
D['Espinho'] = ['medio', [
  card('Chuva de Espinhos', ['Projeta Espinhos pelo Corpo 5','Defesa e Ataque à Distância 4','Manto Perfurante 3','Cobertura de Supressão 3']),
  card('Casca Defensiva', ['Lealdade Extrema aos Próximos 2','Coragem Silenciosa 2'], ['Personalidade Eriçada e Reclusa -3']),
  card('Desejo de Pertencer', ['Anseia por Aceitação 2','Aluno do Instituto Xavier 2']),
  card('Muros Internos', [], ['Fecha-se num Casulo de Desconfiança -3','Dificuldade de Fazer Amigos -2','Autoimagem Negativa -2']),
]];
D['Espectro'] = ['medio', [
  card('Fantasma Andante', ['Intangibilidade 5','Invisibilidade Parcial 4','Atravessa Paredes 4','Evasão e Fuga 3']),
  card('Alma Distante', ['Humor Seco e Sussurrado 3','Observador Perspicaz 2']),
  card('Aparece na Hora Certa', ['Surge do Nada quando a Equipe Precisa 3','Aluno do Instituto Xavier 2']),
  card('Fuga Constante', [], ['Foge dos Conflitos -3','Introversão e Melancolia -3','Distante e Esquivo -2','Evita Compromisso -2']),
]];
D['Três‑em‑Uma (Stepford Cuckoos)'] = ['alto', [
  card('Mente de Colmeia', ['Mente de Colmeia Telepática 6','Telepatia de Nível Ômega em Conjunto 5','Ilusões e Ataques Psíquicos 4','Controle Mental Coordenado 4','Leitura Simultânea de Muitas Mentes 3']),
  card('Diamante Herdado', ['Forma de Diamante (como Emma) 4','Elegância Fria e Calculista 3','Filhas/Clones de Emma Frost 3']),
  card('Trio Inseparável', ['Completam as Frases umas das Outras 3','Falam como uma Só Voz 3','Alunas de Elite do Instituto 2']),
  card('Coração Partido', [], ['Luto pelas Irmãs Perdidas (Sophie e Esme) -4','Arrogância que Afasta -3','Elo Enfraquece se Separadas -3','Frieza Emocional -2']),
  card('Superioridade', ['Confiança Intelectual Imensa 3'], ['Desprezo pelos Inferiores -2']),
]];

// ── HELLIONS (Emma Frost) ───────────────────────────────────────────
D['Dust (Poeira)'] = ['medio', [
  card('Tempestade de Areia', ['Transforma-se em Nuvem de Areia Abrasiva 5','Controle de Partículas Finas 4','Esfola Inimigos como Lixa 4','Forma Intangível Evasiva 3']),
  card('Fé Inabalável', ['Muçulmana Devota (usa niqab) 4','Determinação Silenciosa 4','Modéstia de Princípio 3']),
  card('Longe de Casa', ['Refugiada do Afeganistão 3','Amizade Leal com Mercúrio 2','Aluna do Instituto Xavier 2']),
  card('Reserva', [], ['Timidez e Reserva -3','Trauma de Cativeiro no Passado -2','Estranheza Cultural a Isola -2','Inexperiente em Combate -2']),
]];

// build --------------------------------------------------------------
let sql = `-- ═══════════════════════════════════════════════════════════════\n`;
sql += `-- Migração 003 — Theme cards enriquecidos dos alunos dos Esquadrões\n`;
sql += `-- de Treino (Gen X, 14-16 anos). Cards = pilares de identidade + arco.\n`;
sql += `-- Cartas/tags dimensionadas por nível de perigo. NÃO toca em characters.\n`;
sql += `-- ═══════════════════════════════════════════════════════════════\n\nBEGIN;\n\n`;

let n = 0, tagTotal = 0;
for (const [name, [danger, cards]] of Object.entries(D)) {
  const temas = cards;
  const flat = [];
  temas.forEach(t => { t.poder.forEach(x => flat.push(x)); t.fraqueza.forEach(x => flat.push(x)); });
  tagTotal += flat.length;
  const temasJson = JSON.stringify(temas).replace(/'/g, "''");
  const tagsJson = JSON.stringify(flat).replace(/'/g, "''");
  sql += `-- ${name} [${danger}] — ${temas.length} cards, ${flat.length} tags\n`;
  sql += `UPDATE npcs SET\n`;
  sql += `  data = jsonb_set(jsonb_set(COALESCE(data,'{}'::jsonb), '{temas}', '${temasJson}'::jsonb), '{tags}', '${tagsJson}'::jsonb),\n`;
  sql += `  danger = '${danger}', updated_at = NOW()\n`;
  sql += `  WHERE name = '${sq(name)}' AND is_global = TRUE;\n\n`;
  n++;
}

sql += `COMMIT;\n\n-- Resumo: ${n} alunos atualizados, ${tagTotal} tags no total (média ${(tagTotal / n).toFixed(1)}/aluno).\n`;

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, sql);
console.log(`OK → ${OUT}`);
console.log(`  ${n} alunos, ${tagTotal} tags (média ${(tagTotal / n).toFixed(1)})`);
