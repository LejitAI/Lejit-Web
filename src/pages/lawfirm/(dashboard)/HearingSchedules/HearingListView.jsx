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
        gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
        gap: "20px",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {hearings.map((hearing, index) => (
        <Card
          key={index}
          sx={{
            width: "357.67px",
            height: "130px",
            background: "#FFFFFF",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
            borderRadius: "10px",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* Date and Time */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <AccessTimeIcon
              sx={{ fontSize: "16px", color: "#7A7A7A" }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "19px",
                color: "#7A7A7A",
              }}
            >
              {hearing.date ? new Date(hearing.date).toLocaleDateString() : "N/A"} at {hearing.time || "N/A"}
            </Typography>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: "100%",
              height: "1px",
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
                gap: "12px",
              }}
            >
              <Avatar
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.02)",
                }}
              >
                {hearing.caseName ? hearing.caseName.charAt(0) : "N/A"}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "27px",
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
                gap: "10px",
              }}
            >
              <IconButton
                sx={{
                  width: "35px",
                  height: "35px",
                  background: "#FFFFFF",
                  border: "2px solid rgba(186, 186, 186, 0.15)",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NoteIcon
                  sx={{
                    color: "#7A7A7A",
                    fontSize: "18px",
                  }}
                />
              </IconButton>
              <IconButton
                sx={{
                  width: "35px",
                  height: "35px",
                  background: "#FFFFFF",
                  border: "2px solid rgba(186, 186, 186, 0.15)",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CallIcon
                  sx={{
                    color: "#7A7A7A",
                    fontSize: "18px",
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