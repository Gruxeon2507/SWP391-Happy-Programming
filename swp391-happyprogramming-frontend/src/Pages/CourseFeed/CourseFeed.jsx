import React, { useEffect, useState } from "react";
import CreateCourse from "../Course/CreateCourse";
import { useParams } from "react-router-dom";
import CreatePost from "../../Components/CreatePost/CreatePost";
import api from "../../services/BaseAuthenticationService";

function CourseFeed() {
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);

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
  return (
    <div>
      <CreatePost courseId={courseId} />
      <div>
        {posts.map((post) => (
          <div>
            <div>{post.postedAt}</div>
          <div
            key={post.id} // Adding a unique key to each rendered post
            dangerouslySetInnerHTML={{ __html: post.postContent }}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseFeed;
