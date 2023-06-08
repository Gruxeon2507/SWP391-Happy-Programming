import React, { useEffect, useState } from "react";
import CreateCourse from "../Course/CreateCourse";
import { useParams } from "react-router-dom";
import CreatePost from "../../Components/CreatePost/CreatePost";
import api from "../../services/BaseAuthenticationService";
import "./CourseFeed.css";
import NavBar from "../../Components/Navbar/NavBar";
import PostServices from "../../services/PostServices";

function CourseFeed() {
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [postId, setPostId] = useState();

  const clickEdit = (postId) => {
    setPostId(postId);
    console.log("POST ID1: " + postId);
    setIsChecked(!isChecked);
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`api/courses/posts/${courseId}`);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courseId, posts]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const deletePost = (postId) => {
    const ok = confirm("Yah sure bro?");
    if (ok) {
      PostServices.deletePost(postId);
    }
  };

  return (
    <>
      <NavBar mode={1}></NavBar>
      <div>
        <input
          type="checkbox"
          style={{ width: "2rem", height: "2rem", position: "fixed" }}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="cf-content">
        <div>
          {posts.map((post) => (
            <div className="post-card-wrap" key={post.postId}>
              <div>{post.postedAt}</div>
              <div dangerouslySetInnerHTML={{ __html: post.postContent }} />
              <button
                style={{ margin: "20px 0", padding: 0 }}
                onClick={() => deletePost(post.postId)}
              >
                Delete
              </button>
              <button
                style={{ margin: "20px 0", padding: 0 }}
                onClick={() => {
                  window.location.href = "../../../post/view/" + post.postId;
                }}
              >
                View
              </button>
              <button
                style={{ margin: "20px 0", padding: 0 }}
                onClick={() => {
                  setPostId(post.postId);
                  // console.log("POST ID1: " + postId);
                }}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={`r-t-edit ${!isChecked ? "active" : ""}`}>
        <CreatePost courseId={courseId} postId={postId} />
      </div>
    </>
  );
}

export default CourseFeed;