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

CREATE TABLE Rating 
(
	ratedFromUser varchar(255),
    ratedToUser varchar(255),
    noStar int,
    ratingComment longtext,
    CONSTRAINT PK_Rating PRIMARY KEY(ratedFromUser, ratedToUser)
);
ALTER TABLE Rating ADD CONSTRAINT FK_RatingFrom_User FOREIGN KEY(ratedFromUser)
REFERENCES `User`(username);
ALTER TABLE Rating ADD CONSTRAINT FK_RatingTo_User FOREIGN KEY(ratedToUser)
REFERENCES `User`(username);

CREATE TABLE Conversation
(
	conversationId int NOT NULL AUTO_INCREMENT,
    conversationName nvarchar(255),
    CONSTRAINT PK_Conversation PRIMARY KEY (conversationId)
);

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
    sentAt datetime,
    msgContent longtext,
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


CREATE TABLE Course 
(
	courseId int NOT NULL AUTO_INCREMENT,
    courseName nvarchar(255),
    courseDescription longtext,
    createdAt datetime, 
    conversationId int,
    CONSTRAINT PK_Course PRIMARY KEY (courseId)
);
Alter table Course ADD CONSTRAINT FK_Course_Conversation FOREIGN KEY(conversationId) 
REFERENCES Conversation(conversationId);
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
    CONSTRAINT PK_Comment PRIMARY KEY (commentId)
);
ALTER TABLE `Comment` ADD CONSTRAINT FK_Comment_Post FOREIGN KEY(postId)
REFERENCES Post(postId);
ALTER TABLE `Comment` ADD CONSTRAINT FK_Comment_User FOREIGN KEY(commentedBy)
REFERENCES `User`(username);

CREATE TABLE Attachment
( 
	attachmentId int NOT NULL AUTO_INCREMENT, 
    attachmentLink longtext,
    postId int,
    CONSTRAINT PK_Attachment PRIMARY KEY (attachmentId)
);
ALTER TABLE Attachment ADD CONSTRAINT FK_Attachment_Post FOREIGN KEY(postId)
REFERENCES Post(postId);

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
SELECT * FROM Course
*/

SELECT * FROM Participate where courseId = 26;
UPDATE `User` set activeStatus = 1 WHERE username != '';
select * from Rating where ratedToUser = 'huyenmentor';
select round(avg(noStar)) from Rating where ratedToUser = 'ducmentor';
select * from Participate where statusId = 0;
