/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.model.Request;
import com.eikh.happyprogramming.modelkey.RequestKey;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

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
            + "    FROM Request WHERE courseId = :courseId AND requestStatus = 0\n"
            + "    GROUP BY username)\n", nativeQuery = true)
    public Page<Request> getRendingRequestOfCourse(Pageable pageable, Integer courseId);

    @Query(value = "SELECT * FROM Request re \n"
            + "JOIN Participate p ON re.username = p.username\n"
            + "JOIN Course c ON p.courseId = c.courseId\n"
            + " JOIN `User` u ON u.username = p.username\n"
            + "WHERE p.statusId IN ( 1, -1) AND re.requestStatus IN ( 1, -1)\n"
            + "  AND re.courseId = p.courseId AND re.courseId = :courseId\n"
            + "  AND (re.username, re.requestTime) IN (\n"
            + "    SELECT username, MAX(requestTime)\n"
            + "    FROM Request WHERE courseId = :courseId AND requestStatus IN ( 1, -1)\n"
            + "    GROUP BY username\n"
            + "  ) ORDER BY re.requestTime desc LIMIT 10 \n", nativeQuery = true)
    public List<Request> getAccessRejectRequest(Integer courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Request WHERE username = :username AND courseId = :courseId", nativeQuery = true)
    public void deleteAllRequests(String username, int courseId);
    
    

}
