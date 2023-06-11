import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import "./Login.css";
import loginBG from "../../Assets/loginBG.jpg";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [checkUsername, setCheckUsername] = useState(false);
  const [messageUsername, setMessageUsername] = useState(
    "Please just input numbers and characters"
  );
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [messageLoginFailed, setMessageLoginFailed] = useState("Login Failed");

  // Add an event listener to the form

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (checkUsername) {
      alert("can not load data to login");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:1111/api/auth/login",
        { username, password }
      );
      console.log(response);
      const token = response.data.token;
      const role = response.data.role;
      // Store the token in localStorage or a state management solution
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      
      window.location.href = "/";
    } catch (error) {
      console.log("login failed");
      setLoginFailed(true);
      console.error(error);
      // display an error message to the user
    }
  };

  return (
    <div>
      <NavBar mode={2} />
      <div className="login-frag">
        <div className="login-bg">
          <img src={loginBG} alt="loginBG"></img>
        </div>
        <div className="login-form" onSubmit={handleSubmit}>
          <form>
            <h1>Login</h1>
            <div className="user-input">
              <input
                type="text"
                id="userName"
                required
                onChange={(event) => setUsername(event.target.value)}
              ></input>
              <span>UserName</span>
            </div>
            <div className="user-input">
              <input
                type="password"
                id="userPassword"
                required
                onChange={(event) => setPassword(event.target.value)}
              ></input>
              <span>Password</span>
            </div>
            {loginFailed ? (
              <>
                <div className="loginFailed">{messageLoginFailed}</div>
                <span>
                  <NavLink to="/forgetpassword"> Forget your password ? </NavLink>
                </span>
              </>
            ) : null}
            <button className="btn btn--form" type="submit" value="Login">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
