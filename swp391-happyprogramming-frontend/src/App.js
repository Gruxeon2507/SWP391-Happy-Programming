import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./services/BaseAuthenticationService";
import React from "react";
//Componentss
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Chat from "./Pages/Chat/Chat";
import Setting from "./Pages/Setting/Setting";
import userProfile from "./Pages/UserProfile/userProfile";
import Homepage from "./Pages/Homepage/Homepage";
import MyCourse from "./Pages/MyCourse/MyCourse";

import CourseDetails from "./Pages/Course/CourseDetails";
import MentorManagement from "./Pages/Admin/MentorManagement";
import CreateCourse from "./Pages/Course/CreateCourse";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import ChangeSetting from "./Pages/ChangeSetting/ChangeSetting";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ViewProfile from "./Pages/ViewProfile/ViewProfile";
import AdminManage from "./Pages/Admin/AdminManage";
import RequestManage from "./Pages/Mentor/RequestManage";

//CSS
import "./global/global.css";
import CreatePost from "./Components/CreatePost/CreatePost";
import CourseFeed from "./Pages/CourseFeed/CourseFeed";
import RequestStatistic from "./Pages/Mentor/RequestStatistic";

import PostDetail from "./Pages/PostDetail/PostDetail";
function App() {
  const [features, setFeatures] = useState(null);
  const fetchData = async () => {
    try {
      const response = await api.get("api/feature/all");
      setFeatures(response.data);
      // console.log(response.data);
      // console.log(features);
    } catch (error) {

    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(features);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/landing"></Navigate>}></Route>
      <Route path="/landing" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/courses" element={<Homepage />} />
      <Route path="/courses/view/:courseID" element={<CourseDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/admin" element={<AdminManage />} />

      <Route path="/request/manage" element={<RequestManage />} />
      <Route path="/request/statistic" element={<RequestStatistic />} />

      <Route path="/mycourse" element={<MyCourse />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/createCourse" element={<CreateCourse></CreateCourse>} />
      <Route
        path="/changepassword"
        element={<ChangePassword></ChangePassword>}
      />
      <Route path="/changesetting" element={<ChangeSetting></ChangeSetting>} />
      <Route path="/forgetpassword" element={<ForgetPassword></ForgetPassword>} />
      <Route path="/profile/:id" element={<ViewProfile> </ViewProfile>} />

      <Route path="/createPost" element={<CreatePost></CreatePost>}></Route>
      <Route path="/courses/feed/:courseId" element={<CourseFeed></CourseFeed>}></Route>
      <Route path="/post/view/:postId" element={<PostDetail></PostDetail>}></Route>
      {features &&
        features.map((feature) => {
          if (feature.url === "/home") {
            return (
              <Route key={feature.url} path={feature.url} element={<Home />} />
            );
          }
          return null;
        })}
      <Route path="*" Component={AccessDenied}></Route>
    </Routes>
  );
}
function AccessDenied() {
  return (
    <div className="forbiddenPage">
      <div></div>
      <h1>
        <span className="forbiddenTitle">404</span> - Not Found
      </h1>
      <p>
        This Page Is Not Found.{" "}
        <a href="javascript:history.go(-1)">Return To Previous Page</a>
      </p>
    </div>
  );
}
export default App;
