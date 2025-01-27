import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  ToggleButton, 
  ToggleButtonGroup 
} from '@mui/material';
import { ListAlt, CalendarToday } from '@mui/icons-material'; // Icons for List and Calendar view
import { Search, FilterList, Download, Sort } from '@mui/icons-material';
import AppointmentListView from './AppointmentListView'; // Separate list view component
import AppointmentCalendarView from './AppointmentCalendarView';
import Topbar from '../../global/Topbar';
import Sidebar from '../../global/Sidebar';

const Appointments = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const handleViewToggle = (event, newView) => {
    if (newView) setViewMode(newView);
  };

  return (
    <Box display="flex" height="100vh" position="relative">
      {/* Sidebar and Topbar */}
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Topbar />
        <Box component="main" flexGrow={1} p={2}>
          {/* Container for Appointments Page */}
          <Box className="view-team-container">
            {/* Action Items Header */}
            <Box className="header" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#343434',
                }}
              >
                My Appointments
              </Typography>
              <Box className="header-right" display="flex" gap={2}>
                <Box className="action-button" display="flex" alignItems="center" gap={1}>
                  <Search />
                  <Typography>Search List</Typography>
                </Box>
                <Box className="action-button" display="flex" alignItems="center" gap={1}>
                  <FilterList />
                  <Typography>Filter</Typography>
                </Box>
                <Box className="action-button" display="flex" alignItems="center" gap={1}>
                  <Download />
                  <Typography>Download List</Typography>
                </Box>
                <Box className="action-button" display="flex" alignItems="center" gap={1}>
                  <Sort />
                  <Typography>Sort</Typography>
                </Box>
              </Box>
            </Box>

            {/* View Toggle */}
            <Box display="flex" justifyContent="flex-end" alignItems="center" mb={3}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewToggle}
                aria-label="view toggle"
                sx={{
                  '& .MuiToggleButton-root': {
                    textTransform: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#7A7A7A',
                    borderRadius: '10px',
                    border: '1px solid #C9C9C9',
                    '&.Mui-selected': {
                      backgroundColor: '#0F67FD',
                      color: '#FFFFFF',
                    },
                  },
                }}
              >
                <ToggleButton value="list" aria-label="list view">
                  <ListAlt sx={{ mr: 1 }} /> List View
                </ToggleButton>
                <ToggleButton value="calendar" aria-label="calendar view">
                  <CalendarToday sx={{ mr: 1 }} /> Calendar View
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Content View */}
            {viewMode === 'list' ? <AppointmentListView /> : <AppointmentCalendarView />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Appointments;
