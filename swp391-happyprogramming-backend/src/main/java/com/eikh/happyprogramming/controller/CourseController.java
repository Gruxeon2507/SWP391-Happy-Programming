/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Category;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.Post;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CategoryRepository;
import com.eikh.happyprogramming.repository.ConversationRepository;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.ParticipateRepository;
import com.eikh.happyprogramming.repository.PostRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.repository.User_ConversationRepository;
import com.eikh.happyprogramming.services.CourseServices;
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

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("api/courses")
public class CourseController {
    @Autowired
    CourseServices courseServices;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ParticipateRepository participateRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private User_ConversationRepository user_ConversationRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Autowired
    PostRepository postRepository;

    @GetMapping
    List<Course> getAll() {
        return courseRepository.findAll();
    }

    /**
     * @author maiphuonghoang
     * <p>
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
     * <p>
     * get Courses of active Mentor
     */
    @GetMapping("/by-mentor")
    List<Course> getCourseOfMentor(HttpServletRequest request) {
        try {
            String token = jwtTokenFilter.getJwtFromRequest(request);
            String username = jwtTokenUtil.getUsernameFromToken(token);
            return courseRepository.getCourseOfMentor(username);
        } catch (Exception e) {
            System.out.println("non valid token");
        }
        return null;
    }

    /**
     * @author maiphuonghoang
     * <p>
     * Get Mentor and Mentee of course
     */
    @GetMapping("/find-user/{courseId}")
    List<User> getUserOfCourse(@PathVariable Integer courseId,
                               @RequestParam(defaultValue = "1") Integer statusId
    ) {
        return userRepository.getUserOfCourseByStatusId(courseId, statusId);
    }

    /**
     * @author maiphuonghoang
     * <p>
     * get Mentor of Course
     */
    @GetMapping("/find-mentor/{courseId}")
    List<User> getMentorsOfCourse(@PathVariable Integer courseId) {
//        List<User> mentors = userRepository.getMentorsOfCourse(courseId);
//        List<Participate> p = participateRepository.findByUsername(mentors.getUsername());
//        System.out.println(p.get(0).getCourse().getCourseName());
        return userRepository.getMentorsOfCourse(courseId);
//        return null;
    }

    @GetMapping("/courseDetails/{courseId}")
    public Course getCourseByID(@PathVariable Integer courseId) {
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
//          Insert into Course
            if (courseServices.isCourseNameTaken(course.getCourseName()) || course.getCourseName().trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            } else {
                Course newCourse = courseRepository.save(course);
//              Insert into Course_Category
                for (Category c : newCourse.getCategories()) {
                    categoryRepository.saveCourseCategory(c.getCategoryId(), newCourse.getCourseId());
                }
//              Insert admin into participate table
                participateRepository.saveParticipate(username, newCourse.getCourseId(), 1, 1);
                return ResponseEntity.ok(newCourse);
            }
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

    @GetMapping("/posts/{courseId}")
    public ResponseEntity<?> getCoursePost(HttpServletRequest request, @PathVariable("courseId") int courseId) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        User user = userRepository.findEnrolledUserInCourse(username, courseId);
        if (user != null) {
            List<Post> posts = postRepository.findByCourse(courseRepository.ducFindByCourseId(courseId));
            return ResponseEntity.ok(posts);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/all")
    ResponseEntity<Page<Course>> getAllCourses(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "20") int pageSize,
            @RequestParam(defaultValue = "") String searchText,
            @RequestParam(defaultValue = "") Integer[] categoryIds,
            @RequestParam(defaultValue = "courseId") String sortField,
            @RequestParam(defaultValue = "asc") String sortOrder
    ) {
        System.out.println(searchText + categoryIds + sortField + sortOrder);
        Sort sort = Sort.by(sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortField);
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Course> pageCourses;
        //by all 
        if (categoryIds.length == 0) {
            System.out.println("chay ham alll");
            pageCourses = courseRepository.findAllSearch(pageable, searchText);
        } //by categoryId
        else {
            System.out.println("chay ham category");
            pageCourses = courseRepository.getConditionCourses(pageable, categoryIds, searchText);
        }

        return new ResponseEntity<>(pageCourses, HttpStatus.OK);

    }

    @GetMapping("find/by-name/{courseName}")
    public List<Course> findCourseByCourseName(@PathVariable String courseName) {
        return courseRepository.findByCourseName(courseName);
    }
    @GetMapping("ratingCourse/{username}")
    public ResponseEntity<?> ratingCourse(@PathVariable("username") String username,
                                          HttpServletRequest request){
        String usernameMentee = jwtTokenUtil.getUsernameFromToken(jwtTokenFilter.getJwtFromRequest(request));
        List<Course> courses = courseRepository.findAllCourseMentorOfMentee(username, usernameMentee);
        return ResponseEntity.ok(courses);
    }



}
