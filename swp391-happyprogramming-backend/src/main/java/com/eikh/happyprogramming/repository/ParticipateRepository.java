/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.Role;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.modelkey.ParticipateKey;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author huyen
 */
public interface ParticipateRepository extends JpaRepository<Participate, ParticipateKey> {

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Participate (username, courseId, participateRoleId, statusId) VALUES (:username, :courseId, :participateRoleId, :statusId);", nativeQuery = true)
    public void saveParticipate(String username, int courseId, int participateRoleId, int statusId);
}
