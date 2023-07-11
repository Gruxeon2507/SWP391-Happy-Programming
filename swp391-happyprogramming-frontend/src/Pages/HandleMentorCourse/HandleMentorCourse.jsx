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

  const [mentorUpdate, setMentorUpdate] = useState([]);

  const handleMentorUpdate = (courseId, selectedOptions) => {
    // Filter out the selectedOptions that are already present in participates array
    const filteredOptions = selectedOptions.filter((option) => {
      return !participates.some(
        (p) =>
          p.participateKey.courseId === courseId &&
          p.participateKey.username === option.value
      );
    });

    // Create an array of new participate elements to be added
    const newParticipates = filteredOptions.map((option) => ({
      participateKey: {
        courseId: courseId,
        username: option.value,
      },
      // Other properties of the participate object...
    }));

    // Filter out the mentors that are no longer selected
    const updatedParticipates = participates.filter(
      (p) =>
        p.participateKey.courseId !== courseId ||
        selectedOptions.some(
          (option) => option.value === p.participateKey.username
        )
    );

    // Update the state by concatenating the newParticipates array with the updatedParticipates array
    setParticipates([...updatedParticipates, ...newParticipates]);
  };

  const loadData = () => {
    ParticipateServices.findAllMentorCourse()
      .then((res) => {
        setParticipates(res.data);
        // console.log(res.data);
        // console.log(participates);
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
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error when get Courses");
      });
    PublicService.getActiveMentors()
      .then((res) => {
        setMentors(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error when get Mentors");
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateMentor = (event) => {
    event.preventDefault();
    console.log(participates);
    api
      .post(
        `http://localhost:1111/api/participates/updateMentorCourse`,
        participates
      )
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => {
        console.log(err);
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
                      onChange={(selectedOptions) => {
                        handleMentorUpdate(c.courseId, selectedOptions);
                      }}
                      isSearchable={true}
                    ></Select>
                  </td>
                  <td>
                    <form onSubmit={handleUpdateMentor}>
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
