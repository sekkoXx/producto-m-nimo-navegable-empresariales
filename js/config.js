/**
 * config.js — Configuraciones del sistema
 *
 * Contiene: roleConfig (por rol), tourSteps (pasos del recorrido),
 * scenarios (escenarios del simulador de acceso).
 * Separado de data.js porque define comportamiento y estructura,
 * no solo valores.
 */

/* ============================================================
   ROLE CONFIGURATION
   Define la UI y navegación de cada rol de usuario
   ============================================================ */
const ROLE_CONFIG = {
  estudiante: {
    label:    'Estudiante',
    color:    '#3b7cff',
    name:     'García Martínez, Luis',
    initials: 'GL',
    nav: [
      { id: 'dashboard',    icon: '🏠',  label: 'Mi Panel',             section: null },
      { id: 'access-point', icon: '📡',  label: 'Punto de Acceso',      section: 'SISTEMA' },
      { id: 'history',      icon: '📋',  label: 'Mis Accesos',          section: null },
      { id: 'tour',         icon: '🗺️', label: 'Recorrido del Sistema', section: 'DEMO' },
    ],
  },

  docente: {
    label:    'Docente',
    color:    '#a855f7',
    name:     'Ríos Castellanos, Marta',
    initials: 'RM',
    nav: [
      { id: 'dashboard',    icon: '🏠',  label: 'Mi Panel',             section: null },
      { id: 'access-point', icon: '📡',  label: 'Punto de Acceso',      section: 'SISTEMA' },
      { id: 'history',      icon: '📋',  label: 'Historial de Accesos', section: null },
      { id: 'tour',         icon: '🗺️', label: 'Recorrido del Sistema', section: 'DEMO' },
    ],
  },

  visitante: {
    label:    'Visitante',
    color:    '#22c55e',
    name:     'Dr. Andrade López',
    initials: 'AL',
    nav: [
      { id: 'dashboard',    icon: '🏠',  label: 'Mi Panel',             section: null },
      { id: 'access-point', icon: '📡',  label: 'Punto de Acceso',      section: 'SISTEMA' },
      { id: 'tour',         icon: '🗺️', label: 'Recorrido del Sistema', section: 'DEMO' },
    ],
  },

  guardia: {
    label:    'Guardia',
    color:    '#f59e0b',
    name:     'Sánchez Torres, Jorge',
    initials: 'SJ',
    nav: [
      { id: 'guard',        icon: '🛡️', label: 'Panel Operativo',       section: null },
      { id: 'access-point', icon: '📡',  label: 'Simulador de Acceso',  section: 'HERRAMIENTAS' },
      { id: 'history',      icon: '📋',  label: 'Historial de Accesos', section: null },
      { id: 'tour',         icon: '🗺️', label: 'Recorrido del Sistema', section: 'DEMO' },
    ],
  },

  admin: {
    label:    'Administrador',
    color:    '#ef4444',
    name:     'López Vargas, Ana',
    initials: 'LA',
    nav: [
      { id: 'admin',        icon: '⚙️',  label: 'Panel Admin',          section: null },
      { id: 'guard',        icon: '🛡️', label: 'Panel del Guardia',    section: 'MONITOREO' },
      { id: 'access-point', icon: '📡',  label: 'Simulador de Acceso',  section: null },
      { id: 'history',      icon: '📋',  label: 'Historial de Accesos', section: null },
      { id: 'tour',         icon: '🗺️', label: 'Recorrido del Sistema', section: 'DEMO' },
    ],
  },
};

/* ============================================================
   PAGE TITLES
   Títulos del header para cada vista
   ============================================================ */
const PAGE_TITLES = {
  'dashboard':    ['Panel Principal',         'Resumen de tu actividad reciente'],
  'access-point': ['Simulador de Acceso',     'Punto de acceso — Lab. Cómputo A'],
  'guard':        ['Panel del Guardia',        'Control operativo de accesos activos'],
  'admin':        ['Panel del Administrador',  'Gestión de incidencias y credenciales'],
  'history':      ['Historial de Accesos',    'Registro completo de eventos de acceso'],
  'tour':         ['Recorrido del Sistema',   'Caso A — Flujo completo de acceso autorizado'],
};

/* ============================================================
   INCIDENT UI MAPS
   Mapas de label y clase CSS para prioridades y estados
   ============================================================ */
const PRIORITY_LABELS = { critical: 'Crítica', high: 'Alta', medium: 'Media', low: 'Baja' };
const PRIORITY_BADGE  = { critical: 'badge-red', high: 'badge-orange', medium: 'badge-yellow', low: 'badge-gray' };
const STATUS_BADGE    = {
  'Abierta':     'badge-red',
  'En revisión': 'badge-yellow',
  'Escalada':    'badge-orange',
  'Cerrada':     'badge-green',
};

/* ============================================================
   TOUR STEPS — Caso A: Flujo completo de acceso autorizado
   Cada paso: { id, title, actor, desc, entities[], state }
   ============================================================ */
const TOUR_STEPS = [
  {
    id: 'P0',
    title: 'Inicio: Estudiante se aproxima al acceso',
    actor: '🎓 Estudiante',
    desc: 'Luis García se acerca al lector NFC ubicado en la entrada del Laboratorio de Cómputo A. Porta su credencial universitaria activa. El lector está en estado <strong>LIBRE</strong>, esperando una presentación.',
    entities: [
      { icon: '🎓', label: 'Actor',           value: 'Estudiante García — carnet universitario NFC activo' },
      { icon: '📍', label: 'Punto de acceso', value: 'Lab. Cómputo A — Edificio Tecnología — Lector #3' },
    ],
    state: { type: 'processing', label: '🟡 ESTADO: Lector en espera (LIBRE)' },
  },
  {
    id: 'P1',
    title: 'Presentación de credencial al lector',
    actor: '🎓 Estudiante + 📡 SCA',
    desc: 'El estudiante acerca su credencial NFC al lector. El SCA detecta la señal y cambia el estado del lector a <strong>PROCESANDO</strong>. Se inicia la lectura del UID de la credencial.',
    entities: [
      { icon: '📡', label: 'Sistema',              value: 'SCA detecta credencial — UID: E9A3-4F7B' },
      { icon: '🔄', label: 'Transición de estado', value: 'LIBRE → PROCESANDO' },
    ],
    state: { type: 'processing', label: '🔵 ESTADO: Lector PROCESANDO lectura NFC' },
  },
  {
    id: 'P2',
    title: 'Consulta de vigencia y permisos',
    actor: '📡 SCA',
    desc: 'El SCA consulta la base de datos interna con el UID leído. Verifica: <strong>(1)</strong> Si la credencial está activa y no expirada. <strong>(2)</strong> Si el estudiante tiene permiso para acceder a este laboratorio. <strong>(3)</strong> Si el horario actual está dentro de la ventana permitida.',
    entities: [
      { icon: '🗄️', label: 'Consulta BD', value: 'Credencial E9A3-4F7B — estado: ACTIVA — válida hasta 31/12/2026' },
      { icon: '🗓️', label: 'Horario',     value: 'Hora actual: 08:12 — Ventana permitida: 07:00–22:00 ✓' },
      { icon: '🔐', label: 'Permisos',    value: 'García tiene acceso a Lab. Cómputo A — grupo: T401 ✓' },
    ],
    state: { type: 'processing', label: '🔵 ESTADO: SCA verificando permisos...' },
  },
  {
    id: 'P3',
    title: 'Consulta de capacidad',
    actor: '📡 SCA',
    desc: 'El SCA también consulta el aforo actual del laboratorio. Si la capacidad máxima está alcanzada, el acceso se deniega aunque la credencial sea válida. En este caso, el laboratorio tiene 18 personas de un máximo de 30.',
    entities: [
      { icon: '🏢', label: 'Aforo Lab. A',    value: '18 / 30 — Capacidad disponible ✓' },
      { icon: '✅', label: 'Resultado parcial',value: 'Todos los checks superados — decisión: AUTORIZAR' },
    ],
    state: { type: 'success', label: '🟢 ESTADO: Verificación completa — acceso a autorizar' },
  },
  {
    id: 'P4',
    title: 'Apertura del mecanismo de acceso',
    actor: '📡 SCA + 🔒 Hardware',
    desc: 'El SCA envía la señal de apertura al actuador físico (cerradura electromagnética). La puerta se desbloquea durante <strong>5 segundos</strong>. El lector muestra luz verde y emite un tono de confirmación.',
    entities: [
      { icon: '🔓', label: 'Actuador',       value: 'Cerradura #3 — señal de apertura enviada — 5s habilitado' },
      { icon: '🟢', label: 'Feedback visual', value: 'LED verde activado · tono corto de confirmación' },
    ],
    state: { type: 'success', label: '🟢 ESTADO: Puerta ABIERTA · acceso habilitado por 5s' },
  },
  {
    id: 'P5',
    title: 'Registro de evento de acceso',
    actor: '📡 SCA + 📊 SMon',
    desc: 'El SCA registra el evento en el log del sistema: usuario, instalación, timestamp de entrada, resultado. El SMon recibe el evento y actualiza el recuento de aforo en tiempo real. La sesión queda como <strong>ACTIVA</strong>.',
    entities: [
      { icon: '📝', label: 'Log registrado', value: 'García | Lab. A | 08:12:05 | PERMITIDO | ID-Sesión: S-9941' },
      { icon: '📊', label: 'SMon actualiza', value: 'Aforo Lab. A: 18 → 19 · sesión S-9941 iniciada' },
    ],
    state: { type: 'success', label: '🟢 ESTADO: Sesión S-9941 ACTIVA — usuario dentro' },
  },
  {
    id: 'P6a',
    title: 'El estudiante está dentro',
    actor: '🎓 Estudiante',
    desc: 'Luis García se encuentra dentro del laboratorio trabajando. La sesión permanece activa. El SMon monitorea continuamente que el tiempo de permanencia no supere el límite configurado (4 horas para estudiantes).',
    entities: [
      { icon: '⏱️', label: 'Sesión activa',   value: 'S-9941 · duración: activa desde 08:12 · límite: 4h' },
      { icon: '📡', label: 'SMon monitorea',  value: 'Ping de sesión cada 30s — sin anomalías detectadas' },
    ],
    state: { type: 'success', label: '🟢 ESTADO: Sesión activa · monitoreo continuo' },
  },
  {
    id: 'P7',
    title: 'El estudiante presenta credencial para salir',
    actor: '🎓 Estudiante + 📡 SCA',
    desc: 'Al terminar, Luis García presenta nuevamente su credencial en el lector de salida (o presiona el botón interno de salida). El SCA detecta la intención de salida y procesa el cierre de sesión.',
    entities: [
      { icon: '🚪', label: 'Lector de salida', value: 'García presenta credencial E9A3-4F7B — modo: SALIDA' },
      { icon: '🔄', label: 'SCA',              value: 'Sesión S-9941 detectada — iniciando cierre...' },
    ],
    state: { type: 'processing', label: '🔵 ESTADO: Procesando salida...' },
  },
  {
    id: 'P8',
    title: 'Registro de salida',
    actor: '📡 SCA + 📊 SMon',
    desc: 'El SCA registra el timestamp de salida y calcula la duración de la sesión. El SMon actualiza el aforo (19 → 18). La sesión S-9941 queda marcada como <strong>CERRADA</strong> exitosamente.',
    entities: [
      { icon: '📝', label: 'Log de salida', value: 'García | Lab. A | 08:12 – 10:34 | Duración: 2h 22m' },
      { icon: '📊', label: 'SMon actualiza',value: 'Aforo Lab. A: 19 → 18 · sesión S-9941 CERRADA' },
    ],
    state: { type: 'success', label: '🟢 ESTADO: Sesión S-9941 CERRADA exitosamente' },
  },
  {
    id: 'P9',
    title: 'Ciclo completo completado',
    actor: '📡 SCA + 📊 SMon + 🛡️ Guardia',
    desc: 'El ciclo de acceso ha concluido correctamente. El historial de accesos refleja la sesión completa. El guardia puede ver en su panel que el aforo decreció. No se generaron incidencias. El sistema está listo para el siguiente acceso.',
    entities: [
      { icon: '✅', label: 'Historial',            value: 'García | Permitido | 2h 22m | Sin incidencias' },
      { icon: '🛡️',label: 'Panel del guardia',    value: 'Aforo Lab. A: 18/30 — sin alertas pendientes' },
      { icon: '🔄', label: 'Estado del sistema',   value: 'Lector #3 — LIBRE — listo para nueva presentación' },
    ],
    state: { type: 'success', label: '🏁 ESTADO: Ciclo A completado · sin incidencias' },
  },
];

/* ============================================================
   SCENARIOS — Escenarios del simulador de acceso
   Cada escenario: { type, delay, result: { type, title, detail } }
   Los detalles se generan como funciones para ser frescos al correr.
   ============================================================ */
function buildScenarios() {
  return [
    {
      type: 'success',
      delay: 1800,
      result: {
        type:   'success',
        title:  '✅ ACCESO AUTORIZADO',
        detail: `<strong>García Martínez, Luis</strong> · Estudiante<br/>
Credencial NFC válida · Lab. Cómputo A<br/>
Hora: ${getTime()} · Aforo: 19/30<br/>
Sesión registrada: S-${Math.floor(Math.random() * 9000 + 1000)}`,
      },
    },
    {
      type: 'error',
      delay: 1500,
      result: {
        type:   'error',
        title:  '❌ ACCESO DENEGADO',
        detail: `<strong>Mora Sandoval, Karla</strong> · Estudiante<br/>
Motivo: Credencial expirada hace 3 días<br/>
Credencial ID: E8B2-9C11 · Expiró: ${getPastDate(3)}<br/>
Acción: Renovar credencial en Oficina de Registro`,
      },
    },
    {
      type: 'error',
      delay: 1400,
      result: {
        type:   'error',
        title:  '❌ ACCESO DENEGADO — FUERA DE HORARIO',
        detail: `<strong>Ríos Castellanos, Marta</strong> · Docente<br/>
Hora de intento: 23:45 · Ventana permitida: 07:00–22:00<br/>
Instalación: Lab. Cómputo A · Credencial válida<br/>
El acceso fue bloqueado por restricción horaria`,
      },
    },
    {
      type: 'error',
      delay: 1600,
      result: {
        type:   'error',
        title:  '❌ ACCESO DENEGADO — CAPACIDAD MÁXIMA',
        detail: `<strong>López Torres, Diego</strong> · Estudiante<br/>
Lab. Cómputo A está al <strong>100% de capacidad</strong> (30/30)<br/>
Credencial válida — acceso diferido temporalmente<br/>
Estimado de espera: ~12 minutos`,
      },
    },
    {
      type: 'alert',
      delay: 2000,
      result: {
        type:   'alert',
        title:  '⚠️ ALERTA DE SEGURIDAD ACTIVADA',
        detail: `<strong>Visitante desconocido</strong> · Sin identificación<br/>
<strong>TERCER INTENTO FALLIDO</strong> registrado en Sala B<br/>
Protocolo de seguridad activado · Guardia notificado<br/>
Incidencia #${Math.floor(Math.random() * 900 + 100)} generada automáticamente`,
      },
    },
  ];
}
