const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const { Unauthorized } = require('../errors/unauthorized');

const jwtSecret = process.env.JWT_SECRET;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecret;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    // User.findOne({ id: jwt_payload.userId }, function (err, user) {
    try {
      if (jwt_payload) {
        return done(null, jwt_payload);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    } catch (error) {
      done(error);
    }

    // });
  })
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password',
    },
    async (req, username, password, done) => {
      try {
        const user = await User.create({
          ...req.body,
          email: username,
          password: password,
        });
        if (!user) {
          const error = new Unauthorized('User already exists');
          return done(error);
        }
        return done(null, { user, token: user.createJWT() });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      if (email) email = email.toLowerCase();

      process.nextTick(function () {
        User.findOne({ email: email }, function (err, user) {
          if (err) return done(err);

          if (!user) {
            const error = new Unauthorized();
            error.message = 'User not found';
            return done(error);
          }

          if (!user.comparePassword(password)) {
            const error = new Unauthorized();
            error.message = 'Invalid password';
            return done(error);
          } else return done(null, { user, token: user.createJWT() });
        });
      });
    }
  )
);
