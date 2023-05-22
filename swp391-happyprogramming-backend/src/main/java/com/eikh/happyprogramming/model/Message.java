/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.MessageKey;
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
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Message")
public class Message implements Serializable {

    @EmbeddedId
    private MessageKey messageKey;

    private String msgContent;

    @ManyToOne
    @MapsId("sentBy")
    @JoinColumn(name = "sentBy", referencedColumnName = "username")
    private User user;

    @ManyToOne
    @MapsId("conversationId")
    @JoinColumn(name = "conversationId")
    private Conversation conversation;

}
