/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Rating;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author giangpt
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/ratings")
public class RatingController {
    
    @Autowired
    CourseRepository courseRepository;
    
    @Autowired
    RatingRepository ratingRepository;
    
    @PostMapping("rates")
    public ResponseEntity<Rating> rateMentorByCourse(@RequestBody Rating rating){
        
    }
    
}
