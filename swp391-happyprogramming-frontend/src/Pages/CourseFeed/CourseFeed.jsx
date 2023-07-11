import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateCourse from "../Course/CreateCourse";
import { useParams } from "react-router-dom";
import CreatePost from "../../Components/CreatePost/CreatePost";
import api from "../../services/BaseAuthenticationService";
import "./CourseFeed.css";
import NavBar from "../../Components/Navbar/NavBar";
import PostServices from "../../services/PostServices";
import CourseServices from "../../services/CourseServices";
import axios from "axios";
import UserServices from "../../services/UserServices";
import PublicService from "../../services/PublicService";


function CourseFeed(props) {
  const toggleRef = useRef(null);
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [postId, setPostId] = useState();
  const [courseName, setCourseName] = useState();
  const [activeMenus, setActiveMenus] = useState({});
  const [mentors, setMentors] = useState([]);
  const [course, setCourse] = useState({});
  const [uln, setUln] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let handler = (e) => {
      try {
        if (!toggleRef.current.contains(e.target)) {
          setActiveMenus((prevActiveMenus) => {

            const updatedActiveMenus = {};
            for (const postId in prevActiveMenus) {
              updatedActiveMenus[postId] = false;
            }
            return updatedActiveMenus;
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });


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

      const mentors = await api.get(`http://localhost:1111/api/courses/find-mentor/${courseId}`)
      setMentors(mentors.data);

      const cc = await api.get(`http://localhost:1111/api/courses/courseDetails/${courseId}`)
      setCourseName(cc.data);

      const ulname = await api.get("/api/users/login")
      setUln(ulname.data);


      await PublicService.getCourseByCourseId(courseId)
        .then((res) => {
          console.log("res.data");
          console.log(res.data);
          setCourse(res.data);
        })
        .catch((error) => {
          console.log("error fetching course" + error);
        });

    } catch (error) {
      console.error(error);
    }
  };
  console.log("posts")
  console.log(posts)


  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = () => {
    setIsEditorActive(!isEditorActive);
  };

  const openEditor = () => {
    setIsEditorActive(!isEditorActive);
  };

  const deletePost = (postId) => {
    const ok = confirm("Do you sure to continue?");
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
          <h1>{course.courseName}</h1>
        </section>
        <div className="main-posts-cc">
          <section className="posts-section">
            {posts.map((post) => (
              <div className="post-card-wrap" key={post.postId}>

                {(mentors.some(mentor => mentor.username === uln)) ? <>

                  <div className="pcw-edit-opt" ref={toggleRef}>
                    <div className="pcw-edit-opt-btn">
                      <ion-icon
                        onClick={() => toggleEditMenu(post.postId)}
                        name="ellipsis-vertical-outline"
                      ></ion-icon>
                    </div>
                    <nav
                      className={`pcw-edit-opt-list ${activeMenus[post.postId] ? "active" : ""
                        }`}
                      ref={toggleRef}
                    >
                      <ul>
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
                </> : <></>}
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
              {window.localStorage.getItem("role") == "mentor" ? <>
                <div className="mentor-bttn">
                  <button onClick={openEditor}>
                    <ion-icon name="add-circle-outline"></ion-icon> New
                  </button>
                  <button style={{ margin: "auto auto 0px auto" }} onClick={() => navigate("/request/manage")}>To course manage</button>
                </div>
              </> : <><div className="side-mentor-list">
                {mentors.map((mentor) => (
                  <div className="side-mentor-card" onClick={() => navigate(`/profile/${mentor.username}`)} key={mentor.username}>
                    <div className="avatar">
                      <img src={"http://localhost:1111/api/users/avatar/" + mentor.username} alt="avatar"></img>
                    </div>
                    <span>{mentor.displayName}</span>
                  </div>

                ))}
              </div>
              </>}




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
