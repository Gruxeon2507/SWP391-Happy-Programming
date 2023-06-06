import React, { useState, useEffect } from "react";
import BarChart from "../../Components/Graph/BarChart";
import LineChart from "../../Components/Graph/LineChart";
import PieChart from "../../Components/Graph/PieChart";
import DoughnutChart from "../../Components/Graph/DoughNutChart";
import StatisticServices from "../../services/StatisticServices";
import CourseServices from "../../services/CourseServices";
import "./RequestStatistic.css"
import NavBar from "../../Components/Navbar/NavBar";
const RequestStatistic = () => {

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
        // const courseId = e.target.value;
        getCourseStatusCountsByCourseIdOne(courseId);
        console.log(courseId);

    };


    return (
        <>
            <NavBar mode={1} />
            <div className="mentor-statistic-container">
                <div className="mentor-menu-sideBar">
                    some item here
                </div>
                {/* All courses of mentor   */}
                <div className="overAll-statistic-container">
                    <div className="mentor-all-course-barChart">
                        <BarChart chartData={userData} />
                    </div>
                    <div className="mentor-all-course-lineChart">
                        <LineChart chartData={userData} />
                    </div>
                </div>
                <div className="list-course-by-Mentor">
                    {teachCourses.map((course) => (
                        <div key={course.id} value={course.courseId} onClick={() => handleCourseChange(course.courseId)}>
                            {course.courseName}
                        </div>
                    ))}
                </div>
                {/* One course by courseId */}
                <div className="course-statistic-container">
                    <div className="" style={{ width: 350 }} >
                        <BarChart chartData={userDataOne} />
                    </div>
                    <div className="" style={{ width: 200 }}>
                        <PieChart chartData={userDataOne} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestStatistic
