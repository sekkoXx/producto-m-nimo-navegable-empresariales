/**
 * history.js — Vista de Historial de Accesos
 *
 * Gestiona el renderizado y filtrado de la tabla
 * de historial de eventos de acceso.
 */

/* ============================================================
   RENDERING
   ============================================================ */

/**
 * Renderiza las filas de la tabla de historial según filtro activo
 * y texto de búsqueda del input.
 *
 * @param {string} filter - 'all' | 'Permitido' | 'Denegado'
 */
function renderHistory(filter) {
  AppState.currentFilter = filter;

  const searchInput = document.getElementById('history-search');
  const search      = searchInput ? searchInput.value.toLowerCase() : '';
  const body        = document.getElementById('history-body');
  if (!body) return;

  body.innerHTML = '';

  const filtered = HISTORY_DATA.filter(record => {
    const matchFilter = filter === 'all' || record.result === filter;
    const matchSearch = !search || record.user.toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  filtered.forEach(record => {
    const badgeCls = record.result === 'Permitido' ? 'badge-green' : 'badge-red';
    const tr       = document.createElement('tr');

    tr.innerHTML = `
      <td><strong>${record.user}</strong></td>
      <td><span class="badge badge-blue">${record.role}</span></td>
      <td>${record.facility}</td>
      <td class="font-mono text-sm">${record.entrada}</td>
      <td class="font-mono text-sm">${record.salida}</td>
      <td class="font-mono text-sm">${record.dur}</td>
      <td><span class="badge ${badgeCls}">${record.result}</span></td>
      <td style="color:var(--text-muted);font-size:0.8rem">${record.reason}</td>
    `;

    body.appendChild(tr);
  });

  if (filtered.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted)">
          No se encontraron registros
        </td>
      </tr>`;
  }
}

/* ============================================================
   FILTER
   ============================================================ */

/**
 * Aplica un filtro y actualiza el estado visual de los botones.
 *
 * @param {string} filter - 'all' | 'Permitido' | 'Denegado'
 * @param {HTMLElement|null} btn - Botón que fue presionado (para activar su clase)
 */
function filterHistory(filter, btn) {
  AppState.currentFilter = filter;

  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  renderHistory(filter);
}
