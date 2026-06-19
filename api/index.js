const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();

// STEP 3 - MIDDLEWARE
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// STEP 4 - SERIALIZE
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ROUTE LOGIN
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.send('Login berhasil');
  }
);

module.exports = app;