/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Role;
import com.eikh.happyprogramming.model.User;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface UserRepository extends JpaRepository<User, String> {

    public User findByUsername(String username);

    public List<User> findByIsVerified(boolean isVerified);
    
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO User_Role (username, roleId) VALUES (:username, '3');",nativeQuery = true)
    public boolean insertRole(String username);

    public User findByMail(String mail);

    //@maiphuonghoang
//    @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
//            + "				  JOIN Course c ON p.courseId = c.courseId\n"
//            + "                  JOIN Role r ON r.roleId = p.participateRole\n"
//            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
//            + "                  WHERE c.courseId = :courseId  AND p.participateRole IN (2,3)", nativeQuery = true)
//    public List<User> getUserOfCourse(Integer courseId);
//    
//    //@maiphuonghoang
//    @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
//            + "				  JOIN Course c ON p.courseId = c.courseId\n"
//            + "                  JOIN Role r ON r.roleId = p.participateRole\n"
//            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
//            + "                  WHERE c.courseId = :courseId  AND p.participateRole = 2", nativeQuery = true)
//    public User getMentorOfCourse(Integer courseId);
    
    
        //@maiphuonghoang
    @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
            + "				  JOIN Course c ON p.courseId = c.courseId\n"
            + "                  JOIN ParticipateRole r ON r.participateRole = p.participateRole\n"
            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
            + "                  WHERE c.courseId = :courseId  AND p.participateRole IN (2,3)", nativeQuery = true)
    public List<User> getUserOfCourse(Integer courseId);
    
    //@maiphuonghoang
    @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
            + "				  JOIN Course c ON p.courseId = c.courseId\n"
            + "                  JOIN ParticipateRole r ON r.participateRole = p.participateRole\n"
            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
            + "                  WHERE c.courseId = :courseId  AND p.participateRole = 2", nativeQuery = true)
    public User getMentorOfCourse(Integer courseId);
     
     @Query("select u from User u join u.roles r where r.roleId = 2")
     public List<User> getAllMentors();
     
     @Query(value = "SELECT * FROM `User` u JOIN User_Role ur on u.username = ur.username WHERE u.username = :username and ur.roleId = :roleId", nativeQuery = true)
     public User userHasRole(String username, int roleId);
}
