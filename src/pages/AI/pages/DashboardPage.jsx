import React, { useState } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import LegalDocumentTemplates from "../components/Chat/docgen/legaldoctemplates";
import HistoryPanel from "../components/Chat/HistoryPanel"; 
import Topbar from "../../lawfirm/global/Topbar";
import "../styles/Dashboard.css";
import { ReactComponent as GeneralIcon } from "./general.svg";
import { ReactComponent as CitationIcon } from "./citation.svg";
import { ReactComponent as GenerationIcon } from "./generation.svg";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedHistory, setSelectedHistory] = useState(null);

  const handleSelectHistory = (historyItem) => {
    setActiveTab("general");
    setSelectedHistory(historyItem);
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
        <aside className="dashboard-sidebar">
          <HistoryPanel onSelectHistory={handleSelectHistory} />
        </aside>
        <main className="dashboard-main">
          <nav className="dashboard-tabs">
            <button
              className={`dashboard-tab ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              <GeneralIcon className="tab-icon" />
              <span>General Queries</span>
            </button>
            <button
              className={`dashboard-tab ${activeTab === "document" ? "active" : ""}`}
              onClick={() => setActiveTab("document")}
            >
              <CitationIcon className="tab-icon" />
              <span>Document Citations</span>
            </button>
            <button
              className={`dashboard-tab ${activeTab === "generation" ? "active" : ""}`}
              onClick={() => setActiveTab("generation")}
            >
              <GenerationIcon className="tab-icon" />
              <span>Document Generation</span>
            </button>
          </nav>
          <section className="dashboard-content">{renderContent()}</section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
