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
              HPYPRO
            </a>
          </div>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              ph
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              ph
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              chat
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
