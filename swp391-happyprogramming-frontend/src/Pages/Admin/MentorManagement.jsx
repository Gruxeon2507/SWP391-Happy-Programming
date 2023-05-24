import React, { useState, useEffect, Link } from 'react'
import UserServices from '../../services/UserServices';
import convertDateFormat from '../../util/DateConvert';
import axios from "axios";

const MentorManagement = () => {
  const [mentorList, setMentorList] = useState([]);
  const [checkUsername, setCheckUsername] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    mail: "",
  });
  const getMentorList = () => {
    UserServices.getMentorList()
      .then((response) => {
        console.log(response.data);
        setMentorList(response.data)

      })
      .catch((error) => {
        console.log("loi lay ra list mentor" + error);
      });
  };


  // Validate input
  const [checkUsernameDuplicate, setcheckUsernameDuplicate] = useState(true);

  const [errorUsername, setErrorUsername] = useState("");
  const [showErrorUsername, setShowErrorUsername] = useState(false);

  const [errorPassword, setErrorPassword] = useState("");
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const [errorEmail, setErrorEmail] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);

  const [errorEmailDuplicate, setErrorEmailDuplicate] = useState("");
  const [showErrorEmailDuplicate, setShowEmailDuplicate] = useState(false);


  const [errorUsernameDuplicate, setErrorUsernameDuplicate] = useState("");
  const [showErrorUsernameDuplicate, setShowUsernameDuplicate] = useState(false);


  const onChangeUsername = async (event) => {
    const inputUsername = event.target.value;

    const regex = /^[a-zA-Z0-9\s]*$/;
    if (
      !regex.test(inputUsername) ||
      inputUsername.length < 6 ||
      inputUsername.length > 150
    ) {
      setShowErrorUsername(true);
      setErrorUsername(
        `Please just input characters and numbers and not empty and size just from 6 to 150`
      );
      return;
    }

    try {
      const resp = await axios.get(
        `http://localhost:1111/api/auth/${inputUsername}`
      );
      if (resp.data === true) {
        setShowErrorUsername(true);
        setErrorUsername(`The username has taken`);
        return;
      }
    } catch (error) {
      console.log(error);
    }

    setShowErrorUsername(false);
    setErrorUsername(``);
    setUser({
      ...user,
      username: inputUsername,
    });
  };

  const onChangePassword = (event) => {
    const inputPassword = event.target.value;

    if (inputPassword.length < 6 || inputPassword < 60) {
      setShowErrorPassword(true);
      setErrorPassword(
        `Please input password that contains 6 to 60 characters`
      );
      return;
    }

    setShowErrorPassword(false);
    setErrorPassword(``);
    setUser({
      ...user,
      password: inputPassword,
    });
  };

  const onChangeEmail = async (event) => {
    const inputEmail = event.target.value;

    if (inputEmail.length > 220) {
      setShowErrorEmail(true);
      setErrorEmail(`Please input password that do not contain oversize 220`);
      return;
    }

    try {
      const resp = await axios.get(
        `http://localhost:1111/api/auth/mail/${inputEmail}`
      );
      if (resp.data === true) {
        setShowEmailDuplicate(true);
        setErrorEmailDuplicate(`This email is taken`);
      }
    } catch (error) {
      console.log(error);
    }

    setShowErrorEmail(false);
    setErrorEmail(``);

    setUser({
      ...user,
      mail: inputEmail,
    });
  };




  const handleSubmit = (e) => {

    if (
      showErrorUsername ||
      showErrorPassword ||
      showErrorEmail ||
      showErrorUsernameDuplicate ||
      showErrorEmailDuplicate
    ) {
      let alertMessage = "";
      if (showErrorUsername) {
        alertMessage = alertMessage + "Username: " + errorUsername + "\n";
      }

      if (showErrorUsernameDuplicate) {
        alertMessage =
          alertMessage + "Username: " + errorUsernameDuplicate + "\n";
      }

      if (showErrorPassword) {
        alertMessage = alertMessage + "Password: " + errorPassword + "\n";
      }

      if (showErrorEmail) {
        alertMessage = alertMessage + "Email: " + errorEmail + "\n";
      }

      if (showErrorEmailDuplicate) {
        alertMessage = alertMessage + "Email" + errorEmailDuplicate + "\n";
      }
      alert(alertMessage);
    }


    UserServices.createMentorAccount(user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });


  }
  useEffect(() => {
    getMentorList();
  }, []);
  return (
    mentorList.length > 0?(    
    <div>
      <div className="create-mentor">
        <p>Create Mentor</p>
        <div>
          <div className="create-form">
            <form onSubmit={handleSubmit}>
              <div className="user-input">
                <span>UserName</span>
                <input
                  type="text"
                  id="userName"
                  required
                  onChange={onChangeUsername}
                />
              </div>
              {showErrorUsername ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorUsername}
                  </div>
                </>
              ) : null}
              {showErrorUsernameDuplicate ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorUsernameDuplicate}
                  </div>
                </>
              ) : null}
              <div className="user-input">
                <span>Password</span>
                <input
                  type="password"
                  id="userPassword"
                  required
                  onChange={onChangePassword}
                />
              </div>
              {showErrorPassword ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorPassword}
                  </div>
                </>
              ) : null}
              <div className="user-input">
                <span>Mail</span>
                <input
                  type="email"
                  id="userEmail"
                  required
                  onChange={onChangeEmail}
                />
              </div>
              {showErrorEmail ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorEmail}
                  </div>
                </>
              ) : null}
              {showErrorEmailDuplicate ? (
                <>
                  <div className="w-message" style={{ color: "black" }}>
                    {errorEmailDuplicate}
                  </div>
                </>
              ) : null}
              <button className="btn btn--form" type="submit">
                create
              </button>
            </form>
          </div>
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        <tbody>
          {mentorList.map((mentor) => {
            return (
              <tr key={mentor.username}>
                <td>

                  {mentor.displayName}
                </td>
                <td>
                  <img
                    src={
                      "http://localhost:1111/api/auth/users/avatar/" +
                      mentor.username
                    }
                    style={{ width: 40 }}
                    alt=""
                  />
                </td>
                <td>{convertDateFormat(mentor.createdDate)}</td>
                <td>{mentor.mail}</td>

                <td>
                  {(mentor.activeStatus == 0) ? (<p>Banned</p>) : (<p>Active</p>)}

                </td>
                <td>
                  <button>Ban</button>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>):"Quyền gì mà vào đây "

  )
}

export default MentorManagement






