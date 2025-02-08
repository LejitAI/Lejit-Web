import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Avatar, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag';
import profilePic from './Avatar.png'; // Replace with actual profile picture path
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LejitLogo from './lejit-logo-removebg-preview copy.png'; // Replace with actual logo path
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
        {/* Left side: Menu and Search */}
        <Box display="flex" alignItems="center">
            <img
              src={LejitLogo}
              alt="Lejit Logo"
              style={{
                width: '90.25px', // Reduced by another 5%
                height: 'auto', // Maintain aspect ratio
                marginRight: '14.44px', // Reduced by another 5%
                cursor: 'pointer',
              }}
            />
          </Box>

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
              backgroundColor: '#FFFFFF',
              boxShadow: searchFocused ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : '0px 3px 7px rgba(0, 0, 0, 0.1)',
              borderRadius: '37px',
              padding: '3px 12px',
              width: searchFocused ? '375px' : '300px',
              height: '28px',
              transition: 'width 0.4s ease, box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 6px 15px rgba(0, 103, 253, 0.15)',
              },
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          >
            <SearchIcon
              sx={{
                color: searchFocused ? '#0F67FD' : '#B7B7B7',
                marginRight: '6px',
                fontSize: '18px',
              }}
            />
            <InputBase
              placeholder="Search"
              sx={{
                width: '100%',
                fontSize: '10px',
                color: searchFocused ? '#404040' : '#B7B7B7',
                fontFamily: 'Poppins, sans-serif',
              }}
            />
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
              src={userDetails?.profilePicture || profilePic}
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
