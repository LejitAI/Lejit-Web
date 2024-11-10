import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import SortIcon from '@mui/icons-material/Sort';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import './ViewTeam.css';

const ViewTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://13.232.153.48:5000/api/admin/get-team-members', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                setTeamMembers(result);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    return (
        <Box className="view-team-container">
            <Box className="header">
                <Box className="header-left">
                    <IconButton>
                        <ArrowBackIcon style={{ color: '#343434' }} />
                    </IconButton>
                    <Typography variant="h5" className="title">Team Members</Typography>
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
                        <Typography>Download list</Typography>
                    </Box>
                    <Box className="action-button">
                        <SortIcon />
                        <Typography>Sort</Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box className="team-list">
                {teamMembers.map((member, index) => (
                    <Box key={index} className="team-card">
                        <Avatar
                            src={member.personalDetails.imageUrl || '/default-profile.png'}
                            className="team-avatar"
                        />
                        <Box className="team-info">
                            <Typography className="member-name">
                                {member.personalDetails.name} ({member.professionalDetails.lawyerType})
                            </Typography>
                            <Box className="member-details">
                                <Typography>Exp. - {member.personalDetails.yearsOfExperience} yrs |</Typography>
                                <Typography>Cases Solved - {member.casesSolved || 'N/A'}</Typography>
                            </Box>
                            <Typography className="added-date">
                                Added On {member.createdAt || 'N/A'}
                            </Typography>
                        </Box>
                        <Box className="rating">
                            <Box className="rating-stars">
                                {[...Array(5)].map((star, i) => (
                                    <StarIcon
                                        key={i}
                                        className="star"
                                        style={{
                                            color: i < Math.round(member.rating || 0) ? '#FBCE1B' : '#D0D0D0',
                                        }}
                                    />
                                ))}
                            </Box>
                            <Typography className="rating-score">{member.rating ? member.rating.toFixed(1) : 'N/A'}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            
        </Box>
    );
};

export default ViewTeam;
