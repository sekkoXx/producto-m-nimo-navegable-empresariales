/**
 * modal.js — Modal del Protocolo de Arranque (sesiones huérfanas)
 *
 * Gestiona la apertura, cierre y ejecución del protocolo
 * de arranque que resuelve sesiones huérfanas.
 */

/* ============================================================
   MODAL CONTROL
   ============================================================ */

/** Muestra el modal del protocolo de arranque */
function showRestartModal() {
  document.getElementById('restart-modal').classList.remove('hidden');
}

/** Oculta el modal sin ejecutar el protocolo */
function closeRestartModal() {
  document.getElementById('restart-modal').classList.add('hidden');
}

/* ============================================================
   PROTOCOL EXECUTION
   ============================================================ */

/**
 * Ejecuta el protocolo de arranque:
 * - Cierra el modal
 * - Muestra toast de confirmación
 * - Elimina la alerta de sesión huérfana del panel del guardia
 */
function executeRestart() {
  closeRestartModal();

  showToast(
    'Protocolo ejecutado · 3 sesiones huérfanas cerradas · Incidencias generadas',
    'warning'
  );

  // Animar y eliminar la segunda alerta (sesión huérfana) del panel del guardia
  setTimeout(() => {
    const alertsContainer = document.getElementById('active-alerts');
    if (!alertsContainer) return;

    const orphanAlert = alertsContainer.querySelector('.alert-item:nth-child(2)');
    if (orphanAlert) {
      orphanAlert.style.opacity    = '0';
      orphanAlert.style.transition = '0.4s';
      setTimeout(() => orphanAlert.remove(), 400);
    }
  }, 500);
}
