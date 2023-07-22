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
  getOnlyRoleMenteeList(searchText, pageNumber, pageSize, sortField, sortOrder){
    const formData = new FormData();
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("searchText", searchText)
    formData.append("sortField", sortField)
    formData.append("sortOrder", sortOrder)
    console.log("dang goi api", searchText, sortField, sortOrder , pageNumber);
    return api.post(USER_BASE_REST_API_URL + `only-role-mentee-users`, formData);
  }
  setUserActiveStatus(username, status){
    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("status", status);
    console.log(username + " status: " + status);
    console.log(`http://localhost:1111/api/courses/find-user/${username}/${status}`);
    return api.put("/api/users/status", formData);

  }
  countNumberUserByStatusInCourses(statusId){
    console.log(`http://localhost:1111/api/participates/count/user/${statusId}`);
    return api.get(`/api/participates/count/user/${statusId}`);
  }
}

export default new UserServices();
