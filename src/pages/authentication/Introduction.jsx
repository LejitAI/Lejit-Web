import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';
import Logo from '../assets/logo.png';
import category from '../assets/Vector.png';
import category2 from '../assets/Vector (1).png';
import category3 from '../assets/Group 4.png';
import category4 from '../assets/Group 33734.png';
import citizenIcon from '../assets/citizenIcon.png';
import lawyerIcon from '../assets/lawyerIcon.png';

const Introduction = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Lawyer'); // Default to Lawyer

  const handleStartClick = () => {
    if (userType === 'Lawyer') {
      navigate('/lawfirmsignup');
    } else {
      navigate('/citizensignup');
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-left-box">
        <div className="intro-login-details">
          <h1 className="intro-title">Welcome to Lejit</h1>
          <p className="intro-subtitle">Your trusted legal companion!</p>

          <div className="intro-categories">
            <div className="category-card">
              <img src={category} alt="Explore Lawyers by Category" className="category-icon" />
              <span>Explore Lawyers by Category</span>
            </div>
            <div className="category-card">
              <img src={category2} alt="Find Nearby Legal Experts" className="category-icon" />
              <span>Find Nearby Legal Experts</span>
            </div>
            <div className="category-card">
              <img src={category3} alt="Appointments Icon" className="category-icon" />
              <span>Seamless Appointments</span>
            </div>
            <div className="category-card">
              <img src={category4} alt="Documents Icon" className="category-icon" />
              <span>Prepare Case Documents</span>
            </div>
          </div>

          <div className="user-type-selection">
            <div className={`user-type-card ${userType === 'Citizen' ? 'selected' : ''}`} onClick={() => setUserType('Citizen')}>
              <input
                type="radio"
                name="userType"
                value="Citizen"
                id="citizen"
                className="user-type-radio"
                checked={userType === 'Citizen'}
                onChange={() => setUserType('Citizen')}
              />
              <label htmlFor="citizen" className="user-type-label">
                <img src={citizenIcon} alt="Citizen" className="user-type-icon" />
              </label>
            </div>
            <div className={`user-type-card ${userType === 'Lawyer' ? 'selected' : ''}`} onClick={() => setUserType('Lawyer')}>
              <input
                type="radio"
                name="userType"
                value="Lawyer"
                id="lawyer"
                className="user-type-radio"
                checked={userType === 'Lawyer'}
                onChange={() => setUserType('Lawyer')}
              />
              <label htmlFor="lawyer" className="user-type-label">
                <img src={lawyerIcon} alt="Lawyer" className="user-type-icon" />
              </label>
            </div>
          </div>

          <button className="intro-start-button" onClick={handleStartClick}>LET'S GET STARTED</button>

          <p className="intro-sign-in">
            Already have an account? <span 
            className="sign-in-link" 
            onClick={() => navigate('/signin')}
          >
            Sign In
          </span>
          </p>
        </div>
      </div>

      <div className="right-box">
        <img src={Logo} alt="Logo" className="logo" /> 
      </div>
    </div>
  );
};

export default Introduction;
