import React from "react";
import "../../styles/Chat.css";

const ChatBubble = ({ message }) => {
  const { role, content, sourceDocuments } = message;
  const isUser = role === "user";

  return (
    <div className={`chat-bubble-container ${isUser ? "user-container" : "assistant-container"}`}>
      {!isUser && (
        <div className="assistant-icon">
          <span role="img" aria-label="citation">📘</span> {/* Law or Citation Icon */}
        </div>
      )}
      <div className={`chat-bubble ${isUser ? "user" : "assistant"}`}>
        {isUser ? (
          content
        ) : (
          <div className="assistant-content">
            {content
              .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Bold text
              .replace(/\*(.+?)\*\*/g, "<i>$1</i>") // Italics
              .replace(/\n/g, "<br>") // Line breaks
              .split("\n")
              .map((line, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: line }}
                  style={{ margin: 0 }}
                />
              ))}
            {sourceDocuments && sourceDocuments.length > 0 && (
              <div className="citations">
                <br />
                <h2 className="citations-header"><b>Sources:</b></h2>
                <ul className="citations-list">
                  {sourceDocuments.map((doc, index) => (
                    <li key={index} className="citation-item">
                      <b>Page {doc.page}: </b>
                      <i>{doc.quote}</i>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
