import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Avatar, TextField, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
    applyFilters(searchTerm, sortOption, filterOption);
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

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
  };

  const handleSort = () => {
    const newSortOption = sortOption === "name-asc" ? "name-desc" : "name-asc";
    setSortOption(newSortOption);
  };

  const handleFilter = () => {
    const newFilterOption =
      filterOption === "rating" ? "experience" : filterOption === "experience" ? "" : "rating";
    setFilterOption(newFilterOption);
  };

  const applyFilters = (search, sort, filter) => {
    let result = [...clients];

    // Apply search filter
    if (search) {
      result = result.filter(
        (client) =>
          client.name.toLowerCase().includes(search) ||
          client.email.toLowerCase().includes(search) ||
          client.mobile.toLowerCase().includes(search)
      );
    }

    // Apply sorting
    if (sort === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Apply filtering by rating or experience
    if (filter === "rating") {
      result = result.filter((client) => client.rating >= 4);
    } else if (filter === "experience") {
      result = result.filter((client) => client.yearsOfExperience >= 5);
    }

    setFilteredClients(result);
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
      <Box className="header" style={{ padding: "12px" }}>
        <Box className="header-left" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <IconButton size="small">
            <ArrowBackIcon style={{ color: "#343434", fontSize: "18px" }} />
          </IconButton>
          <Typography
            variant="h6"
            className="title"
            style={{
              fontSize: "18px",
              lineHeight: "22px",
              fontWeight: "bold",
              color: "#343434",
            }}
          >
            Clients
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

      {error ? (
        <Typography style={{ color: "red", margin: "16px", fontSize: "12px" }}>{error}</Typography>
      ) : filteredClients.length > 0 ? (
        <Box
          className="team-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "12px",
            justifyContent: "center",
            paddingRight: "6px",
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
                padding: "0px 15px 0px 0px",
                gap: "12px",
                width: "100%",
                maxWidth: "400px",
                height: "82.5px",
                background: "#FFFFFF",
                boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.05)",
                borderRadius: "7.5px",
              }}
            >
              <Avatar
                src={client.profilePhoto || "/default-profile.png"}
                style={{
                  width: "90px",
                  height: "82.5px",
                  borderRadius: "7.5px 0px 0px 7.5px",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.02)",
                }}
              />
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "288px",
                  height: "54px",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "18px",
                    color: "#343434",
                  }}
                >
                  {client.name}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "9px",
                    lineHeight: "12px",
                    color: "#7A7A7A",
                  }}
                >
                  Email: {client.email || "N/A"}
                </Typography>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: "400",
                    fontSize: "9px",
                    lineHeight: "12px",
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
        <Typography style={{ margin: "16px", fontSize: "12px" }}>No client details available.</Typography>
      )}
    </Box>
  );
};

export default ViewClients;
