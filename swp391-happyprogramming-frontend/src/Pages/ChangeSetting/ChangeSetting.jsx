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

  const [avatarFile, setAvatarFile] = useState(null);
  const [showErrorAvatar, setShowErrorAvatar] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState("");

  const [avatar, setAvatar] = useState(null);

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

  const onChangeAvatarPath = (event) => {
    const inputAvatar = event.target.files[0];
    if (!inputAvatar) {
      setShowErrorAvatar(true);
      setErrorAvatar(
        "Wrong file type (Please input JPG File) and less than 5MB"
      );
      return;
    }
    if (inputAvatar.size > 1024 * 1024 * 5) {
      setShowErrorAvatar(true);
      setErrorAvatar(
        "Wrong file type (Please input JPG File) and less than 5MB"
      );
      return;
    }
    if (!inputAvatar.type.includes("image/jpeg")) {
      setShowErrorAvatar(true);
      setErrorAvatar(
        "Wrong file type (Please input JPG File) and less than 5MB"
      );
      return;
    }
    setShowErrorAvatar(false);
    setErrorAvatar("");
    setAvatarFile(inputAvatar);
  };

  const handleSubmitAvatar = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("avatarFile", avatarFile);
    axios
      .post("http://localhost:1111/api/users/avatar/upload", formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error when update avatar user" + error);
      });
  };

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

  const requestHeadersFormdata = {
    Authorization: `Bearer ${token}`,
  };

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
        import(
          `../../../../swp391-happyprogramming-backend/avatar/${res.data.avatarPath}`
        )
          .then((image) => setAvatar(image.default))
          .catch((error) => console.log(error));
      })
      .then((error) => {
        console.log("Error when get user profile : " + error);
      });
    // const avatar = require(`../../../../swp391-happyprogramming-backend/avatar/${user.avatarPath}`);
    // setAvatar(avatar);
  }, [id]);

  return (
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
            required
          />
        </div>
        {showErrorAvatar ? (
          <>
            <div className="w-message" style={{ color: "black" }}>
              {errorAvatar}
            </div>
          </>
        ) : null}
        <button>Update avatar</button>
      </form>
      <form onSubmit={handleSubmit}>
        <div>
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
    </div>
  );
}

export default ChangeSetting;
