import React, { Component } from 'react';
import isEmpty from '../../validation/isEmpty';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileGithub extends Component {

  render() {
    return (
  <div>
    <h1>Hello</h1>
  </div>
    )
  }
}

ProfileGithub.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileGithub;
