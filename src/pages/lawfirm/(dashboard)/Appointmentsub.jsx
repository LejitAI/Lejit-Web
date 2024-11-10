import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Tabs,
  Tab,
  Divider,
  TextField,
  InputAdornment,
  Badge,
  Collapse,
  IconButton,
} from '@mui/material';
import { Search, FilterList, CloudDownload, Close, Check, ExpandMore, ExpandLess } from '@mui/icons-material';

const Appointments = () => {
  const [expanded, setExpanded] = useState({});
  const [tabIndex, setTabIndex] = useState(0);

  const appointments = Array(6).fill({
    title: "Appointment Request",
    date: "22nd August, 2:00 pm - 4:00 pm",
    client: {
      name: "John Doe",
      caseType: "Family Dispute Case",
      description: "The client was charged with multiple counts of fraud and faced significant prison time. The Client...",
    },
    status: "Pending",
  });

  const handleExpandClick = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '99%',
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
          p: 3,
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: '#FFFFFF', borderRadius: 2, p: 2, mb: 2 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 500, 
              fontSize: '18px', 
              lineHeight: '22px'
            }}
          >
            My Appointments
          </Typography>
          <Box display="flex" gap={2}>
            <TextField
              placeholder="Search List"
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>Filter</Button>
            <Button variant="outlined" startIcon={<CloudDownload />}>Download</Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={tabIndex} 
          onChange={(e, newValue) => setTabIndex(newValue)}
          sx={{ mb: 2 }}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Pending Appointments" />
          <Tab label="Court Hearings" />
          <Tab label="Client Appointments" />
        </Tabs>

        {/* Appointment Cards */}
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {appointments.map((appointment, index) => (
            <Card 
              key={index} 
              sx={{ 
                width: 357, 
                boxShadow: 3, 
                borderRadius: 2, 
                transition: 'transform 0.2s', 
                '&:hover': { transform: 'scale(1.02)' } 
              }}
            >
              <CardContent>
                
                <Typography variant="subtitle2" color="textSecondary">
                  {appointment.title}
                </Typography>
                <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                  {appointment.date}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src="client-photo.jpg" alt={appointment.client.name} sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      {appointment.client.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {appointment.client.caseType}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Collapse in={expanded[index]}>
                    <Typography variant="body2" color="textSecondary">
                      {appointment.client.description}
                    </Typography>
                  </Collapse>
                  <Button
                    onClick={() => handleExpandClick(index)}
                    endIcon={expanded[index] ? <ExpandLess /> : <ExpandMore />}
                    sx={{ textTransform: 'none', color: '#0F67FD' }}
                  >
                    {expanded[index] ? 'Show Less' : 'Show More'}
                  </Button>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<Close />}
                  sx={{
                    backgroundColor: 'rgba(255, 14, 0, 0.1)',
                    color: '#FF0E00',
                    textTransform: 'none',
                    borderRadius: 2,
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 14, 0, 0.2)',
                    },
                  }}
                  fullWidth
                >
                  Reject
                </Button>
                <Button
                  startIcon={<Check />}
                  sx={{
                    backgroundColor: '#F2F5FA',
                    color: '#0F67FD',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#e0ebff',
                    },
                  }}
                  fullWidth
                >
                  Accept
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        
        {/* Pagination */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <Button>Prev</Button>
          {[...Array(5)].map((_, i) => (
            <Button 
              key={i} 
              variant={i === 2 ? 'contained' : 'text'} 
              sx={{ 
                mx: 0.5, 
                fontWeight: i === 2 ? 'bold' : 'normal', 
                color: i === 2 ? '#fff' : 'inherit' 
              }}
            >
              {i + 1}
            </Button>
          ))}
          <Button>Next</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Appointments;
