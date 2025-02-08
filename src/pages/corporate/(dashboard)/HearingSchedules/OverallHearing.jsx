import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { ListAlt, CalendarToday } from "@mui/icons-material"; // Icons for List and Calendar view
import { Search, FilterList, Download, Sort } from "@mui/icons-material";
import HearingListView from "./HearingListView"; // Separate list view component
import HearingCalendarView from "./HearingCalendarView";
import Topbar from "../../global/Topbar";
import Sidebar from "../../global/Sidebar";

const Hearing = () => {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'

  // Mock data for hearings
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
      dateTime: "2024-08-23T16:00:00",
      dateTimeEnd: "2024-08-23T18:00:00",
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
      dateTime: "2024-08-23T16:00:00",
      dateTimeEnd: "2024-08-23T18:00:00",
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
      dateTime: "2024-08-23T16:00:00",
      dateTimeEnd: "2024-08-23T18:00:00",
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

  const handleViewToggle = (event, newView) => {
    if (newView) setViewMode(newView);
  };

  return (
    <Box display="flex" height="100vh" position="relative">
      {/* Sidebar and Topbar */}
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
        <Topbar />
        <Box
          component="main"
          flexGrow={1}
          p={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            maxHeight: "1600px", // Adjust based on the topbar height
          }}
        >
          {/* 3D Shadow Container */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "1800px",
              background: "#FFFFFF",
              borderRadius: "16px",
              boxShadow:
                "0px 4px 10px rgba(0, 0, 0, 0.1), 0px 8px 30px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "18px",
                  color: "#343434",
                }}
              >
                Hearing Schedules
              </Typography>
              <Box className="header-right" display="flex" gap={2}>
                <Box
                  className="action-button"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Search />
                  <Typography>Search List</Typography>
                </Box>
                <Box
                  className="action-button"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <FilterList />
                  <Typography>Filter</Typography>
                </Box>
                <Box
                  className="action-button"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Download />
                  <Typography>Download List</Typography>
                </Box>
                <Box
                  className="action-button"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Sort />
                  <Typography>Sort</Typography>
                </Box>
              </Box>
            </Box>

            {/* View Toggle */}
            <Box
              sx={{
                padding: "16px 24px",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewToggle}
                aria-label="view toggle"
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
                <ToggleButton value="list" aria-label="list view">
                  <ListAlt sx={{ mr: 1 }} /> List View
                </ToggleButton>
                <ToggleButton value="calendar" aria-label="calendar view">
                  <CalendarToday sx={{ mr: 1 }} /> Calendar View
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Content View */}
            <Box sx={{ padding: "24px" }}>
              {viewMode === "list" ? (
                <HearingListView hearings={hearings} /> // Pass hearings to ListView
              ) : (
                <HearingCalendarView hearings={hearings} /> // Pass hearings to CalendarView
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hearing;
