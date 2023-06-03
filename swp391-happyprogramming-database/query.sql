USE FU_SWP391_HappyProgramming;

SELECT -- *
	u.username, c.courseId, c.courseName, p.participateRole, r.roleName, s.statusId, s.statusName
	FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN `Role` r ON r.roleId = p.participateRole
                  JOIN `Status` s ON s.statusId = p.statusId
                  WHERE u.username = "hieudt" AND p.statusId = 0
-- "huyenmentor", "huyenntk", "phuonghm", "anmentor", "hieudt"
				AND p.participateRole IN (2,3) 
                
;	

SELECT * FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
                  JOIN `Status` s ON s.statusId = p.statusId
                  WHERE u.username = 'duckm' AND p.statusId = 1 AND p.participateRole IN (2,3);
                  
SELECT * FROM  Course c JOIN Participate p ON p.courseId = c.courseId  
JOIN `Status` s ON s.statusId = p.statusId
where participateRole = 2 and username = 'phuongmentor' AND p.statusId = 1
;       
-- ALL INFO    
SELECT u.username, c.courseId, c.courseName, s.* FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
                  JOIN `Status` s ON s.statusId = p.statusId
				  WHERE p.participateRole IN (2,3) order by c.courseId
;
-- statusId	  count(s.statusId)
SELECT s.statusId, count(s.statusId) FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
                  JOIN `Status` s ON s.statusId = p.statusId
				  WHERE p.participateRole IN (2,3) group by s.statusId
;
-- k xh 3 status 
SELECT c.courseId, s.statusId, count(s.statusId) FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
                  JOIN `Status` s ON s.statusId = p.statusId
				  WHERE p.participateRole IN (2,3) group by p.statusId, c.courseId
                  order by c.courseId ;
select sleep(5);

-- xh đủ 3 status của course 
-- COALESCE function to handle cases where the count is NULL
SELECT c.courseId, subq.statusId, COALESCE(countTable.statusCount, 0) AS statusCount
FROM Course c
JOIN `Status` as subq
LEFT JOIN (
  SELECT c.courseId, s.statusId, count(s.statusId) AS statusCount
  FROM `User` u
  JOIN Participate p ON u.username = p.username
  JOIN Course c ON p.courseId = c.courseId
  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
  LEFT JOIN `Status` s ON s.statusId = p.statusId
  WHERE p.participateRole IN (2, 3)
  GROUP BY c.courseId, s.statusId
) countTable ON c.courseId = countTable.courseId AND subq.statusId = countTable.statusId
ORDER BY c.courseId, subq.statusId;

