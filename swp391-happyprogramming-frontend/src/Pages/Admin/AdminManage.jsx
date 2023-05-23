import React from "react";
import logo from "../../Assets/logo.png";
import basicAvt from "../../Assets/base_user_img.png";
import CreateCourse from "../Course/CreateCourse";
import "../Admin/AdminManage.css";

function AdminManage(props) {
  return (
    <div className="body-wraper">
      <div className="admin-navbar">
        <div className="brand">
          <img src={logo} alt="logo" />
          <a href="#" className="logo">
            <span>H</span>
            PYPRO
          </a>
        </div>
        <div className="SettingBar">
          <div className="anb-">
            <div className="pf-dropdown">
              <div className="avatar">
                <img src={basicAvt} alt="avatar"></img>
              </div>
            </div>
          </div>
          {/* <SettingDrawer></SettingDrawer> */}
        </div>
      </div>
      <div className="body-content">
        <div className="fragment-nav-bar">
          <div>
            <ul>
              <li>Create Course</li>
              <li>Create Mentor</li>
              <li>User Manage</li>
              <li>admin function</li>
              <li>admin function</li>
              <li>admin function</li>
            </ul>
          </div>
        </div>
        <div className="main-content">
          <CreateCourse></CreateCourse>
        </div>
      </div>
    </div>
  );
}
export default AdminManage;
