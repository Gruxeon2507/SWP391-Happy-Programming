import React, { useEffect, useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import CourseServices from "../../services/CourseServices";
import { Pagination } from "antd";
import { FormControl } from "react-bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
import "../Homepage/Homepage.css";

function Homepage() {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageCourses, setPageCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [condition, setCondition] = useState("");
  const [isActiveCateFilter, setActiveCateFilter] = useState(false);
  const [mentorOfCourses, setMentorOfCourses] = useState("");

  const sizePerPage = 7;

  const toggleActiveCateFilter = () => {
    setActiveCateFilter(!isActiveCateFilter);
  };

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
  const getPageCourses = async (pageNumber, pageSize, sortField, sortOrder) => {
    await CourseServices.getPageAllCourses(
      pageNumber,
      pageSize,
      sortField,
      sortOrder
    )
      .then((response) => {
        console.log(response);
        setPageCourses(response.data.content);
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.log("loi lay ra page Course");
      });
  };

  const getPageCoursesByCategories = (
    categoryIds,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) => {
    CourseServices.getPageCoursesByCategories(
      categoryIds,
      pageNumber,
      pageSize,
      sortField,
      sortOrder
    )
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
  const categoryIds = checked.join(",");

  const handlePageChange = (current) => {
    if (checked.length > 0) {
      setCurrentPage(current);
      console.log("current" + current);
      getPageCoursesByCategories(
        categoryIds,
        current - 1,
        sizePerPage,
        "createdAt",
        "desc"
      );
    } else {
      setCurrentPage(current);
      getPageCourses(current - 1, sizePerPage, "createdAt", "desc");
    }
  };

  useEffect(() => {
    getAllCategories();
    getPageCourses(0, sizePerPage, "createdAt", "desc");
    console.log("da chay filter");
    handleSearch();
  }, []);

  const handleSubmit = () => {
    console.log("check on submit:" + checked);
    setCurrentPage(1);
    console.log({ ids: checked });
    getPageCoursesByCategories(
      categoryIds,
      0,
      sizePerPage,
      "createdAt",
      "desc"
    );
  };
  const filterCourse = (
    searchText,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) =>
    CourseServices.filterCourse(
      searchText,
      pageNumber,
      pageSize,
      sortField,
      sortOrder
    ).then((response) => {
      setPageCourses(response.data.content);
      setTotalItems(response.data.totalElements);
    });
  const handleSearch = () => {
    console.log("da click search");
    console.log(condition);
    console.log(condition.length);
    if (condition.length > 0) {
      console.log("goi api");
      filterCourse(
        encodeURIComponent(condition).replace(/%20/g, "%20"),
        0,
        sizePerPage,
        "createdAt",
        "desc"
      );
    } else {
      getPageCourses(0, sizePerPage, "createdAt", "desc");
      // handleCheckFilter();
    }
  };
  const handleReset = () => {
    setCondition("");
    console.log("da click reset ");
    getPageCourses(0, sizePerPage, "createdAt", "desc");
  };
  const handleCheckFilter = (checkedFilter) => {
    console.log(checkedFilter);
    const sortField = checkedFilter.split("|")[1];
    const sortOrder = checkedFilter.split("|")[0];
    console.log("sortField = " + sortField);
    console.log("sortOrder = " + sortOrder);
    if (condition.length > 0) {
      filterCourse(
        encodeURIComponent(condition).replace(/%20/g, "%20"),
        0,
        sizePerPage,
        sortField,
        sortOrder
      );
    } else if (checked.length > 0) {
      getPageCoursesByCategories(
        categoryIds,
        0,
        sizePerPage,
        sortField,
        sortOrder
      );
    } else {
      getPageCourses(0, sizePerPage, sortField, sortOrder);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAllCategories(),
        getPageCourses(0, sizePerPage, "createdAt", "desc"),
      ]);
      console.log("da chay filter");
      handleSearch();
    };

    fetchData();
  }, []);

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

  // function Homepage() {
  //   const [categories, setCategories] = useState([]);
  //   const [checked, setChecked] = useState([]);
  //   const [pageCourses, setPageCourses] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [totalItems, setTotalItems] = useState(0);
  //   const [condition, setCondition] = useState("");
  //   const [filter, setFilter] = useState("all");
  //   const [isActiveCateFilter, setActiveCateFilter] = useState(false);
  //   const [mentorOfCourses, setMentorOfCourses] = useState("");

  //   const sizePerPage = 6;

  //   const toggleActiveCateFilter = () => {
  //     setActiveCateFilter(!isActiveCateFilter);
  //   };

  //   const handleCheck = (categoryId) => {
  //     setChecked((prev) => {
  //       const isChecked = checked.includes(categoryId);
  //       if (isChecked) {
  //         return checked.filter((item) => item !== categoryId);
  //       } else {
  //         return [...prev, categoryId];
  //       }
  //     });
  //   };

  //   const getAllCategories = async () => {
  //     try {
  //       const response = await CategoryServices.getAllCategories();
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const getPageCourses = async (pageNumber, pageSize, sortField, sortOrder) => {
  //     try {
  //       const response = await CourseServices.getPageAllCourses(
  //         pageNumber,
  //         pageSize,
  //         sortField,
  //         sortOrder
  //       );
  //       setPageCourses(response.data.content);
  //       setTotalItems(response.data.totalElements);
  //     } catch (error) {
  //       console.log("Error retrieving page courses:", error);
  //     }
  //   };

  //   const getPageCoursesByCategories = async (
  //     categoryIds,
  //     pageNumber,
  //     pageSize,
  //     sortField,
  //     sortOrder
  //   ) => {
  //     try {
  //       const response = await CourseServices.getPageCoursesByCategories(
  //         categoryIds,
  //         pageNumber,
  //         pageSize,
  //         sortField,
  //         sortOrder
  //       );
  //       setPageCourses(response.data.content);
  //       setTotalItems(response.data.totalElements);
  //     } catch (error) {
  //       console.log("Error retrieving page courses by categories:", error);
  //     }
  //   };

  //   const handlePageChange = (current) => {
  //     setCurrentPage(current);
  //     if (checked.length > 0) {
  //       getPageCoursesByCategories(
  //         checked.join(","),
  //         current - 1,
  //         sizePerPage,
  //         "createdAt",
  //         "desc"
  //       );
  //     } else {
  //       getPageCourses(current - 1, sizePerPage, "createdAt", "desc");
  //     }
  //   };

  //   const handleSubmit = () => {
  //     setCurrentPage(1);
  //     const categoryIds = checked.join(",");
  //     getPageCoursesByCategories(
  //       categoryIds,
  //       0,
  //       sizePerPage,
  //       "createdAt",
  //       "desc"
  //     );
  //   };

  //   const filterCourse = async (
  //     searchText,
  //     pageNumber,
  //     pageSize,
  //     sortField,
  //     sortOrder
  //   ) => {
  //     try {
  //       const response = await CourseServices.filterCourse(
  //         searchText,
  //         pageNumber,
  //         pageSize,
  //         sortField,
  //         sortOrder
  //       );
  //       setPageCourses(response.data.content);
  //       setTotalItems(response.data.totalElements);
  //     } catch (error) {
  //       console.log("Error filtering courses:", error);
  //     }
  //   };

  //   const handleSearch = () => {
  //     if (condition.length > 0) {
  //       filterCourse(
  //         encodeURIComponent(condition).replace(/%20/g, "%20"),
  //         0,
  //         sizePerPage,
  //         "createdAt",
  //         "desc"
  //       );
  //     } else {
  //       getPageCourses(0, sizePerPage, "createdAt", "desc");
  //     }
  //   };

  //   const handleReset = () => {
  //     setCondition("");
  //     getPageCourses(0, sizePerPage, "createdAt", "desc");
  //   };

  //   const handleCheckFilter = (checkedFilter) => {
  //     console.log(checkedFilter);
  //     const sortField = checkedFilter.split("|")[1];
  //     const sortOrder = checkedFilter.split("|")[0];
  //     console.log("sortField = " + sortField);
  //     console.log("sortOrder = " + sortOrder);
  //     if (condition.length > 0) {
  //       filterCourse(
  //         encodeURIComponent(condition).replace(/%20/g, "%20"),
  //         0,
  //         sizePerPage,
  //         sortField,
  //         sortOrder
  //       );
  //     } else if (checked.length > 0) {
  //       getPageCoursesByCategories(
  //         categoryIds,
  //         0,
  //         sizePerPage,
  //         sortField,
  //         sortOrder
  //       );
  //     } else {
  //       getPageCourses(0, sizePerPage, sortField, sortOrder);
  //     }
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await Promise.all([
  //         getAllCategories(),
  //         getPageCourses(0, sizePerPage, "createdAt", "desc"),
  //       ]);
  //       console.log("da chay filter");
  //       handleSearch();
  //     };

  //     fetchData();
  //   }, []);

  //   const getMentorOfCourses = async (courseId) => {
  //     await CourseServices.getMentorOfCourse(courseId).then((response) => {
  //       setMentorOfCourses((prevUserOfCourses) => ({
  //         ...prevUserOfCourses,
  //         [courseId]: response.data.displayName,
  //       }));
  //     });
  //   };

  //   useEffect(() => {
  //     pageCourses.forEach((course) => {
  //       getMentorOfCourses(course.courseId);
  //     });
  //   }, [pageCourses]);

  return (
    <div className="container home-page">
      <NavBar mode={1}></NavBar>

      {/* ====================region filter==================== */}
      <div className="filter-container">
        <div className="filter-1">
          <div className="cate-filter-head">
            <button onClick={toggleActiveCateFilter}>
              <ion-icon name="filter-circle-outline"></ion-icon>
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
          <button onClick={handleSearch}>
            <ion-icon name="search-circle-outline"></ion-icon>
          </button>
          <div className="textBttn">
            <button onClick={handleReset}>Reset</button>
          </div>
          <select
            name="filter"
            id=""
            onChange={(e) => {
              handleCheckFilter(e.target.value);
            }}
          >
            <option disabled>-------- Filter --------</option>
            <option value="asc|courseName">A-Z Name</option>
            <option value="desc|courseName">Z-A Name</option>
            <option value="asc|createdAt">Newest</option>
            <option value="desc|createdAt">Oldest</option>
          </select>
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
            <button onClick={handleSubmit}>Find</button>
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
            <span>{course.createdAt}</span>
            <span>Mentor: {mentorOfCourses[course.courseId]}</span>
            <span>View details</span>
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
