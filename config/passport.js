const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .populate('role', ['name', 'permissions'])
        .then(user => {
          if (user) {
            userObj = {};
            userObj.id = user.id;
            userObj.name = user.name;
            userObj.email = user.email;
            userObj.avatar = user.avatar;
            userObj.date = user.date;
            userObj.role = user.role.name;
            userObj.permissions = user.role.permissions;

            return done(null, userObj);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
