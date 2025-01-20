import React, { useState } from "react";
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

const CaseDocuments = ({
  onBackClick,
  onAddDocument,
  onShare,
  onView,
  onDownload,
  className = "",
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
    <div
      className={`p-4 rounded-md bg-white max-h-full h-full m-2 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <button onClick={onBackClick} className="mr-2">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h2 className="text-lg">Case Documents</h2>
      </div>
      <div className="p-3 rounded-md shadow-sm border">
        <h className="text-lg font-medium">Case Documents</h>
        <hr className="my-2 border-gray-300" />
        {/* Folder Navigation */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2 ">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`flex flex-col items-center gap-2 px-4 py-2 rounded-lg  transition-colors
              ${
                folder === selectedFolder
                  ? " text-blue-600"
                  : " hover:bg-gray-100"
              }`}
            >
              {folder === selectedFolder ? (
                <FolderOpen
                  size={50}
                  className="text-blue-700"
                  fill="#4A8CFF"
                />
              ) : (
                <FolderClosed size={50} className="text-gray-300" />
              )}
              {folder}
            </button>
          ))}
        </div>
        <hr className="my-2 border-gray-300" />
        {/* Document List */}
        <div className="space-y-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200"
              >
                {/* Document Name */}
                <div className="flex items-center gap-2">
                  <Paperclip size={18} />
                  <a href="#" className="">
                    {doc.name}
                  </a>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded capitalize ${
                      statusClasses[doc.status]
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onShare?.(doc)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={() => onView?.(doc)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onDownload?.(doc)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No documents available</p>
          )}
        </div>

        {/* Add Button */}
        <div className="mt-6">
          <button
            onClick={onAddDocument}
            className="w-fit ml-auto flex items-center justify-center gap-2 px-4 py-3 text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Upload size={20} />
            ADD CASE RELATED DOCUMENTS
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDocuments;
