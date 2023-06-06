import React, { Component, useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "../../Components/Navbar/NavBar.css";
import axios from "axios";
import { Button } from "bootstrap";
import VerifyDialog from "../../Components/RegisterForm/VerifyDialog";
import { useParams, Link } from "react-router-dom";
import "./ViewProfile.css";
import { Nav } from "react-bootstrap";

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
  const [editCreateSkill, setEditCreateSkill] = useState(false);
  const [errorCreateSkill, setErrorCreateSkill] = useState("");
  const [showErrorCreateSkill, setShowErrorCreateSkill] = useState(false);
  const [createSkillName, setCreateSkillName] = useState("");
  const viewCVOfMentor = (event) => {};

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
  const handleRateMentor = (event, courseId) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(`username`, id);
    formData.append(`courseId`, courseId);
    formData.append(`comment`, comment);
    formData.append(`noStar`, noStar);
    axios
      .post(`http://localhost:1111/api/ratings/rates`, formData, {
        headers: requestHeadersFormdata,
      })
      .then((res) => {
        console.log("Rate ok");
      })
      .catch((error) => {
        console.log(error);
        console.log("Rate failed");
      });
    window.location.href = "";
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
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
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
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Error when update avatar user" + error);
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
      })
      .catch((error) => {
        console.log("Error when update profile" + error);
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
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
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
    <div>
      <div>
        <label>Avatar</label>
        <div>
          <img src={avatar} alt="User Avatar" />
        </div>
        {username === id ? (
          <>
            <div>
              <button onClick={handleEditAvatarPath}>Change Avatar</button>
            </div>
            {editAvatar ? (
              <>
                <div>
                  <form>
                    <div>
                      <lable>Upload Avatar</lable>
                      <input
                        type="file"
                        name="avatarPath"
                        onChange={onChangeAvatarPath}
                        required
                      />
                    </div>
                    <button onSubmit={handleSubmitAvatar}>Update avatar</button>
                  </form>
                </div>
                {showErrorAvatar ? (
                  <>
                    <div className="w-message" style={{ color: "black" }}>
                      {errorAvatar}
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}
      </div>
      <div>
        <label>Username</label>
        <h1>{user.username}</h1>
      </div>

      {username === id ? (
        <>
          <div>
            <button onClick={handleEditDisplayName}>Change DisplayName</button>
          </div>
          <div>
            <label>Displayname</label>
            <h3 style={{ display: editDisplayName ? "none" : "block" }}>
              {user.displayName}
            </h3>
          </div>

          {editDisplayName ? (
            <>
              <div>
                <form>
                  <div>
                    <input
                      type="text"
                      value={user.displayName}
                      onChange={onChangeDisplayName}
                    />
                    <button onSubmit={handleSubmit}>Update DisplayName</button>
                  </div>
                </form>
              </div>
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
        </>
      ) : (
        <>
          <div>
            <label>Display Name</label>
            <h2>{user.displayName}</h2>
          </div>
        </>
      )}

      {username === id ? (
        <>
          <div>
            <button onClick={handleEditDateOfBirth}>
              Change Date Of Birth
            </button>
          </div>
          <div>
            <label>Date Of Birth</label>
            <h3 style={{ display: editDateOfBirth ? "none" : "block" }}>
              {new Date(user.dob).toLocaleDateString(`en-GB`)}
            </h3>
          </div>

          {editDateOfBirth ? (
            <>
              <div>
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
              </div>
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
        </>
      ) : (
        <>
          <div>
            <label>Display Name</label>
            <h2>{user.displayName}</h2>
          </div>
        </>
      )}
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
                  <li>
                    <form
                      onSubmit={(event) =>
                        handleDeleteSkill(event, skill.skillId)
                      }
                    >
                      {skill.skillName}
                      <button>Delete Skill</button>
                    </form>
                  </li>
                ))}
              </ul>
              <div>
                <button onClick={handleEditCreateSkill}>Create a skill</button>
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
            {username === id ? (
              <>
                <div>
                  <button onClick={handleEditCVPath}>Change CV</button>
                </div>
                {editPdf ? (
                  <>
                    <div>
                      <label>Pdf</label>
                      <div></div>
                    </div>
                    <form>
                      <div>
                        <lable>Upload Pdf</lable>
                        <input
                          type="file"
                          name="pdfPath"
                          onChange={onChangePdfPath}
                          required
                        />
                      </div>
                      <button onSubmit={handleSubmitPdf}>Update Pdf</button>
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
        </>
      ) : null}

      <div>
        {username != "" ? (
          <>
            {" "}
            <button onClick={editShowPopupRating}>Rating Users</button>
            {showPopupRating ? (
              <>
                <div className="popup">
                  <div className="popup-content">
                    <span className="close" onClick={editShowPopupRating}>
                      &times;
                    </span>
                    <h2>Courses Being Taught</h2>
                    <ul>
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
                                {/* <input
                                  type="radio"
                                  name="noStart"
                                  value="1"
                                  checked={noStar === "1"}
                                  onChange={handleNoStar}
                                />{" "}
                                1 |
                                <input
                                  type="radio"
                                  name="noStart"
                                  value="2"
                                  checked={noStar === "2"}
                                  onChange={handleNoStar}
                                />{" "}
                                2 |
                                <input
                                  type="radio"
                                  name="noStart"
                                  value="3"
                                  checked={noStar === "3"}
                                  onChange={handleNoStar}
                                />{" "}
                                3 |
                                <input
                                  type="radio"
                                  name="noStart"
                                  value="4"
                                  checked={noStar === "4"}
                                  onChange={handleNoStar}
                                />{" "}
                                4 |
                                <input
                                  type="radio"
                                  name="noStart"
                                  value="5"
                                  checked={noStar === "5"}
                                  onChange={handleNoStar}
                                />{" "}
                                5 |<br></br> */}
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
          </>
        ) : null}
      </div>

      <div>
        <button onClick={editShowPopupAllRating}>View All Rating</button>
        <div>
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
                        <Link to={`/profile/${rating.ratingKey.ratedFromUser}`}>
                          {rating.ratingKey.ratedFromUser}
                        </Link>{" "}
                        voted {rating.noStar} Stars
                      </div>
                      <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            style={{
                              color: value <= rating.noStar ? "gold" : "gray",
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
      </div>
    </div>
  );
}

export default ViewProfile;
