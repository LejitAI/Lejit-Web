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
    <div className="w-full">
      {/* AskAI Blue Box */}
      <div
        className="flex flex-row justify-between items-center p-4 gap-6 w-full h-[239px] bg-gradient-to-r from-[#0F67FD] to-[#093D97] rounded-[20px] flex-grow mx-auto box-border shadow-md"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-3 flex-shrink-0">
          <div className="flex justify-center items-center w-[111px] h-[101px] rounded-full bg-transparent">
            <img
              src={AiIcon}
              alt="AI Icon"
              className="w-[85px] h-[85px] object-cover rounded-full bg-transparent"
            />
          </div>
          <h2 className="font-poppins text-[22px] font-medium leading-[33px] text-white text-center">
            Ask AI
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {menuOptions.map((option, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-2 gap-1.5 w-[162px] h-[36px] bg-white bg-opacity-20 rounded-[10px]"
            >
              <img
                src={option.icon}
                alt={`${option.label} Icon`}
                className="w-5 h-5 object-contain"
              />
              <span className="font-poppins text-[10px] font-medium leading-[15px] text-white flex-grow">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ChatAI Popup */}
      {isChatOpen && <ChatAI closeChat={() => setChatOpen(false)} />}
    </div>
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
