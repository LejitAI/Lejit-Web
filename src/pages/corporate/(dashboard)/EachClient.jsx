import React from 'react';
import './EachClient.css';

const EachClient = () => {
  return (
    <div className="client-container">
      <div className="client-header">
        <h1>Client Details</h1>
        <div className="client-actions">
          <button className="action-icon chat-icon"></button>
          <button className="action-icon call-icon"></button>
          <button className="action-icon video-icon"></button>
          <button className="action-edit">Edit</button>
        </div>
      </div>

      <div className="client-card">
        <div className="client-info">
          <img
            src="https://via.placeholder.com/120" // Replace with actual profile picture URL
            alt="Profile"
            className="client-image"
          />
          <div>
            <h2 className="client-name">Will Damon</h2>
            <p className="client-case">
              Criminal Defence Case <span className="client-location">| Florida</span>
            </p>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail">
          <label>Email ID</label>
          <input type="text" value="john123@email.com" readOnly />
        </div>
        <div className="detail">
          <label>Phone Number</label>
          <input type="text" value="+1 (201) 555 555" readOnly />
        </div>
        <div className="detail">
          <label>Date of Birth</label>
          <input type="text" value="08/04/1976" readOnly />
        </div>
        <div className="detail">
          <label>Gender</label>
          <input type="text" value="Male" readOnly />
        </div>
        <div className="detail">
          <label>Address</label>
          <input type="text" value="12/345, Florida" readOnly />
        </div>
        <div className="detail">
          <label>Case Type</label>
          <input type="text" value="Criminal Defence" readOnly />
        </div>
      </div>

      <div className="client-footer">
        <button className="footer-button add-case">ADD CASE DETAILS</button>
        <button className="footer-button view-case">VIEW CASE DETAILS</button>
      </div>
    </div>
  );
};

export default EachClient;
