/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.*;

/**
 *
 * @author emiukhoahoc
 */
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "`User`")
public class User implements Serializable {

    @Id
    private String username;
    private String password;
    private String displayName;
    private String mail;
    private Date dob;
    private Date createdDate;
    private String avatarPath;
    private String CVPath;
    private boolean activeStatus;

    @ManyToMany(mappedBy = "users")
    private List<Role> roles;

    @OneToMany(mappedBy = "user")
    private List<User_Conversation> user_conversations;

    @OneToMany(mappedBy = "user")
    private List<Participate> participates;

    @OneToMany(mappedBy = "user")
    private List<Post> posts;

    @OneToMany(mappedBy = "user")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user")
    private List<Message> messages;

}
