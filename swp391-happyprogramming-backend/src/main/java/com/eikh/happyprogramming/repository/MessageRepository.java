package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Message;
import com.eikh.happyprogramming.modelkey.MessageKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, MessageKey> {
    @Query(value = "SELECT * FROM Message WHERE conversationId=?1 ORDER BY sentAt",nativeQuery = true)
    public List<Message> getUserConversationMessage(int conversationId);
}
