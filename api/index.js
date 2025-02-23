require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));

const { handleStreamChat, createThread } = require('./controllers/streamController');

// Rutas de la API primero
app.post('/create-thread', createThread);
app.get('/stream-chat/:room_id', handleStreamChat);

// Ruta para la API hello
app.get('/api/hello', (req, res) => {
  res.json({ message: '¡Hola desde la API!' });
});

// Ruta catch-all debe ir al final
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Para desarrollo local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3050;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}: http://localhost:${PORT}`);
  });
}

module.exports = app; 