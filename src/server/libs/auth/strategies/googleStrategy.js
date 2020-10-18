const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const { User } = require("../../../models/user");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (user) return done(null, user);
      const verifiedEmail =
        profile.emails.find((email) => email.verified).value ||
        profile.emails[0].value;
      user = new User({
        googleId: profile.id,
        email: verifiedEmail,
        name: { first: profile.name.givenName, last: profile.name.familyName },
      });
      await user.save();
      return done(null, user);
    } catch (e) {
      return done(e, null);
    }
  }
);
