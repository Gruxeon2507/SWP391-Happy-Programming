/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Category;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CategoryRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author maiphuonghoang
 */
@CrossOrigin("*")
@RestController
@RequestMapping("api/courses")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ParticipateRepository participateRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("/countAll")
    public long getNoCourse() {
        return courseRepository.count();
    }

    @GetMapping("/countCourseUser")
    public long countCourseUser(@RequestParam int courseId) {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isPresent()) {
            Course c = course.get();
            return c.getParticipates().size();
        }
        return 0;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Course course, HttpServletRequest request) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User adminUser = userRepository.userHasRole(username, 1);
        if (adminUser != null) {
            java.util.Date today = new java.util.Date();
            java.sql.Date createdAt = new java.sql.Date(today.getTime());
            course.setCreatedAt(createdAt);
//        Insert into Course
            Course newCourse = courseRepository.save(course);

//         Insert into Course_Category
            for (Category c : newCourse.getCategories()) {
                categoryRepository.saveCourseCategory(c.getCategoryId(), newCourse.getCourseId());
            }
//             Insert admin into participate table
            participateRepository.saveParticipate(username, newCourse.getCourseId(), 1, 1);
            return ResponseEntity.ok(newCourse);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @DeleteMapping("/delete/{courseId}")
    public ResponseEntity<?> deleteCourse(@PathVariable int courseId, HttpServletRequest request) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User adminUser = userRepository.userHasRole(username, 1);
        if (adminUser != null) {
            participateRepository.deleteParticipatesByCourseId(courseId);
            courseRepository.deleteCourseCategoryBycourseId(courseId);
            courseRepository.deleteById(courseId);
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
