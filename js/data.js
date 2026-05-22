/**
 * data.js — Datos ficticios precargados del sistema
 *
 * Contiene: historial de accesos, nombres aleatorios para simulación,
 * personal disponible para asignación de incidencias.
 * No hay lógica aquí, solo constantes de datos.
 */

/** Historial de accesos (tabla en la vista de Historial) */
const HISTORY_DATA = [
  { user: 'García Martínez, Luis',   role: 'Estudiante', facility: 'Lab. Cómputo A',       entrada: '08:12', salida: '10:34', dur: '2h 22m', result: 'Permitido', reason: '—' },
  { user: 'Ríos Castellanos, Marta', role: 'Docente',    facility: 'Sala Conferencias B',   entrada: '09:00', salida: '11:00', dur: '2h 00m', result: 'Permitido', reason: '—' },
  { user: 'Mora Sandoval, Karla',    role: 'Estudiante', facility: 'Biblioteca Central',    entrada: '09:45', salida: '—',     dur: 'activo',  result: 'Permitido', reason: '—' },
  { user: 'Visitante TMP-7821',      role: 'Visitante',  facility: 'Biblioteca Central',    entrada: '11:30', salida: '—',     dur: '?',       result: 'Permitido', reason: '—' },
  { user: 'Desconocido',             role: '—',          facility: 'Sala B',                entrada: '11:42', salida: '—',     dur: '—',       result: 'Denegado',  reason: '3° intento fallido' },
  { user: 'Pérez Ramírez, Carlos',   role: 'Estudiante', facility: 'Lab. Química',          entrada: '09:15', salida: '—',     dur: '?',       result: 'Permitido', reason: 'Sesión huérfana' },
  { user: 'Soto Jiménez, Andrea',    role: 'Estudiante', facility: 'Lab. Cómputo A',        entrada: '10:02', salida: '—',     dur: '?',       result: 'Permitido', reason: 'Sesión huérfana' },
  { user: 'Vargas León, Tomás',      role: 'Docente',    facility: 'Auditorio',             entrada: '08:00', salida: '09:00', dur: '1h 00m', result: 'Permitido', reason: '—' },
  { user: 'Herrera Muñoz, Diana',    role: 'Estudiante', facility: 'Lab. Cómputo A',        entrada: '07:55', salida: '—',     dur: '—',       result: 'Denegado',  reason: 'Fuera de horario' },
  { user: 'Blanco Fuentes, Raúl',    role: 'Estudiante', facility: 'Lab. Química',          entrada: '10:30', salida: '—',     dur: '—',       result: 'Denegado',  reason: 'Credencial expirada' },
  { user: 'Montoya Arias, Felipe',   role: 'Docente',    facility: 'Biblioteca Central',    entrada: '13:00', salida: '15:30', dur: '2h 30m', result: 'Permitido', reason: '—' },
  { user: 'Gutiérrez Reyes, Sara',   role: 'Estudiante', facility: 'Sala Conferencias B',   entrada: '14:00', salida: '14:00', dur: '—',       result: 'Denegado',  reason: 'Capacidad máxima' },
];

/**
 * Nombres de acceso aleatorio para el botón "Simular entrada"
 * del panel del guardia.
 */
const RANDOM_NAMES = [
  { name: 'López Reyes, M.',     role: 'Estudiante', facility: 'Lab. Cómputo A',  initials: 'LM' },
  { name: 'Castillo Díaz, P.',   role: 'Estudiante', facility: 'Biblioteca',       initials: 'CP' },
  { name: 'Fernández, J.',       role: 'Docente',    facility: 'Sala Conferencias',initials: 'FJ' },
  { name: 'Torres Ruiz, E.',     role: 'Estudiante', facility: 'Lab. Química',     initials: 'TE' },
  { name: 'Visitante TMP-9934',  role: 'Visitante',  facility: 'Auditorio',        initials: 'V9' },
];

/** Personal disponible para asignación de incidencias */
const STAFF_LIST = [
  'López Vargas, Ana',
  'Sánchez Torres, J.',
  'Soporte Técnico',
  'Dirección Académica',
  'Coordinador TI',
];
