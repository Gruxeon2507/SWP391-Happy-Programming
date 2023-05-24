import React, { Component, useEffect, useState } from "react";
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
    dob: "",
    mail: "",
  });
  const [rePassword, setRePassword] = useState("");

  // Validate input
  const [checkUsernameDuplicate, setcheckUsernameDuplicate] = useState(true);

  const [checkRePassword, setCheckRePassword] = useState(true);
  const [MessageRePassword, setMessageRePassword] = useState("");
  const [messageVerify, setMessageVerify] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [showErrorUsername, setShowErrorUsername] = useState(false);

  const [errorPassword, setErrorPassword] = useState("");
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);

  const [errorEmailDuplicate, setErrorEmailDuplicate] = useState("");
  const [showErrorEmailDuplicate, setShowEmailDuplicate] = useState(false);

  const [errorDisplayname, setErrorDisplayname] = useState("");
  const [showErrorDisplayname, setShowErrorDisplayname] = useState(false);

  const [errorUsernameDuplicate, setErrorUsernameDuplicate] = useState("");
  const [showErrorUsernameDuplicate, setShowUsernameDuplicate] =
    useState(false);

  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

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

    try {
      const resp = await axios.get(
        `http://localhost:1111/api/auth/${inputUsername}`
      );
      if (resp.data === true) {
        setShowErrorUsername(true);
        setErrorUsername(`The username has taken`);
        return;
      }
    } catch (error) {
      console.log(error);
    }

    setShowErrorUsername(false);
    setErrorUsername(``);
    setUser({
      ...user,
      username: inputUsername,
    });
  };

  const onChangePassword = (event) => {
    const inputPassword = event.target.value;

    if (inputPassword.length < 6 || inputPassword < 60) {
      setShowErrorPassword(true);
      setErrorPassword(
        `Please input password that contains 6 to 60 characters`
      );
      return;
    }

    setShowErrorPassword(false);
    setErrorPassword(``);
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
      setMessageRePassword(``);
    }
  };

  const onChangeEmail = async (event) => {
    const inputEmail = event.target.value;

    if (inputEmail.length > 220) {
      setShowErrorEmail(true);
      setErrorEmail(`Please input password that do not contain oversize 220`);
      return;
    }

    try {
      const resp = await axios.get(
        `http://localhost:1111/api/auth/mail/${inputEmail}`
      );
      if (resp.data === true) {
        setShowEmailDuplicate(true);
        setErrorEmailDuplicate(`This email is taken`);
      }
    } catch (error) {
      console.log(error);
    }

    setShowErrorEmail(false);
    setErrorEmail(``);

    setUser({
      ...user,
      mail: inputEmail,
    });
  };

  const onChangeDisplayName = (event) => {
    const inputDisplayName = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (
      !regex.test(inputDisplayName) ||
      inputDisplayName.length < 6 ||
      inputDisplayName.length > 150
    ) {
      setShowErrorDisplayname(true);
      setErrorDisplayname(
        `Please just input characters and numbers and not empty and size just from 6 to 150`
      );
      return;
    }

    setShowErrorDisplayname(false);
    setErrorDisplayname(``);

    setUser({
      ...user,
      displayName: inputDisplayName,
    });
  };

  const onChangeDob = (event) => {
    const inputDob = event.target.value;
    setUser({
      ...user,
      dob: inputDob,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      checkRePassword ||
      showErrorUsername ||
      showErrorPassword ||
      showErrorDisplayname ||
      showErrorEmail ||
      showErrorUsernameDuplicate ||
      showErrorEmailDuplicate
    ) {
      let alertMessage = "";
      if (checkRePassword) {
        alertMessage = alertMessage + "RePassword: " + MessageRePassword + "\n";
      }
      if (showErrorUsername) {
        alertMessage = alertMessage + "Username: " + errorUsername + "\n";
      }

      if (showErrorUsernameDuplicate) {
        alertMessage =
          alertMessage + "Username: " + errorUsernameDuplicate + "\n";
      }

      if (showErrorPassword) {
        alertMessage = alertMessage + "Password: " + errorPassword + "\n";
      }

      if (showErrorDisplayname) {
        alertMessage =
          alertMessage + "Display Name: " + errorDisplayname + "\n";
      }

      if (showErrorEmail) {
        alertMessage = alertMessage + "Email: " + errorEmail + "\n";
      }

      if (showErrorEmailDuplicate) {
        alertMessage = alertMessage + "Email" + errorEmailDuplicate + "\n";
      }
      alert(alertMessage);
      return;
    }

    axios
      .post("http://localhost:1111/api/auth/users/mentor-account", user)
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
      <NavBar mode={1} />

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
              {showErrorUsername ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorUsername}
                  </div>
                </>
              ) : null}
              {showErrorUsernameDuplicate ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorUsernameDuplicate}
                  </div>
                </>
              ) : null}
              <div className="user-input">
                <input
                  type="password"
                  id="userPassword"
                  required
                  onChange={onChangePassword}
                ></input>
                <span>Password</span>
              </div>
              {showErrorPassword ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorPassword}
                  </div>
                </>
              ) : null}
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
                  type="text"
                  id="displayname-I"
                  required
                  onChange={onChangeDisplayName}
                ></input>
                <span>Display Name</span>
              </div>
              {showErrorDisplayname ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorDisplayname}
                  </div>
                </>
              ) : null}
              <div className="user-input">
                <input
                  type="date"
                  id="dob-I"
                  value={todayDate}
                  required
                  onChange={onChangeDob}
                ></input>
                <span>Date of Birth</span>
              </div>
              <div className="user-input">
                <input
                  type="email"
                  id="email-I"
                  required
                  onChange={onChangeEmail}
                ></input>
                <span>Email</span>
              </div>
              {showErrorEmail ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorEmail}
                  </div>
                </>
              ) : null}
              {showErrorEmailDuplicate ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorEmailDuplicate}
                  </div>
                </>
              ) : null}
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
