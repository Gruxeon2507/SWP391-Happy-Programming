/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.modelkey.ParticipateKey;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author ADMIN
 */
public interface ParticipateRepository extends JpaRepository<Participate, ParticipateKey>{

    @Query(value = "select * from Participate p where p.username = ?1",nativeQuery = true)
    public List<Participate> findByUsername(String username);

    
}
