import {
  FETCH_ALL_DATA,
  LOADING_FETCH_ALL_DATA,
  ERROR_FETCH_ALL_DATA,
} from "../actions/actionTypes";
const initialState = {
  fetchData: [],
  fetchLoading: true,
  fetchError: "",
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_DATA:
      return {
        ...state,
        fetchData: action.payload,
      };
    case LOADING_FETCH_ALL_DATA:
      return {
        ...state,
        fetchLoading: action.payload,
      };
    case ERROR_FETCH_ALL_DATA:
      return {
        ...state,
        fetchError: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
