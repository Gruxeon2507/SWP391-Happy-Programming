import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";

function ResetPassword(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  const code = urlParams.get("code");

  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const [checkRePassword, setCheckRePassword] = useState(false);
  const [messageRePassowrd, setMessageRePassword] = useState(``);
  const onChangeNewPassword = (event) => {
    const inputNewPassword = event.target.value;
    setNewPassword(inputNewPassword);
  };

  const onChangeReNewPassword = (event) => {
    const inputReNewPassword = event.target.value;
    if (inputReNewPassword != newPassword) {
      setCheckRePassword(true);
      setMessageRePassword(`Re password do not match`);
    } else {
      setCheckRePassword(false);
      setMessageRePassword(``);
      setReNewPassword(inputReNewPassword);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append(`username`, username);
    formData.append(`code`, code);
    formData.append(`password`, newPassword);

    axios
      .get(`http://localhost:1111/api/auth/resetpassword`, formData)
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
          <label>New password</label>
          <input
            type="text"
            name="newPassword"
            required
            onChange={onChangeNewPassword}
          />
        </div>
        <div>
          <label>Re new password</label>
          <input
            type="text"
            name="reNewPassword"
            required
            onChange={onChangeReNewPassword}
          />
        </div>
        {checkRePassword ? (
          <>
            <div className="w-message" style={{ color: "black" }}>
              {messageRePassowrd}
            </div>
          </>
        ) : null}
        <button>Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
