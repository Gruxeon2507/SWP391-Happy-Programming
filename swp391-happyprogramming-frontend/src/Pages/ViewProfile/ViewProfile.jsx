import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import { useParams, Link } from "react-router-dom";

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
    roles: [
      {
        roleName: "",
      },
    ],
    skills: [
      {
        skillName: "",
      },
    ],
  });
  const [avatar, setAvatar] = useState(null);

  const viewCVOfMentor = (event) => {};

  useEffect(() => {
    axios
      .get(`http://localhost:1111/api/auth/profile/${id}`)
      .then((res) => {
        setUser(res.data);
        import(
          `../../../../swp391-happyprogramming-backend/avatar/${res.data.avatarPath}`
        )
          .then((image) => setAvatar(image.default))
          .catch((error) => console.log(error));
        console.log(res.data);
        setUser((prevUser) => ({
          ...prevUser,
          roles: res.data.roles,
          skills: res.data.skills,
        }));
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
      {(user.roles ?? []).some((role) => role.roleName === "mentor") ? (
        <>
          <div>
            <div>
              <h3>Skills: </h3>
              <ul>
                {user.skills.map((skill) => (
                  <li>{skill.skillName}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button>
              <Link
                to={"http://localhost:1111/api/public/pdf/" + id}
                target="_blank"
                x
              >
                View CV
              </Link>
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ViewProfile;
