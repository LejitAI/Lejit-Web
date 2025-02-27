import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDownload, FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineScan } from "react-icons/ai";
import "./DocumentFolders.css";
import { useNavigate } from 'react-router-dom';


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
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (caseId) {
      fetchDocuments();
    }
  }, [caseId]);

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `http://backend.lejit.ai/backend/api/chat/documents?caseId=${caseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedDocuments = response.data.documents.map((doc) => ({
          ...doc,
          url: correctDocumentUrl(doc.url),
        }));
        setDocuments(updatedDocuments);
        setTags(response.data.tags);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setDocuments([]);
        setError("No documents have been uploaded for this case.");
      } else {
        console.error(err);
        setError("Failed to fetch documents. Please try again.");
      }
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!caseId) {
      setError("Case ID is required. Please select or create a case first.");
      return;
    }

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
    formData.append("caseId", caseId);
    formData.append("document", file);
    formData.append("tags", JSON.stringify(tags));

    try {
      const response = await axios.post(
        "http://backend.lejit.ai/backend/api/chat/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        await fetchDocuments();
        setFile(null);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setError("Failed to upload the document. Please try again.");
    }
  };


  const handleOCR = (caseId, documentId) => {

    
    const backendUrl = 'http://backend.lejit.ai/backend'; // Replace with actual backend URL
    const fileUrl = `${backendUrl}/uploads/${caseId}/${documentId}`;

    console.log('fileUrl', fileUrl);

    navigate(`/ocr`, { state: { fileUrl } });
  };

  const handleDelete = async (documentId, documentName) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://backend.lejit.ai/backend/api/upload?documentId=${documentId}&fileName=${documentName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchDocuments();
        alert("Document deleted successfully.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to delete document. Please try again.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="document-folders-container">
      <div className="header">
        <h2>Case Documents</h2>
      </div>

      <div className="divider" />

      <div className="case-info">
        <p>
          <strong>Case ID:</strong> {caseId || "N/A"}
        </p>
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
            <button
              className="ocr-button"
              onClick={() => handleOCR(caseId,doc.name)}
              title="Extract Text (OCR)"
            >
              <AiOutlineScan className="icon" />
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(caseId, doc.name)}
              title="Delete Document"
            >
              <FiTrash2 className="icon" />
            </button>
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
            UPLOAD
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DocumentFolders;
