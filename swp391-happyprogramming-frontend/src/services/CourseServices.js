import axios from "axios";
import api from "./BaseAuthenticationService.js";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/courses";

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
  // @HuyenNTK
  createCourse(course) {
    return api.post("api/courses/create", course);
  }

  //@maiphuonghoang
  getCourseByUsernameAndStatusId(statusId) {
    console.log(`http://localhost:1111/api/courses/by-user?statusId=${statusId}`);
    return api.get(`/api/courses/by-user?statusId=${statusId}`);
  }
  //@maiphuonghoang
  getMentorsOfCourse(courseId) {
    console.log(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
  }

  // @anthach
  getCourseById(courseId) {
    // console.log(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
  }

  //@maiphuonghoang
  getSearchCheckAndFilterCourses(categoryIds, searchText, pageNumber, pageSize, sortField, sortOrder) {
    console.log(
      `${COURSE_BASE_REST_API_URL}/search-and-categories-filter?categoryIds=${categoryIds}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    return axios.get(
      `${COURSE_BASE_REST_API_URL}/search-and-categories-filter?categoryIds=${categoryIds}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
  }

  //@maiphuonghoang
  getCoursesOfMentor(){
    console.log(`http://localhost:1111/api/courses/by-mentor`);
    return api.get("/api/courses/by-mentor")
  }
  
  getCoursesByName(courseName){
    console.log(`http://localhost:1111/api/courses/find/by-name/${courseName}`);
    return api.get(`/api/courses/find/by-name/${courseName}`);
  }

}
export default new CourseServices();
