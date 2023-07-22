package com.eikh.happyprogramming.controller;

import com.eikh.happyprogramming.configuration.JwtTokenFilter;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.User;
import com.eikh.happyprogramming.repository.CourseRepository;
import com.eikh.happyprogramming.repository.CourseStatusCountRepository;
import com.eikh.happyprogramming.repository.UserRepository;
import com.eikh.happyprogramming.temptable.CourseStatusCount;
import com.eikh.happyprogramming.utils.JwtTokenUtil;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
/**
 *
 * @author emiukhoahoc
 */
@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("")
public class CourseStatusCountController {

    @Autowired
    private CourseStatusCountRepository countRepository;

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;
    @Autowired
    UserRepository userRepository;
    //@maiphuonghoang
    //thống kê tất cả course 
    @GetMapping("/courseStatusCounts")
    public List<CourseStatusCount> getAllCourseStatusCounts() {
        return countRepository.getAllCourseStatusCounts();
    }

    //@maiphuonghoang
    //thống kê theo 1 courseId hoặc tất cả course của mentor 
    @GetMapping("/courseStatusCounts/mentor")
    public List<CourseStatusCount> getCourseStatusCountsByCourseId(HttpServletRequest request,
            @RequestParam(defaultValue = "0") int courseId) {
        String token = jwtTokenFilter.getJwtFromRequest(request);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        List<Integer> courseIds = new ArrayList<>();

        if (courseId == 0) {//lấy tất cả course của mentor 
            List<Course> courses = courseRepository.getCourseOfMentor(username);
            for (Course course : courses) {
                courseIds.add(course.getCourseId());
            }
        }
        else
            courseIds.add(courseId);

        System.out.println(courseIds);
        return countRepository.getCourseStatusCountsByCourseId(courseIds);
    }


}
