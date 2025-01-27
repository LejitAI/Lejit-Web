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
import Topbar from '../global/Topbar';
import Sidebar from '../global/Sidebar';

const Appointments = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  const handleViewToggle = (event, newView) => {
    if (newView) setViewMode(newView);
  };

  return (
    <Box display="flex" height="75vh"> {/* Reduced by 25% */}
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Topbar />
        <Box component="main" flexGrow={1} p={1.5}> {/* Reduced by 25% */}
          {/* Container for Hearings Calendar */}
          <Box
            sx={{
              background: "#FFFFFF",
              borderRadius: "7.5px", // Reduced by 25%
              boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)", // Reduced by 25%
              padding: "15px", // Reduced by 25%
              maxWidth: "1200px", // Reduced by 25%
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                marginBottom: "15px", // Reduced by 25%
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  fontSize: '12px', // Reduced by 25%
                  color: '#343434',
                }}
              >
                Appointments
              </Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewToggle}
                aria-label="view mode"
                sx={{
                  borderRadius: '7.5px', // Reduced by 25%
                  '& .MuiToggleButton-root': {
                    fontSize: '9px', // Reduced by 25%
                    padding: '6px 12px', // Reduced by 25%
                  },
                }}
              >
                <ToggleButton value="list" aria-label="list view">
                  <ListAlt />
                </ToggleButton>
                <ToggleButton value="calendar" aria-label="calendar view">
                  <CalendarToday />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Search and Filter */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                marginBottom: "15px", // Reduced by 25%
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  gap: '9px', // Reduced by 25%
                }}
              >
                <Search sx={{ fontSize: '15px' }} /> {/* Reduced by 25% */}
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '9px', // Reduced by 25%
                    color: '#7A7A7A',
                  }}
                >
                  Search
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  gap: '9px', // Reduced by 25%
                }}
              >
                <FilterList sx={{ fontSize: '15px' }} /> {/* Reduced by 25% */}
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '9px', // Reduced by 25%
                    color: '#7A7A7A',
                  }}
                >
                  Filter
                </Typography>
                <Download sx={{ fontSize: '15px' }} /> {/* Reduced by 25% */}
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '9px', // Reduced by 25%
                    color: '#7A7A7A',
                  }}
                >
                  Download
                </Typography>
                <Sort sx={{ fontSize: '15px' }} /> {/* Reduced by 25% */}
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '9px', // Reduced by 25%
                    color: '#7A7A7A',
                  }}
                >
                  Sort
                </Typography>
              </Box>
            </Box>

            {/* View Mode */}
            {viewMode === 'list' ? <AppointmentListView /> : <AppointmentCalendarView />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Appointments;