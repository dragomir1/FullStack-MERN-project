import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { registerUser} from '../../store/actions/auth';
// import * as actions from '../../store/actions/index';

import { registerUser } from '../../store/actions/auth';

class Register extends Component {

constructor() {
  super();
  this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {}
  }
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
}


componentWillReceiveProps(nextProps) {
  if(nextProps) {
    this.setState({errors: nextProps.errors});
  }
}

onChange = (event) => {
  this.setState({[event.target.name]: event.target.value})
}

onSubmit = (event) => {
  event.preventDefault();

  const newUser = {
    name: this.state.name,
    email: this.state.email,
    password: this.state.password,
    passwordConfirm: this.state.passwordConfirm,
  };

  this.props.registerUser(newUser, this.props.history)
}





// const { errors } = this.state; the { } allow you to pull errors out of this.state.  so you don't need to assign it directly => const errors = this.state.errors
  render() {

    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid' : errors.name })}
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>) }
                </div>
                <div className="form-group">
                  <input type="email"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid' : errors.email })}
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  />
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>) }
                </div>
                <div className="form-group">
                  <input type="password"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid' : errors.password })}
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>) }
                </div>
                <div className="form-group">
                  <input type="password"
                  className={classnames("form-control form-control-lg", {
                    'is-invalid' : errors.passwordConfirm})}
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  />
                  {errors.passwordConfirm && (<div className="invalid-feedback">{errors.passwordConfirm}</div>) }
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// need to look this up again.
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}


const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}
export default withRouter(connect(mapStateToProps, {registerUser})(Register));