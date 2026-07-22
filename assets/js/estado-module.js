window.EstadoModule = (function() {
  const DEFAULT_STATE = {
    savedMoves: [],
    conditions: {
      temporarias: [],
      duradouras: [],
      permanentes: [],
    },
    tempoPassado: 0,
  };

  const DEATH_THRESHOLD = 10;
  const state = {
    data: null,
    selectedTags: [],
    filter: 'all',
    query: '',
    insertType: 'condicao',
    passUnit: 'minutos',
    bound: false,
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function uid() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'estado-' + Date.now() + '-' + Math.random().toString(16).slice(2);
  }

  function ensure() {
    if (!state.data) return;
    if (!state.data.estado || typeof state.data.estado !== 'object') {
      state.data.estado = clone(DEFAULT_STATE);
      return;
    }

    const current = state.data.estado;
    current.savedMoves = Array.isArray(current.savedMoves) ? current.savedMoves : [];
    current.conditions = current.conditions && typeof current.conditions === 'object' ? current.conditions : {};
    current.conditions.temporarias = Array.isArray(current.conditions.temporarias) ? current.conditions.temporarias : [];
    current.conditions.duradouras = Array.isArray(current.conditions.duradouras) ? current.conditions.duradouras : [];
    current.conditions.permanentes = Array.isArray(current.conditions.permanentes) ? current.conditions.permanentes : [];
    current.tempoPassado = Number.isFinite(current.tempoPassado) ? current.tempoPassado : 0;
    delete current.selectedTags;
  }

  function allTags() {
    const temas = Array.isArray(state.data && state.data.temas) ? state.data.temas : [];
    const tags = [];

    temas.forEach((tema, temaIdx) => {
      const temaNome = (tema && (tema.titulo || tema.tipo || tema.nome)) || 'Tema';
      ['poder', 'fraqueza'].forEach(tipo => {
        const items = Array.isArray(tema && tema[tipo]) ? tema[tipo] : [];
        items.forEach((raw, tagIdx) => {
          const texto = typeof raw === 'string' ? raw : (raw && raw.texto) || '';
          if (!texto.trim()) return;
          const grau = typeof raw === 'object' && raw && Number.isFinite(raw.grau) ? raw.grau : 1;
          tags.push({ texto, grau, tipo, temaIdx, tagIdx, temaNome });
        });
      });
    });

    return tags;
  }

  function tagKey(tag) {
    return [tag.temaIdx, tag.tagIdx, tag.tipo, tag.texto].join('::');
  }

  function isSelected(tag) {
    const key = tagKey(tag);
    return state.selectedTags.some(item => tagKey(item) === key);
  }

  function save() {
    if (typeof window.salvarAuto === 'function') {
      window.salvarAuto();
    }
  }

  function renderTags() {
    const root = document.getElementById('estado-tags-list');
    if (!root) return;

    const tags = allTags().filter(tag => {
      const typeOk = state.filter === 'all' || tag.tipo === state.filter;
      const query = state.query.trim().toLowerCase();
      const queryOk = !query || tag.texto.toLowerCase().includes(query) || tag.temaNome.toLowerCase().includes(query);
      return typeOk && queryOk;
    });

    if (!tags.length) {
      root.innerHTML = '<div class="estado-warning">Nenhuma tag encontrada.</div>';
      return;
    }

    root.innerHTML = '';
    const groups = [];
    tags.forEach(tag => {
      const last = groups[groups.length - 1];
      if (!last || last.name !== tag.temaNome) {
        groups.push({ name: tag.temaNome, tags: [tag] });
      } else {
        last.tags.push(tag);
      }
    });

    groups.forEach((group, idx) => {
      const groupWrap = document.createElement('div');
      groupWrap.className = 'estado-tag-group';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'estado-tag-group-header';

      const line = document.createElement('span');
      line.className = 'estado-tag-group-line';

      const label = document.createElement('span');
      label.className = 'estado-tag-group-label';
      label.textContent = group.name;

      groupHeader.appendChild(line);
      groupHeader.appendChild(label);
      groupWrap.appendChild(groupHeader);

      const cloud = document.createElement('div');
      cloud.className = 'estado-chip-cloud';
      group.tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'estado-chip' + (isSelected(tag) ? ' active' : '');
        btn.dataset.tipo = tag.tipo;
        btn.textContent = (tag.tipo === 'poder' ? 'Poder' : 'Fraqueza') + ': ' + tag.texto;
        btn.setAttribute('aria-pressed', isSelected(tag) ? 'true' : 'false');
        btn.addEventListener('click', () => toggleTag(tag));
        cloud.appendChild(btn);
      });

      groupWrap.appendChild(cloud);
      root.appendChild(groupWrap);
      if (idx < groups.length - 1) {
        const sep = document.createElement('div');
        sep.className = 'estado-tag-separator';
        root.appendChild(sep);
      }
    });
  }

  function renderSelected() {
    const root = document.getElementById('estado-selected-tags');
    const moveInput = document.getElementById('estado-move-name');
    if (!root) return;

    if (!state.selectedTags.length) {
      root.innerHTML = '<div class="estado-warning">Nenhuma tag selecionada.</div>';
      if (moveInput && !moveInput.value) moveInput.placeholder = 'Nome da manobra';
      return;
    }

    root.innerHTML = '';
    state.selectedTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'estado-pill';
      btn.dataset.tipo = tag.tipo;
      btn.textContent = tag.texto + ' ×';
      btn.addEventListener('click', () => toggleTag(tag));
      root.appendChild(btn);
    });
  }

  function renderMoves() {
    const root = document.getElementById('estado-moves-list');
    if (!root) return;

    const moves = state.data.estado.savedMoves || [];
    if (!moves.length) {
      root.innerHTML = '<div class="estado-warning">Nenhuma manobra salva.</div>';
      return;
    }

    root.innerHTML = '';
    moves.forEach(move => {
      const card = document.createElement('div');
      card.className = 'estado-card';

      const top = document.createElement('div');
      top.className = 'estado-card-top';

      const name = document.createElement('div');
      name.className = 'estado-move-name';
      name.textContent = move.nome;

      const badge = document.createElement('span');
      badge.className = 'estado-badge';
      badge.textContent = (move.tags || []).length + ' tags';

      top.appendChild(name);
      top.appendChild(badge);

      const tagRow = document.createElement('div');
      tagRow.className = 'estado-move-tags';
      (move.tags || []).forEach(tag => {
        const pill = document.createElement('span');
        pill.className = 'estado-tag';
        pill.dataset.tipo = tag.tipo;
        pill.textContent = tag.texto;
        tagRow.appendChild(pill);
      });

      const actions = document.createElement('div');
      actions.className = 'estado-condition-ops';

      const useBtn = document.createElement('button');
      useBtn.type = 'button';
      useBtn.className = 'estado-mini-btn';
      useBtn.textContent = 'USAR';
      useBtn.addEventListener('click', () => {
        state.selectedTags = clone(move.tags || []);
        render();
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'estado-mini-btn';
      delBtn.textContent = 'APAGAR';
      delBtn.addEventListener('click', () => {
        if (!confirm('Remover esta manobra?')) return;
        const idx = state.data.estado.savedMoves.findIndex(item => item.id === move.id);
        if (idx >= 0) state.data.estado.savedMoves.splice(idx, 1);
        save();
        render();
      });

      actions.appendChild(useBtn);
      actions.appendChild(delBtn);

      card.appendChild(top);
      card.appendChild(tagRow);
      card.appendChild(actions);
      root.appendChild(card);
    });
  }

  function sumAllDegrees() {
    return Object.values(state.data.estado.conditions).flat().reduce((sum, item) => {
      return sum + (Number(item && item.grau) || 0);
    }, 0);
  }

  function sumConditionDegrees() {
    return Object.values(state.data.estado.conditions).flat().reduce((sum, item) => {
      if (!item || item.tipo !== 'condicao') return sum;
      return sum + (Number(item.grau) || 0);
    }, 0);
  }

  function calcThreshold() {
    return sumAllDegrees();
  }

  function renderConditionBucket(bucket, root) {
    const items = state.data.estado.conditions[bucket] || [];
    if (!items.length) {
      root.innerHTML = '<div class="estado-warning">Nenhum item.</div>';
      return;
    }

    root.innerHTML = '';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'estado-condition-card ' + (item.tipo || 'condicao');

      const head = document.createElement('div');
      head.className = 'estado-condition-head';

      const title = document.createElement('div');
      title.className = 'estado-condition-title';
      title.textContent = item.nome;

      const badge = document.createElement('span');
      badge.className = 'estado-badge ' + (item.tipo === 'efeito' ? 'good' : 'warn');
      badge.textContent = item.tipo === 'efeito' ? 'EFEITO' : 'CONDIÇÃO';

      const degree = document.createElement('span');
      degree.className = 'estado-condition-degree';
      degree.textContent = 'Grau ' + (item.grau || 0);

      head.appendChild(title);
      head.appendChild(badge);
      head.appendChild(degree);

      const actions = document.createElement('div');
      actions.className = 'estado-condition-actions';

      const inc = document.createElement('button');
      inc.type = 'button';
      inc.className = 'estado-mini-btn';
      inc.textContent = '+1';
      inc.addEventListener('click', () => {
        item.grau = (Number(item.grau) || 0) + 1;
        save();
        render();
      });

      const dec = document.createElement('button');
      dec.type = 'button';
      dec.className = 'estado-mini-btn';
      dec.textContent = '-1';
      dec.addEventListener('click', () => {
        item.grau = Math.max(0, (Number(item.grau) || 0) - 1);
        if (item.grau <= 0) {
          const idx = state.data.estado.conditions[bucket].findIndex(entry => entry.id === item.id);
          if (idx >= 0) state.data.estado.conditions[bucket].splice(idx, 1);
        }
        save();
        render();
      });

      const swap = document.createElement('button');
      swap.type = 'button';
      swap.className = 'estado-mini-btn';
      swap.textContent = item.tipo === 'efeito' ? 'VIRAR CONDIÇÃO' : 'VIRAR EFEITO';
      swap.addEventListener('click', () => {
        item.tipo = item.tipo === 'efeito' ? 'condicao' : 'efeito';
        save();
        render();
      });

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'estado-mini-btn';
      del.textContent = 'REMOVER';
      del.addEventListener('click', () => {
        if (!confirm('Remover este item?')) return;
        const idx = state.data.estado.conditions[bucket].findIndex(entry => entry.id === item.id);
        if (idx >= 0) state.data.estado.conditions[bucket].splice(idx, 1);
        save();
        render();
      });

      actions.appendChild(inc);
      actions.appendChild(dec);
      actions.appendChild(swap);
      actions.appendChild(del);

      card.appendChild(head);
      if (item.createdAt) {
        const meta = document.createElement('div');
        meta.className = 'estado-condition-meta';
        meta.innerHTML = '<span class="estado-badge">CRIADO ' + new Date(item.createdAt).toLocaleDateString('pt-BR') + '</span>';
        card.appendChild(meta);
      }
      card.appendChild(actions);
      root.appendChild(card);
    });
  }

  function renderConditions() {
    const thresholdEl = document.getElementById('estado-threshold');
    const warningEl = document.getElementById('estado-warning');
    const threshold = calcThreshold();
    const lethal = sumConditionDegrees();

    if (thresholdEl) {
      thresholdEl.textContent = 'Limiar duradouras: ' + threshold + ' APs (~' + (threshold * 5) + ' min)';
    }
    if (warningEl) {
      warningEl.textContent = lethal >= DEATH_THRESHOLD ? 'PERIGO: condição acumulada alta.' : '';
      warningEl.className = 'estado-warning' + (lethal >= DEATH_THRESHOLD ? ' warn' : '');
    }

    const temp = document.getElementById('estado-temporarias');
    const dur = document.getElementById('estado-duradouras');
    const perm = document.getElementById('estado-permanentes');
    if (temp) renderConditionBucket('temporarias', temp);
    if (dur) renderConditionBucket('duradouras', dur);
    if (perm) renderConditionBucket('permanentes', perm);
  }

  function renderInsertType() {
    const btn = document.getElementById('estado-condition-kind-toggle');
    if (!btn) return;
    btn.className = 'estado-kind-btn ' + (state.insertType === 'efeito' ? 'efeito' : 'condicao');
    btn.textContent = state.insertType === 'efeito' ? 'EFEITO' : 'CONDIÇÃO';
    btn.setAttribute('aria-pressed', state.insertType === 'efeito' ? 'true' : 'false');
  }

  function timeToAps(value, unit) {
    if (unit === 'horas') return Math.max(1, Math.ceil(value * 12));
    return Math.max(1, Math.ceil(value / 5));
  }

  function passByAps(aps) {
    state.data.estado.conditions.temporarias = state.data.estado.conditions.temporarias
      .map(item => ({ ...item, grau: Math.max(0, (Number(item.grau) || 0) - aps) }))
      .filter(item => item.grau > 0);

    state.data.estado.tempoPassado += aps;
    let threshold = calcThreshold();
    while (threshold > 0 && state.data.estado.tempoPassado >= threshold) {
      state.data.estado.conditions.duradouras = state.data.estado.conditions.duradouras
        .map(item => ({ ...item, grau: Math.max(0, (Number(item.grau) || 0) - 1) }))
        .filter(item => item.grau > 0);
      state.data.estado.tempoPassado -= threshold;
      threshold = calcThreshold();
    }
    save();
    render();
  }

  function toggleTag(tag) {
    const key = tagKey(tag);
    const idx = state.selectedTags.findIndex(item => tagKey(item) === key);
    if (idx >= 0) state.selectedTags.splice(idx, 1);
    else state.selectedTags.push(clone(tag));
    render();
  }

  function saveMove() {
    const input = document.getElementById('estado-move-name');
    const nome = input ? input.value.trim() : '';
    if (!nome) return;
    if (!state.selectedTags.length) return;

    state.data.estado.savedMoves.unshift({
      id: uid(),
      nome,
      tags: clone(state.selectedTags),
      createdAt: new Date().toISOString(),
    });

    state.selectedTags = [];
    if (input) input.value = '';
    save();
    render();
  }

  function addCondition() {
    const nomeEl = document.getElementById('estado-condition-name');
    const grauEl = document.getElementById('estado-condition-degree');
    const durationEl = document.getElementById('estado-condition-duration');
    const nome = nomeEl ? nomeEl.value.trim() : '';
    const grau = Math.max(1, parseInt(grauEl && grauEl.value, 10) || 1);
    const tipo = state.insertType === 'efeito' ? 'efeito' : 'condicao';
    const bucket = durationEl ? durationEl.value : 'temporarias';
    if (!nome) return;

    state.data.estado.conditions[bucket].push({
      id: uid(),
      nome,
      grau,
      tipo,
      createdAt: new Date().toISOString(),
    });

    if (nomeEl) nomeEl.value = '';
    if (grauEl) grauEl.value = '1';
    save();
    render();
  }

  function reduceAllTemporarias() {
    const list = state.data.estado.conditions.temporarias;
    state.data.estado.conditions.temporarias = list
      .map(item => ({ ...item, grau: Math.max(0, (Number(item.grau) || 0) - 1) }))
      .filter(item => item.grau > 0);
    save();
    render();
  }

  function passTime() {
    const input = document.getElementById('estado-pass-value');
    const unit = document.getElementById('estado-pass-unit');
    const raw = Math.max(1, parseInt(input && input.value, 10) || 1);
    const aps = timeToAps(raw, unit ? unit.value : state.passUnit);
    passByAps(aps);
  }

  function passTurn() {
    passByAps(1);
  }

  function bindStaticEvents() {
    if (state.bound) return;
    state.bound = true;

    const search = document.getElementById('estado-tag-search');
    const filter = document.getElementById('estado-tag-filter');
    const saveMoveBtn = document.getElementById('estado-save-move');
    const addConditionBtn = document.getElementById('estado-add-condition');
    const kindToggleBtn = document.getElementById('estado-condition-kind-toggle');
    const passUnit = document.getElementById('estado-pass-unit');
    const passTimeBtn = document.getElementById('estado-pass-time');
    const reduceTempBtn = document.getElementById('estado-reduce-temp');

    if (search) {
      search.addEventListener('input', () => {
        state.query = search.value;
        renderTags();
      });
    }
    if (filter) {
      filter.addEventListener('change', () => {
        state.filter = filter.value || 'all';
        renderTags();
      });
    }
    if (saveMoveBtn) saveMoveBtn.addEventListener('click', saveMove);
    if (kindToggleBtn) {
      kindToggleBtn.addEventListener('click', () => {
        state.insertType = state.insertType === 'efeito' ? 'condicao' : 'efeito';
        renderInsertType();
      });
    }
    if (passUnit) {
      passUnit.addEventListener('change', () => {
        state.passUnit = passUnit.value || 'minutos';
      });
    }
    if (addConditionBtn) addConditionBtn.addEventListener('click', addCondition);
    if (passTimeBtn) passTimeBtn.addEventListener('click', passTime);
    if (reduceTempBtn) reduceTempBtn.addEventListener('click', passTurn);
  }

  function init(data) {
    state.data = data;
    state.selectedTags = [];
    state.filter = 'all';
    state.query = '';
    state.insertType = 'condicao';
    state.passUnit = 'minutos';
    state.bound = false;
    ensure();
    bindStaticEvents();
  }

  function render() {
    if (!state.data) return;
    ensure();
    bindStaticEvents();
    renderTags();
    renderSelected();
    renderMoves();
    renderInsertType();
    renderConditions();
  }

  return { init, render };
})();
