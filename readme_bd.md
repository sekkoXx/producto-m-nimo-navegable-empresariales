# Sistema de Control de Acceso Universitario

PMV desarrollado para gestionar accesos a instalaciones universitarias mediante credenciales digitales.


Crear entorno virtual:

```bash
python -m venv venv
```

Activar entorno:

Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Crear base de datos:

```bash
python init_db.py
```

Ejecutar aplicación:

```bash
python app.py
```

---

## Usuario Administrador

Email:

admin@universidad.cl

Password:

admin123

---

## Funcionalidades

- Inicio de sesión
- Gestión de usuarios
- Registro de accesos
- Historial de accesos
- Registro de incidencias
- Administración de incidencias
- Persistencia mediante SQLite