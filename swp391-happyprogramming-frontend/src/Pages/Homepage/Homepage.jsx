import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import { Pagination } from "antd";
import { FormControl } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import "../Homepage/Homepage.css";
import convertDateFormat from "../../util/DateConvert";
import { useNavigate } from "react-router-dom";

// import backgound
import c1 from "../../Assets/courseBG/c12.png";
import c2 from "../../Assets/courseBG/c2.png";
import c3 from "../../Assets/courseBG/c3.png";
import c4 from "../../Assets/courseBG/c4.png";
import c5 from "../../Assets/courseBG/c5.png";
import c6 from "../../Assets/courseBG/c6.png";
import c7 from "../../Assets/courseBG/c7.png";
import c8 from "../../Assets/courseBG/c1.png";
import c9 from "../../Assets/courseBG/c9.png";
import c10 from "../../Assets/courseBG/c10.png";
import c11 from "../../Assets/courseBG/c11.png";
import c12 from "../../Assets/courseBG/c12.png";
import c13 from "../../Assets/courseBG/c13.png";
import c14 from "../../Assets/courseBG/c14.png";
import c15 from "../../Assets/courseBG/c15.png";
import c21 from "../../Assets/courseBG/c21.png";

function Homepage() {
  const navigate = useNavigate();

  const courseBackgrounds = [
    c1, c21, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15
  ];

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

  const handleCourseNavigate = (courseId) => {
    navigate(`/courses/view/${courseId}`);
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
              <ion-icon name="list-outline"></ion-icon>
            </button>
          </div>
          <div className="search-border">
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
          </div>
          <select
            name="filter"
            id=""
            onChange={(e) => {
              setSelectIndex(false);
              handleSearchCheckAndFilter('filterButton', e.target.value);
            }}>
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
      <div className="list-Courses">
        {pageCourses.map((course, index) => (
          <div
            className="course"
            key={course.courseId}
            onClick={() => handleCourseNavigate(course.courseId)}
          >
            <div
              className="couse-card-view"
              style={{
                backgroundImage: `url(${courseBackgrounds[index]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span>{course.courseName}</span>
            </div>
            <div className="course-desc">
              <span>Mentor: {mentorOfCourses[course.courseId]}</span>
            </div>
          </div>
        ))}
      </div>
      {/* ====================end region List of Course==================== */}

      {/* ====================region Pagination==================== */}
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
      {/* ====================End region Pagination==================== */}
    </div>
  );
}

export default Homepage;