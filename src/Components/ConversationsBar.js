import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import HttpClient from "../HttpClient";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMemberSuccess,
  fetchMembers,
} from "../Redux/Members/MembersAction";
import { selectConversation } from "../Redux/Conversation/ConversationAction";
import ConversationModal from "./ConversationModal";
function Conversations() {
  const conversations = useSelector((state) => state.members.memberList);
  const userID = useSelector((state) => state.user.user.userID);
  const selectedID = useSelector((state) => state.conversation.selectMemberID);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispatch(fetchMembers());
  }, []);
  return (
    <div className="tab">
      <ConversationModal show={show} handleClose={handleClose} />
      <div className="btn-container">
        <Button className="btn-add" onClick={handleShow}>
          Add Conversation
        </Button>
      </div>
      <div className="list">
        {conversations.map((convo) => {
          const newConvoMembers = convo.members.filter(
            (member) => member !== userID
          );
          return (
            <div
              className="contact-name"
              key={convo._id}
              onClick={() => dispatch(selectConversation(convo._id))}
              style={{
                backgroundColor:
                  selectedID === convo._id
                    ? "rgba(168, 230, 223, 0.7)"
                    : "white",
              }}
            >
              {newConvoMembers.join(",")}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Conversations;
