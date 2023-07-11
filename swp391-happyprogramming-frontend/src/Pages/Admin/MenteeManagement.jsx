import React, { useState, useEffect, Link } from 'react'
import UserServices from '../../services/UserServices';
import convertDateFormat from '../../util/DateConvert';
import axios from "axios";
import "./MentorManagement.css";
import Paging from "../../Components/Pagination/Paging";

const MenteeManagement = () => {
  const [isEventClick, setIsEventClick] = useState(false);
  const [pageMentees, setPageMentees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchText, setSearchText] = useState("");
  var sizePerPage = 10;
  const getPageMentee = (searchText, pageNumber, pageSize, sortField, sortOrder) => {
    UserServices.getOnlyRoleMenteeList(searchText, pageNumber, pageSize, sortField, sortOrder)
      .then((response) => {
        setPageMentees(response.data.content);
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.log("loi lay ra list mentee" + error);
      });
  };

  useEffect(() => {
    getPageMentee(
      searchText,
      0,
      sizePerPage,
      sortField,
      sortOrder
    );
  }, []);
  useEffect(() => {
    getPageMentee(
      searchText,
      currentPage - 1,
      sizePerPage,
      sortField,
      sortOrder
    );
  }, [isEventClick]);


  const handlePageChange = (current) => {
    setCurrentPage(current);
    getPageMentee(
      searchText,
      current - 1,
      sizePerPage,
      sortField,
      sortOrder
    );
  };
  const handleUpdate = async (e, key) => {
    await UserServices.setUserActiveStatus(e.target.value, key)
    .catch((error) => {
        console.log("loi update status mentee" + error);
      });;
    console.log(e.target.value);
    console.log(key);
    setIsEventClick(!isEventClick);

  }


  return (
    <div >
  
      <table className="table-mentee-manage">
        <thead>
          <th>Mentee</th>
          <th>Created Date</th>
          <th>No.Reports</th>
          <th>Status</th>
          <th>Action</th>
        </thead>
        <tbody>
          {pageMentees.map((mentee) => {
            const buttonKey = mentee.activeStatus === 0 ? 0 : 1;
            return (
              <tr key={mentee.username}>
                <td>
                  {mentee.username} - {mentee.displayName}

                </td>
               
                <td>{convertDateFormat(mentee.createdDate)}</td>
                <td></td>
                <td>
                  {(mentee.activeStatus == 0) ? (<p>Banned</p>) : (<p>Active</p>)}
                </td>
                <td>
                  {(mentee.activeStatus == 0) ?
                    (<button className='unbanBtn' value={mentee.username} onClick={(e) => { handleUpdate(e, 1) }}>UnBan</button>) :
                    (<button className='banBtn' value={mentee.username} onClick={(e) => { handleUpdate(e, 0) }}>Ban</button>)
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="Pagination-Container">
            <Paging
              {...{
                totalItems,
                sizePerPage,
                currentPage,
                handlePageChange,
                name: "mentees",
              }}
            />
          </div>
    </div>

  )
}

export default MenteeManagement






