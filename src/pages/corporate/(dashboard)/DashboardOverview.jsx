import React from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import LDashboard from "./LDashboard"; // Adjust the import path as per your structure
import AskAI from "../global/AskAI"; // Fixed AskAI button component

function DashboardOverview() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh">
          {/* Sidebar */}
          <Sidebar />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="hidden"
          >
            {/* Topbar */}
            <Topbar />
            {/* Main Content */}
            <Box component="main" flexGrow={1} p={2}>
              <LDashboard /> {/* Dashboard content */}
            </Box>
          </Box>
        </Box>

        {/* Fixed Ask AI Box */}
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "75px",
            zIndex: 1000, // Ensure it appears on top
          }}
        >
          {/* <AskAI /> */}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default DashboardOverview;
