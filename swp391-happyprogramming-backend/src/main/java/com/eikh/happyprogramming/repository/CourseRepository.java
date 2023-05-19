/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Course;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author emiukhoahoc 
 */
public interface CourseRepository extends JpaRepository<Course, Integer>{
    Page<Course> findAll(Pageable pageable);
    
    @Query("select distinct co from Course co join co.categories c where c.categoryId in :categoryIds")
    public List<Course> getCourseByCategoryIds(Integer[] categoryIds);

    public Page<Course> findByCourseIdIn(List<Integer> courseIds, Pageable pageable);
    
    @Query(value = "select * from Course co where co.courseName LIKE %?1% OR co.createdAt LIKE %?1%" , nativeQuery = true)
    Page<Course> findAllSearch(Pageable pageable, String searchText);

    public List<Course> findByCourseId(int courseId);
    
        @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
            + "				  JOIN Course c ON p.courseId = c.courseId\n"
            + "                  JOIN Role r ON r.roleId = p.participateRole\n"
            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
            + "                  WHERE u.username = :username AND p.statusId = :statusId AND p.participateRole IN (2,3)", nativeQuery = true)
    public List<Course> getCourseByUsernameAndStatusId(String username, Integer statusId);
    
        @Query(value = "SELECT * FROM `User` u JOIN Participate p ON u.username = p.username \n"
            + "				  JOIN Course c ON p.courseId = c.courseId\n"
            + "                  JOIN ParticipateRole r ON r.participateRole = p.participateRole\n"
            + "                  JOIN `Status` s ON s.statusId = p.statusId\n"
            + "                  WHERE u.username = :username AND p.participateRole IN (2,3)", nativeQuery = true)
    public List<Course> getCourseByUsername(String username);

}
