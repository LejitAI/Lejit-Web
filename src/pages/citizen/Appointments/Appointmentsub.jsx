import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HearingCalendarView from "./AppointmentCalendarView"; // Calendar View Component
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

const Hearing = () => {
  const [viewMode] = useState("calendar"); // Only 'calendar' mode

  // Mock Data for Calendar View
  const hearings = [
    {
      date: "22nd August, 2:00 pm - 4:00 pm",
      dateTime: "2024-08-22T14:00:00",
      dateTimeEnd: "2024-08-22T16:00:00",
      client: {
        name: "John Doe",
        caseType: "Family Dispute Case",
        image: "/images/john_doe.png",
      },
      location: "High Court",
    },
    {
      date: "23rd December, 4:00 pm - 6:00 pm",
      dateTime: "2024-12-23T16:00:00",
      dateTimeEnd: "2024-12-23T18:00:00",
      client: {
        name: "Emily Thompson",
        caseType: "Family Dispute Case",
        image: "/images/emily_thompson.png",
      },
      location: "Supreme Court",
    },
    {
      date: "24th August, 2:00 pm - 4:00 pm",
      dateTime: "2024-08-24T14:00:00",
      dateTimeEnd: "2024-08-24T16:00:00",
      client: {
        name: "Sarah Collins",
        caseType: "Family Dispute Case",
        image: "/images/sarah_collins.png",
      },
      location: "Family Court",
    },
  ];

  return (
    <Box display="flex" height="100vh" position="relative">
      {/* Sidebar and Topbar */}
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Topbar />
        <Box component="main" flexGrow={1} p={2}>
          {/* Container for Hearings Calendar */}
          <Box
            sx={{
              background: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              padding: "20px",
              maxWidth: "1600px",
              margin: "0 auto",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#343434",
                }}
              >
                Hearing Calendar
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  sx={{
                    "& .MuiToggleButton-root": {
                      textTransform: "none",
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#7A7A7A",
                      borderRadius: "10px",
                      border: "1px solid #C9C9C9",
                      "&.Mui-selected": {
                        backgroundColor: "#0F67FD",
                        color: "#FFFFFF",
                      },
                    },
                  }}
                >
                  <ToggleButton value="calendar" aria-label="calendar view">
                    <CalendarTodayIcon sx={{ mr: 1 }} /> Calendar View
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            {/* Calendar View */}
            <HearingCalendarView hearings={hearings} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hearing;
