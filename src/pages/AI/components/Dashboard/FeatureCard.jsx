import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, onClick, isActive }) => {
  return (
    <motion.div
      className={`feature-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="feature-icon">{icon}</div>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
