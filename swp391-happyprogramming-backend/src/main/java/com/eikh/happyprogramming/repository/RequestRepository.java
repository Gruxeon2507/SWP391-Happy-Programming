/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.modelkey.RequestKey;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author
 */
public interface RequestRepository extends JpaRepository<Request, RequestKey> {

    @Query(value = "SELECT * FROM Request re \n"
            + "JOIN Participate p ON re.username = p.username\n"
            + "JOIN Course c ON p.courseId = c.courseId\n"
            + " JOIN `User` u ON u.username = p.username \n"
            + "WHERE p.statusId = 0 AND re.requestStatus = 0\n"
            + "  AND re.courseId = p.courseId AND re.courseId = :courseId\n"
            + "  AND (re.username, re.requestTime) IN (\n"
            + "    SELECT username, MAX(requestTime)\n"
            + "    FROM Request WHERE courseId = 2 AND requestStatus = 0\n"
            + "    GROUP BY username)\n", nativeQuery = true)
    public Page<Request> getRequestsUserOfCourse(Pageable pageable, Integer courseId);
}
