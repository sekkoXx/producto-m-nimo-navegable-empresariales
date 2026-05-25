/**
 * Contiene: formateo de fechas/horas, generación de códigos,
 * hash de nombre para colores de avatar, reloj en vivo, toasts.
 */

/* ============================================================
   DATE & TIME
   ============================================================ */

/** Devuelve la hora actual en formato HH:MM */
function getTime() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Devuelve una fecha pasada en formato local.
 * @param {number} days - Días hacia atrás desde hoy.
 */
function getPastDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toLocaleDateString('es-MX');
}

/* ============================================================
   CODE GENERATION
   ============================================================ */

/** Genera un código de credencial temporal aleatorio (ej. TMP-482931) */
function genCredCode() {
  return 'TMP-' + Math.floor(Math.random() * 900000 + 100000);
}

/* ============================================================
   AVATAR COLOR
   ============================================================ */

/**
 * Devuelve un hue HSL (0-359) estable basado en el nombre del usuario,
 * para asignar colores únicos a avatares de forma determinista.
 * @param {string} name
 * @returns {number} Hue HSL
 */
function hashName(name) {
  let h = 0;
  for (const c of name) {
    h = (h * 31 + c.charCodeAt(0)) % 360;
  }
  return h;
}

/* ============================================================
   LIVE CLOCK
   ============================================================ */

/** Actualiza el elemento #live-clock con la hora actual cada segundo */
function startLiveClock() {
  function update() {
    const el = document.getElementById('live-clock');
    if (el) el.textContent = new Date().toLocaleTimeString('es-MX');
  }
  update();
  setInterval(update, 1000);
}

/* ============================================================
   TOAST NOTIFICATIONS
   ============================================================ */

/**
 * Muestra una notificación toast efímera en la esquina inferior derecha.
 * @param {string} msg  - Mensaje a mostrar.
 * @param {'info'|'success'|'error'|'warning'} type - Tipo visual.
 */
function showToast(msg, type = 'info') {
  const icons = {
    success: '✅',
    error:   '❌',
    info:    'ℹ️',
    warning: '⚠️',
  };

  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-msg">${msg}</span>
  `;
  container.appendChild(toast);

  // Auto-dismiss after 3.5s with fade-out animation
  setTimeout(() => {
    toast.style.opacity    = '0';
    toast.style.transform  = 'translateX(20px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
