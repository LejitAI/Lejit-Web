import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LawFirmLanding.css';
import '../forms/AddUser.css';
import AddUser from '../forms/AddUser';
import AddCase from '../forms/AddCase'; // Import AddCase component
import Logo from '../../assets/logo.png';

const LawFirmDetailsPage = () => {
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showAddCasePopup, setShowAddCasePopup] = useState(false); // State for AddCase popup
  const [lawFirmName, setLawFirmName] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedLawFirmName = localStorage.getItem('lawFirmName');
    if (storedLawFirmName) {
      setLawFirmName(storedLawFirmName);
    }
  }, []);

  const handleAddTeamMember = () => {
    setShowAddUserPopup(true);
  };

  const handleAddCase = () => {
    setShowAddCasePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddUserPopup(false);
    setShowAddCasePopup(false);
  };

  const handleSkip = () => {
    navigate('/profile');
  };

  return (
    <div className="lawfirm-container">
      <div className="lawfirm-left">
        <div className="law-firm-details">
          <div className="heading">
            <h1>Welcome, {lawFirmName || 'Law Firm'}!</h1>
            <p>Let’s build your professional profile and showcase your legal expertise</p>
          </div>
          <div className="content">
            {/* Profile Section */}
            <div className="firm-profile">
              <div className="profile-picture" />
              <div className="profile-info">
                <p className="profile-name">{lawFirmName || 'Law Firm'}</p>
                <p className="profile-role">12 years</p>
              </div>
              <button className="ebutton">Edit Profile</button>
            </div>
            <hr className="ldivider" />

            {/* Action Section 1 */}
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Professional Details</p>
                <p className="secondary-text">Add experience and qualifications</p>
              </div>
              <button className="button">Add</button>
            </div>
            <hr className="divider" />

            {/* Action Section 2 */}
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Manage Appointments</p>
                <p className="secondary-text">7.00 am to 10.00 pm</p>
              </div>
              <button className="button">Manage</button>
            </div>
            <hr className="divider" />

            {/* Action Section 3 */}
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Cases</p>
                <p className="secondary-text">Add open and closed cases</p>
              </div>
              <button className="button" onClick={handleAddCase}>Add</button> {/* Updated onClick */}
            </div>
            <hr className="divider" />

            {/* Action Section 4 */}
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Team Members</p>
                <p className="secondary-text">Add team member details</p>
              </div>
              <button className="button" onClick={handleAddTeamMember}>Add</button>
            </div>

            <div className="skip-section">
              <button className="skip-button" onClick={handleSkip}>Skip for Now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="lawfirm-right">
        <img src={Logo} alt="Logo" className="logo" />
      </div>

      {/* Popup for Add Team Member */}
      {showAddUserPopup && <AddUser onClose={handleClosePopup} />}

      {/* Popup for Add Case */}
      {showAddCasePopup && <AddCase isOpen={showAddCasePopup} onClose={handleClosePopup} />} {/* AddCase popup */}
    </div>
  );
};

export default LawFirmDetailsPage;
