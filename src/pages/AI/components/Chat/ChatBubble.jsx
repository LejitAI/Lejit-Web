import React, { useState, useRef } from "react";
import GavelIcon from "@mui/icons-material/Gavel"; // MUI Law Icon
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; // MUI Volume Up Icon
import StopIcon from "@mui/icons-material/Stop"; // MUI Stop Icon
import ReplayIcon from "@mui/icons-material/Replay"; // MUI Replay Icon
import CircularProgress from "@mui/material/CircularProgress"; // MUI Circular Progress
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // MUI Play Arrow Icon
import axios from "axios";

const ChatBubble = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";

  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const audioRef = useRef(null); // Reference for the audio object

  const handlePlayAudio = async (text) => {
    if (!audioRef.current || isPaused === false) {
      setIsLoading(true); // Start loading animation
      try {
        const response = await axios.post(
          "http://localhost:5000/api/tts",
          { text },
          { responseType: "blob" }
        );
        const audioUrl = URL.createObjectURL(new Blob([response.data]));
        const audio = new Audio(audioUrl);

        audioRef.current = audio; // Store the audio object
        audioRef.current.addEventListener("ended", () => setIsPlaying(false)); // Handle end of playback
      } catch (error) {
        console.error("Error fetching audio:", error);
      } finally {
        setIsLoading(false); // Stop loading animation
      }
    }

    if (audioRef.current) {
      audioRef.current.play(); // Resume or start playback
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleResetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPaused(false);
      audioRef.current.play(); // Restart playback
      setIsPlaying(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      {!isUser && (
        <div style={{ marginBottom: "6px" }}>
          <GavelIcon style={{ color: "#0F67FD", fontSize: "20px" }} />
        </div>
      )}
      <div
        style={{
          backgroundColor: isUser ? "#E3F2FD" : "#F9FAFB", // Professional light backgrounds
          borderRadius: "14px", // Rounded corners for modern look
          padding: "12px 16px", // Consistent padding
          maxWidth: "75%", // Slightly wider for readability
          boxShadow: "0 3px 8px rgba(0, 0, 0, 0.08)", // Subtle shadow for depth
          fontSize: "15px", // Standard font size
          lineHeight: "22px", // Comfortable line height
          color: isUser ? "#1A237E" : "#4A4A4A", // Professional text colors
          wordBreak: "break-word", // Ensure long text breaks properly
        }}
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/### (.+?)(?=\n|$)/g, "<h2>$1</h2>")
            .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>") // Bold text
            .replace(/\*(.+?)\*/g, "<i>$1</i>") // Italics
            .replace(/\n/g, "<br>"), // Line breaks
        }}
      />
      {!isUser && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
            justifyContent: "flex-end",
          }}
        >
          {/* Read Aloud Icon */}
          {!isPlaying && !isLoading && !isPaused && (
            <VolumeUpIcon
              style={{
                color: "#0F67FD",
                fontSize: "24px",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onClick={() => handlePlayAudio(content)}
            />
          )}

          {/* Loading Animation */}
          {isLoading && (
            <CircularProgress
              size={24}
              style={{
                color: "#FFD700",
              }}
            />
          )}

          {/* Stop and Reset Icons */}
          {(isPlaying || isPaused) && !isLoading && (
            <>
              <StopIcon
                style={{
                  color: "#FF4500",
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onClick={handleStopAudio}
              />
              <ReplayIcon
                style={{
                  color: "#32CD32",
                  fontSize: "24px",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onClick={handleResetAudio}
              />
            </>
          )}

          {/* Resume Icon */}
          {isPaused && !isPlaying && (
            <PlayArrowIcon
              style={{
                color: "#0F67FD",
                fontSize: "24px",
                cursor: "pointer",
                transition: "color 0.3s ease",
              }}
              onClick={() => handlePlayAudio(content)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
