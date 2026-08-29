const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configuración de Multer para guardar fotos en "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Ruta para subir fotos
app.post('/upload', upload.single('foto'), (req, res) => {
  res.send('✅ Foto subida con éxito');
});

// Ruta para mostrar todas las fotos
app.get('/fotos', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) return res.status(500).send('Error al leer fotos');
    const imagenes = files.map(f => `/uploads/${f}`);
    res.json(imagenes);
  });
});

// Servir carpeta de fotos
app.use('/uploads', express.static('uploads'));

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
