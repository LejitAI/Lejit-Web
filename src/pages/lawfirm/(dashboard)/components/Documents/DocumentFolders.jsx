import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import "./DocumentFolders.css";

const FolderIcon = () => (
  <div className="folder-icon">
    <div className="folder-top" />
    <div className="folder-stripe" />
    <div className="folder-body" />
  </div>
);

const correctDocumentUrl = (url) => {
  const requiredPath = "/backend/uploads/";
  if (!url.includes(requiredPath)) {
    const parts = url.split("/uploads/");
    if (parts.length > 1) {
      return `${parts[0]}${requiredPath}${parts[1]}`;
    }
  }
  return url;
};

const DocumentFolders = ({ caseId }) => {
  const [documents, setDocuments] = useState([]);
  // const [caseId, setCaseId] = useState("");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (caseId) {
      fetchDocuments();
    }
  }, [caseId]); // Fetch documents when caseId changes

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.get("/backend/api/chat/documents?caseId=${caseId}", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedDocuments = response.data.documents.map((doc) => ({
          ...doc,
          url: correctDocumentUrl(doc.url),
        }));
        setDocuments(updatedDocuments);
        // setCaseId(response.data.caseId);
        setTags(response.data.tags);
      }
    } catch (err) {
      setError("Failed to fetch documents. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);
    formData.append("caseId", caseId); // Include caseId in the upload request
    formData.append("tags", JSON.stringify(tags)); // Include tags in the upload request

    try {
      const response = await axios.post("/backend/api/chat/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        fetchDocuments(); // Refresh the document list
        setFile(null); // Reset the file input
        setError(null); // Clear any error
      }
    } catch (err) {
      setError("Failed to upload the document. Please try again.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const folders = [
    { name: "Court" },
    { name: "Invoice" },
    { name: "Evidence" },
    { name: "Others" },
    { name: "Opposition" },
    { name: "Quotations" },
  ];

  return (
    <div className="document-folders-container">
      <div className="header">
        <h2>Case documents</h2>
        <button className="toggle-button" />
      </div>

      <div className="divider" />

      <div className="folders">
        {folders.map((folder, index) => (
          <div key={index} className="folder-item">
            <div className="folder-icon-container">
              <FolderIcon />
            </div>
            <span>{folder.name}</span>
          </div>
        ))}
      </div>

      <div className="divider" />

      <div className="case-info">
        <p><strong>Case ID:</strong> {caseId || "N/A"}</p>
        {/* <p><strong>Tags:</strong> {tags.length > 0 ? tags.join(", ") : "None"}</p> */}
      </div>

      {documents.map((doc, index) => (
        <div key={index} className="document-row">
          <div className="document-info">
            <span>{doc.name}</span>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="document-link"
            >
              View Document
            </a>
          </div>
          <div className="document-actions">
            <a href={doc.url} download>
              <FiDownload className="icon" />
            </a>
          </div>
        </div>
      ))}

      <div className="add-document-button-container">
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          style={{ display: "none" }}
        />
        <button
          className="add-document-button"
          onClick={() => document.getElementById("file-input").click()}
        >
          <div className="add-icon">
            <AiOutlinePlus className="plus-icon" />
          </div>
          ADD CASE DOCUMENTS
        </button>
      </div>

      {file && (
        <div className="upload-button-container">
          <p>Selected File: {file.name}</p>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DocumentFolders;
