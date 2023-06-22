package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Notification;
import com.eikh.happyprogramming.repository.NotificationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api/notification")
public class NotificationController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    NotificationRepository notificationRepository;
    @GetMapping("/all")
    public List<Notification> getLoginUserNotification(HttpServletRequest request){
        try{
            String token=jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            List<Notification> notifications = notificationRepository.getLoginUserNotification(username);
            return notifications;
        }catch (Exception e){
            return null;
        }
    }
}
