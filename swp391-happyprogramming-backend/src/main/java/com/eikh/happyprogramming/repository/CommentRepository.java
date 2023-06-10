/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

/**
 *
 * @author huyen
 */
public interface CommentRepository extends JpaRepository<Comment, Integer>{

    @Modifying
    @Transactional
    @Query(value = "UPDATE Comment SET commentContent = ?2 WHERE commentId = ?1", nativeQuery = true)
    void updateComment(int commentId, String commentContent);

    @Query(value = "SELECT * FROM `Comment` WHERE postId = ?1 AND parentId IS NULL", nativeQuery = true)
    List<Comment> getTopLevelCommentByPost(int postId);
}
