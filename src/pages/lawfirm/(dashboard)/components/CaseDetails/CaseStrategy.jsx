import React, { useEffect, useState } from "react";
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
        const response = await fetch(`http://localhost:5000/api/chat/get-case-arguments?caseId=${caseId}`, {
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
      }
    };

    fetchCaseArguments();
  }, [caseId]);
  return (
    <div className="case-strategies-container">
      {/* Heading */}
      <div className="case-strategies-heading">
        <h3 className="case-strategies-heading-text">Case Strategy Points</h3>
      </div>

      {/* Divider */}
      <div className="case-strategies-divider"></div>

      {/* Strategy Content */}
      <div className="case-strategies-content-scrollable">
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
