/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.model;

import com.eikh.happyprogramming.modelkey.RequestKey;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
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
@Table(name = "Request")
public class Request implements Serializable {

    @EmbeddedId
    private RequestKey requestKey;

    @ManyToOne
    @JoinColumn(name = "requestStatus", referencedColumnName = "statusId")
    private Status status;

    @ManyToOne
    @MapsId("requestKey") // Refers to the composite key of EntityA
    @JoinColumns({
        @JoinColumn(name = "username", referencedColumnName = "username"),
        @JoinColumn(name = "courseId", referencedColumnName = "courseId")
    })
    @JsonIgnore
    private Participate participate;
    
    private String requestReason;

}
