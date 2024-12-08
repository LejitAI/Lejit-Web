import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Button } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";
import ViewTeam from "./ViewTeam"; // Adjust the import path as per your structure
import AddUser from "../forms/AddUser"; // Import the AddUser component
import AskAI from "../global/AskAI"; 

function App() {
  const [theme, colorMode] = useMode();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false); // State to control AddUser popup visibility

  // Handler to show the AddUser popup
  const handleAddTeamMember = () => {
    setShowAddUserPopup(true);
  };

  // Handler to close the AddUser popup
  const handleClosePopup = () => {
    setShowAddUserPopup(false);
  };

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
              <ViewTeam /> 
            </Box>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={handleAddTeamMember}
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
            zIndex: 1000, // Ensure it appears on top
          }}
        >
          Add Team Member
        </Button>

        {/* Fixed Ask AI Box */}
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "280px",
            zIndex: 1000, // Ensure it appears on top
          }}
        >
          <AskAI />
        </div>

        {/* Popup for Add Team Member */}
        {showAddUserPopup && <AddUser onClose={handleClosePopup} />}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
