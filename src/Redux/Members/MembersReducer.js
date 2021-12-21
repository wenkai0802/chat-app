import {
  CREATE_CONVERSATION,
  FETCH_MEMBERS_FAILED,
  FETCH_MEMBERS_START,
  FETCH_MEMBERS_SUCCESS,
  SELECT_CONVERSATION,
  SET_ERROR_MESSAGE,
} from "./MembersType";

const initialState = {
  loading: false,
  errorMessage: null,
  memberList: [],
};
const MembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MEMBERS_START:
      return { ...state, loading: true };
    case FETCH_MEMBERS_SUCCESS:
      return { ...state, loading: false, memberList: action.payload };
    case FETCH_MEMBERS_FAILED:
      return { ...state, loading: false, memberList: [] };
    case CREATE_CONVERSATION:
      const newMemberList = state.memberList;
      newMemberList.push(action.payload);
      console.log(newMemberList);
      return {
        ...state,
        memberList: newMemberList,
        selectMemberID: action.payload._id,
      };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return { ...state };
  }
};
export default MembersReducer;
