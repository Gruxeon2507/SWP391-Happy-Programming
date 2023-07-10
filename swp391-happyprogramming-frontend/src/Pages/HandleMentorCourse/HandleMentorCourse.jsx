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

function HandleMentorCourse(props) {
  const [courses, setCourses] = useState([]);
  const [participates, setParticipates] = useState([]);
  const [mentors, setMentors] = useState([]);

  const [mentorUpdate, setMentorUpdate] = useState([]);

  useEffect(() => {
    ParticipateServices.findAllMentorCourse()
      .then((res) => {
        setParticipates(res.data);
        console.log(res.data);
        console.log(participates);
      })
      .catch((error) => {
        {
          console.log(error);
          alert("Error when get Mentor");
        }
      });
    CourseServices.getAllCourses()
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error when get Courses");
      });
    PublicService.getActiveMentors()
      .then((res) => {
        setMentors(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error when get Mentors");
      });
  }, []);

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
                    {participates.map((p) => {
                      if (p.participateKey.courseId === c.courseId) {
                        return <>{p.participateKey.username},</>;
                      }
                    })}
                  </td>
                  <td>
                    <Select
                      isMulti
                      options={mentors.map((m) => ({
                        value: m.username,
                        label: m.username,
                      }))}
                      value={participates.map((p) => {
                        if (p.participateKey.courseId === c.courseId) {
                          return {
                            value: p.participateKey.username,
                            label: p.participateKey.username,
                          };
                        }
                      })}
                      onChange={(values) => {}}
                      isSearchable={true}
                    ></Select>
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
