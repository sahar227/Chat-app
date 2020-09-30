const passport = require('passport');
const googleStrategy = require('./strategies/googleStrategy');
const jwtStrategy = require('./strategies/jwtStrategy');
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

    passport.use(jwtStrategy);
    passport.use(googleStrategy);
};