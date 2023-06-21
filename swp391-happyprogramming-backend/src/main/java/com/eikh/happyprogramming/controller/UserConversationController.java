/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.chatModel.FrontendConversation;
import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/conversation")
public class UserConversationController {

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    User_ConversationRepository user_ConversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    User_ConversationRepository userConversationRepository;

    @GetMapping("/user-conversation")
    public List<FrontendConversation> getLoginUserConversation(HttpServletRequest request) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            List<User_Conversation> user_conversations = user_ConversationRepository.getLoginUserConversation(username);
            List<FrontendConversation> frontendConversations = new ArrayList<>();
            for (User_Conversation u : user_conversations) {
                if (u.getConversation().getCourse() == null) {
                    FrontendConversation temp = new FrontendConversation();
                    temp.setConversationId(u.getConversation().getConversationId());
                    User_Conversation uc = userConversationRepository.getUserOtherUserUsername(u.getConversation().getConversationId(), username);
                    temp.setConversationName(uc.getUser().getDisplayName());
                    temp.setUsername(uc.getUser().getUsername());
                    frontendConversations.add(temp);

                } else {
                    FrontendConversation temp = new FrontendConversation();
                    temp.setConversationId(u.getConversation().getConversationId());
                    temp.setConversationName(u.getConversation().getConversationName());
                    temp.setUsername("");
                    frontendConversations.add(temp);
                }
            }
            return frontendConversations;
        } catch (Exception e) {
            return null;
        }

    }

    @GetMapping("conversationname/{conversationId}")
    public FrontendConversation getConversationName(@PathVariable int conversationId, HttpServletRequest request) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            User_Conversation user_conversations = user_ConversationRepository.getUserConversationByUsernameAndConversationId(username, conversationId);
            FrontendConversation frontendConversations = new FrontendConversation();
            if (user_conversations.getConversation().getCourse() == null) {
                FrontendConversation temp = new FrontendConversation();
                temp.setConversationId(user_conversations.getConversation().getConversationId());
                User_Conversation uc = userConversationRepository.getUserOtherUserUsername(user_conversations.getConversation().getConversationId(), username);
                temp.setConversationName(uc.getUser().getDisplayName());
                temp.setUsername(uc.getUser().getUsername());
                frontendConversations = temp;

            } else {
                FrontendConversation temp = new FrontendConversation();
                temp.setConversationId(user_conversations.getConversation().getConversationId());
                temp.setConversationName(user_conversations.getConversation().getConversationName());
                temp.setUsername("");
                frontendConversations = temp;
            }
            return frontendConversations;

        } catch (Exception e) {
            return null;
        }
    }
}
