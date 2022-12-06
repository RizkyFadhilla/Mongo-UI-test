import { localURL } from "../../url";
import {
  FETCH_ALL_DATA,
  LOADING_FETCH_ALL_DATA,
  ERROR_FETCH_ALL_DATA,
} from "./actionTypes";
export const fetchSuccess = (payload) => {
  return {
    type: FETCH_ALL_DATA,
    payload: payload,
  };
};
export const setFetchError = (payload) => {
  return {
    type: ERROR_FETCH_ALL_DATA,
    payload: payload,
  };
};
export const setFetchoading = (payload) => {
  return {
    type: LOADING_FETCH_ALL_DATA,
    payload: payload,
  };
};

export const fetchAllData = (sort) => {
  return async (dispatch) => {
    try {
      const response = await fetch(localURL, {
        method: "GET",
      });
      if (!response.ok) throw await response.json();

      const data = await response.json();
      if (sort === "name") {
        data.sort((a, b) => {
          const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
          const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });
      }
      if (sort === "gender") {
        data.sort((a, b) => {
          const genderA = a.gender.toUpperCase(); // ignore upper and lowercase
          const genderB = b.gender.toUpperCase(); // ignore upper and lowercase
          if (genderA < genderB) {
            return -1;
          }
          if (genderA > genderB) {
            return 1;
          }
          // genders must be equal
          return 0;
        });
      }
      if (sort === "address") {
        data.sort((a, b) => {
          return b.addr.length - a.addr.length;
        });
      }
      dispatch(fetchSuccess(data));
    } catch (error) {
      console.log(error);
      dispatch(setFetchError(error));
    } finally {
      dispatch(setFetchoading(false));
    }
  };
};
