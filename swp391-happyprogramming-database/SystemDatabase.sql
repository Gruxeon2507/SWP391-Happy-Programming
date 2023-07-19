DROP DATABASE FU_SWP391_HappyProgramming;
CREATE DATABASE FU_SWP391_HappyProgramming;
  
USE FU_SWP391_HappyProgramming;

CREATE TABLE `User`
(
	username varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    displayName nvarchar (255),
    dob date,
    mail varchar(255),
    createdDate date,
    avatarPath varchar(255),
    CVPath longtext,
    activeStatus bit,
    isVerified bit default 1,
    verification_code varchar(255) default "",
    CONSTRAINT PK_User PRIMARY KEY (username)
);

CREATE TABLE Skill
(
	skillId int NOT NULL AUTO_INCREMENT,
    skillName varchar(255),
    username varchar(255) NOT NULL,
    CONSTRAINT PK_Skill PRIMARY KEY (skillId, username)
);

ALTER TABLE Skill ADD CONSTRAINT PK_Skill FOREIGN KEY(username)
REFERENCES `User` (username);


CREATE TABLE `Role`
(
	roleId int NOT NULL AUTO_INCREMENT,
	roleName varchar(255),
	CONSTRAINT PK_Role PRIMARY KEY (roleId)
);

CREATE TABLE User_Role
(
	username varchar(255) NOT NULL,
	roleId int NOT NULL,
	CONSTRAINT PK_UserRole PRIMARY KEY (username, roleId)
);

ALTER TABLE User_Role ADD CONSTRAINT FK_UserRole_User FOREIGN KEY(username)
REFERENCES `User` (username);
ALTER TABLE User_Role ADD CONSTRAINT FK_UserRole_Role FOREIGN KEY(roleId)
REFERENCES `Role` (roleId);


CREATE TABLE Feature
(
	featureId int NOT NULL AUTO_INCREMENT, 
	featureName varchar(255),
	url varchar(255),
    `component` varchar(255),
	CONSTRAINT PK_Feature PRIMARY KEY (featureId)
);

CREATE TABLE Role_Feature 
(
	roleId int NOT NULL AUTO_INCREMENT,
	featureId int NOT NULL,
	CONSTRAINT PK_RoleFeature PRIMARY KEY (roleId, featureId)
);
ALTER TABLE Role_Feature ADD CONSTRAINT FK_RoleFeature_Role FOREIGN KEY(roleId)
REFERENCES `Role`(roleId);
ALTER TABLE Role_Feature ADD CONSTRAINT FK_RoleFeature_Feature FOREIGN KEY(featureId)
REFERENCES Feature(featureId);


CREATE TABLE Course 
(
	courseId int NOT NULL AUTO_INCREMENT,
    courseName nvarchar(255) UNIQUE,
    courseDescription longtext,
    createdAt datetime, 
    CONSTRAINT PK_Course PRIMARY KEY (courseId)
);

CREATE TABLE Conversation
(
	conversationId int NOT NULL AUTO_INCREMENT,
    conversationName nvarchar(255) UNIQUE,
	courseId int,
    CONSTRAINT PK_Conversation PRIMARY KEY (conversationId)
);
Alter table Conversation ADD CONSTRAINT FK_Conversation_Course FOREIGN KEY(courseId) 
REFERENCES Course(courseId);

CREATE TABLE User_Conversation
(
	conversationId int,
    username varchar(255),
    CONSTRAINT PK_UserConversation PRIMARY KEY (conversationId, username)
);
ALTER TABLE User_Conversation ADD CONSTRAINT FK_UserConversation_User FOREIGN KEY(username)
REFERENCES `User` (username);
ALTER TABLE User_Conversation ADD CONSTRAINT FK_UserConversation_Conversation FOREIGN KEY(conversationId)
REFERENCES Conversation (conversationId);

CREATE TABLE Message 
(	
	conversationId int,
    sentBy varchar(255),
    sentAt datetime(6),
    msgContent longtext,
    contentType varchar(255),
    CONSTRAINT PK_Message PRIMARY KEY (conversationId, sentBy, sentAt)
);
ALTER TABLE Message ADD CONSTRAINT FK_Message_Conversation FOREIGN KEY(conversationId)
REFERENCES Conversation (conversationId);
ALTER TABLE Message ADD CONSTRAINT FK_Message_User FOREIGN KEY(sentBy)
REFERENCES `User` (username);

CREATE TABLE Category(
	categoryId int NOT NULL AUTO_INCREMENT,
    categoryName nvarchar(255),
	CONSTRAINT PK_Category PRIMARY KEY (categoryId)
);




CREATE TABLE Course_Category 
(
    categoryId int,
    courseId int, 
    CONSTRAINT PK_CourseCategory PRIMARY KEY (categoryId, courseId)
);
ALTER TABLE Course_Category ADD CONSTRAINT FK_CourseCategory_Category FOREIGN KEY(categoryId)
REFERENCES Category(categoryId);
ALTER TABLE Course_Category ADD CONSTRAINT FK_CourseCategory_Course FOREIGN KEY(courseId)
REFERENCES Course(courseId);

CREATE TABLE `Status` 
(
	statusId int NOT NULL, 
    statusName varchar(50),
    CONSTRAINT PK_Status PRIMARY KEY (statusId)
);

CREATE TABLE ParticipateRole
(
	participateRole int NOT NULL AUTO_INCREMENT,
	participateRoleName varchar(255),
	CONSTRAINT PK_ParticipateRole PRIMARY KEY (participateRole)
);

CREATE TABLE Participate
(
	courseId int,
	username varchar(255),
    participateRole int, 
    statusId int,
    CONSTRAINT PK_Participate PRIMARY KEY (courseId, username)
);
ALTER TABLE Participate ADD CONSTRAINT FK_Participate_User FOREIGN KEY(username)
REFERENCES `User`(username);
ALTER TABLE Participate ADD CONSTRAINT FK_Participate_Course FOREIGN KEY(courseId)
REFERENCES Course(courseId);
ALTER TABLE Participate ADD CONSTRAINT FK_Participate_ParticipateRole FOREIGN KEY(participateRole)
REFERENCES ParticipateRole (participateRole);
-- ALTER TABLE Participate ADD CONSTRAINT FK_Participate_Role FOREIGN KEY(participateRole)
-- REFERENCES `Role` (roleId);
ALTER TABLE Participate ADD CONSTRAINT FK_Participate_Status FOREIGN KEY(statusId)
REFERENCES `Status` (statusId);

CREATE TABLE Rating 
(
	ratedFromUser varchar(255),
    ratedToUser varchar(255),
    noStar int,
    courseId int,
    ratingComment longtext,
    CONSTRAINT PK_Rating PRIMARY KEY(ratedFromUser, ratedToUser,courseId)
);
ALTER TABLE Rating ADD CONSTRAINT FK_RatingFrom_User FOREIGN KEY(ratedFromUser)
REFERENCES `User`(username);
ALTER TABLE Rating ADD CONSTRAINT FK_RatingTo_User FOREIGN KEY(ratedToUser)
REFERENCES `User`(username);
ALTER TABLE Rating ADD CONSTRAINT FK_courseId_Course FOREIGN KEY(courseId)
REFERENCES Course(courseId);
CREATE TABLE Request
(
	courseId int,
	username varchar(255),
    requestTime datetime DEFAULT CURRENT_TIMESTAMP,
    requestStatus int,
    requestReason nvarchar(255),
    CONSTRAINT PK_Request PRIMARY KEY (courseId, username, requestTime)
);
ALTER TABLE Request ADD CONSTRAINT FK_Request_Participate FOREIGN KEY(username, courseId)
REFERENCES Participate(username, courseId);
-- ALTER TABLE Request ADD CONSTRAINT FK_Request_UserParticipate FOREIGN KEY(username)
-- REFERENCES Participate(username);
-- ALTER TABLE Request  ADD CONSTRAINT FK_Request_CourseParticipate FOREIGN KEY(courseId)
-- REFERENCES Participate(courseId);
ALTER TABLE Request ADD CONSTRAINT FK_Request_Status FOREIGN KEY(requestStatus)
REFERENCES `Status` (statusId);

CREATE TABLE Post 
(
	postId int NOT NULL AUTO_INCREMENT, 
    postedAt datetime, 
    postContent longtext,
	courseId int,
	postedBy varchar(255),
    CONSTRAINT PK_Post PRIMARY KEY (postId)
);
ALTER TABLE Post ADD CONSTRAINT FK_Post_Course FOREIGN KEY(courseId)
REFERENCES Course(courseId);
ALTER TABLE Post ADD CONSTRAINT FK_Post_User FOREIGN KEY(postedBy)
REFERENCES `User`(username);

CREATE TABLE `Comment`
(
	commentId int NOT NULL AUTO_INCREMENT, 
    commentedAt datetime,
    commentContent longtext,
    postId int,
    commentedBy varchar(255),
    parentId int,
    CONSTRAINT PK_Comment PRIMARY KEY (commentId)
);
ALTER TABLE `Comment` ADD CONSTRAINT FK_Comment_Post FOREIGN KEY(postId)
REFERENCES Post(postId);
ALTER TABLE `Comment` ADD CONSTRAINT FK_Comment_User FOREIGN KEY(commentedBy)
REFERENCES `User`(username);
ALTER TABLE `Comment` ADD CONSTRAINT FK_Comment_Comment FOREIGN KEY(parentId)
REFERENCES Comment(commentId);

CREATE TABLE Attachment
( 
	attachmentId int NOT NULL AUTO_INCREMENT, 
    attachmentLink longtext,
    postId int,
    CONSTRAINT PK_Attachment PRIMARY KEY (attachmentId)
);
ALTER TABLE Attachment ADD CONSTRAINT FK_Attachment_Post FOREIGN KEY(postId)
REFERENCES Post(postId);

CREATE TABLE ReportType(
	reportTypeId int NOT NULL AUTO_INCREMENT,
    reportName nvarchar(255),
    reportDescription longtext,
    CONSTRAINT PK_ReportType PRIMARY KEY (reportTypeId)
);

CREATE TABLE Report(
	commentId int NOT NULL,
    reportedBy varchar(255),
    reportTime datetime,
    reportTypeId int,
    reportContent longtext,
    CONSTRAINT PK_Report PRIMARY KEY (commentId, reportedBy)
);
ALTER TABLE Report ADD CONSTRAINT FK_Report_Comment FOREIGN KEY (commentId) 
REFERENCES `Comment`(commentId);
ALTER TABLE Report ADD CONSTRAINT FK_Report_User FOREIGN KEY (reportedBy)
REFERENCES `User`(username);
ALTER TABLE Report ADD CONSTRAINT FK_Report_ReportType FOREIGN KEY (reportTypeId)
REFERENCES ReportType(reportTypeId);

CREATE TABLE Notification
(
	notificationId int NOT NULL AUTO_INCREMENT,
    notificationContent longtext,
    notificationTime Date,
    notificationTypeId int,
    notificationTo varchar(255),
    url varchar(255),
    isViewed bool,
    CONSTRAINT PK_Notification PRIMARY KEY (notificationId)
);
ALTER TABLE Notification ADD CONSTRAINT FK_Notification_User FOREIGN KEY(notificationTo) 
REFERENCES `User`(username);

CREATE TABLE NotificationType
(
	notificationTypeId int NOT NULL AUTO_INCREMENT,
    notificationTypeName varchar(255),
    CONSTRAINT PK_NotificationType PRIMARY KEY(notificationTypeId)
);

ALTER TABLE Notification ADD CONSTRAINT FK_Notification_NotificationType FOREIGN KEY (notificationTypeId)
REFERENCES NotificationType(notificationTypeId);
/*
SELECT * FROM Feature 
SELECT * FROM Role 
SELECT * FROM User
SELECT * FROM `Status`
SELECT * FROM Conversation
SELECT * FROM User_Conversation
SELECT * FROM Participate
SELECT * FROM Post
SELECT * FROM `Comment`
SELECT * FROM Attachment
SELECT * FROM Course
SELECT * FROM Course_Category
SELECT * FROM Category
SELECT * FROM Course
SELECT * FROM Rating
SELECT * FROM Request
SELECT * FROM Participate
SELECT * FROM Conversation
SELECT * FROM User_Conversation
*/

USE FU_SWP391_HappyProgramming;

-- Insert into `User`
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('namnh', '123', 'Nguyễn Hoàng Nam', '2003-8-6', 'namnhhe140081@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('namlx', '123', 'Lê Xuân Nam', '2003-1-29', 'namlxhe153241@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('lamtn', '123', 'Tống Ngọc Lâm', '2003-7-25', 'lamtnhe153679@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('chauntm', '123', 'Nguyễn Thị Minh Châu', '2003-6-18', 'chaunthe161283@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('thanhdq', '123', 'Đặng Quang Thanh', '2002-1-1', 'thanhdqhe163134@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('namnt', '123', 'Nguyễn Tiến Nam', '2001-1-1', 'namnthe163375@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('namlm', '123', 'Lê Minh Nam', '2003-1-1', 'namlmhe163473@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('dungnt', '123', 'Nguyễn Tuấn Dũng', '2003-1-1', 'dungnthe163886@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('hoangnd', '123', 'Nguyễn Đăng Hoàng', '2003-1-1', 'hoangndhe164015@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('tamvm', '123', 'Vũ Minh Tâm', '2003-1-1', 'tamvmhe170051@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('datdc', '123', 'Đặng Công Đạt', '2003-1-1', 'datdche170625@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('thinhnp', '123', 'Nguyễn Phùng Thịnh', '2003-1-1', 'thinhnphe170833@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('haunt', '123', 'Nguyễn Thanh Hậu', '2003-1-1', 'haunthe170842@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('huyenntk', '123', 'Nguyễn Thị Khánh Huyền', '2003-1-1', 'huyennthe170863@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('giangpt', '123', 'Phạm Trường Giang', '2003-1-1', 'giangpthe170907@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('duckm', '123', 'Khiếu Minh Đức', '2003-1-1', 'duckmhe170996@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('nhatvn', '123', 'Vũ Ngọc Nhất', '2003-1-1', 'nhatvnhe171071@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('phuonghm', '123', 'Hoàng Mai Phương', '2003-1-1', 'phuonghmhe171073@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('dungbt', '123', 'Bùi Tiến Dũng', '2003-1-1', 'dungbthe171162@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('phucdl', '123', 'Doãn Lâm Phúc', '2003-1-1', 'phucdlhe171687@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('hieudt', '123', 'Đồng Trung Hiếu', '2003-1-1', 'hieudthe171777@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('minhnd', '123', 'Nguyễn Đức Minh', '2003-1-1', 'minhndhe171851@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('antt', '123', 'Triệu Thạch Ân', '2003-1-1', 'antthe176160@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('duongcd', '123', 'Chu Đức Dương', '2003-1-1', 'duongcdhe176312@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('hoangdn', '123', 'Đinh Nhật Hoàng', '2003-1-1', 'hoangdnhe176586@fpt.edu.vn', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('datnq', '123', 'Nguyễn Quốc Đạt', '2003-1-1', 'datnqhe176751@fpt.edu.vn', '2023-5-12', '', '', 1);

INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('huyenmentor', '123', 'Nguyễn Thị Khánh Huyền', '2003-8-6', 'hn8319542@gmail.com', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('phuongmentor', '123', 'Hoàng Mai Phương', '2003-1-29', 'maiphuonghoangmpk@gmail.com', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('ducmentor', '123', 'Khiếu Minh Đức', '2003-7-25', 'khieuminhduc2012@gmail.com', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('giangmentor', '123', 'Phạm Trường Giang', '2003-6-18', 'nocolor06@gmail.com', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('anmentor', '123', 'Triệu Thạch Ân', '2003-5-2', 'anlalahello@gmail.com', '2023-5-12', '', '', 1);
INSERT INTO `User` (username, password, displayName, dob, mail, createdDate, avatarPath, CVPath, activeStatus) VALUES ('eikh', '123', 'Em Yêu Khoa Học', '2021-7-21', 'emiukhoahoc@gmail.com', '2023-5-12', '', '', 1);




select * from Role;
-- Insert into Role
INSERT INTO Role (roleId, roleName) VALUES ('1', 'admin');
INSERT INTO Role (roleId, roleName) VALUES ('2', 'mentor');
INSERT INTO Role (roleId, roleName) VALUES ('3', 'mentee');

select * from User_Role;
-- Insert into User_Role
INSERT INTO User_Role (username, roleId) VALUES ('namnh', '3');
INSERT INTO User_Role (username, roleId) VALUES ('namlx', '3');
INSERT INTO User_Role (username, roleId) VALUES ('lamtn', '3');
INSERT INTO User_Role (username, roleId) VALUES ('chauntm', '3');
INSERT INTO User_Role (username, roleId) VALUES ('thanhdq', '3');
INSERT INTO User_Role (username, roleId) VALUES ('namnt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('namlm', '3');
INSERT INTO User_Role (username, roleId) VALUES ('dungnt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('hoangnd', '3');
INSERT INTO User_Role (username, roleId) VALUES ('tamvm', '3');
INSERT INTO User_Role (username, roleId) VALUES ('datdc', '3');
INSERT INTO User_Role (username, roleId) VALUES ('thinhnp', '3');
INSERT INTO User_Role (username, roleId) VALUES ('haunt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('huyenntk', '3');
INSERT INTO User_Role (username, roleId) VALUES ('giangpt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('duckm', '3');
INSERT INTO User_Role (username, roleId) VALUES ('nhatvn', '3');
INSERT INTO User_Role (username, roleId) VALUES ('phuonghm', '3');
INSERT INTO User_Role (username, roleId) VALUES ('dungbt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('phucdl', '3');
INSERT INTO User_Role (username, roleId) VALUES ('hieudt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('minhnd', '3');
INSERT INTO User_Role (username, roleId) VALUES ('antt', '3');
INSERT INTO User_Role (username, roleId) VALUES ('duongcd', '3');
INSERT INTO User_Role (username, roleId) VALUES ('hoangdn', '3');
INSERT INTO User_Role (username, roleId) VALUES ('datnq', '3');
INSERT INTO User_Role (username, roleId) VALUES ('huyenmentor', '2');
INSERT INTO User_Role (username, roleId) VALUES ('phuongmentor', '2');
INSERT INTO User_Role (username, roleId) VALUES ('ducmentor', '2');
INSERT INTO User_Role (username, roleId) VALUES ('giangmentor', '2');
INSERT INTO User_Role (username, roleId) VALUES ('anmentor', '2');
INSERT INTO User_Role (username, roleId) VALUES ('huyenmentor', '3');
INSERT INTO User_Role (username, roleId) VALUES ('phuongmentor', '3');
INSERT INTO User_Role (username, roleId) VALUES ('ducmentor', '3');
INSERT INTO User_Role (username, roleId) VALUES ('giangmentor', '3');
INSERT INTO User_Role (username, roleId) VALUES ('anmentor', '3');
INSERT INTO User_Role (username, roleId) VALUES ('eikh', '1');




-- Insert into Feature
INSERT INTO Feature (featureId, featureName, url,`component`) VALUES ('1', 'Home Page', '/home','Home');
INSERT INTO Feature (featureId, featureName, url,`component`) VALUES ('2', 'User Profile', '/user/:userId','userProfile');


-- Insert into Role_Feature
INSERT INTO Role_Feature (roleId, featureId) VALUES ('1', '1');
INSERT INTO Role_Feature (roleId, featureId) VALUES ('2', '1');
INSERT INTO Role_Feature (roleId, featureId) VALUES ('3', '1');
INSERT INTO Role_Feature (roleId, featureId) VALUES ('2', '2');

-- Insert into Category
INSERT INTO Category (categoryId, categoryName) VALUES (1, 'Computer Science');
INSERT INTO Category (categoryId, categoryName) VALUES (2, 'Business');
INSERT INTO Category (categoryId, categoryName) VALUES (3, 'Language Learning');
INSERT INTO Category (categoryId, categoryName) VALUES (4, 'Data Science');
INSERT INTO Category (categoryId, categoryName) VALUES (5, 'Information Technology');
INSERT INTO Category (categoryId, categoryName) VALUES (6, 'Heath');
INSERT INTO Category (categoryId, categoryName) VALUES (7, 'Math and Logic');
INSERT INTO Category (categoryId, categoryName) VALUES (8, 'Personal Development');
INSERT INTO Category (categoryId, categoryName) VALUES (9, 'Physical Science and Engineering');
INSERT INTO Category (categoryId, categoryName) VALUES (10, 'Social Sciences');
INSERT INTO Category (categoryId, categoryName) VALUES (11, 'Arts and Humanities');

-- Insert into Course
INSERT INTO Course(courseName,createdAt,courseDescription) VALUES ('Object Oriented Programming in Java','2023-05-17 00:00:00','This Specialization is for aspiring software developers with some programming experience in at least one other programming language (e.g., Python, C, JavaScript, etc.) who want to be able to solve more complex problems through objected-oriented design with Java. In addition to learning Java, you will gain experience with two Java development environments (BlueJ and Eclipse), learn how to program with graphical user interfaces, and learn how to design programs capable of managing large amounts of data. These software engineering skills are broadly applicable across wide array of industries.'),
	('Java Programming: Arrays, Lists, and Structured Data','2023-05-18 00:00:00','Build on the software engineering skills you learned in “Java Programming: Solving Problems with Software” by learning new data structures. Use these data structures to build more complex programs that use Java’s object-oriented features. At the end of the course you will write an encryption program and a program to break your encryption algorithm.'),
	('JavaScript for Beginners','2023-05-19 00:00:00','This Specialization is intended for the learner with no previous programming experience or the career changer transitioning to software development. JavaScript is generally the first programming language you will need to learn and this Specialization will help you practice and build your skills through a gentle progression of modules and courses.'),
	('Modern JavaScript: ES6 Basics','2023-05-20 00:00:00','In this project, you''ll learn the most fundamental ES6 features and practice them with live hands-on examples. You''ll start writing modern JavaScript and really understand why we need ES6. Mastering modern JavaScript starts with understanding the reasoning behind the main ES6 features - arrow functions, variables, template literals. Doing so will help you grasp the concepts behind Node, React and Angular.'),
	('Introduction to Data Science in Python','2023-05-21 00:00:00','This course will introduce the learner to the basics of the python programming environment, including fundamental python programming techniques such as lambdas, reading and manipulating csv files, and the numpy library. The course will introduce data manipulation and cleaning techniques using the popular python pandas data science library and introduce the abstraction of the Series and DataFrame as the central data structures for data analysis, along with tutorials on how to use functions such as groupby, merge, and pivot tables effectively. By the end of this course, students will be able to take tabular data, clean it, manipulate it, and run basic inferential statistical analyses. This course should be taken before any of the other Applied Data Science with Python courses: Applied Plotting, Charting & Data Representation in Python, Applied Machine Learning in Python, Applied Text Mining in Python, Applied Social Network Analysis in Python.'),
	('Python Data Structures','2023-05-22 00:00:00','This course will introduce the core data structures of the Python programming language. We will move past the basics of procedural programming and explore how we can use the Python built-in data structures such as lists, dictionaries, and tuples to perform increasingly complex data analysis. This course will cover Chapters 6-10 of the textbook “Python for Everybody”. This course covers Python 3.'),
	('HTML, CSS','2023-05-23 00:00:00','This is the first course in the Web Design For Everybody specialization. Subsequent courses focus on the marketable skills of styling the page with HTML5 andCSS3, adding interactivity with JavaScript and enhancing the styling with responsive design.'),
	('HTML and CSS: Building a Single-Page Website','2023-05-24 00:00:00','In this 1-hour long project-based course, you will learn how to create a single page website for an imaginary travel agent using HTML and CSS. HTML and CSS are the core for building any website or web application and are indispensable knowledge for any web developer. HTML enables the creation of the web pages layout and structures while CSS enriches the HTML pages by adding the style and feel to them. Eventually, you will be able to use the knowledge acquired on far complex projects that employ these technologies in one way or another.'),
	('Coding for Everyone: C and C++','2023-05-25 00:00:00','This Specialization is intended for all programming enthusiasts, as well as beginners, computer and other scientists, and artificial intelligence enthusiasts seeking to develop their programming skills in the foundational languages of C and C++. Through the four courses — two in C, and two in C++ — you will cover the basics of programming in C and move on to the more advanced C++ semantics and syntax, which will prepare you to apply these skills to a number of higher-level problems using AI algorithms and Monte Carlo evaluation in complex games.'),
	('Object-Oriented Data Structures in C++','2023-05-26 00:00:00','This course teaches learners how to write a program in the C++ language, including how to set up a development environment for writing and debugging C++ code and how to implement data structures as C++ classes. It is the first course in the Accelerated CS Fundamentals specialization, and subsequent courses in this specialization will be using C++ as the language for implementing the data structures covered in class.'),
	('The Strategy of Content Marketing','2023-05-27 00:00:00','This course is a partnership between the leading content marketing authority, Copyblogger, and UC Davis Continuing and Professional Education. In this course, you will learn the core strategies content marketers use to acquire and retain customers profitably. Specifically, you will learn how to develop, organize and implement a content marketing strategy, analyze and measure the effectiveness of content marketing, write compelling copy, use a strategic framework when writing, and build your professional brand and authority through content marketing. You will also learn how to put the ideas presented to you into action and build your own personal brand through content marketing.'),
	('Google Digital Marketing & E-commerce','2023-05-28 00:00:00','Prepare for a new career in the high-growth fields of digital marketing and e-commerce, in under six months, no experience or degree required. Businesses need digital marketing and e-commerce talent more than ever before; 86% of business leaders report that digital commerce will be the most important route to growth. Throughout this program, you will gain in-demand skills that prepare you for an entry-level job and learn how to use tools and platforms like Canva, Constant Contact, Google Ads, Google Analytics, Hootsuite, HubSpot, Mailchimp, Shopify, and Twitter. You will learn from subject-matter experts at Google and have a chance to build your own portfolio with projects like customer personas and social media calendars to show to potential employers.'),
	('Financial Markets','2023-05-29 00:00:00','An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise. Emphasis on financially-savvy leadership skills. Description of practices today and analysis of prospects for the future. Introduction to risk management and behavioral finance principles to understand the real-world functioning of securities, insurance, and banking industries. The ultimate goal of this course is using such industries effectively and towards a better society.'),
	('Trading Basics','2023-05-30 00:00:00','The purpose of this course is to equip you with the knowledge required to comprehend the financial statements of a company and understand the various transactions that take place in the stock market so that you can replicate the strategies discovered by the extant academic literature. The first part of the course provides a brief introduction to financial statements and various common filings of firms. You will learn how to obtain information regarding a company''s performance from them and use the information to build trading strategies.  Next, you are taught basic asset pricing theories so that you will be able to calculate the expected returns of a stock or a portfolio. Finally, you will be introduced to the actual functioning of asset markets, type of players in the market, different types of orders and the efficient ways and opportune time to execute them, trading costs and ways of minimizing them, the concept of liquidity .etc. This knowledge is required to develop efficient algorithm to execute various trading strategies.'),
	('Japanese','2023-05-31 00:00:00','We introduce a number of options to match a variety of goals, from full degree to non-degree programs, programs taught in English, as well as short-term programs in Japan. During the course, international students at UTokyo will provide you with useful information and advice to start you on the path to studying in Japan.'),
	('Teaching Tips for Tricky English Grammar','2023-06-01 00:00:00','This is the third course in the Teach English: Intermediate Grammar specialization. It will be useful to ESL teachers or those interested in learning to teach English language, but it is not an introduction to teaching course. You will learn about some specific problems students have learning intermediate grammar. You will learn why students have trouble with this tricky grammar and find out new ways to help students conquer it. You will also learn a variety of activities for teaching this content in a fun and interesting way. Finally, you will have opportunities to practice the skills you learn by creating sample assignments and recording short videos of your teaching demonstrations using a video camera, webcam, or smartphone. Learners wanting a grade will be required to submit short videos of their teaching skills.'),
	('Conversational English Skills','2023-06-02 00:00:00','Do you want to communicate with English speakers fluently? Welcome to our course. The course consists of 6 units with different topics: meeting new people, the people in your life, eating in and eating out, the reason to learn English, good times and bad times, and hobbies. From this course, you will have a good knowledge of conversational English skills in your daily life. We invite you to learn with our teachers and friends from different countries in the videos, such as the United States, the United Kingdom, Ireland, Canada, Australia, and Columbia. Are you ready? Let’s go!'),
	('A Bridge to the World: Korean Language for Intermediate1','2023-06-03 00:00:00','This course is designed for anyone who wants to learn Korean. This course is useful for learners who want to improve their communication skills on personal topics frequently encountered in their daily life after learning basic Korean. Through this class, you can use expressions such as introducing, talking about experiences, and comforting, and you will be able to increase your understanding of basic Korean culture. This course is organized in the order of core expression, conversation, grammar, and self-assessment. The entire course is six weeks long, and consists of two sub-themes within one major topic, so there are a total of 12 lessons. Improve your Korean language skills with this course!'),
	('Chinese for HSK 1','2023-06-04 00:00:00','Nǐ hǎo! Welcome to Chinese for HSK Level 1 - a Chinese course for beginners. My name is YU Bin. I am very happy to meet you here! HSK stands for Hànyǔ (Chinese) Shuǐpíng (level) Kǎoshì (test), which is the most important Chinese proficiency test in use today. It assesses non-native Chinese speakers’ abilities in using Chinese in their daily, academic and professional lives. Chinese for HSK Level 1 is the first part of the 6 levels and assesses test takers’ abilities in the application of everyday Chinese. It is the counterpart of Level 1 of the Chinese Language Proficiency Scales for Speakers of Other Languages and the A1 Level of the Common European Framework of Reference for Languages.'),
	('Learn Mandarin Chinese','2023-06-05 00:00:00','Come and learn the language which is spoken by more than 1 billion people and is getting more and more learners. This may enable you to know and do business with people from one of the world''s biggest economies. This specialization may also help you to pass HSK (the only official proficiency test of Chinese language) level 1 or 2.');

-- Insert into Course_Category 
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 1);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 2);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 3);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 4);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 5);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 6);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 7);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 8);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 9);
INSERT INTO Course_Category (categoryId, courseId) VALUES (1, 10);
INSERT INTO Course_Category (categoryId, courseId) VALUES (2, 11);
INSERT INTO Course_Category (categoryId, courseId) VALUES (2, 12);
INSERT INTO Course_Category (categoryId, courseId) VALUES (2, 13);
INSERT INTO Course_Category (categoryId, courseId) VALUES (2, 14);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 15);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 16);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 17);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 18);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 19);
INSERT INTO Course_Category (categoryId, courseId) VALUES (3, 20);
INSERT INTO Course_Category (categoryId, courseId) VALUES (4, 5);

-- Insert into Status
INSERT INTO `Status` (statusId, statusName) VALUES ("-1", "reject");
INSERT INTO `Status` (statusId, statusName) VALUES ("0", "pending");
INSERT INTO `Status` (statusId, statusName) VALUES ("1", "access");

-- Insert into ParticipateRole
INSERT INTO ParticipateRole (participateRole, participateRoleName) VALUES (1, "Create");
INSERT INTO ParticipateRole (participateRole, participateRoleName) VALUES (2, "Mentor");
INSERT INTO ParticipateRole (participateRole, participateRoleName) VALUES (3, "Mentee");

-- Insert into Participate
-- Mentor dạy 
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '1', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuongmentor', '2', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('ducmentor', '3', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangmentor', '4', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('anmentor', '5', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '6', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuongmentor', '7', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('ducmentor', '8', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangmentor', '9', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('anmentor', '10', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '11', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuongmentor', '12', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('ducmentor', '13', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangmentor', '14', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('anmentor', '15', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '16', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuongmentor', '17', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('ducmentor', '18', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangmentor', '19', '2', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('anmentor', '20', '2', '1');
-- Mentor học 
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuongmentor', '1', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('ducmentor', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangmentor', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('anmentor', '2', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenmentor', '3', '3', '1');

-- Admin chỉ join 
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('eikh', '1', '1', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('eikh', '2', '1', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('eikh', '3', '1', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('eikh', '4', '1', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('eikh', '5', '1', '1');

-- Mentee học
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '1', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '1', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenntk', '1', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '1', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '1', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '1', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '1', '3', '-1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '1', '3', '-1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '1', '3', '1');


INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenntk', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '2', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '2', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '2', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '2', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '2', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '2', '3', '1');


INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '3', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '3', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenntk', '3', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '3', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '3', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '3', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '3', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '3', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '3', '3', '1');

INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '4', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '4', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('huyenntk', '4', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '4', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '4', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '4', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '4', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '4', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '4', '3', '1');


INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '5', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '5', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('nhatvn', '5', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '5', '3', '1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '5', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '5', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '5', '3', '-1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '5', '3', '-1');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '5', '3', '1');

INSERT INTO FU_SWP391_HappyProgramming.Skill (skillName,username) VALUES ('Java','giangmentor');
INSERT INTO FU_SWP391_HappyProgramming.Skill (skillName,username) VALUES ('C#','giangmentor');

INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('nhatvn', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '6', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '6', '3', '0');

INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('giangpt', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('duckm', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('nhatvn', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phuonghm', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('dungbt', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('phucdl', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('hieudt', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('minhnd', '7', '3', '0');
INSERT INTO Participate (username, courseId, participateRole, statusId) VALUES ('antt', '7', '3', '0');

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

USE FU_SWP391_HappyProgramming;
-- course chat
INSERT INTO Conversation (conversationName, courseId) VALUES ('Object Oriented Programming in Java', '1');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Java Programming: Arrays, Lists, and Structured Data', '2');
INSERT INTO Conversation (conversationName, courseId) VALUES ('JavaScript for Beginners', '3');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Modern JavaScript: ES6 Basics', '4');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Introduction to Data Science in Python', '5');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Python Data Structures', '6');
INSERT INTO Conversation (conversationName, courseId) VALUES ('HTML, CSS', '7');
INSERT INTO Conversation (conversationName, courseId) VALUES ('HTML and CSS: Building a Single-Page Website', '8');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Coding for Everyone: C and C++', '9');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Object-Oriented Data Structures in C++', '10');
INSERT INTO Conversation (conversationName, courseId) VALUES ('The Strategy of Content Marketing', '11');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Google Digital Marketing & E-commerce', '12');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Financial Markets', '13');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Trading Basics', '14');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Japanese', '15');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Teaching Tips for Tricky English Grammar', '16');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Conversational English Skills', '17');
INSERT INTO Conversation (conversationName, courseId) VALUES ('A Bridge to the World: Korean Language for Intermediate1', '18');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Chinese for HSK 1', '19');
INSERT INTO Conversation (conversationName, courseId) VALUES ('Learn Mandarin Chinese', '20');

-- mentor chat
INSERT INTO Conversation (conversationName) VALUES ('huyenmentor');
INSERT INTO Conversation (conversationName) VALUES ('phuongmentor');
INSERT INTO Conversation (conversationName) VALUES ('ducmentor');
INSERT INTO Conversation (conversationName) VALUES ('giangmentor');
INSERT INTO Conversation (conversationName) VALUES ('anmentor');

-- group course chat of mentor  
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuongmentor', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuongmentor', '7');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuongmentor', '12');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuongmentor', '17');

INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenmentor', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenmentor', '6');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenmentor', '11');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenmentor', '16');

INSERT INTO User_Conversation (username, conversationId) VALUES ('giangmentor', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangmentor', '9');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangmentor', '14');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangmentor', '19');

INSERT INTO User_Conversation (username, conversationId) VALUES ('anmentor', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('anmentor', '10');
INSERT INTO User_Conversation (username, conversationId) VALUES ('anmentor', '15');
INSERT INTO User_Conversation (username, conversationId) VALUES ('anmentor', '20');

INSERT INTO User_Conversation (username, conversationId) VALUES ('ducmentor', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('ducmentor', '8');
INSERT INTO User_Conversation (username, conversationId) VALUES ('ducmentor', '13');
INSERT INTO User_Conversation (username, conversationId) VALUES ('ducmentor', '18');

-- add user into group chat
-- chỉ mentee đã join vào course 
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '1');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '1');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '1');

INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '2');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '2');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '2');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '2');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '2');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '2');

INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '3');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '3');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '3');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '3');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '3');

INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '4');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '4');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '4');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '4');

INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('nhatvn', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '5');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '5');
-- INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '5');

-- chat with mentor
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '21');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '21');

USE FU_SWP391_HappyProgramming;

-- Insert into Post
insert into Post (postedAt, postContent, courseId, postedBy) values ('2023-06-24 00:00:00', '<p>bai mo dau</p>', 1, 'huyenmentor');

-- Insert into Comment
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen', 1, 'antt');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co', 1, 'antt');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello huyen', 1, 'duckm');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'co huyen', 1, 'giangpt');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 1', 1, 'antt');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 2', 1, 'duckm');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 3', 1, 'duckm');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 4', 1, 'giangpt');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 5', 1, 'phuonghm');
insert into Comment(commentedAt, commentContent, postId, commentedBy) values ('2023-06-24 01:04:26', 'hello co huyen 6', 1, 'phuonghm');


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
/* INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('3', 'antt', '2023-06-02', '', '3');
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
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'antt', '2023-06-02', 'khong ua', '1');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'dungbt', '2023-06-02', '', '2');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'giangpt', '2023-06-02', '', '3');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'huyenntk', '2023-06-02', '', '4');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'phuonghm', '2023-06-02', '', '5');
INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('6', 'phuongmentor', '2023-06-02', '', '6');
-- INSERT INTO Report (commentId, reportedBy, reportTime, reportContent, reportTypeId) VALUES ('7', 'duckm', '2023-06-02', '', '7');
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
*/