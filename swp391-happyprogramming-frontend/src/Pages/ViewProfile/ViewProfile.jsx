import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import { useParams, Link } from "react-router-dom";
import "./ViewProfile.css";
import { Nav } from "react-bootstrap";
import { notiError, notiSuccess } from "../../Components/Notification/notify";

function ViewProfile(props) {
  const { id } = useParams();
  const [username, setUsername] = useState("");

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
        skillId: "",
        skillName: "",
      },
    ],
  });
  const token = window.localStorage.getItem("token");
  const [avatar, setAvatar] = useState(null);

  /**
   * Constant
   */

  //avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [showErrorAvatar, setShowErrorAvatar] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState("");
  const [editAvatar, setEditAvatar] = useState(false);

  //cv
  const [pdfFile, setPdfFile] = useState(null);
  const [showErrorPdf, setShowErrorPdf] = useState(false);
  const [errorPdf, setErrorPdf] = useState("");
  const [editPdf, setEditPdf] = useState(false);

  //displayName
  const [editDisplayName, setEditDisplayName] = useState(false);
  const [errorDisplayname, setErrorDisplayname] = useState("");
  const [showErrorDisplayname, setShowErrorDisplayname] = useState(false);

  //date of birth
  const [editDateOfBirth, setEditDateOfBith] = useState(false);

  //skill
  const [avgRate, setAvgRate] = useState("");
  const [editCreateSkill, setEditCreateSkill] = useState(false);
  const [errorCreateSkill, setErrorCreateSkill] = useState("");
  const [showErrorCreateSkill, setShowErrorCreateSkill] = useState(false);
  const [createSkillName, setCreateSkillName] = useState("");
  const viewCVOfMentor = (event) => { };

  //rating course
  const [comment, setComment] = useState("");
  const [errorComment, setErrorComment] = useState("");
  const [showErrorComment, setShowErrorComment] = useState(false);
  const [noStar, setNoStar] = useState("1");

  const [showPopupRating, setShowPopupRating] = useState(false);
  const [showPopupAllRating, setShowPopupAllRating] = useState(false);
  const [courses, setCourses] = useState([
    {
      courseId: "",
      courseName: "",
    },
  ]);

  const [ratings, setRatings] = useState([]);
  const [editRateInfo, setEditRateInfo] = useState(false);

  /**
   * Handle input, submit
   */

  //rating course
  const editShowPopupRating = () => {
    setShowPopupRating(!showPopupRating);
  };
  const editShowPopupAllRating = () => {
    setShowPopupAllRating(!showPopupAllRating);
  };
  const handleEditRateInfo = () => {
    setEditRateInfo(!editRateInfo);
  };
  const handleNoStar = (event) => {
    const inputStar = event.target.value;
    setNoStar(inputStar);
  };

  const onClickNoStar = (value) => {
    setNoStar(value);
  };
  const onChangeComment = (event) => {
    const inputComment = event.target.value;
    const regex =
      /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹế\s_]+$/;
    if (!regex.test(inputComment)) {
      setShowErrorComment(true);
      setErrorComment(
        `Please just input characters and numbers and not empty and size just from 6 to 150`
      );
      return;
    }

    setShowErrorComment(false);
    setErrorComment(``);
    setComment(inputComment);
  };
  const handleRateMentor = async (event, courseId) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(`username`, id);
    formData.append(`courseId`, courseId);
    formData.append(`comment`, comment);
    formData.append(`noStar`, noStar);
    await axios
      .post(`http://localhost:1111/api/ratings/rates`, formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        console.log("Rate ok");
        notiSuccess();
      })
      .catch((error) => {
        console.log(error);
        console.log("Rate failed");
        notiError();
      });

    await axios
      .get(`http://localhost:1111/api/courses/ratingCourse/${id}`, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        setCourses(res.data);
        console.log(courses);
      })
      .catch((error) => {
        console.log(error + " When get courses");
      });
    await axios
      .get(`http://localhost:1111/api/ratings/rate/${id}`)
      .then((res) => {
        setRatings(res.data);
        console.log(res.data);
        console.log(ratings);

      })
      .catch((error) => {
        console.log(error);
        console.log("Error when get ratings");
      });
    await axios
      .get(`http://localhost:1111/api/ratings/avg/${id}`)
      .then((res) => {
        setAvgRate(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("get avg stars wrong");
      });
  };

  //create skill
  const handleEditCreateSkill = () => {
    setEditCreateSkill(!editCreateSkill);
  };

  const onChangeCreateSkill = (event) => {
    const inputSkill = event.target.value;
    setCreateSkillName(inputSkill);
  };

  const handleCreateSkill = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(`username`, id);
    formData.append(`skillName`, createSkillName);
    axios
      .post(`http://localhost:1111/api/users/profile/skill/create`, formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        // console.log(res.data);
        notiSuccess();
      })
      .catch((error) => {
        // console.log(error);
        notiError();
      });
    window.location.href = "";
  };

  // Upload Avatar Path
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

  const handleEditAvatarPath = () => {
    setEditAvatar(!editAvatar);
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
        // console.log(res.data);
        window.location.reload();
        notiSuccess();
      })
      .catch((error) => {
        // console.log("Error when update avatar user" + error);
        // alert("Error when update avatar");
        notiError();
      });
  };
  // Upload CV File
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
  const handleEditCVPath = () => {
    setEditPdf(!editPdf);
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

  // Update all
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("displayName", user.displayName);
    formData.append("dob", user.dob);
    axios
      .post(`http://localhost:1111/api/users/profile/update`, formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error when update profile" + error);
        alert("Error when update avatar");
      });
  };

  // Upload DisplayName
  const handleEditDisplayName = () => {
    setEditDisplayName(!editDisplayName);
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

  //Upload Date Of Birth
  const handleEditDateOfBirth = () => {
    setEditDateOfBith(!editDateOfBirth);
  };
  const onChangeDob = (event) => {
    const inputDob = event.target.value;
    setUser({
      ...user,
      dob: inputDob,
    });
  };

  // Skill handle
  const handleDeleteSkill = (event, skillId) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", id);
    formData.append("skillId", skillId);
    axios
      .post(`http://localhost:1111/api/users/profile/skill/delete`, formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        // console.log(res.data);
        notiSuccess();
      })
      .catch((error) => {
        // console.log(error);
        notiError();
      });
    window.location.href = "";
  };
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
    axios
      .get(`http://localhost:1111/api/courses/ratingCourse/${id}`, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        setCourses(res.data);
        console.log(courses);
      })
      .catch((error) => {
        console.log(error + " When get courses");
      }); // Replace with your actual API endpoint
    axios
      .get(`http://localhost:1111/api/ratings/rate/${id}`)
      .then((res) => {
        setRatings(res.data);
        console.log(res.data);
        console.log(ratings);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error when get ratings");
      });
    axios
      .get(`http://localhost:1111/api/ratings/avg/${id}`)
      .then((res) => {
        setAvgRate(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("get avg stars wrong");
      });
  }, [id]);
  useEffect(() => {
    console.log(ratings);
  }, [ratings]);

  const requestHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const requestHeadersFormdata = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .post(`http://localhost:1111/api/auth/token`, null, {
        headers: requestHeaders,
      })
      .then((res) => {
        // console.log(res.data);
        setUsername(res.data);
      })
      .catch((error) => {
        console.log("Error when get token : " + error);
      });
  });

  // useEffect(() => {
  //   const formData = new FormData();
  //   formData.append("username", id);
  //   const response = axios
  //     .get(`http://localhost:1111/api/courses/ratingCourse`, formData, {
  //       headers: requestHeadersFormdata,
  //     })
  //     .then((res) => {
  //       setCourses(res.data);
  //       console.log(courses);
  //     })
  //     .catch((error) => {
  //       console.log(error + " When get courses");
  //     }); // Replace with your actual API endpoint
  // }, [id]);

  return (
    <>
      <NavBar mode={1}></NavBar>
      <main className="upf-main">
        <section className="upf-section">
          <div className="upf-info">
            {/* <label>Avatar</label> */}
            <div className="upf-avt">
              {/* <img src={avatar} alt="User Avatar" /> */}
              {/* <img src={"http://localhost:1111/api/users/avatar/" + user.username} alt="User Avatar" /> */}
              <img src={"http://localhost:1111/api/users/avatar/" + id} alt="User Avatar" />
            </div>
          </div>
          {username === id ? (
            <>
              <div className="upf-edit-section">
                {editAvatar ? (
                  <>
                    <form onSubmit={handleSubmitAvatar}>
                      <div>
                        <lable>Upload Avatar</lable>
                        <input
                          type="file"
                          name="avatarPath"
                          onChange={onChangeAvatarPath}
                          required
                        />
                      </div>
                      <button>Update avatar</button>
                      {showErrorAvatar ? (
                        <>
                          <div className="w-message" style={{ color: "black" }}>
                            {errorAvatar}
                          </div>
                        </>
                      ) : null}
                    </form>
                  </>
                ) : null}
              </div>
              <div className="upf-edt-btn">
                <button onClick={handleEditAvatarPath}>Change Avatar</button>
              </div>
            </>
          ) : null}
        </section>
        <section className="upf-section">
          <div className="upf-info">
            <label>Email: </label>
            <span>{user.mail}</span>

          </div>
        </section>
        <section className="upf-section">
          {username === id ? (
            <>
              <div className="upf-info">
                <label>Displayname</label>
                <span style={{ display: editDisplayName ? "none" : "block" }}>
                  {user.displayName}
                </span>
              </div>
              <div className="upf-edit-section">
                {editDisplayName ? (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <input
                          type="text"
                          value={user.displayName}
                          onChange={onChangeDisplayName}
                        />
                        <button>Update DisplayName</button>
                      </div>
                    </form>
                    {showErrorDisplayname ? (
                      <>
                        <div className="w-message" style={{ color: "black" }}>
                          {errorDisplayname}
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {/* <div>
                <label>Displayname</label>
                <h3 style={{ display: editDisplayName ? "none" : "block" }}>
                {user.displayName}
                </h3>
              </div> */}
                  </>
                )}
              </div>
              <div className="upf-edt-btn">
                <button onClick={handleEditDisplayName}>Change DisplayName</button>
              </div>
            </>
          ) : (
            <>
              <div className="upf-info">
                <label>Display Name</label>
                <span>{user.displayName}</span>
              </div>
            </>
          )}
        </section>
        <section className="upf-section">
          <div className="upf-info">
            <div style={{ margin: "1rem 0" }}>
              <label>Member since: </label>
              <span>{new Date(user.createdDate).toLocaleDateString(`en-GB`)}</span>
            </div>
          </div>
        </section>
        <section className="upf-section">
          {(user.roles ?? []).some((role) => role.roleName === "mentor") ? (
            <>
              <div className="upf-info">
                <label>
                  Avg rate stars :{" "}
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      style={{
                        color: value <= avgRate ? "gold" : "gray",
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </label>
              </div>
              <div className="upf-edit-section">
                {(user.roles ?? []).some((role) => role.roleName === "mentor") ? (
                  <>
                    {username != "" ? (
                      <>
                        {" "}
                        <button onClick={editShowPopupRating}>Rating Users</button>

                      </>
                    ) : null}
                  </>
                ) : null}
              </div>
              <div className="upf-edt-btn">
                <button onClick={editShowPopupAllRating}>View All Rating</button>
              </div>

            </>
          ) : null}
        </section>
        <section className="upf-section">
          {username === id ? (
            <>

              <div className="upf-info">
                <label>Date Of Birth</label>
                <span style={{ display: editDateOfBirth ? "none" : "block" }}>
                  {new Date(user.dob).toLocaleDateString(`en-GB`)}
                </span>
              </div>

              <div className="upf-edit-section">
                {editDateOfBirth ? (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="user-input">
                        <input
                          type="date"
                          id="dob-I"
                          value={user.dob}
                          required
                          onChange={onChangeDob}
                        ></input>
                        <button>Update Date Of Birth</button>
                      </div>
                    </form>

                    {showErrorDisplayname ? (
                      <>
                        <div className="w-message" style={{ color: "black" }}>
                          {errorDisplayname}
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    {/* <div>
                <label>Displayname</label>
                <h3 style={{ display: editDisplayName ? "none" : "block" }}>
                  {user.displayName}
                </h3>
              </div> */}
                  </>
                )}
              </div>
              <div className="upf-edt-btn">
                <button onClick={handleEditDateOfBirth}>
                  Change Date Of Birth
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="upf-info">
                <label>Date Of Birth</label>
                <span style={{ display: editDateOfBirth ? "none" : "block" }}>
                  {new Date(user.dob).toLocaleDateString(`en-GB`)}
                </span>
              </div>
            </>
          )}
        </section>

        {(user.roles ?? []).some((role) => role.roleName === "mentor") ? (
          <>
            <section className="upf-section">
              <div className="upf-info">

                <ul>
                  <li>
                    <span>Skills: </span>
                  </li>
                  {user.skills.map((skill) => (
                    <li>
                      <form
                        onSubmit={(event) =>
                          handleDeleteSkill(event, skill.skillId)
                        }
                      >
                        <div className="i-c">
                          <span>{skill.skillName}</span>
                          <button><ion-icon name="remove-circle-outline"></ion-icon></button>
                        </div>
                      </form>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="upf-edit-section">
                {editCreateSkill ? (
                  <>
                    <form onSubmit={handleCreateSkill}>
                      <div>
                        <label>Skill</label>
                        <input
                          type="text"
                          required
                          onChange={onChangeCreateSkill}
                        ></input>
                        <button>Create</button>
                      </div>
                    </form>
                  </>
                ) : null}
              </div>
              {id === username ? <> <div className="upf-edt-btn">
                <button onClick={handleEditCreateSkill}>Create a skill</button>
              </div></> : <></>}
            </section>

            <section className="upf-section">
              <div className="upf-info">
                <button id="viewCV-Bttn">
                  <Link
                    to={"http://localhost:1111/api/public/pdf/" + id}
                    target="_blank"
                  >
                    View CV
                  </Link>
                </button>
              </div>
              <div className="upf-edit-section">
                {username === id ? (
                  <>
                    {editPdf ? (
                      <>
                        <form onSubmit={handleSubmitPdf}>
                          <div>
                            <lable>Upload Pdf</lable>
                            <input
                              type="file"
                              name="pdfPath"
                              onChange={onChangePdfPath}
                              required
                            />
                          </div>
                          <button>Update Pdf</button>
                        </form>
                        {showErrorPdf ? (
                          <>
                            <div className="w-message" style={{ color: "black" }}>
                              {errorPdf}
                            </div>
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
              </div>
              {id === username ? <><div className="upf-edt-btn">
                <button onClick={handleEditCVPath}>Change CV</button>
              </div></> : <></>}

            </section>
          </>
        ) : null}

      </main>
      <div>
        {showPopupRating ? (
          <>
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={editShowPopupRating}>
                  &times;
                </span>
                <h2>Courses Being Taught</h2>
                <ul>
                  {courses.length === 0 ? "You'd already voted or not yet enrolled in this mentor's course!" : ""}
                  {courses.map((course, index) => (
                    <li key={index}>
                      {course.courseName}
                      <button onClick={handleEditRateInfo}>Rate</button>
                      {editRateInfo ? (
                        <>
                          {" "}
                          <form
                            onSubmit={(event) =>
                              handleRateMentor(event, course.courseId)
                            }
                          >
                            Vote Star:
                            <div>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                  key={value}
                                  onClick={() => onClickNoStar(value)}
                                  style={{
                                    cursor: "pointer",
                                    color:
                                      value <= noStar ? "gold" : "gray",
                                  }}
                                >
                                  &#9733;
                                </span>
                              ))}
                            </div>
                            <label>Comment:</label>
                            <input
                              type="text"
                              required
                              onChange={onChangeComment}
                            ></input>
                            {showErrorComment ? (
                              <>
                                <div
                                  className="w-message"
                                  style={{ color: "black" }}
                                >
                                  {errorComment}
                                </div>
                              </>
                            ) : null}
                            <button>Rate Mentor</button>
                          </form>
                        </>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : null}
        {showPopupAllRating ? (
          <>
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={editShowPopupAllRating}>
                  &times;
                </span>
                {ratings.map((rating) => (
                  <div>
                    <div>
                      <Link
                        to={`/profile/${rating.ratingKey.ratedFromUser}`}
                      >
                        {rating.ratingKey.ratedFromUser}
                      </Link>{" "}
                      voted {rating.noStar} Stars
                    </div>
                    <div>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          style={{
                            color:
                              value <= rating.noStar ? "gold" : "gray",
                          }}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <div>
                      <label>Comment: </label>
                      {rating.ratingComment}
                    </div>
                    About{" "}
                    <div>
                      <Link to={`/courses/${rating.course.courseId}`}>
                        {rating.course.courseName}
                      </Link>
                    </div>
                    -------------------------------------------
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ViewProfile;
