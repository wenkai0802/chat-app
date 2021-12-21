import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import io from "socket.io-client";
import { addMessage } from "../Redux/Conversation/ConversationAction";
const SocketContext = React.createContext();

const useSocketContext = () => {
  return useContext(SocketContext);
};
function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const userID = useSelector((state) => state.user.user.userID);
  const selectedID = useSelector((state) => state.conversation.selectMemberID);
  const memberList = useSelector((state) => state.members.memberList);

  const dispatch = useDispatch();

  function sendSocketMessage(conversationID, sender, text) {
    const conversationObj = memberList.find((member) => {
      return member._id === selectedID;
    });
    const members = conversationObj.members;

    //dispatch(FetchAddMessage(selectedID, userID, text));
    socket.emit("user-send-message", {
      conversationID: selectedID,
      idList: members,
      sender: userID,
      text,
    });
  }
  useEffect(() => {
    const newSocket = io("https://wetalk-api.herokuapp.com/", {
      query: { id: userID },
      transports: ["websocket"],
    });
    setSocket(newSocket);
    newSocket.on("receive-message", (message) => {
      const { conversationID, messageID, sender, text } = message;

      dispatch(addMessage(messageID, sender, text, conversationID));
    });

    return () => {
      newSocket.close();
      newSocket.off("receive-message");
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket, sendSocketMessage }}>
      {children}
    </SocketContext.Provider>
  );
}
export { useSocketContext, SocketProvider };
