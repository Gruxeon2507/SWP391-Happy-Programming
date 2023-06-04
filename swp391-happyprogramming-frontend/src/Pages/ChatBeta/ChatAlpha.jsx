import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { over } from 'stompjs';
import api from '../../services/BaseAuthenticationService';
import UserServices from '../../services/UserServices';
import Conversation from '../Chat/Conversation';

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
        setTab(conversationId);
        setPublicChats([]);
        setUserData({ ...userData, conversationId: tab });
        stompClient.unsubscribe(`/chatroom/${tab}`);
        stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    };

    //when new message arrive
    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        const updatedConversationMessages = new Map(conversationMessages);
        updatedConversationMessages.get(payloadData.conversationId).push(payloadData);
        setConversationMessages(updatedConversationMessages);
        console.log(updatedConversationMessages + "tin nhan toi");
      };
      

    //send message
    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, message: value });
    };

    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
                conversationId: tab
            };
            console.log(chatMessage);
            console.log("tab ne: " + tab);
            stompClient.send("/chatroom/" + tab, {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    };
    console.log(conversationMessages)
    // console.log(conversations);
    return (
        <div>
            <h1>chat</h1>
            <div className="member-list">

                {conversations.map((conversation) => (
                    <div onClick={() => handleTabChange(conversation.conversation.conversationId)} className={`member ${tab === "CHATROOM" && "active"}`}>
                        {conversation.conversation.conversationName}
                    </div>
                ))}
            </div>
            <div className="chat-content">

                <div className="chat-messages">
                    {tab ?
                        <>
                            {conversationMessages.get(tab).map((chat, index) => (
                                <li
                                    className={`messeage ${chat.senderName === userData.username && "self"}`}
                                    key={index}
                                >
                                    {chat.senderName !== userData.username && (
                                        <div className="avatar">{chat.senderName}</div>
                                    )}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName === userData.username && (
                                        <div className="avatar self">{chat.senderName}</div>
                                    )}
                                </li>
                            ))}
                        </>
                        : <></>}
                </div>


                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                    <button type="button" className="send-button" onClick={sendValue}>send</button>

                </div>
            </div>
        </div>
    )
}
export default PrivateChatRoom;