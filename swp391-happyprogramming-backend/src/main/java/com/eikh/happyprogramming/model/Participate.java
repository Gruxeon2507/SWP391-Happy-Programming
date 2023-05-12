/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.ParticipateKey;
import java.io.Serializable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
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
@Table(name = "Participate")
public class Participate implements Serializable{
    @EmbeddedId
    private ParticipateKey participateKey;
    
    @ManyToOne
    @MapsId("username")
    @JoinColumn(name = "username")
    private User user; 
    
    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "courseId")
    private Course course; 
    
    @OneToOne
    @JoinColumn(name = "participateRole", referencedColumnName = "roleId")
    private Role role;
    
    private boolean status;
    
     
    
}
