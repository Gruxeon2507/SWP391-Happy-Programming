
import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../Navbar/NavBar.css";
import basicAvatar from "../../Assets/base_user_img.png";
import UserServices from "../../services/UserServices";

function SettingBar(props) {
    const toggleRef = useRef(null);
    const [navSettingOpen, setNavSettingOpen] = useState(false);
    const [userDisplayName, setUserDisplayName] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        // const udn = UserServices.getLoginUserDisplayname();
        // console.log(userDisplayName);
        try {
            const fetchUserDisplayName = async () => {
                const udn = await UserServices.getLoginUserDisplayname().catch((error) => {
                    console.log(error);
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("role");
                    window.location.reload();
                    navigate("/login")
                });
                setUserDisplayName(udn.data);
            };
            fetchUserDisplayName();
        }
        catch (e) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("role");
        }
    }, []);

    function removeActiveClass() {
        const elements = document.querySelectorAll('.active');
        elements.forEach((element) => {
            element.classList.remove('active');
        });
    }

    // window.localStorage.getItem("role")


    const navSettingClass = navSettingOpen ? "pf-dropdown active" : "pf-dropdown";

    useEffect(() => {
        let handler = (e) => {
            try {
                if (!toggleRef.current.contains(e.target)) {
                    setNavSettingOpen(false);
                }
            } catch (error) {
                // console.log(error);
            }
        };
        document.addEventListener("mousedown", handler);
    });

    return (
        <div className="SettingBar" ref={toggleRef}>
            <div

                className={navSettingClass}
                onClick={() => {
                    removeActiveClass();
                    setNavSettingOpen(!navSettingOpen);
                }}>
                <div className="avatar">
                    <img src={"http://localhost:1111/api/users/avatar/" + props.user} alt="avatar"></img>
                </div>
            </div>
            <div className="Setting-Bar" >
                <ul>
                    <li className="nav-item">
                        <img src={"http://localhost:1111/api/users/avatar/" + props.user} alt="avatar"></img>
                        <NavLink className="nav-link" to={`/profile/${props.user}`}>{userDisplayName}</NavLink>
                    </li>
                    {(localStorage.getItem("role") === 'admin') ? <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin">Admin<ion-icon name="person-circle-outline"></ion-icon></NavLink>
                        </li>
                    </> : <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/mycourse">My Course<ion-icon name="library-outline"></ion-icon></NavLink>
                        </li>
                    </>}
                    {localStorage.getItem("role") === "mentor" ? <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/request/manage">Course Manage<ion-icon name="documents-outline"></ion-icon></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/request/statistic">Statisic <ion-icon name="stats-chart-outline"></ion-icon></NavLink>
                        </li>
                    </> : <></>}

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/changesetting">setting <ion-icon name="settings-outline"></ion-icon></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            to="/login"
                            onClick={() => {
                                alert("Are you sure you want to logout?");
                                window.localStorage.removeItem("token");
                                window.localStorage.removeItem("role");
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