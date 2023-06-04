import axios from "axios";
import api from "./BaseAuthenticationService";

class PostServices {
  createNewPost(postContent, courseId) {
    api.post("/api/posts/create/" + courseId, { postContent });
  }
  getCoursePost(courseId) {
    api.get("api/courses/posts/3");
  }

  deletePost(postId) {
    api.delete("api/posts/delete/" + postId);
  }

  getPostById(postId) {
    return api.get("/api/posts/view/" + postId);
  }
}
export default new PostServices();
