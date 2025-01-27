import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInterface from '../Chat/ChatInterface';
import DocumentHandling from '../Chat/DocumentHandling';
import DocumentGeneration from '../Chat/DocumentGeneration';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    {
      id: 'chat',
      label: 'General Chat',
      icon: '💬',
      component: ChatInterface
    },
    {
      id: 'citation',
      label: 'Legal Research',
      icon: '📚',
      component: DocumentHandling
    },
    {
      id: 'generation',
      label: 'Document Generation',
      icon: '📄',
      component: DocumentGeneration
    }
  ];

  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dashboard-tabs">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <div className="dashboard-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              {React.createElement(tabs.find(tab => tab.id === activeTab).component)}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
