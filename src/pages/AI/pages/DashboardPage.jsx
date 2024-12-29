import React, { useState } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import DocumentGeneration from "../components/Chat/DocumentGeneration";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="dashboard-container">
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General Queries
        </button>
        <button
          className={`dashboard-tab ${activeTab === "document" ? "active" : ""}`}
          onClick={() => setActiveTab("document")}
        >
          Document Handling
        </button>
        <button
          className={`dashboard-tab ${activeTab === "generation" ? "active" : ""}`}
          onClick={() => setActiveTab("generation")}
        >
          Document Generation
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === "general" && <ChatInterface />}
        {activeTab === "document" && <DocumentHandling />}
        {activeTab === "generation" && <DocumentGeneration />}
      </div>
    </div>
  );
};

export default Dashboard;
