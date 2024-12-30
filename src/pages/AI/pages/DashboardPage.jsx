import React, { useState } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import DocumentGeneration from "../components/Chat/DocumentGeneration";
import "../styles/Dashboard.css";
import HistoryPanel from "../components/Chat/HistoryPanel"; 
import Topbar from "../../lawfirm/global/Topbar";
import LegalDocumentTemplates from "../components/Chat/docgen/legaldoctemplates";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleSelectHistory = (historyItem) => {
    setActiveTab("general"); // Switch to the chat interface
    setSelectedHistory(historyItem); // Load the selected history item
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <ChatInterface selectedHistory={selectedHistory} />;
      case "document":
        return <DocumentHandling />;
      case "generation":
        return <LegalDocumentTemplates />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <>
      <Topbar />
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <HistoryPanel onSelectHistory={handleSelectHistory} />
        </div>
        <div className="dashboard-main">
          <div className="dashboard-tabs">
            <button
              className={`dashboard-tab ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              🗨️ General Queries
            </button>
            <button
              className={`dashboard-tab ${activeTab === "document" ? "active" : ""}`}
              onClick={() => setActiveTab("document")}
            >
              📄 Document Citations
            </button>
            <button
              className={`dashboard-tab ${activeTab === "generation" ? "active" : ""}`}
              onClick={() => setActiveTab("generation")}
            >
              📝 Document Generation
            </button>
          </div>
          <div className="dashboard-content">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
