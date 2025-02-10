import React, { useEffect, useState } from "react";
import HearingListView from "./HearingListView";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";
import { Box, Typography } from "@mui/material";

const HearingSchedulesPage = () => {
  const [hearings, setHearings] = useState([]);
  const userId = "678f4c732214726f83a51ae7"; // Hardcoded user ID

  useEffect(() => {
    const fetchHearings = async () => {
      try {
        const response = await fetch(`backend/api/hearing-schedule/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hearing schedules");
        }
        const data = await response.json();
        setHearings(data);
      } catch (error) {
        console.error("Error fetching hearing schedules:", error);
      }
    };

    fetchHearings();
  }, [userId]);

  return (
    <Box display="flex" height="100vh" position="relative" overflow="hidden">
      {/* Sidebar and Topbar */}
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Topbar />
        <Box 
          component="main" 
          flexGrow={1} 
          p={2} 
          sx={{
            overflowY: "auto", // Enable scrolling
            maxHeight: "calc(100vh - 64px)", // Adjust based on the topbar height
          }}
        >
          {/* Container for Hearing Schedules Page */}
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
                Hearing Schedules
              </Typography>
            </Box>

            {/* Content View */}
            <HearingListView hearings={hearings} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HearingSchedulesPage;