/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author huyen
 */
public interface CommentRepository extends JpaRepository<Comment, Integer>{
    
}
