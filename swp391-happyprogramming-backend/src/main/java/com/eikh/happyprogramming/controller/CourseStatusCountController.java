package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.repository.CourseStatusCountRepository;
import com.eikh.happyprogramming.temptable.CourseStatusCount;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author ADMIN
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("")
public class CourseStatusCountController {

    @Autowired
    private CourseStatusCountRepository repository;

    @GetMapping("/courseStatusCounts")
    public List<CourseStatusCount> getCourseStatusCounts() {
        return repository.getCourseStatusCounts();
    }
}
