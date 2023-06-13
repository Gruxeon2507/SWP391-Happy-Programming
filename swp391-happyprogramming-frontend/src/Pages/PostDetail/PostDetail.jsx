import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Comment from "../../Components/Comment/Comment";
import CommentServices from "../../services/CommentServices";

function PostDetail() {
  const { postId } = useParams("postId");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    PostServices.getPostById(postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.log("error fetching post " + error);
      });
  }, []);

  useEffect(() => {
    CommentServices.getTopLevelCommentsByPost(postId)
      .then((res) => setComments(res.data))
      .catch((error) => {
        console.log("error fetching comments by postId: " + error);
      });
  }, []);

  const addComment = () => {
    console.log("add comment ...");
    const comment = {
      commentContent: input,
      post: {
        postId: postId,
      },
    };
    CommentServices.addComment(comment)
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setInput("");
      })
      .catch((error) => {
        console.log("error adding comment " + error);
      });
    // setComments((prev) => [...prev, comment]);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="post-card-wrap" key={post.postId}>
        <div>{post.postedAt}</div>
        <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
      </div>

      <hr></hr>
      <div id={"comment-section"} style={{ paddingLeft: "50px" }}>
        <input
          type="text"
          style={{ width: "25vw" }}
          // autoFocus
          value={input}
          placeholder="type..."
          onChange={(e) => setInput(e.target.value)}
        />
        <div>{input}</div>
        <button onClick={addComment}>Comment</button>
        {comments.map((comment) => (
          <>
            <Comment comment={comment} key={comment.commentId}></Comment>
          </>
        ))}
      </div>
    </>
  );
}

export default PostDetail;
