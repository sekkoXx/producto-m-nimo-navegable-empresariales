from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def row_to_dict(row):
    if row is None:
        return None
    return {k: row[k] for k in row.keys()}

@app.route('/api/users', methods=['GET'])
def list_users():
    conn = get_db()
    cur = conn.execute('SELECT id_usuario, rut, nombre, email, tipo_usuario, telefono, estado FROM usuario')
    rows = [row_to_dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows)

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    required = ['rut', 'nombre', 'email', 'password', 'tipo_usuario']
    for f in required:
        if f not in data:
            return jsonify({'error': f'Missing {f}'}), 400

    hashed = generate_password_hash(data['password'])
    conn = get_db()
    try:
        cur = conn.execute(
            'INSERT INTO usuario (rut,nombre,email,password,tipo_usuario,telefono) VALUES (?,?,?,?,?,?)',
            (data['rut'], data['nombre'], data['email'], hashed, data['tipo_usuario'], data.get('telefono'))
        )
        conn.commit()
        user_id = cur.lastrowid
        cur = conn.execute('SELECT id_usuario, rut, nombre, email, tipo_usuario, telefono, estado FROM usuario WHERE id_usuario = ?', (user_id,))
        user = row_to_dict(cur.fetchone())
        return jsonify(user), 201
    except sqlite3.IntegrityError as e:
        return jsonify({'error': 'Integrity error', 'detail': str(e)}), 400
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'email and password required'}), 400

    conn = get_db()
    cur = conn.execute('SELECT * FROM usuario WHERE email = ?', (email,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return jsonify({'error': 'invalid credentials'}), 401

    stored = row['password']
    ok = False
    try:
        ok = check_password_hash(stored, password)
    except Exception:
        # fallback to plain compare for legacy DB seed
        ok = (stored == password)

    if not ok:
        return jsonify({'error': 'invalid credentials'}), 401

    user = {k: row[k] for k in row.keys() if k != 'password'}
    return jsonify({'user': user})

@app.route('/api/access-history', methods=['GET'])
def access_history():
    conn = get_db()
    cur = conn.execute('''
        SELECT a.id_acceso, a.fecha_hora_entrada, a.fecha_hora_salida, a.tipo_acceso, a.resultado,
               u.nombre as usuario, u.email as usuario_email, i.nombre as instalacion
        FROM acceso a
        JOIN usuario u ON a.id_usuario = u.id_usuario
        JOIN instalacion i ON a.id_instalacion = i.id_instalacion
        ORDER BY a.fecha_hora_entrada DESC
        LIMIT 200
    ''')
    rows = [row_to_dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows)

@app.route('/api/access-events', methods=['POST'])
def create_access_event():
    data = request.get_json() or {}
    required = ['id_usuario', 'id_instalacion', 'resultado']
    for f in required:
        if f not in data:
            return jsonify({'error': f'Missing {f}'}), 400

    now = datetime.utcnow().isoformat(sep=' ', timespec='seconds')
    conn = get_db()
    cur = conn.execute(
        'INSERT INTO acceso (fecha_hora_entrada, tipo_acceso, resultado, id_usuario, id_instalacion) VALUES (?,?,?,?,?)',
        (now, data.get('tipo_acceso'), data['resultado'], data['id_usuario'], data['id_instalacion'])
    )
    conn.commit()
    access_id = cur.lastrowid
    cur = conn.execute('SELECT id_acceso, fecha_hora_entrada, tipo_acceso, resultado FROM acceso WHERE id_acceso = ?', (access_id,))
    created = row_to_dict(cur.fetchone())
    conn.close()
    return jsonify(created), 201

@app.route('/api/incidents', methods=['GET'])
def list_incidents():
    conn = get_db()
    cur = conn.execute('SELECT id_incidencia, descripcion, estado, fecha, id_acceso, id_usuario_reporta, id_responsable FROM incidencia ORDER BY fecha DESC')
    rows = [row_to_dict(r) for r in cur.fetchall()]
    conn.close()
    return jsonify(rows)

@app.route('/api/incidents/<int:inc_id>/assign', methods=['POST'])
def assign_incident(inc_id):
    data = request.get_json() or {}
    id_responsable = data.get('id_responsable')
    if id_responsable is None:
        return jsonify({'error': 'id_responsable required'}), 400
    conn = get_db()
    conn.execute('UPDATE incidencia SET id_responsable = ?, estado = ? WHERE id_incidencia = ?', (id_responsable, 'En revisión', inc_id))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})

@app.route('/api/incidents/<int:inc_id>/close', methods=['POST'])
def close_incident(inc_id):
    conn = get_db()
    conn.execute('UPDATE incidencia SET estado = ? WHERE id_incidencia = ?', ('Cerrada', inc_id))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})

@app.route('/api/incidents/<int:inc_id>/escalate', methods=['POST'])
def escalate_incident(inc_id):
    conn = get_db()
    conn.execute('UPDATE incidencia SET estado = ? WHERE id_incidencia = ?', ('Escalada', inc_id))
    conn.commit()
    conn.close()
    return jsonify({'ok': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
