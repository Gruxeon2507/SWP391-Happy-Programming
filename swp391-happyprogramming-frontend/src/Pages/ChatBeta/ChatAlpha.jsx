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
import CourseServices from "../../services/CourseServices";

var stompClient = null;
const PrivateChatRoom = () => {
  const messagesRef = useRef(null);
  const inputFileRef = useRef(null);

  const { conversationId } = useParams();
  const [conversations, setConversation] = useState([]);
  const [conversationMessages, setConversationMessages] = useState();
  const [newConversationMessage, setNewConversationMessage] = useState([]);
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState();
  const [count, setCount] = useState(0);
  const [conversationName, setConversationName] = useState({});
  const [currentConversationMessage, setCurrentConversationMessage] = useState(
    []
  );



  const clearInputFile = () => {
    inputFileRef.current.value = null;
    setSelectedImage(null);
  };


  const [selectedImage, setSelectedImage] = useState(null);
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
  //conversation name
  const getConversationName = async () => {
    //conversation
    api
      .get("api/conversation/conversationname/" + conversationId)
      .then((result) => {
        setConversationName(result.data);
      });
  };

  useEffect(() => {
    getUserConversation();
    fetchUsername();
    getConversationName();
  }, []);

  //fetch login user info
  useEffect(() => {
    fetchUsername();
    getConversationName();
    getUserConversation();
  }, [conversationId]);

  useEffect(() => {
    let map = new Map(conversationMessages);
    let list = [];
    conversations.map((conversation) =>
      map.set(conversation.conversationId, list)
    );
    setConversationMessages(map);
    scrollToBottom();
  }, [conversations]);

  //fetch current conversation message
  useEffect(() => {
    if (conversationId) {
      handleTabChange(conversationId);
      api.get("/api/conversation/message/" + conversationId).then((result) => {
        console.log(result);
        setCurrentConversationMessage(result.data);
      });
    }
    getConversationName();
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
    // Check if an image is selected
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Upload the image file to the server
      api.post("/api/conversation/image", formData)
        .then((response) => {
          const imageUrl = response.data;
          // Create a message object with the image URL
          const chatMessage = {
            senderName: userData.username,
            message: imageUrl,
            status: "MESSAGE",
            conversationId: conversationId,
            contentType: "image"
          };

          stompClient.send(
            "/chatroom/" + conversationId,
            {},
            JSON.stringify(chatMessage)
          );
          api.post("/api/conversation/sentmessage", chatMessage);
          setUserData({ ...userData, message: "" });
          setSelectedImage(null);
          clearInputFile();
          scrollToBottom();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (userData.message !== "") {
      // Create a message object without an image
      const chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
        conversationId: conversationId,
        contentType: "text"
      };

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

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
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

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const getCurrentTime = () => {
    const currentDate = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return currentDate.toLocaleTimeString(undefined, options);
  }

  return (
    <>
      <NavBar mode={1}></NavBar>
      <main className="Chat-container">
        <nav className="Conversation-List">
          <div className="seach-chat">
            <input type="text" placeholder="Search"></input>
            <ion-icon name="search-circle-outline"></ion-icon>
          </div>
          <div className="lst-conv">
            <ul>
              {conversations.map((conversation) => (
                <NavLink
                  to={"/chat/" + conversation.conversationId}
                  key={conversation.conversationId}
                >
                  <img loading="lazy"
                    src={`http://localhost:1111/api/users/avatar/${conversation.username}`}
                    alt="avatar"
                  ></img>
                  <div className="conv-name">
                    <span>{conversation.conversationName}</span>
                  </div>
                </NavLink>
              ))}
            </ul>
          </div>
        </nav>
        <div className="Message-List">
          <div className="conversation-head">
            <img loading="lazy"
              src={
                "http://localhost:1111/api/users/avatar/" +
                conversationName.username
              }
              alt="placeholder"
            ></img>
            <span>{conversationName.conversationName}</span>
            {/* <span>{conversationId}</span> */}
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
                      <img loading="lazy"
                        src={
                          "http://localhost:1111/api/users/avatar/" +
                          chat.messageKey.sentBy
                        }
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="msg-text">
                      {/* <span>{chat.messageKey.sentAt}</span> */}
                      <div className="display-name-msg-to">
                        <span>{chat.messageKey.sentBy}</span>
                      </div>
                      {
                        chat.contentType === "text" ? <MessageTo message={chat.msgContent} /> : <>
                          <img loading="lazy" src={chat.msgContent} alt="sentimg" onClick={() => handleImageClick(chat.msgContent)}></img>
                        </>
                      }
                    </div>
                  </div>
                )}
                {chat.messageKey.sentBy === userData.username && (
                  <div className="message-from">

                    <div className="msg-text">
                      {
                        chat.contentType === "text" ? <MessageTo message={chat.msgContent} /> : <>
                          <img loading="lazy" src={chat.msgContent} alt="sentimg" onClick={() => handleImageClick(chat.msgContent)}></img>
                        </>
                      }
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
                      <img loading="lazy"
                        src={
                          "http://localhost:1111/api/users/avatar/" +
                          chat.senderName
                        }
                        alt="avatar"
                      ></img>
                    </div>
                    <div className="msg-text">
                      {/* <span>{chat.messageKey.sentAt}</span> */}
                      <div className="display-name-msg-to">
                        <span>{chat.senderName}</span>
                      </div>
                      {
                        chat.contentType === "text" ? <MessageTo message={chat.message} /> : <>
                          <img loading="lazy" src={chat.message} alt="sentimg" onClick={() => handleImageClick(chat.msgContent)}></img>
                        </>
                      }

                    </div>
                  </div>
                )}
                {chat.senderName === userData.username && (
                  <div className="message-from">
                    <span>{ }</span>
                    <div className="msg-text">
                      {
                        chat.contentType === "text" ? <MessageFrom message={chat.message} /> : <>
                          <img loading="lazy" src={chat.message} alt="sentimg" onClick={() => handleImageClick(chat.msgContent)}></img>
                        </>
                      }
                    </div>
                  </div>
                )}
              </li>
            ))}
          </div>

          <div className="input-message">
            <div className="attachment-button">
              <label>
                <ion-icon name="add-circle-outline"></ion-icon>
                <input ref={inputFileRef}
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleImageSelect}>
                </input>
              </label>
              {/* <div className="attachment-img">
                <label>
                  <input type="file" onChange={handleImageSelect}></input>
                  Add
                </label>
              </div> */}
            </div>
            <div className="msg-text-input">
              <div className="input-inner">
                {selectedImage ?
                  <>
                    <img loading="lazy" src={URL.createObjectURL(selectedImage)}></img>
                    {/* <span>{selectedImage.name}</span> */}
                    <ion-icon onClick={clearInputFile} name="close-outline"></ion-icon>
                  </> : <></>}
                <input
                  type="text"
                  placeholder="Type a message"
                  value={userData.message}
                  onChange={handleMessage}
                  onKeyPress={handleKeyPressSent}
                ></input>
              </div>
            </div>
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
