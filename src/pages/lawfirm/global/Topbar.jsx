import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, IconButton, Typography, InputBase, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FlagIcon from '@mui/icons-material/Flag'; // Placeholder for the flag icon
import profilePic from './Avatar.png'; // Replace with actual path to the profile picture
import axios from 'axios';

const Topbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [user, setUser] = useState(null);

  // Fetch user data using token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Assume token is stored in localStorage
      if (!token) return;

      try {
        const response = await axios.get('backend/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 3D shadow effect for the app bar
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1100, // Ensure it sits above other components if needed
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        {/* Left side: Menu icon and Search box */}
        <Box display="flex" alignItems="center" gap="16px">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              color: '#404040',
              transition: 'transform 0.2s ease, color 0.2s ease',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' }, // Interactive hover effect
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              boxShadow: searchFocused ? '0px 6px 16px rgba(0, 0, 0, 0.2)' : '0px 4px 10px rgba(0, 0, 0, 0.1)', // Dynamic shadow effect
              borderRadius: '50px',
              padding: '4px 16px',
              width: searchFocused ? '500px' : '400px', // Expanded width on focus
              height: '38px',
              transition: 'width 0.4s ease, box-shadow 0.3s ease', // Smooth expansion transition
              '&:hover': {
                boxShadow: '0px 8px 20px rgba(0, 103, 253, 0.15)', // Enhanced hover shadow
              },
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          >
            <SearchIcon
              sx={{
                color: searchFocused ? '#0F67FD' : '#B7B7B7',
                marginRight: '8px',
                transition: 'color 0.3s ease', // Smooth color change on focus
              }}
            />
            <InputBase
              placeholder="Search"
              sx={{
                width: '100%',
                fontSize: '14px',
                color: searchFocused ? '#404040' : '#B7B7B7',
                fontFamily: 'Poppins, sans-serif',
                transition: 'color 0.3s ease', // Smooth color transition
              }}
            />
          </Box>
        </Box>

        {/* Right side: Notification, Language, and Profile */}
        <Box display="flex" alignItems="center" gap="24px">
          {/* Notification Icon */}
          <IconButton
            sx={{
              color: '#404040',
              transition: 'transform 0.2s ease, color 0.2s ease',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
            }}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>

          {/* Language Selector */}
          <Box display="flex" alignItems="center" gap="8px">
            <FlagIcon sx={{ fontSize: 24, borderRadius: '5px', color: '#D8D8D8' }} /> {/* Placeholder for Flag */}
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#646464',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              English
            </Typography>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '16px' }} />
          </Box>

          {/* Profile Section */}
          <Box display="flex" alignItems="center" gap="8px">
            <Avatar
              src={profilePic}
              sx={{
                width: 44,
                height: 44,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // 3D effect for avatar
                transition: 'box-shadow 0.3s ease',
                '&:hover': { boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)' }, // Enhanced shadow on hover
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#404040',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Hi, {user ? user.username : 'Guest'}!
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#565656',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
              </Typography>
            </Box>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '16px' }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
