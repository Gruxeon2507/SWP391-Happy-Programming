import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Don't forget to import useParams
import Select from "react-select";
import PublicService from "../../services/PublicService";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import api from "../../services/BaseAuthenticationService";
function Editcourse({ id }) {
  const INVALID_COURSENAME_MSG =
    "Course name must be unique, non-empty and must not contain special characters.";
  const EMPTY_MENTORLIST_MSG =
    "You must choose at least 1 mentor for the course.";
  const { courseID } = useParams();
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    categories: [],
    mentors: [],
  });
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tempCategories, setTempCategories] = useState([]);
  const [tempMentors, setTempMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    PublicService.getCourseByCourseId(courseID)
      .then((res) => {
        const c = res.data;
        setCourse(() => ({
          courseName: c.courseName,
          courseDescription: c.courseDescription,
          categories: c.categories,
          // mentors: c.mentors,
        }));
      })
      .catch((error) => {
        console.log("error fetching course" + error);
      });
  }, []);

  useEffect(() => {
    CategoryServices.getAllCategories().then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    CourseServices.getMentorToJoin(courseID).then((res) =>
      setMentors(res.data)
    );
  }, []);

  useEffect(() => {
    api
      .get("/api/categories/by-course/" + courseID)
      .then((res) => {
        // console.log("RES DATA CATEGORIES: ", res.data);
        setSelectedCategories(res.data);
      })
      .catch((error) => console.log("error getting categories: " + error));
  }, []);

  useEffect(() => {
    CourseServices.getMentorsOfCourse(courseID)
      .then((res) => {
        const ms = res.data.map((m) => ({
          username: m.username,
          displayName: m.displayName,
        }));
        setSelectedMentors(ms);
        // console.log(res.data);
      })
      .catch((error) => console.log("error getting mentors: " + error));
  }, []);
  useEffect(() => {
    setSelectedCategories(
      tempCategories.map((c) => ({
        categoryId: c.value,
        categoryName: c.label,
      }))
    );
  }, [tempCategories]);

  useEffect(() => {
    setSelectedMentors(
      tempMentors.map((m) => ({
        username: m.value,
        displayName: m.label,
      }))
    );
  }, [tempMentors]);
  // console.log(selectedMentors);
  useEffect(() => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      categories: selectedCategories,
      mentors: selectedMentors,
    }));
  }, [selectedCategories, selectedMentors]);

  const handleChangeCourseName = (e) => {
    setCourse({
      ...course,
      courseName: e.target.value,
    });
  };

  const handleChangeCourseDescription = (e) => {
    setCourse({
      ...course,
      courseDescription: e.target.value,
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

  const validateCourseAtSubmission = async () => {
    console.log("COURSE NAME: ", course.courseName);
    const isCourseNameValid = await validateCourseName(course.courseName);
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

  const handleSubmit = async (event) => {
    if (course.courseName.trim().length == 0) {
      alert(INVALID_COURSENAME_MSG);
      return;
    }
    if (course.mentors.length == 0) {
      alert(EMPTY_MENTORLIST_MSG);
      return;
    }
    event.preventDefault();
    // setLoading(true);
    // if (!(await validateCourseAtCreation(course))) {
    //   setLoading(false);
    //   return;
    // }
    try {
      // setLoading(false);
      // alert("Course created successfully.");
      // notiSuccess();
      // window.location.href = "/";
      const updatedCourse = {
        courseName: course.courseName.trim(),
        courseDescription: course.courseDescription.trim(),
        categories: selectedCategories,
        mentors: selectedMentors,
      };
      // console.log("SELECTED CATE: ", selectedCategories);
      CourseServices.updateCourse(
        courseID,
        updatedCourse,
        selectedMentors,
        selectedCategories
      );
      alert("Updated successfully!");
      navigate("/courses/view/" + courseID);
    } catch (error) {
      // setLoading(false);
      alert("Failed to update course: " + error);
      // notiError();
    }
  };

  // console.log("SELECTED MENTORS: ", selectedMentors.length);
  // console.log("SELECTED CATE: ", selectedCategories.length);
  return (
    <>
      {/* {loading ? <Loading></Loading> : <></>} */}
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
                  value={course.courseName}
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
                  value={course.courseDescription}
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
                  value={selectedCategories.map((category) => ({
                    value: category.categoryId,
                    label: category.categoryName,
                  }))}
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
              <td>
                <Select
                  options={mentors.map((mentor) => ({
                    value: mentor.username,
                    label: mentor.displayName,
                  }))}
                  isMulti
                  isSearchable
                  value={selectedMentors.map((mentor) => ({
                    value: mentor.username,
                    label: mentor.displayName,
                  }))}
                  onChange={(values) => {
                    setTempMentors(values);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="bttnRow">
                  <button onClick={handleSubmit}>Update course</button>
                </div>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </>
  );
}

export default Editcourse;
