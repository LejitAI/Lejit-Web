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
        const response = await axios.get('/api/user/profile', {
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
        boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)', // Reduced from 4px 10px
        padding: '6px 18px', // Reduced from 8px 24px
        display: 'flex',
        alignItems: 'center',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
        {/* Left side */}
        <Box display="flex" alignItems="center" gap="12px"> {/* Reduced from 16px */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              color: '#404040',
              transition: 'transform 0.2s ease, color 0.2s ease',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
              padding: '4px', // Reduced from 6px
            }}
          >
            <MenuIcon sx={{ fontSize: '18px' }} /> {/* Reduced from 24px */}
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              boxShadow: searchFocused ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : '0px 3px 7px rgba(0, 0, 0, 0.1)', // Reduced
              borderRadius: '37px', // Reduced from 50px
              padding: '3px 12px', // Reduced from 4px 16px
              width: searchFocused ? '375px' : '300px', // Reduced from 500px and 400px
              height: '28px', // Reduced from 38px
              transition: 'width 0.4s ease, box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 6px 15px rgba(0, 103, 253, 0.15)', // Reduced from 8px 20px
              },
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          >
            <SearchIcon
              sx={{
                color: searchFocused ? '#0F67FD' : '#B7B7B7',
                marginRight: '6px', // Reduced from 8px
                fontSize: '18px', // Reduced from 24px
              }}
            />
            <InputBase
              placeholder="Search"
              sx={{
                width: '100%',
                fontSize: '10px', // Reduced from 14px
                color: searchFocused ? '#404040' : '#B7B7B7',
                fontFamily: 'Poppins, sans-serif',
              }}
            />
          </Box>
        </Box>

        {/* Right side */}
        <Box display="flex" alignItems="center" gap="18px"> {/* Reduced from 24px */}
          <IconButton
            sx={{
              color: '#404040',
              padding: '4px', // Reduced from 6px
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: '18px' }} /> {/* Reduced from 24px */}
          </IconButton>

          {/* Language Selector */}
          <Box display="flex" alignItems="center" gap="6px"> {/* Reduced from 8px */}
            <FlagIcon sx={{ fontSize: 18, borderRadius: '4px', color: '#D8D8D8' }} /> {/* Reduced from 24px */}
            <Typography
              sx={{
                fontSize: '10px', // Reduced from 14px
                fontWeight: 500,
                color: '#646464',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              English
            </Typography>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '12px' }} /> {/* Reduced from 16px */}
          </Box>

          {/* Profile Section */}
          <Box display="flex" alignItems="center" gap="6px"> {/* Reduced from 8px */}
            <Avatar
              src={profilePic}
              sx={{
                width: 33, // Reduced from 44
                height: 33, // Reduced from 44
                boxShadow: '0px 3px 7px rgba(0, 0, 0, 0.1)', // Reduced from 4px 10px
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontSize: '10px', // Reduced from 14px
                  fontWeight: 700,
                  color: '#404040',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Hi, {user ? user.username : 'Guest'}!
              </Typography>
              <Typography
                sx={{
                  fontSize: '9px', // Reduced from 12px
                  fontWeight: 500,
                  color: '#565656',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Role'}
              </Typography>
            </Box>
            <ExpandMoreIcon sx={{ color: '#7A7A7A', fontSize: '12px' }} /> {/* Reduced from 16px */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
