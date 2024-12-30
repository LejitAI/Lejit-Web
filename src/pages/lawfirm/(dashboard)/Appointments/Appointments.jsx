import React from 'react';
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import Appointments from "./Appointmentsub"; // Make sure to adjust the import path as per your structure

function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex" height="100vh">
                    <Sidebar />
                    <Box
                        display="flex"
                        flexDirection="column"
                        flexGrow={1}
                        overflow="hidden"
                    >
                        <Topbar />
                        <Box component="main" flexGrow={1} p={2}>
                            <Appointments /> {/* Main content (ViewTeam component) goes here */}
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
