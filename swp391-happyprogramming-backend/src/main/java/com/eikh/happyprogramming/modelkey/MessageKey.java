/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.modelkey;

import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Embeddable;
import lombok.*;

/**
 *
 * @author emiukhoahoc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MessageKey implements Serializable{
    private int conversationId;
    private String sentBy;
    private Date sentAt;
}
