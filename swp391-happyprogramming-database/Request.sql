USE FU_SWP391_HappyProgramming;
-- Insert into Request
-- Mentor dạy 
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'ducmentor', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangmentor', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'anmentor', '5', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '6', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '7', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '7', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'ducmentor', '8', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangmentor', '9', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'anmentor', '10', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '11', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '12', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'ducmentor', '13', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangmentor', '14', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'anmentor', '15', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '16', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '17', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'ducmentor', '18', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangmentor', '19', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'anmentor', '20', '1');
-- Mentor học 
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuongmentor', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'ducmentor', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangmentor', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'anmentor', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenmentor', '3', '1');

-- Admin chỉ join 
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'eikh', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'eikh', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'eikh', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'eikh', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'eikh', '5', '1');

-- Mentee học
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenntk', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '1', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '1', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '1', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '1', '-1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '1', '-1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '1', '1');


INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenntk', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '2', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '2', '0');

-- Lịch sử request
-- Mentee đang pending trong participate 
INSERT INTO Request (username, courseId, requestStatus, requestTime) VALUES ('phucdl', '2', '-1', '2023-06-04');
INSERT INTO Request (username, courseId, requestStatus, requestTime) VALUES ('phucdl', '2', '0', '2023-06-05');
-- Mentee đang access trong participate 
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-02' ,'antt', '2', '-1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-03' ,'antt', '2', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-04' ,'antt', '2', '1');

INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenntk', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '3', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '3', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '3', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '3', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '3', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '3', '1');

INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'huyenntk', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '4', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '4', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '4', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '4', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '4', '1');


INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '5', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '5', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'nhatvn', '5', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '5', '1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '5', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '5', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '5', '-1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '5', '-1');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '5', '1');

INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'nhatvn', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '6', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '6', '0');

INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'giangpt', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'duckm', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'nhatvn', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phuonghm', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'dungbt', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'phucdl', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'hieudt', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'minhnd', '7', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01' ,'antt', '7', '0');

INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01 01:00:00' ,'hieudt', '5', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus, requestReason) VALUES ('2023-06-01 02:00:00' ,'hieudt', '5', '-1', 'This course is only for mentor');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01 03:00:00' ,'hieudt', '5', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus, requestReason) VALUES ('2023-06-01 04:00:00' ,'hieudt', '5', '-1', 'This course is only for mentor');
INSERT INTO Request (requestTime, username, courseId, requestStatus) VALUES ('2023-06-01 01:00:00' ,'minhnd', '5', '0');
INSERT INTO Request (requestTime, username, courseId, requestStatus, requestReason) VALUES ('2023-06-02 03:00:00' ,'minhnd', '5', '-1', 'This course is only for mentor');

