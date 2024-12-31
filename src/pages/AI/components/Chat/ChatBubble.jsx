import React from "react";
import "../../styles/Chat.css";


const ChatBubble = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";

  return (
    <div className={`chat-bubble ${isUser ? "user" : "assistant"}`}>
      {isUser ? (
        content
      ) : (
        <div className="assistant-content">
          {content
            .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Bold text
            .replace(/\*(.+?)\*/g, "<i>$1</i>") // Italics
            .replace(/\n/g, "<br>") // Line breaks
            .split("\n")
            .map((line, index) => (
              <p
                key={index}
                dangerouslySetInnerHTML={{ __html: line }}
                style={{ margin: 0 }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
