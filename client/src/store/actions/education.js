import axios from 'axios';
import * as actionTypes from './actionTypes';



export const addEducation = (userData, history) => dispatch => {
  axios.post('/api/profile/education', userData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    );
}

export const deleteEducation = (id) => dispatch => {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_PROFILE,
          userData: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          userData: err.response.data
        })
      );
  };
