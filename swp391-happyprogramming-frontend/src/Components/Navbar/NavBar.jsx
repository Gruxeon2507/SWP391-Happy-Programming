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
  const [navSettingOpen, setNavSettingOpen] = useState(false);

  useEffect(() => {
    // if (window.localStorage.getItem("token")) {
    //   console.log(window.localStorage.getItem("token"));
    // } else {
    //   console.log("login di");
    // }


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
  const navSettingClass = navSettingOpen ? "pf-dropdown active" : "pf-dropdown";
  // const navSettingClass = navSettingOpen ? "nav-setting active" : "nav-setting";

  return (
    <div>
      <nav className={navBarClass} id="NavBar">
        <div className="brand" onClick={() => window.location.href = window.location.origin}>
          <img src={logo} alt="logo" />
          <p className="logo">
            <span>H</span>
            PYPRO
          </p>
        </div>
        <ul className={navMenuClass}>
          <li className="nav-item">
            <NavLink to="/courses">Courses</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/mycourse">MyCourse</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          {/* <li className="nav-item">
            <NavLink to="/register">Regis</NavLink>
          </li> */}
          <li className="nav-item">
            <NavLink to="/chat">Chat</NavLink>
          </li>
        </ul>
        <div className="navToggle">
          <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </button>
        </div>

        <div className="SettingBar">
          {/* <input type="checkbox"></input> */}
          <div className={navSettingClass} onClick={() => setNavSettingOpen(!navSettingOpen)}>
            <div className="avatar">
              <img src={basicAvatar} alt="avatar"></img>
            </div>
          </div>
          <div className="Setting-Bar">
            <ul>
              <li className="nav-item">
                <NavLink to="/admin">admin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin">admin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin">admin</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin1">admin1</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/setting">setting</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/changepassword">changepassword</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/changesetting">changesetting</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/forgetpassword">forgetpassword</NavLink>
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
