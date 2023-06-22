USE FU_SWP391_HappyProgramming;
INSERT INTO NotificationType(notificationTypeName) VALUES ('request');
INSERT INTO NotificationType(notificationTypeName) VALUES ('ban');

INSERT INTO Notification(notificationContent,notificationTypeId,notificationTo,isViewed) VALUES ('test',1,'duckm',false);
INSERT INTO Notification(notificationContent,notificationTypeId,notificationTo,isViewed) VALUES ('test2',1,'duckm',false);
INSERT INTO Notification(notificationContent,notificationTypeId,notificationTo,isViewed) VALUES ('test3',1,'duckm',false);
INSERT INTO Notification(notificationContent,notificationTypeId,notificationTo,isViewed) VALUES ('test4',1,'duckm',false);

SELECT * from Notification
-- CREATE TABLE Notification
-- (
-- 	notificationId int NOT NULL AUTO_INCREMENT,
--     notificationContent longtext,
--     notificationTime Date,
--     notificationTypeId int,
--     notificationTo varchar(255),
--     isViewed bool,
--     CONSTRAINT PK_Notification PRIMARY KEY (notificationId)
-- );

-- CREATE TABLE NotificationType
-- (
-- 	notificationTypeId int NOT NULL AUTO_INCREMENT,
--     notificationTypeName varchar(255),
--     CONSTRAINT PK_NotificationType PRIMARY KEY(notificationTypeId)
-- );