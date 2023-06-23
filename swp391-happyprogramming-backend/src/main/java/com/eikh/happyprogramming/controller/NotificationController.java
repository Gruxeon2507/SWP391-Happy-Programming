package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Notification;
import com.eikh.happyprogramming.model.NotificationType;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.NotificationRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
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
    @Autowired
    UserRepository userRepository;
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

    @PostMapping("/save")
    public void saveLoginUserNofitication(@RequestParam("notificationContent") String notificationContent,
//                                          @RequestParam("notificationTime") Date notificationTime,
                                          @RequestParam("notificationTypeId") int notificationTypeId,
                                          @RequestParam("username") String username
            ,HttpServletRequest request){
        try {
            String token=jwtTokenFilter.getJwtFromRequest(request);
            String loginUsername = jwtTokenUtil.getUsernameFromToken(token);
            User loginUser = userRepository.findByUsername(loginUsername);
//            System.out.println("Username ne: "+notification.getUser().getUsername());
            if(loginUser!=null){
                Notification notification = new Notification();
                User u = new User();
                u.setUsername(username);
                NotificationType nt =new NotificationType();
                nt.setNotificationTypeId(notificationTypeId);
                LocalDate currentDate = LocalDate.now();
                Date sqlDate = Date.valueOf(currentDate);

                notification.setNotificationTime(sqlDate);
                notification.setUser(u);
                notification.setIsViewed(false);
                notification.setNotificationContent(notificationContent);
                notification.setNotificationType(nt);
                notificationRepository.save(notification);
            }
        }catch (Exception e){

        }
    }

    @PostMapping("/viewed")
    public void setViewedStatus(HttpServletRequest request){
        try {
            String token=jwtTokenFilter.getJwtFromRequest(request);
            String loginUsername = jwtTokenUtil.getUsernameFromToken(token);
            User loginUser = userRepository.findByUsername(loginUsername);
//            System.out.println("Username ne: "+notification.getUser().getUsername());
            if(loginUser!=null){
            notificationRepository.updateViewedNotification(loginUsername);
            }
        }catch (Exception e){

        }
    }
}
