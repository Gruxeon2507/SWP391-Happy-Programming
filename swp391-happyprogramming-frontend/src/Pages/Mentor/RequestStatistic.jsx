import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import BarChart from "../../Components/Graph/BarChart";
import LineChart from "../../Components/Graph/LineChart";
import PieChart from "../../Components/Graph/PieChart";
import DoughnutChart from "../../Components/Graph/DoughNutChart";
const RequestStatistic = () => {
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

    const getCourseStatusCounts = () => {
        CourseServices.getCourseStatusCounts()
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
        getCourseStatusCounts();

    }, []);
    return (

        <div>
            <div className="" style={{ width: 700 }}>
                <BarChart chartData={userData} />
            </div>
            <div className="" style={{ width: 700 }}>
                <LineChart chartData={userData} />
            </div>
            {/* <div className="" style={{ width: 200 }}>
                <PieChart chartData={userData} />
            </div>
            <div className="" style={{ width: 200 }}>
                <DoughnutChart chartData={userData} />
            </div> */}
        </div>
    )
}

export default RequestStatistic
