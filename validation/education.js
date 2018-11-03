const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateEducationInput(data) {

  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if(validator.isEmpty(data.school)) {
    errors.school = "The school is required";
  }

  if(validator.isEmpty(data.degree)) {
    errors.degree = "The degree are required";
  }

  if(validator.isEmpty(data.from)) {
    errors.from = "The from is required";
  }

  if(validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "The fieldOfStudy is required";
  }



  return {
    errors,
    isValid: isEmpty(errors),
  }

}
