import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import "./ForogetPassword.css";
import { Nav } from "react-bootstrap";

function ForgetPassword(props) {
  const [username, setUsername] = useState("");
  const [showErrorUsername, setShowErrorUsername] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [screenState, setScreenState] = useState(true);

  const onChangeUsername = async (event) => {
    const inputUsername = event.target.value;
    const regex = /^[a-zA-Z0-9\s]*$/;
    if (
      !regex.test(inputUsername) ||
      inputUsername.length < 6 ||
      inputUsername.length > 150
    ) {
      setShowErrorUsername(true);
      setErrorUsername(
        `Please just input characters and numbers and not empty and size just from 6 to 150`
      );
      return;
    }
    setShowErrorUsername(false);
    setErrorUsername(``);
    setUsername(inputUsername);
  };

  const handleSubmit = (event) => {
    setScreenState(false);
    event.preventDefault();
    if (showErrorUsername) {
      alert("Username: " + errorUsername);
      return;
    }

    axios
      .post(`http://localhost:1111/api/auth/forgetpassword/${username}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setMessageVerify("Please verify mail your account");
  };
  return (
    <>
      <NavBar mode={2} />
      <div className="forgetpassword-container">
        <form onSubmit={handleSubmit} className="forgetpassword-form">
          <h1>Forgot Password</h1>

          {screenState ? (
            <>
              <span>Enter your Username</span>
              <div className="user-input">
                <input
                  type="text"
                  name="username"
                  required
                  onChange={onChangeUsername}
                ></input>
                <button>Confirm</button>
              </div>
            </>
          ) : (
            <>
              <div className="cm-noti">
                <p>Please Check your Email</p>
              </div>
            </>
          )}

          {showErrorUsername ? (
            <>
              <div className="w-message" style={{ color: "black" }}>
                {errorUsername}
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default ForgetPassword;
