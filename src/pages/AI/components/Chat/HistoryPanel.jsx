import React, { useEffect, useState } from "react";

const HistoryPanel = ({ onSelectHistory }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const sessionKey = "lejit_ai_session_id";

  const getSessionId = () => localStorage.getItem(sessionKey);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `/api/api/chat/history/${getSessionId()}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHistoryItems(data.history || []);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-panel">
      <h3 className="history-title">History</h3>
      <ul className="history-list">
        {historyItems.map((item) => (
          <li
            key={item.id}
            className="history-item"
            onClick={() => onSelectHistory(item)}
          >
            <span className={`history-icon`}>
              {item.type === "chat" && "🗨️"}
              {item.type === "upload" && "📄"}
              {item.type === "summary" && "📋"}
            </span>
            <div className="history-info">
              <p className="history-title">{item.title || "Chat Session"}</p>
              <p className="history-date">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
