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
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.server.PathParam;
import javax.websocket.server.PathParam;

import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author kmd
 */
@CrossOrigin(origins = { "*" })
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private JwtTokenUtil jwtTokenProvider;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    
    private final String AVT_UPLOAD_DIR = "/avatar/";
    private final String PDF_UPLOAD_DIR = "/pdf/";

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User credentials, HttpServletRequest request) {
        User user = UserRepository.findByUsername(credentials.getUsername());
        if (user != null && user.isVerified() &&  ((user.getPassword().equals(credentials.getPassword()))
                || AuthenticationUtils.checkPassword(credentials.getPassword(), user.getPassword()))) {
            HttpSession session = request.getSession();
            user.setPassword("");
            String sessionId = UUID.randomUUID().toString();

            session.setAttribute("sessionId", session.getId());
            session.setAttribute("user", user);

            String token = jwtTokenProvider.generateToken(credentials);
            String role = user.getRoles().get(0).getRoleName();
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", role);

            return ResponseEntity.ok(response);
        }else if(user!=null &&  ((user.getPassword().equals(credentials.getPassword()))
                || AuthenticationUtils.checkPassword(credentials.getPassword(), user.getPassword()))){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping(value = "/register")
    public User registerUser(@RequestBody User user) throws FileNotFoundException {
        user.setPassword(AuthenticationUtils.hashPassword(user.getPassword()));
        java.util.Date today = new java.util.Date();
        java.sql.Date sqlToday = new java.sql.Date(today.getTime());
        user.setCreatedDate(sqlToday);
        String verificationCode = AuthenticationUtils.generateRandomCode(6);
        user.setVerification_code(verificationCode);
        user.setVerified(false);
        user.setAvatarPath("default.jpg");
//        String fileName = StringUtils.cleanPath(user.getUsername()+ ".jpg");
//        File file = new File(AVT_UPLOAD_DIR+"default.jpg");
//        File desFile = new File(AVT_UPLOAD_DIR+user.getUsername()+".jpg");
//        try {
//            Files.copy(file.toPath(), desFile.toPath(),StandardCopyOption.REPLACE_EXISTING);
//        } catch (Exception e) {
//            System.out.println("Error when copy files");
//        }
        
        UserRepository.save(user);
        userRepository.insertRole(user.getUsername());
        String subject = "HAPPY PROGRAMMING - Verify your email address";
        // String body = "Please click the following link to verify your email address:
        // "
        // + "http://localhost:1111/api/auth/verify?code=" + verificationCode +
        // "&username=" + user.getUsername();
        String body = "It is your OTP code: " + verificationCode;
        try {
            EmailUtils.sendVerifyEmail(user.getMail(), subject, body);
        } catch (EmailException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error when send email");
        }
        return userRepository.save(user);
    }

    @PostMapping(value = "verify")
    public User verifyUser(@RequestParam("code") String code, @RequestParam("username") String username) {
        User user = userRepository.findByUsername(username);
        if (user.getVerification_code().equals(code)) {
            user.setVerified(true);
            user.setActiveStatus(true);
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
            String verificationCode = AuthenticationUtils.generateRandomCode(6);
            user.setVerification_code(verificationCode);
            userRepository.save(user);
            String subject = "HAPPY PROGRAMMING - Reset your password";
            // String body = "Please click the following link to reset your password: "
            // + "http://localhost:3000/resetpassword?code=" + verificationCode +
            // "&username=" + user.getUsername();
            String body = "It is your OTP code: " + verificationCode;
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
    public boolean resetPassword(@RequestParam("username") String username,
            @RequestParam("code") String code,
            @RequestParam("password") String password) {
        User user = userRepository.findByUsername(username);
        if (user.getVerification_code().equals(code)) {
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
        user.setPassword("");
        user.setVerification_code("");
        return user;
    }

    @GetMapping(value = "/{username}")
    public boolean checkUsername(@PathVariable("username") String username) {
        User user = UserRepository.findByUsername(username);
        return user != null;
    }

    @PostMapping(value = "/token")
    public String checkUsernameToken(@RequestHeader("Authorization") String token) {
        return jwtTokenProvider.getUsernameFromToken(token.substring(7));
    }

    @GetMapping(value = "/mail/{mail}")
    public boolean checkEmail(@PathVariable("mail") String mail) {
        User user = userRepository.findByMail(mail);
        return user != null;
    }

    @Autowired
    private UserRepository userRepository;

    // @PostMapping("/login")
    // public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
    // Authentication authentication = authenticationManager.authenticate(
    // new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
    // loginRequest.getPassword())
    // );
    //
    // SecurityContextHolder.getContext().setAuthentication(authentication);
    // String jwt = jwtTokenProvider.generateToken(authentication);
    //
    // return ResponseEntity.ok(jwt);
    // }
}
