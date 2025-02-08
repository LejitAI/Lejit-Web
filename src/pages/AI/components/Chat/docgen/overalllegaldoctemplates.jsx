import React from 'react';
import { ColorModeContext, useMode } from '../../../../../theme';
import { CssBaseline, ThemeProvider, Box } from '@mui/material';
import Topbar from '../../../../lawfirm/global/Topbar';
import Sidebar from '../../../../lawfirm/global/Sidebar';
import LegalDocumentTemplates from './legaldoctemplates';

const App = () => {
    const [theme, colorMode] = useMode();
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box display="flex" height="100vh">
            <Sidebar />
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <Topbar />
              <Box
                component="main"
                flexGrow={1}
                p={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  style={{
                    width: "100%",
                    maxWidth: "1200px",
                    padding: "20px",
                    background: "#fff",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
                    transform: "translateZ(0)",
                    overflow: "auto", // Enable scrolling
                  }}
                >
                  <LegalDocumentTemplates />
                </Box>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  };
  
  export default App;