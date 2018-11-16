import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/Common/TextInputGroup';
import InputGroup from '../../components/Common/InputGroup';
import SelectListGroup from '../../components/Common/SelectListGroup';
import TextAreaFieldGroup from '../../components/Common/TextAreaFieldGroup';
import { createProfile } from '../../store/actions/profile';

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

  onSubmit = (event) => {
    event.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youTube: this.state.youTube,
      instagram: this.state.instagram,
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }


render() {
  const { errors, displaySocialInputs } = this.state;

  let socialInputs;

  if(displaySocialInputs) {
    socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter} />

          <InputGroup
            placeholder="Facebook URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook} />

          <InputGroup
            placeholder="Linkedin URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin} />

          <InputGroup
            placeholder="YouTube URL"
            name="youTube"
            icon="fab fa-youTube"
            value={this.state.youTube}
            onChange={this.onChange}
            error={errors.youTube} />

          <InputGroup
            placeholder="Instagram URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram} />
        </div>
    )
  }


  // select options for status
  const options = [
    {label: "Your professional status", value: 0},
    {label: "Developer", value: "Developer"},
    {label: "Junior Developer", value: "Junior Developer"},
    {label: "Senior Developer", value: "Senior Developer"},
    {label: "Manager", value: "Manager"},
    {label: "Student", value: "Student"},
    {label: "Teacher", value: "Teacher"},
    {label: "Intern", value: "Intern"},
    {label: "Other", value: "Other"},
  ];



  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Your handle for your profile URL...."
                />
              <SelectListGroup
                  placeholder="status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="your career status"
                />
                <TextFieldGroup
                  placeholder="company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Your company name...."
                />
                <TextFieldGroup
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your website...."
                />
                <TextFieldGroup
                  placeholder="location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Your location...."
                />
                <TextFieldGroup
                  placeholder="skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Use comma separated values (eg. HTML, CSS, JavaScript, Python"
                />
                <TextFieldGroup
                  placeholder="Github handle"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Your Github handle - include link if you want"
                />
              <TextAreaFieldGroup
                  placeholder="A short bio about yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us something about yourself"
                />
              <div className="mb-3">
                <button
                  type='button'
                  onClick={() => {
                    this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }));
                  }}
                  className=" btn btn-light ">
                    Add Social Network Links
                </button>
                <span className="text-muted">{' '}Optional</span>
              </div>
              {socialInputs}
              <input type='submit' value="Submit" className='btn btn-info btn-block mt-4' />
            </form>
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


export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
