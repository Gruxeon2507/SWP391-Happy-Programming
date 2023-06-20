import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";



function VerifyDialog(props) {
  const { username } = useParams();
  const [codex, setCodex] = useState("");
  const onChangeCode = (event) => {
    const inputcode = event.target.value;
    setCodex(inputcode);
  };

  const onSubmitVerify = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("code", codex);

    axios
      .post(`http://localhost:1111/api/auth/verify`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data != "") {
          alert("Verify Succesffully. Now you will return to home page.");
          window.location.href = "../";
        } else {
          alert("Your OTP code is wrong please enter again");
        }
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
        <h3>{username}</h3>
      </div>
    </div>
  );
}

export default VerifyDialog;
