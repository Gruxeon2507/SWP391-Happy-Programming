INSERT INTO Conversation (conversationId, conversationName) VALUES ('1', 'course 1');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('2', 'course 2');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('3', 'course 3');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('4', 'huyenmentor');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('3', 'phuongmentor');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('4', 'ducmentor');

INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'duckm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'giangpt');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'huyenntk');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'phuonghm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'antt');
INSERT INTO User_Conversation (conversationId, username) VALUES ('1', 'duckm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('1', 'huyenmentor');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'anmentor');


select * from Course
