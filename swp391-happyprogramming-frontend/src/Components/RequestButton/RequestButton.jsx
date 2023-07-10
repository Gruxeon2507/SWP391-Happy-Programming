import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import ParticipateServices from "../../services/ParticipateServices";
import { useParams, useNavigate, Link } from "react-router-dom";
import RequestService from "../../services/RequestService";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import api from "../../services/BaseAuthenticationService";
var stompClient = null;
const RequestButton = ({ courseID, courseName }) => {
    console.log("truyen sang ", courseID);
    const [participateStatus, setParticipateStatus] = useState(-1);
    const [isClick, setIsClick] = useState(true);
    const cancelRequest = async () => {
        setClickedButtonId(courseID);
        await RequestService.deleteParticipateDeleteRequest(courseID);
        window.location.reload();
    };
    const [clickedButtonId, setClickedButtonId] = useState(null);
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: true,
        message: "",
        conversationId: "",
    });
    const handleRequest = async () => {
        setClickedButtonId(courseID);
        if (localStorage.getItem("token")) {
            try {
                await RequestService.insertParticipateInsertRequest(courseID);
                const result = await CourseServices.getMentorsOfCourse(courseID);
                result.data.map((mentor) => {
                    sendPrivateValue(
                        mentor.username,
                        "You Have A New Request For the Course: " + courseName,
                        "/request/manage"
                    );
                });

                return (
                    <span>
                        {participateStatus == -1 ? (
                            <>
                                <div>
                                    <button disabled={clickedButtonId === courseID}
                                        style={{
                                            border: "4px solid var(--item2)",
                                            color: "var(--item2)",
                                        }}
                                        id="requestBttn"
                                        onClick={() => handleRequest()}>
                                        Request
                                    </button>
                                </div>
                            </>
                        ) : participateStatus == 0 ? (
                            <>
                                <div disabled={clickedButtonId === courseID} onClick={() => cancelRequest(courseID)}>
                                    <button
                                        id="requestBttn"
                                        style={{
                                            border: "4px solid var(--item)",
                                            color: "var(--item)",
                                        }}
                                    >
                                        Cancel request
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <button
                                        id="requestBttn"
                                        style={{
                                            border: "4px solid var(--item2)",
                                            color: "var(--item2)",
                                        }}
                                        disabled={clickedButtonId === courseID}
                                    >
                                        <Link to={"/courses/feed/" + courseID}>Go to course</Link>
                                    </button>
                                </div>
                            </>
                        )}
                    </span>
                );
                userJoin();
            };
            const onPrivateMessage = (payload) => { };

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
            const sendPrivateValue = (username, message, url) => {
                if (stompClient) {
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = currentDate.getMonth() + 1; // months are zero-based
                    const day = currentDate.getDate();

                    var chatMessage = {
                        senderName: userData.username,
                        receiverName: username,
                        message: message,
                        status: "MESSAGE",
                        sentAt: currentDate,
                        url: url,
                        date: year + "-" + month + "-" + day,
                    };

                    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

                    //   const Notification = {
                    //     notificationContent:message,
                    //     notificationTime:currentDate,
                    //     isViewed:0,
                    //     notificationType:{
                    //         notificationTypeId:1
                    //     },
                    //     user:{
                    //         username:username
                    //     }
                    //   }
                    const Notification = new FormData();
                    Notification.append("notificationContent", message);
                    Notification.append("notificationTime", currentDate);
                    Notification.append("notificationTypeId", 1);
                    Notification.append("username", username);
                    Notification.append("url", url);
                    api.post("/api/notification/save", Notification);
                    setUserData({ ...userData, message: "" });
                }
            };

            return (
                <span>
                    {participateStatus == -1 ? (
                        <>
                            <div>
                                <button
                                    disabled={clickedButtonId === courseID}
                                    id="requestBttn"
                                    onClick={() => handleRequest()}
                                >
                                    Request
                                </button>
                            </div>
                        </>
                    ) : participateStatus == 0 ? (
                        <>
                            <div
                                disabled={clickedButtonId === courseID}
                                onClick={() => cancelRequest(courseID)}
                            >
                                <button
                                    id="requestBttn"
                                    style={{
                                        border: "4px solid var(--item2)",
                                        color: "var(--item2)",
                                    }}
                                >
                                    Cancel request
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <button
                                    id="requestBttn"
                                    style={{
                                        border: "4px solid var(--item2)",
                                        color: "var(--item2)",
                                    }}
                                    disabled={clickedButtonId === courseID}
                                >
                                    <Link to={"/courses/feed/" + courseID}>Go to course</Link>
                                </button>
                            </div>
                        </>
                    )}
                </span>
            );
        };

        export default RequestButton;
