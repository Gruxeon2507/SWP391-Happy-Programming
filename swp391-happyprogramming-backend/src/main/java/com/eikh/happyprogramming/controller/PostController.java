/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Comment;
import com.eikh.happyprogramming.model.Post;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CommentRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.PostRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.CommentUtils;
import com.eikh.happyprogramming.utils.JwtTokenUtil;

import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author kmd
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/posts")
public class PostController {
    @Autowired
    CommentUtils commentUtils;

    @Autowired
    CommentRepository commentRepository;
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
    public ResponseEntity<?> createPost(HttpServletRequest request, @RequestBody Post post, @PathVariable("courseId") int courseId) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<User> mentors = userRepository.getMentorsOfCourse(courseId);
        User m = userRepository.findCourseMentor(username, courseId);
        boolean isPermitted = m != null;
        if (isPermitted) {
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
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/view/{postId}")
    public Post findById(@PathVariable("postId") int postId) {
        Optional<Post> p = postRepository.findById(postId);
        return p.orElse(null);
    }
    
    


    @GetMapping("/view/all")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
    
    /**
     * @param postId
     * @param request
     * @return void
     * @author Huyen
     * @description delete the post by id if the user sending request create the
     * post
     */
    @DeleteMapping("/delete/{postId}")
    public void deletePostById(@PathVariable("postId") int postId, HttpServletRequest request) {
        System.out.println("DELETE POST API CALLED.");
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            if (postRepository.userHasPost(username, postId) != null) {
                List<Comment> topLevelComments = commentRepository.getTopLevelCommentByPost(postId);
                for (Comment c : topLevelComments) {
                    commentUtils.deleteCommentAndReplies(c.getCommentId());
                }
                postRepository.deleteById(postId);
            }
        }
    }


    /**
     * @param postId
     * @param post-Content
     * @param request
     * @return void
     * @author Huyen Nguyen
     * @description update content of a post with given postId
     */
    @PostMapping("/update/{postId}")
    public void updatePost(@PathVariable("postId") int postId, @RequestBody Post post, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post p = optionalPost.get();
            String postOwnerUsername = p.getUser().getUsername();
            if (username.equals(postOwnerUsername)) {
                postRepository.updatePost(postId, post.getPostContent());
            }
        }
    }
}
