import axios from "axios";
import api from "./BaseAuthenticationService.js";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/courses";

class CourseServices{
    getAllCourses(){
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
    getPageCoursesByCategories(categoryIds, pageNumber, pageSize, sortField, sortOrder) {
        console.log(
          `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        return axios.get(
          `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
      }
    //@maiphuonghoang
    filterCourse(searchText, pageNumber, pageSize, sortField, sortOrder ){
        console.log(`${COURSE_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`);
        return axios.get(`${COURSE_BASE_REST_API_URL}/search/${searchText}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`);
    }
    //@maiphuonghoang
    getCourseByUsernameAndStatusId( statusId){
      console.log(`http://localhost:1111/api/courses/by-user?statusId=${statusId}`);
      return api.get(`/api/courses/by-user?statusId=${statusId}`);
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
  createCourse(course) {
    return api.post("api/courses/create", course);
  }

}
export default new CourseServices();
