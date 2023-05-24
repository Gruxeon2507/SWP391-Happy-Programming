import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import { useParams } from "react-router-dom";

function ViewProfile(props) {
  const { id } = useParams();

  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    mail: "",
    avatarPath: "",
    dob: "",
    createdDate: "",
  });

  const avatar = require(`../../../../swp391-happyprogramming-backend/avatar/${user.avatarPath}`);

  useEffect(() => {
    axios
      .get(`http://localhost:1111/api/auth/profile/${id}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div>
        <label>Avatar</label>
        <div>
          <img src={avatar} alt="User Avatar" />
        </div>
      </div>
      <div>
        <label>Username</label>
        <h1>{user.username}</h1>
      </div>
      <div>
        <label>Display Name</label>
        <h2>{user.displayName}</h2>
      </div>
      <div>
        <label>Date of birth</label>
        <p>{new Date(user.dob).toLocaleDateString(`en-GB`)}</p>
      </div>

      <div>
        <label>Created Date</label>
        <p>{new Date(user.createdDate).toLocaleDateString(`en-GB`)}</p>
      </div>
    </div>
  );
}

export default ViewProfile;
