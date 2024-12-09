import React, { useState, useRef, useEffect } from "react";
import BlueButton from "./BlueButton";
import "./ChatAI.css";

const ChatAI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]); // Conversation history
  const [isLoading, setIsLoading] = useState(false); // AI typing indicator
  const chatRef = useRef(null); // For auto-scrolling to the latest message

  // Toggle Chat Visibility
  const toggleChatAI = () => {
    setIsVisible(!isVisible);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Send User Message to Backend and Get AI Response
  const handleSubmit = async () => {
    if (!inputValue.trim()) return; // Prevent sending empty messages

    const userMessage = { role: "user", content: inputValue };

    // Add user message to the chat
    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // Clear input field

    try {
      setIsLoading(true); // Show typing indicator
      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();

      // Add AI response to the chat
      const aiMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // Hide typing indicator
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Trigger Button */}
      <BlueButton onClick={toggleChatAI} />

      {/* Chat Container */}
      {isVisible && (
        <div className={`chatAI-container ${isVisible ? "show" : ""}`}>
          {/* Header */}
          <div className="chatAI-header">
            <button className="chatAI-back">←</button>
            <h2 className="chatAI-title">Ask AI</h2>
            <button
              className="chatAI-close"
              onClick={toggleChatAI}
              aria-label="Close Chat"
            >
              ×
            </button>
          </div>

          {/* Action Buttons (Show only if no messages exist) */}
          {messages.length === 0 && (
            <div className="chatAI-action-buttons">
              <button className="chatAI-action active">
                <span className="chatAI-action-icon">📄</span> Draft Templates
              </button>
              <button className="chatAI-action">
                <span className="chatAI-action-icon">⚖️</span> Find Similar Cases
              </button>
              <button className="chatAI-action">
                <span className="chatAI-action-icon">📋</span> Find Citations
              </button>
              <button className="chatAI-action">
                <span className="chatAI-action-icon">📜</span> Find Case Laws
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="chatAI-messages" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatAI-message-container ${
                  msg.role === "user" ? "chatAI-user-container" : "chatAI-ai-container"
                }`}
              >
                {msg.role === "user" && (
                  <div className="chatAI-avatar chatAI-user-avatar">👤</div>
                )}
                {msg.role === "assistant" && (
                  <div className="chatAI-avatar chatAI-ai-avatar">🤖</div>
                )}
                <div
                  className={`chatAI-message ${
                    msg.role === "user" ? "chatAI-user-message" : "chatAI-ai-message"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatAI-ai-container">
                <div className="chatAI-avatar chatAI-ai-avatar">🤖</div>
                <div className="chatAI-ai-message chatAI-loading">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="chatAI-prompt">
            <div className="chatAI-input-container">
              {/* Text Input */}
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="chatAI-input"
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />

              {/* Input Action Buttons */}
              <div className="chatAI-input-actions">
                <button className="chatAI-input-button" aria-label="Attach File">
                  📎
                </button>
                <button className="chatAI-input-button" aria-label="Open Camera">
                  📷
                </button>
                <button className="chatAI-input-microphone" aria-label="Record Voice">
                  🎤
                </button>
              </div>

              {/* Send Button */}
              <button onClick={handleSubmit} className="chatAI-send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAI;
