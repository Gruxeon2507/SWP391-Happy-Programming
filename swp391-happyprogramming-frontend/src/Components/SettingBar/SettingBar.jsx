
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Navbar/NavBar.css";
import basicAvatar from "../../Assets/base_user_img.png";

function SettingBar() {
    const [navSettingOpen, setNavSettingOpen] = useState(false);


    const navSettingClass = navSettingOpen ? "pf-dropdown active" : "pf-dropdown";

    return (
        <div className="SettingBar">
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
                        <p>Setting</p>
                        <div className="themeSwitch">
                            <label>
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
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
                        <NavLink to="/request/statistic">Statisic</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/request/manage">manage</NavLink>
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
    );
}

export default SettingBar;