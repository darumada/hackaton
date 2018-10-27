var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'iin',
      passwordField: 'password'
    },
    function(iin, password, done) {
      User.findOne({ iin })
        .then(function(user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: { 'iin or password': 'is invalid' }
            });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);
