import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "../Course/CourseDetails.css";
import CourseServices from "../../services/CourseServices";
import PublicService from "../../services/PublicService";
import ParticipateServices from "../../services/ParticipateServices";

const CourseDetails = (props) => {
  const { courseID } = useParams();
  const [course, setCourse] = useState({});
  const [mentor, setMentor] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    PublicService.getCourseByCourseId(courseID)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((error) => {
        console.log("error fetching course" + error);
      });
  }, []);

  useEffect(() => {
    PublicService.getMentorByCourseId(courseID)
      .then((res) => {
        setMentor(res.data);
        return res.data;
      })
      .then((mentor) => {
        PublicService.getAvgRatingByMentor(mentor.username)
          .then((res) => setRating(res.data))
          .catch((error) => {
            console.log("error fetching rating" + error);
          });
      })
      .catch((error) => {
        console.log("error fetching mentor" + error);
      });
  }, []);

  const handleRequest = () => {
    ParticipateServices.saveParticipate(mentor.username, courseID, 3, 0);
  };

  console.log("rating is: " + rating);
  // console.log("mentor is: " + mentor.username);
  // console.log("course name is: " + course.courseName);
  // console.log("course id is: " + courseID);
  // console.log("CATEGORIES: " + course.categories);
  return (
    <div>
      <div className="cd-container">
        <div className="cd-content">
          <div className="course-info">
            <div className="course-header">
              <h1>
                course detail:{courseID} - {course.courseName}
              </h1>
            </div>
            <div>
              <span>course desc: {course.courseDescription}</span>
            </div>
            <div>
              <span>course cate</span>
              {course.categories?.map((c) => (
                <span key={c.categoryId}>{c.categoryName}</span>
              ))}
            </div>
          </div>
          <div className="mentor-info">
            <div>
              <img src="" alt="image"></img>
            </div>
            <div>
              <span>mentor name</span>
              <span>{mentor.displayName}</span>
            </div>
            <div>
              <span>rating</span>
              <span>{rating}</span>
            </div>
            <div>
              <button onClick={() => handleRequest}>request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
