import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import ViewTeam from "./ViewTeam";
import OverallCases from "./Cases";
import AddCase from "../forms/AddCase";

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
              bottom: "80px", // Adjusted position
              right: "40px", // Adjusted position
              padding: "12px 30px", // Adjusted size
              backgroundColor: "#0F67FD",
              color: "#FFFFFF",
              borderRadius: "12px", // Adjusted border radius
              fontFamily: "Poppins",
              fontWeight: "500",
              fontSize: "14px", // Adjusted font size
              textTransform: "uppercase",
              zIndex: 1000,
            }}
          >
            ADD CASE
          </Button>

          {/* Add Case Popup */}
          <AddCase isOpen={showAddCasePopup} onClose={handleClosePopup} />

        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
