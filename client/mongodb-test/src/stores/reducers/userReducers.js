import {
  FETCH_ALL_DATA,
  LOADING_FETCH_ALL_DATA,
  ERROR_FETCH_ALL_DATA,
  FETCH_One_DATA,
  LOADING_FETCH_One_DATA,
  ERROR_FETCH_One_DATA,
} from "../actions/actionTypes";
const initialState = {
  fetchData: [],
  fetchLoading: true,
  fetchError: "",
  fetchOneData: {},
  fetchOneLoading: true,
  fetchOneError: "",
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
    case FETCH_One_DATA:
      return {
        ...state,
        fetchOneData: action.payload,
      };
    case LOADING_FETCH_One_DATA:
      return {
        ...state,
        fetchOneLoading: action.payload,
      };
    case ERROR_FETCH_One_DATA:
      return {
        ...state,
        fetchOneError: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
