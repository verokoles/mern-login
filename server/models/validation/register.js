const Validator = require("express-validator");
const EmptyValidator= require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};

// Convert empty fields to an empty string to use validators
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

// check name
  if (EmptyValidator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

// check if username valid/not empty
  if (EmptyValidator.isEmpty(data.username)) {
    errors.username = "username field is required";
  } else if (!Validator.isUserName(data.username)) {
    errors.username = "username is invalid";
  }

// check if password is valid/not empty
  if (EmptyValidator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (EmptyValidator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};