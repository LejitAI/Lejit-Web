import React from 'react';
import './LawFirmLanding.css';
import Logo from '../../assets/logo.png';

const LawFirmDetailsPage = () => {
  return (
    <div className="lawfirm-container">
      <div className="lawfirm-left">
        <div className="law-firm-details">
          <div className="heading">
            <h1>Welcome, Law Firm LLC!</h1>
            <p>Let’s build your professional profile and showcase your legal expertise</p>
          </div>
          <div className="content">
            {/* Profile Section */}
            <div className="firm-profile">
              <div className="profile-picture" />
              <div className="profile-info">
                <p className="profile-name">Law Firm LLC</p>
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
              <button className="button">Add</button>
            </div>
            <hr className="divider" />

            {/* Action Section 4 */}
            <div className="action-section">
              <div className="icon-box">!</div>
              <div className="text-content">
                <p className="primary-text">Add Team Members</p>
                <p className="secondary-text">Add team member details</p>
              </div>
              <button className="button">Add</button>
            </div>

            {/* Skip for Now Button */}
            {/* Skip for Now Button */}
            <div className="skip-section">
  <button className="skip-button">
    Skip for Now
  </button>
</div>

          </div>
        </div>
      </div>
      <div className="lawfirm-right">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default LawFirmDetailsPage;
