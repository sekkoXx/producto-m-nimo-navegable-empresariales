import sqlite3

conexion = sqlite3.connect("database.db")
cursor = conexion.cursor()

with open("sql/schema.sql", "r", encoding="utf-8") as archivo:
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

print("Base de datos creada correctamente")
