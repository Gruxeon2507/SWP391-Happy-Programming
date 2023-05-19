import React, { Component } from "react";
// import "../Home";
import NavBar from "../../Components/Navbar/NavBar";
import "./Home.css";
import bg from "../../Assets/backround.jpg";
import { NavLink } from "react-router-dom";

function Home(props) {
  return (
    <div>
      {/* {props.url} */}
      <NavBar mode={1} />
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
  );
}

export default Home;
