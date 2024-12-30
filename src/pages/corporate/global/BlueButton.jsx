import React, { useState, useRef } from "react";
import "./BlueButton.css";

const BlueButton = ({ onClick }) => {
  const [position, setPosition] = useState({ bottom: "50px", right: "20px" }); // Updated for bottom-right positioning
  const buttonRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // Drag Start
  const handleDragStart = (e) => {
    isDragging.current = false; // Reset dragging state
    dragOffset.current = {
      x: e.clientX - buttonRef.current.getBoundingClientRect().left,
      y: e.clientY - buttonRef.current.getBoundingClientRect().top,
    };
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
  };

  // Dragging
  const handleDrag = (e) => {
    isDragging.current = true; // Set dragging state to true
    const newLeft = e.clientX - dragOffset.current.x;
    const newTop = e.clientY - dragOffset.current.y;
    setPosition({ top: `${newTop}px`, left: `${newLeft}px`, bottom: "auto", right: "auto" }); // Remove bottom-right constraints after drag
  };

  // Drag End
  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    setTimeout(() => {
      isDragging.current = false;
    }, 50); // Small threshold
  };

  // Handle Click
  const handleClick = () => {
    if (!isDragging.current) {
      onClick(); // Call the function passed as prop
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
        bottom: position.bottom, // Use bottom-right positioning initially
        right: position.right, // Use bottom-right positioning initially
      }}
      onClick={handleClick}
      onMouseDown={handleDragStart}
    >
      🤖
    </div>
  );
};

export default BlueButton;
