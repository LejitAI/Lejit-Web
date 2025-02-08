import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel'; // Import the Gavel icon
import './FAB.css';

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chatdashboard');
  };

  return (
    <Tooltip title="Explore AI Features" arrow>
      <div className="floating-button" onClick={handleClick}>
        <GavelIcon className="floating-button-icon" />
      </div>
    </Tooltip>
  );
};

export default FloatingButton;
