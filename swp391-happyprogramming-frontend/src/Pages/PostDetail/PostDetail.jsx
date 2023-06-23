import React, { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import CreatePost from "../../Components/CreatePost/CreatePost";
import Comment from "../../Components/Comment/Comment";
import CommentServices from "../../services/CommentServices";
import UserServices from "../../services/UserServices";
import "./PostDetail.css"
import NavBar from "../../Components/Navbar/NavBar";

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

  useEffect(() => { }, []);


  return (
    <>
    
    <section>REPORT SECTION</section>
      <NavBar mode={1} />
      <main className="comment-main">
        <div className="post-card-wrap" key={post.postId}>
          <div>{post.postedAt}</div>
          <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
        </div>

        <hr></hr>
        <div id={"comment-section"} >

          <div className="cmt-input">
            <img
              src={`http://localhost:1111/api/users/avatar/${loginUsername}`}
              alt="avatar"
            ></img>
            <div className="cmt-input-text">
              <input
                type="text"
                value={input}
                placeholder="Write a comment..."
                onChange={(e) => setInput(e.target.value)}
              />
              <ion-icon onClick={addComment} name="send"></ion-icon>

              {/* <img
                src={sentIcon}
                alt="sent"
              ></img> */}
              {/* <div style={{ backgroundColor: "red" }}>{input}</div> */}
              {/* <button id="comment-Bttn" onClick={addComment}>Comment</button> */}
            </div>
          </div>
          <div className="cmt-list">
            {comments.length > 0 ? <>
              {comments.map((comment) => (
                <div className="cmt-card">
                  <Comment
                    comment={comment}
                    key={comment.commentId}
                    layer={1}
                  ></Comment>
                </div>
              ))}
            </> : <><h2 style={{ textAlign: "center" }}>Be the first one to comment</h2></>}

          </div>
        </div>
      </main>
    </>
  );
}


export default PostDetail;
