/**
 * admin.js — Panel del Administrador
 *
 * Gestiona incidencias (renderizado, asignación, cierre, escalado)
 * y la emisión de credenciales temporales para visitantes.
 */

/* ============================================================
   INCIDENTS
   ============================================================ */

/**
 * Renderiza la lista de incidencias abiertas (excluye las cerradas).
 * Lee de AppState.incidents.
 */
function renderIncidents() {
  const container = document.getElementById('incidents-list');
  if (!container) return;

  container.innerHTML = '';

  const open = AppState.incidents.filter(inc => inc.status !== 'Cerrada');

  open.forEach(inc => {
    const el = document.createElement('div');
    el.className = 'incident-item';
    el.id        = `incident-${inc.id}`;

    el.innerHTML = `
      <div class="incident-priority priority-${inc.priority}"></div>
      <div class="incident-body">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">
          <span class="badge ${PRIORITY_BADGE[inc.priority]}">${PRIORITY_LABELS[inc.priority]}</span>
          <span class="badge ${STATUS_BADGE[inc.status]}">${inc.status}</span>
          <span class="badge badge-gray">${inc.type}</span>
        </div>
        <div class="incident-title">${inc.title}</div>
        <div class="incident-meta">
          ${inc.time} · ${inc.assignee ? 'Asignado a: ' + inc.assignee : 'Sin asignar'}
        </div>
        <div class="incident-actions">
          ${!inc.assignee
            ? `<button class="btn btn-ghost btn-sm" onclick="assignIncident(${inc.id})">👤 Asignar responsable</button>`
            : ''}
          <button class="btn btn-success btn-sm" onclick="closeIncident(${inc.id})">✓ Confirmar cierre</button>
          ${inc.status === 'Abierta'
            ? `<button class="btn btn-warning btn-sm" onclick="escalateIncident(${inc.id})">↑ Escalar</button>`
            : ''}
        </div>
      </div>
    `;
    container.appendChild(el);
  });

  if (open.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:40px;color:var(--text-muted)">
        🎉 Sin incidencias abiertas
      </div>`;
  }
}

/**
 * Asigna un responsable aleatorio del STAFF_LIST a una incidencia
 * y la pasa a estado "En revisión".
 *
 * @param {number} id - ID de la incidencia
 */
function assignIncident(id) {
  const inc = AppState.incidents.find(i => i.id === id);
  if (!inc) return;

  const assigned  = STAFF_LIST[Math.floor(Math.random() * STAFF_LIST.length)];
  inc.assignee    = assigned;
  inc.status      = 'En revisión';

  renderIncidents();
  showToast(`Incidencia asignada a ${assigned}`, 'success');
}

/**
 * Marca una incidencia como cerrada con animación de fade-out.
 *
 * @param {number} id - ID de la incidencia
 */
function closeIncident(id) {
  const inc = AppState.incidents.find(i => i.id === id);
  if (!inc) return;

  inc.status = 'Cerrada';

  const el = document.getElementById(`incident-${id}`);
  if (el) {
    el.style.opacity    = '0';
    el.style.transition = '0.4s ease';
    setTimeout(() => renderIncidents(), 400);
  }

  showToast('Incidencia cerrada correctamente', 'success');
}

/**
 * Escala una incidencia abierta al estado "Escalada".
 *
 * @param {number} id - ID de la incidencia
 */
function escalateIncident(id) {
  const inc = AppState.incidents.find(i => i.id === id);
  if (!inc) return;

  inc.status = 'Escalada';

  renderIncidents();
  showToast('Incidencia escalada a nivel superior', 'warning');
}

/* ============================================================
   CREDENTIAL EMISSION
   ============================================================ */

/**
 * Emite una credencial temporal para un visitante.
 * Valida que los campos requeridos estén completos y
 * muestra el código generado en el panel.
 */
function issueCredential() {
  const name     = document.getElementById('cred-name').value.trim();
  const facility = document.getElementById('cred-facility').value;
  const time     = document.getElementById('cred-time').value;
  const date     = document.getElementById('cred-date').value;

  if (!name || !facility || !time) {
    showToast('Completa los campos requeridos', 'error');
    return;
  }

  const code = genCredCode();

  document.getElementById('cred-code').textContent    = code;
  document.getElementById('cred-details').innerHTML   =
    `${name}<br/>${facility} · ${time}<br/>${date ? 'Válida: ' + date : 'Válida hoy'}`;
  document.getElementById('cred-issued').classList.add('visible');

  showToast(`Credencial ${code} emitida exitosamente`, 'success');
}
