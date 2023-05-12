/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kmd
 */
public interface UserRepository extends JpaRepository<User, String>{
    
     User findByUsername(String username);
    
}
