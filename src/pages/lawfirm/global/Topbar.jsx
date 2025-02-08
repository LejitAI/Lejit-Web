import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import MagicIcon from '@mui/icons-material/AutoAwesome'; // Magic icon
import profilePic from './Avatar.png'; // Replace with actual profile picture path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deepPurple } from '@mui/material/colors'; // Import color for avatar background

const Topbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  // Fetch user profile details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('backend/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user;
        setUserDetails(userData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError(error.response?.data?.message || 'Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Get display info for user
  const getUserDisplayInfo = () => {
    if (loading) return { name: 'Loading...', role: '...' };
    if (error) return { name: 'Guest', role: 'Error loading profile' };

    return {
      name: userDetails?.username || 'Guest',
      role: userDetails?.role || 'Unknown',
    };
  };

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'G'; // Default to 'G' for Guest
  };

  const { name, role } = getUserDisplayInfo();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)',
        padding: '6px 18px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        {/* Left side: Menu and Chat with AI */}
        <Box display="flex" alignItems="center" gap="12px">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              color: '#404040',
              transition: 'transform 0.2s ease, color 0.2s ease',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
              padding: '4px',
            }}
          >
            <MenuIcon sx={{ fontSize: '18px' }} />
          </IconButton>

          <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#F5F7FA', // Light magical background
        boxShadow: searchFocused
          ? '0px 8px 25px rgba(237, 234, 241, 0.5)'
          : '0px 4px 15px rgba(56, 239, 125, 0.3)',
        borderRadius: '50px',
        padding: '8px 16px',
        width: searchFocused ? '420px' : '320px',
        height: '48px',
        transition: 'all 0.4s ease-in-out',
        border: '2px solid transparent',
        backgroundImage: searchFocused
          ? 'linear-gradient(#F5F7FA, #F5F7FA), linear-gradient(to right, #8C52FF, #38EF7D)'
          : 'linear-gradient(#F5F7FA, #F5F7FA)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        '&:hover': {
          boxShadow: '0px 10px 30px rgba(56, 239, 125, 0.4)',
          transform: 'scale(1.05)',
        },
        cursor: 'pointer',
      }}
      onClick={() => navigate('/chatdashboard')} // Navigate on click
      onFocus={() => setSearchFocused(true)}
      onBlur={() => setSearchFocused(false)}
    >
      <MagicIcon
        sx={{
          color: searchFocused ? '#8C52FF' : '#38EF7D',
          marginRight: '10px',
          fontSize: '24px',
          transition: 'color 0.3s ease',
        }}
      />
      <Typography
        sx={{
          width: '100%',
          fontSize: '14px',
          fontWeight: 500,
          color: searchFocused ? '#404040' : '#8E8E8E',
          fontFamily: 'Poppins, sans-serif',
          letterSpacing: '0.5px',
          transition: 'color 0.3s ease',
        }}
      >
        Chat with AI
      </Typography>
    </Box>
        </Box>

        {/* Right side: Notifications, Profile, and Sign-Out */}
        <Box display="flex" alignItems="center" gap="18px">
          <IconButton
            sx={{
              color: '#404040',
              padding: '4px',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: '18px' }} />
          </IconButton>

          <Box display="flex" alignItems="center" gap="6px">
            <FlagIcon sx={{ fontSize: 18, borderRadius: '4px', color: '#D8D8D8' }} />
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 500,
                color: '#646464',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              English
            </Typography>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '12px' }} />
          </Box>

          <Box display="flex" alignItems="center" gap="6px">
            <Avatar
              sx={{
                width: 33,
                height: 33,
                boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)',
                backgroundColor: deepPurple[500], // Set background color
                color: '#FFFFFF', // Set text color
                fontSize: '14px', // Set font size
                fontWeight: 'bold', // Set font weight
              }}
            >
              {getUserInitial(name)}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#404040',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Hi, {name}!
              </Typography>
              <Typography
                sx={{
                  fontSize: '9px',
                  fontWeight: 500,
                  color: '#565656',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {role}
              </Typography>
            </Box>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '12px' }} />
          </Box>

          <Button
            variant="contained"
            color="error"
            onClick={handleSignOut}
            sx={{
              fontSize: '10px',
              textTransform: 'none',
              padding: '4px 8px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
