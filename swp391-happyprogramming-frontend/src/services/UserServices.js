import axios from "axios";
import api from "./BaseAuthenticationService.js";

class UserServices {
  getMentorList() {
    console.log("http://localhost:1111/api/auth/users/mentors");
    return api.get("/api/auth/users/mentors");
  }
}

export default new UserServices();