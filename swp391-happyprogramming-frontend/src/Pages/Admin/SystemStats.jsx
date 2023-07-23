import React, { useState, useEffect } from "react";
import "./SystemStats.css"
import NavBar from "../../Components/Navbar/NavBar";

const SystemStats = () => {
  return (
    <>
      <NavBar mode={1}></NavBar>
      <main className="--outer">
        <h1>System Statistic</h1>
        <div className="--main-wraper">
          <aside className="plain-stats">
            <div className="--plain">
              <span>13</span>
              <span>Users</span>
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <div className="--plain">
              <span>20</span>
              <span>Course</span>
              <ion-icon name="pricetags-outline"></ion-icon>
            </div>
            <div className="--plain">
              <span>300</span>
              <span>Requests this month</span>
              <ion-icon name="pricetags-outline"></ion-icon>
            </div>
            <div className="--plain">
              <span>300</span>
              <span>New courses this month</span>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>

          </aside>

          <section className="--visual">
            <div className="visual-stats">


              <div className="--grid--chart">
                <h3>Mentee/mentor/admin ratio</h3>
                <div>The chart goes here</div>
              </div>

              <div className="--grid--chart">
                <h3>Active/inactive ratio</h3>
                <div>The chart goes here</div>
              </div>

              <div className="--grid--chart">
                <h3>Approved/pending/rejected ratio</h3>
                <div>The chart goes here</div>
              </div>



              <div className="--grid--chart">
                <h3>Approved/pending/rejected ratio</h3>
                <div>The chart goes here</div>
              </div>

              <div className="--grid--chart">
                <h3>Approved/pending/rejected ratio</h3>
                <div>The chart goes here</div>
              </div>

              <div className="--grid--chart">
                <h3>Approved/pending/rejected ratio</h3>
                <div>The chart goes here</div>
              </div>


            </div>

            <div className="top-stats">

              <div className="popular-course">
                <h3>Top 3 courses with most users</h3>
                <div>Stats go here</div>
              </div>

              <div className="active-mentor">
                <h3>Top 3 mentors who join most courses</h3>
                <div>Stats go here</div>
              </div>

              <div className="active-mentee">
                <h3>Top 3 mentees who join most courses</h3>
                <div>Stats go here</div>
              </div>

              <div className="reported-user">
                <h3>Top 3 users who receive most reports</h3>
                <div>Stats go here</div>
              </div>

            </div>

          </section>
        </div>
      </main>
    </>
  );
};

export default SystemStats;
