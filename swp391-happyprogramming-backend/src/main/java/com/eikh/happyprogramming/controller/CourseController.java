/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maiphuonghoang
 */
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/auth/courses")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

//    @GetMapping
//    List<Course> getAll() {
//        return courseRepository.findAll();
//    }
    /**
     * Author: maiphuonghoang
     *
     * Paging, sorting for all course in homepage
     */
    @GetMapping("/page")
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

    /**
     * Author: maiphuonghoang
     *
     * Paging, sorting for course by categories in homepage
     */
    @GetMapping("/by-categories/{categoryIds}")
    public Page<Course> getPageCoursesByCategories(
            @PathVariable("categoryIds") Integer[] categoryIds,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "courseId") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {

        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        List<Course> courses = courseRepository.getCourseByCategoryIds(categoryIds);
        List<Integer> courseIds = new ArrayList<>();
        for (Course course : courses) {
            courseIds.add(course.getCourseId());
        }
        Page<Course> pageCourses = courseRepository.findByCourseIdIn(courseIds, pageable);
        return pageCourses;
    }

    /**
     * Author: maiphuonghoang
     *
     * Filter, paging, sorting for all course or by categories course
     */
    @GetMapping("/search/{searchText}")
    ResponseEntity<Page<Course>> findAllPublic(
            @PathVariable String searchText,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "courseId") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        if (searchText.length() < 1) {
            return new ResponseEntity<>(courseRepository.findAll(pageable), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(courseRepository.findAllSearch(pageable, searchText), HttpStatus.OK);

        }
    }

//    @GetMapping("by-user/{username}")
//    List<User> getCourseByUsernameAndStatus(@PathVariable String username,
//            @RequestParam(defaultValue = "1") Integer status) {
//        return userRepository.getCourseByUsernameAndStatus(username, status);
//    }

    /**
     * Author: maiphuonghoang
     *
     * get Course by username, statusId and participateRole in (mentor, mentee)
     */
    @GetMapping("by-user/{username}")
    List<Course> getCourseByUsernameAndStatus(@PathVariable String username,
            @RequestParam(defaultValue = "1") Integer status) {
        return courseRepository.getCourseByUsernameAndStatus(username, status);
    }
}
