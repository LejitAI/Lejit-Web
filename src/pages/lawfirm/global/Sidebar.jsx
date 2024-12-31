import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArticleIcon from '@mui/icons-material/Article';
import BookIcon from '@mui/icons-material/Book';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import logo from './lejit-logo-removebg-preview copy.png';
import PeopleIcon from '@mui/icons-material/People'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; 

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Navigate to different routes

  // Define the menu items with paths
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/ldashboard' },
    { text: 'AI Features', icon: <DashboardIcon />, path: '/chatdashboard' },
    { text: 'My Cases', icon: <FolderIcon />, path: '/overallcases' },
    { text: 'Clients', icon: <PersonOutlineIcon />, path: '/clients' },
    { text: 'Team Members', icon: <PeopleIcon />, path: '/profile' }, 
    { text: 'Documents', icon: <ArticleIcon />, path: '/documents' },
    { text: 'Appointments', icon: <CalendarTodayIcon />, path: '/appointments' },
    { text: 'Hearing Schedule', icon: <ScheduleIcon />, path: '/hearing' },
    { text: 'Legal Templates', icon: <ArticleIcon />, path: '/templates' },
    { text: 'Knowledge Hub', icon: <BookIcon />, path: '/knowledge' },
    { text: 'Analytics/Reports', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'Profile', icon: <PersonIcon />, path: '/overallprofile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Toggle the drawer for mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if the current path matches the menu item path
  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? '80vw' : '240px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2px 0',
        gap: '20px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          padding: '20px 0',
        }}
      >
        <img
          src={logo}
          alt="Lejit Logo"
          style={{
            width: isMobile ? '100px' : '130px',
            height: isMobile ? '40px' : '50px',
            borderRadius: '300px',
          }}
        />
      </Box>
      <List sx={{ width: '100%' }}>
        {menuItems.map((item) => (
          <Tooltip key={item.text} title={item.text} placement="right" arrow>
            <ListItem
              button
              onClick={() => navigate(item.path)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: isActive(item.path) ? '0px 16px' : '0px 24px',
                gap: '16px',
                width: isActive(item.path) ? '90%' : '100%',
                height: '47.34px',
                backgroundColor: isActive(item.path) ? '#0F67FD' : '#FFFFFF',
                borderRadius: '10px',
                color: isActive(item.path) ? '#FFFFFF' : '#7A7A7A',
                marginLeft: isActive(item.path) ? '12px' : '0px',
                transition: 'all 0.3s ease',
                transform: isActive(item.path) ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isActive(item.path)
                  ? '0px 4px 10px rgba(15, 103, 253, 0.3)'  // Shadow for active item
                  : '2px 2px 6px rgba(0, 0, 0, 0.05)',      // Subtle shadow for non-active items
                '&:hover': {
                  backgroundColor: isActive(item.path) ? '#0F67FD' : 'rgba(15, 103, 253, 0.08)',
                  boxShadow: '0px 6px 12px rgba(0, 103, 253, 0.15)', // Larger shadow on hover
                  transform: 'scale(1.03)', // Slight scaling effect on hover
                },
                '& .MuiListItemIcon-root': {
                  color: isActive(item.path) ? '#FFFFFF' : '#7A7A7A',
                  minWidth: '16px',
                  marginRight: '16px',
                  width: '16px',
                  height: '16px',
                  transition: 'transform 0.3s ease',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '21px',
                  letterSpacing: '0.3px',
                }}
              />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: '16px',
              left: '16px',
              zIndex: 1100,
              color: '#404040',
              transition: 'transform 0.2s ease',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: '80vw',
                backgroundColor: '#FFFFFF',
                boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: '240px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '240px',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              boxShadow: '4px 0 8px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
