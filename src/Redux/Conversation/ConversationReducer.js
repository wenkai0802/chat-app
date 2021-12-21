import {
  FETCH_MESSAGES_START,
  FETCH_MESSAGES_FAILED,
  FETCH_MESSAGES_SUCCESS,
  CLEAR_MESSAGES,
  ADD_MESSAGE,
  SELECT_CONVERSATION,
} from "./ConversationType";

const initialState = {
  currentPage: 0,
  messages: [],
  totalPages: 0,
  loading: false,
  selectMemberID: null,
};

const ConversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_START:
      return { ...state, loading: true };
    case FETCH_MESSAGES_SUCCESS:
      const { messages, page, totalPages } = action.payload;
      const newMessages = [...messages, ...state.messages];
      return {
        ...state,
        currentPage: page,
        messages: newMessages,
        totalPages: totalPages,
        loading: false,
      };
    case FETCH_MESSAGES_FAILED:
      return { ...state, loading: false };
    case CLEAR_MESSAGES:
      return { ...state, messages: [], currentPage: 0, totalPages: 0 };
    case ADD_MESSAGE:
      const { sender, text, id, conversationID } = action.payload;
      if (conversationID === state.selectMemberID) {
        return {
          ...state,
          messages: [
            ...state.messages,
            { sender: sender, text: text, _id: id },
          ],
        };
      } else {
        return { ...state };
      }
    case SELECT_CONVERSATION:
      return { ...state, selectMemberID: action.payload };
    default:
      return { ...state };
  }
};

export default ConversationReducer;
