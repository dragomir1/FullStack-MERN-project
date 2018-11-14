import React, { Component } from 'react';
import Navbar from './containers/Layout/Navbar';
import Landing from './containers/Layout/Landing';
import Footer from './components/Footer/Footer';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Dashboard from './containers/Dashboard/Dashboard';
import CreateProfile from './containers/CreateProfile/CreateProfile';
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
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
              </div>
              <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
