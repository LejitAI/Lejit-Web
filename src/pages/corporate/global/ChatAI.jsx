import React, { useState, useRef, useEffect } from "react";
import BlueButton from "./BlueButton";
import "./ChatAI.css";

const ChatAI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  const toggleChatAI = () => {
    setIsVisible(!isVisible);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleSubmit = async () => {
    if (!inputValue.trim()) return; // Prevent submitting empty input

    const userMessage = { role: "user", content: inputValue };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue(""); // Clear input field

    try {
      setIsLoading(true); // Set loading state
      const response = await fetch("/api/api/query/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "unique_session_identifier_12345",
          query: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage = { role: "assistant", content: data.response || "No response from AI" };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSubmitFile = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx"; // Restrict accepted file types (optional)
  
    fileInput.onchange = async (event) => {
      const file = event.target.files[0]; // Get the selected file
      if (!file) return; // No file selected
  
      try {
        const formData = new FormData();
        formData.append("file", file); // Append file to form data
  
        const response = await fetch(
          "/api/api/documents/upload?session_id=unique_session_identifier_12345&document_type=Contract",
          {
            method: "POST",
            body: formData,
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("File uploaded successfully:", data);
  
        // Add success message to UI
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "File uploaded successfully!" },
        ]);
      } catch (error) {
        console.error("Error uploading file:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Oops! File upload failed. Please try again." },
        ]);
      }
    };
  
    fileInput.click(); // Programmatically open file selector
  };
  



  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <>
      <BlueButton onClick={toggleChatAI} />

      {isVisible && (
        <div className={`chatAI-container ${isVisible ? "show" : ""}`}>
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

          <div className="chatAI-messages" ref={chatRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatAI-message-container ${msg.role === "user" ? "chatAI-user-container" : "chatAI-ai-container"
                  }`}
              >
                {msg.role === "user" && (
                  <div className="chatAI-avatar chatAI-user-avatar">👤</div>
                )}
                {msg.role === "assistant" && (
                  <div className="chatAI-avatar chatAI-ai-avatar">🤖</div>
                )}
                <div
                  className={`chatAI-message ${msg.role === "user" ? "chatAI-user-message" : "chatAI-ai-message"
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

          <div className="chatAI-prompt">
            <div className="chatAI-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="chatAI-input"
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />

              <div onClick={handleSubmitFile} className="chatAI-input-actions">
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


