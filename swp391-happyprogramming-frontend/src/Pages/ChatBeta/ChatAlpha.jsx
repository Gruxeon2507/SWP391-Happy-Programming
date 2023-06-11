import axios from "axios";
import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { over } from "stompjs";
import api from "../../services/BaseAuthenticationService";
import UserServices from "../../services/UserServices";
import Conversation from "../Chat/Conversation";
import NavBar from "../../Components/Navbar/NavBar";
import MessageTo from "../Chat/MessageTo";
import MessageFrom from "../Chat/MessageFrom";
import { Link, useParams } from "react-router-dom";

var stompClient = null;
const PrivateChatRoom = () => {
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
    stompClient.subscribe(`/chatroom/${tab}`, onMessageReceived);
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
      const temp = count + 1
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
    console.log("set tin nhan");
    setNewConversationMessage((prevMessages) => [...prevMessages, payloadData]);
  };

  //send message
  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
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
  };

  useEffect(() => {
    console.log(newConversationMessage);
  }, [newConversationMessage]);
  return (
    <div>
      <div className="Chat-container">
        <div className="Conversation-List">
          <div className="seach-chat">
            <input type="text" placeholder="Search"></input>
            <button>
              <ion-icon name="search-circle-outline"></ion-icon>
            </button>
          </div>
          {conversations.map((conversation) => (
            <li key={conversation.conversation.conversationId}>
              <Link to={"/chat/" + conversation.conversation.conversationId}>
                {conversation.conversation.conversationName}
              </Link>
            </li>
          ))}
        </div>
        <div className="Message-List">
          <div className="messages">
            {currentConversationMessage.map((chat) => (
              <li
                className={`message ${chat.messageKey.sentBy === userData.username && "self"
                  }`}
              >
                {chat.messageKey.sentBy !== userData.username && (
                  <div>
                    <div className="avatar">{chat.messageKey.sentBy}</div>
                    <MessageTo message={chat.msgContent} />
                  </div>
                )}
                {chat.messageKey.sentBy === userData.username && (
                  <div>
                    <div className="avatar">{chat.messageKey.sentBy}</div>
                    <MessageFrom message={chat.msgContent} />
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
                  <div>
                    <div className="avatar">{chat.senderName}</div>
                    <MessageTo message={chat.message} />
                  </div>
                )}
                {chat.senderName === userData.username && (
                  <div>
                    <div className="avatar">{chat.senderName}</div>
                    <MessageFrom message={chat.message} />
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
            ></input>
            <button>
              <ion-icon name="send" onClick={sendValue}></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PrivateChatRoom;
