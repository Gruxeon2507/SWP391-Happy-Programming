package com.eikh.happyprogramming.services;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServices {
    @Autowired
    CourseRepository courseRepository;

    public boolean isCourseNameTaken(String courseName){
        List<Course> courses = courseRepository.findByCourseName(courseName);
        return courses.size() > 0;
    }
}
