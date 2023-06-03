import axios from "axios";
import api from "./BaseAuthenticationService";
const PARTICIPATE_BASE_REST_API_URL = "http://localhost:1111/api/participates";

class ParticipateServices {
  saveParticipate(username, courseId, participateRoleId, statusId) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("courseId", courseId);
    formData.append("participateRoleId", participateRoleId);
    formData.append("statusId", statusId);
    api.post("/api/participates/save", formData);
  }

  getParticipateByUser(courseId) {
    return api.get(PARTICIPATE_BASE_REST_API_URL + "/by-user/" + courseId);
  }
}

export default new ParticipateServices();
