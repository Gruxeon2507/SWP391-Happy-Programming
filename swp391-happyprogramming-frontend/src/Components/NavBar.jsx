import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Style/NavBarStyle.css";
import logo from "../Assets/logo.png";

function NavBar(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);

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

  const navBarClass = isNavBarActive ? "NavBar active" : "NavBar";

  return (
    <div>
      <nav className={navBarClass} id="NavBar">
        <div>
          <div className="brand">
            <img src={logo} alt="logo" />
            <a href="#" className="logo">
              <span>H</span>
              PYPRO
            </a>
          </div>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/home">Home</NavLink>
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
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
