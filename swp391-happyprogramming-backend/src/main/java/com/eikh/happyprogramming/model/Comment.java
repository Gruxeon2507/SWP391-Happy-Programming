/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
@Table(name = "`Comment`")
public class Comment implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    
    private Timestamp commentedAt;
    private String commentContent;
    
    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;
    
    @ManyToOne
    @JoinColumn(name = "commentedBy", referencedColumnName = "username")
    @JsonIgnore
    private User user;
    
    @OneToMany(mappedBy = "parent")
    private List<Comment> replies;
    
    @ManyToOne
    @JoinColumn(name = "parentId", referencedColumnName = "commentId")
    @JsonIgnore
    private Comment parent;


}
