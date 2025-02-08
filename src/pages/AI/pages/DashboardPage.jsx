import React, { useState, useEffect } from "react";
import ChatInterface from "../components/Chat/ChatInterface";
import DocumentHandling from "../components/Chat/DocumentHandling";
import HistoryPanel from "../components/Chat/HistoryPanel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profilePic from "../Avatar.png";
import LejitLogo from "../lejit-logo-removebg-preview copy.png";
import {
  DarkMode,
  LightMode,
  Menu,
  History,
  Article,
} from "@mui/icons-material";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("backend/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevMode));
      return !prevMode;
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full px-6 py-3 flex justify-between items-center shadow-md ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <img
          src={LejitLogo}
          alt="Lejit Logo"
          className="w-24 cursor-pointer"
          onClick={() => navigate("/ldashboard")}
        />

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsHistoryVisible(!isHistoryVisible)}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            <History className="h-6 w-6" />
          </button>
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 flex items-center rounded-lg transition-all ${
              activeTab === "general"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Menu className="mr-2" /> General
          </button>
          <button
            onClick={() => setActiveTab("document")}
            className={`px-4 py-2 flex items-center rounded-lg transition-all ${
              activeTab === "document"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Article className="mr-2" /> Documents
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <LightMode className="h-6 w-6" />
            ) : (
              <DarkMode className="h-6 w-6" />
            )}
          </button>
          <div className="flex items-center space-x-2">
            <img
              src={user?.profilePicture || profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">
                Hi, {user ? user.username : "Guest"}!
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {user ? user.role : "Role"}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex pt-16">
        {isHistoryVisible && (
          <aside
            className={`w-64  p-4 transition-all ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <HistoryPanel onSelectHistory={setSelectedHistory} />
          </aside>
        )}

        <section
          className={`flex-1 p-6 transition-all  ml-0 ${
            isHistoryVisible ? "ml-64" : ""
          }`}
        >
          {activeTab === "general" ? (
            <ChatInterface
              selectedHistory={selectedHistory}
              isDarkMode={isDarkMode}
            />
          ) : (
            <DocumentHandling />
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
