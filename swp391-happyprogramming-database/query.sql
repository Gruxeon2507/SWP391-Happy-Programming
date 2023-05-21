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
                  WHERE u.username = 'duckm' AND p.statusId = 1 AND p.participateRole IN (2,3)
                  
		
                  

                  
