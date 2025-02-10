import React, { useState, useEffect } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import HistoryPanel from "../components/Chat/HistoryPanel";
import "../styles/Dashboard.css";
import { ReactComponent as GeneralIcon } from "./general.svg";
import { ReactComponent as CitationIcon } from "./citation.svg";
import axios from "axios";
import profilePic from "../Avatar.png";
import LejitLogo from "../lejit-logo-removebg-preview copy.png";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Toolbar, Box, Typography, Avatar, Tabs, Tab, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [notification, setNotification] = useState({ open: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await axios.get("/backend/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, []);

  const createNewSession = () => {
    const sessionId = uuidv4();
    const newSession = {
      sessionId,
      chatName: "New Chat",
      chatType: activeTab,
      createdAt: new Date().toISOString(),
    };
    setSessions([...sessions, newSession]);
    setSelectedSessionId(sessionId);
    setNotification({ open: true, message: "New chat session created successfully." });
  };

  const handleSelectHistory = (sessionId) => {
    setSelectedSessionId(sessionId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <ChatInterface sessionId={selectedSessionId} isDarkMode={isDarkMode} />;
      case "document":
        return <DocumentHandling sessionId={selectedSessionId} isDarkMode={isDarkMode} />;
      default:
        return <ChatInterface sessionId={selectedSessionId} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: '#FFFFFF', boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)', zIndex: 1100 }}>
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%', minHeight: '43.2px !important' }}>
          <Box display="flex" alignItems="center">
            <img src={LejitLogo} alt="Lejit Logo" style={{ width: '90px', height: 'auto', marginRight: '14px', cursor: 'pointer' }} onClick={() => navigate('/ldashboard')} />
          </Box>
          <Box display="flex" alignItems="center" gap="12px" flexGrow={1} justifyContent="center">
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} TabIndicatorProps={{ style: { display: 'none' } }}>
              <Tab value="general" label="General Queries" icon={<GeneralIcon className="tab-icon" />} iconPosition="start" />
              <Tab value="document" label="Document Citations" icon={<CitationIcon className="tab-icon" />} iconPosition="start" />
            </Tabs>
          </Box>
          <Box display="flex" alignItems="center" gap="18px">
            <IconButton onClick={toggleDarkMode}>{isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}</IconButton>
            <Avatar src={user?.profilePicture || profilePic} sx={{ width: 33, height: 33 }} />
            <Typography>Hi, {user ? user.username : "Guest"}!</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <HistoryPanel onSelectHistory={handleSelectHistory} activeTab={activeTab} sessions={sessions} />
        </aside>
        <main className="dashboard-main">
          <section className="dashboard-content">{renderContent()}</section>
        </main>
      </div>
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
