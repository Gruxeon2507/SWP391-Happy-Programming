import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";

VerifyDialog.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

function VerifyDialog(props) {
  const [codex, setCodex] = useState("");
  const onChangeCode = (event) => {
    const inputcode = event.target.value;
    setCodex(inputcode);
  };

  const onSubmitVerify = (event) => {
    event.preventDefault();
    console.log(props.username);
    const formData = new FormData();
    formData.append("username", props.username);
    formData.append("code", codex);
    axios
      .post(`http://localhost:1111/api/auth/verify`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Verify Succesffully. Now you will return to home page.");
        window.location.href = "../";
      })
      .catch((error) => {
        console.log("Fail when verify");
        console.log(error);
      });
  };
  return (
    <div className="verifyDia">
      <div className="verifyDia-email">
        <h1>Verify Your Email Address</h1>
        <p>To continue, please verify your email: </p>
        <form onSubmit={onSubmitVerify}>
          <label>Enter your code OTP: </label>
          <input type="text" required onChange={onChangeCode} />
          <button>Verify</button>
        </form>
        <h3>{props.email}</h3>
      </div>
    </div>
  );
}

export default VerifyDialog;
