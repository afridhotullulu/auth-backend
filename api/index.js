const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend OK');
});

// sementara test dulu
app.get('/auth/google', (req, res) => {
  res.send('Google route aktif');
});

module.exports = app;