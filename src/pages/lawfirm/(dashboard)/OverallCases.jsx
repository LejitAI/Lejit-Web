import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import ViewTeam from "./ViewTeam";
import OverallCases from "./Cases";
import AddCase from "../forms/AddCase";
import BlueButton from "../global/BlueButton";

function App() {
  const [theme, colorMode] = useMode();
  const [showAddCasePopup, setShowAddCasePopup] = useState(false);

  const handleAddCase = () => {
    setShowAddCasePopup(true);
  };

  const handleClosePopup = () => {
    setShowAddCasePopup(false);
  };

  const handleBlueButtonClick = () => {
    alert("BlueButton clicked!");
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
            <Box 
              component="main" 
              flexGrow={1} 
              sx={{
                p: 2,
                overflowY: 'auto',
                width: '100%',
                height: 'calc(100vh - 64px)' // Adjust based on your Topbar height
              }}
            >
              <Box sx={{ 
                maxWidth: '1200px', 
                margin: '0 auto',
                width: '100%'
              }}>
                <OverallCases />
              </Box>
            </Box>
          </Box>

          {/* Floating Add Case Button */}
          <Button
            variant="contained"
            onClick={handleAddCase}
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
              zIndex: 1000,
            }}
          >
            ADD CASE
          </Button>

          {/* Dimmed Overlay */}
          {showAddCasePopup && (
            <Box
              position="fixed"
              top={0}
              left={0}
              width="100%"
              height="100%"
              backgroundColor="rgba(0, 0, 0, 0.5)"
              zIndex={1300}
            />
          )}

          {/* Add Case Popup */}
          {showAddCasePopup && (
            <Box
              position="fixed"
              top="50%"
              left="50%"
              style={{
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '720px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                zIndex: 1400,
                padding: '24px'
              }}
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
              <AddCase isOpen={showAddCasePopup} onClose={handleClosePopup} />
            </Box>
          )}

          <BlueButton onClick={handleBlueButtonClick} />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
