import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostServices from "../../services/PostServices";

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

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
      <div className="post-card-wrap" key={post.postId}>
        <div>{post.postedAt}</div>
        <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
      </div>
      <div id={"comment-section"}>this is where the comments go.</div>
    </>
  );
}

export default PostDetail;
