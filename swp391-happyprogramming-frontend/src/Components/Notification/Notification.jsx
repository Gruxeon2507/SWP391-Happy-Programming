import React, { useEffect, useState, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import UserServices from "../../services/UserServices";
import api from "../../services/BaseAuthenticationService";
import notiIcon from "../../Assets/NotiIcon_512x512.png"
import { NavLink } from "react-router-dom";

var stompClient = null;

const Notification = () => {
  const toggleRef = useRef(null);
  const [notifications, setNotification] = useState([]);
  const [newNotifications, setNewnotification] = useState([]);

  const [openNotiList, setOpenNotiList] = useState(false);

  const [isViewed, setIsViewed] = useState(true);

  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: true,
    message: "",
  });


  useEffect(() => {
    let handler = (e) => {
      try {
        if (!toggleRef.current.contains(e.target)) {
          setOpenNotiList(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    document.addEventListener("mousedown", handler);
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

  useEffect(() => { }, [notifications]);
  console.log(newNotifications);

  const setViewedStatus = () =>{
    api.post("/api/notification/viewed")
  }

  const notiClass = !isViewed ? "viewMark " : "viewMark view";

  const notiListClass = openNotiList ? "noti-list active" : "noti-list";

  return (
    <div className="noti-container" ref={toggleRef} onClick={() => {
      setOpenNotiList(!openNotiList);
      setIsViewed(true);
      setViewedStatus();
    }}>
      {/* <span>view?{isViewed ? "t" : "f"} </span> */}
      <div className="noti-toggle">
        <img src={notiIcon}></img>
      </div>
      <div className={notiClass}></div>

      <div className={notiListClass}>
        <span>Notification</span>
        <ul>
          {newNotifications.map((newNotification) => (
            <li>
              <NavLink to={"/"}>{newNotification.message}
              <br></br>
              {newNotification.date}
              </NavLink>
            </li>
          ))}
          {notifications.map((notification) => (
            <li>
              <NavLink to={"/"}>{notification.notificationContent}
              <br></br>
              {notification.notificationTime}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
