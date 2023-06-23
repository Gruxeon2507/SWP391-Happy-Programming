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
  getCoursesOfMentor(){
    console.log(`http://localhost:1111/api/courses/by-mentor`);
    return api.get("/api/courses/by-mentor")
  }


  getPageAllCourses(categoryIds, searchText, pageNumber, pageSize, sortField, sortOrder){
    const formData = new FormData();
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("searchText", searchText)
    formData.append("categoryIds", categoryIds)
    formData.append("sortField", sortField)
    formData.append("sortOrder", sortOrder)
    console.log("dang goi api", searchText, categoryIds, sortField, sortOrder);
    console.log(`http://localhost:1111/api/courses/all?categoryIds=${categoryIds}&searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`, );
    return api.post("/api/courses/all", formData);
  }

}
export default new CourseServices();
