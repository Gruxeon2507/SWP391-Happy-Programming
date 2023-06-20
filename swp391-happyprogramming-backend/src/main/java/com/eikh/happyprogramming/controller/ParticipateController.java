/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.RequestRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author huyen
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/participates")
public class ParticipateController {

    @Autowired
    ParticipateRepository participateRepository;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private User_ConversationRepository user_ConversationRepository;

    @Autowired
    CourseRepository courseRepository;

    @PostMapping("/save")
    public void saveCourseParticipate(@RequestParam("username") String username, @RequestParam("courseId") int courseId, @RequestParam("participateRoleId") int participateRoleId, @RequestParam("statusId") int statusId, HttpServletRequest request) {
        String usn = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        User u = userRepository.userHasRole(usn, 1);
        if (u != null) {
            //insert mentor
            participateRepository.saveParticipate(username, courseId, 2, 1);
            
            Course course = courseRepository.ducFindByCourseId(courseId);
            //Tạo conversation cho course mới vừa tạo 
            conversationRepository.insertConversation(course.getCourseName());
            Conversation newCon = conversationRepository.findByConversationName(course.getCourseName());
            //Insert mentor vào group chat vừa tạo 
            int conversationId = newCon.getConversationId();
            user_ConversationRepository.insertUserConversation(username, conversationId);
        } else {
            User u1 = userRepository.userHasRole(usn, 3);
            if (u1 != null) {
                // insert request pending
                participateRepository.saveParticipate(usn, courseId, participateRoleId, statusId);
            }
        }
    }

    @PostMapping
    public void saveRequest(@RequestParam("courseId") int courseId, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));

    }

    @GetMapping("/by-course/{courseId}")
    public List<Participate> getParticipatesByCourseId(@PathVariable int courseId) {
        return participateRepository.getParticipatesByCourseId(courseId);
    }

    /**
     * Date: 2/6/2023 Author: HuyenNTK Description: get participation info from
     * given request and courseId Parameters: courseId (path variable),
     * HttpRequest Return: null or a Participate instance
     */
    @GetMapping("/by-user/{courseId}")
    public Participate getParticipateByCourse(@PathVariable("courseId") int courseId, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        Participate p = participateRepository.getUserParticipateFromCourse(username, courseId);
        System.out.println("PARTICIPATE INTO " + courseId + " IS " + p);
        return p;
    }

}
