import React from "react";
import "./LDashboard.css";
import schedule from "./Schedule.png";
import Doc from "./Doc.png";
import Dollar from "./dollar.png";

const LDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>
      
      <div className="summary-container">
        <div className="card ongoing-card">
          <div className="icon">
            <img src={Doc} alt="Ongoing Icon" />
          </div>
          <div className="text">
            <p className="title">Ongoing Cases</p>
            <p className="subtitle">04</p>
          </div>
        </div>
        <div className="card closed-card">
          <div className="icon">
            <img src={Doc} alt="Closed Icon" />
          </div>
          <div className="text">
            <p className="title">Closed Cases</p>
            <p className="subtitle">34</p>
          </div>
        </div>
        <div className="card pending-card">
          <div className="icon">
            <img src={Dollar} alt="Pending Icon" />
          </div>
          <div className="text">
            <p className="title">Pending Payments</p>
            <p className="subtitle">05</p>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="appointments-section">
          <div className="client-appointments">
            <h2 className="section-title">Client Appointment</h2>
            <div className="calendar">
              <div className="date active">
                <p>THU</p>
                <p>11</p>
                <p>SEP</p>
              </div>
              <div className="date">
                <p>FRI</p>
                <p>12</p>
                <p>SEP</p>
              </div>
              <div className="date">
                <p>SAT</p>
                <p>13</p>
                <p>SEP</p>
              </div>
            </div>
            <div className="appointment-details">
              <img src={Doc} alt="John Doe" className="profile-img" />
              <div className="appointment-info">
                <p className="name">John Doe</p>
                <p className="case">Family Dispute Case</p>
                <p className="time">2:00 pm - 4:00 pm</p>
              </div>
              <div className="actions">
                <button className="accept-btn">Accept</button>
                <button className="reject-btn">Reject</button>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-title">Team Members</h2>
          <div className="team-list">
            <div className="member">
              <img src={Doc} alt="Adela" className="profile-img" />
              <p>Adela Parkson</p>
              <p>Criminal Case</p>
            </div>
            <div className="member">
              <img src={Doc} alt="Cristian" className="profile-img" />
              <p>Cristian Mad</p>
              <p>Property Case</p>
            </div>
          </div>
          <button className="add-member-btn">Add New Member</button>
        </div>

        <div className="ai-assist">
          <h2 className="section-title">Ask AI</h2>
          <div className="ai-options">
            <button>Draft Template</button>
            <button>Find Similar Documents</button>
            <button>Find Citation</button>
            <button>Find Case Laws</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LDashboard;
