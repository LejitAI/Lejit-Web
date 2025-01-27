import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../../lawfirm/global/Topbar";
import Sidebar from "../../../lawfirm/global/Sidebar";
import QnaScreen from "./QnaScreen";
function App() {
  const [theme, colorMode] = useMode();

 
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
            <Box component="main" flexGrow={1} p={2} overflow="auto">
              <QnaScreen />
            </Box>
          </Box>

         

         
          

         
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
