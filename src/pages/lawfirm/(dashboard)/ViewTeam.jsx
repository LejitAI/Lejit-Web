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
    const [selectedMember, setSelectedMember] = useState(null); // State to hold the selected member

    useEffect(() => {
        fetchTeamMembers();
    }, []);

    const fetchTeamMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('backend/api/admin/get-team-members', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();

                // Sort by most recent `createdAt` date in descending order
                const sortedMembers = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTeamMembers(sortedMembers);
            }
        } catch (error) {
            console.error('Error fetching team members:', error);
        }
    };

    const handleBack = () => {
        setSelectedMember(null); // Clear selected member to return to the team list view
    };

    if (selectedMember) {
    // Render the selected team member's details
    return (
        <Box className="view-team-container">
            <Box className="header" style={{ marginBottom: '16px' }}>
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon style={{ color: '#343434' }} />
                </IconButton>
                <Typography variant="h5" className="title">
                    Team Member Details
                </Typography>
            </Box>
            <Box
                className="member-details"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                    padding: '24px',
                    background: '#FFFFFF',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: '10px',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    alignItems: 'center',
                }}
            >
                {/* Profile Section */}
                <Avatar
                    src={selectedMember.personalDetails.imageUrl || '/default-profile.png'}
                    style={{
                        width: '180px',
                        height: '180px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                />
                {/* Details Section */}
                <Box style={{ flex: 1 }}>
                    {/* Personal Details */}
                    <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: '600' }}>
                        Personal Details
                    </Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Box>
                            <Typography variant="body1"><strong>Name:</strong> {selectedMember.personalDetails.name}</Typography>
                            <Typography variant="body1"><strong>Email:</strong> {selectedMember.personalDetails.email}</Typography>
                            <Typography variant="body1"><strong>Mobile:</strong> {selectedMember.personalDetails.mobile}</Typography>
                            <Typography variant="body1"><strong>Gender:</strong> {selectedMember.personalDetails.gender}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1"><strong>Address:</strong></Typography>
                            <Typography variant="body2">
                                {selectedMember.personalDetails.address.line1}, {selectedMember.personalDetails.address.line2}, {selectedMember.personalDetails.address.city}, {selectedMember.personalDetails.address.state}, {selectedMember.personalDetails.address.country} - {selectedMember.personalDetails.address.postalCode}
                            </Typography>
                            <Typography variant="body1" style={{ marginTop: '8px' }}>
                                <strong>Date of Birth:</strong> {new Date(selectedMember.personalDetails.dateOfBirth).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    <hr style={{ margin: '16px 0', border: '1px solid #EEE' }} />

                    {/* Professional Details */}
                    <Typography variant="h6" style={{ marginBottom: '16px', fontWeight: '600' }}>
                        Professional Details
                    </Typography>
                    <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <Box>
                            <Typography variant="body1"><strong>Lawyer Type:</strong> {selectedMember.professionalDetails.lawyerType}</Typography>
                            <Typography variant="body1"><strong>Specialization:</strong> {selectedMember.professionalDetails.specialization}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body1"><strong>Degree:</strong> {selectedMember.professionalDetails.degreeType}</Typography>
                            <Typography variant="body1"><strong>Institution:</strong> {selectedMember.professionalDetails.degreeInstitution}</Typography>
                            <Typography variant="body1"><strong>Government ID:</strong> {selectedMember.professionalDetails.governmentID}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

    
    

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
                        <Typography>Download List</Typography>
                    </Box>
                    <Box className="action-button">
                        <SortIcon />
                        <Typography>Sort</Typography>
                    </Box>
                </Box>
            </Box>
            
            <Box 
                className="team-list"
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
                {teamMembers.map((member, index) => (
                    <Box 
                        key={index} 
                        className="team-card" 
                        onClick={() => setSelectedMember(member)} // Set the selected member on click
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
                            borderRadius: '10px',
                            cursor: 'pointer', // Add pointer cursor for better UX
                        }}
                    >
                        <Avatar
                            src={member.personalDetails.imageUrl || '/default-profile.png'}
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
                                {member.personalDetails.name} ({member.professionalDetails.lawyerType})
                            </Typography>
                            <Box 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '7px',
                                    height: '16px'
                                }}
                            >
                                <Typography 
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '400',
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        color: '#7A7A7A'
                                    }}
                                >
                                    Exp. - {member.personalDetails.yearsOfExperience} yrs |
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
                                    Cases Solved - {member.casesSolved || 'N/A'}
                                </Typography>
                            </Box>
                            <Box 
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '384.5px',
                                    height: '16px'
                                }}
                            >
                                <Typography 
                                    style={{
                                        fontFamily: 'Poppins',
                                        fontWeight: '400',
                                        fontSize: '12px',
                                        lineHeight: '16px',
                                        color: '#7A7A7A'
                                    }}
                                >
                                    Added On {new Date(member.createdAt).toLocaleDateString()}
                                </Typography>
                                <Box 
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: '1px 6px',
                                        gap: '2px',
                                        background: '#EEF4FF',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.02)',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {[...Array(5)].map((star, i) => (
                                        <StarIcon
                                            key={i}
                                            style={{
                                                width: '8.43px',
                                                height: '7.58px',
                                                color: i < Math.round(member.rating || 0) ? '#FBCE1B' : '#D0D0D0'
                                            }}
                                        />
                                    ))}
                                    <Typography 
                                        style={{
                                            fontFamily: 'Poppins',
                                            fontWeight: '600',
                                            fontSize: '10px',
                                            lineHeight: '15px',
                                            color: '#0F67FD',
                                            marginLeft: '4px'
                                        }}
                                    >
                                        {member.rating ? member.rating.toFixed(1) : 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ViewTeam;
