// CDashboard.js

import React from 'react';
import './CDashboard.css'; // Custom CSS for styling the dashboard
import Header from '../Header/Header'; // Importing the reusable Header component
import Sidebar from '../Sidebar/Sidebar'; // Importing the Sidebar component
import AppointmentCard from './AppointmentCard'; // Importing the AppointmentCard component
import AskAI from './AskAI'; // Importing the newly created AskAI component
import WelcomeBanner from './WelcomeBanner'; // Import the WelcomeBanner component
import RightBar from './RightBar'; // Importing RightBar component

const CDashboard = () => {
    return (
        <div className="citizen-dashboard">
            {/* Header Section */}
            <Header />

            {/* Welcome Banner */}
            <WelcomeBanner />

            {/* Card Section for Ask AI and Appointment */}
            <div className="cards-container">
                <div className="appointment-container">
                    <AppointmentCard />
                </div>
                <div className="ask-ai-container">
                    <AskAI /> {/* Ask AI card */}
                    <div className="find-lawyers-button-container">
                    </div>
                </div>


            </div>

            <div className="dashboard-layout">
                {/* Sidebar Section */}
                <Sidebar />
                
                {/* Main Dashboard Content */}
                <div className="dashboard-content">
                    {/* Other contents can go here */}
                </div>

                {/* Right Bar Section */}
                <RightBar />
            </div>
        </div>
    );
};

export default CDashboard;
