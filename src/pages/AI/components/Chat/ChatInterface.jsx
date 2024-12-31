import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import "../../styles/Chat.css";
import axios from "axios";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);
  const sessionKey = "lejit_ai_session_id";
  const [chatMode, setChatMode] = useState("general");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");


  useEffect(() => {
    const existingSession = localStorage.getItem(sessionKey);
    if (!existingSession) {
      const newSessionId = `session_${Date.now()}`;
      localStorage.setItem(sessionKey, newSessionId);
    }
  }, []);

  const getSessionId = () => localStorage.getItem(sessionKey);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
  
    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
  
    try {
      setIsLoading(true);
  
      let response; // Declare response here
      
      console.log(chatMode);
  
      if (chatMode === "general") {
        response = await fetch("/api/api/query/general", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: getSessionId(),
            query: inputValue,
          }),
        });
      }
  
      if (chatMode === "document") {
        response = await fetch("/api/api/query/document", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: getSessionId(),
            query: inputValue,
          }),
        });
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.response || "No response from AI",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadDoc = async () => {
    setIsUploading(true);
    setUploadMessage(""); // Clear any previous message

    const fileInput = document.createElement("input");
    fileInput.type = "file";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) {
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const sessionId = getSessionId();
      const documentType = "Contract";
      const apiUrl = `api/api/documents/upload?session_id=${sessionId}&document_type=${documentType}`;

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Upload successful:", response.data);
        setChatMode("document");
        console.log("Chat Mode: ", chatMode);
        setUploadMessage("Document uploaded successfully!");
      } catch (error) {
        console.error("Error uploading document:", error);
        setUploadMessage("Failed to upload the document. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };

    fileInput.click();
  };

  const handleDocumentSummary = async (file) => {
    if (!file) return;

    const userMessage = {
      role: "user",
      content: `Uploaded file for summarization: ${file.name}`,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("session_id", getSessionId());

      const response = await fetch("/api/api/query/document", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: `Summary: ${data.summary || "No summary available."}`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error summarizing document:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Failed to summarize the document. Please try again.",
        },
      ]);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.doc,.docx";
    fileInput.onchange = (e) => handleDocumentSummary(e.target.files[0]);
    fileInput.click();
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="chat-input"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="send-button">
          Send
        </button>
        <button onClick={handleUploadDoc} className="send-button">
          {isUploading ? "Uploading..." : "Upload Document"}
        </button>
        <button onClick={triggerFileInput} className="upload-button">
          Summarize Document
        </button>
      </div>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
};

export default ChatInterface;
