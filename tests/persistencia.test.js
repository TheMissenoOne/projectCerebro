/**
 * X-MEN TTRPG - Persistência da ficha
 *
 * Cobre o bug em que a aba Esquadrão parecia salvar mas nada chegava ao banco:
 * fichas antigas traziam `membros` com menos entradas do que a tabela desenha,
 * o handler estourava em D.membros[i].nome e o indicador seguia dizendo SALVO.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ficha = fs.readFileSync(path.join(ROOT, 'ficha.html'), 'utf8');
const i18n = fs.readFileSync(path.join(ROOT, 'assets/js/i18n.js'), 'utf8');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ ' + name);
    passed++;
  } catch (e) {
    console.log('❌ ' + name + ': ' + e.message);
    failed++;
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

test('dados carregados são normalizados antes de a UI escrever neles', function () {
  assert(ficha.includes('function normalizarDados('), 'normalizarDados missing');
  assert(/normalizarDados\(D\);\s*\n\s*fichaCarregada=true;/.test(ficha), 'load path does not normalize');
  assert(ficha.includes('while(d.membros.length<MAX_MEMBROS)'), 'membros not padded to the rendered row count');
  assert(ficha.includes('while(d.temas.length<4)'), 'temas not padded');
  assert(ficha.includes('while(d.extras.length<4)'), 'extras not padded');
  assert(ficha.includes('while(d.evolucao.length<PROG_MAX)'), 'evolucao not padded');
});

test('linhas de membro nunca escrevem em um índice inexistente', function () {
  assert(ficha.includes('function membroEm('), 'membroEm helper missing');
  assert(!/D\.membros\[\+e\.target\.dataset\.i\]\./.test(ficha), 'still writes straight into D.membros[i]');
  assert((ficha.match(/membroEm\(\+e\.target\.dataset\.i\)/g) || []).length === 3,
    'all three member inputs must go through membroEm');
});

test('mesclar clona arrays em vez de apontar para o objeto em cache', function () {
  assert(ficha.includes('r[k]=Array.isArray(src[k])?clone(src[k]):src[k];'),
    'mesclar still aliases arrays into the cached object');
});

test('o indicador só diz SALVO depois de uma gravação confirmada', function () {
  assert(ficha.includes("setInd('',t('ficha.loaded'))"), 'idle state after load still claims saved');
  assert(ficha.includes("setInd('pendente',t('ficha.unsaved'))"), 'no pending state');
  assert(ficha.includes("setInd('salvo',t('ficha.savedAt')"), 'saved state has no timestamp');
  assert(!/setTimeout\(\(\)=>setInd\('',t\('ficha\.saved'\)\),1800\)/.test(ficha),
    'saved state still decays back into a generic SALVO');
  ["'ficha.unsaved'", "'ficha.savedAt'", "'ficha.loaded'", "'ficha.errorLoad'", "'ficha.errorUnexpected'"].forEach(function (k) {
    assert((i18n.match(new RegExp(k.replace('.', '\\.'), 'g')) || []).length >= 2, 'missing pt/en for ' + k);
  });
});

test('alterações pendentes são gravadas antes de a página sumir', function () {
  assert(/visibilitychange[\s\S]{0,120}salvarAgora\(\)/.test(ficha), 'no flush when the app is backgrounded');
  assert(/pagehide[\s\S]{0,80}salvarAgora\(\)/.test(ficha), 'no flush on pagehide');
  assert(/beforeunload[\s\S]{0,140}e\.preventDefault\(\)/.test(ficha), 'no guard against leaving with unsaved work');
  assert(/function trocarAba\(id,el\)\{\s*\n\s*if\(saveSujo\)salvarAgora\(\);/.test(ficha),
    'switching tabs does not flush pending work');
});

test('falha de gravação continua pendente, limpa o cache e tenta de novo', function () {
  assert(/saveSujo=true; \/\* continua pendente/.test(ficha), 'failed save is not kept dirty');
  assert(ficha.includes("window.cache.invalidate('char',charId)"),
    'failed save leaves the optimistic cache in place');
  assert(/saveTimer=setTimeout\(salvarAgora,Math\.min\(30000,5000\*saveTentativa\)\)/.test(ficha),
    'no backoff retry after a failed save');
});

test('ficha que não carregou não pode ser sobrescrita', function () {
  assert(ficha.includes('let fichaCarregada=false;'), 'load guard missing');
  assert(/if\(!fichaCarregada\)\{setInd\('erro',t\('ficha\.errorLoad'\)\);return;\}/.test(ficha),
    'a failed load can still overwrite the row with defaults');
});

test('a gravação envia um retrato congelado dos dados', function () {
  assert(ficha.includes('const snapshot=clone(D);'), 'save still sends a shallow copy of live state');
  assert(!ficha.includes('Object.assign({},D,{foto:\'\'})'), 'shallow copy still mutates D.estado');
});

// ── Apoio×Antagonismo (admin.html): nunca mostrar uuid no lugar de nome ──
const vm = require('vm');
const admin = fs.readFileSync(path.join(ROOT, 'admin.html'), 'utf8');
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

// roda os helpers reais do admin.html num sandbox (extraídos pelo nome)
function pegar(src, inicio, fim) {
  const a = src.indexOf(inicio);
  assert(a !== -1, 'not found: ' + inicio);
  return src.slice(a, src.indexOf(fim, a));
}
const adminBox = { t: k => k };
vm.createContext(adminBox);
vm.runInContext(pegar(admin, 'function safeNum(', 'function barraHTML(').replace(/const UUID_RE/, 'var UUID_RE'), adminBox);

test('admin: jogador é rotulado pelos personagens, não pelo player_id', function () {
  assert(!/pid\.length > 36/.test(admin), 'header still renders the raw player_id');
  const r = adminBox.rotuloJogador([{ codinome: 'Ciclope' }, { nome: 'Ororo' }, { codinome: 'Ciclope' }], 0);
  assert(r === 'Ciclope · Ororo', 'got ' + r);
  assert(adminBox.rotuloJogador([{}], 1) === 'admin.player 2', 'nameless player fallback');
});

test('admin: membro salvo como id de personagem resolve para o nome; id órfão vira fallback', function () {
  const porId = { 'c1111111-1111-4111-8111-111111111111': { codinome: 'Ciclope' } };
  const ms = adminBox.membrosDe({ data: { membros: [
    { nome: 'Jean', apoio: 2 },
    { nome: 'C1111111-1111-4111-8111-111111111111', apoio: 1 },
    { nome: 'ffffffff-0000-4000-8000-000000000000', antagonismo: 1 },
  ] } }, porId);
  assert(ms.map(m => m.nome).join('|') === 'Jean|Ciclope|admin.unknownChar', 'got ' + ms.map(m => m.nome).join('|'));
  assert(!ms.some(m => UUID.test(m.nome)), 'uuid leaked into a member label');
});

const pendentes = [];
function testAsync(name, fn) {
  pendentes.push(Promise.resolve().then(fn).then(
    function () { console.log('✅ ' + name); passed++; },
    function (e) { console.log('❌ ' + name + ': ' + e.message); failed++; }));
}

testAsync('api.listAllGMCharacters: ficha antiga sem colunas name/codename usa o nome de data', function () {
  const rows = { parties: [{ id: 'p1', name: 'Equipe' }], characters: [{ id: 'c2', player_id: 'u2', party_id: 'p1', name: null, codename: null, data: { nome: 'Ororo Munroe', codinome: 'Tempestade' } }] };
  const q = t => { const b = { select: () => b, eq: () => b, in: () => b, range: () => b, then: (res, rej) => Promise.resolve({ data: rows[t], error: null }).then(res, rej) }; return b; };
  // window é o próprio global, como no browser (api.js lê window.getSupabase sem prefixo)
  const win = { supabase: { createClient: () => ({ from: q }) }, SUPABASE_CONFIG: { url: 'x', anonKey: 'y' }, console: { log() {}, error() {}, warn() {} } };
  win.window = win;
  const box = vm.createContext(win);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'assets/js/api.js'), 'utf8'), box);
  return win.api.listAllGMCharacters('gm1', true).then(function (chars) {
    const c = chars[0];
    assert(c && c.nome === 'Ororo Munroe' && c.codinome === 'Tempestade', 'got ' + JSON.stringify(c));
  });
});

/* applyTranslations: troca só o texto do elemento; filhos-widget (span com id, botão "?", svg) sobrevivem.
   DOM mínimo em vm, sem dependências. */
function miniDom() {
  function node(type, name, value) {
    const n = { nodeType: type, nodeName: name, nodeValue: value, id: '', dataset: {}, childNodes: [], parentNode: null,
      get children() { return this.childNodes.filter(c => c.nodeType === 1); },
      remove() { if (this.parentNode) { const a = this.parentNode.childNodes; a.splice(a.indexOf(this), 1); this.parentNode = null; } },
      insertBefore(c, ref) { c.remove(); c.parentNode = this; const i = ref ? this.childNodes.indexOf(ref) : -1; i < 0 ? this.childNodes.push(c) : this.childNodes.splice(i, 0, c); return c; },
      appendChild(c) { return this.insertBefore(c, null); },
      get firstChild() { return this.childNodes[0] || null; },
      get text() { return this.childNodes.map(c => c.nodeType === 3 ? c.nodeValue : (c.nodeName === 'BR' ? '\n' : c.text)).join(''); },
      querySelectorAll(sel) { const out = []; (function walk(x) { x.childNodes.forEach(c => { if (c.nodeType === 1) { if (sel === '[data-i18n]' && c.dataset.i18n) out.push(c); walk(c); } }); })(this); return out; }
    };
    return n;
  }
  const el = (name, attrs, kids) => { const e = node(1, name); Object.assign(e, attrs || {}); (kids || []).forEach(k => e.appendChild(typeof k === 'string' ? node(3, '#text', k) : k)); return e; };
  return { el, document: { createTextNode: v => node(3, '#text', v) } };
}
test('applyTranslations preserva filhos-widget e troca o texto (dashboard, combate, ficha, header)', function () {
  const vm = require('vm');
  const D = miniDom();
  const store = { cerebro_idioma: 'en' };
  const box = { window: {}, document: D.document, localStorage: { getItem: k => store[k] || null, setItem() {} } };
  vm.createContext(box);
  vm.runInContext(i18n + '\nthis.applyTranslations = applyTranslations;', box);
  const name = D.el('SPAN', { id: 'user-name' }, ['Charles']);
  const code = D.el('STRONG', { id: 'party-code' }, ['XAV123']);
  const help = D.el('BUTTON', { className: 'field-help' }, ['?']);
  const ico = D.el('SVG');
  const root = D.el('DIV', {}, [
    D.el('DIV', { dataset: { i18n: 'dash.welcome' } }, ['Bem-vindo, ', name]),
    D.el('SPAN', { dataset: { i18n: 'dash.accessCode' } }, ['Código de acesso: ', code]),
    D.el('SPAN', { dataset: { i18n: 'combat.av' } }, ['AV', D.el('SPAN', { className: 'field-help' }, ['?'])]),
    D.el('SPAN', { dataset: { i18n: 'ficha.dexterity' } }, ['Destreza ', help]),
    D.el('BUTTON', { dataset: { i18n: 'common.logout' } }, [ico, ' SAIR']),
    D.el('P', { dataset: { i18n: 'combat.info' } }, [D.el('STRONG', {}, ['Sistema MEGS:']), ' AV = …']),
    D.el('DIV', { dataset: { i18n: 'ficha.photo' } }, ['FOTO', D.el('BR'), 'CLIQUE', D.el('BR'), 'P/ CARREGAR']),
    D.el('SPAN', { dataset: { i18n: 'common.dashboard' } }, ['DASHBOARD'])
  ]);
  box.applyTranslations(root);
  box.applyTranslations(root); // idempotente
  const [w, c, av, dex, out, info, photo, plain] = root.children;
  assert(w.text === 'Welcome, Charles' && w.childNodes.includes(name), 'welcome: ' + JSON.stringify(w.text));
  assert(c.text === 'Access code: XAV123' && c.childNodes.includes(code), 'access code: ' + JSON.stringify(c.text));
  assert(av.text === 'AV?' && av.children.length === 1, 'combat help: ' + JSON.stringify(av.text));
  assert(dex.children[0] === help && /^Dexterity\s/.test(dex.text), 'ficha help: ' + JSON.stringify(dex.text));
  assert(out.childNodes[0] === ico && out.text === ' LOGOUT', 'icon: ' + JSON.stringify(out.text));
  assert(info.children.length === 0 && info.text.startsWith('MEGS System: AV'), 'inline <strong> sem id faz parte da frase: ' + JSON.stringify(info.text.slice(0, 20)));
  assert(photo.children.length === 0 && photo.text === 'CLICK TO\nLOAD\nPHOTO', 'br sem id faz parte da frase: ' + JSON.stringify(photo.text));
  assert(plain.text === 'DASHBOARD' && plain.childNodes.length === 1, 'texto puro: ' + JSON.stringify(plain.text));
});

Promise.all(pendentes).then(function () {
  console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
  process.exit(failed ? 1 : 0);
});
