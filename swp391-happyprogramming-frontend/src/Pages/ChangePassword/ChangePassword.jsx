import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";

function ChangePassword(props) {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState("");
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const [checkRePassword, setCheckRePassword] = useState(true);
  const [MessageRePassword, setMessageRePassword] = useState("");

  const token = window.localStorage.getItem("token");

  const onChangeOldPassword = (event) => {
    const inputOldPassword = event.target.value;
    setOldPassword(inputOldPassword);
  };

  const onChangeNewPassword = (event) => {
    const inputNewPassword = event.target.value;
    if (inputNewPassword.length < 6 || inputNewPassword < 60) {
      setShowErrorPassword(true);
      setErrorPassword(
        `Please input password that contains 6 to 60 characters`
      );
      return;
    }
    setShowErrorPassword(false);
    setErrorPassword(``);
    setNewPassword(inputNewPassword);
  };

  const onChangeReNewPassword = (event) => {
    const inputReNewPassword = event.target.value;
    if (inputReNewPassword != newPassword) {
      setCheckRePassword(true);
      setMessageRePassword("Re Password not match");
    } else {
      setCheckRePassword(false);
      setMessageRePassword(``);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    const requestHeaders = {
      Authorization: `Bearer ${token}`,
    };
    if (checkRePassword) {
      alert("Re Password is not match");
      return;
    }

    axios
      .post(
        `http://localhost:1111/api/users/profile/changepassword`,
        formData,
        { headers: requestHeaders }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data === "") {
          alert("Old password is not match");
          return;
        } else {
          const confirmed = window.confirm(
            "Password changed successfully. Do you want to log in again?"
          );
          if (confirmed) {
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <>
      <NavBar mode={1} />
      <div className="chgpwd-container">
        <form onSubmit={handleSubmit} className="chgpwd-form">
          <div className="title">
            <h1>CHANGE PASSWORD</h1>
          </div>
          <div className="user-input">
            <input type="password" onChange={onChangeOldPassword} required />
            <span>Old password</span>
          </div>
          <div className="user-input">
            <input type="password" onChange={onChangeNewPassword} required />
            <span>New password</span>
          </div>
          {showErrorPassword ? (
            <>
              <div className="w-message" style={{ color: "black" }}>
                {errorPassword}
              </div>
            </>
          ) : null}
          <div className="user-input">
            <input type="Password" onChange={onChangeReNewPassword} required />
            <span>Re new password</span>
          </div>
          {checkRePassword ? (
            <>
              <div className="w-message">{MessageRePassword}</div>
            </>
          ) : null}

          <button>Change password</button>
        </form>
      </div>
    </>
  );
}

export default ChangePassword;
