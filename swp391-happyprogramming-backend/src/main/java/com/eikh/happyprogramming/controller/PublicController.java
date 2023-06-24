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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import com.eikh.happyprogramming.repository.RatingRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    RatingRepository ratingRepository;

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
    
    @GetMapping(value = "/pdf/{fileId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> getCV(@PathVariable String fileId) throws IOException {
        String filePath = "pdf/" + fileId + ".pdf";
        File file = new File(filePath);
        InputStream inputStream = new FileInputStream(file);
        InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=" + fileId);
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(inputStreamResource);
    }

    @GetMapping("/mentor/by-course/{courseId}")
    List<User> getMentorsByCourse(@PathVariable int courseId) {
        return userRepository.getMentorsOfCourse(courseId);
    }

    @GetMapping("/mentor/rating/{username}")
    int getAvgRatingByMentor(@PathVariable String username) {
//        return ratingRepository.getAvgRatingByMentor(username);
        return 0;
    }
}
