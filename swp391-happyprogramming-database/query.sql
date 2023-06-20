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

-- Statistic for all courses 
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
  -- WHERE p.participateRole IN (2, 3)
  GROUP BY c.courseId, s.statusId
) countTable ON c.courseId = countTable.courseId AND subq.statusId = countTable.statusId
ORDER BY c.courseId, subq.statusId;

-- Statistic for one or more course 
SELECT c.courseId as courseId, c.courseName, subq.statusId as statusId, COALESCE(countTable.statusCount, 0) AS statusCount
FROM Course c
JOIN `Status` as subq
LEFT JOIN (
  SELECT c.courseId, s.statusId, count(s.statusId) AS statusCount
  FROM `User` u
  JOIN Participate p ON u.username = p.username
  JOIN Course c ON p.courseId = c.courseId
  JOIN `ParticipateRole` r ON r.participateRole = p.participateRole
  LEFT JOIN `Status` s ON s.statusId = p.statusId
  -- WHERE p.participateRole IN (2, 3)
  GROUP BY c.courseId, s.statusId, c.courseName
) countTable ON c.courseId = countTable.courseId AND subq.statusId = countTable.statusId
 HAVING c.courseId IN (1,2,3, 10) 
ORDER BY c.courseId, subq.statusId;


SELECT * FROM `User` u JOIN Participate p ON u.username = p.username 
				  JOIN Course c ON p.courseId = c.courseId
                  JOIN Request re ON re.username = p.username 
                  WHERE  p.statusId = 0 AND re.requestStatus = 0
                  AND re.courseId = p.courseId AND re.courseId = 2
                  ORDER BY re.requestTime DESC ;
SELECT * FROM `User` u
JOIN Participate p ON u.username = p.username
JOIN Course c ON p.courseId = c.courseId
JOIN Request re ON re.username = p.username
WHERE p.statusId = 0 AND re.requestStatus = 0
  AND re.courseId = p.courseId AND re.courseId = 2
  AND (re.username, re.requestTime) IN (
    SELECT username, MAX(requestTime)
    FROM Request WHERE courseId = 2 AND requestStatus = 0
    GROUP BY username
  );
  
SELECT * FROM Request re 
JOIN Participate p ON re.username = p.username
JOIN Course c ON p.courseId = c.courseId
 JOIN `User` u ON u.username = p.username
WHERE p.statusId = 0 AND re.requestStatus = 0
  AND re.courseId = p.courseId AND re.courseId = 7
  AND (re.username, re.requestTime) IN (
    SELECT username, MAX(requestTime)
    FROM Request WHERE courseId = 7 AND requestStatus = 0
    GROUP BY username
  );
  
UPDATE Participate p SET p.statusId = 0 WHERE p.username = 'phucdl' AND p.courseId = 2;
select * from Participate p where p.username = 'phucdl' and p.courseId = 2;
select * from Participate p where p.courseId = 2;            
SELECT * FROM Request order by requestTime desc

SELECT * FROM `User` u
JOIN Participate p ON u.username = p.username
JOIN Course c ON p.courseId = c.courseId
JOIN Request re ON re.username = p.username
WHERE p.statusId = 0 AND re.requestStatus = 0
  AND re.courseId = p.courseId AND re.courseId = 2
  AND (re.username, re.requestTime) IN (
    SELECT username, MAX(requestTime)
    FROM Request WHERE courseId = 2 AND requestStatus = 0
    GROUP BY username
  );
  
SELECT * FROM Request re 
JOIN Participate p ON re.username = p.username
JOIN Course c ON p.courseId = c.courseId
 JOIN `User` u ON u.username = p.username
WHERE p.statusId IN ( 1, -1) AND re.requestStatus IN ( 1, -1)
  AND re.courseId = p.courseId AND re.courseId = 2
  AND (re.username, re.requestTime) IN (
    SELECT username, MAX(requestTime)
    FROM Request WHERE courseId = 2 AND requestStatus IN ( 1, -1)
    GROUP BY username
  ) ORDER BY re.requestTime desc LIMIT 10 ;
  
SELECT * FROM Conversation c WHERE c.courseId = 2
SELECT * FROM User_Conversation WHERE username = 'phucdl'
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', 2)
DELETE FROM User_Conversation WHERE username = 'phucdl' AND conversationId = 2
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuongmentorphucdl', 2)

select * from Participate p where p.username = 'huyenmentor'
select * from course

SELECT * FROM `User` u JOIN Participate p ON u.username = p.username 
           JOIN Course c ON p.courseId = c.courseId
           JOIN ParticipateRole r ON r.participateRole = p.participateRole
                     JOIN `Status` s ON s.statusId = p.statusId
                      WHERE c.courseId = 29  AND p.participateRole = 2
SELECT * FROM User_Conversation WHERE username = 'huyenmentor'
SELECT * FROM Conversation where conversationId = 27