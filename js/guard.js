/**
 *
 * Gestiona la lista de accesos activos: renderizado,
 * registro de salida manual y simulación de entradas nuevas.
 */

/* ============================================================
   RENDERING
   ============================================================ */

/**
 * Usa AppState.activeAccesses como fuente de verdad.
 */
function renderActiveAccesses() {
  const container = document.getElementById('active-accesses');
  if (!container) return;

  container.innerHTML = '';

  AppState.activeAccesses.forEach(access => {
    const hue = hashName(access.name);
    const el  = document.createElement('div');
    el.className = 'access-item';
    el.id        = `access-${access.id}`;
    // Avatar: uso de hsl suave sobre la base institucional (saturación baja)
    const avatarBg = `hsl(${hue}, 30%, 45%)`;
    el.innerHTML = `
      <div class="access-user">
        <div
          class="access-avatar"
          style="background:${avatarBg}"
        >${access.initials}</div>
        <div>
          <div class="access-name">${access.name}</div>
          <div class="access-meta">${access.role} · ${access.facility}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="access-timer">Entrada<br/>${access.time}</div>
        <button class="btn btn-danger btn-sm" onclick="registerExit(${access.id})">
          Registrar salida
        </button>
      </div>
    `;
    container.appendChild(el);
  });

  updateGuardCount();
}

/** Actualiza el contador de usuarios activos en las stat-cards del guardia */
function updateGuardCount() {
  const el = document.getElementById('guard-count');
  if (el) el.textContent = AppState.activeAccesses.length;
}

/* ============================================================
   ACTIONS
   ============================================================ */

/**
 * Registra la salida manual de un usuario activo.
 * Anima el elemento antes de eliminarlo del estado.
 *
 * @param {number} id - ID del acceso activo a cerrar
 */
function registerExit(id) {
  const item = document.getElementById(`access-${id}`);
  if (!item) return;

  item.classList.add('removing');

  setTimeout(() => {
    AppState.activeAccesses = AppState.activeAccesses.filter(a => a.id !== id);
    renderActiveAccesses();
    showToast('Salida registrada manualmente', 'success');
  }, 350);
}

/**
 * Simula la entrada de un nuevo usuario (botón "+ Simular entrada").
 * Usa el pool RANDOM_NAMES de forma circular.
 */
function addRandomAccess() {
  const template = RANDOM_NAMES[AppState.nameIdx % RANDOM_NAMES.length];
  AppState.nameIdx++;
  AppState.accessCounter++;

  AppState.activeAccesses.push({
    ...template,
    id:   Date.now(),
    time: getTime(),
  });

  renderActiveAccesses();
  showToast(`Nueva entrada: ${template.name}`, 'info');
}
