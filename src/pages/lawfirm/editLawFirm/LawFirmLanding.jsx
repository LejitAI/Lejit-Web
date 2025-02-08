import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LawFirmLanding.css';
import '../forms/AddUser.css';
import AddUser from '../forms/AddUser';
import AddCase from '../forms/AddCase';
import EditProfile from '../forms/EditProfile';
import Logo from '../../assets/logo.png';

const LawFirmDetailsPage = () => {
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showAddCasePopup, setShowAddCasePopup] = useState(false);
  const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);
  const [lawFirmName, setLawFirmName] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLawFirmName = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        console.log("Token being used:", token);
  
        if (!token) throw new Error("No authentication token found");
  
        const response = await fetch('http://backend.lejit.ai/backend/api/law-firm/get-law-firm-details', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("API Response:", data); // Log the actual response
  
        // Adjust this based on the correct location of lawFirmName
        const extractedLawFirmName = data?.lawFirmName || data?.lawFirmDetails?.lawFirmName || "Your Law Firm";
  
        if (!extractedLawFirmName) {
          throw new Error("Law firm name not found in response");
        }
  
        setLawFirmName(extractedLawFirmName);
      } catch (error) {
        console.error("Error fetching law firm name:", error.message);
        setLawFirmName("Your Law Firm");
      } finally {
        setLoading(false);
      }
    };
  
    fetchLawFirmName();
  }, []);
  

  const handleAddTeamMember = () => setShowAddUserPopup(true);
  const handleAddCase = () => setShowAddCasePopup(true);
  const handleEditProfile = () => setShowEditProfilePopup(true);
  const handleClosePopup = () => {
    setShowAddUserPopup(false);
    setShowAddCasePopup(false);
    setShowEditProfilePopup(false);
  };
  const handleSkip = () => navigate('/ldashboard');

  return (
    <div className="lawfirm-container">
      <div className="lawfirm-left">
        <div className="law-firm-details">
          <div className="heading">
            <h1>{loading ? 'Loading...' : `Welcome, ${lawFirmName}!`}</h1>
            <p>Let’s build your professional profile and showcase your legal expertise</p>
          </div>
          <div className="content">
            <div className="firm-profile">
              <div className="profile-picture" />
              <div className="profile-info">
                <p className="profile-name">{lawFirmName}</p>
                <p className="profile-role">12 years</p>
              </div>
              <button className="ebutton" onClick={handleEditProfile}>Edit Profile</button>
            </div>
            <hr className="ldivider" />
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Professional Details</p>
                <p className="secondary-text">Add experience and qualifications</p>
              </div>
              <button className="button">Add</button>
            </div>
            <hr className="divider" />
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Manage Appointments</p>
                <p className="secondary-text">7.00 am to 10.00 pm</p>
              </div>
              <button className="button">Manage</button>
            </div>
            <hr className="divider" />
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Cases</p>
                <p className="secondary-text">Add open and closed cases</p>
              </div>
              <button className="button" onClick={handleAddCase}>Add</button>
            </div>
            <hr className="divider" />
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
      {showAddUserPopup && <AddUser onClose={handleClosePopup} />}
      {showAddCasePopup && <AddCase isOpen={showAddCasePopup} onClose={handleClosePopup} />}
      {showEditProfilePopup && (
        <div className="edit-profile-overlay">
          <div className="edit-profile-popup">
            <button className="close-popup-button" onClick={handleClosePopup}>&times;</button>
            <EditProfile />
          </div>
        </div>
      )}
    </div>
  );
};

export default LawFirmDetailsPage;
