import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const InputGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  icon,
  type,
  onChange,

}) => {
  return (
    <div className="inpout-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">

        </span>
      </div>
      <input
      className={classnames("form-control form-control-lg", {
        'is-invalid' : error })}
      placeholder={placeholder}
      name={name}
      icon={icon}
      value={value}
      onChange={onChange}
      />
    {error && (<div className="invalid-feedback">{error}</div>) }
    </div>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

InputGroup.defaultProps = {
  type: 'text'
}



export default InputGroup;