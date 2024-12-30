import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import ViewClients from "./ViewClients"; // Adjust the import path as per your structure
import AddClient from "../forms/AddClient"; // Import the AddClient component
import AskAI from "../global/AskAI";

function App() {
  const [theme, colorMode] = useMode();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false); // State to control AddClient popup visibility

  // Handler to show the AddClient popup
  const handleAddTeamMember = () => {
    setShowAddUserPopup(true);
  };

  // Handler to close the AddClient popup
  const handleClosePopup = () => {
    setShowAddUserPopup(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Entire Page Container */}
        <Box display="flex" height="100vh" position="relative">
          <Sidebar />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="hidden"
          >
            <Topbar />
            <Box component="main" flexGrow={1} p={2}>
              <ViewClients />
            </Box>
          </Box>

          {/* Dimmed Overlay */}
          {showAddUserPopup && (
            <Box
              position="fixed"
              top={0}
              left={0}
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.5)" // Dim background
              zIndex={1300} // Higher than Sidebar and Topbar
            />
          )}

          {/* Popup Container */}
          {showAddUserPopup && (
            <Box
              position="fixed"
              top="10%"
              left="50%"
              transform="translateX(-50%)"
              width="90%"
              maxWidth="720px"
              background="#FFFFFF"
              borderRadius="12px"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
              zIndex={1400} // Above overlay
              overflowY="auto"
              maxHeight="80vh"
              padding="24px"
            >
              {/* Close Button */}
              <Box
                position="absolute"
                top="16px"
                right="16px"
                fontSize="24px"
                color="#333"
                fontWeight="bold"
                style={{ cursor: "pointer" }}
                onClick={handleClosePopup}
              >
                &times;
              </Box>
              <AddClient onClose={handleClosePopup} />
            </Box>
          )}

          {/* Add Client Button */}
          <Button
            variant="contained"
            onClick={handleAddTeamMember}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "80px",
              padding: "16px 40px",
              backgroundColor: "#0F67FD",
              color: "#FFFFFF",
              borderRadius: "15px",
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "16px",
              textTransform: "uppercase",
              zIndex: 1000, // Ensure it appears on top
            }}
          >
            Add Client
          </Button>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
