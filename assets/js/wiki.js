// Wiki AR tables: range-based renderer shared by the AV/OV and EV/RV views.
// Uses the same range buckets as combate.html, but keeps the wiki page independent.

const RANGES = ['1-2','3-4','5-6','7-8','9-10','11-12','13-15','16-18','19-21','22-24','25-27','28-30','31-35','36-40','41-45','46-50','51-55','56-60'];
const RANGE_MAX = [2,4,6,8,10,12,15,18,21,24,27,30,35,40,45,50,55,60];
const N = 'N';

const ACTION_POS = [11,13,15,18,21,24,28,32,36,40,45,50,55,60,65,70,75,80];
const ACTION_NEG = {'-1':9,'-2':7,'-3':5,'-4':4};
const ACTION_OV0 = [6,5,4,4,3];

const RESULT_TABLE = [
  [ 1, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N],
  [ 2, 1, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N],
  [ 3, 2, 1, N, N, N, N, N, N, N, N, N, N, N, N, N, N, N],
  [ 4, 3, 2, 1, N, N, N, N, N, N, N, N, N, N, N, N, N, N],
  [ 8, 6, 4, 3, 2, 1, N, N, N, N, N, N, N, N, N, N, N, N],
  [10, 9, 7, 6, 5, 3, 1, N, N, N, N, N, N, N, N, N, N, N],
  [12,11, 9, 8, 7, 5, 3, 1, N, N, N, N, N, N, N, N, N, N],
  [14,13,11,10, 9, 8, 6, 4, N, N, N, N, N, N, N, N, N, N],
  [18,17,16,14,12,11, 9, 8, 6, 4, N, N, N, N, N, N, N, N],
  [21,20,19,17,15,13,11, 9, 7, 5, N, N, N, N, N, N, N, N],
  [24,23,22,20,18,16,14,12,10, 8, 6, N, N, N, N, N, N, N],
  [27,26,25,23,21,19,17,15,13,11, 8, N, N, N, N, N, N, N],
  [30,29,28,26,24,22,20,18,16,14,12,10, 8, N, N, N, N, N],
  [35,34,33,31,29,27,25,23,21,19,17,14,12, 9, N, N, N, N],
  [40,38,36,34,32,30,28,26,24,22,20,18,16,13,10, N, N, N],
  [45,43,41,40,38,36,34,31,28,25,22,20,17,14,11, N, N, N],
  [50,48,46,44,42,40,38,35,32,29,26,24,21,18,15,12, N, N],
  [55,53,51,49,47,45,43,41,39,36,33,30,27,24,21,18,15,13]
];

let activeType = 'avov';

function rangeIdx(v) {
  if (v <= 0) return -1;
  for (let i = 0; i < RANGE_MAX.length; i++) if (v <= RANGE_MAX[i]) return i;
  return RANGE_MAX.length - 1 + Math.ceil((v - 60) / 5);
}

function actionTarget(avIdx, ovIdx) {
  const d = ovIdx - avIdx;
  if (d <= -5) return 3;
  if (d < 0) return ACTION_NEG[d];
  if (d < ACTION_POS.length) return ACTION_POS[d];
  return 80 + (d - (ACTION_POS.length - 1)) * 5;
}

function actionOV0(avIdx) {
  return avIdx < ACTION_OV0.length ? ACTION_OV0[avIdx] : 3;
}

function actionCell(avIdx, ovIdx) {
  return actionTarget(avIdx, ovIdx);
}

function resultCell(evIdx, rvIdx) {
  return RESULT_TABLE[evIdx]?.[rvIdx] ?? N;
}

function setActiveType(type) {
  activeType = type === 'evrv' ? 'evrv' : 'avov';
  document.querySelectorAll('.ar-type-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.type === activeType);
  });
}

function buildActionTable(type) {
  const headerLabel = type === 'avov' ? 'AV\\OV' : 'EV\\RV';
  const firstColLabel = type === 'avov' ? '0' : '×';
  const dataRows = type === 'avov' ? RANGES : RANGES;

  let html = `\n        <thead><tr><th>${headerLabel}</th><th>${firstColLabel}</th>`;
  RANGES.forEach(range => {
    html += `<th>${range}</th>`;
  });
  html += '<th>+5</th></tr></thead><tbody>';

  if (type === 'avov') {
    dataRows.forEach((rowLabel, avIdx) => {
      html += `<tr><th>${rowLabel}</th><td>${actionOV0(avIdx)}</td>`;
      RANGES.forEach((_, ovIdx) => {
        html += `<td>${actionCell(avIdx, ovIdx)}</td>`;
      });
      html += '<td>C</td></tr>';
    });
  } else {
    dataRows.forEach((rowLabel, evIdx) => {
      html += `<tr><th>${rowLabel}</th><td>+1</td><td>A</td>`;
      RANGES.forEach((_, rvIdx) => {
        const val = resultCell(evIdx, rvIdx);
        html += `<td>${val}</td>`;
      });
      html += '<td>*</td></tr>';
    });
  }

  html += '</tbody>';
  return html;
}

function renderActionTable() {
  const table = document.getElementById('action-table');
  if (!table) return;
  const type = document.querySelector('.ar-type-btn.active')?.dataset.type || activeType;
  setActiveType(type);
  table.innerHTML = buildActionTable(activeType);
}

function showARTableType(type) {
  setActiveType(type);
  renderActionTable();
}

window.renderActionTable = renderActionTable;
window.showARTableType = showARTableType;
