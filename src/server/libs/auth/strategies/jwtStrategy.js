const JwtStrategy = require('passport-jwt').Strategy;
const config = require('config');
const {User} = require('../../../models/user');

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

const jwtOptions = {
    // Get the JWT from the "Authorization" header.
    jwtFromRequest: cookieExtractor,
    // The secret that was used to sign the JWT
    secretOrKey: config.get('jwtAuth.secret'),
    // // The issuer stored in the JWT
    // issuer: config.get('authentication.token.issuer'),
    // // The audience stored in the JWT
    // audience: config.get('authentication.token.audience')
  };

module.exports = new JwtStrategy(jwtOptions, async (payload, done) => {
    try{
        const user = await User.findById(payload.userId);
        if (user) {
            return done(null, user);
        }
    }
    catch(e)  {
        return done(e, null);
    }
  });