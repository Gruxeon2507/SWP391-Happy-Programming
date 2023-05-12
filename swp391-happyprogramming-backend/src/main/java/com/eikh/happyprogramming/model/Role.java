/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.*;

/**
 *
 * @author emiukhoahoc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Role")
public class Role  implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roleId;
    private String roleName;
    
    @ManyToMany
    @JoinTable(name = "User_Role",
            joinColumns = @JoinColumn(name = "roleId"),
            inverseJoinColumns = @JoinColumn(name = "username"))
    @JsonIgnore
    private List<User> users;

    @ManyToMany
    @JoinTable(name = "Role_Feature",
            joinColumns = @JoinColumn(name = "roleId"),
            inverseJoinColumns = @JoinColumn(name = "featureId"))
    private List<Feature> features;

    @Override
    public String toString() {
        return  roleName;
    }

    @OneToOne( mappedBy = "role")
    private Participate participateRole;
}
