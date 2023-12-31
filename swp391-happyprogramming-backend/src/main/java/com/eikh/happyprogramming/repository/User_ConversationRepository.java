/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.modelkey.UserConversationKey;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface User_ConversationRepository extends JpaRepository<User_Conversation, UserConversationKey> {

    @Query(value = "SELECT * FROM User_Conversation WHERE username = ?1", nativeQuery = true)
    public List<User_Conversation> getLoginUserConversation(String username);

    @Query(value = "SELECT * FROM User_Conversation WHERE username=?1 and conversationId=?2", nativeQuery = true)
    public User_Conversation getUserConversationByUsernameAndConversationId(String username, int conversationId);

    //mph 
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User_Conversation (username, conversationId) VALUES (:username, :conversationId)", nativeQuery = true)
    public void insertUserConversation(String username, int conversationId);
    
    
    @Query(value = "SELECT * FROM User_Conversation WHERE conversationId =?1 AND username != ?2",nativeQuery = true)
    public User_Conversation getUserOtherUserUsername(int conversationId, String username);


    

}
