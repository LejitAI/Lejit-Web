import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import "./CaseStrategy.css";

const CaseStrategies = ({ caseId }) => {
  const [caseArguments, setCaseArguments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch case arguments from the API
    const fetchCaseArguments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication token is missing.");
          return;
        }
        const response = await fetch(`http://backend.lejit.ai/backend/api/chat/get-case-arguments?caseId=${caseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setCaseArguments(data.arguments);
        } else {
          setError(data.message || "Failed to fetch case arguments");
        }
      } catch (err) {
        setError("Error fetching case arguments. Please try again later.");
        console.log(err)
      }
    };

    fetchCaseArguments();
  }, [caseId]);

  const saveAsDocx = () => {
    const doc = new Document({
      sections: [
        {
          children: caseArguments.map((argument) =>
            new Paragraph({
              children: [new TextRun(argument)],
            })
          ),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "case_strategies.docx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="case-strategies-container">
      {/* Heading */}
      <div className="case-strategies-heading">
        <h3 className="case-strategies-heading-text">Case Strategy Points</h3>
        <button onClick={saveAsDocx} className="case-strategies-download-button">Download as DOCX</button>
      </div>

      {/* Divider */}
      <div className="case-strategies-divider"></div>

      {/* Strategy Content */}
      <div className="case-strategies-content-scrollable" style={{ height: "500px" }}>
        {error ? (
          <p className="case-strategies-error">{error}</p>
        ) : caseArguments.length > 0 ? (
          <div className="case-strategies-markdown">
            {caseArguments.map((argument, index) => (
              <div key={index} className="case-strategies-argument">
                <p>{argument.split("\n").map((line, i) => <span key={i}>{line}<br /></span>)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="case-strategies-loading">Loading case arguments...</p>
        )}
      </div>
    </div>
  );
};

export default CaseStrategies;
