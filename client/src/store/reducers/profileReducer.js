import * as actionTypes from '../actions/actionTypes';


const initialState = {
  profile: null,
  profiles: null,
  loading: false
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
    return {
      ...state,
      loading: true
    }
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        profile: action.userData,
        loading: false
      }
    case actionTypes.CLEAR_CURRENT_PROFILE:
    return {
      ...state,
      profile: null,
      loading: false
    }
    default:
      return state;
  }
}

export default reducer;
