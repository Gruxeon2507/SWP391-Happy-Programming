import React, { useEffect, useState, useRef } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import { FormControl } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import "../Homepage/Homepage.css";
import convertDateFormat from "../../util/DateConvert";
import { useNavigate } from "react-router-dom";

import resetFilterImg from "../../Assets/resetFilter.png";

import c1 from "../../Assets/hpyproBG-blue/b-bg-1.png";
import c6 from "../../Assets/hpyproBG-blue/b-bg-2.png";
import c3 from "../../Assets/hpyproBG-blue/b-bg-3.png";
import c7 from "../../Assets/hpyproBG-blue/b-bg-3.png";
import c5 from "../../Assets/hpyproBG-blue/b-bg-11.png";
import c2 from "../../Assets/hpyproBG-blue/b-bg-6.png";
import c4 from "../../Assets/hpyproBG-blue/b-bg-8.png";
import c12 from "../../Assets/hpyproBG-blue/b-bg-8.png";
import c9 from "../../Assets/hpyproBG-blue/b-bg-9.png";
import c10 from "../../Assets/hpyproBG-blue/b-bg-10.png";
import c11 from "../../Assets/hpyproBG-blue/b-bg-11.png";
import c8 from "../../Assets/hpyproBG-blue/b-bg-12.png";
import c13 from "../../Assets/hpyproBG-blue/b-bg-13.png";
import Paging from "../../Components/Pagination/Paging";

const Homepage = () => {

  const courseBackgrounds = [
    c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13
  ];

  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageCourses, setPageCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectIndex, setSelectIndex] = useState(true);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const sizePerPage = 12;

  const handleCourseNavigate = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const getAllCategories = () => {
    CategoryServices.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // const handleKeyPress = (event) => {
  //   setSearchText(event.target.value);
  //   if (event.key === 'Enter') {
  //   }  
  // };
  
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePageChange = (current) => {
    setCurrentPage(current);
    getPageAllCourses(checked, searchText, current - 1, sizePerPage, sortField, sortOrder)
  };

  const handleCheck = async (categoryId) => {
    await setChecked((prev) => {
      const isChecked = checked.includes(categoryId);
      if (isChecked) {
        //Uncheck
        return checked.filter((item) => item !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });

  };

  const handleSort = (value) => {
    setSortField(value.split("|")[1]);
    setSortOrder(value.split("|")[0]);
    console.log(value);
  }

  const handleReset = (value) => {
    setSearchText('');
    setChecked([]);
  }

  const getPageAllCourses = (
    categoryIds,
    searchText,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) =>
    CourseServices.getPageAllCourses(
      categoryIds,
      searchText,
      pageNumber,
      pageSize,
      sortField,
      sortOrder
    ).then((response) => {
      setPageCourses(response.data.content);
      setTotalItems(response.data.totalElements);
    }).catch((error) => {
      console.log("loi lay ra course" + error);
    });;

  useEffect(() => {
      setCurrentPage(1);
      console.log("checked trong useEffect", checked, searchText, sortField, sortOrder);
      getPageAllCourses(checked, searchText, 0, sizePerPage, sortField, sortOrder)
  }, [checked, searchText, sortField, sortOrder]);



  return (
    <div className="container home-page">

      <NavBar mode={1}></NavBar>
      {/* ====================region filter==================== */}
      <div className="filter-container">
        <div className="filter-1">

          <select
            name="filter"
            id=""
            onChange={(e) => {
              setSelectIndex(false);
              handleSort(e.target.value);
            }}>
            {selectIndex ? <option selected value="desc|createdAt">Newest</option> : <option value="desc|createdAt">Newest</option>}
            <option value="asc|createdAt">Oldest</option>
            <option value="asc|courseName">A-Z Name</option>
            <option value="desc|courseName">Z-A Name</option>
          </select>

          <div className="search-border">

            <input
              type="text"
              placeholder="Search course here"
              name="search"
              value={searchText}
              onChange={handleInputChange}
              // onKeyPress={handleKeyPress}
            />
          </div>

          <div id="textBttn">
            <button onClick={handleReset}><img src={resetFilterImg}></img></button>
          </div>


        </div>
      </div>
      <main className="courses-list-main">
        <aside className="cate-filter">
          <div className="select-list">
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
          </div>
        </aside>
        {/* ====================end region filter==================== */}

        {/* ====================region List of Course==================== */}

        <section className="courses-section">
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

              </div>
            ))}
          </div>
          {/* ====================end region List of Course==================== */}

          {/* ====================region Pagination==================== */}
          <div className="Pagination-Container">
            <Paging {...{
              totalItems,
              sizePerPage,
              currentPage,
              handlePageChange,
              name: "courses"
            }} />
          </div>


        </section>
      </main>
      {/* ====================End region Pagination==================== */}
    </div>

  )
}

export default Homepage
