import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Cases.css";
import { useNavigate } from 'react-router-dom';

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "case-status-ongoing";
    case "pending":
      return "case-status-pending";
    case "completed":
      return "case-status-completed";
    default:
      return "";
  }
};

const getStatusIndicatorClass = (status) => {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "status-indicator-ongoing";
    case "pending":
      return "status-indicator-pending";
    case "completed":
      return "status-indicator-completed";
    default:
      return "";
  }
};

const Cases = () => {
  const navigate = useNavigate();
  const [casesData, setCasesData] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null); // State for selected case
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

const handleDownload = () => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    "Title,Client Name,Case Type,Status,Starting Date\n" +
    filteredCases
      .map(
        (caseItem) =>
          `${caseItem.title},${caseItem.clientName},${caseItem.caseType},${caseItem.status},${caseItem.startingDate.toLocaleDateString()}`
      )
      .join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "cases.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};



  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please log in again.");

        const response = await fetch("http://backend.lejit.ai/backend/api/case/get-cases", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cases. Please try again later.");
        }

        const data = await response.json();
        const transformedCases = data.map((caseItem) => ({
          id: caseItem._id,
          title: caseItem.title,
          clientName: caseItem.client,
          caseType: caseItem.caseType,
          status: caseItem.status || "Ongoing",
          documents: caseItem.documents || [],
          startingDate: new Date(caseItem.startingDate),
          caseDescription: caseItem.caseDescription,
          caseWitness: caseItem.caseWitness,
          oppositeClient: caseItem.oppositeClient,
        }));

        setCasesData(transformedCases);
        setFilteredCases(transformedCases); // Initialize with all cases
      } catch (err) {
        console.error("Error fetching cases:", err.message);
        setError(err.message || "Failed to load cases.");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleBack = () => {
    setSelectedCase(null); // Clear the selected case to return to the case list
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, sortOption, filterOption);
  };

  const handleSort = () => {
    const newSortOption = sortOption === "date-asc" ? "date-desc" : "date-asc";
    setSortOption(newSortOption);
    applyFilters(searchQuery, newSortOption, filterOption);
  };

  const handleFilter = () => {
    const newFilterOption =
      filterOption === "ongoing" ? "pending" : filterOption === "pending" ? "completed" : "ongoing";
    setFilterOption(newFilterOption);
    applyFilters(searchQuery, sortOption, newFilterOption);
  };

  const applyFilters = (search, sort, filter) => {
    let result = [...casesData];

    // Apply search filter
    if (search) {
      result = result.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(search) ||
          caseItem.clientName.toLowerCase().includes(search) ||
          caseItem.caseType.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    if (sort === "date-asc") {
      result.sort((a, b) => a.startingDate - b.startingDate);
    } else if (sort === "date-desc") {
      result.sort((a, b) => b.startingDate - a.startingDate);
    }

    // Apply filtering by status
    if (filter) {
      result = result.filter((caseItem) => caseItem.status.toLowerCase() === filter.toLowerCase());
    }

    setFilteredCases(result);
  };

  const handleDelete = async (caseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this case?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Please log in again.");

      const response = await fetch(`backend/api/case/delete-case/${caseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete case. Please try again later.");
      }

      const result = await response.json();
      alert(result.message);

      // Remove the deleted case from the state
      setCasesData((prevCases) => prevCases.filter((caseItem) => caseItem.id !== caseId));
      setFilteredCases((prevFilteredCases) => prevFilteredCases.filter((caseItem) => caseItem.id !== caseId));
    } catch (err) {
      console.error("Error deleting case:", err.message);
      alert(err.message || "Failed to delete case.");
    }
  };

  const handleCaseClick = (caseItem) => {
    navigate(`/casedetails/${caseItem.id}`, { state: { caseData: caseItem } });
  };

  if (loading) {
    return <Typography>Loading cases...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (selectedCase) {
    // Detailed view of the selected case
    return (
      <Box className="case-details-container">
        <Box className="header" style={{ marginBottom: "16px" }}>
        <IconButton onClick={handleBack}>
  <ArrowBackIcon style={{ color: "#343434", fontSize: "1.125rem" }} /> {/* Reduced by 25% */}
</IconButton>
<Typography variant="h6" className="title"> {/* Changed from h5 to h6 */}
  Case Details
</Typography>
</Box>
<Box
  className="case-details"
  style={{
    padding: "18px", /* Reduced by 25% */
    background: "#FFFFFF",
    boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.1)", /* Reduced by 25% */
    borderRadius: "7.5px", /* Reduced by 25% */
    maxWidth: "600px", /* Reduced by 25% */
    margin: "0 auto",
  }}
>
  <Typography variant="body1"><strong>Title:</strong> {selectedCase.title}</Typography> {/* Changed from h6 to subtitle1 */}
  <Typography variant="body1"><strong>Client Name:</strong> {selectedCase.clientName}</Typography> {/* Changed from body1 to body2 */}

          <Typography variant="body1"><strong>Case Type:</strong> {selectedCase.caseType}</Typography>
          <Typography variant="body1"><strong>Opposite Client:</strong> {selectedCase.oppositeClient || "N/A"}</Typography>
          <Typography variant="body1"><strong>Witness:</strong> {selectedCase.caseWitness || "N/A"}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {selectedCase.caseDescription || "N/A"}</Typography>
          <Typography variant="body1"><strong>Starting Date:</strong> {selectedCase.startingDate.toLocaleDateString()}</Typography>
          <Typography variant="body1"><strong>Status:</strong> {selectedCase.status}</Typography>
          <Typography variant="body1"><strong>Documents:</strong></Typography>
          {selectedCase.documents.length > 0 ? (
            selectedCase.documents.map((doc, index) => (
              <Typography key={index} variant="body2">{doc}</Typography>
            ))
          ) : (
            <Typography variant="body2">No documents uploaded.</Typography>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box className="view-team-container">
      {/* Header */}
      <Box className="header">
        <Typography variant="h5" className="title">
          Cases
        </Typography>
        <Box className="header-right">
          <Box className="action-button" style={{ display: 'flex', alignItems: 'center', gap: '4.5px' }}> {/* Reduced by 25% */}
            <SearchIcon style={{ fontSize: '10.5px' }} /> {/* Reduced by 25% */}
            <TextField
              variant="standard"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{ style: { fontSize: '10.5px' } }} 
            />
          </Box>
          <Box className="action-button" style={{ display: 'flex', alignItems: 'center', gap: '4.5px' }}> {/* Reduced by 25% */}
            <FilterListIcon style={{ fontSize: '10.5px' }} /> {/* Reduced by 25% */}
            <Typography style={{ fontSize: '10.5px' }}>{filterOption || "Filter"}</Typography> {/* Reduced by 25% */}
          </Box>
          <Box className="action-button" onClick={handleSort} style={{ display: 'flex', alignItems: 'center', gap: '4.5px' }}> {/* Reduced by 25% */}
            <SortIcon style={{ fontSize: '10.5px' }} /> {/* Reduced by 25% */}
            <Typography style={{ fontSize: '10.5px' }}>{sortOption === "date-desc" ? "Sort Desc" : "Sort Asc"}</Typography> {/* Reduced by 25% */}
          </Box>
          <Box
            className="action-button"
            onClick={handleDownload}
            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }} 
          >
            <DownloadIcon style={{ fontSize: "13.5px" }} /> {/* Reduced by 25% */}
            <Typography style={{ fontSize: "9px" }}>Download List</Typography> {/* Reduced by 25% */}
          </Box>
        </Box>
      </Box>

      {/* Cases */}
      <Box className="team-list" style={{ gap: '8px' }}> {/* Reduced spacing */}
        {filteredCases.map((caseItem, index) => (
          <Box 
            key={index} 
            className="case-team-card" 
            onClick={() => handleCaseClick(caseItem)} 
            style={{ 
              transform: 'scale(0.867)', 
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)', // Enhanced shadow
              border: '1px solid rgba(0, 0, 0, 0.1)', // Added border
              borderRadius: '10px', // Slightly rounded corners
              transition: 'transform 0.3s, box-shadow 0.3s', // Smooth transition
              marginBottom: '8px' // Reduced spacing
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(0.9)';
              e.currentTarget.style.boxShadow = '0px 6px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(0.867)';
              e.currentTarget.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.15)';
            }}
          >
            <Box className="case-date">
              <Typography className="case-day" style={{ fontSize: '87%' }}> {/* Increased by 2% */}
                {caseItem.startingDate ? caseItem.startingDate.getDate() : "N/A"}
              </Typography>
              <Typography className="case-weekday" style={{ fontSize: '87%' }}> {/* Increased by 2% */}
                {caseItem.startingDate
                  ? caseItem.startingDate.toLocaleDateString("en-US", { weekday: "short" })
                  : "N/A"}
              </Typography>
            </Box>
            <Box className="team-info">
              <Typography className="member-name" variant="h6" style={{ fontSize: '87%' }}>{caseItem.title}</Typography> {/* Increased by 2% */}
              <Typography variant="body1" style={{ fontSize: '87%' }}>Client Name: {caseItem.clientName}</Typography> {/* Increased by 2% */}
              <Typography variant="body2" style={{ fontSize: '87%' }}>Case Type: {caseItem.caseType}</Typography> {/* Increased by 2% */}
            </Box>
            <Box className={`case-status ${getStatusClass(caseItem.status)}`} style={{ fontSize: '87%' }}> {/* Increased by 2% */}
              <span className={`status-indicator ${getStatusIndicatorClass(caseItem.status)}`} style={{ transform: 'scale(0.867)' }} /> {/* Increased by 2% */}
              {caseItem.status}
            </Box>
            <Box className="case-actions">
              <IconButton style={{ transform: 'scale(0.867)' }}> {/* Increased by 2% */}
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent click event
                handleDelete(caseItem.id);
              }} style={{ transform: 'scale(0.867)' }}> {/* Increased by 2% */}
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Cases;
