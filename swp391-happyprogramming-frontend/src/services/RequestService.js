import axios from "axios";
import api from "./BaseAuthenticationService.js";


class RequestService {


    getPendingUserOfCourse(courseId, pageNumber, pageSize, sortField, sortOrder ) {
        const formData = new FormData()
        formData.append("courseId", courseId);
        formData.append("pageNumber", pageNumber);
        formData.append("pageSize", pageSize);
        formData.append("sortField", sortField);
        formData.append("sortOrder", sortOrder);
        return api.post("/api/requests/pending", formData);
      }
    
    updateParticipadeInsertRequest(courseId, statusId, username){
      const formData = new FormData()
      formData.append("courseId", courseId);
      formData.append("statusId", statusId);
      formData.append("username", username);
      return api.post("/api/requests/status", formData);
    }

}
export default new RequestService();
