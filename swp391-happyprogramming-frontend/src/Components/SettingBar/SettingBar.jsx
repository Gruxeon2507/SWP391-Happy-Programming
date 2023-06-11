
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "../Navbar/NavBar.css";
import basicAvatar from "../../Assets/base_user_img.png";

function SettingBar(props) {
    const [navSettingOpen, setNavSettingOpen] = useState(false);


    const navSettingClass = navSettingOpen ? "pf-dropdown active" : "pf-dropdown";

    return (
        <div className="SettingBar">
            <div className={navSettingClass} onClick={() => setNavSettingOpen(!navSettingOpen)}>
                <div className="avatar">
                    {/* <img src={basicAvatar} alt="avatar"></img> */}
                    {/* <img src={"http://localhost:1111/api/users/avatar/" + "anmentor"} alt="avatar"></img> */}
                    <img src={"http://localhost:1111/api/users/avatar/" + props.user} alt="avatar"></img>
                </div>
            </div>
            <div className="Setting-Bar">
                <ul>
                    <li className="nav-item">
                        <img src={"http://localhost:1111/api/users/avatar/" + props.user} alt="avatar"></img>
                        <NavLink to={`/profile/${props.user}`}>{props.user}</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/admin">admin</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <p>Setting</p>
                        <div className="themeSwitch">
                            <label>
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </li> */}

                    <li className="nav-item">
                        <NavLink to="/changepassword">changepassword</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/request/statistic">Statisic <ion-icon name="settings-outline"></ion-icon></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/changesetting">setting <ion-icon name="settings-outline"></ion-icon></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="/login"
                            onClick={() => {
                                alert("Are you sure you want to logout?");
                                window.localStorage.removeItem("token");
                            }}
                        >
                            logout <ion-icon name="log-out-outline"></ion-icon>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SettingBar;