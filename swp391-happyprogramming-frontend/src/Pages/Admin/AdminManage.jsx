import React from "react";
import logo from "../../Assets/logo.png";
import basicAvt from "../../Assets/base_user_img.png";
import CreateCourse from "../Course/CreateCourse";
import { NavLink } from "react-router-dom";
import "../Admin/AdminManage.css";
import basicAvatar from "../../Assets/base_user_img.png";

function AdminManage(props) {
  return (
    <div className="body-wraper">
      <div className="fragment-nav-bar">
        <div className="admin-navbar">
          <div className="brand">
            <img src={logo} alt="logo" />
            <a href="#" className="logo">
              <span>H</span>
              PYPRO
            </a>
          </div>
        </div>
        <div className="ad-nav-list">
          <ul>
            <li>Create Course</li>
            <li>Create Mentor</li>
            <li>User Manage</li>
            <li>admin function</li>
            <li>admin function</li>
            <li>admin function</li>
            <li className="">
              <NavLink to="/">Go to website</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <CreateCourse></CreateCourse>
      </div>
      <div className="setting-bar">
        <div className="pf-dropdown">
          <div className="avatar">
            <img src={basicAvatar} alt="avatar"></img>
          </div>
        </div>
        <div className="avt-option">
          <ul>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
            <li>option 1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default AdminManage;
