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
  const [filter, setFilter] = useState("all");
  const [mentorOfCourses, setMentorOfCourses] = useState({});

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
    console.log("da chay filter");
    handleSearch();
  }, []);

  const handleSubmit = () => {
    console.log("check on submit:" + checked);
    setCurrentPage(1);
    console.log({ ids: checked });
    const categoryIds = checked.join(",");
    console.log("categoryIds" + categoryIds);
    getPageCoursesByCategories(categoryIds, 0, sizePerPage, "createdAt", "desc");
  };
  const filterCourse = (searchText, pageNumber, pageSize, sortField, sortOrder) =>
    CourseServices.filterCourse(searchText, pageNumber, pageSize, sortField, sortOrder).then(
      (response) => {
        setPageCourses(response.data.content);
        setTotalItems(response.data.totalElements);
      }
    );
  const handleSearch = () => {
    console.log("da click search");
    console.log(condition);
    console.log(condition.length);
    if (condition.length > 0) {
      console.log("goi api");
      filterCourse(encodeURIComponent(condition).replace(/%20/g, "%20"), 0, sizePerPage, "createdAt", "desc");
    } else {
      getPageCourses(0, 5, "createdAt", "desc");
      // handleCheckFilter();
    }


  }
  const handleReset = () => {
    setCondition('')
    console.log("da click reset ");
    getPageCourses(0, 5, "createdAt", "desc");

  }
  const handleCheckFilter = (checkedFilter) => {
    console.log(checkedFilter);
    const sortField = checkedFilter.split('|')[1];
    const sortOrder = checkedFilter.split('|')[0];
    console.log("sortField = " + sortField);
    console.log("sortOrder = " + sortOrder);
    if (condition.length > 0) {
      filterCourse(encodeURIComponent(condition).replace(/%20/g, "%20"), 0, sizePerPage, sortField, sortOrder);
    } else {
      getPageCourses(0, 5, sortField, sortOrder);
    }


  }

  const getMentorOfCourses = (courseId) => {
    CourseServices.getMentorOfCourse(courseId).then((response) => {
      setMentorOfCourses((prevUserOfCourses) => ({
        ...prevUserOfCourses,
        [courseId]: response.data.displayName,
      }));
    });
  };
  useEffect(() => {
    pageCourses.forEach((course) => {
      getMentorOfCourses(course.courseId);
    });
  }, [pageCourses]);

  return (

    <>

      <div className="find d-flex justify-content-center">
        <FormControl
          placeholder="Search course here"
          name="search"
          className={"info-border bg-dark text-white w-50 "}
          value={condition}
          onChange={(e) => { setCondition(e.target.value); console.log(e.target.value); }}
        />
        <button onClick={() => handleSearch()}>Search</button>
        <button onClick={() => handleReset()}>Reset</button>
        <select name="filter" id="" onChange={(e) => handleCheckFilter(e.target.value)} >
          <option disabled>---- Filter -----</option>
          <option value="asc|courseName">A-Z Name</option>
          <option value="desc|courseName">Z-A Name</option>
          <option value="asc|createdAt">Newest </option>
          <option value="desc|createdAt">Oldest</option>
        </select>
      </div>

      <h2>LIST CATEGORY</h2>
      {categories.map((category) => (
        <div className="select">
          <label key={category.categoryId}>
            <input
              type="checkbox"
              className="form-check-input"
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
              <p>CreatedAt: {course.createdAt}</p>
              <p>Mentor: {mentorOfCourses[course.courseId]}</p>
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

export default Homepage;
