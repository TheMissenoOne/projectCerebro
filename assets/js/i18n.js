/**
 * X-MEN TTRPG - i18n Module
 * Translation system with language persistence
 * Load order: config.js -> i18n.js -> supabase-client.js -> ...
 */

const LANG_KEY = 'cerebro_idioma';

const LANGUAGES = {
  'pt-BR': { name: 'PT-BR', englishName: 'Portuguese', icon: '\uD83C\uDDE7\uD83C\uDDF7' },
  'en': { name: 'EN', englishName: 'English', icon: '\uD83C\uDDFA\uD83C\uDDF8' }
};

const I18N = {
  'pt-BR': {
    /* common */
    'common.loading': '// CARREGANDO...',
    'common.saved': '// SALVO',
    'common.saving': '// SALVANDO...',
    'common.error': 'ERRO',
    'common.save': 'SALVAR',
    'common.cancel': 'CANCELAR',
    'common.create': 'CRIAR',
    'common.edit': 'EDITAR',
    'common.delete': 'DELETAR',
    'common.confirm': 'CONFIRMAR',
    'common.close': 'FECHAR',
    'common.name': 'NOME',
    'common.codename': 'CODINOME',
    'common.description': 'DESCRIÇÃO',
    'common.search': 'BUSCAR...',
    'common.filter': 'FILTRAR',
    'common.all': 'TODOS',
    'common.none': 'NENHUM',
    'common.back': 'VOLTAR',
    'common.export': 'EXPORTAR',
    'common.import': 'IMPORTAR',
    'common.reload': 'RECARREGAR',
    'common.config': 'CONFIGURAÇÕES',
    'common.logout': 'SAIR',
    'common.dashboard': 'DASHBOARD',
    'common.wiki': 'WIKI',
    'common.cerebro': 'CÉREBRO',
    'common.combat': 'COMBATE',
    'common.admin': 'ADMIN',
    'common.ficha': 'FICHA',
    'nav.newCharacter': 'Nova Ficha',
    'nav.reset': 'RESETAR',
    'common.noName': 'Sem Nome',
    'common.noResults': 'NENHUM RESULTADO',
    'common.required': 'OBRIGATÓRIO',
    'common.noContent': 'NENHUM CONTEÚDO',

    /* theme */
    'theme.title': 'TEMA DE COR',
    'theme.yellow': 'AMARELO',
    'theme.red': 'VERMELHO',
    'theme.green': 'VERDE',
    'theme.purple': 'ROXO',
    'theme.blue': 'AZUL',
    'theme.changed': 'TEMA ALTERADO:',

    /* lang */
    'lang.title': 'IDIOMA',
    'lang.changed': 'IDIOMA ALTERADO',

    /* cerebro */
    'cerebro.gmMode': '// GM MODE - DB CARREGADO',
    'cerebro.squadMode': '// SQUAD MODE - MEMBROS CARREGADOS',
    'cerebro.version': 'VERSÃO 6.0 // GM MODE',
    'cerebro.dbTitle': '▌ BANCO DE DADOS CÉREBRO ▐',
    'cerebro.newNpc': 'NOVO NPC',
    'cerebro.loadingNpcs': '// CARREGANDO NPCs...',
    'cerebro.dbLoaded': '// DB:',
    'cerebro.errorLoad': '// ERRO AO CARREGAR NPCs',
    'cerebro.loadingDb': '// CARREGANDO...',
    'cerebro.errorLoadDb': '// ERRO AO CARREGAR',
    'cerebro.squadAndNpcs': 'SQUAD + NPCs',
    'cerebro.squad': 'SQUAD',
    'cerebro.memberSquad': 'Membro do esquadão',
    'cerebro.noParty': 'SEM PARTY',
    'cerebro.noPartyMsg': 'Você não faz parte de nenhuma party.',
    'cerebro.noAccess': 'ACESSO RESTRITO',
    'cerebro.gmOnly': 'Apenas mestres (GMs) podem acessar o Cérebro.',
    'cerebro.backDash': 'Voltar ao Dashboard',
    'cerebro.encounterTitle': 'ENCONTRO ATIVO',
    'cerebro.round': 'R',
    'cerebro.addSelected': '+ ADICIONAR NPC SELECIONADO',
    'cerebro.registered': '// MUTANTES REGISTRADOS',
    'cerebro.filter': 'FILTRAR...',
    'cerebro.emptyTitle': 'NENHUM NPC',
    'cerebro.emptySub': 'SELECIONE UM NPC NO PAINEL ESQUERDO\nOU CRIE UM NOVO',
    'cerebro.importTitle': 'IMPORTAR .MD',
    'cerebro.importDesc': 'Cole o Markdown com NPCs (formato \'# NPC: Nome\'). NPCs com mesmo nome serão atualizados.',
    'cerebro.newNpcTitle': 'NOVO NPC',
    'cerebro.editNpcTitle': 'EDITAR NPC',
    'cerebro.faction': 'FRAÇÃO',
    'cerebro.danger': 'PERIGO',
    'cerebro.initiative': 'INICIATIVA',
    'cerebro.physical': 'FÍSICO',
    'cerebro.mental': 'MENTAL',
    'cerebro.social': 'SOCIAL / MÍSTICO',
    'cerebro.tagsHelp': 'TAGS // CITY OF MIST (grau 1-6, negativo = fraqueza)',
    'cerebro.tagName': 'Nome da tag...',
    'cerebro.create': 'CRIAR NPC',
    'cerebro.save': 'SALVAR',
    'cerebro.condition': 'CONDIÇÃO',
    'cerebro.conditionFor': 'Selecione ou escreva uma condição para',
    'cerebro.customCondition': 'CONDIÇÃO CUSTOMIZADA',
    'cerebro.addToEncounter': 'ADICIONAR AO ENCONTRO ATIVO',
    'cerebro.removeEncounter': '✕ REMOVER DO ENCONTRO',
    'cerebro.addCondition': '+ CONDIÇÃO',
    'cerebro.noCondition': 'Nenhuma condição',
    'cerebro.noTags': '— Nenhuma tag —',
    'cerebro.noDescription': '— Sem descrição —',
    'cerebro.readOnly': 'GLOBAL // SOMENTE LEITURA',
    'cerebro.confirmDelete': 'Deletar',
    'cerebro.deleted': 'REMOVIDO',
    'cerebro.deleteError': 'ERRO AO DELETAR',
    'cerebro.cantEditGlobal': 'NPCs GLOBAIS NÃO SÃO EDITÁVEIS',
    'cerebro.cantDeleteGlobal': 'NPC GLOBAL — NÃO PODE SER DELETADO',
    'cerebro.nameRequired': 'NOME OBRIGATÓRIO',
    'cerebro.updated': 'NPC ATUALIZADO',
    'cerebro.loginAsGm': 'FAÇA LOGIN COMO GM PARA CRIAR NPCs',
    'cerebro.created': 'NPC CRIADO',
    'cerebro.saveError': 'ERRO AO SALVAR NPC',
    'cerebro.alreadyEncounter': 'JÁ NO ENCONTRO',
    'cerebro.addedEncounter': 'ADICIONADO AO ENCONTRO',
    'cerebro.removedEncounter': 'REMOVIDO DO ENCONTRO',
    'cerebro.selectFirst': 'SELECIONE UM NPC PRIMEIRO',
    'cerebro.conditionApplied': 'CONDIÇÃO:',
    'cerebro.exported': 'EXPORTADO',
    'cerebro.noValidNpcs': 'NENHUM NPC VÁLIDO',
    'cerebro.imported': 'criados · atualizados',
    'cerebro.encounterLabel': 'ENCONTRO — RODADA',
    'cerebro.encounterEmpty': 'NENHUM NPC NO ENCONTRO\nSELECIONE E CLIQUE "+ ADICIONAR"',
    'cerebro.attrsSection': 'ATRIBUTOS MEGS',
    'cerebro.tagsSection': 'TAGS // CITY OF MIST',
    'cerebro.dossierSection': 'DESCRIÇÃO // DOSSIÊ',
    'cerebro.initiativeLabel': 'INICIATIVA',

    /* conditions */
    'cond.lightWound': 'Ferido Leve',
    'cond.seriousWound': 'Ferido Grave',
    'cond.stunned': 'Atordoado',
    'cond.incapacitated': 'Incapacitado',
    'cond.bleeding': 'Sangrando',
    'cond.poisoned': 'Envenenado',
    'cond.burning': 'Em Chamas',
    'cond.paralyzed': 'Paralisado',
    'cond.fear': 'Medo',
    'cond.unconscious': 'Inconsciente',

    /* factions */
    'faction.xmen': 'X-Men',
    'faction.novatos': 'Nov. Mutantes/Gen.X',
    'faction.geracaox': 'X-Factor/X-Force',
    'faction.morlock': 'Morlocks',
    'faction.irmandade': 'Irmandade',
    'faction.vilao': 'Vilão',
    'faction.criminoso': 'Criminoso',
    'faction.neutro': 'Neutro/Ambíguo',
    'faction.humano': 'Humano/Aliado',

    /* danger */
    'danger.baixo': 'BAIXO',
    'danger.medio': 'MÉDIO',
    'danger.alto': 'ALTO',
    'danger.extremo': 'EXTREMO',
  },
  'en': {
    /* common */
    'common.loading': '// LOADING...',
    'common.saved': '// SAVED',
    'common.saving': '// SAVING...',
    'common.error': 'ERROR',
    'common.save': 'SAVE',
    'common.cancel': 'CANCEL',
    'common.create': 'CREATE',
    'common.edit': 'EDIT',
    'common.delete': 'DELETE',
    'common.confirm': 'CONFIRM',
    'common.close': 'CLOSE',
    'common.name': 'NAME',
    'common.codename': 'CODENAME',
    'common.description': 'DESCRIPTION',
    'common.search': 'SEARCH...',
    'common.filter': 'FILTER',
    'common.all': 'ALL',
    'common.none': 'NONE',
    'common.back': 'BACK',
    'common.export': 'EXPORT',
    'common.import': 'IMPORT',
    'common.reload': 'RELOAD',
    'common.config': 'SETTINGS',
    'common.logout': 'LOGOUT',
    'common.dashboard': 'DASHBOARD',
    'common.wiki': 'WIKI',
    'common.cerebro': 'CÉREBRO',
    'common.combat': 'COMBAT',
    'common.admin': 'ADMIN',
    'common.ficha': 'SHEET',
    'nav.newCharacter': 'New Sheet',
    'nav.reset': 'RESET',
    'common.noName': 'No Name',
    'common.noResults': 'NO RESULTS',
    'common.required': 'REQUIRED',
    'common.noContent': 'NO CONTENT',

    /* theme */
    'theme.title': 'COLOR THEME',
    'theme.yellow': 'YELLOW',
    'theme.red': 'RED',
    'theme.green': 'GREEN',
    'theme.purple': 'PURPLE',
    'theme.blue': 'BLUE',
    'theme.changed': 'THEME CHANGED:',

    /* lang */
    'lang.title': 'LANGUAGE',
    'lang.changed': 'LANGUAGE CHANGED',

    /* cerebro */
    'cerebro.gmMode': '// GM MODE - DB LOADED',
    'cerebro.squadMode': '// SQUAD MODE - MEMBERS LOADED',
    'cerebro.version': 'VERSION 6.0 // GM MODE',
    'cerebro.dbTitle': 'CÉREBRO DATABASE',
    'cerebro.newNpc': 'NEW NPC',
    'cerebro.loadingNpcs': '// LOADING NPCs...',
    'cerebro.dbLoaded': '// DB:',
    'cerebro.errorLoad': '// ERROR LOADING NPCs',
    'cerebro.loadingDb': '// LOADING...',
    'cerebro.errorLoadDb': '// ERROR LOADING',
    'cerebro.squadAndNpcs': 'SQUAD + NPCs',
    'cerebro.squad': 'SQUAD',
    'cerebro.memberSquad': 'Squad member',
    'cerebro.noParty': 'NO PARTY',
    'cerebro.noPartyMsg': 'You are not in any party.',
    'cerebro.noAccess': 'RESTRICTED ACCESS',
    'cerebro.gmOnly': 'Only GMs can access Cérebro.',
    'cerebro.backDash': 'Back to Dashboard',
    'cerebro.encounterTitle': 'ACTIVE ENCOUNTER',
    'cerebro.round': 'R',
    'cerebro.addSelected': '+ ADD SELECTED NPC',
    'cerebro.registered': '// REGISTERED MUTANTS',
    'cerebro.filter': 'FILTER...',
    'cerebro.emptyTitle': 'NO NPC',
    'cerebro.emptySub': 'SELECT AN NPC FROM THE LEFT PANEL\nOR CREATE A NEW ONE',
    'cerebro.importTitle': 'IMPORT .MD',
    'cerebro.importDesc': 'Paste Markdown with NPCs (format \'# NPC: Name\'). NPCs with same name will be updated.',
    'cerebro.newNpcTitle': 'NEW NPC',
    'cerebro.editNpcTitle': 'EDIT NPC',
    'cerebro.faction': 'FACTION',
    'cerebro.danger': 'DANGER',
    'cerebro.initiative': 'INITIATIVE',
    'cerebro.physical': 'PHYSICAL',
    'cerebro.mental': 'MENTAL',
    'cerebro.social': 'SOCIAL / MYSTICAL',
    'cerebro.tagsHelp': 'TAGS // CITY OF MIST (grade 1-6, negative = weakness)',
    'cerebro.tagName': 'Tag name...',
    'cerebro.create': 'CREATE NPC',
    'cerebro.save': 'SAVE',
    'cerebro.condition': 'CONDITION',
    'cerebro.conditionFor': 'Select or type a condition for',
    'cerebro.customCondition': 'CUSTOM CONDITION',
    'cerebro.addToEncounter': 'ADD TO ACTIVE ENCOUNTER',
    'cerebro.removeEncounter': 'REMOVE FROM ENCOUNTER',
    'cerebro.addCondition': '+ CONDITION',
    'cerebro.noCondition': 'No conditions',
    'cerebro.noTags': '\u2014 No tags \u2014',
    'cerebro.noDescription': '\u2014 No description \u2014',
    'cerebro.readOnly': 'GLOBAL // READ ONLY',
    'cerebro.confirmDelete': 'Delete',
    'cerebro.deleted': 'REMOVED',
    'cerebro.deleteError': 'ERROR DELETING',
    'cerebro.cantEditGlobal': 'GLOBAL NPCs CANNOT BE EDITED',
    'cerebro.cantDeleteGlobal': 'GLOBAL NPC CANNOT BE DELETED',
    'cerebro.nameRequired': 'NAME REQUIRED',
    'cerebro.updated': 'NPC UPDATED',
    'cerebro.loginAsGm': 'LOG IN AS GM TO CREATE NPCs',
    'cerebro.created': 'NPC CREATED',
    'cerebro.saveError': 'ERROR SAVING NPC',
    'cerebro.alreadyEncounter': 'ALREADY IN ENCOUNTER',
    'cerebro.addedEncounter': 'ADDED TO ENCOUNTER',
    'cerebro.removedEncounter': 'REMOVED FROM ENCOUNTER',
    'cerebro.selectFirst': 'SELECT AN NPC FIRST',
    'cerebro.conditionApplied': 'CONDITION:',
    'cerebro.exported': 'EXPORTED',
    'cerebro.noValidNpcs': 'NO VALID NPCs',
    'cerebro.imported': 'created \u00B7 updated',
    'cerebro.encounterLabel': 'ENCOUNTER \u2014 ROUND',
    'cerebro.encounterEmpty': 'NO NPCs IN ENCOUNTER\nSELECT AND CLICK "+ ADD"',
    'cerebro.attrsSection': 'ATTRIBUTES MEGS',
    'cerebro.tagsSection': 'TAGS // CITY OF MIST',
    'cerebro.dossierSection': 'DESCRIPTION // DOSSIER',
    'cerebro.initiativeLabel': 'INITIATIVE',

    /* conditions */
    'cond.lightWound': 'Light Wound',
    'cond.seriousWound': 'Serious Wound',
    'cond.stunned': 'Stunned',
    'cond.incapacitated': 'Incapacitated',
    'cond.bleeding': 'Bleeding',
    'cond.poisoned': 'Poisoned',
    'cond.burning': 'On Fire',
    'cond.paralyzed': 'Paralyzed',
    'cond.fear': 'Fear',
    'cond.unconscious': 'Unconscious',

    /* factions */
    'faction.xmen': 'X-Men',
    'faction.novatos': 'Nov. Mutants/Gen.X',
    'faction.geracaox': 'X-Factor/X-Force',
    'faction.morlock': 'Morlocks',
    'faction.irmandade': 'Brotherhood',
    'faction.vilao': 'Villain',
    'faction.criminoso': 'Criminal',
    'faction.neutro': 'Neutral/Ambiguous',
    'faction.humano': 'Human/Ally',

    /* danger */
    'danger.baixo': 'LOW',
    'danger.medio': 'MEDIUM',
    'danger.alto': 'HIGH',
    'danger.extremo': 'EXTREME',
  }
};

function getCurrentLanguage() {
  return localStorage.getItem(LANG_KEY) || 'pt-BR';
}

function setLanguage(locale) {
  if (!I18N[locale]) return;
  localStorage.setItem(LANG_KEY, locale);
  document.documentElement.lang = locale;
  document.dispatchEvent(new CustomEvent('langchange', { detail: { locale } }));
  applyTranslations();
  toast(I18N[locale]['lang.changed']);
}

function t(key) {
  const lang = getCurrentLanguage();
  const dict = I18N[lang];
  if (dict && dict[key] !== undefined) return dict[key];
  const fallback = I18N['pt-BR'];
  if (fallback && fallback[key] !== undefined) return fallback[key];
  return key;
}

function applyTranslations(el) {
  const root = el || document;
  root.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });
  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    el.title = t(key);
  });
}

function initLanguage() {
  const lang = getCurrentLanguage();
  document.documentElement.lang = lang;
  return lang;
}

window.I18N = I18N;
window.LANGUAGES = LANGUAGES;
window.t = t;
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.applyTranslations = applyTranslations;
window.initLanguage = initLanguage;
