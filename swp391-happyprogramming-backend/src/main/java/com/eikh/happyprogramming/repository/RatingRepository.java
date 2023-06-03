/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Rating;
import com.eikh.happyprogramming.modelkey.RatingKey;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author giangpt
 */
public interface RatingRepository extends JpaRepository<Rating, RatingKey>{
    
}
