import React from "react";
import { Box, Typography, Card, Avatar, IconButton } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import NoteIcon from "@mui/icons-material/Note";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const HearingListView = ({ hearings }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", // Reduced min width
        gap: "15px", // Reduced gap
        width: "100%",
        maxWidth: "900px", // Reduced max width
        margin: "0 auto",
        overflowY: "auto", // Enable scrolling
        maxHeight: "80vh", // Limit height for scrollable area
        paddingRight: "8px",
      }}
    >
      {hearings.map((hearing, index) => (
        <Card
          key={index}
          sx={{
            width: "268.25px", // Reduced width
            height: "97.5px", // Reduced height
            background: "#FFFFFF",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)", // Reduced shadow
            borderRadius: "7.5px", // Reduced border-radius
            padding: "9px 12px", // Reduced padding
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "9px", // Reduced gap
          }}
        >
          {/* Date and Time */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px", // Reduced gap
            }}
          >
            <AccessTimeIcon
              sx={{ fontSize: "12px", color: "#7A7A7A" }} // Reduced icon size
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "10.5px", // Reduced font size
                lineHeight: "14.25px", // Adjusted line height
                color: "#7A7A7A",
              }}
            >
              {hearing.date
                ? new Date(hearing.date).toLocaleDateString()
                : "N/A"}{" "}
              at {hearing.time || "N/A"}
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "100%",
              height: "0.75px", // Reduced height
              backgroundColor: "#C7C7C7",
              opacity: "0.5",
            }}
          />

          {/* Client Details */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "9px", // Reduced gap
              }}
            >
              <Avatar
                sx={{
                  width: "30px", // Reduced size
                  height: "30px", // Reduced size
                  borderRadius: "50%",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.02)", // Reduced shadow
                }}
              >
                {hearing.caseName ? hearing.caseName.charAt(0) : "N/A"}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "13.5px", // Reduced font size
                    lineHeight: "20.25px", // Adjusted line height
                    color: "#343434",
                  }}
                >
                  {hearing.caseName || "N/A"}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: "7.5px", // Reduced gap
              }}
            >
              <IconButton
                sx={{
                  width: "26.25px", // Reduced size
                  height: "26.25px", // Reduced size
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(186, 186, 186, 0.15)", // Adjusted border thickness
                  borderRadius: "50%",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.05)", // Reduced shadow
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NoteIcon
                  sx={{
                    color: "#7A7A7A",
                    fontSize: "13.5px", // Reduced icon size
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  width: "26.25px", // Reduced size
                  height: "26.25px", // Reduced size
                  background: "#FFFFFF",
                  border: "1.5px solid rgba(186, 186, 186, 0.15)", // Adjusted border thickness
                  borderRadius: "50%",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.05)", // Reduced shadow
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CallIcon
                  sx={{
                    color: "#7A7A7A",
                    fontSize: "13.5px", // Reduced icon size
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default HearingListView;
