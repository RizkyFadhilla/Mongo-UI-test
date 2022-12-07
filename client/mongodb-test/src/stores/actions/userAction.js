import { localURL, proxyURL } from "../../url";
import {
  FETCH_ALL_DATA,
  LOADING_FETCH_ALL_DATA,
  ERROR_FETCH_ALL_DATA,
  FETCH_One_DATA,
  LOADING_FETCH_One_DATA,
  ERROR_FETCH_One_DATA,
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
export const setFetchloading = (payload) => {
  return {
    type: LOADING_FETCH_ALL_DATA,
    payload: payload,
  };
};

export const setFetchOneUser = (payload) => {
  return {
    type: FETCH_One_DATA,
    payload: payload,
  };
};

export const setFetchOneError = (payload) => {
  return {
    type: ERROR_FETCH_One_DATA,
    payload: payload,
  };
};
export const setFetchOneLoading = (payload) => {
  return {
    type: LOADING_FETCH_One_DATA,
    payload: payload,
  };
};

export const fetchAllData = (sort) => {
  return async (dispatch) => {
    try {
      const response = await fetch(proxyURL + localURL, {
        method: "GET",
      });
      console.log(response)
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
      console.log(error)
      dispatch(setFetchError(error));
    } finally {
      dispatch(setFetchloading(false));
    }
  };
};
export const fetchOneUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(localURL + `${id}`, {
        method: "GET",
      });
      if (!response.ok) throw await response.json();
      const data = await response.json();
      dispatch(setFetchOneUser(data));
    } catch (error) {
      console.log(error);
      dispatch(setFetchOneError(error));
    } finally {
      dispatch(setFetchOneLoading(false));
    }
  };
};

export const updateUser = (id, input) => {
  return async () => {
    try {
      const response = await fetch(localURL + `user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(input),
      });
      if (!response.ok) {
        throw await response.json();
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
};
