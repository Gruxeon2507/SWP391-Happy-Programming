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


function CourseMember(props) {
    const toggleRef = useRef(null);
    const { courseId } = useParams();
    // const [posts, setPosts] = useState([]);
    // const [isEditorActive, setIsEditorActive] = useState(false);
    // const [postId, setPostId] = useState();
    // const [courseName, setCourseName] = useState();
    // const [activeMenus, setActiveMenus] = useState({});
    // const [mentors, setMentors] = useState([]);
    const [course, setCourse] = useState({});
    // const [uln, setUln] = useState({});

    const navigate = useNavigate();

    // useEffect(() => {
    //     let handler = (e) => {
    //         try {
    //             if (!toggleRef.current.contains(e.target)) {
    //                 setActiveMenus((prevActiveMenus) => {

    //                     const updatedActiveMenus = {};
    //                     for (const postId in prevActiveMenus) {
    //                         updatedActiveMenus[postId] = false;
    //                     }
    //                     return updatedActiveMenus;
    //                 });
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     };
    // });


    // const toggleEditMenu = (postId) => {
    //     setActiveMenus((prevActiveMenus) => ({
    //         ...prevActiveMenus,
    //         [postId]: !prevActiveMenus[postId],
    //     }));
    // };

    const fetchData = async () => {
        try {
            // const response = await api.get(`api/courses/posts/${courseId}`);
            // setPosts(response.data);

            // const mentors = await api.get(`http://localhost:1111/api/courses/find-mentor/${courseId}`)
            // setMentors(mentors.data);

            // const cc = await api.get(`http://localhost:1111/api/courses/courseDetails/${courseId}`)
            // setCourseName(cc.data);

            // const ulname = await api.get("/api/users/login")
            // setUln(ulname.data);

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
    // console.log("posts")
    // console.log(posts)


    useEffect(() => {
        fetchData();
    }, []);

    // const handleCheckboxChange = () => {
    //     setIsEditorActive(!isEditorActive);
    // };

    // const openEditor = () => {
    //     setIsEditorActive(!isEditorActive);
    // };

    // const deletePost = (postId) => {
    //     const ok = confirm("Do you sure to continue?");
    //     if (ok) {
    //         PostServices.deletePost(postId);
    //         fetchData();
    //     }
    // };

    // const handleRemoveActive = () => {
    //     setIsEditorActive(false);
    // };

    return (
        <>
            <NavBar mode={1}></NavBar>
            <main className="c-m-content">
                <section className="course-bg-inf">
                    <h1>{course.courseName}</h1>
                </section>
            </main>
            <h1>course member</h1>
            <h2>{courseId}</h2>
        </>
    );
}

export default CourseMember;
