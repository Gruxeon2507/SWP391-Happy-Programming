import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import UserService from "../../services/UserService";
import CourseServices from "../../services/CourseServices";
import { COURSE_BASE_REST_API_URL } from "../../services/CourseServices";
import ParticipateServices from "../../services/ParticipateServices";
import PublicService from "../../services/PublicService";
import "../Course/CreateCourse.css";
import NavBar from "../../Components/Navbar/NavBar";

function CreateCourse() {
  const [course, setCourse] = useState({
    courseName: "",
    courseDescription: "",
    categories: [],
    mentor: "",
  });
  const [categories, setCategories] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // insert into Course + CourseCategories + Participate admin
    const response = await CourseServices.createCourse(course);
    const newCourse = response.data;

    // insert mentor into Participate table
    const courseId = newCourse.courseId;
    const username = course.mentor;
    ParticipateServices.saveParticipate(username, courseId, 2, 1);
  };

  const selectMentor = (mentor) => {
    setSelectedMentor(mentor);
    setCourse({
      ...course,
      mentor: mentor,
    });
    return mentor;
  };
  console.log(course.mentor);

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
  console.log(selectedCategories);
  console.log(selectedCategories.length + " categories selected");

  useEffect(() => {
    CategoryServices.getAllCategories().then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    PublicService.getActiveMentors().then((res) => setMentors(res.data));
  }, []);

  useEffect(() => {
    // Update the course state whenever selectedCategories change
    setCourse((prevCourse) => ({
      ...prevCourse,
      categories: selectedCategories,
    }));
  }, [selectedCategories]);

  return (
    <>
      <NavBar mode={0} />
      <div className="createCourse-container">
        <form id="courseForm">
          <label>Course Name: </label>
          <input
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                courseName: e.target.value,
              })
            }
          ></input>
          <p>Name: {course.courseName}</p>
          <br />
          <label>Course Description: </label>
          <input
            type="text"
            onChange={(e) =>
              setCourse({
                ...course,
                courseDescription: e.target.value,
              })
            }
          ></input>
          <p>Description: {course.courseDescription}</p>
          <br />
          <label>Categories:</label>

          {categories.map((category) => (
            <div key={category.categoryId}>
              <input
                type="checkbox"
                name="categories"
                id={category.categoryId}
                value={category.categoryId}
                onChange={() => selectCategories(category.categoryId)}
              ></input>

              <label htmlFor={category.categoryId}>
                {category.categoryName}
              </label>
            </div>
          ))}
          <br />
          <label>Mentor:</label>
          <input type="radio" name="mentor" id={0}></input>
          {mentors.map((mentor) => (
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
          ))}
          <br />
          <button onClick={handleSubmit}>Create course</button>
        </form>
      </div>
    </>
  );
}

export default CreateCourse;
