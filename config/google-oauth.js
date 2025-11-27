var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const userModel = require('../routes/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      const email = (profile.emails && profile.emails[0] && profile.emails[0].value) ? profile.emails[0].value.toLowerCase() : null;

      if (!email) {
        return cb(new Error('Google account did not provide an email address.'));
      }

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return cb(null, existingUser);
      }

      return cb(null, {
        isNew: true,
        fullName: profile.displayName || '',
        email
      });
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, cb){
  return cb(null, user && user._id ? user._id : null);
});

passport.deserializeUser(async function(id, cb){
  let user = await userModel.findOne({_id: id});
  cb(null, user);
});

module.exports = passport;