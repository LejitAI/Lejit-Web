import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./CitationChatBubble";
import TypingIndicator from "./TypingIndicator";
import "../../styles/Chat.css";
import axios from "axios";

const CitationsInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);;
  const chatRef = useRef(null);
  const sessionKey = "lejit_ai_session_id";
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const existingSession = localStorage.getItem(sessionKey);
    if (!existingSession) {
      const newSessionId = `session_${Date.now()}`;
      localStorage.setItem(sessionKey, newSessionId);
    }
    fetchChatHistory();
  }, []);

  const getSessionId = () => localStorage.getItem(sessionKey);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const fetchChatHistory = async () => {
    try {
      const sessionId = "unique_session_identifier_12345";
      const response = await axios.get(
        `/api/api/chat/history/${sessionId}`
      );
  
      if (response.status === 200) {
        // Assuming the backend returns messages in descending order (latest first)
        const fetchedMessages = response.data.chat_history.map((chat) => [
          {
            role: "assistant",
            content: chat.response,
            sourceDocuments: chat.source_documents || [], // Ensure source documents are included
          },
          {
            role: "user",
            content: chat.query,
          },
        ]).flat(); // Flatten user-assistant pairs into a single array
  
        // If the backend already limits to 50, just reverse them to maintain the order
        setMessages(fetchedMessages.reverse());
      } else {
        console.error("Failed to fetch chat history:", response);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
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
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Failed to access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "audio.webm");

      const response = await fetch("/backend/api/speech-to-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error processing audio");
      }

      const result = await response.json();
      const transcription = result.transcription || "No transcription available";
      const audioMessage = { role: "user", content: transcription };

      setMessages((prev) => [...prev, audioMessage]);
    
    setInputValue("");
    try {
      setIsLoading(true);

      const apiUrl = "api/api/citation/query";
      const payload = {
        session_id: "unique_session_identifier_12345",
        question: transcription,
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
  
    } catch (error) {
      console.error("Error transcribing audio:", error);
      alert("Failed to transcribe audio. Please try again.");
    }
  };
  const handleUploadDoc = async () => {
    setIsUploading(true);
    setUploadMessage("");

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;

    fileInput.onchange = async (event) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        setIsUploading(false);
        return;
      }

      const formData = new FormData();
      for (const file of files) {
        formData.append("files", file);
      }

      const sessionId = "unique_session_identifier_12345";
      const apiUrl = `api/api/citation/feed-documents/?session_id=${sessionId}`;

      try {
        const response = await axios.post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Upload successful:", response.data);
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

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={chatRef}>
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
        <div className="chat-buttons">
        <button
            onClick={isRecording ? stopRecording : startRecording}
            className="record-button"
          >
            {isRecording ? <button className="send-button">
            ⏹️
          </button> : <button className="send-button">
          🎙️
          </button>}
          </button>
          <button onClick={handleSend} className="send-button" title="Send">
            <span role="img" aria-label="send">➤</span>
          </button>
          <button onClick={handleUploadDoc} className="upload-button" title="Feed Document">
            <span role="img" aria-label="upload">📄</span>
          </button>
        </div>
      </div>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
};

export default CitationsInterface;
