import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";
import BarChart from "../../Components/Graph/BarChart";
import LineChart from "../../Components/Graph/LineChart";
import PieChart from "../../Components/Graph/PieChart";
import DoughnutChart from "../../Components/Graph/DoughNutChart";
import StatisticServices from "../../services/StatisticServices";

const RequestManage = () => {
    const [teachCourses, setTeachCourses] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
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
    const [data, setData] = useState([])
    const getCourseStatusCountsByCourseId = (courseId) => {
        StatisticServices.getCourseStatusCountsByCourseId(courseId)
            .then((response) => {
                setData(response.data);

            })
            .catch((error) => {
                console.log("loi lay ra count" + error);
            });
    }

    const [userData, setUserData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [ "#ff9f2c", "#f44545","#17aaff"],
                borderColor: "#ccc",
                borderWidth: 0.5,
            },
        ],
    });
    useEffect(() => {
        setUserData({
            labels: [ "Reject", "Pending", "Access"],
            //data.map((item) => `Status ${item.courseStatusCountKey.statusId} (${item.statusCount})`),
            
            datasets: [
                {
                    ...userData.datasets[0],
                    data: data.map((item) => item.statusCount),
                },
            ],
        });
    }, [data]);

    useEffect(() => {
        getCoursesOfMentor();

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
        getCourseStatusCountsByCourseId(courseId);
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

            <div className="" style={{ width: 350 }}>
                <BarChart chartData={userData} />
            </div>
            <div className="" style={{ width: 200 }}>
                <PieChart chartData={userData} />
            </div>
        </div>


    );
};

export default RequestManage;











