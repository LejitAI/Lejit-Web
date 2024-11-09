import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import Header from "../global/Header";

function App() {
    const [theme, colorMode] = useMode();

    // Use conditional rendering or props to determine the page's title and subtitle
    const pageTitle = "DASHBOARD"; // Change this based on the page context
    const pageSubtitle = "Welcome to your dashboard"; // Subtitle for the current page

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
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Header title={pageTitle} subtitle={pageSubtitle} />
                            </Box>
                            {/* Main content goes here */}
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
