import React, { useState, useRef } from "react";
import GavelIcon from "@mui/icons-material/Gavel"; // MUI Law Icon
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
      // If audio not loaded or it's a new play request
      setIsLoading(true); // Start loading animation
      try {
        const response = await axios.post(
          "http://backend.lejit.ai/backend/api/tts",
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
        marginBottom: "10px",
      }}
    >
      {!isUser && (
        <div style={{ marginBottom: "5px" }}>
          <GavelIcon style={{ color: "#0F67FD", fontSize: "20px" }} />
        </div>
      )}
      <div
        style={{
          backgroundColor: isUser ? "#8bbdf7" : "#FFF",
          borderRadius: "10px",
          padding: "10px",
          maxWidth: "70%",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
            marginTop: "5px",
            justifyContent: "flex-end",
          }}
        >
          {/* Play Button */}
          {!isPlaying && !isLoading && !isPaused && (
            <button
              style={{
                backgroundColor: "#0F67FD",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => handlePlayAudio(content)}
            >
              Play
            </button>
          )}

          {/* Loading Animation */}
          {isLoading && (
            <button
              style={{
                backgroundColor: "#FFD700",
                color: "black",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "not-allowed",
              }}
              disabled
            >
              Loading...
            </button>
          )}

          {/* Stop and Reset Buttons */}
          {(isPlaying || isPaused) && !isLoading && (
            <>
              <button
                style={{
                  backgroundColor: "#FF4500",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={handleStopAudio}
              >
                Stop
              </button>
              <button
                style={{
                  backgroundColor: "#32CD32",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
                onClick={handleResetAudio}
              >
                Reset
              </button>
            </>
          )}

          {/* Resume Button */}
          {isPaused && !isPlaying && (
            <button
              style={{
                backgroundColor: "#0F67FD",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
              onClick={() => handlePlayAudio(content)}
            >
              Resume
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
