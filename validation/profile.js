const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (!isEmpty(data.idcard)) {
    if (!Validator.isNumeric(data.idcard)) {
      errors.idcard = 'Not a valid ID';
    }
  }

  if (!isEmpty(data.phone)) {
    if (!Validator.isNumeric(data.phone)) {
      errors.phone = 'Not a valid phone number';
    }
  }

  if (!isEmpty(data.birthday)) {
    if (!Validator.isISO8601(data.birthday)) {
      errors.birthday = 'Not a valid date';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
