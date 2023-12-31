import axios from "axios";
import api from "./BaseAuthenticationService.js";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/courses";

class CourseServices {
  getAllCourses() {
    return axios.get(COURSE_BASE_REST_API_URL);
  }
  // @HuyenNTK
  createCourse(course) {
    return api.post("api/courses/create", course);
  }

  //@maiphuonghoang
  getCourseByUsernameAndStatusId(statusId) {
    // console.log(`http://localhost:1111/api/courses/by-user?statusId=${statusId}`);
    return api.get(`/api/courses/by-user?statusId=${statusId}`);
  }
  //@maiphuonghoang
  getMentorsOfCourse(courseId) {
    // console.log(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/find-mentor/${courseId}`);
  }

  // @anthach
  getCourseById(courseId) {
    // console.log(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
    return axios.get(`${COURSE_BASE_REST_API_URL}/courseDetails/${courseId}`);
  }

  //@maiphuonghoang
  getCoursesOfMentor() {
    // console.log(`http://localhost:1111/api/courses/by-mentor`);
    return api.get("/api/courses/by-mentor");
  }

  getCoursesByName(courseName) {
    // console.log(`http://localhost:1111/api/courses/find/by-name/${courseName}`);
    return api.get(`/api/courses/find/by-name/${courseName}`);
  }

  getPageAllCourses(
    categoryIds,
    searchText,
    pageNumber,
    pageSize,
    sortField,
    sortOrder
  ) {
    const formData = new FormData();
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("searchText", searchText);
    formData.append("categoryIds", categoryIds);
    formData.append("sortField", sortField);
    formData.append("sortOrder", sortOrder);
    // console.log("dang goi api", searchText, categoryIds, sortField, sortOrder);
    // console.log(`http://localhost:1111/api/courses/all?categoryIds=${categoryIds}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`, );
    return api.post("/api/courses/all", formData);
  }

  getMentorToJoin(courseId){
    return api.get("/api/courses/possible/" + courseId);
  }

  updateCourse(courseId, course) {
    console.log("services updatecourse...");
    console.log("COURSE: ", course);
    api.post("api/courses/update/" + courseId, course);
    console.log("services done...");
  }
}
export default new CourseServices();
