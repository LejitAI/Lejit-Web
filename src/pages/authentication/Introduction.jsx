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
import corporateIcon from './Corporate.png'

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
  <div 
    className={`user-type-card citizen-card ${userType === 'Citizen' ? 'selected' : ''}`} 
    onClick={() => setUserType('Citizen')}
  >
    <div className="button-content">
      <img src={citizenIcon} alt="Citizen" className="user-type-icon" />
      <h3 className="user-type-title">Citizen</h3>
    </div>
  </div>

  <div 
    className={`user-type-card lawyer-card ${userType === 'Lawyer' ? 'selected' : ''}`} 
    onClick={() => setUserType('Lawyer')}
  >
    <div className="button-content">
      <img src={lawyerIcon} alt="Lawyer" className="user-type-icon" />
      <h3 className="user-type-title">Lawyer</h3>
    </div>
  </div>

  <div 
    className={`user-type-card corporate-card ${userType === 'Corporate' ? 'selected' : ''}`} 
    onClick={() => setUserType('Corporate')}
  >
    <div className="button-content">
      <img src={corporateIcon} alt="Corporate" className="user-type-icon" />
      <h3 className="user-type-title">Corporate</h3>
    </div>
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
