import React from 'react';
import { Box, Typography, Card, CardActions, Avatar, Divider, Button } from '@mui/material';
import { Close, Check } from '@mui/icons-material';

const AppointmentListView = () => {
  const appointments = Array(6).fill({
    title: "Appointment Request",
    date: "22nd August, 2:00 pm - 4:00 pm",
    client: {
      name: "John Doe",
      caseType: "Family Dispute Case",
      description:
        "The client was charged with multiple counts of fraud and faced significant prison time. The Client...",
    },
  });

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      {appointments.map((appointment, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            padding: '16px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '12px',
              color: '#7A7A7A',
            }}
          >
            {appointment.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '14px',
              color: '#7A7A7A',
              marginBottom: '8px',
            }}
          >
            {appointment.date}
          </Typography>
          <Divider sx={{ marginBottom: '12px' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar
              src=""
              alt={appointment.client.name}
              sx={{
                width: '40px',
                height: '40px',
                border: '2px solid rgba(0, 0, 0, 0.1)',
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#343434',
                }}
              >
                {appointment.client.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '12px',
                  color: '#7A7A7A',
                }}
              >
                {appointment.client.caseType}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '12px',
              color: '#7A7A7A',
              marginTop: '12px',
            }}
          >
            {appointment.client.description}
          </Typography>
          <CardActions sx={{ justifyContent: 'space-between', marginTop: '12px' }}>
            <Button
              startIcon={<Close />}
              sx={{
                backgroundColor: 'rgba(255, 14, 0, 0.1)',
                color: '#FF0E00',
                borderRadius: '10px',
                padding: '8px 16px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 14, 0, 0.2)',
                },
              }}
            >
              Reject
            </Button>
            <Button
              startIcon={<Check />}
              sx={{
                backgroundColor: '#F2F5FA',
                color: '#0F67FD',
                borderRadius: '10px',
                padding: '8px 16px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#E0EBFF',
                },
              }}
            >
              Accept
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default AppointmentListView;
