const express = require('express')
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
const app = express()
const port = 3000

passport.use(new GitHubStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile.id);
    return cb(null, profile);
  }
));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

app.get('/auth/github',  passport.authenticate('github'));

app.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
      console.log("success");
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))