/**
 * Gestiona la animación del lector y la ejecución de escenarios
 * predefinidos con feedback visual y sonoro (simulado).
 */

/** Mapas de color, icono y texto de estado por tipo de resultado */
const READER_COLOR_MAP  = { success: 'var(--green)', error: 'var(--red)', alert: 'var(--yellow)' };
const READER_ICON_MAP   = { success: '✅',           error: '🔴',          alert: '⚠️' };
const READER_STATUS_MAP = { success: 'AUTORIZADO',   error: 'DENEGADO',    alert: 'ALERTA' };

const TOAST_TYPE_MAP = { success: 'success', error: 'error', alert: 'warning' };
const TOAST_MSG_MAP  = {
  success: 'Acceso autorizado — sesión registrada',
  error:   'Acceso denegado — evento registrado',
  alert:   '¡Alerta de seguridad activada!',
};

/** Número de botones de escenario en el HTML */
const SCENARIO_COUNT = 5;

/* ============================================================
   HELPERS
   ============================================================ */

/** Habilita o deshabilita todos los botones de escenario */
function setScenarioBtnsDisabled(disabled) {
  for (let i = 0; i < SCENARIO_COUNT; i++) {
    const btn = document.getElementById(`sc-btn-${i}`);
    if (btn) btn.disabled = disabled;
  }
}

/** Referencias a elementos del lector (lazy, se resuelven al llamar) */
function getReaderEls() {
  return {
    device:     document.getElementById('reader-device'),
    icon:       document.getElementById('reader-icon'),
    statusText: document.getElementById('reader-status-text'),
    spinner:    document.getElementById('reader-spinner'),
    scanLine:   document.getElementById('scan-line'),
    result:     document.getElementById('reader-result'),
  };
}

/* ============================================================
   MAIN FUNCTIONS
   ============================================================ */

/**
 * Ejecuta un escenario del simulador de acceso.
 * @param {number} idx - Índice del escenario en buildScenarios()
 */
function runScenario(idx) {
  if (AppState.readerBusy) return;
  AppState.readerBusy = true;

  setScenarioBtnsDisabled(true);

  const scenario = buildScenarios()[idx];
  const els      = getReaderEls();

  // Estado: LEYENDO
  els.result.classList.add('hidden');
  els.result.innerHTML    = '';
  els.device.className    = 'reader-device loading';
  els.icon.textContent    = '📶';
  els.statusText.textContent = 'LEYENDO...';
  els.spinner.classList.remove('hidden');
  els.scanLine.classList.remove('hidden');

  // Resultado después del delay simulado
  setTimeout(() => {
    els.spinner.classList.add('hidden');
    els.scanLine.classList.add('hidden');

    const { type } = scenario;
    els.device.className         = `reader-device ${type}`;
    els.icon.textContent         = READER_ICON_MAP[type];
    els.icon.style.filter        = 'none';
    els.statusText.textContent   = READER_STATUS_MAP[type];
    els.statusText.style.color   = READER_COLOR_MAP[type];

    // Mostrar resultado
    els.result.className = `reader-result ${scenario.result.type}`;
    els.result.innerHTML = `
      <div class="result-title" style="color:${READER_COLOR_MAP[type]}">${scenario.result.title}</div>
      <div class="result-detail" style="margin-top:8px">${scenario.result.detail}</div>
    `;
    els.result.classList.remove('hidden');

    AppState.readerBusy = false;
    setScenarioBtnsDisabled(false);

    showToast(TOAST_MSG_MAP[type], TOAST_TYPE_MAP[type]);
  }, scenario.delay);
}

/**
 * Restablece el lector al estado inicial (idle).
 * También se llama al cerrar sesión.
 */
function resetReader() {
  AppState.readerBusy = false;

  const els = getReaderEls();
  if (!els.device) return;

  els.device.className         = 'reader-device idle';
  els.icon.textContent         = '📡';
  els.icon.style.filter        = '';
  els.statusText.textContent   = 'EN ESPERA';
  els.statusText.style.color   = '';
  els.spinner.classList.add('hidden');
  els.scanLine.classList.add('hidden');
  els.result.classList.add('hidden');
  els.result.innerHTML         = '';

  setScenarioBtnsDisabled(false);
}
