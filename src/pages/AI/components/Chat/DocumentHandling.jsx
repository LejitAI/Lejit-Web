import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Upload,
  Loader2,
} from "lucide-react";
import axios from "axios";

const CitationsInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const chatRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const sessionKey = "lejit_ai_session_id";

  useEffect(() => {
    const existingSession = localStorage.getItem(sessionKey);
    if (!existingSession) {
      const newSessionId = `session_${Date.now()}`;
      localStorage.setItem(sessionKey, newSessionId);
    }
    fetchChatHistory();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const ChatBubble = ({ message }) => {
    const isUser = message.role === "user";
    return (
      <div
        className={`flex w-full ${
          isUser ? "justify-end" : "justify-start"
        } mb-4`}
      >
        <div
          className={`flex max-w-[80%] ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
            ${isUser ? "bg-blue-500 ml-2" : "bg-gray-500 mr-2"}`}
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div
            className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
          >
            <div
              className={`rounded-2xl px-4 py-2 ${
                isUser ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            {message.sourceDocuments && message.sourceDocuments.length > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                {message.sourceDocuments.map((doc, idx) => (
                  <div key={idx} className="italic">
                    Source: {doc.title || "Document " + (idx + 1)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4">
      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      <span className="text-sm text-gray-500">AI is typing...</span>
    </div>
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchChatHistory = async () => {
    try {
      const sessionId = "unique_session_identifier_12345";
      const response = await axios.get(`/api/api/chat/history/${sessionId}`);

      if (response.status === 200) {
        const fetchedMessages = response.data.chat_history
          .map((chat) => [
            {
              role: "assistant",
              content: chat.response,
              sourceDocuments: chat.source_documents || [],
            },
            {
              role: "user",
              content: chat.query,
            },
          ])
          .flat();

        setMessages(fetchedMessages.reverse());
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
      const response = await fetch("api/api/citation/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "unique_session_identifier_12345",
          question: inputValue,
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

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

      if (!response.ok) throw new Error("Error processing audio");

      const result = await response.json();
      const transcription =
        result.transcription || "No transcription available";

      setMessages((prev) => [
        ...prev,
        { role: "user", content: transcription },
      ]);

      const aiResponse = await fetch("api/api/citation/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "unique_session_identifier_12345",
          question: transcription,
        }),
      });

      if (!aiResponse.ok)
        throw new Error(`HTTP error! status: ${aiResponse.status}`);

      const data = await aiResponse.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response || "No response from AI",
          sourceDocuments: data.source_documents || [],
        },
      ]);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Failed to process audio. Please try again.");
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

      try {
        const response = await axios.post(
          `api/api/citation/feed-documents/?session_id=unique_session_identifier_12345`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setUploadMessage("Documents uploaded successfully!");
      } catch (error) {
        console.error("Error uploading documents:", error);
        setUploadMessage("Failed to upload documents. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };

    fileInput.click();
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden ">
        {/* Header */}
        {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
          <p className="text-sm text-gray-500">
            Ask questions about your documents
          </p>
        </div> */}

        {/* Messages */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>

        {/* Upload Message */}
        {uploadMessage && (
          <div
            className={`px-4 py-2 text-sm text-center ${
              uploadMessage.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {uploadMessage}
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 px-6 py-4 bg-white">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-2 rounded-full transition-colors ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              onClick={handleUploadDoc}
              disabled={isUploading}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationsInterface;
