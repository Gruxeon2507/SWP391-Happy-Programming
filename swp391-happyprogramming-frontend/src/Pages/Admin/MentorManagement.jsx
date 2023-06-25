import React, { useState, useEffect, Link } from 'react'
import UserServices from '../../services/UserServices';
import convertDateFormat from '../../util/DateConvert';
import axios from "axios";
import "./MentorManagement.css";

const MentorManagement = () => {
  const [mentorList, setMentorList] = useState([]);
  const [messageVerify, setMessageVerify] = useState("");
  const [user, setUser] = useState({
    mail: "",
  });
  const [errorEmail, setErrorEmail] = useState("");
  const [showErrorEmail, setShowErrorEmail] = useState(false);

  const [errorEmailDuplicate, setErrorEmailDuplicate] = useState("");
  const [showErrorEmailDuplicate, setShowEmailDuplicate] = useState(false);


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
      } else {
        setErrorEmailDuplicate(``);
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
    e.preventDefault();
    if (showErrorEmail || showErrorEmailDuplicate
    ) {
      let alertMessage = "";
      if (showErrorEmail) {
        alertMessage = alertMessage + "Email: " + errorEmail + "\n";
      }

      if (showErrorEmailDuplicate) {
        alertMessage = alertMessage + "Email" + errorEmailDuplicate + "\n";
      }
      alert(alertMessage);
    }
    else {
      UserServices.createMentorAccount(user)
        .then((res) => {
          console.log(res.data);
          if (res.data.length > 0)
            alert("The username and password is sented to " + user.mail)
          alert("Send username and password to" + user.mail + " failed ");

        })
        .catch((err) => {
          console.error(err);
        });

    }





  }
  useEffect(() => {
    getMentorList();
  }, []);

  const handleUpdate = (e, key) => {
    // UserServices.updateActiveStatusMentor()
    console.log(e.target.value);
    console.log(key);
  }
  return (
    <div >
      <div className="create-mentor">
        <div className="create-form">

          <form onSubmit={handleSubmit}>
            <div className='mail-input'>
              <div>
                <input
                  type="email"
                  id="userEmail"
                  required
                  onChange={onChangeEmail}
                  placeholder='Gmail'
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
            </div>
            <div className='mail-sbtn'>
              <button type="submit" onSubmit={handleSubmit} id='mentor-account-gen'>
                Generate account
              </button>
            </div>
          </form>
        </div>

      </div>
      <table className="table-mentor-manage">
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
            const buttonKey = mentor.activeStatus === 0 ? 0 : 1;
            return (
              <tr key={mentor.username}>
                <td>
                  {mentor.displayName}
                </td>
                <td>
                  <img
                    src={
                      "http://localhost:1111/api/users/avatar/" +
                      mentor.username
                    }
                    alt=""
                  />
                </td>
                <td>{convertDateFormat(mentor.createdDate)}</td>
                <td>{mentor.mail}</td>
                <td>
                  {(mentor.activeStatus == 0) ? (<p>Banned</p>) : (<p>Active</p>)}
                </td>
                <td>
                  {(mentor.activeStatus == 0) ?
                    (<button className='banBtn' value={mentor.username} onClick={(e) => { handleUpdate(e, 0) }}>UnBan</button>) :
                    (<button className='banBtn' value={mentor.username} onClick={(e) => { handleUpdate(e, 1) }}>Ban</button>)
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  )
}

export default MentorManagement






