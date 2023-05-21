/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping("/save")
    public void saveCourseParticipate(@RequestParam("username") String username, @RequestParam("courseId") int courseId, @RequestParam("participateRoleId") int participateRoleId, @RequestParam("statusId") int statusId) {
        participateRepository.saveParticipate(username, courseId, participateRoleId, statusId);
    }
}
