/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.CourseCategoryKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ADMIN
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Course_Category")
public class Course_Category implements Serializable{
    @EmbeddedId
    private CourseCategoryKey courseCategoryKey;
    
    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "courseId")
    @JsonIgnore
    Course course;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "categoryId")
    @JsonIgnore
    Category category;
}
