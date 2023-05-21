import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/BaseAuthenticationService";
import CourseServices from "../../services/CourseServices";
import NavBar from "../../Components/Navbar/NavBar";

const CourseDetail = () => {
  const { courseName } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);

  const getCourse = async (courseId) => {
    try {
      const response = await CourseServices.getCourseByID(courseId);
      setCourseDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCourse(courseName);
  }, [courseName]);

  return (
    <div>
      {!courseDetail && (
        <div>
          <h1>404</h1>
        </div>
      )}
      {courseDetail && (
        <div>
          <NavBar></NavBar>
          {/* <div>
            <h1>{courseDetail.courseName}</h1>
          </div>
          <div>{courseDetail.courseDescription}</div> */}
          <pre>{JSON.stringify(courseDetail, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
