import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Sidebar from '../../global/Sidebar';
import Topbar from '../../global/Topbar';
import Appointments from './Appointmentsub'; // Make sure to adjust the import path as per your structure

function App() {

  return (
        <CssBaseline />
        <Box display="flex" height="75vh"> {/* Reduced by 25% */}
          <Sidebar />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="hidden"
          >
            <Topbar />
            <Box component="main" flexGrow={1} p={1.5}> {/* Reduced by 25% */}
              <Appointments />
            </Box>
          </Box>
        </Box>
  );
}

export default App;