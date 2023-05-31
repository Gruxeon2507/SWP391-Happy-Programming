import axios from "axios";
const PUBLIC_BASE_REST_API_URL = "http://localhost:1111/api/public";

class PublicService {
  //hoenntk
  getActiveMentors() {
    return axios.get(PUBLIC_BASE_REST_API_URL + "/active-mentors");
  }

  //hoenntk
  getCourseByCourseId(courseId) {
    return axios.get(PUBLIC_BASE_REST_API_URL + "/courses/view/" + courseId);
  }

  getMentorByCourseId(courseId) {
    return axios.get(
      PUBLIC_BASE_REST_API_URL + "/mentor/by-course/" + courseId
    );
  }

  getAvgRatingByMentor(username) {
    return axios.get(PUBLIC_BASE_REST_API_URL + "/mentor/rating/" + username);
  }
}

export default new PublicService();
