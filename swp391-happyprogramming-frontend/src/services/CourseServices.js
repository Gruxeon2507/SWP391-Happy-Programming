import axios from "axios";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/auth/courses";

class CourseServices {
  getAllCourses() {
    return axios.get(COURSE_BASE_REST_API_URL);
  }
  //@maiphuonghoang
  getPageAllCourses(pageNumber, pageSize, sortField, sortOrder) {
    console.log(
      `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
  }
  //@maiphuonghoang
  getPageCoursesByCategories(
    categoryIds,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) {
    console.log(
      `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
  }
  //@maiphuonghoang
  filterCourse(searchText, pageNumber, pageSize, sortField, sortOrder) {
    console.log(
      `${COURSE_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
  }
  //@maiphuonghoang
  getCourseByUsernameAndStatusId(username, statusId) {
    console.log(`${COURSE_BASE_REST_API_URL}/${username}?statusId=${statusId}`);
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/${username}?statusId=${statusId}`
    );
  }

  getMentorOfCourse(courseId) {
    console.log(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
  }

  // @anthach
  getCourseById(courseId) {
    // console.log(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
  }
}
export default new CourseServices();
