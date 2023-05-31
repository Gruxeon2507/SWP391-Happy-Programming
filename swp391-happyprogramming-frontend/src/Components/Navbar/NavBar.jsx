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
  if (props.mode === 1) {
    navBarClass = isNavBarActive ? "NavBar active" : "NavBar";
  }

  const navMenuClass = navMenuOpen ? "nav-menu active" : "nav-menu";

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
          <li className="nav-item">
            <NavLink to="/chat">Chat</NavLink>
          </li>
        </ul>
        <div className="navToggle">
          <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
            <ion-icon name="reorder-three-outline"></ion-icon>
          </button>
        </div>

        <SettingBar></SettingBar>
      </nav>
    </div>
  );
}

export default NavBar;
