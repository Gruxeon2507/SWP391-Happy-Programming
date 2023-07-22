package com.eikh.happyprogramming.DTO;

import com.eikh.happyprogramming.model.Category;
import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Participate;
import com.eikh.happyprogramming.model.User;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class CourseRequestDTO implements Serializable {
    private int courseId;
    private String courseName;
    private String courseDescription;
    private List<Category> categories;
    private List<User> mentors;

//    public static Course of (CourseRequestDTO courseDTO){
//        return builder().courseId(courseDTO.getCourseId())
//                .courseName(courseDTO.getCourseName())
//                .courseDescription(courseDTO.getCourseDescription())
//                .categories(courseDTO.getCategories()).build();
//    }
}
