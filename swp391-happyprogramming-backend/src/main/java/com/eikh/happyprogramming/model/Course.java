/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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
@Table(name = "Course")
public class Course implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int courseId;

    private String courseName;

    private Date createdAt;

    private String courseDescription;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    // Could not write JSON: For input string: "access"; nested exception is com.fasterxml.jackson.databind.JsonMappingException: For input string: "access" (through reference chain: java.util.ArrayList[0]->com.eikh.happyprogramming.model.Course["participates"])]
    private List<Participate> participates;

    @OneToMany(mappedBy = "course")
    private List<Post> posts;

    @ManyToMany(mappedBy = "courses")
    private List<Category> categories;
}
