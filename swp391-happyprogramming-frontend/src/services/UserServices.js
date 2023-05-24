import api from "./BaseAuthenticationService.js";

class UserServices {
  getMentorList() {
    console.log("http://localhost:1111/api/users/mentors");
    return api.get("/api/users/mentors");
  }
  createMentorAccount(user) {
    console.log("http://localhost:1111/api/users/mentor-account", user);
    return api.post("/api/users/mentor-account", user)
  }
  updateActiveStatusMentor(username, status){
    console.log(`http://localhost:1111/api/users/mentors/status/${username}?status=${status}`);
    return api.put(`/api/users/mentors/status/${username}?status=${status}`)
  }
}

export default new UserServices();