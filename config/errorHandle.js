module.exports = errorHandle = (err, req, res, next) => {
  const errors = {};
  // if (err) console.log(`ERR: ${err}`);
  if (err) {
    // if (err.code === 'permission_denied') {
    console.log(`ERR: ${err}`);
    errors.nopermission = 'Permissions required';
    res.status(403).json(errors);
  } else {
    next();
  }
};