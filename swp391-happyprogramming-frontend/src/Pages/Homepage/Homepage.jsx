import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import { Pagination } from "antd";
import { FormControl } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import "../Homepage/Homepage.css";
import convertDateFormat from "../../util/DateConvert";

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageCourses, setPageCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [condition, setCondition] = useState("");
  const [selectIndex, setSelectIndex] = useState(true);
  const [isActiveCateFilter, setActiveCateFilter] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [mentorOfCourses, setMentorOfCourses] = useState({});

  const toggleActiveCateFilter = () => {
    setActiveCateFilter(!isActiveCateFilter);
  };

  const sizePerPage = 12;
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

  const getAllCategories = async () => {
    await CategoryServices.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categoryIds = checked.join(",");

  const handlePageChange = (current) => {
    setCurrentPage(current);
    getSearchCheckAndFilterCourses(checked, condition, current - 1, sizePerPage, sortField, sortOrder)

  };

  useEffect(() => {
    getAllCategories();
    handleSearchCheckAndFilter();
  }, []);


  const getSearchCheckAndFilterCourses = (
    categoryIds,
    searchText,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) =>
    CourseServices.getSearchCheckAndFilterCourses(
      categoryIds,
      searchText,
      pageNumber,
      pageSize,
      sortField,
      sortOrder
    ).then((response) => {
      setPageCourses(response.data.content);
      setTotalItems(response.data.totalElements);
    });

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

  var searchText = encodeURIComponent(condition).replace(/%20/g, "%20")
  useEffect(() => {
    getSearchCheckAndFilterCourses(checked, searchText, 0, sizePerPage, sortField, sortOrder)
  }, [sortField, sortOrder])


  const handleReset = () => {
    setSelectIndex(true);
    setCondition("");
    setChecked([]);
    setSortField("createdAt");
    setSortOrder("desc");
    getSearchCheckAndFilterCourses("", "", 0, sizePerPage, sortField, sortOrder)
  };
  const handleSearchCheckAndFilter = async (source, value) => {
    setCurrentPage(1);
    if (source === 'filterButton') {
      const sortField = value.split("|")[1];
      const sortOrder = value.split("|")[0];
      await setSortField(sortField);
      await setSortOrder(sortOrder);
      console.log("sortField = " + sortField);
      console.log("sortOrder = " + sortOrder);
    }
    else if (source === 'findButton' || source === 'searchButton') {
      getSearchCheckAndFilterCourses(checked, searchText, 0, sizePerPage, sortField, sortOrder)
    }
  };

  return (
    <div className="container home-page">
      <NavBar mode={1}></NavBar>

      {/* ====================region filter==================== */}
      <div className="filter-container">
        <div className="filter-1">
          <div className="cate-filter-head">
            <button onClick={toggleActiveCateFilter}>
              {/* <ion-icon name="filter-circle-outline"></ion-icon> */}
              <ion-icon name="list-outline"></ion-icon>
            </button>
          </div>
          <input
            type="text"
            placeholder="Search course here"
            name="search"
            value={condition}
            onChange={(e) => {
              setCondition(e.target.value);
            }}
          />
          <button onClick={() => handleSearchCheckAndFilter('searchButton')}>
            <ion-icon name="search-circle-outline"></ion-icon>
          </button>
          <div className="textBttn">
            <button onClick={handleReset}>Reset</button>
          </div>
          <select
            name="filter"
            id=""
            onChange={(e) => {
              setSelectIndex(false);
              handleSearchCheckAndFilter('filterButton', e.target.value);
            }}
          >
            {selectIndex ? <option selected value="desc|createdAt">Newest</option> : <option value="desc|createdAt">Newest</option>}
            <option value="asc|createdAt">Oldest</option>
            <option value="asc|courseName">A-Z Name</option>
            <option value="desc|courseName">Z-A Name</option>

          </select>
          <div className="textBttn">
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      </div>

      <div className="cate-filter">
        <div className={`select-list ${isActiveCateFilter ? "active" : ""}`}>
          {categories.map((category) => (
            <div className="select" key={category.categoryId}>
              <label>
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
          <div className="findByCate">
            <button onClick={() => handleSearchCheckAndFilter('findButton')}>Find</button>
          </div>
        </div>
      </div>
      {/* ====================end region filter==================== */}

      {/* ====================region List of Course==================== */}
      {/* <div className="list-Courses">
        {pageCourses.map((course) => (
          <div className="course" key={course.courseId}>
            <span>
              {course.courseId}:{course.courseName}
            </span>
            <span>{course.createdAt}</span>
            <span>Mentor: {mentorOfCourses[course.courseId]}</span>
            <span>View details</span>
            <hr />
          </div>
        ))}
      </div> */}
      <div className="list-Courses">
        {pageCourses.map((course) => (
          <div className="course" key={course.courseId}>
            <span>
              {course.courseId}:{course.courseName}
            </span>
            <span>{convertDateFormat(course.createdAt)}</span>
            <span>Mentor: {mentorOfCourses[course.courseId]}</span>
            <hr />
          </div>
        ))}
      </div>

      {/* ====================end region List of Course==================== */}
      <div className="Pagination-Container">
        <Pagination
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
      </div>
      {/* ====================region Pagination==================== */}
      {/* <div className="pagination-container">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ion-icon name="caret-back-circle-outline"></ion-icon>
        </button>

        <span>{`${currentPage} of ${Math.ceil(
          totalItems / sizePerPage
        )}`}</span>

        <button
          disabled={currentPage === Math.ceil(totalItems / sizePerPage)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ion-icon name="caret-forward-circle-outline"></ion-icon>
        </button>
      </div> */}
      {/* ====================End region Pagination==================== */}
    </div>
  );
}

export default Homepage;
