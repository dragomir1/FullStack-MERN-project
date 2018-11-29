import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import { registerUser} from '../../store/actions/auth';
// import * as actions from '../../store/actions/index';

import { registerUser } from '../../store/actions/auth';
import TextFieldGroup from '../../components/Common/TextInputGroup';

class Register extends Component {

  state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {}
  }
//   this.onChange = this.onChange.bind(this);
//   this.onSubmit = this.onSubmit.bind(this);
// }

componentDidMount = () => {
  // checking to see if we're logged in...
  if(this.props.auth.isAuthenticated) {
    this.props.history.push('/dashboard');
  }
}

componentWillReceiveProps(nextProps) {
  if(nextProps.errors) {
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
                <TextFieldGroup
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder='Email'
                  name='email'
                  value={this.state.email}
                  type='email'
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder='Confirm Password'
                  name='passwordConfirm'
                  type='password'
                  value={this.state.passwordConfirm}
                  onChange={this.onChange}
                  error={errors.passwordConfirm}
                />
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
