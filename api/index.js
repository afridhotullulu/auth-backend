const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend OK');
});

app.get('/auth/google', (req, res) => {
  res.send('Route google kebaca (NO ERROR)');
});

app.get('/auth/google/callback', (req, res) => {
  res.send('Callback kebaca (NO ERROR)');
});

module.exports = app;