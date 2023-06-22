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

  getPageMyCourses(pageNumber, pageSize, searchText, checked){
    var participateRoles = [];
    var statusIds = [];
    if (checked.length > 0) {
      checked.forEach((item) => {
            if (item === 'teaching') {
              participateRoles = [...participateRoles, 2];
              statusIds = [...statusIds, 1];
            }
            else if (item === 'access') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, 1];
            } else if (item === 'pending') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, 0];
            }
            else if (item === 'reject') {
              participateRoles = [...participateRoles, 3];
              statusIds = [...statusIds, -1];
            }
          })
        }
    const formData = new FormData();
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("searchText", searchText)
    formData.append("participateRoles", participateRoles)
    formData.append("statusIds", statusIds)
    console.log("dang goi api", participateRoles, statusIds);
    return api.post("/api/participates/allmy", formData);
  }
}

export default new ParticipateServices();
