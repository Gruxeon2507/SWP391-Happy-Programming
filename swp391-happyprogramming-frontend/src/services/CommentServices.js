import api from "./BaseAuthenticationService";

class CommentServices {
  getCommentsByPost(postId) {}

  addComment(comment, parentId) {
    console.log("add comment at services called");
    console.log("comment: " + JSON.stringify(comment));
    if (parentId) {
      // add reply
      console.log(`/api/comments/add/reply/${parentId}`);
      return api.post(`/api/comments/add/reply/${parentId}`, comment);
    } else {
      // add top level comment
      console.log(`api/comments/add/top`);
      console.log(JSON.stringify(comment));
      return api.post("/api/comments/add/top", comment);
    }
  }

  getTopLevelCommentsByPost(postId) {
    console.log("get top level comments at services called");
    return api.get(`/api/comments/view/top/${postId}`);
  }

  updateComment(content, commentId) {
    const comment = {
      commentContent: content,
      commentId: commentId,
    };
    api.post(`/api/comments/edit/${commentId}`, comment);
  }

  deleteComment(commentId) {
    api.delete(`/api/comments/delete/${commentId}`);
  }
}

export default new CommentServices();
