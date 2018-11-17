import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextFieldGroup } from '../../components/Common/TextInputGroup';
import { TextAreaFieldGroup } from '../../components/Common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class AddExperience extends Component {

  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false



  }
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className='container'>
          <div className='row'>
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'> Add Exoerience</h1>
              <p className='lead text-center'>
                Add any job or position that you have had in the past or current
                </p>
              <small className='d-block pb-3'> *= required fields</small>  
            </div>
          </div>
        </div>
      </div>

    )
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}
const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}



export default connect(null, {TextAreaFieldGroup, TextFieldGroup })withRouter(AddExperience);