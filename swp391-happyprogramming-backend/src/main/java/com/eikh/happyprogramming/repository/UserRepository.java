/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface UserRepository extends JpaRepository<User, String> {

    public User findByUsername(String username);

    public List<User> findByIsVerified(boolean isVerified);

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

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.roleId = :roleId")
    List<User> findByRoleId(Integer roleId);
}
