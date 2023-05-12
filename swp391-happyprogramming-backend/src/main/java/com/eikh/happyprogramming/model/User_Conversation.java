/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.UserConversationKey;
import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.*;

/**
 *
 * @author emiukhoahoc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User_Conversation")
public class User_Conversation implements Serializable {

    @EmbeddedId
    private UserConversationKey userConversationKey;

    @ManyToOne
    @MapsId("username")
    @JoinColumn(name = "username")
    User user;

    @ManyToOne
    @MapsId("conversationId")
    @JoinColumn(name = "conversationId")
    Conversation conversation;
}
