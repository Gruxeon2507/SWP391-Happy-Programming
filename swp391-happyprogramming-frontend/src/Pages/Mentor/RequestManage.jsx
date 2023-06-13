
import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import RequestService from "../../services/RequestService";
import convertDateFormat from "../../util/DateConvert";
import { Pagination } from "antd";
import { NavLink } from "react-router-dom";
import manageIcon from "../../Assets/208-2081675_link-to-manage-travel-ttc-line-5.png"
import statisticIcon from "../../Assets/1466735.png"
import "./RequestManage.css"
import NavBar from "../../Components/Navbar/NavBar";

const RequestManage = () => {
    const [teachCourses, setTeachCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState("username");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [checkedRequest, setCheckedRequest] = useState([]);
    const [selectedValue, setSelectedValue] = useState(1);
    const [responses, setResponses] = useState([])
    const haveData = users.length == 0 && responses.length == 0
    const sizePerPage = 10;

    const getCoursesOfMentor = () => {
        CourseServices.getCoursesOfMentor()
            .then((response) => {
                console.log(response.data);
                setTeachCourses(response.data);
                // setSelectedCourseId(response.data[0].courseId)
                // getPendingUserOfCourse(response.data[0].courseId, 0, sizePerPage, sortField, sortOrder);                
            })
            .catch((error) => {
                console.log("loi lay ra course" + error);
            });
    }

    const getPendingUserOfCourse = (courseId, pageNumber, pageSize, sortField, sortOrder) => {
        RequestService.getPendingUserOfCourse(courseId, pageNumber, pageSize, sortField, sortOrder)
            .then((response) => {
                console.log(response.data.content);
                setTotalItems(response.data.totalElements);
                setUsers(response.data.content);
            })
            .catch((error) => {
                console.log("loi lay ra members" + error);
            });
    }

    const getAccessRejectOfCourse = () => {
        RequestService.getAccessRejectRequestOfCourse(selectedCourseId)
            .then((response) => {
                console.log(response.data);
                setResponses(response.data);
            })
            .catch((error) => {
                console.log("loi lay ra reponses" + error);
            });
    }

    useEffect(() => {
        getCoursesOfMentor();
        getAccessRejectOfCourse()

    }, []);
    useEffect(() => {
        getAccessRejectOfCourse()
    }, [users]);
    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = users.map(user => { return { ...user, isChecked: checked } })
            setUsers(tempUser)
            setCheckedRequest(users.map(user => { return [user.requestKey.username].join(',') }));
        }
        else {
            console.log("vua click cho nay nay", e.target.name);
            let tempUser = users.map(user => user.requestKey.username === name ? { ...user, isChecked: checked } : user)
            setUsers(tempUser)
            console.log(checked);
            setCheckedRequest((prev) => {
                const isInclude = checkedRequest.includes(name);
                if (isInclude) {
                    //Uncheck
                    return checkedRequest.filter((item) => item !== name);
                } else {
                    return [...prev, e.target.name];
                }
            })

        }

    }
    console.log(checkedRequest);
    const handleCourseChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourseId(courseId);
        setCheckedRequest([])
        getPendingUserOfCourse(courseId, 0, sizePerPage, sortField, sortOrder);
    }

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };

    const handlePageChange = (current) => {
        setCurrentPage(current);
        getPendingUserOfCourse(selectedCourseId, current - 1, sizePerPage, sortField, sortOrder);
    };

    const handleSubmitOne = (statusId, username) => {
        const confirmed = statusId !== 1 ? window.confirm("Are you sure you want reject this mentee") : false;
        if (confirmed || statusId === 1) {
            RequestService.updateParticipadeInsertRequest(selectedCourseId, statusId, [username])
                .then((response) => {
                    console.log(response.data);
                    setCheckedRequest([])
                    getPendingUserOfCourse(selectedCourseId, 0, sizePerPage, sortField, sortOrder);

                })
                .catch((error) => {
                    console.log("loi update and insert" + error);
                });
        }
    };
    const handleSubmitMany = () => {
        var statusId = Number(selectedValue);
        const confirmed = statusId !== 1 ? window.confirm("Are you sure you want reject these mentees") : false;
        if (confirmed || statusId === 1) {
            RequestService.updateParticipadeInsertRequest(selectedCourseId, selectedValue, checkedRequest)
                .then((response) => {
                    console.log(response.data);
                    setCheckedRequest([])
                    getPendingUserOfCourse(selectedCourseId, 0, sizePerPage, sortField, sortOrder);
                })
                .catch((error) => {
                    console.log("loi update and insert" + error);
                });
        }
    };
    useEffect(() => {
        getPendingUserOfCourse(selectedCourseId, 0, sizePerPage, sortField, sortOrder)
    }, [sortField, sortOrder]);

    const handleSortChange = (e) => {
        setSortOrder(sortOrder == "asc" ? "desc" : "asc");
        setSortField(e.target.id);
    }
    return (
        <>
            <NavBar mode={1}></NavBar>
            <main className="request-manage-main">
                <nav className="mentor-menu-sideBar">
                    <ul className="mentor-manageNav">
                        <li>
                            <NavLink to="/request/manage" className="request-index">
                                <img src={manageIcon}></img>
                                <span>Manage</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/request/statistic" className="request-index">
                                <img src={statisticIcon}></img>
                                <span>Statistic</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <section className="manage-section">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="checkbox-all"
                            name="allSelect"
                            checked={users.filter(user => user?.isChecked !== true).length < 1}
                            onChange={(e) => handleCheckChange(e)}
                        />
                        <label class="form-check-label" htmlFor="checkbox-all">
                            Check All
                        </label>
                    </div>
                    <select className="form-control form-control-sm checkbox-select-all" name="action"
                        onChange={(e) => handleCourseChange(e)}
                    >
                        <option value="" >-- Courses --</option>
                        {teachCourses.map((course) => (
                            <option value={course.courseId} key={course.id} >
                                {course.courseName}
                            </option>
                        ))}

                    </select>
                    <select class="form-control form-control-sm checkbox-select-all" name="action"
                        disabled={checkedRequest.length <= 1}
                        onChange={handleSelectChange} >
                        <option disabled>-- Action --</option>
                        <option value="1" >Access</option>
                        <option value="-1" >Reject</option>
                    </select>
                    <button disabled={checkedRequest.length <= 1} onClick={() => handleSubmitMany()}>Thực hiện</button>


                    <div style={{ display: !haveData ? "inline" : "none" }} className="show-info">

                        <table >
                            <thead>
                                <tr>

                                    <th>#</th>
                                    <th>Mentee
                                        <span onClick={handleSortChange}>
                                            {/* đổi icon nhưng giữ lại id cho tôi nhé ân*/}
                                            <ion-icon id="username" name="list-outline"></ion-icon>
                                        </span>
                                    </th>
                                    <th>Request Time
                                        <span onClick={handleSortChange}>
                                            {/* đổi icon nhưng giữ lại id cho tôi nhé ân*/}
                                            <ion-icon id="requestTime" name="list-outline"></ion-icon>
                                        </span>
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => {
                                    return (
                                        <tr key={user.requestKey.username}>

                                            <td>

                                                <input class="form-check-input" type="checkbox" name={user.requestKey.username} value="" id={user.requestKey.username}
                                                    checked={user?.isChecked || false}
                                                    onChange={(e) => { handleCheckChange(e) }}
                                                />
                                            </td>
                                            <td>
                                                <label class="form-check-label" htmlFor={user.requestKey.username}>
                                                    {user.requestKey.username}
                                                </label>
                                            </td>

                                            <td>
                                                <label class="form-check-label" htmlFor={user.requestKey.username}>
                                                    {convertDateFormat(user.requestKey.requestTime)}
                                                </label>

                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleSubmitOne(1, user.requestKey.username)}
                                                    disabled={checkedRequest.length > 1}
                                                >Access </button>
                                                <button
                                                    onClick={() => handleSubmitOne(-1, user.requestKey.username)}
                                                    disabled={checkedRequest.length > 1}
                                                >Reject</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="Pagination-Container">
                            <Pagination
                                total={totalItems}
                                defaultPageSize={sizePerPage}
                                showTotal={(total, range) =>
                                    `${range[0]}-${range[1]} of ${total} mentees`
                                }
                                current={currentPage}
                                onChange={(current) => {
                                    handlePageChange(current);
                                }}
                            />
                        </div>

                        <p>Your Recent Respond</p>
                        <table className="Recent-Respond-table">
                            <thead>
                                <tr>
                                    <th>Mentee</th>
                                    <th>Respond At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses.map((user) => {
                                    return (
                                        <tr key={user.requestKey.username}>
                                            <td> {user.requestKey.username}</td>
                                            <td>{convertDateFormat(user.requestKey.requestTime)}</td>
                                            <td>{user.status.statusName}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ display: haveData ? "inline" : "none" }} className="not-show-info">
                        <p>Choose a course to view request</p>
                    </div>
                </section>
            </main>
        </>
    );
};

export default RequestManage;
