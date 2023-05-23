import axios from "axios";
const PUBLIC_BASE_REST_API_URL = "http://localhost:1111/api/public";

class PublicService{
    getActiveMentors(){
        return axios.get(PUBLIC_BASE_REST_API_URL + "/active-mentors")
    }
}

export default new PublicService();