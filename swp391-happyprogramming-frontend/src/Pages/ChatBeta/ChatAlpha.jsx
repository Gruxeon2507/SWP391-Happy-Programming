import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { over } from "stompjs";
import api from "../../services/BaseAuthenticationService";
import UserServices from "../../services/UserServices";
import Conversation from "../Chat/Conversation";
import NavBar from "../../Components/Navbar/NavBar";
import MessageTo from "../Chat/MessageTo";
import MessageFrom from "../Chat/MessageFrom";
import { Link, NavLink, useParams } from "react-router-dom";

var stompClient = null;
const PrivateChatRoom = () => {
  const messagesRef = useRef(null);

  const { conversationId } = useParams();
  const [conversations, setConversation] = useState([]);
  const [conversationMessages, setConversationMessages] = useState();
  const [newConversationMessage, setNewConversationMessage] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState();
  const [count, setCount] = useState(0);
  const [currentConversationMessage, setCurrentConversationMessage] = useState(
    []
  );
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: true,
    message: "",
    conversationId: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:1111/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    // stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessage);
    userJoin();
  };
  const onError = (err) => {
    console.log(err);
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  //fetch login user info
  useEffect(() => {
    //username
    const fetchUsername = async () => {
      const loginuser = await UserServices.getLoginUsername();
      const username = loginuser.data;
      setUserData((prevUserData) => ({ ...prevUserData, username: username }));
    };
    //user conversation + message
    const getUserConversation = async () => {
      //conversation
      const result = await api.get("/api/conversation/user-conversation");
      setConversation(result.data);
    };
    fetchUsername();
    getUserConversation();
  }, [conversationId]);

  useEffect(() => {
    let map = new Map(conversationMessages);
    let list = [];
    conversations.map((conversation) =>
      map.set(conversation.conversation.conversationId, list)
    );
    setConversationMessages(map);
    scrollToBottom();
  }, [conversations]);

  //fetch current conversation message
  useEffect(() => {
    if (conversationId) {
      handleTabChange(conversationId);
      api.get("/api/conversation/message/" + conversationId).then((result) => {
        setCurrentConversationMessage(result.data);
      });
    }
  }, [conversationId]);

  useEffect(() => {
    if (userData.username !== "") {
      connect();
    }
  }, [userData.username]);
  // console.log(conversations)

  //change chat room
  const handleTabChange = (newTab) => {
    if (stompClient) {
      // Unsubscribe from previous chatroom topic
      stompClient.unsubscribe(`sub-${count}`);
      const temp = count + 1;
      setCount(temp);
      // Subscribe to the new chatroom topic
      stompClient.subscribe(`/chatroom/${newTab}`, onMessageReceived);

      setNewConversationMessage([]);
      setTab(newTab);
    }
  };

  //when new message arrive
  const onMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setNewConversationMessage((prevMessages) => [...prevMessages, payloadData]);
    scrollToBottom();
  };

  //send message
  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (userData.message !== "") {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        conversationId: conversationId,
      };
      console.log(chatMessage);
      console.log("tab ne: " + tab);
      stompClient.send(
        "/chatroom/" + conversationId,
        {},
        JSON.stringify(chatMessage)
      );
      api.post("/api/conversation/sentmessage", chatMessage);
      setUserData({ ...userData, message: "" });
      scrollToBottom();
    }
  };

  useEffect(() => {
    console.log(newConversationMessage);
    scrollToBottom();
  }, [newConversationMessage]);

  const handleKeyPressSent = (event) => {
    if (event.key === "Enter") {
      sendValue();
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  return (
    <>
      <NavBar mode={1}></NavBar>
      <main className="Chat-container">
        <nav className="Conversation-List">
          <div className="seach-chat">
            <input type="text" placeholder="Search"></input>
            <ion-icon name="search-circle-outline"></ion-icon>
          </div>
          <ul>
            {conversations.map((conversation) => (
              <NavLink
                to={"/chat/" + conversation.conversation.conversationId}
                key={conversation.conversation.conversationId}
              >
                {conversation.conversation.conversationName}
              </NavLink>
            ))}
          </ul>
        </nav>
        <div className="Message-List">
          <div className="conversation-head">
            <img src={null} alt="placeholder"></img>
            <span>{conversationId}</span>
          </div>
          <div className="messages" ref={messagesRef}>
            {currentConversationMessage.map((chat) => (
              <li
                className={`message ${chat.messageKey.sentBy === userData.username && "self"
                  }`}
              >
                {chat.messageKey.sentBy !== userData.username && (
                  <div className="message-to">
                    <div className="avatar">
                      <img
                        src={
                          "http://localhost:1111/api/users/avatar/" +
                          chat.messageKey.sentBy
                        }
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="msg-text">
                      <div className="display-name-msg-to">
                        <span>{chat.messageKey.sentBy}</span>
                      </div>
                      <MessageTo message={chat.msgContent} />
                    </div>
                  </div>
                )}
                {chat.messageKey.sentBy === userData.username && (
                  <div className="message-from">
                    <div className="msg-text">
                      <MessageFrom message={chat.msgContent} />
                    </div>
                  </div>
                )}
              </li>
            ))}
            {newConversationMessage.map((chat) => (
              <li
                className={`message ${chat.senderName === userData.username && "self"
                  }`}
              >
                {chat.senderName !== userData.username && (
                  <div className="message-to">
                    <div className="avatar">
                      <img
                        src={
                          "http://localhost:1111/api/users/avatar/" +
                          chat.senderName
                        }
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="msg-text">
                      <div className="display-name-msg-to">
                        <span>{chat.senderName}</span>
                      </div>
                      <MessageTo message={chat.message} />
                    </div>
                  </div>
                )}
                {chat.senderName === userData.username && (
                  <div className="message-from">
                    <div className="msg-text">
                      <MessageFrom message={chat.message} />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </div>

          <div className="input-message">
            <button>
              <ion-icon name="add-circle-outline"></ion-icon>
            </button>
            <input
              type="text"
              placeholder="Type a message"
              value={userData.message}
              onChange={handleMessage}
              onKeyPress={handleKeyPressSent}
            ></input>
            <button>
              <ion-icon name="send" onClick={sendValue}></ion-icon>
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
export default PrivateChatRoom;
