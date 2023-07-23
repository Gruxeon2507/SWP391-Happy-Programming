import React, { useState, useEffect } from "react";

const SystemStats = () => {
  return (
    <>
      <div className="plain-stats">
        <p>Users: 13</p>
        <p>Courses: 20</p>
        <p>Requests this month: 300</p>
        <p>New courses this month: 300</p>
      </div>
      <div className="visual-stats">
        <div className="bar-charts">
          <div className="user-role-all">
            <h3>Mentee/mentor/admin ratio</h3>
            <div>The chart goes here</div>
          </div>
          <div className="user-status-all">
            <h3>Active/inactive ratio</h3>
            <div>The chart goes here</div>
          </div>
          <div className="request-status-all">
            <h3>Approved/pending/rejected ratio</h3>
            <div>The chart goes here</div>
          </div>
        </div>
        <div className="line-charts">
          <div className="user-role-course">
            <h3>Approved/pending/rejected ratio</h3>
            <div>The chart goes here</div>
          </div>
          <div className="user-status-course">
            <h3>Approved/pending/rejected ratio</h3>
            <div>The chart goes here</div>
          </div>
          <div className="request-status-course">
            <h3>Approved/pending/rejected ratio</h3>
            <div>The chart goes here</div>
          </div>
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
    </>
  );
};

export default SystemStats;
