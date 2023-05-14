import React, { Component, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import "./Register.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";

function Register(props) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    mail: "",
  });
  const [rePassword, setRePassword] = useState("");
  const [checkRePassword, setCheckRePassword] = useState(true);
  const [MessageRePassword, setMessageRePassword] = useState("");
  const [messageVerify, setMessageVerify] = useState("");

  const onChangeUsername = (event) => {
    const inputUsername = event.target.value;
    setUser({
      ...user,
      username: inputUsername,
    });
  };

  const onChangePassword = (event) => {
    const inputPassword = event.target.value;
    setUser({
      ...user,
      password: inputPassword,
    });
  };

  const onChangeRePassword = (event) => {
    const inputRePassword = event.target.value;
    if (inputRePassword != user.password) {
      setCheckRePassword(true);
      setMessageRePassword("Re Password not match");
    } else {
      setCheckRePassword(false);
    }
  };

  const onChangeEmail = (event) => {
    const inputEmail = event.target.value;
    setUser({
      ...user,
      mail: inputEmail,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkRePassword == true) {
      alert(MessageRePassword);
      return;
    }

    axios
      .post("http://localhost:1111/api/auth/register", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    setMessageVerify("Please verify mail your account");
  };

  return (
    <div>
      <NavBar></NavBar>

      {messageVerify ? (
        <VerifyDialog email={user.mail} />
      ) : (
        <div className="regis-frag">
          <div className="regis-form">
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <h1>Registration form</h1>
              </div>
              <div className="user-input">
                <input
                  type="text"
                  id="userName"
                  required
                  onChange={onChangeUsername}
                ></input>
                <span>UserName</span>
              </div>
              <div className="user-input">
                <input
                  type="password"
                  id="userPassword"
                  required
                  onChange={onChangePassword}
                ></input>
                <span>Password</span>
              </div>
              <div className="user-input">
                <input
                  type="password"
                  id="re-userPassword"
                  required
                  onChange={onChangeRePassword}
                ></input>
                <span>Re Enter Password</span>
              </div>
              {checkRePassword ? (
                <>
                  <div className="w-message">{MessageRePassword}</div>
                </>
              ) : null}
              <div className="user-input">
                <input
                  type="email"
                  id="email-I"
                  required
                  onChange={onChangeEmail}
                ></input>
                <span>Email</span>
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
