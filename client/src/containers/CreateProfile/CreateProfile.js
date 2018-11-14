import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/Common/TextInputGroup';

class CreateProfile extends Component {

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youTube: '',
    instagram: '',
    errors: {}
  }

render() {
  return (
    <div class="create-profile">
      <div class="container">
        <div class="row">
          <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Create Your Profile</h1>
              <p class="lead text-center">Let's get some information to make your profile stand out</p>
              <small class="d-block pb-3">* = required field</small>
          </div>
        </div>
      </div>
    </div>
  );
}
}


CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}
const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}


export default connect(mapStateToProps, { })(CreateProfile);
