
import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";

function Homepage() {

  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageCourses, setPageCourses] = useState([]);

  const handleCheck = (categoryId) => {
    setChecked((prev) => {
      const isChecked = checked.includes(categoryId);
      if (isChecked) {
        //Uncheck
        return checked.filter((item) => item !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  console.log(checked);
  const getAllCategories = () => {
    CategoryServices.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPageCourses = (pageNumber, pageSize, sortField, sortOrder) => {
    CourseServices.getPageAllCourses(pageNumber, pageSize,sortField, sortOrder)
      .then((response) => {
        setPageCourses(response.data);
      })
      .catch((error) => {
        console.log("loi lay ra page Course");
      });
  };


  useEffect(() => {
    getAllCategories();
    getPageCourses(0, 20, "courseName", "asc");
  }, []);
  return (

    <>
      <h2>LIST CATEGORY</h2>
      {categories.map((category) => (
        <div className="select col-6 col-md-3 col-sm-4 d-flex ">
          <label key={category.categoryId}>
            <input
              type="checkbox"
              className="form-check-input w-20 h-20 ms-1 me-1"
              checked={checked.includes(category.categoryId)}
              onChange={() => handleCheck(category.categoryId)}
            />
            {category.categoryName}
          </label>
        </div>
      ))}

      <div className="list-books">
        {
          pageCourses.map((course) =>(
            <div>
              <p>{course.courseName}</p>
              <p>{course.createdAt}</p>
              <p>{course.courseDescription}</p>
            </div>

          ))
        }
      </div>

    </>
  )
}

export default Homepage

