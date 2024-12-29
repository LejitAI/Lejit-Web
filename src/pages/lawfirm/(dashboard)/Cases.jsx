import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import "./Cases.css";

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
  const [casesData, setCasesData] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); // Sorting criteria
  const [filterOption, setFilterOption] = useState(""); // Filtering criteria

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found. Please log in again.");

        const response = await fetch("backend/api/admin/get-cases", {
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
          title: caseItem.title,
          clientName: caseItem.client,
          caseType: caseItem.caseType,
          status: caseItem.status || "Ongoing", // Default status if missing
          documents: caseItem.documents || [],
          date: {
            day: new Date(caseItem.startingDate).getDate().toString(),
            weekday: new Date(caseItem.startingDate).toLocaleDateString("en-US", {
              weekday: "short",
            }),
          },
          startingDate: new Date(caseItem.startingDate),
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

  const handleDownload = () => {
    const headers = ["Title", "Client Name", "Case Type", "Status", "Date"];
    const rows = filteredCases.map((caseItem) => [
      caseItem.title,
      caseItem.clientName,
      caseItem.caseType,
      caseItem.status,
      caseItem.startingDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
    ]);

    const csvContent =
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "cases.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Typography>Loading cases...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box className="view-team-container">
      {/* Header */}
      <Box className="header">
        <Typography variant="h5" className="title">
          Cases
        </Typography>
        <Box className="header-right">
          <Box className="action-button">
            <SearchIcon />
            <TextField
              variant="standard"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: "200px" }}
            />
          </Box>
          <Box className="action-button" onClick={handleFilter}>
            <FilterListIcon />
            <Typography>{filterOption || "Filter"}</Typography>
          </Box>
          <Box className="action-button" onClick={handleSort}>
            <SortIcon />
            <Typography>{sortOption === "date-desc" ? "Sort Desc" : "Sort Asc"}</Typography>
          </Box>
          <Box className="action-button" onClick={handleDownload}>
            <DownloadIcon />
            <Typography>Download List</Typography>
          </Box>
        </Box>
      </Box>

      {/* Cases */}
      <Box className="team-list">
        {filteredCases.map((caseItem, index) => (
          <Box key={index} className="case-team-card">
            <Box className="case-date">
              <Typography className="case-day">{caseItem.date.day}</Typography>
              <Typography className="case-weekday">{caseItem.date.weekday}</Typography>
            </Box>
            <Box className="team-info">
              <Typography className="member-name">{caseItem.title}</Typography>
              <Box className="member-details">
                <Typography>Client Name: {caseItem.clientName}</Typography>
                <div className="case-doc-divider" />
                <Typography>Case Type: {caseItem.caseType}</Typography>
              </Box>
              <Box className="member-details">
                {caseItem.documents.map((doc, docIndex) => (
                  <Typography key={docIndex} className="document-name">
                    {doc}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box className={`case-status ${getStatusClass(caseItem.status)}`}>
              <span className={`status-indicator ${getStatusIndicatorClass(caseItem.status)}`} />
              {caseItem.status}
            </Box>
            <Box className="case-actions">
              <Box className="case-action-button">
                <VisibilityIcon />
              </Box>
              <Box className="case-action-button">
                <DeleteIcon />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Cases;
