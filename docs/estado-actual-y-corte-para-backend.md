# Estado actual y corte para backend

Fecha de corte: 2026-06-06

## Resumen

El proyecto actual es una aplicación web tipo SPA para demostrar un sistema de control de accesos e incidencias en un entorno universitario. Hoy todo vive en el frontend: la navegación, los roles, las simulaciones de acceso, el historial, las incidencias y la emisión de credenciales temporales.

No existe todavía integración con backend real, autenticación persistente, base de datos ni llamadas HTTP.

## Qué hace hoy la aplicación

- Permite seleccionar un rol de demostración: estudiante, docente, visitante, guardia o administrador.
- Muestra vistas específicas por rol.
- Simula un punto de acceso con escenarios de acceso autorizado y denegado.
- Muestra un panel operativo del guardia con accesos activos.
- Muestra un panel de administrador con incidencias abiertas y emisión de credenciales temporales.
- Presenta un historial de accesos precargado.
- Incluye un recorrido guiado del flujo completo de acceso autorizado.

## Estructura actual

### HTML y estilos

- [index.html](../index.html) contiene toda la estructura visual principal.
- [css/tokens.css](../css/tokens.css), [css/base.css](../css/base.css), [css/animations.css](../css/animations.css), [css/components.css](../css/components.css), [css/layout.css](../css/layout.css) y [css/views.css](../css/views.css) contienen la presentación.

### Lógica de frontend

- [js/main.js](../js/main.js) inicializa utilidades y listeners globales.
- [js/auth.js](../js/auth.js) maneja el login/logout simulado por rol.
- [js/navigation.js](../js/navigation.js) construye la navegación por rol.
- [js/guard.js](../js/guard.js) gestiona accesos activos del panel del guardia.
- [js/admin.js](../js/admin.js) gestiona incidencias y credenciales temporales.
- [js/history.js](../js/history.js) renderiza y filtra el historial.
- [js/reader.js](../js/reader.js) simula el lector de acceso.
- [js/tour.js](../js/tour.js) controla el recorrido guiado.
- [js/modal.js](../js/modal.js) centraliza modales.
- [js/utils.js](../js/utils.js) agrupa utilidades comunes.

### Datos y configuración

- [js/state.js](../js/state.js) centraliza el estado global en memoria.
- [js/data.js](../js/data.js) contiene datos ficticios precargados.
- [js/config.js](../js/config.js) define roles, navegación, textos y escenarios.

## Estado técnico real hoy

- El estado vive en memoria del navegador.
- Los datos son ficticios o simulados.
- No hay persistencia entre recargas.
- No hay endpoints, servicios ni capa de API.
- No hay autenticación real.
- No hay base de datos.

## Punto de separación para empezar backend

La frontera más limpia para el backend es sacar del frontend todo lo que hoy se asume como dato local o simulación y reemplazarlo por servicios.

### Datos que deberían salir del frontend

- Historial de accesos.
- Accesos activos del guardia.
- Incidencias abiertas y su ciclo de vida.
- Emisión de credenciales temporales.
- Catálogo de roles, permisos y configuraciones operativas.
- Escenarios de simulación si se quieren conservar como demo, pero alimentados desde backend.

### Contrato sugerido de backend

- `GET /api/access-history`
- `GET /api/active-accesses`
- `GET /api/incidents`
- `POST /api/incidents/:id/assign`
- `POST /api/incidents/:id/close`
- `POST /api/incidents/:id/escalate`
- `POST /api/credentials/temporary`
- `POST /api/access-events`

### Cambio recomendado en frontend

Crear una capa de acceso a datos, por ejemplo `js/api.js`, para que los módulos de UI no hablen directo con estado local cuando empiece la integración real.

La idea sería:

`UI -> api.js -> backend -> render`

## Qué quedó establecido como base

- El proyecto ya tiene navegación por rol.
- El proyecto ya tiene estados visuales y flujos representativos.
- El proyecto ya separa configuración, datos, estado y vistas.
- El proyecto ya está listo para que el backend sustituya la simulación sin rehacer toda la UI.

## Próximo trabajo lógico

1. Definir el modelo de datos real del backend.
2. Crear la capa `api.js` en frontend.
3. Reemplazar el estado simulado por respuestas del backend.
4. Conectar autenticación real y persistencia.
5. Mantener la vista actual como frontend de demostración o adaptarla al backend definitivo.