/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
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
public class UserConversationController {
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    User_ConversationRepository user_ConversationRepository;
    
    @Autowired
    UserRepository userRepository;
    
        
    @GetMapping("/user-conversation")
    public List<User_Conversation> getLoginUserConversation(HttpServletRequest request){
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        
        return user_ConversationRepository.getLoginUserConversation(username);
    }
}
