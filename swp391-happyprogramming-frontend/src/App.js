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
import ChatRoom from "./Pages/ChatBeta/ChatRoom";

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
import PrivateChatRoom from "./Pages/ChatBeta/ChatAlpha";
import ConversationList from "./Pages/ChatBeta/ConversationList";
import RequestStatistic from "./Pages/Mentor/RequestStatistic";

import PostDetail from "./Pages/PostDetail/PostDetail";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import VerifyDialog from "./Components/RegisterForm/VerifyDialog";
import MyCourseHistory from "./Pages/MyCourse/MyCourseHistory";
function App() {

  // console.log(features);
  return (
    <Routes>
      {/* GUEST */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Homepage />} />
      <Route path="/courses/view/:courseID" element={<CourseDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:username" element={<VerifyDialog />} />

      {/* <VerifyDialog email={user.mail} username={user.username} /> */}
      <Route
        path="/forgetpassword"
        element={<ForgetPassword></ForgetPassword>}
      />
      <Route path="/profile/:id" element={<ViewProfile> </ViewProfile>} />

      {/* MENTEE */}
      {/* <Route path="/chat" element={<ConversationList />} /> */}
      {/* <Route path="/mycourse" element={<MyCourse />} /> */}
      {/* <Route path="/setting" element={<Setting />} /> */}
      {/* <Route
        path="/changepassword"
        element={<ChangePassword></ChangePassword>}
      /> */}
      {/* <Route
        path="/courses/feed/:courseId"
        element={<CourseFeed></CourseFeed>}
      ></Route> */}
      {/* <Route
        path="/chat/:conversationId"
        element={<PrivateChatRoom></PrivateChatRoom>}
      ></Route> */}
      {/* <Route
        path="/post/view/:postId"
        element={<PostDetail></PostDetail>}
      ></Route> */}

      {/* MENTOR */}
      {/* <Route path="/request/manage" element={<RequestManage />} /> */}
      {/* <Route path="/request/statistic" element={<RequestStatistic />} /> */}
      {/* <Route path="/createPost" element={<CreatePost></CreatePost>}></Route> */}

      {/* ADMIN */}
      {/* <Route path="/admin" element={<AdminManage />} /> */}
      {/* <Route path="/changesetting" element={<ChangeSetting></ChangeSetting>} /> */}

      <Route
        path="/chat"
        element={
          <PrivateRoute
            component={ConversationList}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/mycourse"
        element={
          <PrivateRoute
            component={MyCourseHistory}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />


      <Route
        path="/setting"
        element={
          <PrivateRoute
            component={Setting}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/changepassword"
        element={
          <PrivateRoute
            component={ChangePassword}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/courses/feed/:courseId"
        element={
          <PrivateRoute
            component={CourseFeed}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/chat/:conversationId"
        element={
          <PrivateRoute
            component={PrivateChatRoom}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/post/view/:postId"
        element={
          <PrivateRoute
            component={PostDetail}
            roles={["mentee", "mentor", "admin"]}
          />
        }
      />

      <Route
        path="/request/manage"
        element={
          <PrivateRoute component={RequestManage} roles={["mentor", "admin"]} />
        }
      />

      <Route
        path="/request/statistic"
        element={
          <PrivateRoute
            component={RequestStatistic}
            roles={["mentor", "admin"]}
          />
        }
      />

      <Route
        path="/createPost"
        element={
          <PrivateRoute component={CreatePost} roles={["mentor", "admin"]} />
        }
      />
      <Route path="/resetpassword/:username" element={<ResetPassword></ResetPassword>} />

      <Route
        path="/admin"
        element={
          <PrivateRoute component={AdminManage} roles={["admin"]} />
        }
      />
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
        This Page Is Not Found. <a href="/">Return To Home Page</a>
      </p>
    </div>
  );
}
export default App;
