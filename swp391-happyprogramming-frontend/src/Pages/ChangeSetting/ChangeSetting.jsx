import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import "./ChangeSetting.css"

function ChangeSetting(props) {
  const [onBtnSubmit, setOnBtnSubmit] = useState(false);
  const [id, setId] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    displayName: "",
    avatarPath: "",
    dob: "",
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

  const [checkMentorRole, setCheckMentorRole] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarSource, setAvatarSource] = useState("http://localhost:1111/api/users/avatar/" + user.username);

  const [avatarFile, setAvatarFile] = useState(null);
  const [showErrorAvatar, setShowErrorAvatar] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState("");

  const [pdfFile, setPdfFile] = useState(null);
  const [showErrorPdf, setShowErrorPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState("");

  const [errorDisplayname, setErrorDisplayname] = useState("");
  const [showErrorDisplayname, setShowErrorDisplayname] = useState(false);

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

  const onChangePdfPath = (event) => {
    const inputPdfFile = event.target.files[0];
    if (!inputPdfFile) {
      setShowErrorPdf(true);
      setErrorPdf("Wrong file type (Please input PDF File) and less than 5MB");
      return;
    }
    if (inputPdfFile.size > 1024 * 1024 * 5) {
      setShowErrorPdf(true);
      setErrorPdf("Wrong file type (Please input PDF File) and less than 5MB");
      return;
    }
    if (inputPdfFile.type !== "application/pdf") {
      setShowErrorPdf(true);
      setErrorPdf("Wrong file type (Please input PDF File) and less than 5MB");
      return;
    }
    setShowErrorPdf(false);
    setErrorPdf("");
    setPdfFile(inputPdfFile);
  };

  const handleSubmitPdf = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("pdfFile", pdfFile);

    axios
      .post("http://localhost:1111/api/users/pdf/upload", formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error when update pdf of users" + error);
      });
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
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error when update avatar user" + error);
        alert("Error when update avatar");
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
    setOnBtnSubmit(false);
    axios
      .get(`http://localhost:1111/api/auth/profile/${id}`)
      .then((res) => {
        setUser(res.data);
        import(
          `../../../../swp391-happyprogramming-backend/avatar/${res.data.avatarPath}`
        )
          .then((image) => setAvatar(image.default))
          .catch((error) => console.log(error));
        setUser((prevUser) => ({
          ...prevUser,
          roles: res.data.roles,
          skills: res.data.skills,
        }));
      })
      .catch((error) => {
        console.log("Error when get user profile : " + error);
      });

    // const avatar = require(`../../../../swp391-happyprogramming-backend/avatar/${user.avatarPath}`);
    // setAvatar(avatar);
  }, [id], [onBtnSubmit]);

  // const handleBtnClick = () => {
  //   setOnBtnSubmit(true);
  //   // setAvatarSource("http://localhost:1111/api/users/avatar/" + user.username);
  //   handleSubmitAvatar();
  // };

  useEffect(() => {
    axios
      .post(`http://localhost:1111/api/auth/token`, null, {
        headers: requestHeaders,
      })
      .then((res) => {
        // console.log(res.data);
        setId(res.data);
      })
      .catch((error) => {
        console.log("Error when get token : " + error);
      });
  }, []);

  return (
    <>
      <NavBar mode={1} />
      <main className="changesetting-main-content">
        <section className="u-s-avt">
          <form onSubmit={handleSubmitAvatar}>
            <div className="u-pf-avt">
              <img src={"http://localhost:1111/api/users/avatar/" + user.username} alt="User Avatar" />
            </div>
            <lable>Upload Avatar</lable>
            <input
              type="file"
              name="avatarPath"
              onChange={onChangeAvatarPath}
              required
            />

            <button>Update avatar</button>
            {showErrorAvatar ? (
              <>
                <div className="w-message" style={{ color: "black" }}>
                  {errorAvatar}
                </div>
              </>
            ) : null}
          </form>
        </section>
        <section className="u-s-display-inf">
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
              <div></div>
            </div>

            <button>Update</button>
          </form>
        </section>
        {(user.roles ?? []).some((role) => role.roleName === "mentor") ? (
          <section className="u-s-mentor-cv">
            <form onSubmit={handleSubmitPdf}>
              <div>
                <label>Pdf file</label>
              </div>
              <div>
                <lable>Upload Pdf</lable>
                <input
                  type="file"
                  name="pdfPath"
                  onChange={onChangePdfPath}
                  required
                />
              </div>
              {showErrorPdf ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorPdf}
                  </div>
                </>
              ) : null}
              <button>Update Pdf</button>
            </form>
          </section>
        ) : null}



        {/* <form onSubmit={handleSubmitPdf}>
        <div>
          <label>Pdf</label>
          <div></div>
        </div>
        <div>
          <lable>Upload Pdf</lable>
          <input
            type="file"
            name="pdfPath"
            onChange={onChangePdfPath}
            required
          />
        </div>
        {showErrorPdf ? (
          <>
            <div className="w-message" style={{ color: "black" }}>
              {errorPdf}
            </div>
          </>
        ) : null}
        <button>Update Pdf</button>
      </form> */}
      </main>
    </>
  );
}

export default ChangeSetting;
