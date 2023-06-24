import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../Course/CourseDetails.css";
import PublicService from "../../services/PublicService";
import ParticipateServices from "../../services/ParticipateServices";
import NavBar from "../../Components/Navbar/NavBar";
import baseAVT from "../../Assets/base_user_img.png";
import RequestService from "../../services/RequestService";
import RequestButton from "../../Components/RequestButton/RequestButton";

function StarRating({ rating }) {
  const navigate = useNavigate();

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= rating; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    return stars;
  };

  return (
    <>
      <span>Rating: </span>
      {renderStars()}
    </>
  );
}

const CourseDetails = (props) => {
  const { courseID } = useParams();
  const courseProp = courseID;
  const [course, setCourse] = useState({});
  const [mentor, setMentor] = useState({});
  const [rating, setRating] = useState(0);
  const [participation, setParticipation] = useState({});
  // const [participateStatus, setParticipateStatus] = useState(-1);

  // useEffect(() => {
  //   ParticipateServices.getParticipateByUser(courseID)
  //     .then((res) => {
  //       // setParticipation(res.data);
  //       const p = res.data;
  //       if (p.length == 0 || p.status.statusId == -1) {
  //         setParticipateStatus(-1);
  //         console.log(participateStatus);
  //       } else if (p.status.statusId == 0) {
  //         setParticipateStatus(0);
  //       } else if (p.status.statusId == 1) {
  //         setParticipateStatus(1);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error fetching participation" + error);
  //     });
  // }, []);
  // console.log("PARTICIPATE STATUS " + participateStatus);

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

  // const cancelRequest = () => {
  //   RequestService.deleteParticipateDeleteRequest(courseID);
  //   window.location.reload();
  // };

  // const handleRequest = () => {
  //   // const token = localStorage.getItem("token");
  //   if (localStorage.getItem("token")) {
  //     // ParticipateServices.saveParticipate("", courseID, 3, 0);
  //     // RequestService.insertIntoRequest(courseID);
  //     RequestService.insertParticipadeInsertRequest(courseID)
  //     window.location.href = `/courses/view/${courseID}`;
  //   } else {
  //     window.location.href = "/login";
  //   }
  // };

  // console.log("PART: " + JSON.stringify(participation));
  return (
    <div>
      <NavBar mode={0}></NavBar>
      <div className="cd-content">
        <div className="course-info">
          <div className="course-header">
            <h2>{course.courseName}</h2>
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
              <img
                src={
                  "http://localhost:1111/api/users/avatar/" + mentor.username
                }
                alt="image"
              ></img>
            </div>
            <div className="m-i-name">
              <span>Mentor</span>
              <span>
                <a href={`/profile/${mentor.username}`}>{mentor.displayName}</a>
              </span>
            </div>
          </div>
          <div className="m-i-rating">
            <span>
              <StarRating rating={rating} />{" "}
            </span>
          </div>
          {/* {Object.keys(participation).length == 0 ? (
            <div>
              <button id="requestBttn" onClick={() => handleRequest()}>
                Request
              </button>
            </div>
          ) : (
            <div>
              <button
                id="requestBttn"
                style={{
                  border: "4px solid var(--item2)",
                  color: "var(--item2)",
                }}
              >
                Requested
              </button>
            </div>
          )} */}

          {/* {participateStatus == -1 ? (
            <>
              <div>
                <button id="requestBttn" onClick={() => handleRequest()}>
                  Request
                </button>
              </div>
            </>
          ) : participateStatus == 0 ? (
            <>
              <div onClick={() => cancelRequest(courseID)}>
                <button
                  id="requestBttn"
                  style={{
                    border: "4px solid var(--item2)",
                    color: "var(--item2)",
                  }}
                >
                  Cancel request
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <button
                  id="requestBttn"
                  style={{
                    border: "4px solid var(--item2)",
                    color: "var(--item2)",
                  }}
                >
                  <Link to={"/courses/feed/" + courseID}>Go to course</Link>
                </button>
              </div>
            </>
          )} */}
          <RequestButton
            {...{courseID:courseProp}}
          />
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
