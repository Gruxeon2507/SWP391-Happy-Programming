import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import "./Home.css";
import bg from "../../Assets/Picture1.png";
import si from "../../Assets/scrollIcon.png";
import CategoryServices from "../../services/CategoryServices";
import api from "../../services/BaseAuthenticationService";

function Home(props) {
  const [currentSection, setCurrentSection] = useState("quote");
  const [categories, setCategories] = useState([]);


  const getAllCategories = () => {
    CategoryServices.getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);


  useEffect(() => {
    const sections = document.querySelectorAll(".home-section");

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { target, isIntersecting } = entry;

        if (isIntersecting) {
          setCurrentSection(target.getAttribute("data-section"));
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <NavBar mode={1} />

      <main>
        <img
          src={bg}
          alt="background"
          id="homebg"
          className={currentSection}
        />

        <div className="scroll-snap-container">
          <section className="home-section" data-section="start">
            <div>
              <div className="quote-content">
                <span>EmIuKhoaHoc.</span><br></br>
                <span>Happy Programming</span>
              </div>
              <div className="--home--start">
                <img id="sIcon" src={si} alt="scrollIcon"></img>
                <span>
                  Scroll down
                </span>
              </div>
            </div>
          </section>

          <section className="home-section" data-section="eikh">
            <div className="quote-content">
              <span>EmIuKhoaHoc.</span><br></br>
              <span>Happy Programming</span>
            </div>
          </section>

          <section className="home-section" data-section="quote">
            <span id="quote-section">Number 1 online learning platform in Vietnam</span>
          </section>

          <section className="home-section" data-section="mentor">
            <div className="--q-2">
              <span>Ngồi học thì ấm vào thân</span><br></br>
              <span>Đi ngủ thì ấm từ thân đến đầu</span>
            </div>
          </section>

          <section className="home-section" data-section="courses">
            <div className="--home-course-section">
              <span>Diverse course system</span>
              <div className="--cate--slider">

                {categories.map((category) => (
                  <div className="--cate" key={category.categoryId}>
                    {category.categoryName}
                  </div>
                ))}

              </div>
              <a id="--discover" href="/courses">Discover more &gt;&gt;&gt; </a>
            </div>
          </section>


          <section className="home-section" data-section="mentor2">
            <div className="--mentor2">
              <div className="--hero">

                <div className="--mentor-pv">
                  <div className="--mt--card">
                    <img src="http://localhost:1111/api/users/avatar/anmentor"></img>
                  </div>
                  <div className="--mt--card">
                    <img src="http://localhost:1111/api/users/avatar/giangmentor"></img>
                  </div>
                  <div className="--mt--card">
                    <img src="http://localhost:1111/api/users/avatar/ducmentor"></img>
                  </div>
                  <div className="--mt--card">
                    <img src="http://localhost:1111/api/users/avatar/huyenmentor"></img>
                  </div>
                  <div className="--mt--card">
                    <img src="http://localhost:1111/api/users/avatar/phuongmentor"></img>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Home;
