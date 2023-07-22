/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.ParticipateKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
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
@Table(name = "Participate")
public class Participate implements Serializable {

    @EmbeddedId
    private ParticipateKey participateKey;

    @ManyToOne
    @MapsId("username")
    @JoinColumn(name = "username")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "courseId")
    private Course course;

    @ManyToOne
    @JoinColumn(name = "statusId")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "participateRole")
    private ParticipateRole participateRole;

    @OneToMany(mappedBy = "participate", cascade = CascadeType.REMOVE)
    private List<Request> requests;

//    @ManyToOne
//    @JoinColumn(name = "participateRole", referencedColumnName = "roleId")
//    @JsonIgnore
//    private  Role role;
}
