import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validation/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
    return {
      ...state,
      // we check to make sure the decoded user is not empty
      isAuthenticated: !isEmpty(action.decoded),
      user: action.decoded
    }


  default:
    return state;

}
}

export default reducer;
