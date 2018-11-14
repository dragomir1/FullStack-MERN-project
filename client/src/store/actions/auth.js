import axios from 'axios';
import * as actionTypes from './actionTypes';
import setAuthToken from '../../utility/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    )
};

//  log in user
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set to local storage
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      // the token includes the user data..name, email, avatar etc...this needs to be decoded.
      setAuthToken(token);
      // decode token to get user userData
      const decoded = jwt_decode(token);
      // set current users
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    })
};

// set current user
export const setCurrentUser = decoded => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    decoded: decoded
  }
}

// log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to an empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}
