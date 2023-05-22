import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import UserService from "../../services/UserService";
import CourseServices from "../../services/CourseServices";
import { COURSE_BASE_REST_API_URL } from "../../services/CourseServices";
// import CategoryServices from "../../services/CategoryServices";
import ParticipateServices from "../../services/ParticipateServices";
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
    // console.log(newCourse);
    const courseId = newCourse.courseId;
    // console.log("Course Id is: " + courseId);
    const username = course.mentor;
    // console.log("USER NAME IS " + username);
    ParticipateServices.saveParticipate(username, courseId, 2, 1);
  };
  // console.log(course.categories.length + " categories SUBMITTED");

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
      // const isChecked = selectedCategories.includes({categoryId: categoryId});
      selectedCategories.forEach((category) => {
        if (category.categoryId == categoryId) {
          isChecked = true;
        }
      });
      // console.log(isChecked);
      if (isChecked) {
        return selectedCategories.filter(
          (item) => item.categoryId !== categoryId
        );
      } else {
        return [...current, { categoryId: categoryId }];
      }
    });
    // console.log(selectedCategories);
    // setCourse({ ...course, categories: selectedCategories });
  };
  console.log(selectedCategories);
  console.log(selectedCategories.length + " categories selected");
  // console.log(course.categories);
  // console.log(course.categories.length + " categories selected");

  useEffect(() => {
    CategoryServices.getAllCategories().then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    UserService.getAlllMentors().then((res) => setMentors(res.data));
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

            <label htmlFor={category.categoryId}>{category.categoryName}</label>
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
    </>
  );
}

export default CreateCourse;
