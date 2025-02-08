import React, { useEffect, useState } from "react";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { FaMagic } from "react-icons/fa"; // Magic Wand Icon
import "./CaseStrategy.css";

const CaseStrategies = ({ caseId }) => {
  const [caseArguments, setCaseArguments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            Authorization: `Bearer ${token}`,
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
        console.log(err);
      } finally {
        setLoading(false);
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
      {/* Header */}
      <div className="case-strategies-heading">
        <h3 className="case-strategies-heading-text">
          Case Strategies
        </h3>
        <button onClick={saveAsDocx} className="case-strategies-download-button">
          Download as DOCX
        </button>
      </div>

      {/* AI-generated badge */}
      <div className="ai-powered-container">
        <FaMagic className="ai-icon" />
        <span className="ai-generated-label">Powered by AI</span>
      </div>

      {/* Divider */}
      <div className="case-strategies-divider"></div>

      {/* Strategy Content */}
      <div className="case-strategies-content-scrollable">
        {loading ? (
          <p className="case-strategies-loading">⏳ Generating AI Case Strategies...</p>
        ) : error ? (
          <p className="case-strategies-error">{error}</p>
        ) : caseArguments.length > 0 ? (
          <div className="case-strategies-markdown">
            {caseArguments.map((argument, index) => (
              <div key={index} className="case-strategies-argument">
                <p>
                  <span className="ai-blinking-cursor"> </span>
                  {argument.split("\n").map((line, i) => (
                    <span key={i} className="ai-text">{line}<br /></span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="case-strategies-loading">No strategies available.</p>
        )}
      </div>
    </div>
  );
};

export default CaseStrategies;
