import React, { useState, useEffect, Link } from 'react'
import UserServices from '../../services/UserServices';
import convertDateFormat from '../../util/DateConvert';
import axios from "axios";
import "./MentorManagement.css";
import Paging from "../../Components/Pagination/Paging";
import ReportServices from '../../services/ReportServices';
import SockJS from "sockjs-client";
import { over } from "stompjs";
import api from "../../services/BaseAuthenticationService";
var stompClient = null;

var stompClient = null;
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
      .then( (response) => {
        setPageMentees(response.data.content);
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.log("loi lay ra list mentee" + error);
      });
  };
        

  // const getNoReportOfUser =  (username)=>{
  //    axios.get(`http://localhost:1111/api/reports/count/by-username/${username}`).then((res) => {
  //     console.log(res.data);
  //     return (res.data);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
    
  // }

  const [reportsOfUsers, setReportsOfUsers] = useState({});
  const getReportOfUser = (username) => {
    axios.get(`http://localhost:1111/api/reports/count/by-username/${username}`).then((response) => {
      setReportsOfUsers((pre)=>({
        ...pre,
        [username]: response.data,
      }));
    });
  };
  useEffect(() => {
    pageMentees.forEach((m) => {
      getReportOfUser(m.username);
    });
  }, [pageMentees]);

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
    if(key === 0){
      sendPrivateValue(e.target.value,"Your account has been suppressed by the system, for more information, please contact admin via \"emiukhoahoc2722@gmail.com\"","/")
    }else{
      sendPrivateValue(e.target.value,"Your account has been unsuppressed by the system","/")

    }
    console.log(e.target.value);
    console.log(key);
    setIsEventClick(!isEventClick);

  }

   //notification
   useEffect(() => {
    console.log(userData);
}, [userData]);

const connect = () => {
    let Sock = new SockJS("http://localhost:1111/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
};
const onConnected = () => {
    setUserData({ ...userData, connected: true });
    // stompClient.subscribe(`/chatroom/${conversationId}`, onMessageReceived);
    stompClient.subscribe(
        `/user/${userData.username}/private`,
        onPrivateMessage
    );
    userJoin();
};
const onPrivateMessage = (payload) => { };

const onError = (err) => {
    console.log(err);
};
const userJoin = () => {
    var chatMessage = {
        senderName: userData.username,
        status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
};
useEffect(() => {
    if (userData.username !== "") {
        connect();
    }
}, [userData.username]);

const fetchUsername = async () => {
    const loginuser = await UserServices.getLoginUsername();
    const username = loginuser.data;
    setUserData((prevUserData) => ({ ...prevUserData, username: username }));
};
useEffect(() => {
    fetchUsername();
}, []);

const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
};
const sendPrivateValue = (username, message, url) => {
    if (stompClient) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // months are zero-based
        const day = currentDate.getDate();

        var chatMessage = {
            senderName: userData.username,
            receiverName: username,
            message: message,
            status: "MESSAGE",
            sentAt: currentDate,
            url: url,
            date: year + "-" + month + "-" + day,
        };

        stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));

        //   const Notification = {
        //     notificationContent:message,
        //     notificationTime:currentDate,
        //     isViewed:0,
        //     notificationType:{
        //         notificationTypeId:1
        //     },
        //     user:{
        //         username:username
        //     }
        //   }
        const Notification = new FormData();
        Notification.append("notificationContent", message);
        Notification.append("notificationTime", currentDate);
        Notification.append("notificationTypeId", 1);
        Notification.append("username", username);
        Notification.append("url", url);
        api.post("/api/notification/save", Notification);
        setUserData({ ...userData, message: "" });
    }
};

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
                <td>{reportsOfUsers[mentee.username]}</td>
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






