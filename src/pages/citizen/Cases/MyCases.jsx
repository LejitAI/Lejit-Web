import { ColorModeContext, useMode } from "../../../theme";
import { CssBaseline, ThemeProvider, Box, Typography, Button, IconButton, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataCases } from "../../../data/mockData";
import Header from "../global/Header";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);

    const pageTitle = "My Cases";

    const columns = [
        { field: "CaseName", headerName: "Case Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "ClientName", headerName: "Client Name", flex: 1 },
        { field: "CaseType", headerName: "Case Type", flex: 1 },
        {
            field: "Status",
            headerName: "Status",
            flex: 1,
            renderCell: ({ row: { Status } }) => {
                // Define fallback colors directly
                let statusColor;
                switch (Status) {
                    case "Ongoing":
                        statusColor = colors.blueAccent?.[400] || "#2196f3";
                        break;
                    case "Pending":
                        statusColor = colors.orangeAccent?.[400] || "#ff9800";
                        break;
                    case "Completed":
                        statusColor = colors.greenAccent?.[400] || "#4caf50";
                        break;
                    case "Closed":
                        statusColor = colors.redAccent?.[400] || "#f44336";
                        break;
                    default:
                        statusColor = colors.grey?.[400] || "#b0bec5";
                        break;
                }
                return (
                    <Chip label={Status} style={{ backgroundColor: statusColor, color: "#ffffff" }} />
                );
            },
        },
        {
            field: "Actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: () => (
                <Box display="flex" gap={1}>
                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                    <IconButton color="secondary"><DeleteIcon /></IconButton>
                </Box>
            )
        },
    ];
    
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box display="flex" height="100vh">
                    <Sidebar />
                    <Box display="flex" flexDirection="column" flexGrow={1} overflow="hidden">
                        <Topbar />
                        <Box component="main" flexGrow={1} p={3}>
                            <Header title={pageTitle} />
                            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                <Box display="flex" gap={2}>
                                    <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
                                        Search List
                                    </Button>
                                    <Button variant="outlined" color="primary" startIcon={<FilterListIcon />}>
                                        Filter
                                    </Button>
                                    <Button variant="outlined" color="primary" startIcon={<DownloadIcon />}>
                                        Download List
                                    </Button>
                                </Box>
                                <Button variant="contained" color="secondary" startIcon={<AddCircleOutlineIcon />}>
                                    Add New Case
                                </Button>
                            </Box>
                            <Box
                                mt={4}
                                height="75vh"
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#f5f5f5", // Matches Figma cell background
                                        padding: "10px",
                                        borderRadius: "8px",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: "#e0e0e0", // Matches Figma header color
                                        borderBottom: "none",
                                        borderRadius: "8px",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: "#ffffff",
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: "#e0e0e0",
                                    },
                                }}
                            >
                                <DataGrid
                                    rows={mockDataCases}
                                    columns={columns}
                                    pageSize={6}
                                    checkboxSelection
                                    sx={{
                                        "& .MuiDataGrid-cellContent": {
                                            display: "flex",
                                            alignItems: "center",
                                            fontWeight: "bold",
                                        },
                                        "& .name-column--cell": {
                                            color: colors.blueAccent[700] || "#1e88e5",
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
