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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "Post")
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    private Date postedAt;
    private String postContent;

    @ManyToOne
    @JoinColumn(name = "postedBy", referencedColumnName = "username")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "courseId")
    @JsonIgnore
    private Course course;

    @OneToMany(mappedBy = "post")
    private List<Attachment> attachments;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments;

}
