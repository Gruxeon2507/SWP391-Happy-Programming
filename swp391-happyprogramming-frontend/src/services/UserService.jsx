import axios from "axios";
const USER_BASE_REST_API_URL = "http://localhost:1111/api/auth/users";

class UserService{
    getAlllMentors(){
        return axios.get(USER_BASE_REST_API_URL + "/mentors")
    }
}

export default new UserService();
