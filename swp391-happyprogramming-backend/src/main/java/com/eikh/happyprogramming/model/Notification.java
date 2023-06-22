package com.eikh.happyprogramming.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Notification")
public class Notification implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    private String notificationContent;
    private Timestamp notificationTime;

    @ManyToOne
    @JoinColumn(name = "notificationTo")
    private User user;

    @ManyToOne
    @JoinColumn(name="notificationTypeId")
    private NotificationType notificationType;
}
