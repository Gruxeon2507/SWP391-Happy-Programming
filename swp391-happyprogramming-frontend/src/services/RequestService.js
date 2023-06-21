import axios from "axios";
import api from "./BaseAuthenticationService.js";

class RequestService {
  //phuong 
  getPendingUserOfCourse(courseId, pageNumber, pageSize, sortField, sortOrder) {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("pageNumber", pageNumber);
    formData.append("pageSize", pageSize);
    formData.append("sortField", sortField);
    formData.append("sortOrder", sortOrder);
    return api.post("/api/requests/pending", formData);
  }

  //phuong 
  updateParticipadeInsertRequest(courseId, statusId, usernames) {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("statusId", statusId);
    formData.append("usernames", usernames);
    return api.post("/api/requests/status", formData);
  }

  //phuong 
  getAccessRejectRequestOfCourse(courseId) {
    return api.get(`/api/requests/access-reject/${courseId}`);
  }

  deleteParticipateDeleteRequest(courseId) {
    api.delete(`/api/requests/delete/${courseId}`);
  }

  insertIntoRequest(courseId, statusId) {
    console.log("INSERT INTO REQUEST APPI CALLING...");
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("statusId", statusId);
    api.post(`/api/requests/insert`, formData);
  }

  //phuong 
  insertParticipadeInsertRequest(courseId) {
    console.log(`/api/requests/send?courseId=${courseId}`);
    return api.post(`/api/requests/send?courseId=${courseId}`);
  }
}
export default new RequestService();
