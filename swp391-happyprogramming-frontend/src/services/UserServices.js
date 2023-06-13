import axios from "axios";
import api from "./BaseAuthenticationService.js";
const USER_BASE_REST_API_URL = "http://localhost:1111/api/users/"

class UserServices {
  getMentorList() {
    console.log("http://localhost:1111/api/users/mentors");
    return api.get("/api/users/mentors");
  }
  createMentorAccount(user) {
    console.log("http://localhost:1111/api/users/mentor-account", user);
    return api.post("/api/users/mentor-account", user);
  }
  updateActiveStatusMentor(username, status) {
    console.log(
      `http://localhost:1111/api/users/mentors/status/${username}?status=${status}`
    );
    return api.put(`/api/users/mentors/status/${username}?status=${status}`);
  }
  getAlllMentors() {
    return axios.get(USER_BASE_REST_API_URL + "/mentors");
  }
  getLoginUsername() {
    try{
      return api.get("/api/users/login");

    }catch(e){
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      return null;
    }
  }

  //@maiphuonghoang
  getUserOfCourse(courseId, statusId) {
    console.log(`http://localhost:1111/api/courses/find-user/${courseId}?statusId=${statusId}`);
    return api.get(`/api/courses/find-user/${courseId}?statusId=${statusId}`);
  }
  getLoginUserDisplayname() {
    try{
      return api.get("api/users/displayname");

    }catch(e){
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
      return null;
    }
  }
}

export default new UserServices();
