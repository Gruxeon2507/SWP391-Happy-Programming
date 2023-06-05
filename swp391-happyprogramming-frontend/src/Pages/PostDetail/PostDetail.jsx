import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";
import CreatePost from "../../Components/CreatePost/CreatePost";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    PostServices.getPostById(postId)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.log("error fetching post " + error);
      });
  }, []);

  return (
    <>
      {/* <div>
        <input
          type="checkbox"
          style={{ width: "2rem", height: "2rem", position: "fixed" }}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div> */}
      <div className="post-card-wrap" key={post.postId}>
        <div>{post.postedAt}</div>
        <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
      </div>
      {/* <div className={`r-t-edit ${!isChecked ? "active" : ""}`}>
        <CreatePost postId={postId} />
      </div> */}
      <div id={"comment-section"}>this is where the comments go.</div>
    </>
  );
}

export default PostDetail;
