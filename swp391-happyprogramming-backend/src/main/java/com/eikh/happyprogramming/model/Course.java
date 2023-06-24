/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Date;
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
    private List<Participate> participates;

    @OneToMany(mappedBy = "course")
    private List<Post> posts;

    @ManyToMany(mappedBy = "courses")
    private List<Category> categories;

    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private List<Conversation> conversations;
}
