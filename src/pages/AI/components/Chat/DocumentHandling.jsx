import React from "react";

const DocumentHandling = () => {
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("session_id", "unique_session_identifier_12345");

      const response = await fetch(
        "/api/api/documents/upload?document_type=Contract",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(`File uploaded successfully! Document ID: ${data.document_id}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.onchange = (e) => handleFileUpload(e.target.files[0]);
    fileInput.click();
  };

  const handleDocumentSummary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("session_id", "unique_session_identifier_12345");

      const response = await fetch("/api/api/query/document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert(`Document Summary: ${data.summary || "No summary available."}`);
    } catch (error) {
      console.error("Error summarizing document:", error);
      alert("Failed to summarize the document. Please try again.");
    }
  };

  const triggerSummaryInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.onchange = (e) => handleDocumentSummary(e.target.files[0]);
    fileInput.click();
  };

  return (
    <div className="document-handling">
      <h3>Document Handling</h3>
      <button onClick={triggerFileInput} className="document-upload-button">
        Upload Document
      </button>
      <button onClick={triggerSummaryInput} className="document-summary-button">
        Summarize Document
      </button>
    </div>
  );
};

export default DocumentHandling;
