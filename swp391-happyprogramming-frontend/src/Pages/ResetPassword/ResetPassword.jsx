import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import "./ResetPassword.css"

function ResetPassword(props) {
  const { username } = useParams();
  const [code, setCode] = useState("");

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

  const onChangeOtpCode = (event) => {
    const inputOtpCode = event.target.value;
    setCode(inputOtpCode);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    if (checkRePassword) {
      alert("Re Password do not match");
      return;
    }

    formData.append("username", username);
    formData.append("code", code);
    formData.append("password", newPassword);

    axios
      .post(`http://localhost:1111/api/auth/resetpassword`, formData, config)
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          alert("wrong code");
        } else {
          alert("change successfully");
          window.location.href = "../login";
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log();
  };

  return (
    <>
      <NavBar mode={3} />
      <main className="reset-pw-container">
        <form onSubmit={handleSubmit}>
          <div className="user-input">
            <input type="text" name="code" required onChange={onChangeOtpCode} />
            <span>OTP Code</span>
          </div>
          <div className="user-input">
            <input
              type="text"
              name="newPassword"
              required
              onChange={onChangeNewPassword}
            />
            <span>New password</span>
          </div>
          <div className="user-input">
            <input
              type="text"
              name="reNewPassword"
              required
              onChange={onChangeReNewPassword}
            />
            <span>Re new password</span>
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
      </main>
    </>
  );
}

export default ResetPassword;
