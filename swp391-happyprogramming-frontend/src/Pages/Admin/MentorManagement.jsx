import React, {useState, useEffect, Link} from 'react'
import UserServices from '../../services/UserServices';

const MentorManagement = () => {
  const [mentorList, setMentorList] = useState([]);
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
  useEffect(() => {
    getMentorList();
  }, []);
  return (
    
    <div>
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
                {" "}
                <Link to={"/user/" + mentor.username}>
                  {mentor.displayName}
                </Link>
              </td>
              <td>
                <img
                  // src={
                  //   "http://localhost:1111/api/users/avatar/" +
                  //   mentor.username
                  // }
                  style={{ width: 40 }}
                  alt=""
                />
              </td>
              {/* <td>{mentor.createDate}</td> */}
              <td>{mentor.email}</td>

              <td>
                <button
                  className="btn btn-secondary"

                >
                  Demote User
                </button>
                <button
                  className="btn btn-danger"

                >
                  Delete
                </button>
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
