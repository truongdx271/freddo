const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTableInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.section = !isEmpty(data.section) ? data.section : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.section)) {
    errors.section = 'Section field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};