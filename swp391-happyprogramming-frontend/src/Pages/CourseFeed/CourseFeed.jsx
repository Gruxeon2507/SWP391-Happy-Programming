import React, { useEffect, useState } from "react";
import CreateCourse from "../Course/CreateCourse";
import { useParams } from "react-router-dom";
import CreatePost from "../../Components/CreatePost/CreatePost";
import PostServices from "../../services/PostServices";
import api from "../../services/BaseAuthenticationService";
import "./CourseFeed.css"
import NavBar from "../../Components/Navbar/NavBar";

function CourseFeed() {
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

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
  }, [courseId]);

  console.log(posts)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
            <div
              className="post-card-wrap"
              key={post.id}
            >
              <div>{post.postedAt}</div>
              <div
                dangerouslySetInnerHTML={{ __html: post.postContent }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`r-t-edit ${!isChecked ? "active" : ""}`}>
        <CreatePost courseId={courseId} />
      </div>
    </>
  );
}

export default CourseFeed;
