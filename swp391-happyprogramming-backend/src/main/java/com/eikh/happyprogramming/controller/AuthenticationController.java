/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.AuthenticationUtils;
import com.eikh.happyprogramming.utils.EmailUtils;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    
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
    
    @PostMapping(value = "/token")
    public String checkUsernameToken(@RequestHeader("Authorization") String token) {
        return jwtTokenProvider.getUsernameFromToken(token.substring(7));
    }
    
    @PostMapping(value = "/register")
    public User registerUser(@RequestBody User user) {
        user.setPassword(AuthenticationUtils.hashPassword(user.getPassword()));
        java.util.Date today = new java.util.Date();
        java.sql.Date sqlToday = new java.sql.Date(today.getTime());
        user.setCreatedDate(sqlToday);
        String verificationCode = UUID.randomUUID().toString();
        user.setVerification_code(verificationCode);
        user.setVerified(false);
        String subject = "HAPPY PROGRAMMING - Verify your email address";
        String body = "Please click the following link to verify your email address: "
                + "http://localhost:1111/api/auth/verify?code=" + verificationCode + "&username=" + user.getUsername();
        try {
            EmailUtils.sendVerifyEmail(user.getMail(), subject, body);
        } catch (EmailException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error when send email");
        }
        return userRepository.save(user);
    }
    
    @GetMapping(value = "verify")
    public User verifyUser(@RequestParam("code") String code, @RequestParam("username") String username) {
        User user = userRepository.findByUsername(username);
        if (user.getVerification_code().equals(code)) {
            user.setVerified(true);
            user.setVerification_code("");
            return userRepository.save(user);
        } else {
            return null;
        }
    }
    
    @PostMapping(value = "forgetpassword/{username}")
    public boolean forgetPassword(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            String verificationCode = UUID.randomUUID().toString();
            user.setVerification_code(verificationCode);
            userRepository.save(user);
            String subject = "HAPPY PROGRAMMING - Reset your password";
            String body = "Please click the following link to reset your password: "
                    + "http://localhost:3000/resetpassword?code=" + verificationCode + "&username=" + user.getUsername();
            
            try {
                EmailUtils.sendVerifyEmail(user.getMail(), subject, body);
            } catch (EmailException ex) {
                Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
                System.out.println("Error when send email");
            }
        }
        return user == null;
    }
    
    @PostMapping(value = "resetpassword")
    public boolean resetPassword(MultiValueMap<String, String> formData) {
        String username = formData.getFirst("username");
        String code = formData.getFirst("code");
        User user = userRepository.findByUsername(username);
        if (user.getVerification_code().equals(code)) {
            String password = formData.getFirst("password");
            password = AuthenticationUtils.hashPassword(password);
            user.setPassword(password);
            user.setVerification_code("");
            userRepository.save(user);
            return true;
        } else {
            return false;
        }
    }
    
    @GetMapping(value = "/profile/{username}")
    public User profileUser(@PathVariable("username") String username) {
        User user = userRepository.findByUsername(username);
        user.setMail("");
        user.setPassword("");
        user.setVerification_code("");
        return user;
    }
    
    @GetMapping(value = "/{username}")
    public boolean checkUsername(@PathVariable("username") String username) {
        User user = UserRepository.findByUsername(username);
        return user != null;
    }
    
    @GetMapping(value = "/mail/{mail}")
    public boolean checkEmail(@PathVariable("mail") String mail) {
        User user = userRepository.findByMail(mail);
        return user != null;
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
