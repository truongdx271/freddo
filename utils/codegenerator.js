module.exports = codegenerator = (data, cb) => {
  let code = data
    .split(' ')
    .map(item => {
      return item[0];
    })
    .join('');

  let milliseconds = new Date().getTime();
  code += '-';
  code += milliseconds;

  return cb(null, code);
};
