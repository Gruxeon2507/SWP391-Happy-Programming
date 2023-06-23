/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.chatModel;

/**
 *
 * @author kmd
 */

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Message {
    private String senderName;
    private String receiverName;
    private int conversationId;
    private String message;
    private String date;
    private Status status;
    private Timestamp sentAt;
}  