const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateRegisterInput(data) {

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : '';


  if(!validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = "name must be between 2 and 30 characters";
  }

  if(validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if(validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if(!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if(validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }

  if(!validator.isLength(data.password, {min: 6, max: 10})) {
    errors.password = "password must be at least six characters";
  }

  if(validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password is required";
  }

  if(!validator.equals(data.password, data.passwordConfirm)){
    errors.passwordConfirm = "Passwords must match";

  }


  return {
    errors,
    isValid: isEmpty(errors),
  }
}
