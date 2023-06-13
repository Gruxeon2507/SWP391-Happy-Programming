/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.*;

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
@Table(name = "Conversation")
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int conversationId;
    private String conversationName;
    
    @OneToMany(mappedBy = "conversation")
    @JsonIgnore
    private List<User_Conversation> user_conversations;
    
    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;

    @OneToOne
    @JoinColumn(name="courseId")
    private Course course;
}
