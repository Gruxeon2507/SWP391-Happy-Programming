/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Course;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author emiukhoahoc 
 */
public interface CourseRepository extends JpaRepository<Course, Integer>{
    Page<Course> findAll(Pageable pageable);

    @Query("select distinct co from Course co join co.categories c where c.categoryId in :categoryIds")
    public List<Course> getCourseByCategoryIds(Integer[] categoryIds);

    public Page<Course> findByCourseIdIn(List<Integer> courseIds, Pageable pageable);
    
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Course_Category where courseId = :courseId", nativeQuery = true)
    public void deleteCourseCategoryBycourseId(@Param("courseId") int courseId);
}
