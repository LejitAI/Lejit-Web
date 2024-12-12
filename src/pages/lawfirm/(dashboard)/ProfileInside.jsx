import React, { useState } from "react";
import "./ProfileInside.css"; // Assuming the CSS you provided is in ProfileInside.css

const ProfileInside = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Name</label>
                <div className="input">Law Firm LLC</div>
              </div>
              <div className="input-field">
                <label>Password</label>
                <div className="input">******</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Email ID</label>
                <div className="input">john123@email.com</div>
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <div className="input">+1 (201) 555 555</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Years of Experience</label>
                <div className="input">9</div>
              </div>
              <div className="input-field">
                <label>Specialisation</label>
                <div className="input">Criminal Defence</div>
              </div>
            </div>
          </div>
        );
      case "lawFirm":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Firm Name</label>
                <div className="input">Law Firm LLC</div>
              </div>
              <div className="input-field">
                <label>Email ID</label>
                <div className="input">john123@email.com</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Address</label>
                <div className="input">12/345, New York</div>
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <div className="input">+1 (201) 555 555</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Operating Since</label>
                <div className="input">20 years</div>
              </div>
            </div>
          </div>
        );
      case "professional":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Lawyer Type</label>
                <div className="input">Criminal Defence</div>
              </div>
              <div className="input-field">
                <label>Specialisation</label>
                <div className="input">Criminal Defence</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Approx No of Cases Solved</label>
                <div className="input">17</div>
              </div>
              <div className="input-field">
                <label>Time Based Bill Rate</label>
                <div className="input">$50/hr</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Case Based Bill Rate</label>
                <div className="input">$500</div>
              </div>
              <div className="input-field">
                <label>Monthly Bill Rate</label>
                <div className="input">$1500</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Case History :</label>
                <div className="input">Case Type: Criminal Defence</div>
              </div>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>
                  <input type="radio" name="paymentMethod" defaultChecked /> Card
                </label>
                <label>
                  <input type="radio" name="paymentMethod" /> Bank
                </label>
                <label>
                  <input type="radio" name="paymentMethod" /> UPI
                </label>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Card Number</label>
                <div className="input">**** **** **** 1121</div>
              </div>
              <div className="input-field">
                <label>Expiration Date</label>
                <div className="input">MM/YY</div>
              </div>
              <div className="input-field">
                <label>CVV</label>
                <div className="input">***</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image">
          <img src="/path/to/image.jpg" alt="Profile" />
          <div className="image-overlay">
            <button className="edit-btn">Edit</button>
          </div>
        </div>
        <div className="profile-info">
          <h2>Law Firm LLC</h2>
          <p>+1 (503) 254366 | emma123@email.com</p>
        </div>
      </div>

      <div className="metrics">
        <div className="metric" style={{ backgroundColor: "#FFFEE8" }}>
          <h3>23</h3>
          <p>Total Cases</p>
        </div>
        <div className="metric" style={{ backgroundColor: "#FFEEED" }}>
          <h3>10</h3>
          <p>No. of Team Members</p>
        </div>
        <div className="metric" style={{ backgroundColor: "#EEF4FF" }}>
          <h3>17</h3>
          <p>No. of Clients</p>
        </div>
        <div className="metric" style={{ backgroundColor: "#F0FFEE" }}>
          <h3>$1360</h3>
          <p>Total Revenue</p>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "personal" ? "tab active" : "tab"}
          onClick={() => setActiveTab("personal")}
        >
          Personal Details
        </button>
        <button
          className={activeTab === "lawFirm" ? "tab active" : "tab"}
          onClick={() => setActiveTab("lawFirm")}
        >
          Law Firm Details
        </button>
        <button
          className={activeTab === "professional" ? "tab active" : "tab"}
          onClick={() => setActiveTab("professional")}
        >
          Professional Details
        </button>
        <button
          className={activeTab === "bank" ? "tab active" : "tab"}
          onClick={() => setActiveTab("bank")}
        >
          Bank Details
        </button>
      </div>

      <div className="tab-container">{renderTabContent()}</div>
    </div>
  );
};

export default ProfileInside;