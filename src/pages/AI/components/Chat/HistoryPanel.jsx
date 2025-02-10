import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const HistoryPanel = ({ onSelectHistory, activeTab }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "" });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [chatToRename, setChatToRename] = useState(null);
  const [newChatName, setNewChatName] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const storedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setHistoryItems(storedHistory.filter(chat => chat.chatType === activeTab));
    setIsLoading(false);
  }, [activeTab]);

  const saveToLocalStorage = (updatedHistory) => {
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  const createNewChat = () => {
    const sessionId = uuidv4();
    const newChat = {
      id: sessionId,
      sessionId,
      chatName: "New Chat",
      chatType: activeTab,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [...historyItems, newChat];
    setHistoryItems(updatedHistory);
    saveToLocalStorage(updatedHistory);
    onSelectHistory(sessionId);

    setNotification({ open: true, message: "New chat session created successfully!" });
  };

  const openRenameDialog = (id) => {
    const chat = historyItems.find(chat => chat.id === id);
    setChatToRename(id);
    setNewChatName(chat.chatName);
    setRenameDialogOpen(true);
  };

  const closeRenameDialog = () => {
    setRenameDialogOpen(false);
    setChatToRename(null);
    setNewChatName("");
  };

  const renameChat = () => {
    if (!chatToRename || !newChatName) return;

    const updatedHistory = historyItems.map(chat => 
      chat.id === chatToRename ? { ...chat, chatName: newChatName } : chat
    );
    setHistoryItems(updatedHistory);
    saveToLocalStorage(updatedHistory);
    closeRenameDialog();
  };

  const openDeleteDialog = (id) => {
    setChatToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setChatToDelete(null);
  };

  const confirmDelete = () => {
    if (!chatToDelete) return;

    const updatedHistory = historyItems.filter(chat => chat.id !== chatToDelete);
    setHistoryItems(updatedHistory);
    saveToLocalStorage(updatedHistory);
    closeDeleteDialog();
  };

  return (
    <div className="history-panel">
      <button className="new-chat-btn" onClick={createNewChat}>➕ New Chat</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : historyItems.length === 0 ? (
        <p className="empty-state">No chats found. Start a new chat!</p>
      ) : (
        <ul className="history-list">
          {historyItems.map((item) => (
            <li key={item.id} className="history-item">
              <span className="history-icon">{item.chatType === "general" ? "🗨️" : "📄"}</span>
              <div className="history-info" onClick={() => onSelectHistory(item.sessionId)}>
                <p className="history-title">{item.chatName}</p>
                <p className="history-date">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <button className="rename-btn" onClick={() => openRenameDialog(item.id)}>✏️</button>
              <button className="delete-btn" onClick={() => openDeleteDialog(item.id)}>🗑️</button>
            </li>
          ))}
        </ul>
      )}

      {/* Snackbar for notifications */}
      <Snackbar open={notification.open} autoHideDuration={3000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Chat</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this chat? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rename Dialog */}
      <Dialog
        open={renameDialogOpen}
        onClose={closeRenameDialog}
        aria-labelledby="rename-dialog-title"
      >
        <DialogTitle id="rename-dialog-title">Rename Chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Chat Name"
            type="text"
            fullWidth
            variant="standard"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRenameDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={renameChat} color="primary">
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HistoryPanel;