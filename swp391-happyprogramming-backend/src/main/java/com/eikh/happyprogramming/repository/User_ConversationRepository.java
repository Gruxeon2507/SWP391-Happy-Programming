/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.model.User_Conversation;
import com.eikh.happyprogramming.modelkey.UserConversationKey;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface User_ConversationRepository extends JpaRepository<User_Conversation, UserConversationKey>{

    @Query(value="SELECT * FROM User_Conversation WHERE username = ?1",nativeQuery = true)
    public List<User_Conversation> getLoginUserConversation(String username);
    
}
