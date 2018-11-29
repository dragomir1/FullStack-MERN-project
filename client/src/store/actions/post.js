import axios from 'axios';
import * as actionTypes from './actionTypes';


// add Post
export const addPost = userData => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/posts', userData)
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
};


// get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get('/api/posts')
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

// get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
        userData: res.data

      })
    )
    .catch(err =>
      dispatch({
        type: actionTypes.GET_POST,
        userData: null
      })
    );
};

// delete a post
export const deletePost = id => dispatch => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: actionTypes.DELETE_POST,
          userData: id
        })
      )
      .catch(err =>
        dispatch({
          type: actionTypes.GET_ERRORS,
          userData: err.response.data
        })
      );
};

// like a post

export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    );
};

// unlike a post
export const unlikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        userData: err.response.data
      })
    );
};

// add comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
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


// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`, commentId)
    .then(res =>
      dispatch({
        type: actionTypes.GET_POST,
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

// clear errors
export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};

// post loading
export const setPostLoading = () => {
  return {
    type: actionTypes.POST_LOADING,
  };
};
