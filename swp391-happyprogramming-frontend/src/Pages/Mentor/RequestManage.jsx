import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";
import getUsersShort from "../../util/UserShort";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughNutChart";

const RequestManage = () => {
    const [teachCourses, setTeachCourses] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const getCoursesOfMentor = () => {
        CourseServices.getCoursesOfMentor()
            .then((response) => {
                console.log(response.data);
                setTeachCourses(response.data);
            })
            .catch((error) => {
                console.log("loi lay ra course" + error);
            });
    }

    const getUserOfCourse = (courseId, statusId) => {
        UserServices.getUserOfCourse(courseId, statusId)
            .then((response) => {
                setPendingUsers(response.data);
            })
            .catch((error) => {
                console.log("loi lay ra members" + error);
            });
    }
    const getUserOfCourse2 = (courseId) => {
        UserServices.getUserOfCourse2(courseId)
            .then((response) => {
                console.log("test");
                console.log(response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.log("loi lay ra members" + error);
            });
    }
    const usersTest = [{
        "username": "anmentor",
        "participates": [
            {
                "participateKey": {
                    "courseId": 2,
                    "username": "anmentor"
                },
                "course": {
                    "courseId": 2,
                    "courseName": "Java Programming: Arrays, Lists, and Structured Data",
                    "createdAt": "2023-05-18",
                    "courseDescription": "Build on the software engineering skills you learned in “Java Programming: Solving Problems with Software” by learning new data structures. Use these data structures to build more complex programs that use Java’s object-oriented features. At the end of the course you will write an encryption program and a program to break your encryption algorithm.",
                    "posts": [],
                    "categories": [
                        {
                            "categoryId": 1,
                            "categoryName": "Computer Science"
                        }
                    ]
                },
                "status": {
                    "statusId": 0,
                    "statusName": "pending"
                },
                "participateRole": {
                    "participateRole": 3,
                    "participateRoleName": "Mentee"
                }
            },
            {
                "participateKey": {
                    "courseId": 5,
                    "username": "anmentor"
                },
                "course": {
                    "courseId": 5,
                    "courseName": "Introduction to Data Science in Python",
                    "createdAt": "2023-05-21",
                    "courseDescription": "This course will introduce the learner to the basics of the python programming environment, including fundamental python programming techniques such as lambdas, reading and manipulating csv files, and the numpy library. The course will introduce data manipulation and cleaning techniques using the popular python pandas data science library and introduce the abstraction of the Series and DataFrame as the central data structures for data analysis, along with tutorials on how to use functions such as groupby, merge, and pivot tables effectively. By the end of this course, students will be able to take tabular data, clean it, manipulate it, and run basic inferential statistical analyses. This course should be taken before any of the other Applied Data Science with Python courses: Applied Plotting, Charting & Data Representation in Python, Applied Machine Learning in Python, Applied Text Mining in Python, Applied Social Network Analysis in Python.",
                    "posts": [],
                    "categories": [
                        {
                            "categoryId": 1,
                            "categoryName": "Computer Science"
                        },
                        {
                            "categoryId": 4,
                            "categoryName": "Data Science"
                        }
                    ]
                },
                "status": {
                    "statusId": 1,
                    "statusName": "access"
                },
                "participateRole": {
                    "participateRole": 2,
                    "participateRoleName": "Mentor"
                }
            },
            {
                "participateKey": {
                    "courseId": 10,
                    "username": "anmentor"
                },
                "course": {
                    "courseId": 10,
                    "courseName": "Object-Oriented Data Structures in C++",
                    "createdAt": "2023-05-26",
                    "courseDescription": "This course teaches learners how to write a program in the C++ language, including how to set up a development environment for writing and debugging C++ code and how to implement data structures as C++ classes. It is the first course in the Accelerated CS Fundamentals specialization, and subsequent courses in this specialization will be using C++ as the language for implementing the data structures covered in class.",
                    "posts": [],
                    "categories": [
                        {
                            "categoryId": 1,
                            "categoryName": "Computer Science"
                        }
                    ]
                },
                "status": {
                    "statusId": 1,
                    "statusName": "access"
                },
                "participateRole": {
                    "participateRole": 2,
                    "participateRoleName": "Mentor"
                }
            },
            {
                "participateKey": {
                    "courseId": 15,
                    "username": "anmentor"
                },
                "course": {
                    "courseId": 15,
                    "courseName": "Japanese",
                    "createdAt": "2023-05-31",
                    "courseDescription": "We introduce a number of options to match a variety of goals, from full degree to non-degree programs, programs taught in English, as well as short-term programs in Japan. During the course, international students at UTokyo will provide you with useful information and advice to start you on the path to studying in Japan.",
                    "posts": [],
                    "categories": [
                        {
                            "categoryId": 3,
                            "categoryName": "Language Learning"
                        }
                    ]
                },
                "status": {
                    "statusId": 1,
                    "statusName": "access"
                },
                "participateRole": {
                    "participateRole": 2,
                    "participateRoleName": "Mentor"
                }
            },
            {
                "participateKey": {
                    "courseId": 20,
                    "username": "anmentor"
                },
                "course": {
                    "courseId": 20,
                    "courseName": "Learn Mandarin Chinese",
                    "createdAt": "2023-06-05",
                    "courseDescription": "Come and learn the language which is spoken by more than 1 billion people and is getting more and more learners. This may enable you to know and do business with people from one of the world's biggest economies. This specialization may also help you to pass HSK (the only official proficiency test of Chinese language) level 1 or 2.",
                    "posts": [],
                    "categories": [
                        {
                            "categoryId": 3,
                            "categoryName": "Language Learning"
                        }
                    ]
                },
                "status": {
                    "statusId": 1,
                    "statusName": "access"
                },
                "participateRole": {
                    "participateRole": 2,
                    "participateRoleName": "Mentor"
                }
            }
        ],
    }]
    console.log("huhu");
    console.log(usersTest[0]);
    var result = getUsersShort(usersTest);
    console.log("short user");
    console.log(result);
    result = [{ username: 'anmentor', statusName: 1 },
    { username: 'b', statusName: 0 },
    { username: 'c', statusName: -1 },
    { username: 'd', statusName: 1 },
    { username: 'e', statusName: 1 }


    ]
    const [userData, setUserData] = useState({
        labels: ["access", "pending", "reject"],
        datasets: [
            {
                label: "Users status",
                data: result.map((data) => data.statusName),
            },
        ],
    });

    useEffect(() => {
        getCoursesOfMentor();




    }, []);

    useEffect(() => {
        getUserOfCourse2(2);
        setUsers(getUsersShort(usersTest))
    }, []);
    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = pendingUsers.map(user => { return { ...pendingUsers, isChecked: checked } })
            setPendingUsers(tempUser)
        }
        else {
            console.log(e.target);
            let tempUser = pendingUsers.map(user => user.username === name ? { ...pendingUsers, isChecked: checked } : user)
            setPendingUsers(tempUser)
        }

    }

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        getUserOfCourse(courseId, 0)
    };



    return (
        <div>

            <form name="container-form" method="POST" action="/users/handle-form-actions" >
                <div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="checkbox-all"
                            name="allSelect"
                            checked={pendingUsers.length > 0 ? pendingUsers.filter(user => user?.isChecked !== true).length < 1 : false}
                            onChange={handleCheckChange}
                        />
                        <label class="form-check-label" for="checkbox-all">
                            Check All
                        </label>
                    </div>
                    <select class="form-control form-control-sm checkbox-select-all" name="action" required
                        onChange={handleCourseChange}
                    >
                        <option value="">-- Courses --</option>
                        {teachCourses.map((course) => (
                            <option key={course.id} value={course.courseId}

                            >
                                <span>{course.courseName}</span>
                            </option>
                        ))}

                    </select>
                    <select class="form-control form-control-sm checkbox-select-all" name="action" required>
                        <option value="">-- Action --</option>
                        <option value="access">Access</option>
                        <option value="reject">Reject</option>
                    </select>
                    <button class="check-all-submit-btn" disabled="disabled">Thực hiện</button>
                </div>


                {pendingUsers.map((user, index) => (
                    <div className="form-check">
                        <input class="form-check-input" type="checkbox" name={user.username} value="" id={user.username}
                            checked={user?.isChecked || false}
                            onChange={handleCheckChange}
                        />
                        <label class="form-check-label" for={user.username}>
                            {user.username} - {user.displayName}
                        </label>
                    </div>
                ))}
            </form>


            <div className="" style={{ width: 700 }}>
                <BarChart chartData={userData} />
            </div>
            <div className="" style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>
            <div className="" style={{ width: 300 }}>
                <PieChart chartData={userData} />
            </div>
            <div className="" style={{ width: 300 }}>
                <DoughnutChart chartData={userData} />
            </div>
        </div>


    );
};

export default RequestManage;











