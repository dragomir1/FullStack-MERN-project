import React, { Component } from 'react';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import setAuthToken from './utility/setAuthToken';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { setCurrentUser} from './store/actions/auth';
import { logoutUser} from './store/actions/auth';

import store from './store/store';
import { Route, BrowserRouter } from 'react-router-dom';
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

  // TODO: Clear current profile
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
              </div>
              <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
