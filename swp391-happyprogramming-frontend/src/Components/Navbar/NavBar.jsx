import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Navbar/NavBar.css";
import logo from "../../Assets/logo.png";
import { Alert } from "bootstrap";
import SettingDrawer from "../SettingDrawer/SettingDrawer";
import basicAvatar from "../../Assets/base_user_img.png";
import SettingBar from "../SettingBar/SettingBar";

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
  let navMenuClass = navMenuOpen ? "nav-menu active" : "nav-menu";

  if (props.mode !== 0) {
    navBarClass = isNavBarActive ? "NavBar active" : "NavBar";
  }

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
        {(props.mode === 0 || props.mode === 1) && <>
          <ul className={navMenuClass}>
            <li className="nav-item">
              <NavLink to="/courses">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mycourse">My Course</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chat">Chat</NavLink>
            </li>
          </ul>
          <div className="navToggle">
            <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
              <ion-icon name="reorder-three-outline"></ion-icon>
            </button>
          </div>
          {window.localStorage.getItem("token") ? <SettingBar /> : <></>}
        </>}
        {(props.mode === 2) && <>
          <div className="login-uti-text">
            <p>
              Don't have an account ?{" "}
              <span className="sign-in">
                <NavLink to="/register">Sign Up</NavLink>
              </span>
            </p>
          </div>
        </>}
        {(props.mode === 3) && <>
          <div className="login-uti-text">
            <p>
              Already a member ?{" "}
              <span className="sign-in">
                <NavLink to="/login">Log in</NavLink>
              </span>
            </p>
          </div>
        </>}
      </nav>
    </div>
  );
}

export default NavBar;
