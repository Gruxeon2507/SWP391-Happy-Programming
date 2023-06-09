import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";

const RequestManage = () => {
    const [teachCourses, setTeachCourses] = useState([]);
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
                console.log(response.data);
                console.log("courseId " + courseId + " statusId " + statusId);
                setUsers(response.data);
            })
            .catch((error) => {
                console.log("loi lay ra members" + error);
            });
    }
    useEffect(() => {
        getCoursesOfMentor();
        getUserOfCourse(2, 0);
        console.log("user", users);
    }, []);

    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = users.map(user => { return { ...user, isChecked: checked } })
            setUsers(tempUser)
        }
        else {
            console.log(e.target);
            let tempUser = users.map(user => user.username === name ? { ...user, isChecked: checked } : user)
            setUsers(tempUser)
        }

    }

    return (
        <div>

            <form name="container-form" method="POST" action="/users/handle-form-actions" >
                <div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="checkbox-all"
                            name="allSelect"
                            checked={users.filter(user => user?.isChecked !== true).length < 1}
                            onChange={handleCheckChange}
                        />
                        <label class="form-check-label" for="checkbox-all">
                            Check All
                        </label>
                    </div>
                    <select class="form-control form-control-sm checkbox-select-all" name="action" required>
                        <option value="">-- Courses --</option>
                        {teachCourses.map((course) => (
                            <option key={course.id}>
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


                {users.map((user, index) => (
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
        </div>


    );
};

export default RequestManage;
