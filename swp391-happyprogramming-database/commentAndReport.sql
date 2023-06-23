USE FU_SWP391_HappyProgramming;

-- Insert into Post
insert into Post (postedAt, postContent, courseId, postedBy) values ('2023-06-24 00:00:00', '<p>bai mo dau</p>', 1, 'huyenmentor');

-- Insert into Comment
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello huyen', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'co huyen', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 1', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 2', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 3', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 4', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 5', 1, 'huyenmentor');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 6', 1, 'huyenmentor');

-- Insert into Report Type
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Others', 'Content does not fit into any other specified category.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Nudity', 'Content contains explicit or sexually explicit images or videos.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Violence', 'Content contains violent or graphic images or videos.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Harassment', 'Report content where users are being harassed, bullied, or subjected to abusive behavior.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Suicide or self-injury', 'Content depicts or promotes self-harm or suicide.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('False information', 'Content contains misleading or false information.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Spam', 'Content appears to be spam, such as unsolicited advertisements or repetitive messages.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Unauthorised sales', 'Content involves unauthorized sales or offers of goods or services.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Hate speech', 'Content contains hate speech or promotes discrimination or hostility against a particular group.');
INSERT INTO ReportType (reportName, reportDescription) VALUES ('Terrorism', 'Content promotes or supports acts of terrorism.');


-- Insert into Report
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'duckm', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'dungbt', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'giangpt', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'huyenntk', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'phuonghm', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('1', 'phuongmentor', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'duckm', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'dungbt', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'giangpt', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'huyenntk', '2023-06-02', '', '10');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'phuonghm', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('2', 'phuongmentor', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'duckm', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'dungbt', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'giangpt', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'huyenntk', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'phuonghm', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'phuongmentor', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'duckm', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'dungbt', '2023-06-02', '', '10');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'giangpt', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'huyenntk', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'phuonghm', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('4', 'phuongmentor', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'duckm', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'dungbt', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'giangpt', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'huyenntk', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'phuonghm', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('5', 'phuongmentor', '2023-06-02', '', '10');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'duckm', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'dungbt', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'giangpt', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'huyenntk', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'phuonghm', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'phuongmentor', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'duckm', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'dungbt', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'giangpt', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'huyenntk', '2023-06-02', '', '10');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'phuonghm', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'phuongmentor', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'duckm', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'dungbt', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'giangpt', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'huyenntk', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'phuonghm', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('8', 'phuongmentor', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'duckm', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'dungbt', '2023-06-02', '', '10');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'giangpt', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'huyenntk', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'phuonghm', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('9', 'phuongmentor', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'duckm', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'dungbt', '2023-06-02', '', '6');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'giangpt', '2023-06-02', '', '7');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'huyenntk', '2023-06-02', '', '8');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'phuonghm', '2023-06-02', '', '9');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('10', 'phuongmentor', '2023-06-02', '', '10');
select * from Report