import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import SortIcon from '@mui/icons-material/Sort';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallIcon from '@mui/icons-material/Call';
import MessageIcon from '@mui/icons-material/Message';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import './ViewClients.css';

const ViewClients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/get-clients', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();

                // Sort by most recent `createdAt` date in descending order
                const sortedClients = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setClients(sortedClients);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    return (
        <Box className="view-clients-container">
            <Box className="header">
                <Box className="header-left">
                    <IconButton>
                        <ArrowBackIcon style={{ color: '#343434' }} />
                    </IconButton>
                    <Typography variant="h5" className="title">Clients</Typography>
                </Box>
                <Box className="header-right">
                    <Box className="action-button">
                        <SearchIcon />
                        <Typography>Search List</Typography>
                    </Box>
                    <Box className="action-button">
                        <FilterListIcon />
                        <Typography>Filter</Typography>
                    </Box>
                    <Box className="action-button">
                        <DownloadIcon />
                        <Typography>Download List</Typography>
                    </Box>
                    <Box className="action-button">
                        <SortIcon />
                        <Typography>Sort</Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box 
                className="clients-list"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(540px, 1fr))',
                    gap: '16px',
                    justifyContent: 'center',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    paddingRight: '8px'
                }}
            >
                {clients.map((client, index) => (
                    <Box 
                        key={index} 
                        className="client-card" 
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '0px 20px 0px 0px',
                            gap: '16px',
                            width: '100%',
                            maxWidth: '540px',
                            height: '110px',
                            background: '#FFFFFF',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                            borderRadius: '10px'
                        }}
                    >
                        <Avatar
                            src={client.imageUrl || '/default-profile.png'}
                            style={{
                                width: '120px',
                                height: '110px',
                                borderRadius: '10px 0px 0px 10px',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)'
                            }}
                        />
                        <Box 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                width: '384.5px',
                                height: '72px'
                            }}
                        >
                            <Typography 
                                style={{
                                    fontFamily: 'Poppins',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    color: '#343434'
                                }}
                            >
                                {client.name}
                            </Typography>
                            <Typography 
                                style={{
                                    fontFamily: 'Poppins',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    color: '#7A7A7A'
                                }}
                            >
                                Email: {client.email || 'N/A'}
                            </Typography>
                            <Typography 
                                style={{
                                    fontFamily: 'Poppins',
                                    fontWeight: '400',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    color: '#7A7A7A'
                                }}
                            >
                                Phone: {client.phone || 'N/A'}
                            </Typography>
                            <Box 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginTop: '8px'
                                }}
                            >
                                <IconButton style={{ color: '#0F67FD' }} aria-label="Call">
                                    <CallIcon />
                                </IconButton>
                                <IconButton style={{ color: '#0F67FD' }} aria-label="Text">
                                    <MessageIcon />
                                </IconButton>
                                <IconButton style={{ color: '#0F67FD' }} aria-label="Video Call">
                                    <VideoCallIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ViewClients;
