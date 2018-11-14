import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import { getCurrentProfile } from '../../store/actions/profile';
import Spinner from '../../components/UI/Spinner/Spinner';


class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

// need to make sure the profile doesnt render if user in null
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContents;

    if(profile === null || loading) {
      dashboardContents = <Spinner />;
    } else {
      // check if logged in user has profile data.
      // the way to check for an empty object
      if (Object.keys(profile).length > 0 ) {
        dashboardContents = <h4>TODO: display profile</h4>
      } else {
        // user is logged in but no profile dashboardContents
        dashboardContents = (
          <div>
            <p className='lead text-muted'> Welcome {user.name}</p>
            <p>Your profile is empty.  Please add some info. </p>
            <Link to='/create-profile' className="btn btn-lg btn-info">Create profile</Link>
          </div>
        )

      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContents}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
