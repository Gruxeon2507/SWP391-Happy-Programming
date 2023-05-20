/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.ParticipateKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
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
public class Participate implements Serializable {

    @EmbeddedId
    private ParticipateKey participateKey;

    @ManyToOne
    @MapsId("username")
    @JoinColumn(name = "username")
//    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "courseId")
    @JsonIgnore
    private Course course;


    @ManyToOne
    @JoinColumn(name = "statusId")
    @JsonIgnore
    private Status status;
    
//    @ManyToOne
//    @JoinColumn(name = "participateRole")
//    @JsonIgnore
//    private ParticipateRole participateRole;
    @ManyToOne
    @JoinColumn(name = "participateRole", referencedColumnName = "roleId")
    @JsonIgnore
    private  Role role;

}
