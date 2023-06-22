package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    @Query(value = "SELECT * FROM Notification where notificationTo=?1",nativeQuery = true)
    public List<Notification>  getLoginUserNotification(String username);
}
