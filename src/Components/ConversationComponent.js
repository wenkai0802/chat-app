import { useCallback, useEffect, useRef } from "react";
import { Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../Context/SocketProvider";
import HttpClient from "../HttpClient";
import {
  fetchMessages,
  fetchMessagesFailed,
  fetchMessagesSuccess,
  clearMessages,
  addMessage,
  FetchAddMessage,
} from "../Redux/Conversation/ConversationAction";
import Loader from "./Loader";
function ConversationComponent() {
  const { sendSocketMessage, socket } = useSocketContext();
  const selectedID = useSelector((state) => state.conversation.selectMemberID);
  const Conversations = useSelector((state) => state.conversation.messages);
  const currentPage = useSelector((state) => state.conversation.currentPage);
  const totalPages = useSelector((state) => state.conversation.totalPages);
  const loading = useSelector((state) => state.conversation.loading);
  const userID = useSelector((state) => state.user.user.userID);
  const dispatch = useDispatch();

  const messageBoxRef = useRef();
  const textRef = useRef();
  const messageRef = useCallback((ele) => {
    if (ele) {
      ele.scrollIntoView({ view: true });
    }
  }, []);

  useEffect(() => {
    dispatch(clearMessages());
    dispatch(fetchMessages(selectedID));
  }, [selectedID]);

  function scrollToTop(e) {
    if (e.target.scrollTop === 0) {
      if (currentPage < totalPages)
        dispatch(fetchMessages(selectedID, parseInt(currentPage) + 1));
    }
  }
  function sendMessage() {
    if (textRef.current.value === "") return;
    const text = textRef.current.value;
    sendSocketMessage(selectedID, userID, text);
    textRef.current.value = "";
  }

  if (selectedID === null)
    return (
      <div className="conversation-component empty">
        <h1>Welcome to WeTalk</h1>
      </div>
    );
  else
    return (
      <div className="conversation-component">
        <div className="message-box" ref={messageBoxRef} onScroll={scrollToTop}>
          {loading ? <Loader /> : null}
          {Conversations.map((convo, index) => {
            return (
              <div
                key={convo._id}
                ref={Conversations.length - 1 == index ? messageRef : null}
              >
                <div
                  className={
                    userID === convo.sender
                      ? "message message-right"
                      : "message message-left"
                  }
                >
                  <div className="conversation">
                    <p>{convo.text}</p>
                  </div>
                </div>
                <p
                  className={
                    userID === convo.sender
                      ? "sender sender-right"
                      : " sender sender-left"
                  }
                >
                  {convo.sender}
                </p>
              </div>
            );
          })}
        </div>
        <div className="message-area">
          <Form.Control
            as="textarea"
            ref={textRef}
            placeholder="Text here......."
          />

          <Button style={{ width: "100px" }} onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    );
}
export default ConversationComponent;
