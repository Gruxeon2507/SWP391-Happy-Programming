import api from "./BaseAuthenticationService";

class UserServices{
    getLoginUsername(){
        return api.get("/api/auth/users/login");
    }
}
export default new UserServices();