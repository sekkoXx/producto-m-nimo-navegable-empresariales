# Guía rápida: cómo iniciar el proyecto (frontend + backend)

Este documento explica paso a paso cómo levantar el proyecto localmente para desarrollo. Incluye instrucciones para Windows y Linux/macOS.

Resumen
- Backend: carpeta `backend/` — servidor Flask + SQLite.
- Frontend: archivos estáticos en la raíz (`index.html`, `js/`, `css/`).

1) Requisitos
- Python 3.8+ instalado.
- (Opcional) VS Code con Live Server para servir el frontend rápidamente.

2) Preparar backend

- Abrir un terminal en `backend/` y crear un entorno virtual:

```bash
cd backend
python -m venv venv
```

- Activar el entorno:

Windows:
```powershell
venv\Scripts\activate
```

Linux / macOS:
```bash
source venv/bin/activate
```

- Instalar dependencias:

```bash
pip install -r requirements.txt
```

- Inicializar la base de datos (genera `backend/database.db`):

```bash
python init_db.py
```

- Ejecutar el servidor Flask (desarrollo):

```bash
python app.py
```

El backend escuchará en `http://127.0.0.1:5000/`.

3) Preparar frontend

- El frontend es estático. Puedes usar cualquiera de estas opciones:

- Opción A — Live Server (VS Code): abrir la carpeta del proyecto en VS Code y usar la extensión Live Server para "Go Live".

- Opción B — Servir con Python (rápido, sin dependencias extra):

```bash
# Desde la raíz del proyecto
python -m http.server 8000
# o para Python 3 en Windows PowerShell
python -m http.server 8000
```

Luego abrir `http://127.0.0.1:8000/index.html` en el navegador.

4) Conectar frontend con backend

- El frontend incluye `js/api.js`. Por defecto `API_BASE` está vacío para permitir servir desde el mismo host. Si sirves frontend con `http.server` y backend en `localhost:5000`, edita `js/api.js` y establece:

```js
const API_BASE = 'http://127.0.0.1:5000';
```

- Guardar el archivo y recargar la aplicación.

5) Credenciales iniciales
- Usuario administrador por defecto (seed):

- Email: `admin@universidad.cl`
- Password: `admin123`

6) Probar endpoints básicos

- Login (curl):

```bash
curl -X POST http://127.0.0.1:5000/api/login -H "Content-Type: application/json" -d '{"email":"admin@universidad.cl","password":"admin123"}'
```

- Obtener historial de accesos:

```bash
curl http://127.0.0.1:5000/api/access-history
```

7) Siguientes mejoras recomendadas
- Integrar el flujo de login del frontend con `js/api.js` (usar `loginUser`).
- Añadir autenticación por token (JWT) si se requiere sesiones persistentes.
- Añadir validaciones y manejo de errores en backend.

8) Troubleshooting rápido
- Si `python init_db.py` falla con FileNotFoundError, verifica que existe `backend/sql/schema.sql` y que estás en la carpeta `backend/`.
- Si el frontend no encuentra la API (CORS o rutas), asegúrate de haber actualizado `API_BASE` en `js/api.js` y de que el servidor Flask está corriendo.
- Si al crear un usuario obtienes `Integrity error`, revisa que `rut` y `email` no estén duplicados.

9) Notas para desarrolladores
- El backend es un scaffold minimal; la contraseña de la seed admin está en texto plano en la semilla para facilitar pruebas. Se usa hashing cuando se crean nuevos usuarios. En producción debes re-hashear la contraseña admin y desplegar con HTTPS y autenticación segura.

---

Si quieres, puedo ahora:
- Conectar automáticamente el formulario de login del frontend a la API.
- Mover el frontend dentro de `frontend/` y actualizar rutas en `README.md`.
