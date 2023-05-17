import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Navbar/NavBar.css";
import logo from "../../Assets/logo.png";
import { Alert } from "bootstrap";

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
        <div className="brand">
          <img src={logo} alt="logo" />
          <a href="#" className="logo">
            <span>H</span>
            PYPRO
          </a>
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
          <li className="nav-item">
            <NavLink
              to="/login"
              onClick={() => alert("Are you sure you want to logout?")}
            >
              logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
