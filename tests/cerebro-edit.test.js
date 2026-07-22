const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const api = fs.readFileSync(path.join(ROOT, 'assets/js/api.js'), 'utf8');
const cerebro = fs.readFileSync(path.join(ROOT, 'cerebro.html'), 'utf8');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log('✅ ' + name);
    passed++;
  } catch (error) {
    console.log('❌ ' + name + ': ' + error.message);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

test('global NPCs are allowed to open the existing edit modal', function() {
  const start = cerebro.indexOf('function abrirEditModal');
  const end = cerebro.indexOf('\n\nfunction fecharNPCModal', start);
  const editModal = cerebro.slice(start, end);

  assert(!editModal.includes('npc.isGlobal'), 'global NPC edit guard still blocks the modal');
  assert(!cerebro.includes("var editBtn=npc.isGlobal?''"), 'comparison cards still hide edit for global NPCs');
  assert(!cerebro.includes("const editBtn=npc.isGlobal?''"), 'detail view still hides edit for global NPCs');
});

test('NPC conversion stores editable gameplay fields in data JSONB', function() {
  assert(cerebro.includes('data.iniciativa=n.iniciativa||0;'), 'initiative is not serialized into data');
  assert(cerebro.includes('data.stats=attrs;'), 'attributes are not serialized into data.stats');
  assert(cerebro.includes('data.tags=n.tags;'), 'tags are not serialized into data');
  assert(cerebro.includes('data.descricao=n.descricao;'), 'description is not serialized into data');
  assert(cerebro.includes('data.esquadrao=n.esquadrao;'), 'squad is not serialized into data');
});

test('NPC updates use canonical columns and preserve global classification', function() {
  const start = api.indexOf('updateNPC: function');
  const end = api.indexOf('\n    deleteNPC:', start);
  const update = api.slice(start, end);

  assert(update.includes('data: npcData.data || {}'), 'update payload does not save data JSONB');
  assert(update.includes("foto_url: npcData.foto_url || ''"), 'update payload does not save photo URL');
  assert(!update.includes('is_global:'), 'update must not change global classification');
  assert(!update.includes('party_id:'), 'update must not change party ownership');
  assert(!update.includes('iniciativa:'), 'update still targets a non-canonical initiative column');
  assert(!update.includes('atributos:'), 'update still targets a non-canonical attributes column');
  assert(!update.includes('descricao:'), 'update still targets a non-canonical description column');
});

test('NPC creation saves the photo URL used by the shared edit form', function() {
  const start = api.indexOf('createNPC: function');
  const end = api.indexOf('\n\n    updateNPC:', start);
  const create = api.slice(start, end);

  assert(create.includes("foto_url: npcData.foto_url || ''"), 'create payload does not save photo URL');
});

console.log('\n' + passed + '/' + (passed + failed) + ' tests passed');
process.exit(failed ? 1 : 0);
