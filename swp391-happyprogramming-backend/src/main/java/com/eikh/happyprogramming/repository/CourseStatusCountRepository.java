package com.eikh.happyprogramming.repository;

import com.eikh.happyprogramming.modelkey.CourseStatusCountKey;
import com.eikh.happyprogramming.temptable.CourseStatusCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseStatusCountRepository extends JpaRepository<CourseStatusCount, CourseStatusCountKey> {

    @Query(value = "SELECT c.courseId as courseId, subq.statusId as statusId, COALESCE(countTable.statusCount, 0) AS statusCount\n"
            + "FROM Course c\n"
            + "JOIN `Status` as subq\n"
            + "LEFT JOIN (\n"
            + "  SELECT c.courseId, s.statusId, count(s.statusId) AS statusCount\n"
            + "  FROM `User` u\n"
            + "  JOIN Participate p ON u.username = p.username\n"
            + "  JOIN Course c ON p.courseId = c.courseId\n"
            + "  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole\n"
            + "  LEFT JOIN `Status` s ON s.statusId = p.statusId\n"
//            + "  WHERE p.participateRole IN (2, 3)\n"
            + "  GROUP BY c.courseId, s.statusId\n"
            + ") countTable ON c.courseId = countTable.courseId AND subq.statusId = countTable.statusId\n"
            + "ORDER BY c.courseId, subq.statusId;",
            nativeQuery = true)
    List<CourseStatusCount> getCourseStatusCounts();
}
