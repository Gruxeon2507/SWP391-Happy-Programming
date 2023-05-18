import axios from "axios";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/auth/courses";

class CourseServices{
    getAllCourses(){
        return axios.get(COURSE_BASE_REST_API_URL);
    }
    getPageAllCourses(pageNumber, pageSize, sortField, sortOrder) {
        console.log(
          `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        return axios.get(
          `${COURSE_BASE_REST_API_URL}/page?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
      }
    getPageCoursesByCategories(categoryIds, pageNumber, pageSize, sortField, sortOrder) {
        console.log(
          `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
        return axios.get(
          `${COURSE_BASE_REST_API_URL}/by-categories/${categoryIds}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
        );
      }
}
export default new CourseServices();