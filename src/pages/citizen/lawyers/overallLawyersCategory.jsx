import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../citizen/global/Topbar";
import Sidebar from "../../citizen/global/Sidebar";
import Lawyers from "./LawyersCategory";

function App() {
  const [theme, colorMode] = useMode();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);

  const handleAddTeamMember = () => {
    setShowAddUserPopup(true);
  };

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
              < Lawyers/>
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

          
          
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
