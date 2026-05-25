/*
 * Gestiona la navegación paso a paso por el flujo nominal
 * de acceso autorizado, mostrando actores, entidades y estados.
 */

/* ============================================================
   INITIALIZATION
   ============================================================ */

/**
 * Se llama al hacer login o navegar a la vista de tour.
 */
function initTour() {
  AppState.tourStep = 0;
  renderTourStep();
}

/* ============================================================
   PROGRESS BAR
   ============================================================ */

/**
 * Reconstruye la barra de progreso con puntos y líneas conectoras,
 * aplicando clases 'done', 'current' o '' según el paso actual.
 */
function buildTourStepsBar() {
  const bar = document.getElementById('tour-steps-bar');
  if (!bar) return;

  bar.innerHTML = '';

  TOUR_STEPS.forEach((step, i) => {
    // Dot
    const dot       = document.createElement('div');
    const state     = i < AppState.tourStep ? 'done' : i === AppState.tourStep ? 'current' : '';
    dot.className   = `tour-step-dot ${state}`;
    dot.id          = `tdot-${i}`;
    dot.textContent = step.id;
    dot.style.fontSize = '0.6rem';
    bar.appendChild(dot);

    // Line connector (not after last item)
    if (i < TOUR_STEPS.length - 1) {
      const line      = document.createElement('div');
      line.className  = `tour-step-line ${i < AppState.tourStep ? 'done' : ''}`;
      line.id         = `tline-${i}`;
      bar.appendChild(line);
    }
  });
}

/* ============================================================
   STEP RENDERING
   ============================================================ */

/**
 * Renderiza el contenido del paso actual del tour.
 * Muestra la pantalla de finalización si se superó el último paso.
 */
function renderTourStep() {
  buildTourStepsBar();

  const content      = document.getElementById('tour-step-content');
  const progressText = document.getElementById('tour-progress-text');
  const prevBtn      = document.getElementById('tour-prev');
  const nextBtn      = document.getElementById('tour-next');
  const nav          = document.getElementById('tour-nav');

  if (!content) return;

  // Pantalla de finalización
  if (AppState.tourStep >= TOUR_STEPS.length) {
    content.innerHTML = `
      <div class="card tour-complete">
        <div class="tour-complete-icon">🏁</div>
        <div class="tour-complete-title">¡Recorrido completado!</div>
        <div class="tour-complete-desc">
          Has recorrido el <strong>Caso A</strong> completo del sistema —
          desde que el estudiante se aproxima al lector hasta que su sesión
          queda cerrada correctamente. Este es el flujo nominal del sistema.
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="tourReset()">↺ Reiniciar recorrido</button>
          <button class="btn btn-ghost" onclick="navigateTo('access-point')">📡 Probar simulador</button>
        </div>
      </div>`;

    if (nav) nav.style.display = 'none';
    progressText.textContent  = 'Recorrido completado ✓';
    return;
  }

  // Restaurar nav si estaba oculto
  if (nav) nav.style.display = 'flex';

  const step = TOUR_STEPS[AppState.tourStep];

  progressText.textContent = `Paso ${AppState.tourStep + 1} de ${TOUR_STEPS.length}`;

  if (prevBtn) prevBtn.disabled   = AppState.tourStep === 0;
  if (nextBtn) nextBtn.textContent =
    AppState.tourStep === TOUR_STEPS.length - 1 ? '🏁 Finalizar' : 'Siguiente →';

  // La clase CSS del estado-box depende del tipo (success no tiene clase extra)
  const stateClass = step.state.type === 'success' ? '' : step.state.type;

  content.innerHTML = `
    <div class="card tour-card">
      <div class="tour-step-num">● PASO ${step.id} — ${AppState.tourStep + 1}/${TOUR_STEPS.length}</div>
      <div class="tour-step-title">${step.title}</div>
      <div class="tour-actor">${step.actor}</div>
      <div class="tour-description">${step.desc}</div>

      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${step.entities.map(e => `
          <div class="tour-entity-box">
            <div class="entity-icon">${e.icon}</div>
            <div>
              <div class="entity-label">${e.label}</div>
              <div class="entity-value">${e.value}</div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="tour-state-box ${stateClass}">
        <span style="font-size:1.2rem">📊</span>
        <span class="tour-state-label">${step.state.label}</span>
      </div>
    </div>`;
}

/* ============================================================
   NAVIGATION
   ============================================================ */

/** Avanza al siguiente paso del tour */
function tourNext() {
  AppState.tourStep++;
  renderTourStep();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Retrocede al paso anterior del tour */
function tourPrev() {
  if (AppState.tourStep > 0) {
    AppState.tourStep--;
    renderTourStep();
  }
}

/** Reinicia el tour al paso 0 */
function tourReset() {
  AppState.tourStep = 0;
  const nav = document.getElementById('tour-nav');
  if (nav) nav.style.display = 'flex';
  renderTourStep();
}
