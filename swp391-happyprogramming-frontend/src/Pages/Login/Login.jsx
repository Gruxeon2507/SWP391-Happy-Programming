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
  const [messageLoginFailed, setMessageLoginFailed] = useState("");

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
      const status =response.data.status;
      // Store the token in localStorage or a state management solution
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("status", status);

      window.location.href = "/";
    } catch (error) {
      console.log("login failed");
      setLoginFailed(true);
      console.error(error);
      // display an error message to the user
    }
  };

  return (
    <>
      <NavBar mode={2} />
      <section className="addition-color">
        <div className="color"></div>
        <div className="color"></div>
      </section>
      <div className="login-frag">
        <section className="login-bg">
          <img src={loginBG} alt="loginBG"></img>
        </section>
        <main className="login-form" onSubmit={handleSubmit}>
          <div className="backcolor"></div>
          <form>
            <h1>Login</h1>
            <div className="user-input">
              <input
                type="text"
                id="userName"
                required
                onChange={(event) => setUsername(event.target.value)}
              // placeholder="username"
              ></input>
              <span>UserName</span>
            </div>
            <div className="user-input">
              <input
                type="password"
                id="userPassword"
                required
                onChange={(event) => setPassword(event.target.value)}
              // placeholder="password"
              ></input>
              <span>Password</span>
            </div>
            <div className="login-msg">
              <span>
                <NavLink to="/forgetpassword"> Forget your password ? </NavLink>
              </span>
              {loginFailed ? <span>login failed</span> : <span>&nbsp;</span>}
            </div>
            <button className="btn btn--form" type="submit" value="Login">
              LOGIN
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
export default Login;
