/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Role;
import com.eikh.happyprogramming.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface UserRepository extends JpaRepository<User, String>{
    
     public User findByUsername(String username);
     
     public List<User> findByIsVerified(boolean isVerified);
     
     public User findByMail(String mail);
     
     @Query("select u from User u join u.roles r where r.roleId = 2")
     public List<User> getAllMentors();
     
     @Query(value = "SELECT * FROM `User` u JOIN User_Role ur on u.username = ur.username WHERE u.username = :username and ur.roleId = :roleId", nativeQuery = true)
     public User userHasRole(String username, int roleId);
}
