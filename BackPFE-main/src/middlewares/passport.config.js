const PassportStatic = require('passport');
const  {Strategy, ExtractJwt} = require('passport-jwt');
const user = require('../models/user.model');
const User = user.User;

const config= (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    done(null, false);
  });

  passport.use(
    new Strategy(
      {
        secretOrKey: process.env.TOKEN_SECRET,
        jwtFromRequest: ExtractJwt.fromHeader('access_token'),
        passReqToCallback: true,
      },
      async (req, payload, done) => {
        console.log(payload)
        const user = await User.findById(payload.userId);
        if (user) {
          return done(null, user)};
        return done('requested user not found', false);
      },
    ),
  );
};
module.exports = {config}