import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = ({ title, value }) => {
  return (
    <div className="circular-progress">
      <CircularProgressbar
        value={value}
        text={`${value}`}
        styles={buildStyles({
          textColor: "#333",
          pathColor: "#2196F3",
          trailColor: "#ddd",
        })}
      />
      <h3>{title}</h3>
    </div>
  );
};

export default CircularProgress;
