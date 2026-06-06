DROP TABLE IF EXISTS incidencia;
DROP TABLE IF EXISTS acceso;
DROP TABLE IF EXISTS responsable;
DROP TABLE IF EXISTS credencial;
DROP TABLE IF EXISTS instalacion;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    rut TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    tipo_usuario TEXT NOT NULL,
    telefono TEXT,
    estado TEXT DEFAULT 'Activo'
);

CREATE TABLE credencial (
    id_credencial INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT UNIQUE NOT NULL,
    tipo TEXT NOT NULL,
    estado TEXT DEFAULT 'Activa',
    fecha_emision DATE,
    fecha_vencimiento DATE,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE instalacion (
    id_instalacion INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo TEXT NOT NULL,
    ubicacion TEXT,
    capacidad INTEGER,
    estado TEXT DEFAULT 'Activa'
);

CREATE TABLE acceso (
    id_acceso INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_hora_entrada DATETIME NOT NULL,
    fecha_hora_salida DATETIME,
    tipo_acceso TEXT,
    resultado TEXT,
    id_usuario INTEGER NOT NULL,
    id_instalacion INTEGER NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_instalacion) REFERENCES instalacion(id_instalacion)
);

CREATE TABLE responsable (
    id_responsable INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    rol TEXT,
    estado TEXT DEFAULT 'Activo'
);

CREATE TABLE incidencia (
    id_incidencia INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion TEXT NOT NULL,
    estado TEXT DEFAULT 'Abierta',
    fecha DATE NOT NULL,
    id_acceso INTEGER,
    id_usuario_reporta INTEGER,
    id_responsable INTEGER,
    FOREIGN KEY(id_acceso) REFERENCES acceso(id_acceso),
    FOREIGN KEY(id_usuario_reporta) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_responsable) REFERENCES responsable(id_responsable)
);