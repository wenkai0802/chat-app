import { combineReducers } from "redux";
import ConversationReducer from "./Conversation/ConversationReducer";
import MembersReducer from "./Members/MembersReducer";
import userReducer from "./User/UserReducer";

const rootReducer = combineReducers({
  user: userReducer,
  members: MembersReducer,
  conversation: ConversationReducer,
});

export default rootReducer;
