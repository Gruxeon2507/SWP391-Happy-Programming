/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;


import com.eikh.happyprogramming.chatModel.Message;

import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import com.eikh.happyprogramming.modelkey.MessageKey;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.MessageRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    
    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/message/{roomId}")
    @SendTo("/chatroom/public/{roomId}")
    public Message receiveMessage(@Payload Message message, @DestinationVariable String roomId) {
        return message;
    }

    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(),"/private",message);
        System.out.println(message.toString());
        return message;
    }

    
    
}
