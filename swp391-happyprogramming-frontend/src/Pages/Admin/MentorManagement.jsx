import React, { useState, useEffect, Link } from 'react'
import UserServices from '../../services/UserServices';
import convertDateFormat from '../../util/DateConvert';

const MentorManagement = () => {
  const [mentorList, setMentorList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkUsername, setCheckUsername] = useState(false);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  }
  useEffect(() => {
    getMentorList();
  }, []);
  return (

    <div>
      <div className="create-mentor">
        <p>Create Mentor</p>
        <div>
          <div className="create-frag">
            <div className="create-form">
              <form onSubmit={handleSubmit}>
                <div className="user-input">
                  <span>UserName</span>
                  <input
                    type="text"
                    id="userName"
                    required
                    onChange={(event) => {
                      setUsername(event.target.value);
                      console.log(username);
                    }}
                  />
                </div>
                <div className="user-input">
                  <span>Password</span>
                  <input
                    type="password"
                    id="userPassword"
                    required
                    onChange={(event) => {
                      setPassword(event.target.value);
                      console.log(password);
                    }}
                  />
                </div>

                <button className="btn btn--form" type="submit">
                  create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Name</th>
          <th>Avatar</th>
          <th>Created Date</th>
          <th>Email</th>
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
                  <button>Update Account</button>
                  <button>Delete</button>
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
