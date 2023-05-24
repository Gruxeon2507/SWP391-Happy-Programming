import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";

function ChangeSetting(props) {
  const [id, setId] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    avatarPath: "",
    dob: "",
  });

  const token = window.localStorage.getItem("token");

  const onChangeDob = (event) => {
    const inputDob = event.target.value;

    setUser({
      ...user,
      dob: inputDob,
    });
  };

  const onChangeDisplayName = (event) => {
    const inputDisplayName = event.target.value;

    setUser({
      ...user,
      displayName: inputDisplayName,
    });
  };

  const onChangeAvatarPath = (event) => {};

  const handleSubmitAvatar = (event) => {};

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:1111/api/users/profile/update`, user, {
        headers: requestHeaders,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error when update profile" + error);
      });
  };

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const avatar = require(`../../../../swp391-happyprogramming-backend/avatar/${user.avatarPath}`);

  useEffect(() => {
    // console.log(token);

    axios
      .post(`http://localhost:1111/api/auth/token`, null, {
        headers: requestHeaders,
      })
      .then((res) => {
        console.log(res.data);
        setId(res.data);
      })
      .catch((error) => {
        console.log("Error when get token : " + error);
      });
    axios
      .get(`http://localhost:1111/api/auth/profile/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .then((error) => {
        console.log("Error when get user profile : " + error);
      });
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <form onSubmit={handleSubmitAvatar}>
          <div>
            <label>Avatar</label>
            <div>
              <img src={avatar} alt="User Avatar" />
            </div>
          </div>
          <div>
            <lable>Upload Avatar</lable>
            <input
              type="file"
              name="avatarPath"
              onChange={onChangeAvatarPath}
            />
          </div>
        </form>
        <div>
          <label>Displayname</label>
          <input
            type="text"
            value={user.displayName}
            onChange={onChangeDisplayName}
          />
        </div>
        <div>
          <label>Date of birth</label>
          <input type="date" value={user.dob} onChange={onChangeDob} />
        </div>
      </div>

      <button>Update</button>
    </form>
  );
}

export default ChangeSetting;
