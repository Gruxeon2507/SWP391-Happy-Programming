package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {
    @Query(value = "SELECT * FROM Notification where notificationTo=?1 ORDER BY notificationId DESC",nativeQuery = true)
    public List<Notification>  getLoginUserNotification(String username);

    @Transactional
    @Modifying
    @Query(value = "UPDATE Notification SET isViewed=1 WHERE notificationTo=?1",nativeQuery = true)
    public void updateViewedNotification(String username);
}
