import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import UserServices from "../../services/UserServices";
import RequestService from "../../services/RequestService";
import convertDateFormat from "../../util/DateConvert";
import { Pagination } from "antd";

const RequestManage = () => {
    const [teachCourses, setTeachCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState("username");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [checkedRequest, setCheckedRequest] = useState([]);
    const [selectedValue, setSelectedValue] = useState('1');
    const sizePerPage = 10;

    const getCoursesOfMentor = () => {
        CourseServices.getCoursesOfMentor()
            .then((response) => {
                console.log(response.data);
                setTeachCourses(response.data);
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
    const updateAndInsert = (courseId, statusId, username) => {
        RequestService.updateParticipadeInsertRequest(courseId, statusId, username)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log("loi update and insert" + error);
            });
    }
    useEffect(() => {
        getCoursesOfMentor();

    }, []);
    const handleCheckChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempUser = users.map(user => { return { ...user, isChecked: checked } })
            setUsers(tempUser)
        }
        else {
            console.log("in cho nay nay", e.target.name);
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

    const handlePageChange = (current) => {
        setCurrentPage(current);
        getPendingUserOfCourse(selectedCourseId, current - 1, sizePerPage, sortField, sortOrder);
    };

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };
    

    const handleSubmitOne = async (statusId, username) => {
        await updateAndInsert(selectedCourseId, statusId, [username]);
        getPendingUserOfCourse(selectedCourseId, 0, sizePerPage, sortField, sortOrder);
    };
    const handleSubmitMany = async () => {
        await updateAndInsert(selectedCourseId, selectedValue, checkedRequest);
        getPendingUserOfCourse(selectedCourseId, 0, sizePerPage, sortField, sortOrder);
    };


    return (
        <div>

            <div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="checkbox-all"
                        name="allSelect"
                        checked={users.filter(user => user?.isChecked !== true).length < 1}
                        onChange={(e) => handleCheckChange(e)}
                    />
                    <label class="form-check-label" for="checkbox-all">
                        Check All
                    </label>
                </div>
                <select class="form-control form-control-sm checkbox-select-all" name="action"
                    onChange={(e) => handleCourseChange(e)}
                >
                    <option value="" >-- Courses --</option>
                    {teachCourses.map((course) => (
                        <option value={course.courseId} key={course.id} >
                            <span>{course.courseName}</span>
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
            </div>


            <table >
                <thead>
                    <th>#</th>
                    <th>Mentee<ion-icon name="filter-outline"></ion-icon></th>
                    <th>Request Time<ion-icon name="filter-outline"></ion-icon></th>
                    <th>Action</th>
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
                                    <label class="form-check-label" for={user.requestKey.username}>
                                        {user.requestKey.username}
                                    </label>
                                </td>

                                <td>{convertDateFormat(user.requestKey.requestTime)}
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
        </div>


    );
};

export default RequestManage;
