import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import ViewTeam from "./ViewTeam";
import AddUser from "../forms/AddUser";
import ProfileInside from "./ProfileInside";

function App() {
  const [theme, colorMode] = useMode();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

 

  const handleClosePopup = () => {
    setShowAddUserPopup(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Entire Page Container */}
        <Box display="flex" height="100vh" position="relative" overflow="hidden">
          <Sidebar />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="auto"
          >
            <Topbar />
            <Box component="main" flexGrow={1} p={2} overflow="auto">
              <ProfileInside />
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
              backgroundColor="rgba(0, 0, 0, 0.5)"
              zIndex={1300} // Ensures it appears above all other components
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
              zIndex={1400} // Higher than overlay
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
              <AddUser onClose={handleClosePopup} />
            </Box>
          )}

          
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
