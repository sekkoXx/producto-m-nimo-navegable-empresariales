/**
 * auth.js — Autenticación simulada: login y logout
 *
 * No hay validación real. El usuario selecciona su rol
 * y el sistema configura la UI correspondiente.
 */

/**
 * Inicia sesión con el rol seleccionado.
 * Configura la sidebar, navega a la vista por defecto
 * e inicializa todas las vistas necesarias.
 *
 * @param {string} role - Uno de: 'estudiante' | 'docente' | 'visitante' | 'guardia' | 'admin'
 */
function login(role) {
  AppState.currentRole = role;
  const cfg = ROLE_CONFIG[role];

  // Cambiar de pantalla: ocultar login, mostrar app
  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');

  // Actualizar información del usuario en el sidebar
  document.getElementById('user-name-display').textContent = cfg.name;
  document.getElementById('user-avatar').textContent       = cfg.initials;

  // Aplicar badge de rol con el color del rol
  const badge = document.getElementById('sidebar-role-badge');
  badge.textContent        = cfg.label;
  badge.style.background   = cfg.color + '20';
  badge.style.color        = cfg.color;
  badge.style.border       = `1px solid ${cfg.color}40`;

  // Construir navegación específica del rol
  buildNav(cfg.nav);

  // Navegar a la primera vista del rol
  navigateTo(cfg.nav[0].id);

  // Inicializar datos en las vistas
  renderActiveAccesses();
  renderIncidents();
  renderHistory('all');
  initTour();

  showToast(`Bienvenido, ${cfg.name.split(',')[0]}`, 'success');
}

/**
 * Cierra la sesión actual y regresa a la pantalla de login.
 * Limpia el estado relevante.
 */
function logout() {
  document.getElementById('screen-app').classList.remove('active');
  document.getElementById('screen-login').classList.add('active');

  AppState.currentRole = null;
  AppState.tourStep    = 0;

  resetReader();
  showToast('Sesión cerrada', 'info');
}
