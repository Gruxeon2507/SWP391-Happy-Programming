import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import UserServices from "../../services/UserServices";

var stompClient = null;

const Notification = () => {
  const[notification,setNotification] = useState([]);
  const[isViewed,setIsViewed] = useState(true);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: true,
    message: "",
  });
  const connect = () => {
    let Sock = new SockJS("http://localhost:1111/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };
  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      `/user/${userData.username}/private`,
      onNotificationReceived
    );
    userJoin();
  };
  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };
  const onNotificationReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        break;
      case "MESSAGE":
        break;
    }
  };
  const onError = (err) => {
    console.log(err);
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const loginuser = await UserServices.getLoginUsername();
      const username = loginuser.data;
      setUserData((prevUserData) => ({ ...prevUserData, username: username }));
    };
    const getUserNotification = async () =>{
      const result = await api.get("");  
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
  return(
    <>
    </>
  );
};

export default Notification;
