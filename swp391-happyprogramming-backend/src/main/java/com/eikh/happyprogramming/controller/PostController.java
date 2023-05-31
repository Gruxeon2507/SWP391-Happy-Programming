/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;


import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Post;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.PostRepository;
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
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author kmd
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/posts")
public class PostController {
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    
    @Autowired
    CourseRepository courseRepository;
    
    @Autowired
    PostRepository postRepository;
    
    @PostMapping("/create/{courseId}")
    public ResponseEntity<?> createPost(HttpServletRequest request,@RequestBody Post post,@PathVariable("courseId") int courseId){
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        if(userRepository.getMentorOfCourse(courseId).getUsername().equals(username)){
            Post p = new Post();
            java.util.Date today = new java.util.Date();
            java.sql.Date sqlToday = new java.sql.Date(today.getTime());
            p.setPostedAt(sqlToday);
            p.setCourse(courseRepository.findMentorCourse(username, courseId));
            p.setUser(userRepository.findByUsername(username));
            p.setPostContent(post.getPostContent());
            postRepository.save(p);
            return ResponseEntity.ok(p);
        }
        else{
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
}
