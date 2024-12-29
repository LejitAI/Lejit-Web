import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      uploadFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("session_id", "unique_session_identifier_12345");

    try {
        const response = await fetch(
            "/api/api/documents/upload?session_id=unique_session_identifier_12345&document_type=Contract",
            {
              method: "POST",
              body: formData,
            }
          );
      onFileUpload(file, response.data);
    } catch (error) {
      console.error("File upload failed:", error);
      onFileUpload(file, { error: "Failed to upload file." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`file-upload ${dragging ? "dragging" : ""}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragEnter}
      onDrop={handleDrop}
    >
      {uploading ? (
        <p className="upload-instructions">Uploading...</p>
      ) : (
        <p className="upload-instructions">Drag & drop files here, or click to upload</p>
      )}
      <input
        type="file"
        className="file-input"
        onChange={handleFileChange}
        disabled={uploading}
      />
    </div>
  );
};

export default FileUpload;
