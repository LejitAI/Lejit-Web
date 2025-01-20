import React, { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";
import "../../styles/Chat.css";
import axios from "axios";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const chatRef = useRef(null);
  const sessionKey = "lejit_ai_session_id";

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

      const response = await fetch("/api/api/query/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: getSessionId(),
          query: inputValue,
        }),
      });

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
        { role: "assistant", content: "Oops! Something went wrong. Please try again." },
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

      const response = await fetch("http://backend.lejit.ai/backend/api/speech-to-text", {
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
      try {
        setIsLoading(true);
  
        const response = await fetch("/api/api/query/general", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: getSessionId(),
            query: inputValue,
          }),
        });
  
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
          { role: "assistant", content: "Oops! Something went wrong. Please try again." },
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
          <button onClick={handleSend} className="send-button">
            ➤
          </button>
          <button onClick={handleUploadDoc} className="upload-button">
            📄
          </button>
        </div>
      </div>
      {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
    </div>
  );
};

export default ChatInterface;
