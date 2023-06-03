/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.chatModel.Message;
import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/conversation")
public class ConverstationController {
    
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    ConversationRepository conversationRepository;
    
    @Autowired
    UserRepository userRepository;
    
    @GetMapping()
    public List<Message> getUserConversation(HttpServletRequest request){
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Conversation> conversasions =  conversationRepository.getUserConversationByUsername(username);
        List<Message> messages = new ArrayList<Message>();
        for(Conversation c : conversasions){
            Message m = new Message();
            m.setReceiverName(c.getConversationId()+"");
            messages.add(m);
        }
        return messages;
        
    }
}
