import React, { Component } from "react";
// import "../Home";
import NavBar from "../../Components/Navbar/NavBar";
import "./Home.css";
import bg from "../../Assets/backround.jpg";
import { NavLink } from "react-router-dom";
import gmt from "../../Assets/giangmentor.png";

function Home(props) {
  return (
    <>
      {/* {props.url} */}
      <NavBar mode={1} />
      <div className="scroll-snap-container">
        <div className="scroll-snap-item">
          <div className="hapi-pro-gb">
            <div className="hapi-pro-cover">
              <q>Unlock Your Code Potential</q>
            </div>
          </div>
        </div>
        <div className="scroll-snap-item">
          <div className="banner-1">
            <img src={bg} alt="background" />
            <div className="quotes">
              <h1>Học đi các bạn ơi!!</h1>
              <p>
                Văn động viên mấy con vợ tham gia course <br />
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
                quisquam rem distinctio itaque quos quia ut in nam obcaecati eaque,
                tempore voluptate corrupti sint. Suscipit non quia voluptatibus
                voluptatem placeat?
              </p>
              <div className="regisFW">
                <NavLink to="/register">RegisterNow!!!</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-snap-item">
          <div className="banner-2">
            <div className="quotes">
              <h1>
                Mentor siu tín
              </h1>
              <p>
                Dàn mentor dày dặn kinh nghiệm, là các giáo sư có tiếng trong ngành với hơn 20 năm giảng dạy
              </p>
            </div>
            <img src={gmt} alt="background" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
