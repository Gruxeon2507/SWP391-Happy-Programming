package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Role;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.AuthenticationUtils;
import com.eikh.happyprogramming.utils.DateUtils;
import com.eikh.happyprogramming.utils.EmailUtils;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import com.eikh.happyprogramming.utils.PasswordUtils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
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
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @PostMapping("/profile/update")
    public User updateProfile(@RequestHeader("Authorization") String token, @RequestBody User user) {
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        if (user.getUsername().equals(username)) {
            User updateUser = userRepository.findByUsername(username);
            updateUser.setDisplayName(user.getDisplayName());
            updateUser.setDob(user.getDob());
            return userRepository.save(updateUser);
        } else {
            return null;
        }
    }

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
                + "http://localhost:1111/api/users/verify?code=" + verificationCode + "&username=" + user.getUsername();
        try {
            EmailUtils.sendVerifyEmail(user.getMail(), subject, body);
        } catch (EmailException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error when send email");
        }
        return null;
    }

    @PostMapping("/profile/changepassword")
    public User changePassword(@RequestHeader("Authorization") String token, @RequestParam("newPassword") String newPassword, @RequestParam("oldPassword") String oldPassword) {
        String username = jwtTokenUtil.getUsernameFromToken(token.substring(7));
        User user = userRepository.findByUsername(username);
        if (user.getPassword().equals(oldPassword) || AuthenticationUtils.checkPassword(oldPassword, user.getPassword())) {
            user.setPassword(AuthenticationUtils.hashPassword(newPassword));
            return user;
        } else {
            return null;
        }
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

    @Scheduled(fixedRate = 3600000) // Run every hour
    public void cleanUserNotVerified() {
        List<User> users = userRepository.findByIsVerified(false);

        for (User user : users) {
            if (user.getCreatedDate() != null && DateUtils.isExpired(user.getCreatedDate())) {
                userRepository.delete(user);
            }
        }
    }

    private final String AVT_UPLOAD_DIR = "/avatar/";

    //Date: 22/05/2023
    //Function: Upload Avatar
    //Writen By:DucKM
    @PostMapping("/avatar/upload")
    public void uploadFile(@RequestParam("avatarPath") MultipartFile file, @RequestParam("username") String username) {
        String fileExtension = getFileExtension(file.getOriginalFilename());
        if ((fileExtension.equalsIgnoreCase("jpg")) && file.getSize() < 5000000) {
            String fileName = StringUtils.cleanPath(username + ".jpg");
            try {
                // Save the file to the uploads directory

                String uploadDir = System.getProperty("user.dir") + AVT_UPLOAD_DIR;
                file.transferTo(new File(uploadDir + fileName));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    //Date: 22/05/2023
    //Function: Get Input File Extension
    //Writen By:DucKM
    private static String getFileExtension(String fileName) {
        String extension = "";
        int dotIndex = fileName.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
            extension = fileName.substring(dotIndex + 1);
        }

        return extension;
    }

    //Date: 22/05/2023
    //Function: return user data by userId
    //Writen By:DucKM
    @GetMapping(value = "/avatar/{fileId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<InputStreamResource> getUserAvatar(@PathVariable String fileId) throws IOException {
        String filePath = "avatar/" + fileId + ".jpg";
        File file = new File(filePath);
        InputStream inputStream = new FileInputStream(file);
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
                .body(inputStreamResource);
    }

    //Date: 24/05/2023
    //Function: Check role admin from JWT
    //author: maiphuonghoang 
    public boolean isRoleAdminFromToken(HttpServletRequest request) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        System.out.println(user.getUsername());
        System.out.println(user.getRoles());
        boolean isAdmin = false;
        for (Role role : user.getRoles()) {
            if (role.getRoleId() == 1) {
                isAdmin = true;
            }
        }
        return isAdmin;
    }

    //Date: 22/05/2023
    //Function: List mentor for only admin 
    //author: maiphuonghoang 
    @GetMapping("/mentors")
    public List<User> getAllMentors(HttpServletRequest request, Integer roleId) {
        if (!isRoleAdminFromToken(request)) {
            return null;
        }
        return userRepository.findByRoleId(2);

    }

    //Date: 24/05/2023
    //Function: Insert Mentor into database and their role to user_role
    //author: maiphuonghoang 
    @PostMapping("/mentor-account")
    public User createMentor(HttpServletRequest request, @RequestBody User mentor) throws EmailException {

        if (!isRoleAdminFromToken(request)) {
            return null;
        }

        java.util.Date today = new java.util.Date();
        java.sql.Date sqlToday = new java.sql.Date(today.getTime());
        mentor.setCreatedDate(sqlToday);
        mentor.setActiveStatus(true);
        mentor.setUsername(mentor.getMail());
        mentor.setDisplayName(mentor.getMail());
        String password = PasswordUtils.generatePassword();
        String subject = "HAPPY ONLINE PROGRAMMING - MENTOR ACCOUNT";
        String body = "Here is your mentor account <br> Username:" + mentor.getUsername() + "<br>" +"Password "+ password;
        System.out.println(body);

        try {
            EmailUtils.sendVerifyEmail(mentor.getMail(), subject, body);
            System.out.println("Send email successfully");
            mentor.setPassword(AuthenticationUtils.hashPassword(mentor.getPassword()));
            User createdMentor = userRepository.save(mentor);
            userRepository.saveUser_Role(mentor.getUsername(), 2);
            userRepository.saveUser_Role(mentor.getUsername(), 3);
            return createdMentor;

        } catch (EmailException ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error when send email");
        }
        return null;
    }

    //Date: 24/05/2023
    //Function: Update mentor set activeStatus to Ban mentor 
    //author: maiphuonghoang 
    @PutMapping("/mentors/status/{username}")
    ResponseEntity<User> updateActiveStatusMentor(HttpServletRequest request, @PathVariable String username, @RequestParam Integer status) {
        if (!isRoleAdminFromToken(request)) {
            return null;
        }
        boolean exists = userRepository.existsByUsername(username);
        User user = userRepository.findByUsername(username);
        if (exists) {
            userRepository.updateActiveStatus(status, username);
        }
        return null;
    }
}
