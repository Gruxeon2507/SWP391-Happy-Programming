import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import ParticipateServices from "../../services/ParticipateServices";
import CourseServices from "../../services/CourseServices";
import PublicService from "../../services/PublicService";
import api from "../../services/BaseAuthenticationService";

function HandleMentorCourse(props) {
  const [courses, setCourses] = useState([]);
  const [participates, setParticipates] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentorJoinCourse, setMentorJoinCourse] = useState([]);

  const handleMentorUpdate = (courseId, selectedOptions) => {
    const filteredOptions = selectedOptions.filter((option) => {
      return !participates.some(
        (p) =>
          p.participateKey.courseId === courseId &&
          p.participateKey.username === option.value
      );
    });

    const newParticipates = filteredOptions.map((option) => ({
      participateKey: {
        courseId: courseId,
        username: option.value,
      },
    }));

    const updatedParticipates = participates.filter(
      (p) =>
        p.participateKey.courseId !== courseId ||
        selectedOptions.some(
          (option) => option.value === p.participateKey.username
        )
    );

    setParticipates([...updatedParticipates, ...newParticipates]);
  };

  const loadData = async () => {
    try {
      const resMentorCourse = await ParticipateServices.findAllMentorCourse();
      setParticipates(resMentorCourse.data);

      const resAllCourse = await CourseServices.getAllCourses();
      setCourses(resAllCourse.data);

      const resActiveMentors = await PublicService.getActiveMentors();
      setMentors(res.data);
    } catch (error) {
      console.log(error);
    }
    // ParticipateServices.findAllMentorCourse()
    //   .then((res) => {
    //     setParticipates(res.data);
    //     // console.log(res.data);
    //     // console.log(participates);
    //   })
    //   .catch((error) => {
    //     {
    //       console.log(error);
    //       alert("Error when get Mentor");
    //     }
    //   });
    // CourseServices.getAllCourses()
    //   .then((res) => {
    //     setCourses(res.data);
    //     // console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error when get Courses");
    //   });
    // PublicService.getActiveMentors()
    //   .then((res) => {
    //     setMentors(res.data);
    //     // console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error when get Mentors");
    //   });
  };

  const loadDataMentorCourse = async () => {
    try {
      const mentorJoinCourseData = [];
      for (const course of courses) {
        const courseResponse = await axios.get(
          `http://localhost:1111/api/participates/findMentorJoinCourse/${course.courseId}`
        );
        const courseData = courseResponse.data;
        const mentorJoinCourseForCourse = courseData.map((mentor) => ({
          courseId: course.courseId,
          username: mentor.username,
        }));
        mentorJoinCourseData.push(...mentorJoinCourseForCourse);
      }
      // console.log(mentorJoinCourseData);
      setMentorJoinCourse(mentorJoinCourseData);
      // console.log(mentorJoinCourse);
    } catch (error) {
      console.log(error);
      alert("Error when loading mentor join course data");
    }
  };

  useEffect(() => {
    loadDataMentorCourse();
    loadData();
  }, []);
  useEffect(() => {
    loadDataMentorCourse();
  }, []);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("useEffect is running");
    loadDataMentorCourse();
  }, [counter]);

  useEffect(() => {
    if (counter === 1) {
      console.log("Second run of useEffect");
    }
    loadDataMentorCourse();
  }, [counter]);

  setTimeout(() => {
    setCounter(1);
  }, 100);

  const handleUpdateMentor = (event, courseId) => {
    event.preventDefault();
    console.log(participates);
    console.log(courseId);
    for (const p of participates) {
      let checkEmpty = false;
      for (const c of courses) {
        if (c.courseId === p.participateKey.courseId) {
          checkEmpty = true;
          break;
        }
      }
      if (!checkEmpty) {
        alert("You cannot update!!");
        return;
      }
    }

    if (participates.length === 0) {
      alert("You can not change this course by not let mentor teaching!!");
      return;
    }
    api
      .post(
        `http://localhost:1111/api/participates/updateMentorCourse`,
        participates
      )
      .then((res) => {
        // console.log(res.data);
        loadData();
        alert("Update successfully!!");
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return (
    <>
      <div>
        <table className="table-mentor-manage">
          <thead>
            <th>CourseID</th>
            <th>Course Name</th>
            <th>Created Date</th>
            <th>Course Being Teaching</th>
            <th>Update Mentor</th>
          </thead>
          <tbody>
            {courses.map((c) => {
              return (
                <tr key={c.courseId}>
                  <td>{c.courseId}</td>
                  <td>{c.courseName}</td>
                  <td>{c.createdAt}</td>
                  <td>
                    <Select
                      isMulti
                      options={mentorJoinCourse
                        .map((m) => {
                          if (m.courseId == c.courseId) {
                            return {
                              value: m.username,
                              label: m.username,
                            };
                          }
                          return null;
                        })
                        .filter(Boolean)}
                      value={participates.map((p) => {
                        if (p.participateKey.courseId === c.courseId) {
                          return {
                            value: p.participateKey.username,
                            label: p.participateKey.username,
                          };
                        }
                      })}
                      onChange={(selectedOptions) => {
                        handleMentorUpdate(c.courseId, selectedOptions);
                      }}
                      isSearchable={true}
                    ></Select>
                  </td>
                  <td>
                    <form
                      onSubmit={(event) => {
                        handleUpdateMentor(event, c.courseId);
                      }}
                    >
                      <button>Update Mentor</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HandleMentorCourse;
