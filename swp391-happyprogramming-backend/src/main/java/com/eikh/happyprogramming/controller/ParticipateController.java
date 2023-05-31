/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
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

    @PostMapping("/save")
    public void saveCourseParticipate(@RequestParam("username") String username, @RequestParam("courseId") int courseId, @RequestParam("participateRoleId") int participateRoleId, @RequestParam("statusId") int statusId, HttpServletRequest request) {
        String usn = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        User u = userRepository.userHasRole(usn, 1);
        if (u != null) {
            //insert mentor
            participateRepository.saveParticipate(username, courseId, 2, 1);
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
}
