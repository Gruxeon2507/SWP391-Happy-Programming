/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Rating;
import com.eikh.happyprogramming.model.Role;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.modelkey.RatingKey;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.RatingRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @PostMapping("rates")
    public ResponseEntity<?> rateMentorByCourse(@RequestParam("username") String username,
            @RequestParam("comment") String comment,
            @RequestParam("noStar") String noStar,
            @RequestParam("courseId") String courseId,
            HttpServletRequest request
    ) {
        String username_from = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        if (Integer.parseInt(noStar) > 5 || Integer.parseInt(noStar) <= 0) {
            return ResponseEntity.ok(null);
        }
        List<Course> course = courseRepository.findAllCourseMentorOfMentee(username, username_from);
        for (Course c : course) {
            if (c.getCourseId() == Integer.parseInt(courseId)) {
                ratingRepository.addRateFromMentorToMentee(username_from, username,
                        Integer.parseInt(noStar), Integer.parseInt(courseId), comment);
                return ResponseEntity.status(HttpStatus.OK).build();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    @GetMapping("rate/{usernameMentor}")
    public ResponseEntity<?> findAllRatesByMentor(@PathVariable("usernameMentor") String usernameMentor){
        User user = userRepository.findByUsername(usernameMentor);
        for (Role role : user.getRoles()) {
            if(role.getRoleName().equals("mentor")){
                List<Rating> ratings = ratingRepository.findAllRatesByUsernameMentor(usernameMentor);
                return ResponseEntity.ok(ratings);
            }
        }
        return ResponseEntity.ok(null);
    }
    
    @GetMapping("avg/{usernameMentor}")
    public int findAvgRateOfMentor(@PathVariable("usernameMentor") String usernameMentor){
        return ratingRepository.getAvgRatingByMentor(usernameMentor);
    }

}
