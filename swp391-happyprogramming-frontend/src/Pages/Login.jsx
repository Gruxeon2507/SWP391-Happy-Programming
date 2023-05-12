import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import "../Style/LoginStyle.css";
import loginBG from "../Assets/loginBG.jpg";

class Login extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="login-frag">
          <div className="login-bg">
            <img src={loginBG} alt="loginBG"></img>
          </div>
          <div className="login-form">
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
              <button type="submit">Login</button>
            </form>
          </div>
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
        </div>
      </div>
    );
  }
}

export default Login;
