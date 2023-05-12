/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.RatingKey;
import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
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
@Table(name = "Rating")
public class Rating implements Serializable{
    @EmbeddedId
    private RatingKey ratingKey;
    
    
    private int noStar;
    private String ratingComment;
    
    @ManyToOne
    @MapsId("ratedFromUser")
    @JoinColumn(name = "ratedFromUser", referencedColumnName = "username")   
    private User ratedFromUser; 
    
    @ManyToOne
    @MapsId("ratedToUser")
    @JoinColumn(name = "ratedToUser", referencedColumnName = "username")  
    private User ratedToUser; 
}
