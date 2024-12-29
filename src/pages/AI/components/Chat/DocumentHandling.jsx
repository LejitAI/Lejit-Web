import React, { useState } from "react";
import "./DocumentHandling.css";

const DocumentHandling = () => {
  const [citations, setCitations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCitationUpload = async (file) => {
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("session_id", "unique_session_identifier_12345");

      const response = await fetch("/api/api/citation/feed-documents/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCitations(data.citations || []);
    } catch (error) {
      console.error("Error fetching citations:", error);
      alert("Failed to process document for citations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerCitationInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.onchange = (e) => handleCitationUpload(e.target.files[0]);
    fileInput.click();
  };

  return (
    <div className="document-handling">
      <h3>Document Handling</h3>
      <div className="feature-buttons">
        <button onClick={triggerCitationInput} className="citation-button">
          Find Citations
        </button>
      </div>
      {isLoading ? (
        <p>Loading citations...</p>
      ) : (
        citations.length > 0 && (
          <div className="citations-list">
            <h4>Relevant Citations</h4>
            <ul>
              {citations.map((citation, index) => (
                <li key={index}>
                  <p>{citation.text}</p>
                  <a href={citation.link} target="_blank" rel="noopener noreferrer">
                    View Source
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default DocumentHandling;
