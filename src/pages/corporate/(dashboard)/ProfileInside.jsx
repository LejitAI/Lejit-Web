import React, { useState, useEffect } from "react";
import "./ProfileInside.css";
import axios from "axios";

const ProfileInside = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [lawFirmDetails, setLawFirmDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch law firm details from the backend
    const fetchLawFirmDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("backend/api/admin/get-law-firm-details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLawFirmDetails(response.data);
        setEditedDetails(response.data); // Initialize edited details
        setLoading(false);
      } catch (err) {
        console.error("Error fetching law firm details:", err);
        setError("Failed to load law firm details. Please try again later.");
        setLoading(false);
      }
    };

    fetchLawFirmDetails();
  }, []);

  // Handle field changes during editing
  const handleFieldChange = (section, field, value) => {
    const fields = field.split(".");
    setEditedDetails((prev) => {
      let updated = { ...prev };
      let pointer = updated[section];
      fields.slice(0, -1).forEach((key) => {
        pointer = pointer[key];
      });
      pointer[fields[fields.length - 1]] = value;
      return updated;
    });
  };

  // Save updated details using the PUT API
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "backend/api/admin/update-law-firm-details",
        {
          lawFirmDetails: editedDetails.lawFirmDetails,
          professionalDetails: editedDetails.professionalDetails,
          bankAccountDetails: editedDetails.bankAccountDetails,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Law firm details updated successfully!");
      setEditMode(false); // Exit edit mode
      setLawFirmDetails(editedDetails); // Reflect saved changes
    } catch (err) {
      console.error("Error updating law firm details:", err);
      alert("Failed to update law firm details.");
    }
  };

  const renderTabContent = () => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    const details = editMode ? editedDetails : lawFirmDetails;

    // Render tab contents dynamically
    const renderFields = (section, fields) =>
      fields.map(({ label, field }, index) => (
        <div className="input-field" key={index}>
          <label>{label}</label>
          {editMode ? (
            <input
              value={field.split(".").reduce((acc, key) => acc[key], details[section]) || ""}
              onChange={(e) => handleFieldChange(section, field, e.target.value)}
            />
          ) : (
            <div className="input">
              {field.split(".").reduce((acc, key) => acc[key], details[section]) || "N/A"}
            </div>
          )}
        </div>
      ));

    switch (activeTab) {
      case "personal":
        return (
          <div className="tab-content">
            {renderFields("lawFirmDetails", [
              { label: "Name", field: "lawFirmName" },
              { label: "Email ID", field: "contactInfo.email" },
              { label: "Phone Number", field: "contactInfo.mobile" },
              { label: "Address Line 1", field: "contactInfo.address.line1" },
              { label: "City", field: "contactInfo.address.city" },
              { label: "State", field: "contactInfo.address.state" },
              { label: "Postal Code", field: "contactInfo.address.postalCode" },
            ])}
          </div>
        );
      case "lawFirm":
        return (
          <div className="tab-content">
            {renderFields("lawFirmDetails", [
              { label: "Firm Name", field: "lawFirmName" },
              { label: "Operating Since", field: "operatingSince" },
              { label: "Years of Experience", field: "yearsOfExperience" },
              { label: "Specialization", field: "specialization" },
            ])}
          </div>
        );
      case "professional":
        return (
          <div className="tab-content">
            {renderFields("professionalDetails", [
              { label: "Lawyer Type", field: "lawyerType" },
              { label: "Case-Based Bill Rate", field: "caseDetails.caseBasedBillRate" },
              { label: "Time-Based Bill Rate", field: "caseDetails.timeBasedBillRate" },
              { label: "Approx. Cases Solved", field: "caseDetails.caseSolvedCount" },
            ])}
            <div className="input-field">
              <label>Case History</label>
              <div className="input">
                {details.professionalDetails.caseDetails.previousCases.map((caseItem, index) => (
                  <div key={index}>
                    {editMode ? (
                      <>
                        <input
                          value={caseItem.caseType}
                          onChange={(e) =>
                            handleFieldChange(
                              "professionalDetails",
                              `caseDetails.previousCases.${index}.caseType`,
                              e.target.value
                            )
                          }
                          placeholder="Case Type"
                        />
                        <input
                          value={caseItem.caseDescription}
                          onChange={(e) =>
                            handleFieldChange(
                              "professionalDetails",
                              `caseDetails.previousCases.${index}.caseDescription`,
                              e.target.value
                            )
                          }
                          placeholder="Case Description"
                        />
                      </>
                    ) : (
                      <>
                        <p>Type: {caseItem.caseType}</p>
                        <p>Description: {caseItem.caseDescription}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="tab-content">
            {renderFields("bankAccountDetails", [
              { label: "Payment Method", field: "paymentMethod" },
            ])}
            {details.bankAccountDetails.paymentMethod === "Card" &&
              renderFields("bankAccountDetails", [
                { label: "Card Number", field: "cardDetails.cardNumber" },
                { label: "Expiration Date", field: "cardDetails.expirationDate" },
                { label: "CVV", field: "cardDetails.cvv" },
              ])}
            {details.bankAccountDetails.paymentMethod === "Bank" &&
              renderFields("bankAccountDetails", [
                { label: "Account Number", field: "bankDetails.accountNumber" },
                { label: "Bank Name", field: "bankDetails.bankName" },
                { label: "IFSC Code", field: "bankDetails.ifscCode" },
              ])}
            {details.bankAccountDetails.paymentMethod === "UPI" &&
              renderFields("bankAccountDetails", [
                { label: "UPI ID", field: "upiId" },
              ])}
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
            <button className="edit-btn" onClick={() => setEditMode((prev) => !prev)}>
              {editMode ? "Cancel" : "Edit"}
            </button>
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

      {editMode && (
        <div className="action-buttons">
          <button className="save-button" onClick={handleSaveChanges}>
            SAVE CHANGES
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInside;
