import axios from 'axios';
import * as actionTypes from './actionTypes';


// get current profile

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(res =>
    dispatch({
      type: actionTypes.GET_PROFILE,
      userData: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: actionTypes.GET_PROFILE,
      // the reason its epmty is becuase you can create an account with no profile..so if the user didn't fill one out, then an empty object is returned.  there needs to be a button that will take them to fill a profile.  this shouldnt be an error.
      userData: { }
    })
  );
};

// get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  axios.get(`/api/profile/handle/${handle}`)
  .then(res =>
    dispatch({
      type: actionTypes.GET_PROFILE,
      userData: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: actionTypes.GET_PROFILE,
      // the reason its epmty is becuase you can create an account with no profile..so if the user didn't fill one out, then an empty object is returned.  there needs to be a button that will take them to fill a profile.  this shouldnt be an error.
      userData: null
    })
  );
};



// profile loading
export const setProfileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING,
  };
};

// clear profile loading
export const clearProfileLoading = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE,
  };
};
// create profile
// we need to use history to redirect and use WithRoter..so we would pass in this.props.history.once we create the profile we want to redirect.
export const createProfile = (userData, history) => dispatch => {
  axios.post('/api/profile', userData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    );
}

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile/all')
  .then(res =>
    dispatch({
      type: actionTypes.GET_PROFILES,
      userData: res.data
    })
  )
  .catch(err =>
    dispatch({
      type: actionTypes.GET_PROFILES,
      // the reason its epmty is becuase you can create an account with no profile..so if the user didn't fill one out, then an empty object is returned.  there needs to be a button that will take them to fill a profile.  this shouldnt be an error.
      userData: null
     })
  );
};

// delete Account
export const deleteAccount = () => dispatch => {
  if(window.confirm("This can not be undone!")) {
    axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: actionTypes.SET_CURRENT_USER,
          userData: {}
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          userData: err.response.data
        })
      );
  }
};
