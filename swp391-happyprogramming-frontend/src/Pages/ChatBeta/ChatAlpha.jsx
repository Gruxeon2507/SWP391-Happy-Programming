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
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: true,
        message: ''
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

    //fetch login user
    useEffect(() => {
        const fetchUsername = async () => {
            const loginuser = await UserServices.getLoginUsername();
            const username = loginuser.data;
            setUserData((prevUserData) => ({ ...prevUserData, username: username }));
        };
        const getUserConversation = async () => {
            const result = await api.get("/api/conversation/user-conversation");
            setConversation(result.data)
        };
        fetchUsername();
        getUserConversation();
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
    console.log(conversations)

    //change chat room
    const handleTabChange = (conversationId) => {
        setTab(conversationId);
        setPublicChats([]);
        stompClient.unsubscribe(`/chatroom/${tab}`);
        stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    };

    //when new message arrive
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

    return(
        <div>
            <h1>chat</h1>
            { conversations.map((conversation)=>(
                <div onClick={() => handleTabChange(conversation.conversation.conversationId)} className={`member ${tab === "CHATROOM" && "active"}`}>
                    {conversation.conversation.conversationName}
                </div>
            ))}
        </div>
    )
}
export default PrivateChatRoom;