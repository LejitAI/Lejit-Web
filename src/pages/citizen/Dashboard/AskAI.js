import React from 'react';
import './AskAI.css'; // Importing custom styles including the robot animation

const AskAI = () => {
    return (
        <div className="ask-ai-card">
            {/* Robot Animation */}
            <div className="robot-animation">
                <div className="face"></div>
                <div className="head"></div>
                <div className="body"></div>
                <div className="left-arm"></div>
                <div className="right-arm"></div>
                <div className="right-eye"></div>
                <div className="left-eye"></div>
            </div>

            {/* Ask AI Options */}
            <div className="ask-ai-options">
                <button className="ask-ai-button">Draft Template</button>
                <button className="ask-ai-button">AI Lawyer</button>
            </div>
        </div>
    );
};

export default AskAI;
