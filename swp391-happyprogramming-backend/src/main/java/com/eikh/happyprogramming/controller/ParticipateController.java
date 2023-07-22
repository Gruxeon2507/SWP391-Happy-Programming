/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.*;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author huyen
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/participates")
public class ParticipateController {
    final String MENTOR_CONVERSATION_PREFIX = "Mentor - ";

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
    public void saveCourseParticipate(@RequestParam("mentorUsernames") List<String> mentorUsernames, @RequestParam("courseId") int courseId, @RequestParam("participateRoleId") int participateRoleId, @RequestParam("statusId") int statusId, HttpServletRequest request) {
        String usn = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        User u = userRepository.userHasRole(usn, 1);
        if (u != null) {
            //insert mentor
            for (String mentorUsername : mentorUsernames) {
                participateRepository.saveParticipate(mentorUsername, courseId, 2, 1);
            }
            Course course = courseRepository.ducFindByCourseId(courseId);
            //Tạo conversation cho course mới vừa tạo 
            conversationRepository.insertGroupConversation(course.getCourseName(), courseId);
            System.out.println("insert group chung ok.");

            // Create conversation for mentor team
            conversationRepository.insertGroupConversation(MENTOR_CONVERSATION_PREFIX + course.getCourseName(), courseId);
            System.out.println("insert group mentor ok.");

            Conversation newCon = conversationRepository.findByConversationName(course.getCourseName());
            Conversation mentorTeamNewCon = conversationRepository.findByConversationName(MENTOR_CONVERSATION_PREFIX + course.getCourseName());
            //Insert mentor vào 2 group chat vừa tạo
            int conversationId = newCon.getConversationId();
            int mentorTeamConversationId = mentorTeamNewCon.getConversationId();
            for (String mentorUsername : mentorUsernames) {
                user_ConversationRepository.insertUserConversation(mentorUsername, conversationId);
                user_ConversationRepository.insertUserConversation(mentorUsername, mentorTeamConversationId);
                System.out.println(mentorUsername + " inserted into conversation successfully.");
            }
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

    //maiphuonghoang
    @PostMapping("/allmy")
    ResponseEntity<Page<Participate>> findMyCourses(
            HttpServletRequest request,
            @RequestParam(defaultValue = "") String searchText,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "c.courseId") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestParam(defaultValue = "1,2,3") Integer[] participateRoles,
            @RequestParam(defaultValue = "0,1,-1") Integer[] statusIds
    ) {

        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return new ResponseEntity<>(participateRepository.findAllMyParticipateCourse(pageable, username, participateRoles, statusIds, searchText), HttpStatus.OK);
    }

    @GetMapping("/findMentorCourse")
    ResponseEntity<List<Participate>> findAllMentorCourse() {
        return ResponseEntity.ok(participateRepository.findAllMentorCourse());
    }

    @GetMapping("/findMentorJoinCourse/{courseId}")
    ResponseEntity<?> findAllMentorJoinCourse(@PathVariable("courseId") int courseId) {
        return ResponseEntity.ok(userRepository.findAllMentorJoinCourse(courseId));
    }

    @PostMapping("/updateMentorCourse")
    ResponseEntity<?> updateMentorCourse(@RequestBody List<Participate> participates, HttpServletRequest request) {
        User user = userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request)));
        if (user == null) {
            return ResponseEntity.ok(null);
        }
        boolean checkAdmin = false;
        for (Role r :
                user.getRoles()) {
            if (r.getRoleName().equalsIgnoreCase("admin")) {
                checkAdmin = true;
                break;
            }
        }
        if (!checkAdmin) {
            return ResponseEntity.ok("Failed");
        } else {
            List<Participate> firstParticipates = participateRepository.findAllMentorCourse();
            for (Participate p :
                    firstParticipates) {
                participateRepository.deleteMentorCourse(p.getParticipateKey().getUsername(), p.getParticipateKey().getCourseId());
            }
            for (Participate p :
                    participates) {
                participateRepository.insertMentorCourse(p.getParticipateKey().getCourseId(), p.getParticipateKey().getUsername());
            }
        }
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/count/mentee/{courseId}")
    public int countMenteeInCourse(@PathVariable("courseId") int courseId) {
        System.out.println("COUNTING MENTEE IN COURSE " + courseId);
        return participateRepository.countAllByCourse_CourseIdAndParticipateRole_ParticipateRoleAndStatus_StatusId(courseId, 3, 1);
    }

    @GetMapping("/count/user/{statusId}")
    public int countNumberUserByStatusInCourses(HttpServletRequest request, @PathVariable int statusId ){
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String mentorName = jwtTokenUtil.getUsernameFromToken(token);
        List<User> users =  userRepository.countNumberUserByStatusInCoursesOfMentor(mentorName, statusId);
        return users.size();
    }
}
