import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";

const MyCourse = () => {

    const [accessCourses, setAccessCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [rejectCourses, setRejectCourses] = useState([]);
    const [mentorOfCourses, setMentorOfCourses] = useState({});

    const getMentorOfCourses = (courseId) => {
        CourseServices.getMentorOfCourse(courseId).then((response) => {
            setMentorOfCourses((prevUserOfCourses) => ({
            ...prevUserOfCourses,
            [courseId]: response.data.displayName,
          }));
        });
      };
    
      const mapMentor = (courses) => {
        courses.forEach((course) => {
          getMentorOfCourses(course.courseId);
        });
      };
      
      useEffect(() => {
        mapMentor(accessCourses);
      }, [accessCourses]);
      
      useEffect(() => {
        mapMentor(pendingCourses);
      }, [pendingCourses]);
      
      useEffect(() => {
        mapMentor(rejectCourses);
      }, [rejectCourses]);


    const myCourses = (statusId) => {
        CourseServices.getCourseByUsernameAndStatusId( statusId)
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
        myCourses( 1);
        myCourses( 0);
        myCourses( -1);

    }, []);
    const renderCourseList = (courses) => {
        return courses.map((course) => (
            <div key={course.courseId}>
                <p>{course.courseName}</p>
                <p>CreatedAt: {convertDateFormat(course.createdAt)}</p>
                <p>Mentor: {mentorOfCourses[course.courseId]}</p>
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
