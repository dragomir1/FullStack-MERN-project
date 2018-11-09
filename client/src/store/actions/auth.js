import axios from 'axios';
import * as actionTypes from './actionTypes';


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
