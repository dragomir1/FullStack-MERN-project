import React, { Component } from 'react';
import Navbar from './containers/Layout/Navbar';
import Landing from './containers/Layout/Landing';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Dashboard from './containers/Dashboard/Dashboard';
import Profiles from './containers/Profiles/Profiles';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/EditProfile/EditProfile';
import CreateProfile from './containers/CreateProfile/CreateProfile';
import AddExperience from './containers/Credentials/AddExperience';
import AddEducation from './containers/Credentials/AddEducation';
import setAuthToken from './utility/setAuthToken';

import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import PrivateRoute from './components/Common/PrivateRoute';
import { setCurrentUser} from './store/actions/auth';
import { logoutUser} from './store/actions/auth';
import { clearProfileLoading} from './store/actions/profile';
import store from './store/store';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';

// check for jwtToken
if(localStorage.jwtToken) {
  // set auth token header Auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and expiration.
  const decoded = jwt_decode(localStorage.jwtToken);
// set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

// CHEKC FOR EXPPIRED token.  if the token is expired, it should log the user out.
const currentTime = Date.now() / 1000;
if(decoded.exp < currentTime) {
  // logoutUser - with using dispatch, we have access to functions throughout the app.
  store.dispatch(logoutUser());

  store.dispatch(clearProfileLoading())
  // redirect to login;
  window.location.href = '/login';

}

}

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <BrowserRouter>
          <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />

                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
              <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
