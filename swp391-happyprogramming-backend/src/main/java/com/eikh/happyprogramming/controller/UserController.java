package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.AuthenticationUtils;
import com.eikh.happyprogramming.utils.DateUtils;
import com.eikh.happyprogramming.utils.EmailUtils;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.List;
import java.util.UUID;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
 * @author giangpt
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/users")
public class UserController {

    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    JwtTokenUtil jwtTokenUtil;


    @PostMapping("/profile/update")
    public User updateProfile(@RequestHeader("Authorization") String token,@RequestBody User user){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        if(user.getUsername().equals(username)){
            User updateUser = userRepository.findByUsername(username);
            updateUser.setDisplayName(user.getDisplayName());
            updateUser.setDob(user.getDob());
            return userRepository.save(updateUser);
        }else{
            return null;
        }
    }
    
    @PostMapping("/profile/changepassword")
    public User changePassword(@RequestHeader("Authorization") String token,@RequestParam("newPassword") String newPassword, @RequestParam("oldPassword") String oldPassword){
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        User user = userRepository.findByUsername(username);
        if(user.getPassword().equals(oldPassword) || AuthenticationUtils.checkPassword(oldPassword, user.getPassword())){
            user.setPassword(AuthenticationUtils.hashPassword(newPassword));
            return userRepository.save(user);
        }else{
            return null;
        }
    }
    
    @Scheduled(fixedRate = 3600000) // Run every hour
    public void cleanUserNotVerified(){
        List<User> users = userRepository.findByIsVerified(false);
        for (User user : users) {
            if(user.getCreatedDate() != null && DateUtils.isExpired(user.getCreatedDate())){
                userRepository.delete(user);
            }
        }
    }

}
