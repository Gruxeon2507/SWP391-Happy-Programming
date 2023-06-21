import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";
import { useNavigate } from "react-router-dom";
import "./MyCourse.css"
import NavBar from "../../Components/Navbar/NavBar";
import Paging from "../../Components/Pagination/Paging";


const MyCourseHistory = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [courses, setCourses] = useState([]);
    const [participateRoles, setParticipateRoles] = useState([]);
    const [statusIds, setStatusIds] = useState([]);
    const sizePerPage = 10;

    const getPageMyCourses = (pageSize, pageNumber, searchText, participateRoles, statusIds) => {
        CourseServices.getPageMyCourses(0, 10, searchText, participateRoles, participateRoles)
            .then((response) => {
                console.log("chay vao day ne");
                setCourses(response.data.content);
                setTotalItems(response.data.totalElements);
            })
            .catch((error) => {
                console.log("loi lay ra course" + error);
            });
    }

    const handleCourseNavigate = (courseId) => {
        navigate(`/courses/feed/${courseId}`);
    };
    const [checked, setChecked] = useState({
        teaching: false,
        access: false,
        pending: false,
        reject: false,
    });

    const handleCheckboxChange = async (event) => {
        const { name, checked: isChecked } = event.target;
        await setChecked((prevChecked) => ({
            ...prevChecked,
            [name]: isChecked,
        }));
    };

    useEffect(() => {
        getResults();
        getPageMyCourses(0, sizePerPage, searchText, participateRoles, statusIds)

    }, [checked])

    const handlePageChange = (current) => {
        setCurrentPage(current);
        getPageMyCourses(current - 1, sizePerPage, searchText, participateRoles, statusIds)
    };

    const [searchText, setSearchText] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getResults();
            getPageMyCourses(0, sizePerPage, searchText, participateRoles, statusIds)
        }
    };
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    // const getResults = async() => {
    //     console.log('searchText:', searchText);
    //     console.log('checked:', Object.keys(checked).filter((key) => checked[key]));
    //     var results = Object.keys(checked).filter((key) => checked[key])
    //     setParticipateRoles([])
    //     setStatusIds([])
    //     if (results.length > 0) {
    //         results.forEach((item) => {
    //             if (item === 'teaching') {
    //                 setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 2]);
    //                 setStatusIds((prevStatusIds) => [...prevStatusIds, 1]);
    //             }
    //             else if (item === 'access') {
    //                 setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
    //                 setStatusIds((prevStatusIds) => [...prevStatusIds, 1]);
    //             } else if (item === 'pending') {
    //                 setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
    //                 setStatusIds((prevStatusIds) => [...prevStatusIds, 0]);
    //             }
    //             else if (item === 'reject') {
    //                 setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
    //                 setStatusIds((prevStatusIds) => [...prevStatusIds, -1]);
    //             }
    //         })
    //     }
    // };
    const getResults = async () => {
        console.log('searchText:', searchText);
        console.log('checked:', Object.keys(checked).filter((key) => checked[key]));
        const results = Object.keys(checked).filter((key) => checked[key]);
        await setParticipateRoles([]);
        await setStatusIds([]);
      
        if (results.length > 0) {
          for (const item of results) {
            if (item === 'teaching') {
              await setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 2]);
              await setStatusIds((prevStatusIds) => [...prevStatusIds, 1]);
            } else if (item === 'access') {
              await setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
              await setStatusIds((prevStatusIds) => [...prevStatusIds, 1]);
            } else if (item === 'pending') {
              await setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
              await setStatusIds((prevStatusIds) => [...prevStatusIds, 0]);
            } else if (item === 'reject') {
              await setParticipateRoles((prevParticipateRoles) => [...prevParticipateRoles, 3]);
              await setStatusIds((prevStatusIds) => [...prevStatusIds, -1]);
            }
          }
        }
        console.log("role1",participateRoles);
        console.log("status1", statusIds);
      };
      useEffect(() => {
        getResults();
      }, [])
        console.log("role2",participateRoles);
        console.log("status2", statusIds);

    return (
        <>
            <NavBar mode={1} />

            <div className="myCourse-body">
                <div className="course-card">
                    <div className="RejectCourse">
                        {courses.map((course) => (
                            <div key={course.course.courseId} className="card-wraper" onClick={() => {
                                handleCourseNavigate(course.courseId);
                            }}>
                                <div className="card-title"><span>{course.course.courseName}</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="Pagination-Container">
                <Paging {...{
                    totalItems,
                    sizePerPage,
                    currentPage,
                    handlePageChange,
                    name: "courses"
                }} />
            </div>
            <div>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className="list-request">
                {Object.entries(checked).map(([name, isChecked]) => (
                    <div key={name}>
                        <input
                            type="checkbox"
                            name={name}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label>{name === 'teaching' ? 'Teaching Course' : name === 'access' ? 'Access Course' : name === 'pending' ? 'Pending Course' : name === 'reject' ? 'Reject Course' : name}</label>
                    </div>
                ))}
            </div>
        </>
    );
}

export default MyCourseHistory
