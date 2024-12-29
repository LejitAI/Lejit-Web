import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./CitationChatBubble";
import TypingIndicator from "./TypingIndicator";
import "../../styles/Chat.css";
import axios from "axios";

const CitationsInterface = () => {
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
  
      const apiUrl = "api/api/citation/query";
      const payload = {
        session_id: "unique_session_identifier_12345",
        question: inputValue,
      };
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      const aiMessage = {
        role: "assistant",
        content: data.response || "No response from AI",
        sourceDocuments: data.source_documents || [],
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
    fileInput.multiple = true; // Allow multiple file selection
  
    fileInput.onchange = async (event) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        setIsUploading(false);
        return;
      }
  
      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file); // Append each file to the FormData
      }
  
      const sessionId = "unique_session_identifier_12345";
      const apiUrl = `api/api/citation/feed-documents/?session_id=${sessionId}`;
  
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Upload successful:", response.data);
        setChatMode("document");
        console.log("Chat Mode: ", chatMode);
        setUploadMessage("Documents uploaded successfully!");
      } catch (error) {
        console.error("Error uploading documents:", error);
        setUploadMessage("Failed to upload the documents. Please try again.");
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
          {isUploading ? "Uploading..." : "Feed Document"}
        </button>
      </div>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
};

export default CitationsInterface;
