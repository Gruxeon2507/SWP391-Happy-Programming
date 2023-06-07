/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Conversation;
import com.eikh.happyprogramming.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface ConversationRepository extends JpaRepository<Conversation, Integer>{

    
    @Query(value = "SELECT * FROM Conversation c INNER JOIN User_Conversation uc where uc.username=?1",nativeQuery = true)
    public List<Conversation> getUserConversationByUsername(String username);

    Conversation findByConversationId(int conversationId);
}
