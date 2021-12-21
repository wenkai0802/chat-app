import {
  CREATE_CONVERSATION,
  FETCH_MEMBERS_FAILED,
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  SET_ERROR_MESSAGE,
} from "./MembersType";
import HttpClient from "../../HttpClient";
export const fetchCreateConversation = (selectedUsers) => {
  return (dispatch, getState) => {
    const userID = getState().user.user.userID;
    const idList = [...selectedUsers, userID];
    HttpClient({
      url: "/conversation/members",
      method: "post",
      data: {
        idList: idList,
      },
    })
      .then((result) => {
        if (result.data.status === "success") {
          dispatch(createConversation(result.data._id, idList));
          dispatch(
            setErrorMessage({ type: "success", text: result.data.status })
          );
        } else
          dispatch(
            setErrorMessage({ type: "danger", text: result.data.status })
          );
      })
      .catch((err) => {
        dispatch(setErrorMessage({ type: "danger", text: err.message }));
      });
  };
};
export const fetchMembers = () => {
  return (dispatch) => {
    dispatch(fetchMemberStart);
    HttpClient({
      url: `/conversation/members`,
      method: "get",
    })
      .then((result) => {
        dispatch(fetchMemberSuccess(result.data));
      })
      .catch((err) => {
        dispatch(fetchMemberFailed());
      });
  };
};
export const fetchMemberStart = () => {
  return {
    type: FETCH_MEMBERS_START,
  };
};
export const fetchMemberSuccess = (memberList) => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: memberList,
  };
};
export const fetchMemberFailed = () => {
  return {
    type: FETCH_MEMBERS_FAILED,
  };
};
export const createConversation = (id, members) => {
  return {
    type: CREATE_CONVERSATION,
    payload: { _id: id, members: members },
  };
};

export const setErrorMessage = (message) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
};
