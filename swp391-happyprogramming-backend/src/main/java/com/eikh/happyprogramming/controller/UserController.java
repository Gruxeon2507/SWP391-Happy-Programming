package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.AuthenticationUtils;
import com.eikh.happyprogramming.utils.DateUtils;
import com.eikh.happyprogramming.utils.EmailUtils;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author giangpt
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/auth/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    /**
     * *
     * Author: giangpthe170907
     *
     * @param user
     * @return
     */
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
                + "http://localhost:1111/api/users/verify?code=" + verificationCode +"&username=" + user.getUsername();
        try {
            EmailUtils.sendVerifyEmail(user.getMail(), subject, body);
        } catch (EmailException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error when send email");
        }
        return userRepository.save(user);
    }
    
    @GetMapping(value = "verify")
    public User verifyUser(@RequestParam("code") String code, @RequestParam("username")String username){
        User user = userRepository.findByUsername(username);
        if(user.getVerification_code().equals(code)){
            user.setVerified(true);
            user.setVerification_code("");
            return userRepository.save(user);
        }else{
            return null;
        }
    }
    
    @Scheduled(fixedRate = 3600000) // Run every hour
    public void cleanUserNotVerified(){
        List<User> users = userRepository.findByIsVerified(false);
        for (User user : users) {
            if(DateUtils.isExpired(user.getCreatedDate())){
                userRepository.delete(user);
            }
        }
    }

}
