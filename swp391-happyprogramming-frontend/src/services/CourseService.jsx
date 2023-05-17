import axios from "axios";

const COURSE_BASE_REST_API_URL = "http://localhost:1111/api/auth/courses";

class CourseService{
    getAllCourses(){
        return axios.get(COURSE_BASE_REST_API_URL);
    }
}
export default new CourseService();