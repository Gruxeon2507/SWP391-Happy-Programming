import React, { Component } from "react";
import "../Style/HomeStyle.css";
import NavBar from "../Components/NavBar";
import bg from "../Assets/backround.jpg";
import { NavLink } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="banner-1">
          <div className="quotes">
            <h1>Học đi con trai</h1>
            <p>
              Văn động viên mấy con vợ tham gia course <br />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque
              quisquam rem distinctio itaque quos quia ut in nam obcaecati
              eaque, tempore voluptate corrupti sint. Suscipit non quia
              voluptatibus voluptatem placeat?
            </p>
            <div className="regisFW">
              <NavLink to="/register">Register</NavLink>
            </div>
          </div>
          <img src={bg} alt="background" />
        </div>
      </div>
    );
  }
}

export default Home;
