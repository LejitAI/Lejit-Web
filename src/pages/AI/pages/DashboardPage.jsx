import React, { useState, useEffect } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import HistoryPanel from "../components/Chat/HistoryPanel";
import "../styles/Dashboard.css";
import { ReactComponent as GeneralIcon } from "./general.svg";
import { ReactComponent as CitationIcon } from "./citation.svg";
import axios from "axios";
import profilePic from "../Avatar.png"; // Replace with actual path to the profile picture
import LejitLogo from "../lejit-logo-removebg-preview copy.png"; // Replace with actual logo path
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { AppBar, Toolbar, Box, Typography, Avatar, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("backend/api/auth/profile", {
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

  const handleSelectHistory = (historyItem) => {
    setActiveTab("general");
    setSelectedHistory(historyItem);
  };

  const toggleHistoryPanel = () => {
    setIsHistoryVisible(!isHistoryVisible);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <ChatInterface selectedHistory={selectedHistory} isDarkMode={isDarkMode} />;
      case "document":
        return <DocumentHandling />;
      default:
        return <ChatInterface isDarkMode={isDarkMode} />;
    }
  };

  return (
    <>
      <div className={`dashboard ${isDarkMode ? 'dark-mode' : ''}`}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)',
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              width: '100%',
              minHeight: '43.2px !important', // Decreased height by 10%
            }}
          >
            <Box display="flex" alignItems="center">
              <img
                src={LejitLogo}
                alt="Lejit Logo"
                style={{ width: '90px', height: 'auto', marginRight: '14px', cursor: 'pointer' }}
                onClick={() => navigate('/ldashboard')}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              gap="12px"
              flexGrow={1}
              justifyContent="center"
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleHistoryPanel}
                sx={{
                  color: '#404040',
                  transition: 'transform 0.2s ease, color 0.2s ease',
                  '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
                  padding: '4px',
                }}
              >
                <MenuIcon sx={{ fontSize: '18px' }} />
              </IconButton>
              <Tabs
  value={activeTab}
  onChange={(e, newValue) => setActiveTab(newValue)}
  TabIndicatorProps={{
    style: {
      display: 'none', // Hides the default indicator
    },
  }}
  sx={{
    display: 'flex',
    justifyContent: 'center',
    gap: '16px', // Adds spacing between tabs
    '& .MuiTabs-flexContainer': {
      gap: '16px',
      justifyContent: 'center',
    },
    '& .MuiTab-root': {
      minWidth: 'auto',
      padding: '6px 28px', // Sleek padding
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: 500,
      textTransform: 'none',
      color: '#4a4a4a',
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(10px)', // Adds a futuristic blur
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease-in-out',
      '&.Mui-selected': {
        background: 'linear-gradient(135deg, #0f67fd, #1d3557)', // Futuristic gradient
        color: '#ffffff',
        boxShadow: '0px 6px 15px rgba(15, 103, 253, 0.4)', // Glow effect
      },
      '&:hover': {
        background: 'rgba(15, 103, 253, 0.1)', // Subtle hover effect
        color: '#0f67fd',
        transform: 'scale(1.05)', // Slight scaling
      },
    },
  }}
>
  <Tab
    value="general"
    label="General Queries"
    icon={<GeneralIcon className="tab-icon" />}
    iconPosition="start"
  />
  <Tab
    value="document"
    label="Document Citations"
    icon={<CitationIcon className="tab-icon" />}
    iconPosition="start"
  />
</Tabs>

            </Box>
            <Box display="flex" alignItems="center" gap="18px">
              <IconButton
                sx={{
                  color: '#404040',
                  padding: '4px',
                  '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
                }}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Brightness7Icon sx={{ fontSize: '18px' }} />
                ) : (
                  <Brightness4Icon sx={{ fontSize: '18px' }} />
                )}
              </IconButton>
              <Box display="flex" alignItems="center" gap="6px">
                <Avatar
                  src={user?.profilePicture || profilePic}
                  sx={{
                    width: 33,
                    height: 33,
                    boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#404040',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Hi, {user ? user.username : "Guest"}!
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '9px',
                      fontWeight: 500,
                      color: '#565656',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {user ? user.role : "Role"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        {isHistoryVisible && (
          <aside className="dashboard-sidebar">
            <HistoryPanel onSelectHistory={handleSelectHistory} />
          </aside>
        )}
        <main className={`dashboard-main ${isHistoryVisible ? 'with-sidebar' : ''}`}>
          <section
            className="dashboard-content"
            style={{ height: 'calc(100vh - 43.2px)', overflowY: 'auto' }} // Adjusted height
          >
            {renderContent()}
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
