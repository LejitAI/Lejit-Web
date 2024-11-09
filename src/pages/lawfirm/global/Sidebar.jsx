import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Tooltip } from '@mui/material';
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
import logo from './lejit-logo-removebg-preview copy.png';

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(9); // Profile is initially active
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'My Cases', icon: <FolderIcon /> },
    { text: 'Documents', icon: <ArticleIcon /> },
    { text: 'Appointments', icon: <CalendarTodayIcon /> },
    { text: 'Hearing Schedule', icon: <ScheduleIcon /> },
    { text: 'Legal Templates', icon: <ArticleIcon /> },
    { text: 'Knowledge Hub', icon: <BookIcon /> },
    { text: 'Notification', icon: <NotificationsIcon /> },
    { text: 'Analytics/Reports', icon: <BarChartIcon /> },
    { text: 'Profile', icon: <PersonIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Logout', icon: <ExitToAppIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '240px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '240px',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2px 0',
          gap: '20px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '240px',
          height: 'auto',
          padding: '20px 0',
        }}
      >
        <img
          src={logo}
          alt="Lejit Logo"
          style={{
            width: '130px',
            height: '50px',
            borderRadius: '300px',
          }}
        />
      </Box>
      <List sx={{ width: '100%' }}>
        {menuItems.map((item, index) => (
          <Tooltip key={item.text} title={item.text} placement="right" arrow>
            <ListItem
              button
              onClick={() => setActiveIndex(index)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: activeIndex === index ? '0px 16px' : '0px 24px',
                gap: '16px',
                width: activeIndex === index ? '90%' : '100%',
                height: '47.34px',
                backgroundColor: activeIndex === index ? '#0F67FD' : '#FFFFFF',
                borderRadius: activeIndex === index ? '6px' : '0',
                color: activeIndex === index ? '#FFFFFF' : '#7A7A7A',
                marginLeft: activeIndex === index ? '12px' : '0px',
                transition: 'all 0.3s ease', // Smooth transition effect
                transform: activeIndex === index ? 'scale(1.02)' : 'scale(1)', // Slight scaling for active item
                '&:hover': {
                  backgroundColor: activeIndex === index ? '#0F67FD' : 'rgba(15, 103, 253, 0.1)',
                  borderRadius: '6px',
                  transform: 'scale(1.03)', // Hover scaling effect
                },
                '& .MuiListItemIcon-root': {
                  color: activeIndex === index ? '#FFFFFF' : '#7A7A7A',
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
    </Drawer>
  );
};

export default Sidebar;
