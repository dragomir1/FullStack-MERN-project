import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// you import proptypes when you use mapStateToProps meaning we're gong to have a property.  when ever you have propteries in your components add them to propTypes.
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount = () => {
    // checking to see if we're logged in...
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  
  render() {
    return(
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Social Media Site
                </h1>
                <p className="lead"> This is a full stack MERN project.</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


// need to look this up again.
Landing.propTypes = {
  auth: PropTypes.object.isRequired,
}


const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Landing);
