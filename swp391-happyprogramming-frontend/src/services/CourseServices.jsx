import axios from "axios";
import api from "./BaseAuthenticationService";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/";

class CourseServices {
  getAllCourses() {
    return axios.get(COURSE_BASE_REST_API_URL+"/public/courses");
  }
  getPageAllCourses(pageNumber, pageSize, sortField, sortOrder) {
    console.log(
      `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
  }
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

  createCourse(course) {
    return api.post("api/courses/create", course);
  }
}
export default new CourseServices();
export {COURSE_BASE_REST_API_URL};
