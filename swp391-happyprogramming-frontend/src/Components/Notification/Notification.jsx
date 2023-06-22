import React, { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import UserServices from "../../services/UserServices";
import api from "../../services/BaseAuthenticationService";

var stompClient = null;

const Notification = () => {
  const [notifications, setNotification] = useState([]);
  const [newNotifications, setNewnotification] = useState([]);

  const [isViewed, setIsViewed] = useState(true);
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
        setNewnotification((prevNotification) => [
          payloadData,
          ...prevNotification
        ]);
        setIsViewed(false);
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
    const getUserNotification = async () => {
      const result = await api.get(
        "http://localhost:1111/api/notification/all"
      );
      setNotification(result.data);
      result.data.forEach((notification) => {
        if (!notification.isViewed) {
          setIsViewed(false);
        }
      });
    };
    getUserNotification();
    fetchUsername();
  }, []);

  useEffect(() => {
    if (userData.username !== "") {
      connect();
    }

    // return () => {
    //   if (stompClient) {
    //     stompClient.disconnect();
    //   }
    // };
  }, [userData.username]);

  useEffect(() => {}, [notifications]);
  console.log(newNotifications);
  return (
    <>
      <h1>notification</h1>
      <ul>
        {newNotifications.map((newNotification) => (
          <li>{newNotification.message}</li>
        ))}
        {notifications.map((notification) => (
          <li>{notification.notificationContent}</li>
        ))}
      </ul>
    </>
  );
};

export default Notification;
