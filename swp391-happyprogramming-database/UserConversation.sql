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
INSERT INTO Conversation (conversationName) VALUES ('phuongmentor');

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