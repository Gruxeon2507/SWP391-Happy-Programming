import React, { useState, useEffect } from "react";
import CourseServices from "../../services/CourseServices";
import convertDateFormat from "../../util/DateConvert";
import { useNavigate } from "react-router-dom";
import "./MyCourse.css"
import NavBar from "../../Components/Navbar/NavBar";
import Paging from "../../Components/Pagination/Paging";
import ParticipateServices from "../../services/ParticipateServices";
import RequestButton from "../../Components/RequestButton/RequestButton";


const MyCourseHistory = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [courses, setCourses] = useState([]);
    const [mentorOfCourses, setMentorOfCourses] = useState({});
    const [checked, setChecked] = useState({
        teaching: false,
        access: false,
        pending: false,
        reject: false,
    });
    const [searchText, setSearchText] = useState('');
    const sizePerPage = 10;

    const getMentorOfCourses = (courseId) => {
        CourseServices.getMentorOfCourse(courseId).then((response) => {
            setMentorOfCourses((prevUserOfCourses) => ({
                ...prevUserOfCourses,
                [courseId]: response.data.displayName,
            }));
        });
    };


    const getPageMyCourses = (pageSize, sizePerPage, searchText, checked) => {
        ParticipateServices.getPageMyCourses(0, 10, searchText, checked)
            .then((response) => {
                setCourses(response.data.content);
                setTotalItems(response.data.totalElements);
                response.data.content.forEach((participate) => {
                    getMentorOfCourses(participate.course.courseId);
                });
            })
            .catch((error) => {
                console.log("loi lay ra course" + error);
            });
    }


    const handleCourseNavigate = (courseId) => {
        navigate(`/courses/feed/${courseId}`);
    };

    const handlePageChange = (current) => {
        setCurrentPage(current);
        getPageMyCourses(current - 1, sizePerPage, searchText, checked)
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getResults();
        }
    };
    const handleInputChange = (event) => {
        setSearchText(event.target.value);
        console.log(event.target.value);
        if (event.target.value == '') {
            getResults();
        }
    };

    const getResults = () => {
        console.log("get results");
        console.log('searchText:', searchText);
        console.log('checked:', Object.keys(checked).filter((key) => checked[key]));
        getPageMyCourses(0, 10, searchText, Object.keys(checked).filter((key) => checked[key]))
    }

    const handleCheckboxChange = (event) => {
        const { name, checked: isChecked } = event.target;
        setChecked((prevChecked) => ({
            ...prevChecked,
            [name]: isChecked,
        }));
    };

    useEffect(() => {
        getResults();
    }, [checked]);

    const CourseClassName = (statusName) => {
        switch (statusName) {
            case 'access':
                return 'access-state';
            case 'reject':
                return 'reject-state';
            case 'pending':
                return 'pending-state';
            default:
                return '';
        }
    };

    return (
        <>
            <NavBar mode={1} />
            <section className="mycourse-seachbar">
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search course name..."
                    />
                </div>
                <span id="hr-span"></span>
                <div className="list-request">
                    {Object.entries(checked).map(([name, isChecked]) => (
                        <div key={name} className={`type-cb ${isChecked ? 'checked' : ''}`}>
                            <input
                                type="checkbox"
                                name={name}
                                id={name}
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />

                            <label htmlFor={name}>
                                {name === 'teaching' ? 'Teaching Course' :
                                    name === 'access' ? 'Access Course' :
                                        name === 'pending' ? 'Pending Course' :
                                            name === 'reject' ? 'Reject Course' : name}
                            </label>
                        </div>
                    ))}
                </div>
            </section>
            <div className="myCourse-body">
                <div className="course-card">
                    <div className="RejectCourse">
                        {courses.map((data) => (

                            <div key={data.course.courseId} className="card-wraper" onClick={() => {
                                // handleCourseNavigate(data.course.courseId);
                            }}>
                                <div className="card-title"><span>{data.course.courseName}</span></div>
                                <RequestButton {...{ courseID: data.course.courseId }} />

                                <div className="c-status">
                                    <div className={CourseClassName(data.status.statusName)}></div>
                                    <span>{data.status.statusName}</span>
                                </div>

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

        </>
    );
}

export default MyCourseHistory
