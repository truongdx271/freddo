const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateMenuItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '0';
  data.discount = !isEmpty(data.discount) ? data.discount : '0';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isNumeric(data.price)) {
    errors.price = 'Price must be a number';
  }

  if (!Validator.isNumeric(data.discount)) {
    errors.discount = 'Discount must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
