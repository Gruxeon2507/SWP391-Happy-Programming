import axios from "axios";
import api from "./BaseAuthenticationService.js";

class UserServices {
  getMentorList() {
    console.log("http://localhost:1111/api/auth/users/mentors");
    return api.get("/api/auth/users/mentors");
  }
  createMentorAccount(user) {
    console.log("http://localhost:1111/api/auth/users/mentor-account", user);
    return api.post("/api/auth/users/mentor-account", user)
  }
}

export default new UserServices();