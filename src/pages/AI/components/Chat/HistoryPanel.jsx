import React, { useEffect, useState } from "react";
import { MessageCircle, FileText, ClipboardList } from "lucide-react"; // Lucide icons

const HistoryPanel = ({ onSelectHistory }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const sessionKey = "lejit_ai_session_id";

  const getSessionId = () => localStorage.getItem(sessionKey);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`/api/api/chat/history/${getSessionId()}`);
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
    <div className="w-full h-full bg-white shadow-md rounded-md flex flex-col text-black border border-gray-200">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-300">
        <h3 className="text-lg font-medium text-gray-800">History</h3>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {historyItems.length === 0 ? (
          <p className="text-center text-gray-600 py-4">
            No history available.
          </p>
        ) : (
          <ul className="space-y-2">
            {historyItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => onSelectHistory(item)}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-md">
                  {item.type === "chat" && (
                    <MessageCircle className="w-5 h-5 text-gray-700" />
                  )}
                  {item.type === "upload" && (
                    <FileText className="w-5 h-5 text-gray-700" />
                  )}
                  {item.type === "summary" && (
                    <ClipboardList className="w-5 h-5 text-gray-700" />
                  )}
                </div>

                {/* Info */}
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.title || "Chat Session"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
