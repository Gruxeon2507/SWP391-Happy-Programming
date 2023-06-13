
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

-- add user into chat
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '1');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '2');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '3');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('huyenntk', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '4');
INSERT INTO User_Conversation (username, conversationId) VALUES ('giangpt', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('nhatvn', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phuonghm', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('dungbt', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('phucdl', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('hieudt', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('minhnd', '5');
INSERT INTO User_Conversation (username, conversationId) VALUES ('antt', '5');

-- chat with mentor
INSERT INTO User_Conversation (username, conversationId) VALUES ('duckm', '21');