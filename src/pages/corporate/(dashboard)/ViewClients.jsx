import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Avatar, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import "./ViewClients.css";

const ViewClients = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    handleSearch();
    handleFilter();
    handleSort();
  }, [searchTerm, filterOption, sortOption]);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("backend/api/admin/get-client", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setClients(Array.isArray(result) ? result : [result]);
        setFilteredClients(Array.isArray(result) ? result : [result]);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch client details.");
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("An unexpected error occurred.");
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  };

  const handleFilter = () => {
    if (!filterOption) {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(
        (client) =>
          (filterOption === "rating" && client.rating >= 4) ||
          (filterOption === "experience" && client.yearsOfExperience >= 5)
      );
      setFilteredClients(filtered);
    }
  };

  const handleSort = () => {
    const sorted = [...filteredClients];
    if (sortOption === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "rating") {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    setFilteredClients(sorted);
  };

  const handleDownload = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Phone,Rating\n" +
      filteredClients
        .map(
          (client) =>
            `${client.name},${client.email || "N/A"},${client.mobile || "N/A"},${client.rating || "N/A"}`
        )
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box className="view-team-container">
      <Box className="header">
        <Box className="header-left">
          <IconButton>
            <ArrowBackIcon style={{ color: "#343434" }} />
          </IconButton>
          <Typography variant="h5" className="title">Clients</Typography>
        </Box>
        <Box className="header-right">
          <Box className="action-button">
            <SearchIcon />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ marginLeft: "8px" }}
            />
          </Box>
          <Box className="action-button">
            <FilterListIcon />
            <TextField
              select
              variant="outlined"
              size="small"
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              style={{ marginLeft: "8px", width: "150px" }}
            >
              <MenuItem value="">No Filter</MenuItem>
              <MenuItem value="rating">High Rating (= 4)</MenuItem>
              <MenuItem value="experience">Experience (= 5 years)</MenuItem>
            </TextField>
          </Box>
          <Box className="action-button" onClick={handleDownload}>
            <DownloadIcon />
            <Typography>Download List</Typography>
          </Box>
          <Box className="action-button">
            <SortIcon />
            <TextField
              select
              variant="outlined"
              size="small"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ marginLeft: "8px", width: "150px" }}
            >
              <MenuItem value="">No Sort</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>

      {error ? (
        <Typography style={{ color: "red", margin: "20px" }}>{error}</Typography>
      ) : filteredClients.length > 0 ? (
        <Box
          className="team-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(540px, 1fr))",
            gap: "16px",
            justifyContent: "center",
            maxHeight: "500px",
            overflowY: "auto",
            paddingRight: "8px",
          }}
        >
          {filteredClients.map((client, index) => (
            <Box
              key={index}
              className="team-card"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0px 20px 0px 0px",
                gap: "16px",
                width: "100%",
                maxWidth: "540px",
                height: "110px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                borderRadius: "10px",
              }}
            >
              <Avatar
                src={client.profilePhoto || "/default-profile.png"}
                style={{
                  width: "120px",
                  height: "110px",
                  borderRadius: "10px 0px 0px 10px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.02)",
                }}
              />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "384.5px",
                  height: "72px",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#343434",
                  }}
                >
                  {client.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#7A7A7A",
                  }}
                >
                  Email: {client.email || "N/A"}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#7A7A7A",
                  }}
                >
                  Phone: {client.mobile || "N/A"}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography style={{ margin: "20px" }}>No client details available.</Typography>
      )}
    </Box>
  );
};

export default ViewClients;
