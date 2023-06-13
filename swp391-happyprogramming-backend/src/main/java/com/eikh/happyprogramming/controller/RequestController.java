///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.model.Status;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.modelkey.RequestKey;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.RequestRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import com.eikh.happyprogramming.utils.RoleUtils;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
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
    private ParticipateRepository participateRepository;

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
                    java.util.Date today = new java.util.Date();
                    java.sql.Date sqlToday = new java.sql.Date(today.getTime());
                    Status s = new Status();
                    RequestKey key = new RequestKey();
                    key.setCourseId(courseId);
                    key.setRequestTime(sqlToday);
                    s.setStatusId(statusId);

                    for (String username : usernames) {
                        Request r = new Request();
                        key.setUsername(username);
                        r.setStatus(s);
                        r.setRequestKey(key);
                        requestRepository.save(r);
//                        System.out.println(1/0);
                        participateRepository.updateStatus(statusId, courseId, username);
                    }

                    System.out.println("Request save and update success");
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

    @PostMapping("/insert")
    public void handleRequestIntoCourse(
            @RequestParam(name = "courseId") int courseId,
            @RequestParam(name = "statusId") int statusId,
            HttpServletRequest httpServletRequest
    ){
        String username = "";
        try {
            username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(httpServletRequest));
        } catch (Exception e){
            System.out.println("Error getting username from request.");
            return;
        }
        User u = userRepository.findByUsername(username);
        if (u != null){
            Request request = new Request();
            //insert into Request table: courseId, username, requestTime, requestStatus
            // request key: courseId, username
            RequestKey key = new RequestKey();
            java.util.Date today = new java.util.Date();
            java.sql.Date sqlToday = new java.sql.Date(today.getTime());
            key.setCourseId(courseId);
            key.setUsername(username);
            key.setRequestTime(sqlToday);

            Status status = new Status();
            status.setStatusId(0);
            request.setStatus(status);
            request.setRequestKey(key);
            requestRepository.save(request);
        } else {
            System.out.println("User is null, notification from /insert");
        }
    }

    
    //@maiphuonghoang 
    @GetMapping("/access-reject/{courseId}")
    public List<Request> getAccessRejectRequestOfCourse(HttpServletRequest request,
            @PathVariable Integer courseId){
         if (!roleUtils.hasRoleFromToken(request, 2)) {
            return null;
        }
         return requestRepository.getAccessRejectRequest(courseId);
    }

    @DeleteMapping("/delete/{courseId}")
    public void deleteParticipateDeleteRequest(@PathVariable("courseId") int courseId, HttpServletRequest request){
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        requestRepository.deleteAllRequests(username, courseId);
        System.out.println("DELETE FROM REQUEST OK.");
        participateRepository.deleteParticipate(username, courseId);
        System.out.println("DELETE FROM PARTICIPATE OK.");
    }
}
