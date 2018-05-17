const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateOrderInput(data) {
  let errors = {};

  // data.name = !isEmpty(data.name) ? data.name : '';
  data.amount = !isEmpty(data.amount) ? data.amount : '0';
  data.discount = !isEmpty(data.discount) ? data.discount : '0';
  data.total = !isEmpty(data.total) ? data.total : '0';
  data.custpaid = !isEmpty(data.custpaid) ? data.custpaid : '0';

  let amount = parseInt(data.amount);
  let discount = parseInt(data.discount);
  let total = parseInt(data.total);
  let custpaid = parseInt(data.custpaid);

  if (total > 0 && custpaid > 0) {
    if (custpaid < total) {
      errors.custpaid = 'Custpaid must equal or higher of total'
    }
  }

  if (!Validator.isNumeric(data.amount)) {
    errors.amount = 'Amount must be a number';
  }

  if (!Validator.isNumeric(data.total)) {
    errors.total = 'Total must be a number';
  }

  if (!Validator.isNumeric(data.discount)) {
    errors.discount = 'Discount must be a number';
  }

  if (!Validator.isNumeric(data.custpaid)) {
    errors.custpaid = 'CPaid must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};