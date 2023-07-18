import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import BarChart from "../../Components/Graph/BarChart";
import LineChart from "../../Components/Graph/LineChart";
import PieChart from "../../Components/Graph/PieChart";
import DoughnutChart from "../../Components/Graph/DoughNutChart";
import StatisticServices from "../../services/StatisticServices";
import CourseServices from "../../services/CourseServices";
import "./RequestStatistic.css"
import NavBar from "../../Components/Navbar/NavBar";
import manageIcon from "../../Assets/208-2081675_link-to-manage-travel-ttc-line-5.png"
import statisticIcon from "../../Assets/1466735.png"
const RequestStatistic = () => {


    const [selectedCourse, setSelectedCourse] = useState(null);
    const [workState, setWorkState] = useState(0);

    const selectCourse = (courseId) => {
        setSelectedCourse(courseId);
    };

    const isCourseActive = (courseId) => {
        return selectedCourse === courseId;
    };

    const [teachCourses, setTeachCourses] = useState([]);
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
    const [userData, setUserData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Access',
                data: [],
            },
            {
                label: 'Pending',
                data: [],
            },
            {
                label: 'Reject',
                data: [],
            },
        ],
    });

    const getCourseStatusCountsByCourseId = (NocourseId) => {
        StatisticServices.getCourseStatusCountsByCourseId(NocourseId)
            // StatisticServices.getAllCourseStatusCounts()
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
                const uniqueCourseIds = [...new Set(responseData.map((item) => item.courseStatusCountKey.courseId))];

                const sumStatusCountsByCourseId = uniqueCourseIds.reduce((acc, courseId) => {
                    const status1Count = responseData
                        .filter((item) => item.courseStatusCountKey.courseId === courseId && item.courseStatusCountKey.statusId === 1)
                        .reduce((sum, item) => sum + item.statusCount, 0);

                    const status0Count = responseData
                        .filter((item) => item.courseStatusCountKey.courseId === courseId && item.courseStatusCountKey.statusId === 0)
                        .reduce((sum, item) => sum + item.statusCount, 0);

                    const statusMinus1Count = responseData
                        .filter((item) => item.courseStatusCountKey.courseId === courseId && item.courseStatusCountKey.statusId === -1)
                        .reduce((sum, item) => sum + item.statusCount, 0);

                    return {
                        ...acc,
                        [courseId]: {
                            status1Count,
                            status0Count,
                            statusMinus1Count,
                        },
                    };
                }, {});

                const labels = Object.keys(sumStatusCountsByCourseId);
                const status1Data = labels.map((courseId) => sumStatusCountsByCourseId[courseId].status1Count);
                const status0Data = labels.map((courseId) => sumStatusCountsByCourseId[courseId].status0Count);
                const statusMinus1Data = labels.map((courseId) => sumStatusCountsByCourseId[courseId].statusMinus1Count);

                setUserData((prevState) => ({
                    ...prevState,
                    labels,
                    datasets: [
                        {
                            ...prevState.datasets[0],
                            data: status1Data,
                        },
                        {
                            ...prevState.datasets[1],
                            data: status0Data,
                        },
                        {
                            ...prevState.datasets[2],
                            data: statusMinus1Data,
                        },
                    ],
                }));
            })
            .catch((error) => {
                console.log("Error fetching course status counts: " + error);
            });
    };
    useEffect(() => {
        getCoursesOfMentor();
        getCourseStatusCountsByCourseId(0);

    }, []);

    const [dataOne, setDataOne] = useState([])
    const getCourseStatusCountsByCourseIdOne = (courseId) => {
        StatisticServices.getCourseStatusCountsByCourseId(courseId)
            .then((response) => {
                setDataOne(response.data);

            })
            .catch((error) => {
                console.log("loi lay ra count" + error);
            });
    }

    const [userDataOne, setUserDataOne] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: ["#ff9f2c", "#f44545", "#17aaff"],
                borderColor: "#ccc",
                borderWidth: 0.5,
            },
        ],
    });
    useEffect(() => {
        setUserDataOne({
            labels: ["Reject", "Pending", "Access"],
            //data.map((item) => `Status ${item.courseStatusCountKey.statusId} (${item.statusCount})`),

            datasets: [
                {
                    ...userDataOne.datasets[0],
                    data: dataOne.map((item) => item.statusCount),
                },
            ],
        });
    }, [dataOne]);


    const handleCourseChange = (courseId) => {
        if (selectedCourse === courseId) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(courseId);
            getCourseStatusCountsByCourseIdOne(courseId);
            console.log(courseId);
        }
    };


    return (
        <>
            <NavBar mode={1} />
            <div className="mentor-statistic-container">
                <nav className="mentor-menu-sideBar">
                    <ul className="mentor-manageNav">
                        <li>
                            <NavLink to="/request/manage" className="request-index">
                                <img src={manageIcon}></img>
                                <span>Manage</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/request/statistic" className="request-index">
                                <img src={statisticIcon}></img>
                                <span>Statistic</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {/* All courses of mentor   */}
                <div className="overAll-statistic-container">
                    <div className="overAll-stat">
                        <div className="stat-item">
                            <span>Your Mentee: </span>
                            <span>13</span>
                            <ion-icon name="people-outline"></ion-icon>
                        </div>
                        <div className="stat-item">
                            <span>Pending Requests: </span>
                            <span>3</span>
                        </div>
                        <div className="stat-item">
                            <span>Rejected: </span>
                            <span>1</span>
                        </div>
                    </div>
                    <div className="chart-container">
                        <div className="mentor-all-course-barChart">
                            <BarChart chartData={userData} />
                        </div>
                        <div className="mentor-all-course-lineChart">
                            <LineChart chartData={userData} />
                        </div>
                    </div>
                </div>
                <div className="list-course-by-Mentor">
                    <div className={`course-statistic-container ${selectedCourse ? 'active' : ''}`}>
                        <div className="bar-chart-course-content">
                            <BarChart chartData={userDataOne} />
                        </div>
                        <div className="pie-chart-course-content">
                            <PieChart chartData={userDataOne} />
                        </div>
                    </div>
                    <div className="list-course-nav">
                        <ul>
                            {teachCourses.map((course) => (
                                <li
                                    key={course.id}
                                    value={course.courseId}
                                    onClick={() => handleCourseChange(course.courseId)}
                                    className={isCourseActive(course.courseId) ? 'active' : ''}
                                >
                                    {course.courseName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div >
        </>
    )
}

export default RequestStatistic
