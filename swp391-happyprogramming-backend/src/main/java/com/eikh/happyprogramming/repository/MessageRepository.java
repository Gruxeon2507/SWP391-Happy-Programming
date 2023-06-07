package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Message;
import com.eikh.happyprogramming.modelkey.MessageKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, MessageKey> {

}
