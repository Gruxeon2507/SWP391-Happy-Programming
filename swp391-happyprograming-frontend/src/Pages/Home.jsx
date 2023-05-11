import React, { Component } from "react";
import "../Style/HomeStyle.css";
import NavBar from "../Components/NavBar";
import bg from "../Assets/backround.jpg";

class Home extends Component {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="background">
          <img src={bg} alt="background" />
        </div>
      </div>
    );
  }
}

export default Home;
