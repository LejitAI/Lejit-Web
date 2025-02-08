import React, { useState } from "react";
import { ColorModeContext, useMode } from "../../../../theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import Topbar from "../../../lawfirm/global/Topbar";
import Sidebar from "../../../lawfirm/global/Sidebar";
import {
  ArrowLeft,
  FolderOpen,
  FolderClosed,
  Share2,
  Eye,
  Download,
  Upload,
  Plus,
  Paperclip,
} from "lucide-react";

const CaseDocumentsContent = ({
  onBackClick,
  onAddDocument,
  onShare,
  onView,
  onDownload,
}) => {
  const [selectedFolder, setSelectedFolder] = useState("Invoice");

  const folders = [
    "Court",
    "Invoice",
    "Evidence",
    "Others",
    "Opposition",
    "Quotations",
  ];
  const documents = [
    {
      name: "March-12-03-2024.pdf",
      status: "paid",
      folder: "Invoice",
    },
    {
      name: "April-12-04-2024.pdf",
      status: "pending",
      folder: "Invoice",
    },
    {
      name: "May-12-04-2024.pdf",
      status: "unpaid",
      folder: "Invoice",
    },
  ];

  const statusClasses = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    unpaid: "bg-red-100 text-red-700",
  };

  const filteredDocuments = documents.filter(
    (doc) => doc.folder === selectedFolder
  );

  return (
    <div className="flex flex-col p-4 gap-3 bg-white shadow-md rounded-md" style={{ transform: "scale(0.9)" }}>
      {/* Header */}
      <div className="flex items-center mb-3">
        <button onClick={onBackClick} className="mr-1.5">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h2 className="text-base">Case Documents</h2>
      </div>

      <div className="p-2.5 rounded-md shadow-sm border">
        <h3 className="text-base font-medium">Case Documents</h3>
        <hr className="my-1.5 border-gray-300" />
        
        {/* Folder Navigation */}
        <div className="flex gap-3 mb-5 overflow-x-auto pb-1.5">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex flex-col items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-colors
                ${folder === selectedFolder ? "text-blue-600" : "hover:bg-gray-100"}`}
            >
              {folder === selectedFolder ? (
                <FolderOpen size={45} className="text-blue-700" fill="#4A8CFF" />
              ) : (
                <FolderClosed size={45} className="text-gray-300" />
              )}
              {folder}
            </button>
          ))}
        </div>

        <hr className="my-1.5 border-gray-300" />

        {/* Document List */}
        <div className="space-y-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 px-3.5 py-2.5 border-b border-gray-200"
              >
                {/* Document Name */}
                <div className="flex items-center gap-1.5">
                  <Paperclip size={16} />
                  <a href="#" className="">
                    {doc.name}
                  </a>
                  <span
                    className={`px-1.5 py-0.5 text-xs font-medium rounded capitalize ${
                      statusClasses[doc.status]
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onShare?.(doc)}
                    className="p-1.5 text-gray-500 hover:text-gray-700"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => onView?.(doc)}
                    className="p-1.5 text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onDownload?.(doc)}
                    className="p-1.5 text-gray-500 hover:text-gray-700"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No documents available</p>
          )}
        </div>

        {/* Add Button */}
        <div className="mt-5">
          <button
            onClick={onAddDocument}
            className="w-fit ml-auto flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-blue-500 border-2 border-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            <Upload size={18} />
            ADD CASE RELATED DOCUMENTS
          </button>
        </div>
      </div>
    </div>
  );
};

const CaseDocumentsPage = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box 
          sx={{
            display: "flex",
            height: "100vh",
            backgroundColor: "#F5F6FA", // Light gray background
            position: "relative",
            overflowY: "auto" // Enable scrolling
          }}
        >
          <Sidebar />
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={1}
            overflow="hidden"
          >
            <Topbar />
            <Box 
              component="main" 
              sx={{
                flexGrow: 1,
                p: 3,
                overflow: "auto",
                backgroundColor: "#F5F6FA", // Light gray background
              }}
            >
              <CaseDocumentsContent 
                onBackClick={() => {/* handle back click */}}
                onAddDocument={() => {/* handle add document */}}
                onShare={() => {/* handle share */}}
                onView={() => {/* handle view */}}
                onDownload={() => {/* handle download */}}
              />
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default CaseDocumentsPage;