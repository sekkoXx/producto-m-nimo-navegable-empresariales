import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')
SQL_PATH = os.path.join(os.path.dirname(__file__), 'sql', 'schema.sql')

def init_db():
    conexion = sqlite3.connect(DB_PATH)
    cursor = conexion.cursor()

    with open(SQL_PATH, 'r', encoding='utf-8') as archivo:
        cursor.executescript(archivo.read())

    cursor.execute("""
    INSERT INTO usuario
    (rut,nombre,email,password,tipo_usuario)
    VALUES
    (
    '11111111-1',
    'Administrador',
    'admin@universidad.cl',
    'admin123',
    'Administrador'
    )
    """)

    cursor.execute("""
    INSERT INTO instalacion
    (nombre,tipo,ubicacion,capacidad)
    VALUES
    ('Laboratorio 1','Laboratorio','Edificio A',30)
    """)

    cursor.execute("""
    INSERT INTO instalacion
    (nombre,tipo,ubicacion,capacidad)
    VALUES
    ('Biblioteca','Sala de Estudio','Edificio Central',100)
    """)

    conexion.commit()
    conexion.close()

    print('Base de datos creada correctamente:', DB_PATH)


if __name__ == '__main__':
    init_db()
