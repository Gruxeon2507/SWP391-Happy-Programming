import React, { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./SettingDrawer.css";

SettingDrawer.propTypes = {
  //
};

function SettingDrawer(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <div>
        <input
          type="checkbox"
          style={{ width: "100px", height: "100px" }}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
      <nav className={`drawer ${isChecked ? "active" : ""}`} id="NavBar">
        <ul className="draw-menu">
          <li className="draw-item">
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className="draw-item">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="draw-item">
            <NavLink to="/register">Regis</NavLink>
          </li>
          <li className="draw-item">
            <NavLink to="/setting">Setting</NavLink>
          </li>
          <li className="draw-item">
            <NavLink
              to="/login"
              onClick={() => alert("Are you sure you want to logout?")}
            >
              logout<ion-icon name="log-out-outline"></ion-icon>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SettingDrawer;
