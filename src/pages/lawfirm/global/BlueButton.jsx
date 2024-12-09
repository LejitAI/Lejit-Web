import React, { useState, useRef, useEffect } from "react";
import "./BlueButton.css";

const BlueButton = ({ onClick }) => {
  const [position, setPosition] = useState({ bottom: "50px", right: "20px" }); // Default position
  const buttonRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Handle Drag Start
  const handleDragStart = (e) => {
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - buttonRef.current.getBoundingClientRect().left,
      y: e.clientY - buttonRef.current.getBoundingClientRect().top,
    };
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  // Handle Drag
  const handleDrag = (e) => {
    if (!isDragging.current) return;

    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;

    setPosition({ top: `${newTop}px`, left: `${newLeft}px`, bottom: "auto", right: "auto" });
  };

  // Handle Drag End
  const handleDragEnd = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  // Cleanup on Component Unmount
  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, []);

  // Handle Click
  const handleClick = () => {
    if (!isDragging.current) {
      onClick();
    }
  };

  return (
    <div
      ref={buttonRef}
      className="blue-button"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        bottom: position.bottom,
        right: position.right,
        cursor: isDragging.current ? "grabbing" : "pointer",
      }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
      role="button"
      aria-label="Chatbot Trigger"
      tabIndex={0}
    >
      🤖
    </div>
  );
};

export default BlueButton;
