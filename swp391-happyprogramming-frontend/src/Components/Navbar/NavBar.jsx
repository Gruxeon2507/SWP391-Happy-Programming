import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Navbar/NavBar.css";
import logo from "../../Assets/logo.png";
import { Alert } from "bootstrap";
import SettingDrawer from "../SettingDrawer/SettingDrawer";
import basicAvatar from "../../Assets/base_user_img.png";

function NavBar(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      window.pageYOffset > 0
        ? setIsNavBarActive(true)
        : setIsNavBarActive(false);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let navBarClass = "NavBar active";
  if (props.mode === 1) {
    navBarClass = isNavBarActive ? "NavBar active" : "NavBar";
  }

  // const navBarClass = isNavBarActive ? "NavBar active" : "NavBar";
  const navMenuClass = navMenuOpen ? "nav-menu active" : "nav-menu";

  return (
    <div>
      {/* <SettingDrawer></SettingDrawer> */}
      <nav className={navBarClass} id="NavBar">
        <div className="brand">
          <img src={logo} alt="logo" />
          <a href="#" className="logo">
            <span>H</span>
            PYPRO
          </a>
        </div>
        <ul className={navMenuClass}>
          <li className="nav-item">
            {/* <NavLink to="/home">Home</NavLink> */}
            <a href="/home">home</a>
          </li>
          <li className="nav-item">
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/mycourse">MyCourse</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/createCourse">creCourse</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register">Regis</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/chat">Chat</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin">admin</NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              onClick={() => {
                alert("Are you sure you want to logout?");
                window.localStorage.removeItem("token");
              }}
            >
              logout
            </NavLink>
          </li>
        </ul>
        <div className="navToggle">
          <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </button>
        </div>
      </nav>
      <div className="SettingBar">
        <div className="pf-dropdown">
          <div className="avatar">
            <img src={basicAvatar} alt="avatar"></img>
          </div>
        </div>
        {/* <SettingDrawer></SettingDrawer> */}
      </div>
    </div>
  );
}

export default NavBar;
