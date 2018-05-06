// middleware for doing role-based permissions
const passport = require('passport');

module.exports = auth = (req, res, next) => {
  // const isAllowed = role => allowed.indexOf(role) > -1;

  // return a middleware
  passport.authenticate('jwt', { session: false }, function(err, user, info) {
    if (err) {
      console.log(err);
      next();
    }
    if (user) {
      req.user = user;
      next();
    } else {
      next();
    }
  })(req, res, next);
  //next();
};
