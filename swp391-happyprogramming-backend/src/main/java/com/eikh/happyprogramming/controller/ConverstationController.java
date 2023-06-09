/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.chatModel.Message;
import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.modelkey.MessageKey;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.MessageRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    User_ConversationRepository userConversationRepository;
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

    @PostMapping("/sentmessage")
    public ResponseEntity<?> sentMessage(HttpServletRequest request, @RequestBody Message message){
        try{
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if(username.equals(message.getSenderName())){
                com.eikh.happyprogramming.model.Message m = new com.eikh.happyprogramming.model.Message();
                MessageKey mk = new MessageKey();
                mk.setConversationId(message.getConversationId());
                mk.setSentBy(message.getSenderName());

                Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
                mk.setSentAt(currentTimestamp);

                m.setMessageKey(mk);
                m.setConversation(conversationRepository.findByConversationId(message.getConversationId()));
                m.setMsgContent(message.getMessage());
                m.setUser(userRepository.findByUsername(message.getSenderName()));
                messageRepository.save(m);
                return ResponseEntity.ok(m);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        }

    }

    @GetMapping("/message/{conversationId}")
    public ResponseEntity<?> getCurrentConversationMessage(HttpServletRequest request,@PathVariable int conversationId){
        try{
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            User_Conversation uc = userConversationRepository.getUserConversationByUsernameAndConversationId(username,conversationId);
            if(uc!=null){
                return ResponseEntity.ok(messageRepository.getUserConversationMessage(conversationId));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
