import React from "react";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../../lawfirm/global/Topbar";
import Sidebar from "../../lawfirm/global/Sidebar";

// Import components
import Header from "./components/CaseDetails/Header";
import CaseInfo from "./components/CaseDetails/CaseInfo";
import HearingSchedule from "./components/CaseDetails/HearingSchedule";
import CaseStrategies from "./components/CaseDetails/CaseStrategy";
import TeamMembers from "./components/CaseDetails/TeamMembers";
import DocumentFolders from "./components/Documents/DocumentFolders";
import { useParams } from "react-router-dom";

const CaseDetails = () => {
  const [theme, colorMode] = useMode();
  const { id } = useParams();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
              className="p-8 bg-[#F9F9F9] overflow-auto"
            >
              {/* Main Content Box */}
              <Box
                className="bg-white rounded-[10px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-8"
                sx={{
                  width: "100%",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px"
                }}
              >
                {/* Header */}
                <Header />

                {/* Case Info */}
                <CaseInfo />

                {/* Hearing Schedules */}
                <HearingSchedule />

                {/* Case Strategies */}
                <CaseStrategies caseId={id} />


                {/* Team Members */}
                <TeamMembers />

                {/* Documents Section */}
                <DocumentFolders caseId={id} /> 
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CaseDetails;
