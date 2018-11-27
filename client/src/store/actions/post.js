import axios from 'axios';
import * as actionTypes from './actionTypes';


// add Post
export const addPost = userData => dispatch => {
  axios.post('/api/posts', userData)
    .then(res =>
      dispatch({
        type: actionTypes.ADD_POST,
        userData: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    );
}


// get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios.get('/api/posts')
    .then(res =>
      dispatch({
        type: actionTypes.GET_POSTS,
        userData: res.data

      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POSTS,
        userData: null
      })
    );
};

// post loading
export const setPostLoading = () => {
  return {
    type: actionTypes.POST_LOADING,
  };
};
