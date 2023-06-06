/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.modelkey;

import com.eikh.happyprogramming.model.User;
import java.io.Serializable;
import javax.persistence.Embeddable;
import lombok.*;

/**
 *
 * @author emiukhoahoc
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class RatingKey implements Serializable{
    private String ratedFromUser;
    private String ratedToUser;
    private int courseId;
}
