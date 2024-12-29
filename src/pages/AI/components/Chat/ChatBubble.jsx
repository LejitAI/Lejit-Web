import React from "react";
import "../../styles/Chat.css";

const ChatBubble = ({ message }) => {
    const { role, content } = message;
    const isUser = role === "user";
  
    return (
      <div className={`chat-bubble ${isUser ? "user" : "assistant"}`}>
        {content}
      </div>
    );
  };
  
  export default ChatBubble;