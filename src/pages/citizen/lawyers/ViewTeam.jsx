import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../citizen/global/Topbar";
import Sidebar from "../../citizen/global/Sidebar";

const ViewTeam = () => {
  const { lawFirmId } = useParams(); // Retrieve lawFirmId from the route
  const [teamMembers, setTeamMembers] = useState([]);
  const [lawFirmName, setLawFirmName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [theme, colorMode] = useMode(); // For theme context

  useEffect(() => {
    fetchLawFirmDetails(); // Fetch the law firm's name and team members
  }, []);

  // Fetch law firm details
  const fetchLawFirmDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      // Fetch law firm details
      const lawFirmResponse = await fetch(
        `http://52.74.188.1:5000/api/admin/get-law-firm-details/${lawFirmId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!lawFirmResponse.ok) {
        throw new Error("Failed to fetch law firm details");
      }

      const lawFirmData = await lawFirmResponse.json();
      setLawFirmName(lawFirmData.lawFirmDetails?.lawFirmName || "Unnamed Firm");

      // Fetch team members for the law firm
      const teamResponse = await fetch(
        `http://52.74.188.1:5000/api/admin/get-team-members-by-law-firm/${lawFirmId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!teamResponse.ok) {
        throw new Error("Failed to fetch team members");
      }

      const teamData = await teamResponse.json();
      setTeamMembers(teamData);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTeamMemberClick = (memberId) => {
    navigate(`/team-member-details/${memberId}`); // Navigate to the team member details page
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh" position="relative">
          {/* Sidebar */}
          <Sidebar />

          <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
            {/* Topbar */}
            <Topbar />

            {/* Main Content */}
            <Box component="main" flexGrow={1} p={2}>
              <Box className="view-team-container" style={{ padding: "20px" }}>
                {loading && (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                )}

                {error && (
                  <Typography style={{ color: "red", textAlign: "center", marginBottom: "20px" }}>
                    {error}
                  </Typography>
                )}

                {!loading && !error && (
                  <>
                    <Typography
                      variant="h4"
                      style={{
                        marginBottom: "20px",
                        fontFamily: "Poppins",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      Lawyers of {lawFirmName}
                    </Typography>

                    <Box
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                        gap: "20px",
                      }}
                    >
                      {teamMembers.length > 0 ? (
                        teamMembers.map((member, index) => (
                          <Box
                            key={index}
                            onClick={() => handleTeamMemberClick(member._id)} // Navigate on click
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "20px",
                              background: "#fff",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              borderRadius: "10px",
                              cursor: "pointer", // Make it visually clickable
                            }}
                          >
                            <Avatar
                              src={member.personalDetails?.imageUrl || "/default-profile.png"}
                              style={{
                                width: "60px",
                                height: "60px",
                                marginRight: "15px",
                                backgroundColor: "#3f51b5",
                              }}
                            >
                              {member.personalDetails?.name?.[0] || "T"}
                            </Avatar>
                            <Box>
                              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                                {member.personalDetails?.name || "Unnamed Member"}
                              </Typography>
                              <Typography variant="body2" style={{ color: "#7A7A7A" }}>
                                {member.professionalDetails?.specialization || "No specialization provided"}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Typography style={{ textAlign: "center", color: "#7A7A7A" }}>
                          No team members found for this law firm.
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ViewTeam;
