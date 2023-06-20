import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Comment from "../../Components/Comment/Comment";
import CommentServices from "../../services/CommentServices";
import UserServices from "../../services/UserServices";

function PostDetail() {
  const { postId } = useParams("postId");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    UserServices.getLoginUsername()
      .then((res) => setLoginUsername(res.data))
      .catch((error) => {
        console.log("ERROR GET LOGIN USERNAME" + error);
      });
  }, []);

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

  const addComment = async () => {
    if (input.trim().length != 0) {
      // console.log("add comment ...");
      const comment = {
        commentContent: input,
        user: {
          username: loginUsername,
        },
        post: {
          postId: postId,
        },
        replies: [],
      };
      CommentServices.addComment(comment).then((res) => {
        if (res && res.data) {
          // console.log("DAY LA COMMENT MOI: ", res.data);
          setComments((prev) => [res.data, ...prev]);
        }
      });
    }
    setInput("");
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
          value={input}
          placeholder="type..."
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
        />
        <div>{input}</div>
        <button onClick={() => addComment()}>Comment</button>
        {comments.map((comment) => (
          <>
            <Comment
              comment={comment}
              key={comment.commentId}
              layer={1}
            ></Comment>
          </>
        ))}
      </div>
    </>
  );
}

export default PostDetail;
