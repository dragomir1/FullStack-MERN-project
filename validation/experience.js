const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validateExperienceInput(data) {

  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if(validator.isEmpty(data.title)) {
    errors.title = "The title is required";
  }

  if(validator.isEmpty(data.company)) {
    errors.company = "The company are required";
  }

  if(validator.isEmpty(data.from)) {
    errors.from = "The from is required";
  }



  return {
    errors,
    isValid: isEmpty(errors),
  }

}
