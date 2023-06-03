/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Rating;
import com.eikh.happyprogramming.modelkey.RatingKey;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author giangpt
 */
public interface RatingRepository extends JpaRepository<Rating, RatingKey>{
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Rating VALUES (:usernameMentee,:usernameMentor,:noStar,:courseId,:comment)",
            nativeQuery = true)
    public void addRateFromMentorToMentee(String usernameMentee,String usernameMentor,int noStar, int courseId,String comment);
}
