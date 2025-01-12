import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar, Button, CircularProgress } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../citizen/global/Topbar";
import Sidebar from "../../citizen/global/Sidebar";

const TeamMemberDetails = () => {
  const { memberId } = useParams();
  const [memberDetails, setMemberDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [theme, colorMode] = useMode();

  useEffect(() => {
    fetchMemberDetails();
  }, []);

  const fetchMemberDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://52.74.188.1:5000/api/admin/get-team-member-details/${memberId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch team member details");
      }

      const data = await response.json();
      setMemberDetails(data);
    } catch (err) {
      console.error("Error fetching team member details:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex" height="100vh" position="relative">
          <Sidebar />
          <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
            <Topbar />
            <Box component="main" flexGrow={1} p={4}>
              {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Typography style={{ color: "red", textAlign: "center" }}>{error}</Typography>
              )}
              {!loading && memberDetails && (
                <Box
                  style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "30px",
                    background: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Title Section */}
                  <Typography
                    variant="h5"
                    style={{
                      marginBottom: "20px",
                      fontFamily: "Poppins",
                      fontWeight: "600",
                      textAlign: "left",
                    }}
                  >
                    Lawyer Details
                  </Typography>

                  {/* Header Section */}
                  <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={memberDetails.personalDetails?.imageUrl || "/default-profile.png"}
                        alt={memberDetails.personalDetails?.name}
                        style={{
                          width: "120px",
                          height: "120px",
                          marginRight: "20px",
                          borderRadius: "10px",
                        }}
                      />
                      <Box>
                        <Typography variant="h5" fontWeight="bold">
                          {memberDetails.personalDetails?.name || "Unnamed Member"}
                        </Typography>
                        <Typography color="textSecondary">
                          {memberDetails.professionalDetails?.lawyerType || "No designation"}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
  variant="contained"
  color="primary"
  onClick={() => {
    const lawyerId = memberDetails._id;
    const lawFirmId = memberDetails.createdBy._id;
    window.location.href = `/book-appointment?lawyerId=${lawyerId}&lawFirmId=${lawFirmId}`;
  }}
>
  Book Appointment
</Button>

                  </Box>

                  {/* Key Metrics Section */}
                  <Box display="flex" justifyContent="space-between" mb={4}>
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight="bold">
                        {memberDetails.professionalDetails?.caseSolvedCount || "0"}+
                      </Typography>
                      <Typography color="textSecondary">Cases</Typography>
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="h6" fontWeight="bold">
                        {memberDetails.personalDetails?.yearsOfExperience || "0"} Yrs
                      </Typography>
                      <Typography color="textSecondary">Experience</Typography>
                    </Box>
                  </Box>

                  {/* Personal Details Section */}
                  <Box mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Personal Details
                    </Typography>
                    <Typography>
                      <strong>Name:</strong> {memberDetails.personalDetails?.name || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {memberDetails.personalDetails?.email || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Phone:</strong> {memberDetails.personalDetails?.mobile || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Gender:</strong> {memberDetails.personalDetails?.gender || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Address:</strong> {`${memberDetails.personalDetails?.address?.line1 || ""}, ${
                        memberDetails.personalDetails?.address?.city || ""
                      }`}
                    </Typography>
                  </Box>

                  {/* Professional Details Section */}
                  <Box mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Professional Details
                    </Typography>
                    <Typography>
                      <strong>Specialization:</strong> {memberDetails.professionalDetails?.specialization || "N/A"}
                    </Typography>
                    <Typography>
                      <strong>Degree:</strong> {memberDetails.professionalDetails?.degreeType || "N/A"} from{" "}
                      {memberDetails.professionalDetails?.degreeInstitution || "N/A"}
                    </Typography>
                  </Box>

                  {/* About Section */}
                  <Box mb={4}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      About Lawyer
                    </Typography>
                    <Typography color="textSecondary">
                      {memberDetails.professionalDetails?.bio ||
                        "No biography available for this lawyer."}
                    </Typography>
                  </Box>

                  {/* Additional Details */}
                  <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Previous Cases
                    </Typography>
                    {memberDetails.professionalDetails?.caseDetails?.previousCases?.length > 0 ? (
                      memberDetails.professionalDetails.caseDetails.previousCases.map((caseItem, index) => (
                        <Box key={index} mb={2}>
                          <Typography>
                            <strong>Case Type:</strong> {caseItem.caseType || "N/A"}
                          </Typography>
                          <Typography>
                            <strong>Description:</strong> {caseItem.caseDescription || "N/A"}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No previous cases listed.</Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default TeamMemberDetails;
