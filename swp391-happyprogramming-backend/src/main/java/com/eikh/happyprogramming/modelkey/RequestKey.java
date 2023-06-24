/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.modelkey;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
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
@ToString
@Embeddable
public class RequestKey implements Serializable{

    private int courseId;
    private String username;
    private Timestamp requestTime;
}
