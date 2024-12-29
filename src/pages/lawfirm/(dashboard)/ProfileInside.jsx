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

    switch (activeTab) {
      case "personal":
        return (
          <div className="tab-content">
            <div className="tab-row">
              <div className="input-field">
                <label>Name</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.lawFirmName}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "lawFirmName", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.lawFirmName}</div>
                )}
              </div>
              <div className="input-field">
                <label>Email ID</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.contactInfo.email}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "contactInfo.email", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.contactInfo.email}</div>
                )}
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Phone Number</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.contactInfo.mobile}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "contactInfo.mobile", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.contactInfo.mobile}</div>
                )}
              </div>
              <div className="input-field">
                <label>Address</label>
                {editMode ? (
                  <>
                    <input
                      value={details.lawFirmDetails.contactInfo.address.line1}
                      onChange={(e) =>
                        handleFieldChange(
                          "lawFirmDetails",
                          "contactInfo.address.line1",
                          e.target.value
                        )
                      }
                      placeholder="Address Line 1"
                    />
                    <input
                      value={details.lawFirmDetails.contactInfo.address.line2}
                      onChange={(e) =>
                        handleFieldChange(
                          "lawFirmDetails",
                          "contactInfo.address.line2",
                          e.target.value
                        )
                      }
                      placeholder="Address Line 2"
                    />
                    <input
                      value={details.lawFirmDetails.contactInfo.address.city}
                      onChange={(e) =>
                        handleFieldChange(
                          "lawFirmDetails",
                          "contactInfo.address.city",
                          e.target.value
                        )
                      }
                      placeholder="City"
                    />
                    <input
                      value={details.lawFirmDetails.contactInfo.address.state}
                      onChange={(e) =>
                        handleFieldChange(
                          "lawFirmDetails",
                          "contactInfo.address.state",
                          e.target.value
                        )
                      }
                      placeholder="State"
                    />
                    <input
                      value={details.lawFirmDetails.contactInfo.address.postalCode}
                      onChange={(e) =>
                        handleFieldChange(
                          "lawFirmDetails",
                          "contactInfo.address.postalCode",
                          e.target.value
                        )
                      }
                      placeholder="Postal Code"
                    />
                  </>
                ) : (
                  <div className="input">
                    {details.lawFirmDetails.contactInfo.address.line1},{" "}
                    {details.lawFirmDetails.contactInfo.address.line2},{" "}
                    {details.lawFirmDetails.contactInfo.address.city},{" "}
                    {details.lawFirmDetails.contactInfo.address.state},{" "}
                    {details.lawFirmDetails.contactInfo.address.postalCode}
                  </div>
                )}
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
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.lawFirmName}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "lawFirmName", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.lawFirmName}</div>
                )}
              </div>
              <div className="input-field">
                <label>Operating Since</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.operatingSince}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "operatingSince", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.operatingSince}</div>
                )}
              </div>
            </div>
            <div className="tab-row">
              <div className="input-field">
                <label>Years of Experience</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.yearsOfExperience}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "yearsOfExperience", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.yearsOfExperience}</div>
                )}
              </div>
              <div className="input-field">
                <label>Specialization</label>
                {editMode ? (
                  <input
                    value={details.lawFirmDetails.specialization}
                    onChange={(e) =>
                      handleFieldChange("lawFirmDetails", "specialization", e.target.value)
                    }
                  />
                ) : (
                  <div className="input">{details.lawFirmDetails.specialization}</div>
                )}
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
                  {editMode ? (
                    <input
                      value={details.professionalDetails.lawyerType}
                      onChange={(e) =>
                        handleFieldChange("professionalDetails", "lawyerType", e.target.value)
                      }
                    />
                  ) : (
                    <div className="input">{details.professionalDetails.lawyerType}</div>
                  )}
                </div>
                <div className="input-field">
                  <label>Case-Based Bill Rate</label>
                  {editMode ? (
                    <input
                      value={details.professionalDetails.caseDetails.caseBasedBillRate}
                      onChange={(e) =>
                        handleFieldChange(
                          "professionalDetails",
                          "caseDetails.caseBasedBillRate",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <div className="input">{details.professionalDetails.caseDetails.caseBasedBillRate}</div>
                  )}
                </div>
              </div>
              <div className="tab-row">
                <div className="input-field">
                  <label>Time-Based Bill Rate</label>
                  {editMode ? (
                    <input
                      value={details.professionalDetails.caseDetails.timeBasedBillRate}
                      onChange={(e) =>
                        handleFieldChange(
                          "professionalDetails",
                          "caseDetails.timeBasedBillRate",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <div className="input">{details.professionalDetails.caseDetails.timeBasedBillRate}</div>
                  )}
                </div>
                <div className="input-field">
                  <label>Approx. Cases Solved</label>
                  {editMode ? (
                    <input
                      value={details.professionalDetails.caseDetails.caseSolvedCount}
                      onChange={(e) =>
                        handleFieldChange(
                          "professionalDetails",
                          "caseDetails.caseSolvedCount",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <div className="input">{details.professionalDetails.caseDetails.caseSolvedCount}</div>
                  )}
                </div>
              </div>
              <div className="tab-row">
                <div className="input-field">
                  <label>Case History</label>
                  {details.professionalDetails.caseDetails.previousCases.map((caseItem, index) => (
                    <div key={index} className="case-item">
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
              <div className="tab-row">
                <div className="input-field">
                  <label>Payment Method</label>
                  {editMode ? (
                    <select
                      value={details.bankAccountDetails.paymentMethod}
                      onChange={(e) =>
                        handleFieldChange("bankAccountDetails", "paymentMethod", e.target.value)
                      }
                    >
                      <option value="Card">Card</option>
                      <option value="Bank">Bank</option>
                      <option value="UPI">UPI</option>
                    </select>
                  ) : (
                    <div className="input">{details.bankAccountDetails.paymentMethod}</div>
                  )}
                </div>
              </div>
              {details.bankAccountDetails.paymentMethod === "Card" && (
                <div className="tab-row">
                  <div className="input-field">
                    <label>Card Number</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.cardDetails.cardNumber}
                        onChange={(e) =>
                          handleFieldChange("bankAccountDetails", "cardDetails.cardNumber", e.target.value)
                        }
                      />
                    ) : (
                      <div className="input">
                        **** **** **** {details.bankAccountDetails.cardDetails.cardNumber.slice(-4)}
                      </div>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Expiration Date</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.cardDetails.expirationDate}
                        onChange={(e) =>
                          handleFieldChange(
                            "bankAccountDetails",
                            "cardDetails.expirationDate",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <div className="input">{details.bankAccountDetails.cardDetails.expirationDate}</div>
                    )}
                  </div>
                  <div className="input-field">
                    <label>CVV</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.cardDetails.cvv}
                        onChange={(e) =>
                          handleFieldChange("bankAccountDetails", "cardDetails.cvv", e.target.value)
                        }
                      />
                    ) : (
                      <div className="input">***</div>
                    )}
                  </div>
                </div>
              )}
              {details.bankAccountDetails.paymentMethod === "Bank" && (
                <div className="tab-row">
                  <div className="input-field">
                    <label>Account Number</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.bankDetails.accountNumber}
                        onChange={(e) =>
                          handleFieldChange(
                            "bankAccountDetails",
                            "bankDetails.accountNumber",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      <div className="input">{details.bankAccountDetails.bankDetails.accountNumber}</div>
                    )}
                  </div>
                  <div className="input-field">
                    <label>Bank Name</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.bankDetails.bankName}
                        onChange={(e) =>
                          handleFieldChange("bankAccountDetails", "bankDetails.bankName", e.target.value)
                        }
                      />
                    ) : (
                      <div className="input">{details.bankAccountDetails.bankDetails.bankName}</div>
                    )}
                  </div>
                  <div className="input-field">
                    <label>IFSC Code</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.bankDetails.ifscCode}
                        onChange={(e) =>
                          handleFieldChange("bankAccountDetails", "bankDetails.ifscCode", e.target.value)
                        }
                      />
                    ) : (
                      <div className="input">{details.bankAccountDetails.bankDetails.ifscCode}</div>
                    )}
                  </div>
                </div>
              )}
              {details.bankAccountDetails.paymentMethod === "UPI" && (
                <div className="tab-row">
                  <div className="input-field">
                    <label>UPI ID</label>
                    {editMode ? (
                      <input
                        value={details.bankAccountDetails.upiId}
                        onChange={(e) =>
                          handleFieldChange("bankAccountDetails", "upiId", e.target.value)
                        }
                      />
                    ) : (
                      <div className="input">{details.bankAccountDetails.upiId}</div>
                    )}
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
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInside;
