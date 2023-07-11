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
import java.util.List;
import javax.mail.Part;
import javax.transaction.Transactional;
import org.hibernate.annotations.Parent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author huyen
 */
public interface ParticipateRepository extends JpaRepository<Participate, ParticipateKey> {

    @Query(value = "select * from Participate p where p.username = ?1", nativeQuery = true)
    public List<Participate> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES (:username, :courseId, :participateRoleId, :statusId);", nativeQuery = true)
    public void saveParticipate(String username, int courseId, int participateRoleId, int statusId);

    @Query(value = "SELECT * FROM Participate WHERE courseId = :courseId", nativeQuery = true)
    public List<Participate> getParticipatesByCourseId(int courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Participate WHERE courseId = :courseId", nativeQuery = true)
    public void deleteParticipatesByCourseId(int courseId);

    @Query(value = "SELECT * FROM Participate WHERE username = :username AND courseId = :courseId", nativeQuery = true)
    public Participate getUserParticipateFromCourse(String username, int courseId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Participate p SET p.statusId = :statusId WHERE p.username = :username AND p.courseId = :courseId", nativeQuery = true)
    public void updateStatus(Integer statusId, Integer courseId, String username);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Participate WHERE username = :username AND courseId = :courseId", nativeQuery = true)
    public void deleteParticipate(String username, int courseId);

    @Query(value = "select * from Participate p where p.username = ?1 and courseId = ?2", nativeQuery = true)
    public Participate findByUsernameCourseId(String username, int courseId);

    @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
            + "           JOIN Course c ON p.courseId = c.courseId \n"
            + "           JOIN ParticipateRole r ON r.participateRole = p.participateRole \n"
            + "                     JOIN `Status` s ON s.statusId = p.statusId \n"
            + "                      where u.username = :username \n"
            + "                      AND p.participateRole IN :participateRoles AND s.statusId IN :statusIds\n"
            + "                      AND c.courseName LIKE %:searchText% ", nativeQuery = true)
    Page<Participate> findAllMyParticipateCourse(Pageable pageable, String username, Integer[] participateRoles, Integer[] statusIds, String searchText);

    @Query(value = "SELECT * FROM FU_SWP391_HappyProgramming.Participate WHERE participateRole=2 AND statusId = 1",nativeQuery = true)
    public List<Participate> findAllMentorCourse();

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Participate WHERE username = :username AND courseId = :courseId AND participateRole = 2",nativeQuery = true)
    public void deleteMentorCourse(String username,int courseId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Participate VALUES(:courseId,:username,2,1)",nativeQuery = true)
    public void insertMentorCourse(int courseId, String username);




}
