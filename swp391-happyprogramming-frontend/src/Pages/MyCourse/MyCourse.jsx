import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";

const MyCourse = () => {
    // const username = window.localStorage.getItem('user')
    const username = "hieudt";
    const [accessCourses, setAccessCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [rejectCourses, setRejectCourses] = useState([]);

    const myCourses = (username, statusId) => {
        CourseServices.getCourseByUsernameAndStatusId(username, statusId)
            .then((response) => {
                console.log(response.data);
                if (statusId === 1) setAccessCourses(response.data);
                else if (statusId === 0) setPendingCourses(response.data);
                else if (statusId === -1) setRejectCourses(response.data);

            })
            .catch((error) => {
                console.log("loi lay ra course" + error);
            });
    };
    useEffect(() => {
        myCourses(username, 1);
        myCourses(username, 0);
        myCourses(username, -1);

    }, []);
    const renderCourseList = (courses) => {
        return courses.map((course) => (
            <div key={course.courseId}>
                <p>{course.courseName}</p>
                <p>{course.createdAt}</p>
                <p>Mentor</p>
                <hr />
            </div>
        ));
    };

    return (
        <div>
            <h1>Access Course</h1>
            {renderCourseList(accessCourses)}

            <h1>Pending Course</h1>
            {renderCourseList(pendingCourses)}

            <h1>Reject Course</h1>
            {renderCourseList(rejectCourses)}
        </div>
    );
}

export default MyCourse
