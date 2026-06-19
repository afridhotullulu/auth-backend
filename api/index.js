const express = require('express');
const passport = require('passport');

const app = express();

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed', session: false }),
  (req, res) => {
    res.send('Login berhasil');
  }
);

module.exports = app;