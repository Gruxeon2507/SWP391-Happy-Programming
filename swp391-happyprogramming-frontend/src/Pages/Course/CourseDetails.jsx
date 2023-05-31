import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "../Course/CourseDetails.css";
import CourseServices from "../../services/CourseServices";
import PublicService from "../../services/PublicService";
import ParticipateServices from "../../services/ParticipateServices";
import NavBar from "../../Components/Navbar/NavBar";
import baseAVT from "../../Assets/base_user_img.png";

function StarRating({ rating }) {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= rating; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    return stars;
  };

  return <><span>Rating: </span>{renderStars()}</>;
}

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
        console.log(res.data);
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
    console.log("pressed");
    const token = localStorage.getItem("token");
    if (localStorage.getItem("token")) {
      ParticipateServices.saveParticipate("", courseID, 3, 0);
    } else {
      window.location.href = "/login";
    }
  };

  // console.log("rating is: " + rating);
  return (
    <div>
      <NavBar mode={0}></NavBar>
      <div className="cd-content">
        <div className="course-info">
          <div className="course-header">
            <h2>
              {course.courseName}
            </h2>
          </div>
          <div>
            <p>{course.courseDescription}</p>
          </div>
          <div>
            <span id="cateSpan">Categories:</span>
            {course.categories?.map((c) => (
              <span key={c.categoryId}>{c.categoryName}</span>
            ))}
          </div>
        </div>
        <div className="mentor-info">
          <div className="basic-info">
            <div>
              <img src={"http://localhost:1111/api/users/avatar/" + mentor.username} alt="image"></img>
            </div>
            <div className="m-i-name">
              <span>Mentor</span>
              <span><a href={`/profile/${mentor.username}`}>{mentor.displayName}</a></span>
            </div>
          </div>
          <div className="m-i-rating">
            <span><StarRating rating={rating} />  </span>
          </div>
          <div>
            <button id="requestBttn" onClick={() => handleRequest()}>Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
