const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Backend OK');
});

module.exports = app;