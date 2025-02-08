import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Avatar, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import SortIcon from '@mui/icons-material/Sort';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete'; // Added DeleteIcon
import './ViewTeam.css';

const ViewTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('backend/api/team-member/get-team-members', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        const sortedMembers = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setTeamMembers(sortedMembers);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const handleDelete = async (memberId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this team member?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`backend/api/team-member/delete-team-member/${memberId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setTeamMembers((prev) => prev.filter((member) => member._id !== memberId));
      } else {
        throw new Error('Failed to delete team member.');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const handleBack = () => {
    setSelectedMember(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    applyFilters(query, sortOption, filterOption);
  };

  const handleSort = () => {
    const newSortOption = sortOption === "name-asc" ? "name-desc" : "name-asc";
    setSortOption(newSortOption);
    applyFilters(searchTerm, newSortOption, filterOption);
  };

  const handleFilter = () => {
    const newFilterOption =
      filterOption === "experience" ? "" : "experience";
    setFilterOption(newFilterOption);
    applyFilters(searchTerm, sortOption, newFilterOption);
  };

  const applyFilters = (search, sort, filter) => {
    let result = [...teamMembers];

    // Apply search filter
    if (search) {
      result = result.filter(
        (member) =>
          member.personalDetails.name.toLowerCase().includes(search) ||
          member.personalDetails.email.toLowerCase().includes(search) ||
          member.personalDetails.mobile.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    if (sort === "name-asc") {
      result.sort((a, b) => a.personalDetails.name.localeCompare(b.personalDetails.name));
    } else if (sort === "name-desc") {
      result.sort((a, b) => b.personalDetails.name.localeCompare(a.personalDetails.name));
    }

    // Apply filtering by experience
    if (filter === "experience") {
      result = result.filter((member) => member.personalDetails.yearsOfExperience >= 5);
    }

    setTeamMembers(result);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Phone,Experience\n" +
      teamMembers
        .map(
          (member) =>
            `${member.personalDetails.name},${member.personalDetails.email || "N/A"},${member.personalDetails.mobile || "N/A"},${member.personalDetails.yearsOfExperience || "N/A"}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "team_members.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedMember) {
    return (
      <Box className="view-team-container">
        <Box className="header" style={{ marginBottom: '12px' }}>
          <IconButton onClick={handleBack} size="small">
            <ArrowBackIcon style={{ color: '#343434', fontSize: '14px' }} />
          </IconButton>
          <Typography
            variant="h6"
            className="title"
            style={{
              fontSize: '18px',
              lineHeight: '22px',
              fontWeight: 'bold',
            }}
          >
            Team Member Details
          </Typography>
        </Box>
        <Box
          className="member-details"
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '18px',
            padding: '18px',
            background: '#FFFFFF',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)',
            borderRadius: '7.5px',
            maxWidth: '750px',
            margin: '0 auto',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={selectedMember.personalDetails.imageUrl || '/default-profile.png'}
            style={{
              width: '135px',
              height: '135px',
              borderRadius: '7.5px',
              boxShadow: '0px 3px 7.5px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box style={{ flex: 1 }}>
            <Typography
              variant="h6"
              style={{
                marginBottom: '12px',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Personal Details
            </Typography>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <Box>
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  <strong>Name:</strong> {selectedMember.personalDetails.name}
                </Typography>
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  <strong>Email:</strong> {selectedMember.personalDetails.email}
                </Typography>
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  <strong>Mobile:</strong> {selectedMember.personalDetails.mobile}
                </Typography>
                <Typography variant="body1" style={{ fontSize: '12px' }}>
                  <strong>Gender:</strong> {selectedMember.personalDetails.gender}
                </Typography>
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
        <Box className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <IconButton size="small">
            <ArrowBackIcon style={{ color: '#343434', fontSize: '14px' }} />
          </IconButton>
          <Typography
            variant="h6"
            className="title"
            style={{
              fontSize: '18px',
              lineHeight: '22px',
              fontWeight: 'bold',
            }}
          >
            Team Members
          </Typography>
        </Box>
        <Box className="header-right" style={{ display: "flex", gap: "12px" }}>
          <Box className="action-button" style={{ display: "flex", alignItems: "center", gap: "4.5px" }}>
            <SearchIcon style={{ fontSize: "10.5px" }} />
            <TextField
              variant="standard"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{ style: { fontSize: "10.5px" } }}
            />
          </Box>
          <Box className="action-button" style={{ display: "flex", alignItems: "center", gap: "4.5px" }}>
            <FilterListIcon style={{ fontSize: "10.5px" }} />
            <Typography style={{ fontSize: "10.5px" }}>{filterOption || "Filter"}</Typography>
          </Box>
          <Box className="action-button" onClick={handleSort} style={{ display: "flex", alignItems: "center", gap: "4.5px" }}>
            <SortIcon style={{ fontSize: "10.5px" }} />
            <Typography style={{ fontSize: "10.5px" }}>{sortOption === "name-desc" ? "Sort Desc" : "Sort Asc"}</Typography>
          </Box>
          <Box
            className="action-button"
            onClick={handleDownload}
            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
          >
            <DownloadIcon style={{ fontSize: "13.5px" }} />
            <Typography style={{ fontSize: "9px" }}>Download List</Typography>
          </Box>
        </Box>
      </Box>

      <Box
        className="team-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(405px, 1fr))',
          gap: '12px',
          justifyContent: 'center',
          maxHeight: '375px',
          overflowY: 'auto',
          paddingRight: '6px',
        }}
      >
        {teamMembers.map((member, index) => (
          <Box
            key={index}
            className="team-card"
            onClick={() => setSelectedMember(member)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px 15px 0px 0px',
              gap: '12px',
              width: '100%',
              maxWidth: '405px',
              height: '82.5px',
              background: '#FFFFFF',
              boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.05)',
              borderRadius: '7.5px',
              cursor: 'pointer',
            }}
          >
            <Avatar
              src={member.personalDetails.imageUrl || '/default-profile.png'}
              style={{
                width: '90px',
                height: '82.5px',
                borderRadius: '7.5px 0px 0px 7.5px',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.02)',
              }}
            />
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '288px',
                height: '54px',
              }}
            >
              <Typography
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: '#343434',
                }}
              >
                {member.personalDetails.name} ({member.professionalDetails.lawyerType})
              </Typography>
              <Box style={{ display: 'flex', gap: '5.25px' }}>
                <Typography
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    fontSize: '9px',
                    color: '#7A7A7A',
                  }}
                >
                  Exp. - {member.personalDetails.yearsOfExperience} yrs |
                </Typography>
                <Typography
                  style={{
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    fontSize: '9px',
                    color: '#7A7A7A',
                  }}
                >
                  Cases Solved - {member.casesSolved || 'N/A'}
                </Typography>
              </Box>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(member._id);
                }}
              >
                <DeleteIcon style={{ fontSize: '14px' }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ViewTeam;
