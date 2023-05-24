/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Category;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CategoryRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author huyen
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/public/")
public class PublicController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CategoryRepository categoryRepository;
    
    @Autowired
    UserRepository userRepository;

    @GetMapping("/courses/view/{courseId}")
    public Course getCourseById(@PathVariable int courseId) {
        return courseRepository.findById(courseId).get();
    }

    @GetMapping("/courses/all")
    List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @GetMapping("/active-mentors")
    public List<User> getAllActiveMentors() {
        return userRepository.getUsersByRoleActiveStatus(2, 1);
    }

    @GetMapping("/categories/all")
    List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }



}
