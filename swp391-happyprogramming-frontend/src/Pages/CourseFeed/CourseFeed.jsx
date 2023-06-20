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
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [postId, setPostId] = useState();
  const [activeMenus, setActiveMenus] = useState({});

  const toggleEditMenu = (postId) => {
    setActiveMenus((prevActiveMenus) => ({
      ...prevActiveMenus,
      [postId]: !prevActiveMenus[postId],
    }));
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
    setIsEditorActive(!isEditorActive);
  };

  const openEditor = () => {
    setIsEditorActive(!isEditorActive);
  };

  const deletePost = (postId) => {
    const ok = confirm("Yah sure bro?");
    if (ok) {
      PostServices.deletePost(postId);
      fetchData();
    }
  };

  const handleRemoveActive = () => {
    setIsEditorActive(false);
  };

  return (
    <>
      <NavBar mode={1}></NavBar>
      <main className="cf-content">
        <section className="course-bg-inf">
          Thong tin co ban cua course o day <br />
          total mentee
          <br />
          thong tin .... <br />
          thong tin .... <br />
          thong tin .... <br />
        </section>
        <div className="main-posts-cc">
          <section className="posts-section">
            {posts.map((post) => (
              <div className="post-card-wrap" key={post.postId}>
                <div className="pcw-edit-opt">
                  <div className="pcw-edit-opt-btn">
                    <ion-icon
                      onClick={() => toggleEditMenu(post.postId)}
                      name="ellipsis-vertical-outline"
                    ></ion-icon>
                  </div>
                  <nav
                    className={`pcw-edit-opt-list ${activeMenus[post.postId] ? "active" : ""
                      }`}
                  >
                    <ul>
                      <li>only right mentor can see</li>
                      <li
                        onClick={() => {
                          setIsEditorActive(true);
                          setPostId(post.postId);
                          toggleEditMenu(post.postId);
                        }}
                      >
                        Edit
                      </li>
                      <li onClick={() => deletePost(post.postId)}>Delete</li>
                    </ul>
                  </nav>
                </div>
                <div>{post.postedAt}</div>
                <div
                  className="pcw-content"
                  dangerouslySetInnerHTML={{ __html: post.postContent }}
                  onClick={() => {
                    window.location.href = "../../../post/view/" + post.postId;
                  }}
                />
              </div>
            ))}
          </section>
          <aside className="aside-control-nav">
            <div className="sidebar-cf">
              1 vai thong in ve course/post o day
              <br></br>
              <br></br>
              chi mentor moi thay cai nut nay
              <br></br>
              <br></br>
              <div>
                <button onClick={openEditor}>
                  <ion-icon name="add-circle-outline"></ion-icon> New
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <div className={`r-t-edit ${isEditorActive ? "active" : ""}`}>
        <ion-icon
          name="close-outline"
          onClick={() => setIsEditorActive(false)}
        ></ion-icon>
        <CreatePost
          courseId={courseId}
          postId={postId}
          onRemoveActive={handleRemoveActive}
        />
      </div>
      {/* <CreatePost
        courseId={courseId}
        postId={postId}
        onRemoveActive={handleRemoveActive}
      /> */}
    </>
  );
}

export default CourseFeed;
