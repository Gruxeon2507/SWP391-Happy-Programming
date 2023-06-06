import axios from "axios";
import api from "./BaseAuthenticationService.js";


class RequestService {

    getPendingUserOfCourse(courseId){
        console.log(`http://localhost:1111/api/requests/pending/${courseId}`);
        return api.get(`/api/requests/pending/${courseId}`)
    }


}
export default new RequestService();
