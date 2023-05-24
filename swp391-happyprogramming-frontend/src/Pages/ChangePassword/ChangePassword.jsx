import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";

function ChangePassword(props) {
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

    axios
      .post(
        `http://localhost:1111/api/users/profile/changepassword`,
        formData,
        { headers: requestHeaders }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old password</label>
          <input type="password" onChange={onChangeOldPassword} required />
        </div>
        <div>
          <label>New password</label>
          <input type="password" onChange={onChangeNewPassword} required />
        </div>
        {showErrorPassword ? (
          <>
            <div className="w-message" style={{ color: "black" }}>
              {errorPassword}
            </div>
          </>
        ) : null}
        <div>
          <label>Re new password</label>
          <input type="Password" onChange={onChangeReNewPassword} required />
        </div>
        {checkRePassword ? (
          <>
            <div className="w-message">{MessageRePassword}</div>
          </>
        ) : null}

        <button>Change password</button>
      </form>
    </div>
  );
}

export default ChangePassword;
