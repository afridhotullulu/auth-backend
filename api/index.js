const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    
    // JANGAN di-hardcode localhost. Pakai Env Variable atau conditional!
    callbackURL: process.env.NODE_ENV === 'production' 
      ? 'https://auth-backend-e1wx.vercel.app/api/auth/google/callback' 
      : 'http://localhost:5000/api/auth/google/callback',
      
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Rute untuk memicu login Google
app.get('/api/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Rute callback setelah login sukses
app.get('/api/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Redirect ke dashboard Next.js
    res.redirect('/dashboard');
  }
);

module.exports = app;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});