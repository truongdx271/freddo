const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateImportItemInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : '0';
  data.quantity = !isEmpty(data.quantity) ? data.quantity : '0';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isNumeric(data.price)) {
    errors.price = 'Price must be a number';
  }

  if (!Validator.isNumeric(data.quantity)) {
    errors.quantity = 'Quantity must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
