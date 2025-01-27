import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIPopup.css'; // Import custom styles

const AIPopup = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const sessionKey = 'hasSeenPopupThisSession';
    const hasSeenPopup = sessionStorage.getItem(sessionKey);
    if (!hasSeenPopup) {
      setShowPopup(true);
      sessionStorage.setItem(sessionKey, 'true');
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleNavigate = () => {
    navigate('/chatdashboard');
  };

  if (!showPopup) return null;

  return (
    <div className="ai-popup-overlay">
      <div className="ai-popup">
        <h2 className="ai-popup-title">Discover the AI Features of Lejit!</h2>
        <p className="ai-popup-message">
          Experience the power of AI with Lejit. Our AI features can help you streamline your workflow and enhance productivity.
        </p>
        <div className="ai-popup-buttons">
          <button className="ai-popup-button" onClick={handleNavigate}>
            I want to see!
          </button>
          <button className="ai-popup-button-close" onClick={handleClose}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPopup;
