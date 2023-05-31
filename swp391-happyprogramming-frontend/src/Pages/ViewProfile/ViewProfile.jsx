import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import { useParams } from "react-router-dom";
import "./ViewProfile.css"
import { Nav } from "react-bootstrap";

function ViewProfile(props) {
  const { id } = useParams();

  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    mail: "",
    dob: "",
    createdDate: "",
  });

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
    <>
      <NavBar mode={1} />
      <div className="user-pf-content">
        <table className="upf-table">
          <thead>
            <tr>
              <td colSpan={3}>
                <h1>User Profile</h1>
              </td>
            </tr>
          </thead>
          <tr>
            <td>
              <label>Username</label>
            </td>
            <td>
              <h2>{user.username}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <label>Display Name</label>
            </td>
            <td>
              <h2>{user.displayName}</h2>
            </td>
          </tr>
          <tr>
            <td>
              <label>Date of birth</label>
            </td>
            <td>
              <p>{new Date(user.dob).toLocaleDateString(`en-GB`)}</p>
            </td>
          </tr>
          <tr>
            <td>
              <label>Member since: </label>
            </td>
            <td>
              <p>{new Date(user.createdDate).toLocaleDateString(`en-GB`)}</p>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default ViewProfile;
