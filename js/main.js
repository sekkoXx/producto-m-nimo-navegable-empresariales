/**
 *
 * Se encarga de:
 * - Inicializar utilidades globales (reloj)
 * - Registrar event listeners que no están en atributos HTML
 * - Cualquier setup inicial necesario antes de la interacción del usuario
 *
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     UTILIDADES GLOBALES
     ============================================================ */

  // Iniciar el reloj en vivo del header
  startLiveClock();

  /* ============================================================
     MODAL — cerrar al hacer click en el overlay
     ============================================================ */
  const restartModal = document.getElementById('restart-modal');
  if (restartModal) {
    restartModal.addEventListener('click', function (e) {
      if (e.target === this) closeRestartModal();
    });
  }

  /* ============================================================
     HISTORIAL — búsqueda en tiempo real
     ============================================================ */
  const historySearch = document.getElementById('history-search');
  if (historySearch) {
    historySearch.addEventListener('input', () => {
      renderHistory(AppState.currentFilter);
    });
  }

  /* ============================================================
     ADMIN — fecha de hoy como valor por defecto en la credencial
     ============================================================ */
  const credDate = document.getElementById('cred-date');
  if (credDate) {
    credDate.valueAsDate = new Date();
  }

});
