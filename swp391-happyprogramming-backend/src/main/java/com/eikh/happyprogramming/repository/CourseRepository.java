/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author huyen
 */
public interface CourseRepository  extends JpaRepository<Course, Integer>{
    
}
