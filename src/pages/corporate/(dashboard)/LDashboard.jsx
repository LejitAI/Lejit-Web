import React from "react";
import "./LDashboard.css";
import schedule from "./Schedule.png";
import schedule2 from "./schedule2.png";
import schedule3 from "./schedule3.png";
import schedule4 from "./schedule4.png";
import Doc from "./Doc.png"; 
import Dollar from "./dollar.png"; 

const LDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Summary Section */}
      <div className="summary-container">
        {/* Left Side Cards */}
        <div className="summary-cards">
          <div className="card ongoing-card">
            <div className="icon ongoing-icon">
              <img
                src={Doc}
                alt="Ongoing Icon"
                className="summary-card-image"
              />
            </div>
            <div className="text">
              <p className="title">Ongoing Cases</p>
              <p className="subtitle">No Data</p>
            </div>
          </div>
          <div className="card closed-card">
            <div className="icon closed-icon">
              <img
                src={Doc}
                alt="Closed Icon"
                className="summary-card-image"
              />
            </div>
            <div className="text">
              <p className="title">Closed Cases</p>
              <p className="subtitle">No Data</p>
            </div>
          </div>
          <div className="card pending-card">
            <div className="icon pending-icon">
              <img
                src={Dollar}
                alt="Pending Icon"
                className="summary-card-image"
              />
            </div>
            <div className="text">
              <p className="title">Pending Payments</p>
              <p className="subtitle">No Data</p>
            </div>
          </div>
        </div>

        {/* Right Side: Recent Updates */}
        <div className="recent-updates">
          <p className="widget-title">Recent Updates</p>
          <p className="widget-content">No Updates</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <div className="left-section">
          <div className="dashboard-row">
            <div className="dashboard-card client-appointment-card">
              <div className="card-header">
                <p className="title">Client Appointment</p>
              </div>
              <div className="card-content">
                <img
                  src={schedule}
                  alt="Schedule Illustration"
                  className="card-image"
                />
                <p className="description">No Appointments</p>
              </div>
            </div>

            <div className="dashboard-card client-appointment-card">
              <div className="card-header">
                <p className="title">Pending Appointments</p>
              </div>
              <div className="card-content">
                <img
                  src={schedule}
                  alt="Schedule Illustration"
                  className="card-image"
                />
                <p className="description">No Appointments</p>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card client-appointment-card">
              <div className="card-header">
                <p className="title">Pending Appointments</p>
              </div>
              <div className="card-content">
                <img
                  src={schedule2}
                  alt="Schedule Illustration"
                  className="card-image"
                />
                <p className="description">No Appointments</p>
              </div>
            </div>
            <div className="dashboard-card client-appointment-card">
              <div className="card-header">
                <p className="title">Recent Cases</p>
              </div>
              <div className="card-content">
                <img
                  src={schedule3}
                  alt="Schedule Illustration"
                  className="card-image"
                />
                <p className="description">No Recent Cases</p>
              </div>
            </div>
          </div>

          <div className="court-hearings">
            <p className="title">Court Hearings</p>
            <p className="description">No Court Hearings</p>
          </div>
        </div>

        <div className="right-section">
          <div className="team-members">
            <p className="widget-title">Team Members</p>
            <img
              src={schedule4}
              alt="Schedule Illustration"
              className="card-image1"
            />
            <button className="add-member-btn">Add New Member</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LDashboard;
