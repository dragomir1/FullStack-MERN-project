import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../../components/Common/TextInputGroup';
import TextAreaFieldGroup from '../../components/Common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import  { addEducation } from '../../store/actions/education';
import SelectListGroup from '../../components/Common/SelectListGroup';

class AddEducation extends Component {

  state = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  }

  onSubmit = (e) => {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    }
    this.props.addEducation(eduData, this.props.history)
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onCheck = (e) => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }


  render() {
    const { errors } = this.state;

    const options = [
      {label: "Degree level", value: 0},
      {label: "GED", value: "GED"},
      {label: "Bachelors", value: "Bachelors"},
      {label: "Masters", value: "Masters"},
      {label: "PHD", value: "PHD"},
    ]

    return (
      <div className="add-education">
        <div className='container'>
          <div className='row'>
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'> Add Education</h1>
              <p className='lead text-center'>
                Add your educational background
                </p>
              <small className='d-block pb-3'> *= required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                  />
                <SelectListGroup
                    placeholder="* Degree"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    options={options}
                    error={errors.degree}
                    info="your degree"
                  />
                <TextFieldGroup
                  placeholder="* Field of study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
                  />
                <h6>From:</h6>
                <TextFieldGroup
                  name='from'
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                  />
                  <h6>To:</h6>
                  <TextFieldGroup
                    name='to'
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? 'disabled' : ''}
                    />
                  <div className='form-check mb-4'>
                    <input
                    type='checkbox'
                    className='form-check-input'
                    name='current'
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id='current'
                    />
                  <label htmlFor='current' className='form-check-label'>
                  Currently in school
                  </label>
                </div>
                <TextAreaFieldGroup
                    placeholder="program description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us something about the program you studied."
                  />
                  <input
                    type='submit'
                    value='Submit'
                    className='btn btn-info btn-block mt-4'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  }


  AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired

  }

  const mapStateToProps = state => {
    return {
      profile: state.profile,
      errors: state.errors
    }
  }



  export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));
