import React, { Component } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import SettingDrawer from "../../Components/SettingDrawer/SettingDrawer";
import "./Chat.css";

function Chat(props) {
  return (
    <div>
      <NavBar mode={0} />
      <div className="Chat-container">
        <div className="Conversation-List">
          <div className="seach-chat">
            <input type="text" placeholder="search"></input>
            <button>
              <ion-icon name="search-circle-outline"></ion-icon>
            </button>
          </div>
          <br></br>
          <br></br>
          list cac conversation
          <div>dong 1</div>
          <div>dong 2</div>
          <div>dong 3</div>
        </div>
        <div className="Message-List">
          <div className="messages"></div>
          <div className="input-message">
            <button>
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            <input type="text" placeholder="type here"></input>
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
