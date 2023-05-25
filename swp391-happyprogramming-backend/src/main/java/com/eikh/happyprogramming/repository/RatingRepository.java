/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Rating;
import com.eikh.happyprogramming.modelkey.RatingKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author huyen
 */
public interface RatingRepository extends JpaRepository<Rating, RatingKey>{
    @Query(value = "select round(avg(noStar)) from Rating where ratedToUser = :username", nativeQuery = true)
    int getAvgRatingByMentor(String username);
}
