/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.temptable;

import com.eikh.happyprogramming.modelkey.CourseStatusCountKey;
import com.eikh.happyprogramming.modelkey.ParticipateKey;
import java.io.Serializable;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CourseStatusCount implements Serializable{

    @EmbeddedId
    private CourseStatusCountKey courseStatusCountKey;
    private String courseName;
    private Integer statusCount;

}
