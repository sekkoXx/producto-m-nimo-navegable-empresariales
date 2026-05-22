/**
 * navigation.js — Sistema de navegación y vistas
 *
 * Gestiona la construcción dinámica del sidebar y la activación
 * de vistas. También incluye el renderizado del dashboard por rol.
 */

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */

/**
 * Construye los ítems de navegación en el sidebar
 * según el menú del rol activo.
 *
 * @param {Array} navItems - Array de { id, icon, label, section? }
 */
function buildNav(navItems) {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = '';
  let lastSection;

  navItems.forEach(item => {
    // Renderizar etiqueta de sección si cambia
    if (item.section && item.section !== lastSection) {
      const label = document.createElement('div');
      label.className   = 'nav-section-label';
      label.textContent = item.section;
      nav.appendChild(label);
      lastSection = item.section;
    }

    // Crear ítem de navegación
    const el = document.createElement('div');
    el.className      = 'nav-item';
    el.dataset.view   = item.id;
    el.id             = `nav-${item.id}`;
    el.innerHTML      = `<span class="nav-icon">${item.icon}</span><span>${item.label}</span>`;

    if (item.badge) {
      el.innerHTML += `<span class="nav-badge">${item.badge}</span>`;
    }

    el.addEventListener('click', () => navigateTo(item.id));
    nav.appendChild(el);
  });
}

/* ============================================================
   VIEW NAVIGATION
   ============================================================ */

/**
 * Activa una vista específica y actualiza el header y la navegación.
 *
 * @param {string} viewId - ID de la vista (sin el prefijo 'view-')
 */
function navigateTo(viewId) {
  // Desactivar todas las vistas y nav items
  document.querySelectorAll('.view').forEach(v     => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Activar la vista y nav item seleccionados
  const viewEl = document.getElementById(`view-${viewId}`);
  const navEl  = document.getElementById(`nav-${viewId}`);

  if (viewEl) viewEl.classList.add('active');
  if (navEl)  navEl.classList.add('active');

  AppState.currentView = viewId;

  // Actualizar títulos del header
  const [title, subtitle] = PAGE_TITLES[viewId] || ['Vista', ''];
  document.getElementById('page-title').textContent    = title;
  document.getElementById('page-subtitle').textContent = subtitle;

  // Renderizar vistas dinámicas al activarlas
  if (viewId === 'dashboard') renderDashboard();
  if (viewId === 'tour')      renderTourStep();
}

/* ============================================================
   DASHBOARD — Contenido por rol
   ============================================================ */

/**
 * Renderiza el panel principal según el rol activo.
 * Cada rol tiene un layout diferente.
 */
function renderDashboard() {
  const cfg       = ROLE_CONFIG[AppState.currentRole];
  const container = document.getElementById('dashboard-content');

  const roleContent = {

    estudiante: `
      <div class="stat-grid">
        <div class="stat-card" style="--stat-color:var(--green)">
          <div class="stat-label">Accesos este mes</div>
          <div class="stat-value">47</div>
          <div class="stat-sub">↑ normal</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Horas en laboratorio</div>
          <div class="stat-value">38h</div>
          <div class="stat-sub">Lab. Cómputo A</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--accent)">
          <div class="stat-label">Credencial</div>
          <div class="stat-value" style="font-size:1.1rem">Activa</div>
          <div class="stat-sub">Válida hasta 31/12/2026</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">MI CREDENCIAL</div>
        <div style="display:flex;align-items:center;gap:20px">
          <div style="background:linear-gradient(135deg,var(--accent),var(--purple));border-radius:14px;padding:20px 28px;text-align:center">
            <div style="font-size:2rem;margin-bottom:6px">🎓</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:0.9rem;font-weight:700;color:#fff;letter-spacing:0.1em">E9A3-4F7B</div>
            <div style="font-size:0.65rem;color:rgba(255,255,255,0.7);margin-top:4px;text-transform:uppercase;letter-spacing:0.06em">NFC · QR activo</div>
          </div>
          <div>
            <div style="font-size:1rem;font-weight:700;margin-bottom:4px">${cfg.name}</div>
            <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:10px">Estudiante · Ingeniería en Sistemas · 8° semestre</div>
            <span class="badge badge-green">● Credencial activa</span>
            <div style="margin-top:14px;font-size:0.8rem;color:var(--text-secondary)">Instalaciones habilitadas: Lab. Cómputo A, B · Biblioteca · Sala de Estudio</div>
          </div>
        </div>
      </div>`,

    docente: `
      <div class="stat-grid">
        <div class="stat-card" style="--stat-color:var(--purple)">
          <div class="stat-label">Clases este mes</div>
          <div class="stat-value">18</div>
          <div class="stat-sub">Lab. Cómputo + Sala B</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Horas registradas</div>
          <div class="stat-value">54h</div>
          <div class="stat-sub">mes actual</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--accent)">
          <div class="stat-label">Credencial</div>
          <div class="stat-value" style="font-size:1.1rem">Activa</div>
          <div class="stat-sub">Acceso extendido</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">MIS INSTALACIONES ASIGNADAS</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${['Lab. Cómputo A', 'Lab. Cómputo B', 'Sala Conferencias B', 'Biblioteca Central', 'Auditorio (acc. especial)']
            .map(f => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:var(--radius-md);background:var(--bg-surface);border:1px solid var(--border)">
                <span style="font-size:0.875rem">🏢 ${f}</span>
                <span class="badge badge-green">Habilitada</span>
              </div>`)
            .join('')}
        </div>
      </div>`,

    visitante: `
      <div class="stat-grid">
        <div class="stat-card" style="--stat-color:var(--green)">
          <div class="stat-label">Credencial Temporal</div>
          <div class="stat-value" style="font-size:1rem">TMP-7821</div>
          <div class="stat-sub">Válida hoy</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Instalación asignada</div>
          <div class="stat-value" style="font-size:1rem">Biblio.</div>
          <div class="stat-sub">Biblioteca Central</div>
        </div>
        <div class="stat-card" style="--stat-color:var(--yellow)">
          <div class="stat-label">Vencimiento</div>
          <div class="stat-value" style="font-size:1rem">Hoy</div>
          <div class="stat-sub">18:00 hrs</div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">CREDENCIAL TEMPORAL ACTIVA</div>
        <div style="text-align:center;padding:20px">
          <div style="font-size:4rem;margin-bottom:12px">📱</div>
          <div class="cred-code">TMP-782145</div>
          <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:16px">Presentar código QR o decir el número al guardia</div>
          <span class="badge badge-green">● Activa — vence hoy 18:00</span>
          <div style="margin-top:16px;font-size:0.8rem;color:var(--text-muted)">Instalación: Biblioteca Central · Horario: 08:00–18:00</div>
        </div>
      </div>`,
  };

  container.innerHTML = roleContent[AppState.currentRole]
    || `<div class="card"><p style="color:var(--text-secondary)">Vista de dashboard no disponible para este rol.</p></div>`;
}
