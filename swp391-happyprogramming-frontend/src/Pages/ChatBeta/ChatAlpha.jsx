import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { over } from 'stompjs';
import api from '../../services/BaseAuthenticationService';
import UserServices from '../../services/UserServices';
import Conversation from '../Chat/Conversation';
import NavBar from '../../Components/Navbar/NavBar';
import MessageTo from '../Chat/MessageTo';
import MessageFrom from '../Chat/MessageFrom';

var stompClient = null
const PrivateChatRoom = () => {
    const [conversations, setConversation] = useState([]);
    const [conversationMessages, setConversationMessages] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState();
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: true,
        message: '',
        conversationId: ''
    })

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const connect = () => {
        let Sock = new SockJS('http://localhost:1111/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }
    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        // stompClient.subscribe(`/chatroom/${tab.toLowerCase()}`, onMessageReceived);
        // stompClient.subscribe(`/user/${userData.username}/private`, onPrivateMessage);
        userJoin();
    };
    const onError = (err) => {
        console.log(err);
    };

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
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



            setConversation(result.data)
        };
        fetchUsername();
        getUserConversation();
    }, []);

    useEffect(() => {
        let map = new Map(conversationMessages);
        let list = [];
        conversations.map((conversation) => (

            map.set(conversation.conversation.conversationId, list)
        ))
        setConversationMessages(map);
    }, [conversations])

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
    // console.log(conversations)

    //change chat room
    const handleTabChange = (conversationId) => {
        if (stompClient) {
            if (tab) {
                stompClient.unsubscribe(`/chatroom/${tab}`);
            }
            stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
        }

        setTab(conversationId);
        setPublicChats([]);
        setUserData({ ...userData, conversationId: conversationId });
        setConversationMessages(new Map(conversationMessages)); // Update the state with a new instance of the Map
    };


    //when new message arrive
    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        console.log(payloadData);

        setConversationMessages((prevConversationMessages) => {
            const updatedConversationMessages = new Map(prevConversationMessages);
            const conversationId = payloadData.conversationId;

            if (updatedConversationMessages.has(conversationId)) {
                const messages = updatedConversationMessages.get(conversationId);
                updatedConversationMessages.set(conversationId, [...messages, payloadData]);
            } else {
                updatedConversationMessages.set(conversationId, [payloadData]);
            }

            return updatedConversationMessages;
        });

        console.log(conversationMessages);
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
                conversationId: tab
            };
            console.log(chatMessage);
            console.log("tab ne: " + tab);
            stompClient.send("/chatroom/" + tab, {}, JSON.stringify(chatMessage));
            api.post("/api/conversation/sentmessage",chatMessage);
            setUserData({ ...userData, message: "" });
    };
    console.log(conversationMessages)
    // console.log(conversations);
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
                        <div onClick={() => handleTabChange(conversation.conversation.conversationId)} className={`member ${tab === "CHATROOM" && "active"}`}>
                            <Conversation
                                conversationName={conversation.conversation.conversationName}
                                latestMessage={"Conversation latest message"}
                            />
                        </div>
                    ))}
                </div>
                <div className="Message-List">

                    <div className="messages">
                        {tab ?
                            <>
                                {conversationMessages.get(tab).map((chat, index) => (
                                    <li
                                        className={`messeage ${chat.senderName === userData.username && "self"}`}
                                        key={index}
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
                            </>
                            : <></>}
                    </div>

                    <div className="input-message">
                        <button>
                            <ion-icon name="add-circle-outline"></ion-icon>
                        </button>
                        <input type="text" placeholder="Type a message" value={userData.message} onChange={handleMessage}></input>
                        <button>
                            <ion-icon name="send" onClick={sendValue}></ion-icon>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default PrivateChatRoom;