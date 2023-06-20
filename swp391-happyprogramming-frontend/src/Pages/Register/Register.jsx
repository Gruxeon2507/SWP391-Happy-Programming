import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import "./Register.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import resBG from "../../Assets/resBG.jpg";

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

  const [checkRePassword, setCheckRePassword] = useState(false);
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

  const [errorDob, setErrorDob] = useState("");
  const [showErrorDob, setShowErrorDob] = useState(false);
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const onChangeUsername = async (event) => {
    const inputUsername = event.target.value;

    const regex = /^[a-zA-Z0-9\s]*$/;
    if (inputUsername.length > 0 && (!regex.test(inputUsername) ||
      inputUsername.length < 6 ||
      inputUsername.length > 150
    )) {
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

    if (inputPassword.length > 0 && (inputPassword.length < 6 || inputPassword < 60)) {
      setShowErrorPassword(true);
      setErrorPassword(
        `Please input password that contains 6 to 60 characters`
      );
      return;
    }

    if (inputPassword != rePassword) {
      setCheckRePassword(true);
      setMessageRePassword("Re Password not match");
    } else {
      setCheckRePassword(false);
      setMessageRePassword(``);
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
    if (inputRePassword.length > 0 && inputRePassword != user.password) {
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
      inputDisplayName.length > 0 && (
        !regex.test(inputDisplayName) ||
        inputDisplayName.length < 6 ||
        inputDisplayName.length > 150
      )
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

    const today = new Date();
    const selectedDate = new Date(inputDob);
    const ageDifference = today.getFullYear() - selectedDate.getFullYear();
    if (ageDifference < 18) {
      setShowErrorDob(true);
      setErrorDob("You must be at least 18 years old.");
      return;
    }
    setShowErrorDob(false);
    setErrorDob("");
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
      showErrorEmailDuplicate ||
      showErrorDob
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
      if (showErrorDob) {
        alertMessage = alertMessage + "Date of birth" + errorDob + "\n";
      }
      alert(alertMessage);
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
    <>
      <NavBar mode={3} />

      {messageVerify ? (
        <VerifyDialog email={user.mail} username={user.username} />
      ) : (
        <div className="regis-frag">
          <div className="res-bg">
            <h1>
              Sign up to HPYPRO
            </h1>
            <img src={resBG} alt="resbg"></img>
            {/* <q style={{ color: "var(--item2)", fontSize: "1.3rem" }}>Embrace yourself on the path of knowledge.</q> */}
          </div>
          <div className="regis-form">
            <form onSubmit={handleSubmit} className="regis-form-input">
              <table>
                <tr>
                  <td colSpan={2}>
                    <div className={`user-input ${showErrorUsername ? "fault" : ""}`}>
                      <input
                        type="text"
                        id="userName"
                        required
                        onChange={onChangeUsername}
                      ></input>
                      <span>UserName</span>
                    </div>
                    {/* <div className={`input-tooltip ${showErrorUsername ? "fault" : ""}`}>
                      <div className="err-msg">
                        <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                      </div>
                      <ion-icon name="help-circle-outline"></ion-icon>
                    </div> */}
                    <div className={`--err--msg ${(showErrorUsername || showErrorUsernameDuplicate) ? "fault" : ""}`}>
                      <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className={`user-input ${showErrorPassword ? "fault" : ""}`}>
                      <input
                        type="password"
                        id="userPassword"
                        required
                        onChange={onChangePassword}
                      ></input>
                      <span>Password</span>
                    </div>
                    {/* <div className={`input-tooltip ${showErrorPassword ? "fault" : ""}`}>
                      <div className="err-msg">
                        <span>something of password</span>
                      </div>
                      <ion-icon name="help-circle-outline"></ion-icon>
                    </div> */}
                    <div className={`--err--msg ${showErrorPassword ? "fault" : ""}`}>
                      <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                    </div>
                  </td>
                </tr>
                {/* <tr>
                  <td colSpan={2}>
                    {showErrorPassword ? (
                      <>
                        <div className="w-message" style={{ color: "black" }}>
                          {errorPassword}
                        </div>
                      </>
                    ) : null}
                  </td>
                </tr> */}
                <tr>
                  <td colSpan={2}>
                    <div className={`user-input ${checkRePassword ? "fault" : ""}`}>
                      <input
                        type="password"
                        id="re-userPassword"
                        required
                        onChange={onChangeRePassword}
                      ></input>
                      <span >Re Enter Password</span>
                    </div>
                    {/* <div className={`input-tooltip ${checkRePassword ? "fault" : ""}`}>
                      <div className="err-msg">
                        <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                      </div>
                      <ion-icon name="help-circle-outline"></ion-icon>
                    </div> */}
                    <div className={`--err--msg ${checkRePassword ? "fault" : ""}`}>
                      <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={1} style={{ width: "50%" }}>
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
                  </td>
                  <td colSpan={1}>
                    <div className={`user-input ${showErrorDisplayname ? "fault" : ""}`}>
                      <input
                        type="text"
                        id="displayname-I"
                        required
                        onChange={onChangeDisplayName}
                      ></input>
                      <span>Display Name</span>
                    </div>
                    {/* <div className={`input-tooltip ${showErrorDisplayname ? "fault" : ""}`}>
                      <div className="err-msg">
                        <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                      </div>
                      <ion-icon name="help-circle-outline"></ion-icon>
                    </div> */}
                    <div className={`--err--msg ${showErrorDisplayname ? "fault" : ""}`}>
                      <span> 6 to 150</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <div className="user-input">
                      <input
                        type="email"
                        id="email-I"
                        required
                        onChange={onChangeEmail}
                      ></input>
                      <span>Email</span>
                    </div>
                    {/* <div className={`input-tooltip ${showErrorEmail ? "fault" : ""}`}>
                      <div className="err-msg">
                        <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                      </div>
                      <ion-icon name="help-circle-outline"></ion-icon>
                    </div> */}
                    <div className={`--err--msg ${showErrorEmail ? "fault" : ""}`}>
                      <span>Please just input characters and numbers and not empty and size just from 6 to 150</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button type="submit">Sign Up</button>
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
