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
  getMentorOfCourse(courseId) {
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

  getPageMyCourses(pageNumber, pageSize, searchText, checked){
    var participateRoles = [];
    var statusIds = [];
    if (checked.length > 0) {
      checked.forEach((item) => {
            if (item === 'teaching') {
              participateRoles = [...participateRoles, 2];
              statusIds = [...statusIds, 1];
            }
            else if (item === 'access') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, 1];
            } else if (item === 'pending') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, 0];
            }
            else if (item === 'reject') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, -1];
            }
          })
        }
    const formData = new FormData();
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("searchText", searchText)
    formData.append("participateRoles", participateRoles)
    formData.append("statusIds", statusIds)
    console.log("dang goi api", participateRoles, statusIds);
    return api.post("/api/courses/allmy", formData);
  }

}
export default new CourseServices();
