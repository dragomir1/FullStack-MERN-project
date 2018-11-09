import * as actionTypes from '../actions/actionTypes';

const initialState = {

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.userData;
    default:
      return state;
  }
}

export default reducer;
