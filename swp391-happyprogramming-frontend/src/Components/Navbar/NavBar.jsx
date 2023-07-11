import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../Navbar/NavBar.css";
import logo from "../../Assets/logo.png";
import { Alert } from "bootstrap";
import SettingDrawer from "../SettingDrawer/SettingDrawer";
import basicAvatar from "../../Assets/base_user_img.png";
import SettingBar from "../SettingBar/SettingBar";
import UserServices from "../../services/UserServices";
import Notification from "../Notification/Notification";

function NavBar(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // boolean notification seen 
  const [notiSeen, setNotiBeenSeen] = useState(false);

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

  useEffect(() => {
    try {

      if (localStorage.getItem("token")) {
        const fetchUsername = async () => {
          const loginuser = await UserServices.getLoginUsername().catch((error) => {

            window.localStorage.removeItem("token");
            window.localStorage.removeItem("role");
            navigate("/login")

          });
          setUser(loginuser.data);
        };
        fetchUsername();
      }
    } catch (e) {
      console.log(e);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("role");
    }
  }, []);


  let navBarClass = "NavBar show";
  let navMenuClass = navMenuOpen ? "nav-menu active" : "nav-menu";

  if (props.mode !== 0) {
    navBarClass = isNavBarActive ? "NavBar show" : "NavBar";
  }

  function removeActiveClass() {
    const elements = document.querySelectorAll('.active');
    elements.forEach((element) => {
      element.classList.remove('active');
    });
  }

  {
    localStorage.getItem("token") ?
      <><li className="nav-item">
        <NavLink to="/mycourse">My Course</NavLink>
      </li></>
      :
      <><li className="nav-item">
        <NavLink to="/login">Login</NavLink>
      </li></>
  }

  const navItem = localStorage.getItem("token") ? [
    // item if logged in
    {
      label: "Courses",
      to: "/courses"
    },
    {
      label: "My Courses",
      to: "/mycourse"
    },
    {
      label: "Chat",
      to: "/chat"
    }
  ] : [
    // item if not logged in
    {
      label: "Courses",
      to: "/courses"
    },
    {
      label: "Login",
      to: "/Login"
    }
  ]

  return (
    <div>
      <nav className={navBarClass} id="NavBar">
        <div className="brand" onClick={() => window.location.href = window.location.origin}>
          <img src={logo} alt="logo" />
          <p className="logo">
            <span>H</span>
            PYPRO
            {/* <span>{window.localStorage.getItem("role")}</span> */}
          </p>
        </div>
        {(props.mode === 0 || props.mode === 1) && <>
          <ul className={navMenuClass}>
            {navItem.map((item) =>
              <>
                <li className="nav-item">
                  <NavLink to={item.to} key={item.to}>{item.label}</NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="navToggle">
            <button onClick={() => setNavMenuOpen(!navMenuOpen)}>
              <ion-icon name="reorder-three-outline"></ion-icon>
            </button>
          </div>
          {window.localStorage.getItem("token") ?
            <>
              <Notification></Notification>
              <SettingBar user={user} />
            </>
            : <></>}
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
