import React, { useState } from 'react';
import './EditProfile.css';
import Logo from '../../assets/logo.png';
import axios from 'axios';

const EditProfile = () => {
  const totalFields = 21; // Adjust based on the total fields
  const [filledFields, setFilledFields] = useState(new Set());
  const [activeSection, setActiveSection] = useState('lawFirmDetails');
  const [formData, setFormData] = useState({
    lawFirmDetails: {
      lawFirmName: '',
      operatingSince: '',
      yearsOfExperience: '',
      specialization: '',
      contactInfo: {
        email: '',
        mobile: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postalCode: '',
        },
      },
    },
    professionalDetails: {
      lawyerType: '',
      caseDetails: {
        caseSolvedCount: 0, // Number
        caseBasedBillRate: '', // String
        timeBasedBillRate: '', // String
        previousCases: [{ caseType: '', caseDescription: '' }],
      },
    },
    bankAccountDetails: {
      paymentMethod: 'Card',
      cardDetails: {
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        saveCard: false,
      },
      bankDetails: {
        accountNumber: '',
        bankName: '',
        ifscCode: '',
      },
      upiId: '',
    },
  });

  const progressPercentage = Math.round((filledFields.size / totalFields) * 100);

  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? '' : section));
  };

  const handleFieldChange = (e, path) => {
    const value = e.target.value.trim();

    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split('.');
      let pointer = updated;

      keys.slice(0, -1).forEach((key) => {
        pointer = pointer[key];
      });

      pointer[keys[keys.length - 1]] = value;
      return updated;
    });

    setFilledFields((prev) => {
      const newSet = new Set(prev);
      if (value) {
        newSet.add(path);
      } else {
        newSet.delete(path);
      }
      return newSet;
    });
  };

  const addPreviousCase = () => {
    setFormData((prev) => ({
      ...prev,
      professionalDetails: {
        ...prev.professionalDetails,
        caseDetails: {
          ...prev.professionalDetails.caseDetails,
          previousCases: [
            ...prev.professionalDetails.caseDetails.previousCases,
            { caseType: '', caseDescription: '' },
          ],
        },
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('backend/api/admin/add-law-firm-details', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Law firm details updated successfully!');
    } catch (error) {
      console.error('Error updating law firm details:', error);
      alert('Failed to update law firm details. Please check your inputs.');
    }
  };

  return (
    <div className="edit-profile-container">
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
            <h3>{formData.lawFirmDetails.lawFirmName || 'Law Firm LLC'}</h3>
            <p>{formData.lawFirmDetails.operatingSince || '12 Years'}</p>
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
            <input
              placeholder="Law Firm Name *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.lawFirmName')}
            />
            <input
              placeholder="Operating Since *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.operatingSince')}
            />
            <input
              placeholder="Years of Experience *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.yearsOfExperience')}
            />
            <input
              placeholder="Specialization *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.specialization')}
            />
            <input
              placeholder="Email *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.email')}
            />
            <input
              placeholder="Mobile *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.mobile')}
            />
            <input
              placeholder="Address Line 1 *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.address.line1')}
            />
            <input
              placeholder="City *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.address.city')}
            />
            <input
              placeholder="State *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.address.state')}
            />
            <input
              placeholder="Postal Code *"
              onChange={(e) => handleFieldChange(e, 'lawFirmDetails.contactInfo.address.postalCode')}
            />
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
          <div className="section-content">
            <input
              placeholder="Lawyer Type *"
              onChange={(e) => handleFieldChange(e, 'professionalDetails.lawyerType')}
            />
            <input
              placeholder="Cases Solved *"
              type="number"
              onChange={(e) => handleFieldChange(e, 'professionalDetails.caseDetails.caseSolvedCount')}
            />
            <input
              placeholder="Time-Based Bill Rate *"
              onChange={(e) => handleFieldChange(e, 'professionalDetails.caseDetails.timeBasedBillRate')}
            />
            <input
              placeholder="Case-Based Bill Rate *"
              onChange={(e) => handleFieldChange(e, 'professionalDetails.caseDetails.caseBasedBillRate')}
            />
            <h3>Previous Cases</h3>
            {formData.professionalDetails.caseDetails.previousCases.map((caseItem, index) => (
              <div className="two-column" key={index}>
                <input
                  placeholder="Case Type *"
                  onChange={(e) =>
                    handleFieldChange(e, `professionalDetails.caseDetails.previousCases.${index}.caseType`)
                  }
                />
                <input
                  placeholder="Case Description"
                  onChange={(e) =>
                    handleFieldChange(
                      e,
                      `professionalDetails.caseDetails.previousCases.${index}.caseDescription`
                    )
                  }
                />
              </div>
            ))}
            <button onClick={addPreviousCase}>+ Add another case</button>
          </div>
        )}
      </div>

      {/* Bank Account Details Section */}
      <div className="section">
        <div className="section-header" onClick={() => toggleSection('bankAccountDetails')}>
          <h2>Bank Account Details</h2>
          <div className={`arrow ${activeSection === 'bankAccountDetails' ? 'up' : 'down'}`}></div>
        </div>
        {activeSection === 'bankAccountDetails' && (
          <div className="section-content">
            <div className="payment-options">
              <p>Pay With:</p>
              <div className="payment-methods">
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    onChange={(e) => handleFieldChange(e, 'bankAccountDetails.paymentMethod')}
                  />
                  Card
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="Bank"
                    onChange={(e) => handleFieldChange(e, 'bankAccountDetails.paymentMethod')}
                  />
                  Bank
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    onChange={(e) => handleFieldChange(e, 'bankAccountDetails.paymentMethod')}
                  />
                  UPI
                </label>
              </div>
            </div>
            <input
              placeholder="Card Number *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.cardDetails.cardNumber')}
            />
            <input
              placeholder="Expiration Date *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.cardDetails.expirationDate')}
            />
            <input
              placeholder="CVV *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.cardDetails.cvv')}
            />
            <input
              placeholder="Account Number *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.bankDetails.accountNumber')}
            />
            <input
              placeholder="Bank Name *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.bankDetails.bankName')}
            />
            <input
              placeholder="IFSC Code *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.bankDetails.ifscCode')}
            />
            <input
              placeholder="UPI ID *"
              onChange={(e) => handleFieldChange(e, 'bankAccountDetails.upiId')}
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="update-button" onClick={handleSubmit}>
          Update Details
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
