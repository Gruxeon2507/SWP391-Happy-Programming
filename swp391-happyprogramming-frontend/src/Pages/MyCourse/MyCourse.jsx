import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";
import { useNavigate } from "react-router-dom";
import "./MyCourse.css"
import NavBar from "../../Components/Navbar/NavBar";

const MyCourse = () => {
  const navigate = useNavigate();

  const [accessCourses, setAccessCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [rejectCourses, setRejectCourses] = useState([]);
  // const [mentorOfCourses, setMentorOfCourses] = useState({});

  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleCourseNavigate = (courseId) => {
    navigate(`/courses/feed/${courseId}`);
  };

  // const getMentorOfCourses = (courseId) => { 
  //   CourseServices.getMentorOfCourse(courseId).then((response) => {
  //     setMentorOfCourses((prevUserOfCourses) => ({
  //       ...prevUserOfCourses,
  //       [courseId]: response.data.displayName,
  //     }));
  //   });
  // };

  // const mapMentor = (courses) => {
  //   courses.forEach((course) => {
  //     getMentorOfCourses(course.courseId);
  //   });
  // };

  // useEffect(() => {
  //   mapMentor(accessCourses);
  // }, [accessCourses]);

  // useEffect(() => {
  //   mapMentor(pendingCourses);
  // }, [pendingCourses]);

  // useEffect(() => {
  //   mapMentor(rejectCourses);
  // }, [rejectCourses]);


  const myCourses = (statusId) => {
    CourseServices.getCourseByUsernameAndStatusId(statusId)
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
    myCourses(1);
    myCourses(0);
    myCourses(-1);

  }, []);
  const renderCourseList = (courses) => {
    return courses.map((course) => (
      <div key={course.courseId} className="card-wraper" onClick={() => {
        handleCourseNavigate(course.courseId);
      }}>
        <div className="card-title"><span>{course.courseName}</span></div>
        {/* <span>Mentor: {mentorOfCourses[course.courseId]}</span> */} 
      </div>
    ));
  };

  return (
    <>
      <hr />
      <NavBar mode={1} />
      <div className="myCourse-body">
        <div className="course-card">
          <div className="c-c-head">
            <h1>Access Course</h1>
            <ion-icon name="caret-down-circle-outline"></ion-icon>
          </div>
          <div className="AccessCourse">
            {renderCourseList(accessCourses)}
          </div>
        </div>
        <div className="course-card">
          <div className="c-c-head">
            <h1>Pending Course</h1>
            <ion-icon name="caret-down-circle-outline"></ion-icon>
          </div>

          <div className="PendingCourse">
            {renderCourseList(pendingCourses)}
            {renderCourseList(pendingCourses)}
          </div>
        </div>
        <div className="course-card">
          <div className="c-c-head">
            <h1>Reject Course</h1>
            <ion-icon name="caret-down-circle-outline"></ion-icon>
          </div>

          <div className="RejectCourse">
            {renderCourseList(rejectCourses)}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourse
