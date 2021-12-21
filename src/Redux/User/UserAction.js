import HttpClient from "../../HttpClient";
import {
  FETCH_LOGIN_FAILED,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_START,
  ADD_CONTACT,
  SET_MESSAGE,
  LOG_OUT,
} from "./UserType";
export const fetchLoginRequest = (id, password) => {
  return (dispatch) => {
    dispatch(fetchLoginStart());
    HttpClient({
      method: "post",
      url: "user/login",
      data: {
        id: id,
        password: password,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.message)
          dispatch(fetchLoginFailed(result.data.message));
        else {
          dispatch(fetchLoginSuccess(result.data));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchLoginFailed(error.message));
      });
  };
};
export const fetchAddContact = (userID, targetID) => {
  return (dispatch) => {
    HttpClient({
      url: "/user/contact/add",
      method: "post",
      data: {
        userID: userID,
        targetID: targetID,
      },
    })
      .then((result) => {
        console.log(result.data);
        if (result.data.status === "success") {
          dispatch(addContact(targetID));
          dispatch(setMessage({ type: "success", text: result.data.status }));
        } else
          dispatch(setMessage({ type: "danger", text: result.data.status }));
      })
      .catch((err) => {
        dispatch(setMessage({ type: "danger", text: err.message }));
        console.log(err);
      });
  };
};

export const fetchLoginStart = () => {
  return {
    type: FETCH_LOGIN_START,
  };
};
export const fetchLoginSuccess = (user) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: user,
  };
};
export const fetchLoginFailed = (message) => {
  return {
    type: FETCH_LOGIN_FAILED,
    payload: message,
  };
};
export const addContact = (targetID) => {
  return {
    type: ADD_CONTACT,
    payload: targetID,
  };
};
export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};
export const logOut = () => {
  return {
    type: LOG_OUT,
  };
};
