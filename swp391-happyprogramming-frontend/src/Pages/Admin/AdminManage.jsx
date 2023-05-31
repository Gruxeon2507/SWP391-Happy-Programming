import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import basicAvt from "../../Assets/base_user_img.png";
import CreateCourse from "../Course/CreateCourse";
import { NavLink } from "react-router-dom";
import "../Admin/AdminManage.css";
import basicAvatar from "../../Assets/base_user_img.png";
import MentorManagement from "./MentorManagement";

function AdminManage(props) {

  const [active, setActive] = useState(1);

  const setActiveMode = (active) => (
    setActive(active)
   )  
  

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
            <li onClick={()=> setActiveMode(0)}>Create Course</li>
            <li onClick={()=> setActiveMode(1)}>Mentor Management</li>
            <li onClick={()=> setActiveMode(2)}>Create Course</li>
            <li onClick={()=> setActiveMode(3)}>Create Course</li>
            <li onClick={()=> setActiveMode(4)}>Create Course</li>
            <li onClick={()=> setActiveMode(5)}>Create Course</li>
            <li className="">
              <NavLink to="/">Go to website</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {active === 0?<CreateCourse/> : <></>}
        {active === 1?<MentorManagement></MentorManagement>:<></>}
        {active === 2?<CreateCourse/> : <></>}
        {active === 3?<CreateCourse/> : <></>}
        {active === 4?<CreateCourse/> : <></>}
        {active === 5?<CreateCourse/> : <></>}
        
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
