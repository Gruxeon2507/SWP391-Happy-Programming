import React from "react";
import PropTypes from "prop-types";
import "../CourseCreate/CourseCreate.css";
import { Alert } from "bootstrap";
import NavBar from "../../Components/Navbar/NavBar";
CourseCreate.propTypes = {};

function CourseCreate(props) {
  const Handlesubmit = () => {
    alert("create course, change function here");
  };

  return (
    <div>
      <NavBar mode={1}></NavBar>
      <div className="createCourse-container">
        <form>
          <div className="user-input">
            <input type="text"></input>
            <span>CourseName</span>
          </div>
          <div className="user-input">
            <textarea></textarea>
            <span>Description</span>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <div>
                <input type="checkbox" /> tên cate
              </div>
              <div>
                <input type="checkbox" /> tên cate
              </div>
              <div>
                <input type="checkbox" /> tên cate
              </div>
              <div>
                <input type="checkbox" /> tên cate
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
              <div>
                <input type="radio" /> tên mentor
              </div>
              <div>
                <input type="radio" /> tên mentor
              </div>
              <div>
                <input type="radio" /> tên mentor
              </div>
              <div>
                <input type="radio" /> tên mentor
              </div>
              <div>
                <input type="radio" /> tên mentor
              </div>
            </div>
          </div>
          <button onClick={() => Handlesubmit()}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default CourseCreate;
