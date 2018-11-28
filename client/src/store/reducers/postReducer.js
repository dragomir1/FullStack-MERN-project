import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: [],
  post: {},
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_POST:
    return {
      ...state,
      posts: state.posts.filter(post => post._id !== action.userData)
    };
    case actionTypes.POST_LOADING:
    return {
      ...state,
      loading: true
    };
    case actionTypes.ADD_POST:
      return {
        ...state,
        posts: [action.userData, ...state.posts]
      };
    case actionTypes.GET_POSTS:
    return {
      ...state,
      posts: action.userData,
      loading: false
    };
    default:
      return state;
  }
}

export default reducer;
