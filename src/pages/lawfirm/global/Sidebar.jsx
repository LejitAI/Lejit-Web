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
    { text: 'My Cases', icon: <FolderIcon />, path: '/overallcases' },
    { text: 'Clients', icon: <PersonOutlineIcon />, path: '/clients' },
    { text: 'Team Members', icon: <PeopleIcon />, path: '/profile' }, 
    { text: 'Documents', icon: <ArticleIcon />, path: '/casedocuments' },
    { text: 'Appointments', icon: <CalendarTodayIcon />, path: '/appointments' },
    { text: 'Hearing Schedule', icon: <ScheduleIcon />, path: '/hearing' },
    { text: 'Legal Templates', icon: <ArticleIcon />, path: '/legaldoctemplates' },
    { text: 'Q&A Processor', icon: <ArticleIcon />, path: '/qnascreen' },
    { text: 'Knowledge Hub', icon: <BookIcon />, path: '/knowledge' },
    { text: 'Analytics/Reports', icon: <BarChartIcon />, path: '/analytics' },
    { text: 'Profile', icon: <PersonIcon />, path: '/overallprofile' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Check if the current path matches the menu item path
  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box
      sx={{
        width: isMobile ? '56vw' : '168px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.4px 0',
        gap: '14px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          padding: '14px 0',
        }}
      >
        <img
          src={logo}
          alt="Lejit Logo"
          style={{
            width: isMobile ? '70px' : '91px',
            height: isMobile ? '28px' : '35px',
            borderRadius: '210px',
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
                padding: isActive(item.path) ? '0px 11px' : '0px 17px',
                gap: '11px',
                width: isActive(item.path) ? '90%' : '100%',
                height: '33px',
                backgroundColor: isActive(item.path) ? '#0F67FD' : '#FFFFFF',
                borderRadius: '7px',
                color: isActive(item.path) ? '#FFFFFF' : '#7A7A7A',
                marginLeft: isActive(item.path) ? '8.4px' : '0px',
                boxShadow: isActive(item.path)
                  ? '0px 3px 7px rgba(15, 103, 253, 0.3)'
                  : '1.4px 1.4px 4.2px rgba(0, 0, 0, 0.05)',
                '& .MuiListItemIcon-root': {
                  color: isActive(item.path) ? '#FFFFFF' : '#7A7A7A',
                  minWidth: '11px',
                  marginRight: '11px',
                  width: '11px',
                  height: '11px',
                },
              }}
            >
              <ListItemIcon sx={{ fontSize: '15px' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '10px',
                  lineHeight: '15px',
                  letterSpacing: '0.21px',
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
              top: '11px',
              left: '11px',
              zIndex: 1100,
              color: '#404040',
              padding: '4px',
              '&:hover': { transform: 'scale(1.1)', color: '#0F67FD' },
            }}
          >
            <MenuIcon sx={{ fontSize: '15px' }} />
          </IconButton>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              '& .MuiDrawer-paper': {
                width: '56vw',
                maxWidth: '168px',
                backgroundColor: '#FFFFFF',
                boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)',
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
            width: '168px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '168px',
              boxSizing: 'border-box',
              backgroundColor: '#FFFFFF',
              boxShadow: '3px 0 6px rgba(0, 0, 0, 0.1)',
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