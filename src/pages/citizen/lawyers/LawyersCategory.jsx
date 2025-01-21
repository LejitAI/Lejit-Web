import React, { useEffect, useState } from 'react';
import { Box, Typography, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LawFirmsPage = () => {
    const [lawFirms, setLawFirms] = useState([]);
    const [loadingLawFirms, setLoadingLawFirms] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLawFirms();
    }, []);

    // Fetch all law firms
    const fetchLawFirms = async () => {
        setLoadingLawFirms(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('backend/api/admin/get-all-law-firms', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch law firms');
            }

            const result = await response.json();
            setLawFirms(result);
        } catch (err) {
            console.error('Error fetching law firms:', err);
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoadingLawFirms(false);
        }
    };

    // Navigate to ViewTeam page with lawFirmId
    const handleLawFirmClick = (lawFirmId) => {
        navigate(`/viewteamlawfirm/${lawFirmId}`);
    };

    return (
        <Box className="law-firms-page" style={{ padding: '20px' }}>
            <Typography variant="h4" style={{ marginBottom: '20px', fontFamily: 'Poppins', fontWeight: '600' }}>
                All Law Firms
            </Typography>

            {loadingLawFirms && (
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography style={{ color: 'red', marginBottom: '20px', textAlign: 'center' }}>
                    {error}
                </Typography>
            )}

            <Box
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                }}
            >
                {lawFirms.map((firm, index) => (
                    <Box
                        key={index}
                        onClick={() => handleLawFirmClick(firm.createdBy)} // Use `createdBy` as the law firm ID
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '20px',
                            background: '#fff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar
                            style={{
                                width: '80px',
                                height: '80px',
                                marginBottom: '10px',
                                backgroundColor: '#3f51b5',
                            }}
                        >
                            {firm.lawFirmDetails?.lawFirmName?.[0] || 'L'}
                        </Avatar>
                        <Typography
                            variant="h6"
                            style={{
                                fontFamily: 'Poppins',
                                fontWeight: '500',
                                fontSize: '18px',
                                textAlign: 'center',
                                marginBottom: '10px',
                            }}
                        >
                            {firm.lawFirmDetails?.lawFirmName || 'Unnamed Firm'}
                        </Typography>
                        <Typography
                            style={{
                                fontFamily: 'Poppins',
                                fontSize: '14px',
                                textAlign: 'center',
                                color: '#7A7A7A',
                                marginBottom: '10px',
                            }}
                        >
                            {firm.lawFirmDetails?.contactInfo?.email || 'No email provided'}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default LawFirmsPage;
