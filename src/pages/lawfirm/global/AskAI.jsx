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
        className="flex flex-row justify-between items-center p-2 gap-6 w-full  bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl  mx-auto box-border shadow-md"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="flex justify-center items-center w-28 h-28 rounded-full bg-transparent">
            <img
              src={AiIcon}
              alt="AI Icon"
              className="w-20 h-20 object-cover rounded-full bg-transparent"
            />
          </div>
          <h2 className="font-poppins text-lg font-medium leading-8 text-white text-center">
            Ask AI
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-2 gap-1.5 w-40 h-9 bg-white bg-opacity-20 rounded-lg"
            >
              <img
                src={option.icon}
                alt={`${option.label} Icon`}
                className="w-5 h-5 object-contain"
              />
              <span className="font-poppins text-xs font-medium leading-4 text-white flex-grow">
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