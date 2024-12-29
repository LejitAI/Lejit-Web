import React, { useState, useEffect } from "react";
import "./ProfileInside.css";
import axios from "axios";

const ProfileInside = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [lawFirmDetails, setLawFirmDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch law firm details from the backend
    const fetchLawFirmDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        const response = await axios.get("backend/api/admin/get-law-firm-details", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLawFirmDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching law firm details:", err);
        setError("Failed to load law firm details. Please try again later.");
        setLoading(false);
      }
    };

    fetchLawFirmDetails();
  }, []);

  const renderTabContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    switch (activeTab) {
      case "personal":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Name</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.lawFirmName}</div>
              </div>
              <div className="input-field">
                <label>Email ID</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.contactInfo.email}</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Phone Number</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.contactInfo.mobile}</div>
              </div>
              <div className="input-field">
                <label>Address</label>
                <div className="input">
                  {`${lawFirmDetails.lawFirmDetails.contactInfo.address.line1}, ${
                    lawFirmDetails.lawFirmDetails.contactInfo.address.city || ""
                  }`}
                </div>
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
                <div className="input">{lawFirmDetails.lawFirmDetails.lawFirmName}</div>
              </div>
              <div className="input-field">
                <label>Operating Since</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.operatingSince}</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Years of Experience</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.yearsOfExperience}</div>
              </div>
              <div className="input-field">
                <label>Specialization</label>
                <div className="input">{lawFirmDetails.lawFirmDetails.specialization}</div>
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
                <div className="input">{lawFirmDetails.professionalDetails.lawyerType}</div>
              </div>
              <div className="input-field">
                <label>Case-Based Bill Rate</label>
                <div className="input">{lawFirmDetails.professionalDetails.caseDetails.caseBasedBillRate}</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Time-Based Bill Rate</label>
                <div className="input">{lawFirmDetails.professionalDetails.caseDetails.timeBasedBillRate}</div>
              </div>
              <div className="input-field">
                <label>Approx. Cases Solved</label>
                <div className="input">{lawFirmDetails.professionalDetails.caseDetails.caseSolvedCount}</div>
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Case History</label>
                <div className="input">
                  {lawFirmDetails.professionalDetails.caseDetails.previousCases.map((caseItem, index) => (
                    <div key={index}>
                      <p>Type: {caseItem.caseType}</p>
                      <p>Description: {caseItem.caseDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Payment Method</label>
                <div className="input">{lawFirmDetails.bankAccountDetails.paymentMethod}</div>
              </div>
            </div>
            {lawFirmDetails.bankAccountDetails.paymentMethod === "Card" && (
              <div className="tab-row">
                <div className="input-field">
                  <label>Card Number</label>
                  <div className="input">**** **** **** {lawFirmDetails.bankAccountDetails.cardDetails.cardNumber.slice(-4)}</div>
                </div>
                <div className="input-field">
                  <label>Expiration Date</label>
                  <div className="input">{lawFirmDetails.bankAccountDetails.cardDetails.expirationDate}</div>
                </div>
                <div className="input-field">
                  <label>CVV</label>
                  <div className="input">***</div>
                </div>
              </div>
            )}
            {lawFirmDetails.bankAccountDetails.paymentMethod === "Bank" && (
              <div className="tab-row">
                <div className="input-field">
                  <label>Account Number</label>
                  <div className="input">{lawFirmDetails.bankAccountDetails.bankDetails.accountNumber}</div>
                </div>
                <div className="input-field">
                  <label>Bank Name</label>
                  <div className="input">{lawFirmDetails.bankAccountDetails.bankDetails.bankName}</div>
                </div>
                <div className="input-field">
                  <label>IFSC Code</label>
                  <div className="input">{lawFirmDetails.bankAccountDetails.bankDetails.ifscCode}</div>
                </div>
              </div>
            )}
            {lawFirmDetails.bankAccountDetails.paymentMethod === "UPI" && (
              <div className="tab-row">
                <div className="input-field">
                  <label>UPI ID</label>
                  <div className="input">{lawFirmDetails.bankAccountDetails.upiId}</div>
                </div>
              </div>
            )}
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
          <h2>{lawFirmDetails?.lawFirmDetails?.lawFirmName || "Loading..."}</h2>
          <p>
            {lawFirmDetails?.lawFirmDetails?.contactInfo?.mobile || "Loading..."} |{" "}
            {lawFirmDetails?.lawFirmDetails?.contactInfo?.email || "Loading..."}
          </p>
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
