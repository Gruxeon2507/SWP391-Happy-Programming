/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.repository.CourseRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author huyen
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/auth/course")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @PostMapping("/create")
    public Course createCourse(@RequestBody Course course) {
        // author

        //add course
        return courseRepository.save(course);
    }
    
    @GetMapping
    public List<Course> getAllCourse(){
        return courseRepository.findAll();
    }
}
