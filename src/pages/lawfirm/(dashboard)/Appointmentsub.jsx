import React from 'react';
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
} from '@mui/material';
import { Search, FilterList, CloudDownload, Close, Check } from '@mui/icons-material';

const Appointments = () => {
  const appointments = Array(6).fill({
    title: "Appointment Request",
    date: "22nd August, 2:00 pm - 4:00 pm",
    client: {
      name: "John Doe",
      caseType: "Family Dispute Case",
      description: "The client was charged with multiple counts of fraud and faced significant prison time. The Client...",
    },
    status: "Pending"
  });

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
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)', // 3D shadow for the entire container
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
    lineHeight: '22px',
    height: '22px',
    overflow: 'hidden' 
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
        <Tabs value={0} aria-label="appointment tabs" sx={{ mb: 2 }}>
          <Tab
            label="Pending Appointments"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '7px 14px',
              gap: '10px',
              width: '189px',
              height: '39px',
              backgroundColor: '#0F67FD', // Navy Blue background
              borderRadius: '10px',
              fontFamily: 'Poppins',
              fontStyle: 'normal',
              fontWeight: 400,
              color:'#FFFFF',
              fontSize: '14px',
              lineHeight: '21px',
              textTransform: 'none',
            }}
          />
          <Tab label="Court Hearings" sx={{ textTransform: 'none' }} />
          <Tab label="Client Appointments" sx={{ textTransform: 'none' }} />
        </Tabs>

        {/* Appointment Cards */}
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {appointments.map((appointment, index) => (
            <Card key={index} sx={{ width: 357, p: 2, boxShadow: 2, borderRadius: 2 }}>
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
                    <Typography variant="body2" color="textSecondary">
                      {appointment.client.description}
                    </Typography>
                  </Box>
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
          {[...Array(20)].map((_, i) => (
            <Button key={i} variant={i === 2 ? 'contained' : 'text'} sx={{ mx: 0.5 }}>
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
