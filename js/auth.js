/**
 
 *
 * El usuario selecciona su rol
 * y el sistema configura la UI correspondiente.
 */

/**
 * Inicia sesión con el rol seleccionado.
 
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
  localStorage.removeItem('user');
  showToast('Sesión cerrada', 'info');
}

/**
 * Envía credenciales al backend y, si son válidas, inicia sesión en la UI
 */
function submitLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) {
    showToast('Completa correo y contraseña', 'error');
    return;
  }

  showToast('Iniciando sesión...', 'info');

  window.API.loginUser(email, password)
    .then(resp => {
      if (resp && resp.error) {
        showToast(resp.error, 'error');
        return;
      }
      const user = resp.user || resp;
      // Guardar sesión en localStorage
      try { localStorage.setItem('user', JSON.stringify(user)); } catch(e) {}

      // Mapear tipo_usuario a rol de frontend
      const tipo = (user.tipo_usuario || '').toLowerCase();
      const role = mapTipoToRole(tipo);

      login(role);

      // Sobrescribir nombre en la UI con el nombre real del usuario
      const displayName = user.nombre || user.name || ROLE_CONFIG[role].name;
      const avatar = getInitials(displayName);
      const badge = document.getElementById('sidebar-role-badge');
      document.getElementById('user-name-display').textContent = displayName;
      document.getElementById('user-avatar').textContent = avatar;

      showToast(`Bienvenido, ${displayName.split(',')[0]}`, 'success');
    })
    .catch(err => {
      console.error(err);
      showToast('Error de conexión con el servidor', 'error');
    });
}

function mapTipoToRole(tipoLower) {
  if (!tipoLower) return 'estudiante';
  if (tipoLower.indexOf('admin') !== -1 || tipoLower.indexOf('administrador') !== -1) return 'admin';
  if (tipoLower.indexOf('guard') !== -1 || tipoLower.indexOf('guardia') !== -1) return 'guardia';
  if (tipoLower.indexOf('docente') !== -1 || tipoLower.indexOf('profesor') !== -1) return 'docente';
  if (tipoLower.indexOf('visit') !== -1 || tipoLower.indexOf('visitante') !== -1) return 'visitante';
  return 'estudiante';
}

function getInitials(name) {
  if (!name) return '';
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0,2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
