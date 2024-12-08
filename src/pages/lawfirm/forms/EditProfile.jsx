import React, { useState } from 'react';
import './EditProfile.css';
import Logo from '../../assets/logo.png';

const EditProfile = () => {
  const totalFields = 21; // Total number of fields to track
  const [filledFields, setFilledFields] = useState(new Set()); // Track filled fields
  const [activeSection, setActiveSection] = useState('lawFirmDetails');

  // Calculate progress percentage
  const progressPercentage = Math.round((filledFields.size / totalFields) * 100);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? '' : section));
  };

  const handleFieldChange = (e, fieldName) => {
    const value = e.target.value.trim();

    setFilledFields((prev) => {
      const newSet = new Set(prev);
      if (value) {
        newSet.add(fieldName); // Add field to filled set if non-empty
      } else {
        newSet.delete(fieldName); // Remove field from filled set if empty
      }
      return newSet;
    });
  };

  return (
    <div className="edit-profile-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="header">
          <button className="back-button">
            <span className="back-icon"></span>
          </button>
          <h2>Law Firm Details</h2>
        </div>
        <p className="header-description">
          Complete your personal details to help clients understand your background and expertise.
        </p>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-card">
          <div
            className="profile-image"
            style={{
              background: `conic-gradient(#0F67FD ${progressPercentage}%, #E5E5E5 ${progressPercentage}%)`,
            }}
          >
            <div className="image-background">
              <img src={Logo} alt="Logo" className="logo" />
            </div>
            <div className="progress">
              <div className="progress-bar">
                <span>{progressPercentage}%</span>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <h3>Law Firm LLC</h3>
            <p>12 Years</p>
          </div>
        </div>
      </div>

      {/* Law Firm Details Section */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection('lawFirmDetails')}>
          <h2>Law Firm Details</h2>
          <div className={`arrow ${activeSection === 'lawFirmDetails' ? 'up' : 'down'}`}></div>
        </div>
        {activeSection === 'lawFirmDetails' && (
          <div className="section-content">
            <div className="two-column">
              <input
                placeholder="Law Firm Name *"
                onChange={(e) => handleFieldChange(e, 'lawFirmName')}
              />
              <input
                placeholder="Operating Since *"
                onChange={(e) => handleFieldChange(e, 'operatingSince')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Year of Experience *"
                onChange={(e) => handleFieldChange(e, 'experience')}
              />
              <input
                placeholder="Select Specialization *"
                onChange={(e) => handleFieldChange(e, 'specialization')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Email *"
                onChange={(e) => handleFieldChange(e, 'email')}
              />
              <input
                placeholder="Mobile *"
                onChange={(e) => handleFieldChange(e, 'mobile')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Address Line 1 *"
                onChange={(e) => handleFieldChange(e, 'address1')}
              />
              <input
                placeholder="Address Line 2 *"
                onChange={(e) => handleFieldChange(e, 'address2')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="City/District *"
                onChange={(e) => handleFieldChange(e, 'city')}
              />
              <input
                placeholder="State/Province *"
                onChange={(e) => handleFieldChange(e, 'state')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Postal Code *"
                onChange={(e) => handleFieldChange(e, 'postalCode')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Professional Details Section */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection('professionalDetails')}>
          <h2>Professional Details</h2>
          <div className={`arrow ${activeSection === 'professionalDetails' ? 'up' : 'down'}`}></div>
        </div>
        {activeSection === 'professionalDetails' && (
          <div className="section-content professional-details">
            <div className="two-column">
              <input
                placeholder="Lawyer Type"
                onChange={(e) => handleFieldChange(e, 'lawyerType')}
              />
              <input
                placeholder="Select Specialization *"
                onChange={(e) => handleFieldChange(e, 'specialization2')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Approx No. of Cases Solved *"
                onChange={(e) => handleFieldChange(e, 'casesSolved')}
              />
              <input
                placeholder="Time-Based Bill Rate *"
                onChange={(e) => handleFieldChange(e, 'timeRate')}
              />
            </div>
            <div className="two-column">
              <input
                placeholder="Case-Based Bill Rate"
                onChange={(e) => handleFieldChange(e, 'caseRate')}
              />
              <input
                placeholder="Monthly Bill Rate"
                onChange={(e) => handleFieldChange(e, 'monthlyRate')}
              />
            </div>
            <h3>Previous Cases</h3>
      <div className="two-column">
        <input placeholder="Case Type *" />
        <input placeholder="Case Description" />
      </div>
      <button className="add-case">+ Add another case</button>
    
          </div>
          
        )}
      </div>

      {/* Bank Account Details Section */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection('bankDetails')}>
          <h2>Bank Account Details</h2>
          <div className={`arrow ${activeSection === 'bankDetails' ? 'up' : 'down'}`}></div>
        </div>
        {activeSection === 'bankDetails' && (
          <div className="section-content bank-details">
            <div className="payment-options">
              <p>Pay With:</p>
              <div className="payment-methods">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    defaultChecked
                    onChange={(e) => handleFieldChange(e, 'paymentCard')}
                  />
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Bank"
                    onChange={(e) => handleFieldChange(e, 'paymentBank')}
                  />
                  Bank
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    onChange={(e) => handleFieldChange(e, 'paymentUPI')}
                  />
                  UPI
                </label>
              </div>
            </div>
            <div className="three-column">
              <div>
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  onChange={(e) => handleFieldChange(e, 'cardNumber')}
                />
              </div>
              <div>
                <label>Expiration Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  onChange={(e) => handleFieldChange(e, 'expiryDate')}
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  onChange={(e) => handleFieldChange(e, 'cvv')}
                />
              </div>
              
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="update-button">Update Details</button>
      </div>
    </div>
  );
};

export default EditProfile;
