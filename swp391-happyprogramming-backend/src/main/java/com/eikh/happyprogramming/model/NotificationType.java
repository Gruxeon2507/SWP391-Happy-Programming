package com.eikh.happyprogramming.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "NotificationType")
public class NotificationType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationTypeId;

    private String notificationTypeName;

    @OneToMany(mappedBy = "notificationType")
    private List<Notification> notifications;

}
