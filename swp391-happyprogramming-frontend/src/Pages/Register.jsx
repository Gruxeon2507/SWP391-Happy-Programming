import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import "../Style/RegisStyle.css";
import { Button } from "bootstrap";

class Register extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="regis-frag">
          <div className="regis-form">
            <form>
              <div className="user-input">
                <input type="text" id="userName"></input>
                <label htmlFor="userName">UserName</label>
                <span></span>
              </div>
              <div className="user-input">
                <input type="text" id="userPassword"></input>
                <label htmlFor="userPassword">Password</label>
                <span></span>
              </div>
              <div className="user-input">
                <input type="text" id="re-userPassword"></input>
                <label htmlFor="re-userPassword">Re Enter Password</label>
                <span></span>
              </div>
              <div className="user-input">
                <input type="text" id="email-I"></input>
                <label htmlFor="email-I">Email</label>
                <span></span>
              </div>
              <button type="submit">Register</button>
            </form>
          </div>
          <div className="confirm-email">
            <div className="user-input">
              <input type="text" id="cf-code-email"></input>
              <label htmlFor="cf-code-email">Code</label>
              <span></span>
            </div>
            <button type="submit">confirm</button>
            <br />
            <a href="#">Resend code</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
