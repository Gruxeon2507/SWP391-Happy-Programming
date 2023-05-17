/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.repository.CourseRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maiphuonghoang
 */
@RestController
@RequestMapping("api/auth/courses")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @GetMapping
    List<Course> getAll() {
        return courseRepository.findAll();
    }

    @GetMapping("page")
    public List<Course> getBooks(
            @RequestParam Integer pageNumber,
            @RequestParam Integer pageSize
    ) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Course> pageBooks = courseRepository.findAll(pageable);
        List<Course> books = pageBooks.getContent();
        return books;
    }
    
    @GetMapping("/condition/page")
    public Page<Course> getCourses(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "courseId") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return courseRepository.findAll(pageable);
    }
    
}
