import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Mic,
  UploadCloud,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import axios from "axios";

const ChatBubble = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
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
  <div className="flex items-center space-x-2 p-2">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <MessageSquare size={48} className="mb-4 opacity-50" />
    <h3 className="text-xl font-medium mb-2">No messages yet</h3>
    <p className="text-sm text-center">
      Start a conversation by typing a message below
    </p>
  </div>
);

const ChatInterface = ({ isDarkMode }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const chatRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");

    try {
      setIsLoading(true);
      const response = await axios.post("/api/api/query/general", {
        query: inputValue,
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.response || "No response from AI",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => e.key === "Enter" && handleSend();

  return (
    <div className="flex flex-col h-[88vh] bg-gray-100">
      <div className="flex-1 w-full mx-auto">
        <div className="h-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-6"
            style={{ height: messages.length === 0 ? "100%" : "auto" }}
          >
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatBubble key={index} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-white">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 
                         focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                         transition-colors"
                placeholder="Type your message..."
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={20} />
              </button>
              <button
                onClick={() => alert("Recording feature pending...")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200
                         text-gray-600 transition-colors"
              >
                <Mic size={20} />
              </button>
              <button
                onClick={() => alert("File upload pending...")}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200
                         text-gray-600 transition-colors"
              >
                <UploadCloud size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
