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
