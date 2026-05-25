/**
 * Contiene todas las variables de estado compartidas entre módulos.
 * Se usa como objeto centralizado para evitar variables globales sueltas.
 */

const AppState = {
  /** Rol activo del usuario: 'estudiante' | 'docente' | 'visitante' | 'guardia' | 'admin' */
  currentRole: null,

  /** ID de la vista actualmente visible */
  currentView: null,

  /** Filtro activo en la vista de historial: 'all' | 'Permitido' | 'Denegado' */
  currentFilter: 'all',

  /** Paso actual en el recorrido guiado (0-based) */
  tourStep: 0,

  /** Indica si el lector de acceso está procesando (bloquea nuevos escenarios) */
  readerBusy: false,

  /** Contador auxiliar para accesos simulados */
  accessCounter: 0,

  /**
   * Lista de accesos activos en el panel del guardia.
   * Cada objeto: { id, name, role, facility, time, initials }
   */
  activeAccesses: [
    { id: 1, name: 'García Martínez, L.', role: 'Estudiante', facility: 'Lab. Cómputo A',  time: '08:12', initials: 'GL' },
    { id: 2, name: 'Mora Sandoval, K.',   role: 'Estudiante', facility: 'Biblioteca',       time: '09:45', initials: 'MK' },
    { id: 3, name: 'Vargas León, T.',     role: 'Docente',    facility: 'Auditorio',         time: '10:00', initials: 'VT' },
    { id: 4, name: 'Visitante TMP-7821',  role: 'Visitante',  facility: 'Biblioteca',       time: '11:30', initials: 'VT' },
    { id: 5, name: 'Pérez Ramírez, C.',   role: 'Estudiante', facility: 'Lab. Química',     time: '09:15', initials: 'PC' },
  ],

  /**
   * Lista de incidencias del sistema (administrador).
   * Cada objeto: { id, title, type, priority, status, time, assignee }
   */
  incidents: [
    { id: 1, title: 'Tercer intento fallido — Sala B',                type: 'Seguridad',  priority: 'critical', status: 'Abierta',     time: 'Hace 4 min',  assignee: null },
    { id: 2, title: 'Sesión huérfana no resuelta — Lab Química',      type: 'Sistema',    priority: 'high',     status: 'Abierta',     time: 'Hace 25 min', assignee: null },
    { id: 3, title: 'Credencial temporal expirada — acceso intentado',type: 'Credencial', priority: 'medium',   status: 'En revisión', time: 'Hace 1h',     assignee: 'López Vargas, Ana' },
    { id: 4, title: 'Fallo lector NFC — Biblioteca piso 2',           type: 'Hardware',   priority: 'high',     status: 'Escalada',    time: 'Hace 2h',     assignee: 'Soporte Técnico' },
    { id: 5, title: 'Capacidad superada momentáneamente — Lab A',     type: 'Operativo',  priority: 'low',      status: 'En revisión', time: 'Hace 3h',     assignee: 'Sánchez Torres, J.' },
  ],

  /** Índice rotativo para nombres de acceso aleatorio */
  nameIdx: 0,
};
