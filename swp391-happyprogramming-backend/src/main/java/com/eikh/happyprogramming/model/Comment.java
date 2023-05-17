/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "`Comment`")
public class Comment implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;
    
    private Date commentedAt;
    private String commentContent;
    
    @ManyToOne
    @JoinColumn(name = "postId")
    @JsonIgnore
    private Post post;
    
    @ManyToOne
    @JoinColumn(name = "commentedBy", referencedColumnName = "username")
    @JsonIgnore
    private User user;
    
}
