/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Conversation;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface ConversationRepository extends JpaRepository<Conversation, Integer> {

    @Query(value = "SELECT * FROM Conversation c INNER JOIN User_Conversation uc where uc.username=?1", nativeQuery = true)
    public List<Conversation> getUserConversationByUsername(String username);

    Conversation findByConversationId(int conversationId);

    //mph 
//    @Query(value = "SELECT * FROM Conversation c WHERE c.courseId = :courseId", nativeQuery = true)
//    public Conversation findByCourseId(Integer courseId);


    //mph
    @Query(value = "SELECT * FROM Conversation WHERE  conversationName = :conversationName", nativeQuery = true)
    public Conversation findByConversationName(String conversationName);
    
    //mph 
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Conversation (conversationName, courseId) VALUES (:conversationName, :courseId)", nativeQuery = true)
    public void insertGroupConversation(String conversationName, int courseId);

    //mph 
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Conversation (conversationName, courseId) VALUES (:conversationName, :courseId)", nativeQuery = true)
    public void insertConversation2(String conversationName, int courseId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Conversation (conversationName) VALUES (:conversationName)", nativeQuery = true)
    public void insertPrivateConversation(String conversationName);

}
