import React from "react";
import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import SortIcon from "@mui/icons-material/Sort";
import "./Cases.css";

const casesData = [
  {
    title: "High Court Divorce Case",
    clientName: "Steve Haworth",
    caseType: "AIB Professional Firm",
    status: "Ongoing",
    documents: ["Property Document.pdf", "Proof.pdf", "Licence.pdf"],
    date: { day: "14", weekday: "TUE" },
  },
  {
    title: "Property Dispute Case",
    clientName: "Jessica Pearson",
    caseType: "Pearson Hardman LLP",
    status: "Pending",
    documents: ["Agreement.pdf", "Ownership Proof.pdf"],
    date: { day: "12", weekday: "MON" },
  },
  {
    title: "Civil Court Settlement",
    clientName: "Harvey Specter",
    caseType: "Specter Litt",
    status: "Completed",
    documents: ["Court Order.pdf"],
    date: { day: "10", weekday: "SAT" },
  },
];

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

      {/* Cases */}
      <Box className="team-list">
        {casesData.map((caseItem, index) => (
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
                  <Typography key={docIndex} className="document-name">{doc}</Typography>
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
