/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Course;
import com.eikh.happyprogramming.model.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author kmd
 */
public interface PostRepository extends JpaRepository<Post, Integer>{

    public List<Post> findByCourse(Course course);

    @Query(value="SELECT * FROM COURSE c WHERE c.courseId=?1 ORDER BY c.postedAt desc",nativeQuery = true)
    public List<Post> getOrderByCourse(int courseId);
    
    @Query(value = "SELECT * FROM Post p WHERE p.postId = :postId AND postedBy = :username", nativeQuery = true)
    public Post userHasPost(String username, int postId);
    
}
