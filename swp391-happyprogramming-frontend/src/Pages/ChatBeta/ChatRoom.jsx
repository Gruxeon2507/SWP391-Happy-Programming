import React, { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import UserServices from '../../services/UserServices';

var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: true,
    message: ''
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS('http://localhost:1111/ws');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/chatroom/${tab.toLowerCase()}`, onMessageReceived);
    stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
        case "JOIN":
            if (!privateChats.get(payloadData.senderName)) {
                const updatedPrivateChats = new Map(privateChats);
                updatedPrivateChats.set(payloadData.senderName, []);
                setPrivateChats(updatedPrivateChats);
            }
            break;
        case "MESSAGE":
            setPublicChats(prevPublicChats => [...prevPublicChats, payloadData]);
            break;
    }
}

const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
        const updatedPrivateChats = new Map(privateChats);
        updatedPrivateChats.get(payloadData.senderName).push(payloadData);
        setPrivateChats(updatedPrivateChats);
    } else {
        let list = [];
        list.push(payloadData);
        const updatedPrivateChats = new Map(privateChats);
        updatedPrivateChats.set(payloadData.senderName, list);
        setPrivateChats(updatedPrivateChats);
    }
}
  

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE"
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE"
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const loginuser = await UserServices.getLoginUsername();
      const username = loginuser.data;
      setUserData((prevUserData) => ({ ...prevUserData, username: username }));
    };

    fetchUsername();
  }, []);

  useEffect(() => {
    if (userData.username !== '') {
      connect();
    }
  
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [userData.username]);

  const handleTabChange = (roomName) => {
    setTab(roomName);
    setPublicChats([]);
    setPrivateChats(new Map());
    stompClient.unsubscribe(`/chatroom/${tab.toLowerCase()}`);
    stompClient.subscribe(`/chatroom/${roomName.toLowerCase()}`, onMessageReceived);
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li onClick={() => handleTabChange("CHATROOM")} className={`member ${tab === "CHATROOM" && "active"}`}>EIKH</li>
              <li onClick={() => handleTabChange("CHATROOM1")} className={`member ${tab === "CHATROOM1" && "active"}`}>Course 1</li>
              {[...privateChats.keys()].map((name, index) => (
                <li onClick={() => handleTabChange(name)} className={`member ${tab === name && "active"}`} key={index}>{name}</li>
              ))}
            </ul>
          </div>
          <div className="chat-content">
            <ul className="chat-messages">
              {(tab === "CHATROOM" || tab === "CHATROOM1" ? publicChats : privateChats.get(tab)).map((chat, index) => (
                <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                  {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                  <div className="message-data">{chat.message}</div>
                  {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                </li>
              ))}
            </ul>

            <div className="send-message">
              <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
              {tab === "CHATROOM" || tab === "CHATROOM1" ? (
                <button type="button" className="send-button" onClick={sendValue}>send</button>
              ) : (
                <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
