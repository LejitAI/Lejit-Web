import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CaseIcon from "@mui/icons-material/Folder";
import DocumentIcon from "@mui/icons-material/Description";
import AppointmentIcon from "@mui/icons-material/CalendarToday";
import HearingScheduleIcon from "@mui/icons-material/Schedule";
import TemplateIcon from "@mui/icons-material/InsertDriveFile";
import KnowledgeHubIcon from "@mui/icons-material/MenuBook";
import NotificationIcon from "@mui/icons-material/Notifications";
import AnalyticsIcon from "@mui/icons-material/BarChart";
import ProfileIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo from "./lejit-logo-removebg-preview.png"; // Adjust path as needed

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[800],
        fontWeight: selected === title ? "bold" : "normal",
        backgroundColor: selected === title ? "#E5ECFF" : "transparent",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Link to={to}>{title}</Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: "#FFFFFF !important",
          borderRadius: "8px",
          overflowY: "hidden", // Hide vertical scrollbar
        },
        "& .pro-sidebar-inner::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for Webkit browsers
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "10px 24px !important",
          fontSize: "14px",
          color: colors.grey[600],
        },
        "& .pro-inner-item:hover": {
          color: "#0052CC !important",
          backgroundColor: "#F0F4FF !important",
          borderRadius: "8px",
        },
        "& .pro-menu-item.active": {
          color: "#0052CC !important",
          backgroundColor: "#E5ECFF !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[600],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img src={logo} alt="Logo" style={{ height: "40px" }} /> {/* Adjust height as needed */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/citizen/cdashboard"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="My Cases"
              to="/cases"
              icon={<CaseIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Documents"
              to="/documents"
              icon={<DocumentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointments"
              to="/appointments"
              icon={<AppointmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hearing Schedule"
              to="/hearing-schedule"
              icon={<HearingScheduleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Legal Templates"
              to="/legal-templates"
              icon={<TemplateIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Knowledge Hub"
              to="/knowledge-hub"
              icon={<KnowledgeHubIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Notification"
              to="/notification"
              icon={<NotificationIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Analytics / Reports"
              to="/analytics"
              icon={<AnalyticsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile"
              to="/profile"
              icon={<ProfileIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              to="/logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
