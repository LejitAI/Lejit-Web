import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardActions, Avatar, Divider, Button, CircularProgress } from '@mui/material';
import { Close, Check } from '@mui/icons-material';

const AppointmentListView = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const lawyerId = "678f4c742214726f83a51aec"; // Hardcoded lawyerId

      console.log("Fetching appointments for lawyerId:", lawyerId);

      const response = await fetch(`http://backend.lejit.ai/backend/api/admin/appointments/${lawyerId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      console.log("Fetched appointments:", data);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', // Reduced by 25%
        gap: '15px', // Reduced by 25%
        width: '100%',
        maxWidth: '900px', // Reduced by 25%
      }}
    >
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Typography style={{ color: "red", textAlign: "center" }}>{error}</Typography>
      )}
      {!loading && appointments.length > 0 && appointments.map((appointment, index) => (
        <Card
          key={index}
          sx={{
            backgroundColor: '#FFFFFF',
            borderRadius: '7.5px', // Reduced by 25%
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.05)', // Reduced by 25%
            padding: '12px', // Reduced by 25%
            border: '0.75px solid rgba(0, 0, 0, 0.1)', // Reduced by 25%
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '9px', // Reduced by 25%
              color: '#7A7A7A',
            }}
          >
            Appointment Request
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '10.5px', // Reduced by 25%
              color: '#7A7A7A',
              marginBottom: '6px', // Reduced by 25%
            }}
          >
            {new Date(appointment.appointmentDate).toLocaleDateString()} {appointment.appointmentTime}
          </Typography>
          <Divider sx={{ marginBottom: '9px' }} /> {/* Reduced by 25% */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}> {/* Reduced by 25% */}
            <Avatar
              src=""
              alt={appointment.clientId?.name || "Unknown Client"}
              sx={{
                width: '30px', // Reduced by 25%
                height: '30px', // Reduced by 25%
                border: '1.5px solid rgba(0, 0, 0, 0.1)', // Reduced by 25%
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 500,
                  fontSize: '12px', // Reduced by 25%
                  color: '#343434',
                }}
              >
                {appointment.clientId?.name || "Unknown Client"}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '9px', // Reduced by 25%
                  color: '#7A7A7A',
                }}
              >
                {appointment.caseType || "Unknown Case Type"}
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: '9px', // Reduced by 25%
              color: '#7A7A7A',
              marginTop: '9px', // Reduced by 25%
            }}
          >
            {appointment.caseNotes || "No description available."}
          </Typography>
          <CardActions sx={{ justifyContent: 'space-between', marginTop: '9px' }}> {/* Reduced by 25% */}
            <Button
              startIcon={<Close />}
              sx={{
                backgroundColor: 'rgba(255, 14, 0, 0.1)',
                color: '#FF0E00',
                borderRadius: '7.5px', // Reduced by 25%
                padding: '6px 12px', // Reduced by 25%
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
                borderRadius: '7.5px', // Reduced by 25%
                padding: '6px 12px', // Reduced by 25%
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
      {!loading && appointments.length === 0 && (
        <Typography style={{ textAlign: "center" }}>No appointments found.</Typography>
      )}
    </Box>
  );
};

export default AppointmentListView;