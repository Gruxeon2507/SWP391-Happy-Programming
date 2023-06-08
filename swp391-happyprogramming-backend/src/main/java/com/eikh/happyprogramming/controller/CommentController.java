/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Comment;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CommentRepository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @author huyen
 */
@RestController
@CrossOrigin("*")
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtTokenFilter jwtTokenFilter;

    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    CommentRepository commentRepository;

    @GetMapping("/all")
    public List<Comment> getAllComment() {
        return commentRepository.findAll();
    }

    @PostMapping("/add/{parentId}")
    public void addComment(@RequestBody Comment comment, @PathVariable("parentId") int parentId, HttpServletRequest request) {
        System.out.println("API ADD COMMENT CALLED.");
        /**
         * comment received has the following attributes: content, post, parent
         * lacking: id (autogenerated), commentedAt, user (HttpRequest),
         */
        java.util.Date now = new java.util.Date();
        comment.setCommentedAt(new Timestamp(System.currentTimeMillis()));
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        User u = new User();
        u.setUsername(username);
        comment.setUser(u);
        Comment parent = new Comment();
        parent.setCommentId(parentId);
        comment.setParent(parent);
        System.out.println("POST: " + comment.getPost().getPostId());
        System.out.println("TIME: " + comment.getCommentedAt());
        System.out.println("PARENT: " + ((comment.getParent() == null)?"NULL":comment.getParent().getCommentId()));
        System.out.println("USER: " + comment.getUser().getUsername());
        System.out.println("CONTENT: " + comment.getCommentContent());
        commentRepository.save(comment);
    }

    public void deleteCommentAndReplies(int commentId) {
        System.out.println("DELETE COMMENT API CALLED.");
        Comment comment = commentRepository.findById(commentId).get();
        if (comment != null) {
            for (Comment reply : comment.getReplies()) {
                deleteCommentAndReplies(reply.getCommentId());
            }
            commentRepository.deleteById(commentId);
        }

    }

    @DeleteMapping("delete/{commentId}")
    public void deleteCommentById(@PathVariable("commentId") int commentId, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        User requestFrom = userRepository.findByUsername(username);
        if (requestFrom != null) {
            // check if the requestFrom is post owner, comment owner or admin
            Comment comment = commentRepository.findById(commentId).get();
            if (comment != null) {
                String commentOwnerUsername = comment.getUser().getUsername();
                String postOwnerUsername = comment.getPost().getUser().getUsername();
                User adminUser = userRepository.userHasRole(username, 1);
                if (username.equals(commentOwnerUsername)
                        || username.equals(postOwnerUsername)
                        || adminUser != null
                ) {
                    deleteCommentAndReplies(commentId);
                }
            }
        }
    }

    @PostMapping("/edit/{commentId}")
    public void updateComment(@PathVariable("commentId") int commentId, @RequestBody Comment newComment, HttpServletRequest request){
        System.out.println("EDIT COMMENT API CALLED.");
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        Comment comment = commentRepository.findById(commentId).get();
        if (comment != null){
            String commentOwnerUsername = comment.getUser().getUsername();
            if (username.equals(commentOwnerUsername)){
                commentRepository.updateComment(commentId, newComment.getCommentContent());
            }
        }
    }
}
