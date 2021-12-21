import {
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILED,
  CLEAR_MESSAGES,
  ADD_MESSAGE,
  SELECT_CONVERSATION,
} from "./ConversationType";
import HttpClient from "../../HttpClient";
export const fetchMessages = (selectedID, pageNumber = 1) => {
  return (dispatch) => {
    dispatch(fetchMessageStart());
    HttpClient({
      url: `/conversation/messages/?_id=${selectedID}&page=${pageNumber}`,
      method: "get",
    })
      .then((result) => {
        dispatch(fetchMessagesSuccess(result.data));
      })
      .catch((err) => {
        dispatch(fetchMessagesFailed());
      });
  };
};
export const FetchAddMessage = (id, sender, text) => {
  return (dispatch) => {
    HttpClient({
      url: "/conversation/messages",
      method: "put",
      data: {
        id: id,
        sender: sender,
        text: text,
      },
    })
      .then((res) => {
        if (res.data.status === "success") {
          dispatch(clearMessages());
          dispatch(fetchMessages(id, 1));
        }
      })
      .catch((err) => console.log(err.message));
  };
};

export const addMessage = (id, sender, text, conversationID) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      id: id,
      sender: sender,
      text: text,
      conversationID: conversationID,
    },
  };
};
export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
export const fetchMessageStart = () => {
  return {
    type: FETCH_MESSAGES_START,
  };
};
export const fetchMessagesSuccess = (response) => {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: response,
  };
};
export const selectConversation = (id) => {
  return {
    type: SELECT_CONVERSATION,
    payload: id,
  };
};
export const fetchMessagesFailed = () => {
  return {
    type: FETCH_MESSAGES_FAILED,
  };
};
