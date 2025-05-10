const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para parsear JSON en las peticiones POST/PUT

// Conexión a MySQL (usando tus credenciales)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'junior29',
  database: 'newschema'
});

// Verificar conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err.message);
  } else {
    console.log('¡Conectado a la base de datos newschema!');
  }
});

/* ==================== RUTAS PARA CADA TABLA ==================== */

// 1. t_mascotas
app.get('/mascotas', (req, res) => {
  db.query('SELECT * FROM t_mascotas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/mascotas/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM t_mascotas WHERE nMascotaID = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
});

// 2. t_refugios
app.get('/refugios', (req, res) => {
  db.query('SELECT * FROM t_refugios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 3. t_veterinarios
app.get('/veterinarios', (req, res) => {
  db.query('SELECT * FROM t_veterinarios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 4. t_adoptantes
app.get('/adoptantes', (req, res) => {
  db.query('SELECT * FROM t_adoptantes', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 5. t_adopciones
app.get('/adopciones', (req, res) => {
  db.query('SELECT * FROM t_adopciones', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 6. t_administradores
app.get('/administradores', (req, res) => {
  db.query('SELECT * FROM t_administradores', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 7. t_codigosveterinarios (o codigosveterinarios, verifica el nombre exacto)
app.get('/codigos-veterinarios', (req, res) => {
  const tableName = 't_codigosveterinarios'; // Cambia si el nombre es diferente
  db.query(`SELECT * FROM ${tableName}`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

/* ==================== RUTAS CON JOIN (EJEMPLOS) ==================== */

// Ejemplo: Mascotas con info de su refugio
app.get('/mascotas-con-refugio', (req, res) => {
  const query = `
    SELECT m.*, r.cNombre AS nombre_refugio 
    FROM t_mascotas m
    LEFT JOIN t_refugios r ON m.nRefugioID = r.nRefugioID
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});