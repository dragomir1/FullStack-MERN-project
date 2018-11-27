import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser} from '../../store/actions/auth';
import { clearProfileLoading} from '../../store/actions/profile';

class Navbar extends Component {

logoutUserHandler =(e) => {
  e.preventDefault()
  this.props.clearProfileLoading();
  this.props.logoutUser();
}


  render() {

  // we are destructuring.  pulling out info from isAuthenticated, user...
    const { isAuthenticated, user } = this.props.auth

    // creating two variables and depending on the user will see different ones depending on if the user is logged in or not.



    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">Post Feed</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <a href=""
            onClick={this.logoutUserHandler}
            className="nav-lik"
            > <img
            className="rounded-circle"
            src="{user.avatar}"
            alt={user.name}
            style={{width: '25px', marginRight: '5px'}}
            title="You must have an avatr to your email to display an image"/ >{' '} Logout
          </a>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
  }
}

export default withRouter(connect(mapStateToProps, {logoutUser, clearProfileLoading})(Navbar));
