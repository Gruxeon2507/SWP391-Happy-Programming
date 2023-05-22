/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Category;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
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

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/courses")
public class CourseController {

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ParticipateRepository participateRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    
    @GetMapping
    List<Course> getAll() {
        return courseRepository.findAll();
    }

    /**
     * @author maiphuonghoang
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
     * @author maiphuonghoang
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
     * @author maiphuonghoang
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

    /**
     * @author maiphuonghoang
     *
     * get Course by username, statusId and participateRole in (mentor, mentee)
     */
    @GetMapping("/by-user")
    List<Course> getCourseByUsernameAndStatus(HttpServletRequest request,
            @RequestParam(defaultValue = "1") Integer statusId) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            return courseRepository.getCourseByUsernameAndStatusId(username, statusId);

        } catch (Exception e) {
            System.out.println("non valid token");
        }
        return null;
    }

    /**
     * @author maiphuonghoang
     *
     * Get Mentor and Mentee of course
     */
    @GetMapping("/find-user/{courseId}")
    List<User> getUserOfCourse(@PathVariable Integer courseId) {
        return userRepository.getUserOfCourse(courseId);
    }

    /**
     * @author maiphuonghoang
     *
     * get Mentor of Course
     */
    @GetMapping("/find-mentor/{courseId}")
    User getMentorOfCourse(@PathVariable Integer courseId) {
        User user = userRepository.getMentorOfCourse(courseId);
//        System.out.println(user.getDisplayName());
        List<Participate> p = participateRepository.findByUsername(user.getUsername());
        System.out.println(p.get(0).getCourse().getCourseName());
        return userRepository.getMentorOfCourse(courseId);
//        return null;
    }

    @GetMapping("/courseDetails/{courseId}")
    public List<Course> getCourseByID(@PathVariable Integer courseId) {
        return courseRepository.findByCourseId(courseId);
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
