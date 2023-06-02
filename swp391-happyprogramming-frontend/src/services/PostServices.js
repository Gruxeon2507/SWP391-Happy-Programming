import axios from "axios";
import api from "./BaseAuthenticationService";

class PostServices{
    createNewPost(postContent,courseId){
        api.post("/api/posts/create/"+courseId,{postContent});
    }
    getCoursePost(courseId){
        api.get("api/courses/posts/3");
    }
}
export default new PostServices();  