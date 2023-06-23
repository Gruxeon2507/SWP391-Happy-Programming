import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices.js";
import UserServices from "../../services/UserServices.js";
import CourseServices from "../../services/CourseServices";
import { COURSE_BASE_REST_API_URL } from "../../services/CourseServices.js";
import ParticipateServices from "../../services/ParticipateServices.js";
import PublicService from "../../services/PublicService.js";
import "../Course/CreateCourse.css";
import NavBar from "../../Components/Navbar/NavBar";
import Select from "react-select";
import makeAnimated from "react-select/animated";

function CreateCourse() {
  const INVALID_COURSENAME_MSG =
    "Course name must be unique, non-empty and must not contain special characters.";
  const INVALID_COURSEDESC_MSG = "Course description must not be empty";
  const EMPTY_MENTORLIST_MSG =
    "You must choose at least 1 mentor for the course.";

  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    categories: [],
    mentors: [],
  });
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);
  const [tempMentors, setTempMentors] = useState([]);
  const [courseWithName, setCourseWithName] = useState([]);

  const handleSubmit = async (event) => {
    alert("created successfullty");

    event.preventDefault();
    if (!(await validateCourseAtCreation(course))) {
      return;
    }
    // insert into Course + CourseCategories + Participate admin
    const response = await CourseServices.createCourse(course);
    const newCourse = response.data;

    // insert mentor into Participate table
    const courseId = newCourse.courseId;
    const mentors = course.mentors.map((m) => m.username);
    ParticipateServices.saveParticipate(mentors, courseId, 2, 1);

    alert("Course created successfully.");
    window.location.href = "/";
  };

  const handleChangeCourseName = (e) => {
    setCourse({
      ...course,
      courseName: e.target.value.trim(),
    });
  };

  const handleChangeCourseDescription = (e) => {
    setCourse({
      ...course,
      courseDescription: e.target.value.trim(),
    });
  };

  const validateCourseName = async () => {
    if (course.courseName.trim().length == 0) {
      return false;
    }
    // check if course name already exists
    const response = await CourseServices.getCoursesByName(course.courseName);
    const courses = response.data;
    if (courses.length != 0) {
      return false;
    }
    var pattern = /[!@#$%^&*().?":{}|<>]/;
    return !pattern.test(course.courseName);
  };

  const validateCourseDescription = () => {
    if (course.courseDescription.trim().length == 0) return false;
    return true;
  };

  const validateCourseAtCreation = async () => {
    console.log("COURSE NAME: ", course.courseName);
    const isCourseNameValid = await validateCourseName(course.courseName)
    if (!isCourseNameValid) {
      console.log("COURSE NAME PROBLEM");
      alert(INVALID_COURSENAME_MSG);
      return false;
    } else {
      console.log("OK COURSENAME");
    }
    if (course.mentors.length == 0) {
      alert(EMPTY_MENTORLIST_MSG);
      return false;
    }
    return true;
  };

  const selectMentor = (mentor) => {
    setSelectedMentors(mentor);
    setCourse({
      ...course,
      mentor: mentor,
    });
    return mentor;
  };

  const selectCategories = (categoryId) => {
    setSelectedCategories((current) => {
      let isChecked = false;
      selectedCategories.forEach((category) => {
        if (category.categoryId == categoryId) {
          isChecked = true;
        }
      });
      if (isChecked) {
        return selectedCategories.filter(
          (item) => item.categoryId !== categoryId
        );
      } else {
        return [...current, { categoryId: categoryId }];
      }
    });
  };

  useEffect(() => {
    CategoryServices.getAllCategories().then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    PublicService.getActiveMentors().then((res) => setMentors(res.data));
  }, []);

  useEffect(() => {
    // Update the course state whenever selectedCategories change
    setSelectedCategories(tempCategories.map((c) => ({ categoryId: c.value })));
  }, [tempCategories]);

  useEffect(() => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      categories: selectedCategories,
      mentors: selectedMentors,
    }));
  }, [selectedCategories, selectedMentors]);

  useEffect(() => {
    setSelectedMentors(tempMentors.map((m) => ({ username: m.value })));
  }, [tempMentors]);
  return (
    <>
      <div className="createCourse-container">
        <form id="courseForm" className="courseForm">
          <table border={1} className="table-input">
            <tr>
              <td colSpan={2}>
                <div className="courseName-head">
                  <span>{course.courseName}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label>Course Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  required
                  placeholder="Input course name"
                  onChange={(e) => handleChangeCourseName(e)}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Course Description: </label>
              </td>
              <td>
                <textarea
                  type="text"
                  placeholder="Input course description"
                  onChange={(e) => handleChangeCourseDescription(e)}
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label>Categories:</label>
              </td>
              <td>
                <Select
                  options={categories.map((category) => ({
                    value: category.categoryId,
                    label: category.categoryName,
                  }))}
                  isMulti
                  isSearchable
                  value={tempCategories}
                  onChange={(values) => {
                    setTempCategories(values);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Mentor:</label>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Select
                  options={mentors.map((mentor) => ({
                    value: mentor.username,
                    label: mentor.displayName,
                  }))}
                  isMulti
                  isSearchable
                  value={tempMentors}
                  onChange={(values) => {
                    setTempMentors(values);
                  }}
                />

                {/* {mentors.map((mentor) => (
                  <div key={mentor.username}>
                    <input
                      type="radio"
                      name="mentor"
                      id={mentor.username}
                      value={mentor.username}
                      onChange={() => selectMentor(mentor.username)}
                      required
                    ></input>
                    <label htmlFor={mentor.username}>
                      {mentor.displayName} ({mentor.username})
                    </label>
                  </div>
                ))} */}
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="bttnRow">
                  <button onClick={handleSubmit}>Create course</button>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}

export default CreateCourse;
