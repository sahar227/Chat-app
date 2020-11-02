const passport = require('passport');
const googleStrategy = require('./strategies/googleStrategy');
const {User} = require('../../models/user');

module.exports = () => {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

    passport.use(googleStrategy);
};