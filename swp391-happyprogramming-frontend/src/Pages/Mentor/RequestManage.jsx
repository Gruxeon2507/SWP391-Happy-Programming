import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";
import RequestService from "../../services/RequestService";
import convertDateFormat from "../../util/DateConvert";

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

    const getPendingUserOfCourse = (courseId) => {
        RequestService.getPendingUserOfCourse(courseId)
            .then((response) => {
                console.log("content");
                console.log(response.data.content);
                setUsers(response.data.content);
            })
            .catch((error) => {
                console.log("loi lay ra members" + error);
            });
    }
    useEffect(() => {
        getCoursesOfMentor();
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
            let tempUser = users.map(user => user.requestKey.username === name ? { ...user, isChecked: checked } : user)
            setUsers(tempUser)
        }

    }

    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        getPendingUserOfCourse(courseId);
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
                    <select class="form-control form-control-sm checkbox-select-all" name="action" required
                        onChange={(e) => handleCourseChange(e)}
                    >
                        <option value="" >-- Courses --</option>
                        {teachCourses.map((course) => (
                            <option value={course.courseId} key={course.id} >
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


                <table className="table table-bordered table-striped">
                    <thead>
                        <th>#</th>
                        <th>Mentee</th>
                        <th>Request Time</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user.requestKey.username}>

                                    {/* <div className="form-check"> */}
                                    <td>

                                        <input class="form-check-input" type="checkbox" name={user.requestKey.username} value="" id={user.requestKey.username}
                                            checked={user?.isChecked || false}
                                            onChange={handleCheckChange}
                                        />
                                    </td>
                                    <td>
                                        <label class="form-check-label" for={user.requestKey.username}>
                                            {user.requestKey.username}
                                        </label>
                                    </td>

                                    {/* </div> */}
                                    <td>{convertDateFormat(user.requestKey.requestTime)}</td>

                                    <td>
                                        <button>Access </button>
                                        <button
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </form>
        </div>


    );
};

export default RequestManage;
