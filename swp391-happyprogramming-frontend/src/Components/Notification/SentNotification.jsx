import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import UserServices from "../../services/UserServices";

import api from "../../services/BaseAuthenticationService";
import { Link, NavLink, useParams } from "react-router-dom";

var stompClient = null;
const SentNotification = () => {
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
    // stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onPrivateMessage
    );
    userJoin();
  };
  const onPrivateMessage = (payload) => {};

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
  useEffect(() => {
    if (userData.username !== "") {
      connect();
    }
  }, [userData.username]);

  const fetchUsername = async () => {
    const loginuser = await UserServices.getLoginUsername();
    const username = loginuser.data;
    setUserData((prevUserData) => ({ ...prevUserData, username: username }));
  };
  useEffect(() => {
    fetchUsername();
  }, []);

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };
  const sendPrivateValue = () => {
    if (stompClient) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // months are zero-based
      const day = currentDate.getDate();

      var chatMessage = {
        senderName: userData.username,
        receiverName: "duckm",
        message: userData.message,
        status: "MESSAGE",
        sentAt: currentDate,
        date:
        year +
          "-" +
          month +
          "-" +
          day
      };

      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      //save to db
      const Notification = {
        notificationContent:userData.message,
        notificationTime:currentDate,
        isViewed:0
      }
      console.log(Notification)
      api.post("/api/notification/save",Notification)
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <div className="send-message">
      <input
        type="text"
        className="input-message"
        placeholder="enter the message"
        value={userData.message}
        onChange={handleMessage}
      />

      <button type="button" className="send-button" onClick={sendPrivateValue}>
        send
      </button>
    </div>
  );
};

export default SentNotification;
