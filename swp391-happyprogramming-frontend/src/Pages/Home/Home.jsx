import React, { Component, useEffect } from "react";
// import "../Home";
import NavBar from "../../Components/Navbar/NavBar";
import "./Home.css";
import bg from "../../Assets/backround.jpg";
import { NavLink } from "react-router-dom";
import gmt from "../../Assets/giangmentor.png";
import Loading from "../../Components/StateMessage/Loading";
import LoadFinish, { FailDialog, SuccessDialog } from "../../Components/StateMessage/LoadFinish";

function Home(props) {

  useEffect(() => {
    const handleScroll = () => {
      // Add your logic here for the scroll event
      // This function will be called when the user scrolls
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* {props.url} */}
      <LoadFinish state={1}></LoadFinish>
      <NavBar mode={1} />
      <div className="scroll-snap-container">
        {/* <Loading></Loading> */}
        <div className="scroll-snap-item">
          {/* <FailDialog></FailDialog> */}
          {/* <SuccessDialog></SuccessDialog> */}
        </div>
        <div className="scroll-snap-item">
          <div className="banner-1">
            <img src={bg} alt="background" loading="lazy" />
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
          <div className="hapi-pro-gb">
            <div className="hapi-pro-cover">
              <h1>EIKH.</h1>
              <q>Unlock Your Code Potential</q>
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
                Đội ngũ mentor uy tín, là các giáo sư có tiếng trong ngành, tâm huyết với nghề, dày dặn kinh nghiệm với hơn 20 năm giảng dạy tại cái trường đại học có tiếng trong và ngoài nước.
              </p>
            </div>
            <img src={gmt} alt="background" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
