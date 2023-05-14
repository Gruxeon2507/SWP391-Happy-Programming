/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserRepository UserRepository;
        @Autowired
    private JwtTokenUtil jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User credentials, HttpServletRequest request) {
        User user = UserRepository.findByUsername(credentials.getUsername());
        if (user != null && (user.getPassword().equals(credentials.getPassword()))) {
            HttpSession session = request.getSession();
            user.setPassword("");
            String sessionId = UUID.randomUUID().toString();

            session.setAttribute("sessionId", session.getId());
            session.setAttribute("user", user);
            
            String token = jwtTokenProvider.generateToken(credentials);
            request.setAttribute("token", token);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    private final AuthenticationManager authenticationManager;
    
    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }



    @Autowired
    private UserRepository userRepository;

//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtTokenProvider.generateToken(authentication);
//
//        return ResponseEntity.ok(jwt);
//    }
    
}
