# producto-m-nimo-navegable-empresariales

Proyecto MVP (Producto Mínimo Navegable) — Sistema de Control de Accesos e Incidencias para entornos universitarios.

Qué incluye (frontend): selección de rol, simulador de lector NFC/QR, panel del guardia, panel admin, historial y recorrido guiado.

Estructura relevante
- `backend/` — Código y scripts del backend (Flask, SQLite). Ver `backend/README.md` para instrucciones.
- `js/`, `css/`, `index.html` — Frontend estático (SPA) y assets.
- `docs/` — Documentación del estado y corte para comenzar el backend.

Punto de corte
La base del backend fue añadida en `backend/` (servidor Flask mínimo, esquema SQL y script de inicialización). Para levantar el backend sigue las instrucciones en `backend/README.md`.

Si quieres, puedo ahora:
- Conectar la UI al backend (`js/api.js` ya añadido) y habilitar login/registro.
- Añadir autenticación con JWT y proteger endpoints.
- Reorganizar también la carpeta `frontend/` moviendo `index.html`, `js/` y `css/` dentro de ella.

