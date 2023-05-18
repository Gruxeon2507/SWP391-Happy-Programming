
import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import { Pagination } from "antd";
import { FormControl } from "react-bootstrap";
function Homepage() {

  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageCourses, setPageCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [condition, setCondition] = useState("");
  const sizePerPage = 5;
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
    CourseServices.getPageAllCourses(pageNumber, pageSize, sortField, sortOrder)
      .then((response) => {
        console.log(response);
        setPageCourses(response.data.content);
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.log("loi lay ra page Course");
      });
  };

  const getPageCoursesByCategories = (categoryIds, pageNumber, pageSize, sortField, sortOrder) => {
    CourseServices.getPageCoursesByCategories(categoryIds, pageNumber, pageSize, sortField, sortOrder)
      .then((response) => {
        setPageCourses(response.data.content);
        console.log("response" + response.data);
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.log("loi lay ra page Course");
        console.log(error);
      });
  };
  const handlePageChange = (current) => {
    if (checked.length > 0) {
      setCurrentPage(current);
      console.log("current" + current);
      getPageCoursesByCategories(checked.join(","), current - 1, sizePerPage, "createdAt", "desc");
    } else {
      setCurrentPage(current);
      getPageCourses(current - 1, sizePerPage, "createdAt", "desc");
    }
  };

  useEffect(() => {
    getAllCategories();
    getPageCourses(0, 5, "createdAt", "desc");
    // filterCourse(encodeURIComponent(condition).replace(/%20/g, "%20"), 0, sizePerPage );
  }, []);
  const handleSubmit = () => {
    console.log("check on submit:" + checked);
    setCurrentPage(1);
    console.log({ ids: checked });
    const categoryIds = checked.join(",");
    console.log("categoryIds" + categoryIds);
    getPageCoursesByCategories(categoryIds, 0, sizePerPage, "createdAt", "desc");
  };
  // const filterCourse = (searchText, pageNumber, pageSize , sortField, sortOrder ) =>
  //   CourseServices.filterCourse(searchText,pageNumber, pageSize, sortField, sortOrder).then(
  //     (response) => {
  //       setPageCourses(response.data.content);
  //       setTotalItems(response.data.totalElements);
  //     }
  //   );
  // const findCondition = () => {
  //   setCondition(condition);
  //   console.log(condition.length)
  //   if (condition.length) {
  //     getPageCourses(0, 5, "createdAt", "desc");
  //   }
  // }


  return (

    <>
      <FormControl
        placeholder="Search Courses Here"
        name="search"
        className={"info-border  text-black w-50 "}
        value={condition}
        onChange={(e) => { setCondition(e.target.value) }}
        // onInput={(e) => { findCondition() }}
      />
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
      <div className="btn btn-success" onClick={handleSubmit}>Find</div>

      <div className="list-Courses">
        {
          pageCourses.map((course) => (
            <div>
              <p>{course.courseName}</p>
              <p>{course.createdAt}</p>
              <p>Mentor</p>
              <p>View details</p>
              <hr />
              {/* <p>{course.courseDescription}</p> */}

            </div>

          ))
        }
      </div>
      <Pagination
        style={{ borderColor: "#eaa451", color: "black", boxShadow: "none", margin: "5px" }}
        total={totalItems}
        defaultPageSize={sizePerPage}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        current={currentPage}
        onChange={(current) => {
          handlePageChange(current);
        }}
      />
    </>
  )
}

export default Homepage

