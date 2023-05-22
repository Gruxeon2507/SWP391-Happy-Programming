/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Category;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ADMIN
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("select c from Category c join c.courses co where co.courseId = :courseId")
    public List<Category> getCategoryByCourseId(Integer courseId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Course_Category (categoryId, courseId) VALUES (:categoryId, :courseId);", nativeQuery = true)
    public void saveCourseCategory(@Param("categoryId") Integer categoryId, @Param("courseId") Integer courseId);

}
