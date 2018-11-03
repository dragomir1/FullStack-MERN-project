const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports = function validatePostInput(data) {

  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!validator.isLength(data.text, {min: 10, max: 300})) {
    errors.text = "Post needs to be between 10 and 300 characters long";
  }

  if(validator.isEmpty(data.text)) {
    errors.text = "The text is required";
  }




  return {
    errors,
    isValid: isEmpty(errors),
  }

}
