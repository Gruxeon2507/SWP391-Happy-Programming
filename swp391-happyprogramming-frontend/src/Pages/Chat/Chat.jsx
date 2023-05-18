import React, { useEffect, useRef } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import SettingDrawer from "../../Components/SettingDrawer/SettingDrawer";
import "./Chat.css";
import "../Chat/Message.css";
import MessageTo from "./MessageTo";
import MessageFrom from "./MessageFrom";
import Conversation from "./Conversation";

function Chat(props) {
  const messagesRef = useRef(null);

  useEffect(() => {
    const messagesContainer = messagesRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, []);

  return (
    <div>
      <NavBar mode={0} />
      <div className="Chat-container">
        <div className="Conversation-List">
          <div className="seach-chat">
            <input type="text" placeholder="Search"></input>
            <button>
              <ion-icon name="search-circle-outline"></ion-icon>
            </button>
          </div>
          {/* thêm conversation ở đây */}
          <Conversation
            conversationName={"ten nguoi gui"}
            latestMessage={"Conversation latest message"}
          />
          <Conversation
            conversationName={"conversationName"}
            latestMessage={"latest message"}
          />
        </div>
        <div className="Message-List">
          <div className="messages" ref={messagesRef}>
            {/* thêm message ở đây */}
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo message={"Message To"} />
            <MessageTo
              message={
                "Message To: with props pass to mot cau gi do that dai de test xuong dong"
              }
            />
            <MessageFrom message={"Message From"} />
          </div>
          <div className="input-message">
            <button>
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            <input type="text" placeholder="Type a message"></input>
            <button>
              <ion-icon name="send"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
