import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/Common/TextInputGroup';
import InputGroup from '../../components/Common/InputGroup';
import SelectListGroup from '../../components/Common/SelectListGroup';
import TextAreaFieldGroup from '../../components/Common/TextAreaFieldGroup';
import { createProfile, getCurrentProfile } from '../../store/actions/profile';
import isEmpty from '../../validation/isEmpty';



// the route "/api/profile is both used to creat and to update. so we'll use the same action."

class CreateProfile extends Component {

  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubUserName: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
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
      githubUserName: this.state.githubUserName,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      errors: {}
    }

    this.props.createProfile(profileData, this.props.history)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  }

// this runs as soon as the component mounts.
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
// nextProps.profile.profile =>the first part is the actual state.  the last part is the profile object.
    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(',');

      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.githubUserName = !isEmpty(profile.githubUserName) ? profile.githubUserName : '';
      // profile.social : {} => is an object so we want it to be empty
      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

      // set component field this.state.
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubUserName: profile.githubUserName,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram,
      });
    }
  }


render() {
  const { errors, displaySocialInputs } = this.state;

  let socialInputs;

  if(displaySocialInputs) {
    socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter} />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook} />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin} />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youTube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube} />

          <InputGroup
            placeholder="Instagram Page URL"
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
              <h1 className="display-4 text-center">Edit Your Profile</h1>
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
                  name="githubUserName"
                  value={this.state.githubUserName}
                  onChange={this.onChange}
                  error={errors.githubUserName}
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
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired

}
const mapStateToProps = state => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}


export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));
