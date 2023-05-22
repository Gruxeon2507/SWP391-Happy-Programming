import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";

function ForgetPassword(props) {
  const [username, setUsername] = useState("");
  const [showErrorUsername, setShowErrorUsername] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");

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
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your username</label>
          <input
            type="text"
            name="username"
            required
            onChange={onChangeUsername}
          ></input>
          <button>Confirm</button>
        </div>
        {showErrorUsername ? (
          <>
            <div className="w-message" style={{ color: "black" }}>
              {errorUsername}
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
}

export default ForgetPassword;
