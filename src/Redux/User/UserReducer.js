import {
  FETCH_LOGIN_START,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILED,
  ADD_CONTACT,
  SET_MESSAGE,
  LOG_OUT,
} from "./UserType";

const initialState = {
  user: {},
  message: null,
  loading: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        message: null,
        loading: false,
      };
    case FETCH_LOGIN_FAILED:
      return {
        ...state,
        user: {},
        loading: false,
        message: action.payload,
      };
    case ADD_CONTACT:
      const { user } = state;
      if (user.contact) user.contact.push(action.payload);
      return {
        ...state,
        user: user,
      };
    case LOG_OUT:
      return {
        user: {},
        message: null,
        loading: false,
      };
    case SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default userReducer;
