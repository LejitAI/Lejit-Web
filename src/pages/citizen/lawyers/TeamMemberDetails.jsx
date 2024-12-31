import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../citizen/global/Topbar";
import Sidebar from "../../citizen/global/Sidebar";

const TeamMemberDetails = () => {
    const { memberId } = useParams(); // Get team member ID from route params
    const [teamMember, setTeamMember] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [theme, colorMode] = useMode(); // For theme context

    useEffect(() => {
        fetchTeamMemberDetails();
    }, []);

    const fetchTeamMemberDetails = async () => {
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
            setTeamMember(data);
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
                    {/* Sidebar */}
                    <Sidebar />

                    <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
                        {/* Topbar */}
                        <Topbar />

                        {/* Main Content */}
                        <Box component="main" flexGrow={1} p={2}>
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

                            {!loading && !error && teamMember && (
                                <Box
                                    style={{
                                        maxWidth: "800px",
                                        margin: "0 auto",
                                        padding: "20px",
                                        background: "#fff",
                                        borderRadius: "10px",
                                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Box style={{ textAlign: "center", marginBottom: "20px" }}>
                                        <Avatar
                                            src={teamMember.personalDetails?.imageUrl || "/default-profile.png"}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                margin: "0 auto",
                                                backgroundColor: "#3f51b5",
                                            }}
                                        >
                                            {teamMember.personalDetails?.name?.[0] || "T"}
                                        </Avatar>
                                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                            {teamMember.personalDetails?.name || "Unnamed Member"}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "10px" }}>
                                        Personal Details
                                    </Typography>
                                    <Typography><strong>Email:</strong> {teamMember.personalDetails?.email || "N/A"}</Typography>
                                    <Typography><strong>Mobile:</strong> {teamMember.personalDetails?.mobile || "N/A"}</Typography>
                                    <Typography><strong>Gender:</strong> {teamMember.personalDetails?.gender || "N/A"}</Typography>
                                    <Typography><strong>Date of Birth:</strong> {new Date(teamMember.personalDetails?.dateOfBirth).toLocaleDateString() || "N/A"}</Typography>

                                    <Typography variant="h6" style={{ fontWeight: "bold", margin: "20px 0 10px" }}>
                                        Professional Details
                                    </Typography>
                                    <Typography><strong>Specialization:</strong> {teamMember.professionalDetails?.specialization || "N/A"}</Typography>
                                    <Typography><strong>Degree:</strong> {teamMember.professionalDetails?.degreeType || "N/A"}</Typography>
                                    <Typography><strong>Institution:</strong> {teamMember.professionalDetails?.degreeInstitution || "N/A"}</Typography>

                                    <Typography variant="h6" style={{ fontWeight: "bold", margin: "20px 0 10px" }}>
                                        Bank Details
                                    </Typography>
                                    <Typography><strong>Payment Method:</strong> {teamMember.bankAccountDetails?.paymentMethod || "N/A"}</Typography>
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
