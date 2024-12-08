import React from "react";
import AiIcon from "./AI.png";
import DraftTemplateIcon from "./document-text.png";
import SimilarDocumentsIcon from "./Group.png";
import CitationIcon from "./Group (1).png";
import CaseLawsIcon from "./Frame (7).png";

const AskAI = () => {
  return (
    <div style={styles.container}>
      {/* AI Icon Section */}
      <div style={styles.iconContainer}>
        <div style={styles.iconCircle}>
          <img src={AiIcon} alt="AI Icon" style={styles.iconImage} />
        </div>
        <h2 style={styles.title}>Ask AI</h2>
      </div>

      {/* Menu Options */}
      <div style={styles.optionsContainer}>
        {menuOptions.map((option, index) => (
          <div key={index} style={styles.option}>
            <img
              src={option.icon}
              alt={`${option.label} Icon`}
              style={styles.optionIcon}
            />
            <span style={styles.optionText}>{option.label}</span>
          </div>
        ))}
      </div>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    gap: "24px",
    width: "100%",
    maxWidth: "353px",
    height: "239px",
    background: "linear-gradient(90deg, #0F67FD 0%, #093D97 100%)",
    borderRadius: "20px",
    flexGrow: 1,
    margin: "0 auto",
    boxSizing: "border-box",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for depth

  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    flexShrink: 0,
  },
  iconCircle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "111px",
    height: "101px",
    borderRadius: "50%",
    background: "transparent",
  },
  iconImage: {
    width: "85px",
    height: "85px",
    objectFit: "cover",
    borderRadius: "50%",
    backgroundColor: "transparent", // Transparent background for the AI Icon
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "22px",
    fontWeight: "500",
    lineHeight: "33px",
    color: "#FFFFFF",
    textAlign: "center",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px",
    gap: "6px",
    width: "162px",
    height: "36px",
    background: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
    borderRadius: "10px",
  },
  optionIcon: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
  optionText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "10px",
    fontWeight: "500",
    lineHeight: "15px",
    color: "#FFFFFF",
    flexGrow: 1,
  },
};

export default AskAI;
