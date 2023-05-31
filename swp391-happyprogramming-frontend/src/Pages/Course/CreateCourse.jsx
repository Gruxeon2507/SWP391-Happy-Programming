import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import UserService from "../../services/UserService";
import CourseServices from "../../services/CourseServices";
import { COURSE_BASE_REST_API_URL } from "../../services/CourseServices";
import ParticipateServices from "../../services/ParticipateServices";
import PublicService from "../../services/PublicService";
import "../Course/CreateCourse.css";
import NavBar from "../../Components/Navbar/NavBar";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
  const [temp, setTemp] = useState([]);

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
  // const options = categories.map((cate) => {
  //   return { value: cate.categoryId, label: cate.categoryName };
  // });

  useEffect(() => {
    // Update the course state whenever selectedCategories change
    setSelectedCategories(temp.map((c) => ({ categoryId: c.value })));

  }, [temp]);

  useEffect(() => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      categories: selectedCategories,
    }));
  }, [selectedCategories])

  return (
    <>
      {/* <NavBar mode={0} /> */}
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
                <label>Input </label>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                {course.courseDescription}
              </td>
            </tr>
            <tr>
              <td>
                <label>Course Name: </label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Input course name"
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courseName: e.target.value,
                    })
                  }
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
                  placeholder="Input course Description:"
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courseDescription: e.target.value,
                    })
                  }
                ></textarea>
              </td>
            </tr>
            <tr>
              <td>
                <label>Categories:</label>
              </td>
              <td>
                {/* <Select options={options} isMulti onChange={}/> */}
                <Select
                  options={categories.map((category) => ({
                    value: category.categoryId,
                    label: category.categoryName,
                  }))}
                  isMulti
                  isSearchable
                  value={temp}
                  onChange={(values) => {
                    // setSelectedCategories(values);
                    setTemp(values);
                  }}
                />
              </td>
            </tr>
            {/* <tr>
              <td colSpan={2}>
                <div className="cate-list">
                  {categories.map((category) => (
                    <div key={category.categoryId} className="cate">
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
                </div>
              </td>
            </tr> */}
            <tr>
              <td>
                <label>Mentor:</label>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
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
