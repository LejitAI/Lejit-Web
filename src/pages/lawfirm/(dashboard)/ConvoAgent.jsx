import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Tooltip,
  CircularProgress,
  Avatar,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ConvoAgent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState(["New Conversation"]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(uuidv4()); // Unique session I
  const [documentUploaded, setDocumentUploaded] = useState(false);
  const chatContainerRef = useRef(null);

  const API_BASE_URL = "http://localhost:6000/api";

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history/${sessionId}`);
      const chatHistory = response.data.history;
      setMessages(chatHistory.map((msg) => ({ type: msg.role, text: msg.content })));
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    }
  };

  const handleAttachFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("document_type", "Other");
        formData.append("session_id", sessionId);

        const response = await axios.post(`${API_BASE_URL}/documents/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setMessages((prev) => [
          ...prev,
          { type: "bot", text: response.data.message },
        ]);
        setDocumentUploaded(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to upload document:", error);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "Failed to upload document. Please try again." },
        ]);
        setIsLoading(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    try {
      const endpoint = documentUploaded
        ? `${API_BASE_URL}/query/document`
        : `${API_BASE_URL}/query/general`;
      const response = await axios.post(endpoint, {
        query: input,
        session_id: sessionId,
      });

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: response.data.response },
      ]);
      setIsLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error processing your request. Please try again." },
      ]);
      setIsLoading(false);
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setHistory((prev) => [...prev, `Conversation ${prev.length + 1}`]);
    setSessionId(uuidv4());
    setDocumentUploaded(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#eef2f6">
      <Box
        sx={{
          width: sidebarOpen ? "300px" : "0px",
          overflowX: "hidden",
          transition: "width 0.3s ease",
          background: "#212529",
          color: "#fff",
          height: "100%",
          boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
          borderBottom="1px solid #444"
        >
          <Typography variant="h6" style={{ margin: 0, fontWeight: "bold" }}>
            Conversations
          </Typography>
          <IconButton onClick={toggleSidebar} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {history.map((item, index) => (
            <ListItem
              key={index}
              button
              sx={{
                "&:hover": { backgroundColor: "#333" },
                borderBottom: "1px solid #444",
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleNewConversation}
          variant="contained"
          sx={{
            margin: "10px",
            background: "#0f67fd",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": { background: "#0056d2" },
          }}
          startIcon={<AddCircleIcon />}
        >
          New Conversation
        </Button>
      </Box>

      <Box flexGrow={1} display="flex" flexDirection="column" bgcolor="#fff">
        
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2}
          bgcolor="#0f67fd"
          color="#fff"
        >
          <IconButton onClick={toggleSidebar} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            Lejit AI ConvoAgent
          </Typography>
          <Tooltip title="This is your interactive Lejit AI chatbot powered by AI.">
            <InfoIcon />
          </Tooltip>
        </Box>

        <Box
          flexGrow={1}
          overflow="auto"
          p={2}
          bgcolor="#eef2f6"
          display="flex"
          flexDirection="column"
          ref={chatContainerRef}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.type === "user" ? "flex-end" : "flex-start"
              }
              mb={2}
            >
              {message.type === "bot" && (
                <Avatar
                  sx={{
                    bgcolor: "#0f67fd",
                    color: "#fff",
                    marginRight: "8px",
                  }}
                >
                  AI
                </Avatar>
              )}
              <Box
                p={2}
                bgcolor={message.type === "user" ? "#0f67fd" : "#fff"}
                color={message.type === "user" ? "#fff" : "#000"}
                borderRadius="15px"
                maxWidth="60%"
                boxShadow="0px 4px 6px rgba(0,0,0,0.1)"
              >
                {message.text}
              </Box>
            </Box>
          ))}
          {isLoading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress size={24} />
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderTop="1px solid #ddd"
          bgcolor="#fff"
        >
          <IconButton component="label">
            <AttachFileIcon />
            <input
              type="file"
              hidden
              onChange={handleAttachFile}
            />
          </IconButton>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            sx={{ mx: 2 }}
          />
          <IconButton
            onClick={handleSendMessage}
            color="primary"
            disabled={!input.trim() || isLoading}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ConvoAgent;
