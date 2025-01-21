import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import { ColorModeContext, useMode } from '../../../theme';
import Topbar from '../../global/Topbar';
import Sidebar from '../../global/Sidebar';

const AppointmentListView = () => {
  const [theme, colorMode] = useMode();
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
      const lawyerId = localStorage.getItem("lawyerId"); // Ensure lawyerId is stored in localStorage
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
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <Box display="flex" height="100vh" position="relative">
        <Sidebar />
        <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
          <Topbar />
          <Box component="main" flexGrow={1} p={4}>
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Typography style={{ color: "red", textAlign: "center" }}>{error}</Typography>
            )}
            {!loading && appointments.length > 0 && (
              <Box>
                {appointments.map((appointment) => (
                  <Card key={appointment._id} style={{ marginBottom: "20px", padding: "20px" }}>
                    <Typography variant="h6">Appointment with {appointment.clientId.name}</Typography>
                    <Typography>Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</Typography>
                    <Typography>Time: {appointment.appointmentTime}</Typography>
                    <Typography>Law Firm: {appointment.lawFirmId.lawFirmDetails.lawFirmName}</Typography>
                    <Typography>Case Notes: {appointment.caseNotes}</Typography>
                  </Card>
                ))}
              </Box>
            )}
            {!loading && appointments.length === 0 && (
              <Typography style={{ textAlign: "center" }}>No appointments found.</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </ColorModeContext.Provider>
  );
};

export default AppointmentListView;