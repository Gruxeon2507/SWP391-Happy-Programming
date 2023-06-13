USE FU_SWP391_HappyProgramming;

INSERT INTO Conversation (conversationId, conversationName) VALUES ('1', 'course 1');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('2', 'course 2');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('3', 'course 3');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('4', 'huyenmentor');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('5', 'phuongmentor');
INSERT INTO Conversation (conversationId, conversationName) VALUES ('6', 'ducmentor');

INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'duckm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'giangpt');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'huyenntk');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'phuonghm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'antt');
INSERT INTO User_Conversation (conversationId, username) VALUES ('1', 'duckm');
INSERT INTO User_Conversation (conversationId, username) VALUES ('1', 'huyenmentor');
INSERT INTO User_Conversation (conversationId, username) VALUES ('2', 'anmentor');


INSERT INTO Message(conversationId,sentBy,sentAt,msgContent) value (1,"duckm",null,"hello");
INSERT INTO Message(conversationId,sentBy,sentAt,msgContent) value (1,"huyenmentor",null,"hi");

SELECT * FROM Message m join Conversation c on m.conversationId = c.conversationId WHERE conversationId=1 ORDER BY sentAt

select * from Message
