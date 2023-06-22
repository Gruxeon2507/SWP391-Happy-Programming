///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.model.Status;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.modelkey.RequestKey;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.RequestRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import com.eikh.happyprogramming.utils.RoleUtils;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author emiukhoahoc
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/requests")
public class RequestController {

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private User_ConversationRepository user_ConversationRepository;

    @Autowired
    private ParticipateRepository participateRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Autowired
    private RoleUtils roleUtils;

    //@maiphuonghoang 
    @PostMapping("/pending")
    ResponseEntity<Page<Request>> getPendingUserOfCourse(
            HttpServletRequest request,
            @RequestParam(name = "courseId") Integer courseId,
            @RequestParam(defaultValue = "0", name = "pageNumber") int pageNumber,
            @RequestParam(defaultValue = "10", name = "pageSize") int pageSize,
            @RequestParam(defaultValue = "username", name = "sortField") String sortField,
            @RequestParam(defaultValue = "desc", name = "sortOrder") String sortOrder
    ) {
        if (!roleUtils.hasRoleFromToken(request, 2)) {
            return null;
        }
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Request> pageUsers = requestRepository.getRendingRequestOfCourse(pageable, courseId);
        System.out.println();
        return new ResponseEntity<>(pageUsers, HttpStatus.OK);
    }

    //@maiphuonghoang 
    @Transactional
    @PostMapping("/status")
    public String updateParticipateInsertRequests(
            HttpServletRequest request,
            @RequestParam(name = "courseId") Integer courseId,
            @RequestParam(name = "usernames") String[] usernames,
            @RequestParam(name = "statusId") Integer statusId
    ) {
        if (!roleUtils.hasRoleFromToken(request, 2)) {
            return null;
        }
        try {
            transactionTemplate.execute(status -> {
                try {
                    Status s = new Status();
                    s.setStatusId(statusId);

                    User mentor = userRepository.getMentorOfCourse(courseId);
                    String mentorName = mentor.getUsername();

                    for (String username : usernames) {
                        String menteeName = username;
                        RequestKey key = new RequestKey();
                        key.setCourseId(courseId);
                        key.setRequestTime(new Timestamp(System.currentTimeMillis()));
                        Request r = new Request();
                        key.setUsername(username);
                        r.setStatus(s);
                        r.setRequestKey(key);

                        //update participate 
                        participateRepository.updateStatus(statusId, courseId, username);

                        //insert request 
                        requestRepository.save(r);
                        //System.out.println(1/0);

                        //nếu được access vào course 
                        if (statusId == 1) {
                            //insert group chung 
                            int conversationGroupId = conversationRepository.findByCourseId(courseId).getConversationId();
                            user_ConversationRepository.insertUserConversation(menteeName, conversationGroupId);

                            String conversationName = mentorName + menteeName;
                            Conversation exitConversation = conversationRepository.findByConversationName(conversationName);
                            if (exitConversation == null) {
                                //tạo group riêng 
                                conversationRepository.insertConversation(conversationName);
                            }
                            //lấy id của group riêng đã có/ vừa tạo 
                            Conversation conversationPrivate = conversationRepository.findByConversationName(conversationName);
                            int conversationPrivateId = conversationPrivate.getConversationId();
                            //insert group riêng cho mentor và mentee 
                            user_ConversationRepository.insertUserConversation(menteeName, conversationPrivateId);
                            user_ConversationRepository.insertUserConversation(mentorName, conversationPrivateId);
                        }

                    }

                    System.out.println("Request save and update success; insert conversation success");
                } catch (Exception ex) {
                    Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
                    status.setRollbackOnly();
                }
                return null;
            });
        } catch (Exception ex) {
            Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    //@maiphuonghoang 
    @GetMapping("/access-reject/{courseId}")
    public List<Request> getAccessRejectRequestOfCourse(HttpServletRequest request,
            @PathVariable Integer courseId) {
        if (!roleUtils.hasRoleFromToken(request, 2)) {
            return null;
        }
        return requestRepository.getAccessRejectRequest(courseId);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteParticipateDeleteRequest(@PathVariable("courseId") int courseId, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        requestRepository.deleteAllRequests(username, courseId);
        System.out.println("DELETE FROM REQUEST OK.");
        participateRepository.deleteParticipate(username, courseId);
        System.out.println("DELETE FROM PARTICIPATE OK.");
    }

    @Transactional
    @PostMapping("/send")
    public String insertParticipateInsertRequest(
            HttpServletRequest request,
            @RequestParam(name = "courseId") Integer courseId
    ) {

        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        transactionTemplate.execute(status -> {
            try {
                Request r = new Request();
                Status s = new Status();
                RequestKey key = new RequestKey();
                key.setUsername(username);
                key.setCourseId(courseId);
                key.setRequestTime(new Timestamp(System.currentTimeMillis()));
                s.setStatusId(0);
                r.setStatus(s);
                r.setRequestKey(key);
                Participate exitParticipate = participateRepository.findByUsernameCourseId(username, courseId);
                if (exitParticipate == null) {
                    participateRepository.saveParticipate(username, courseId, 3, 0);
                } else {
                    participateRepository.updateStatus(0, courseId, username);
                }
                requestRepository.save(r);
                return "Participate update/save and Request save success";
            } catch (Exception ex) {
                Logger.getLogger(UserController.class.getName()).log(Level.SEVERE, null, ex);
                status.setRollbackOnly();
            }
            return null;

        });
        return null;
    }

    //@maiphuonghoang 
    @GetMapping("/my")
    public List<MyRequest> getAllMyAccessRejectRequestOfCourse(HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        List<MyRequest> myrequests = new ArrayList<MyRequest>();
        List<Request> rawRequests = requestRepository.getAllMyAccessRejectRequest(username);
        for (Request r : rawRequests) {
            Course c = courseRepository.findByCourseId(r.getRequestKey().getCourseId());
            myrequests.add(new MyRequest(r.getRequestKey().getCourseId(), c.getCourseName(), r.getStatus().getStatusId(), r.getRequestKey().getRequestTime(), r.getRequestReason()));
        }
        return myrequests;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @ToString
    @NoArgsConstructor
    class MyRequest {
        private int courseId;
        private String courseName;
        private int requestStatus;
        private Timestamp requestTime;
        private String requestReason;
    }
}
