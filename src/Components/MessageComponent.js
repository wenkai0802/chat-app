import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { SocketProvider, useSocketContext } from "../Context/SocketProvider";
import Contacts from "./ContactsBar";
import ConversationComponent from "./ConversationComponent";
import Conversations from "./ConversationsBar";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { addMessage } from "../Redux/Conversation/ConversationAction";
import { logOut } from "../Redux/User/UserAction";
import HttpClient from "../HttpClient";
import LogoutIcon from "@mui/icons-material/Logout";
function MessageComponent() {
  const socket = useSocketContext();
  const selectedID = useSelector((state) => state.members.selectMemberID);
  const dispatch = useDispatch();

  function Logout() {
    HttpClient({
      url: "/user/logout",
      method: "get",
    })
      .then((result) => {
        if (result.data.status === "logout") dispatch(logOut());
      })
      .catch((err) => console.log(err));
  }

  return (
    <SocketProvider>
      <div className="logout" onClick={Logout}>
        <LogoutIcon />
        Logout
      </div>
      <div className="message-component">
        <div className="tab-component">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="conversations" title="Conversations">
              <Conversations />
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <Contacts />
            </Tab>
          </Tabs>
        </div>
        <ConversationComponent />
      </div>
    </SocketProvider>
  );
}

export default MessageComponent;
