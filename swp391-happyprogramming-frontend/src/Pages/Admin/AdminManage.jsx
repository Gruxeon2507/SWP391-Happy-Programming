import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import basicAvt from "../../Assets/base_user_img.png";
import CreateCourse from "../Course/CreateCourse";
import { NavLink } from "react-router-dom";
import "../Admin/AdminManage.css";
import basicAvatar from "../../Assets/base_user_img.png";
import MentorManagement from "./MentorManagement";
import SettingBar from "../../Components/SettingBar/SettingBar";
import NavBar from "../../Components/Navbar/NavBar";

function AdminManage(props) {

  const [active, setActive] = useState(0);

  const setActiveMode = (active) => (
    setActive(active)
  )


  return (
    <div className="body-wraper">
      <div className="fragment-nav-bar">
        <NavBar mode={1}></NavBar>
        <div className="ad-nav-list">
          <ul>
            <button id="admin-add-btn"><span> + </span>New</button>
            <li
              className={active === 1 ? "active" : ""}
              onClick={() => setActiveMode(1)}
            >
              Create Course
            </li>
            <li
              className={active === 2 ? "active" : ""}
              onClick={() => setActiveMode(2)}
            >
              Mentor Management
            </li>
            <li
              className={active === 3 ? "active" : ""}
              onClick={() => setActiveMode(3)}
            >
              item placeholder
            </li>
            <li
              className={active === 4 ? "active" : ""}
              onClick={() => setActiveMode(4)}
            >
              item placeholder
            </li>
            <li
              className={active === 5 ? "active" : ""}
              onClick={() => setActiveMode(5)}
            >
              item placeholder
            </li>
            <li
              className={active === 5 ? "active" : ""}
              onClick={() => setActiveMode(5)}
            >
              item placeholder
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {active === 0 ? <></> : <></>}
        {active === 1 ? <CreateCourse /> : <></>}
        {active === 2 ? <MentorManagement></MentorManagement> : <></>}
        {active === 3 ? <CreateCourse /> : <></>}
        {active === 4 ? <CreateCourse /> : <></>}
        {active === 5 ? <CreateCourse /> : <></>}
        {active === 6 ? <CreateCourse /> : <></>}

      </div>
    </div>
  );
}
export default AdminManage;
