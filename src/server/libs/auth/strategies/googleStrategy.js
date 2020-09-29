const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('config');
const User = require('../../../models/user');

module.exports = new GoogleStrategy({
    clientID: config.get('googleAuth.GOOGLE_CLIENT_ID'),
    clientSecret: config.get('googleAuth.GOOGLE_CLIENT_SECRET'),
    callbackURL: config.get('googleAuth.CALLBACK_URL')
  },
  async function(accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if(user)
            return done(null, user);
        const verifiedEmail = profile.emails.find(email => email.verified).value || profile.emails[0].value;
        user = new User({googleId: profile.id, email: verifiedEmail,  name: {first: profile.name.givenName, last: profile.name.familyName}});
        await user.save();
        return done(null, user);
      }
      catch(e) {
          return done(e, null);
      }
  }
);