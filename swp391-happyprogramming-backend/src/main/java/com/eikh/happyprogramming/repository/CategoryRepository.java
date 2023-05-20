/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author ADMIN
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    //mph 
    @Query("select c from Category c join c.courses co where co.courseId = :courseId")
    public List<Category> getCategoryByCourseId(Integer courseId);
    
}
