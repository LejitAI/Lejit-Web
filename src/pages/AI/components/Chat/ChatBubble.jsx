import React from "react";
import GavelIcon from "@mui/icons-material/Gavel"; // MUI Law Icon
import "../../styles/Chat.css";

const ChatBubble = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div className={`chat-bubble-container ${isUser ? "user" : "assistant"}`}>
      {!isUser && (
        <div className="assistant-icon">
          <GavelIcon style={{ color: "#0F67FD", fontSize: "20px" }} />
        </div>
      )}
      <div className={`chat-bubble ${isUser ? "user" : "assistant"}`}>
        {isUser ? (
          <span className="user-content">{content}</span>
        ) : (
          <div
            className="assistant-content"
            dangerouslySetInnerHTML={{
              __html: content
                .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Bold text
                .replace(/\*(.+?)\*/g, "<i>$1</i>") // Italics
                .replace(/\n/g, "<br>"), // Line breaks
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
