import React, { useState } from "react";
import AiIcon from "./AI.png";
import DraftTemplateIcon from "./document-text.png";
import SimilarDocumentsIcon from "./Group.png";
import CitationIcon from "./Group (1).png";
import CaseLawsIcon from "./Frame (7).png";
import ChatAI from "./ChatAI"; // Import the ChatAI component

const AskAI = () => {
  const [isChatOpen, setChatOpen] = useState(false); // State to toggle ChatAI visibility

  const handleClick = () => {
    setChatOpen(true); // Open the chat when the AskAI box is clicked
  };

  return (
    <>
      {/* AskAI Blue Box */}
      <div
        className="flex flex-row justify-between items-center p-1.5 gap-4.5 w-full bg-gradient-to-r from-blue-600 to-blue-900 rounded-xl shadow-md"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex justify-center items-center w-21 h-21 rounded-full bg-transparent">
            <img
              src={AiIcon}
              alt="AI Icon"
              className="w-15 h-15 object-cover rounded-full bg-transparent"
            />
          </div>
          <h2 className="font-poppins text-sm font-medium leading-6 text-white text-center">
            Ask AI
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-1.5 gap-1 w-30 h-7 bg-white bg-opacity-20 rounded-md"
            >
              <img
                src={option.icon}
                alt={`${option.label} Icon`}
                className="w-4 h-4 object-contain"
              />
              <span className="font-poppins text-[10px] font-medium leading-3 text-white flex-grow">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ChatAI Popup */}
      {isChatOpen && <ChatAI closeChat={() => setChatOpen(false)} />}
    </>
  );
};

// Menu options with labels and corresponding icons
const menuOptions = [
  { label: "Draft Template", icon: DraftTemplateIcon },
  { label: "Find Similar Documents", icon: SimilarDocumentsIcon },
  { label: "Find Citation", icon: CitationIcon },
  { label: "Find Case Laws", icon: CaseLawsIcon },
];

export default AskAI;