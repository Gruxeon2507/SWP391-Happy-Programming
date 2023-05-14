import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import "../Style/RegisStyle.css";
import { Button } from "bootstrap";

function Register(props) {
  return (
    <div>
      <NavBar></NavBar>
      <div className="regis-frag">
        <div className="regis-form">
          <form>
            <div className="form-header">
              <h1>Registration form</h1>
            </div>
            <div className="user-input">
              <input type="text" id="userName" required></input>
              <span>UserName</span>
            </div>
            <div className="user-input">
              <input type="text" id="userPassword" required></input>
              <span>Password</span>
            </div>
            <div className="user-input">
              <input type="text" id="re-userPassword" required></input>
              <span>Re Enter Password</span>
            </div>
            <div className="user-input">
              <input type="text" id="email-I" required></input>
              <span>Email</span>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="confirm-email">
          <div className="form-header">
            <h1>OTP Verification</h1>
          </div>
          <div className="user-input">
            <input type="text" id="cf-code-email" required></input>
            <span>Enter Verification Code</span>
          </div>
          <button type="submit">confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
